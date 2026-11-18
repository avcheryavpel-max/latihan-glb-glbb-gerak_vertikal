import test from 'node:test';
import assert from 'node:assert/strict';
import { QUESTIONS } from './questions';

test('All 10 questions have complete metadata, 6 textbook stages, and 6 narrator segments', () => {
  assert.equal(QUESTIONS.length, 10);
  QUESTIONS.forEach((q, idx) => {
    assert.equal(q.id, idx + 1);
    assert.ok(q.title.length > 0);
    assert.ok(q.stem.length >= 2);
    assert.ok(q.explanation.memahamiPermasalahan.diketahui.length >= 2);
    assert.ok(q.explanation.langkahPenyelesaian.length >= 3);
    assert.equal(q.narratorSegments.length, 6);
    q.narratorSegments.forEach((seg, sIdx) => {
      assert.equal(seg.stageIndex, sIdx);
      assert.ok(seg.spokenText.trim().length > 30);
    });
  });
});

test('Physics calculations for all 10 newly authored questions are mathematically exact', () => {
  // Soal 1: Bus 15 m/s at t=0, Patrol a=2 m/s^2 at t=12 s, L=880 m
  const tMeet = 32;
  const xBus = 15 * tMeet;
  const xPat = 0.5 * 2 * (tMeet - 12) ** 2;
  assert.equal(xBus + xPat, 880);
  assert.equal(QUESTIONS[0].options?.[QUESTIONS[0].correctChoice!], '480 m');

  // Soal 2: v-t graph: 0-6:0->20, 6-18:20, 18-24:20->0, 24-30:0->-10, 30-40:-10
  const areaPos = ((24 + 12) / 2) * 20; // 360
  const areaNeg = ((16 + 10) / 2) * -10; // -130
  assert.equal(areaPos + areaNeg, 230);
  assert.equal(Math.abs(areaPos) + Math.abs(areaNeg), 490);
  assert.equal(QUESTIONS[1].options?.[QUESTIONS[1].correctChoice!], '230 m dan 490 m');

  // Soal 3: a-t graph: +4 (0-5s), 0 (5-15s), -2 (15-25s), v0=0
  const v5 = 4 * 5;
  const x1 = 0.5 * 4 * 25;
  const x2 = v5 * 10;
  const x3 = v5 * 10 + 0.5 * -2 * 100;
  assert.equal(v5, 20);
  assert.equal(x3, 100);
  assert.equal(x1 + x2 + x3, 350);
  assert.deepEqual(QUESTIONS[2].correctChoices, [0, 2, 4]);

  // Soal 4: Throw up v0=30 m/s from h0=80 m, g=10 m/s^2
  const hMax = 80 + 30 ** 2 / (2 * 10);
  const tTotal = 3 + Math.sqrt((2 * hMax) / 10);
  const vGround = 10 * 5;
  assert.equal(hMax, 125);
  assert.equal(tTotal, 8);
  assert.equal(vGround, 50);
  assert.deepEqual(QUESTIONS[3].correctChoices, [0, 1, 3]);

  // Soal 5: Tower 245 m, A dropped t=0, B thrown down v0=24 m/s at t=1 s
  assert.equal(0.5 * 10 * 7 ** 2, 245); // A lands at t=7s
  assert.equal(24 * 5 + 0.5 * 10 * 5 ** 2, 245); // B lands after 5s -> t=6s
  assert.equal(10 * 3 < 24 + 10 * 2, true); // at t=3s, vB=44 > vA=30
  assert.deepEqual(QUESTIONS[4].correctTf, [true, false, true, false]);

  // Soal 6: P: (0,0)->(10,60), Q: (4,0)->(10,54)
  const vP = 60 / 10;
  const vQ = 54 / (10 - 4);
  const tOvertake = 12;
  assert.equal(vP * tOvertake, vQ * (tOvertake - 4));
  assert.equal(QUESTIONS[5].correctNumeric?.value, 72);

  // Soal 7: 90 km/h (25 m/s), 0.8s react, 80 m @ 2.5 m/s^2, then 5 m/s^2
  const v0 = 90 / 3.6;
  const s1 = v0 * 0.8;
  const v1Sq = v0 ** 2 - 2 * 2.5 * 80;
  const s3 = v1Sq / (2 * 5);
  assert.equal(s1 + 80 + s3, 122.5);
  assert.equal(QUESTIONS[6].correctNumeric?.value, 122.5);

  // Soal 8: Free fall last 1.0 s = 55 m
  const tFall = 6;
  assert.equal(0.5 * 10 * tFall ** 2 - 0.5 * 10 * (tFall - 1) ** 2, 55);
  assert.equal(0.5 * 10 * tFall ** 2, 180);
  assert.equal(QUESTIONS[7].correctNumeric?.value, 180);

  // Soal 9: Passes 80 m at t=2s and t=8s
  const tPeak = (2 + 8) / 2;
  const vLaunch = 10 * tPeak;
  assert.equal(vLaunch * 2 - 5 * 2 ** 2, 80);
  assert.equal(vLaunch * 8 - 5 * 8 ** 2, 80);
  assert.equal(vLaunch * tPeak - 5 * tPeak ** 2, 125);
  assert.equal(QUESTIONS[8].correctNumeric?.value, 125);

  // Soal 10: Elevator a=2.5 m/s^2, T=12s, H=80m
  const vMax = 10;
  const tAccel = vMax / 2.5;
  const tConst = 12 - 2 * tAccel;
  assert.ok(tConst >= 0);
  assert.equal(((12 + tConst) / 2) * vMax, 80);
  assert.equal(QUESTIONS[9].correctNumeric?.value, 10);
});
