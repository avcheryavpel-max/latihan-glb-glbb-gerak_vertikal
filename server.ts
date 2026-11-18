import 'dotenv/config';
import express from 'express';
import path from 'node:path';
import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { GoogleGenAI } from '@google/genai';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = 3000;
const TTS_MODEL = 'gemini-3.8-flash-lite-tts';
const MAX_CACHE_ENTRIES = 120;

const ttsCache = new Map<string, string>();

function getGeminiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY?.trim();
  if (!apiKey || apiKey === 'MY_GEMINI_API_KEY') {
    return null;
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

async function startServer() {
  const app = express();
  app.use(express.json({ limit: '1mb' }));

  app.get('/api/tts/status', (_req, res) => {
    const client = getGeminiClient();
    res.json({
      serverTtsAvailable: client !== null,
      model: client !== null ? TTS_MODEL : null,
    });
  });

  app.post('/api/tts', async (req, res) => {
    const client = getGeminiClient();
    if (!client) {
      res.status(503).json({
        error: 'Layanan suara server belum dikonfigurasi. Gunakan suara perangkat.',
        fallback: true,
      });
      return;
    }

    const text = typeof req.body?.text === 'string' ? req.body.text.trim() : '';
    const voiceName =
      typeof req.body?.voiceName === 'string' &&
      ['Kore', 'Charon', 'Puck', 'Fenrir', 'Zephyr'].includes(req.body.voiceName)
        ? req.body.voiceName
        : 'Kore';

    if (!text) {
      res.status(400).json({ error: 'Teks narasi tidak boleh kosong.' });
      return;
    }

    if (text.length > 3500) {
      res.status(400).json({ error: 'Segmen teks narasi terlalu panjang.' });
      return;
    }

    const cacheKey = createHash('sha256').update(`${voiceName}:${text}`).digest('hex');
    const cached = ttsCache.get(cacheKey);
    if (cached) {
      res.json({ audioBase64: cached, mimeType: 'audio/wav', cached: true });
      return;
    }

    try {
      let response;
      try {
        response = await client.models.generateContent({
          model: TTS_MODEL,
          contents: [
            {
              role: 'user',
              parts: [
                {
                  text,
                  speechMetadata: {
                    style:
                      'Guru fisika SMA profesional berbahasa Indonesia yang ramah, sabar, artikulatif, dengan intonasi pedagogis yang jelas dan jeda alami saat menjelaskan konsep dan langkah perhitungan.',
                  },
                },
              ],
            },
          ],
          config: {
            responseModalities: ['AUDIO'],
            speechConfig: {
              voiceConfig: {
                prebuiltVoiceConfig: { voiceName },
              },
            },
          },
        });
      } catch (primaryErr) {
        const msg = primaryErr instanceof Error ? primaryErr.message : '';
        if (msg.includes('speechMetadata')) {
          response = await client.models.generateContent({
            model: TTS_MODEL,
            contents: [
              {
                role: 'user',
                parts: [
                  {
                    text: `Bacakan dengan gaya guru fisika SMA Indonesia yang ramah, jelas, dan sistematis:\n\n${text}`,
                  },
                ],
              },
            ],
            config: {
              responseModalities: ['AUDIO'],
              speechConfig: {
                voiceConfig: {
                  prebuiltVoiceConfig: { voiceName },
                },
              },
            },
          });
        } else {
          throw primaryErr;
        }
      }

      const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
      if (!base64Audio) {
        res.status(502).json({
          error: 'Audio narasi tidak diterima dari server TTS.',
          fallback: true,
        });
        return;
      }

      if (ttsCache.size >= MAX_CACHE_ENTRIES) {
        const oldestKey = ttsCache.keys().next().value;
        if (oldestKey) ttsCache.delete(oldestKey);
      }
      ttsCache.set(cacheKey, base64Audio);

      res.json({
        audioBase64: base64Audio,
        mimeType: 'audio/wav',
        cached: false,
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Gagal menghasilkan audio TTS';
      res.status(502).json({
        error: message,
        fallback: true,
      });
    }
  });

  if (process.env.NODE_ENV === 'production') {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('/{*splat}', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  } else {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server berjalan pada http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Gagal memulai server:', err);
  process.exit(1);
});
