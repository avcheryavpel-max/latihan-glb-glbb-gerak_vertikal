import type { QuestionItem } from '../types/quiz';

export const QUESTIONS: QuestionItem[] = [
  {
    id: 1,
    type: 'mcq',
    topicGroup: 'GLB & Penyusulan',
    topic: 'Berpapasan · GLB + GLBB · Waktu Mulai Berbeda',
    level: 'HOTS · C4–C5',
    title: 'Bus Listrik Bandara dan Mobil Patroli Tol',
    stem: [
      'Sebuah bus listrik bandara berangkat dari Pos Timur (Titik A) menuju Pos Barat (Titik B) pada t = 0 s dengan kecepatan tetap 15 m/s di jalur tol lurus sepanjang 880 m. Dua belas detik kemudian (t = 12 s), sebuah mobil patroli berangkat dari Pos Barat menuju Pos Timur dari keadaan diam dengan percepatan tetap 2 m/s².',
      'Analisis gerak kedua kendaraan dengan memperhatikan selisih waktu keberangkatannya. Pada saat kedua kendaraan berpapasan, jarak bus listrik dari Pos Timur adalah …',
    ],
    stimulusCaption:
      'Diagram lintasan lurus Pos Timur (A) – Pos Barat (B) sepanjang 880 m. Panah menunjukkan arah gerak masing-masing kendaraan (sketsa posisi awal, tidak berskala).',
    stimulusChips: [
      'Jarak A–B = 880 m',
      'Bus: v = 15 m/s tetap, berangkat t = 0',
      'Patroli: v₀ = 0; a = 2 m/s², berangkat t = 12 s',
    ],
    options: ['300 m', '400 m', '440 m', '480 m', '540 m'],
    correctChoice: 3,
    keyLabel: 'D · 480 m',
    explanation: {
      memahamiPermasalahan: {
        situasi:
          'Dua kendaraan bergerak saling mendekat pada satu lintasan lurus sepanjang 880 m dari dua ujung berlawanan, namun tidak berangkat bersamaan. Bus listrik sudah melaju selama 12 sekon sebelum mobil patroli mulai bergerak.',
        diketahui: [
          'Panjang lintasan antara Pos Timur (A) dan Pos Barat (B): ~L~ = 880 m',
          'Bus listrik (GLB): ~v~_(bus) = 15 m/s (tetap), berangkat pada ~t~ = 0 s',
          'Mobil patroli (GLBB): ~v~_(0,pat) = 0 m/s, ~a~ = 2 m/s^(2), berangkat pada ~t~ = 12 s',
        ],
        ditanya: 'Jarak bus listrik dari Pos Timur (~x~_(bus)) tepat pada saat kedua kendaraan berpapasan.',
        hubunganStimulus:
          'Pada diagram lintasan, bus bergerak ke kanan dari A sementara mobil patroli bergerak ke kiri dari B. Saat keduanya berpapasan, jumlah jarak tempuh masing-masing kendaraan sama dengan panjang total lintasan ~L~ = 880 m.',
      },
      mengidentifikasiKonsep: {
        judulKonsep: 'Gerak Berpapasan Kombinasi GLB dan GLBB dengan Selisih Waktu',
        prinsipIlmiah:
          'Benda dengan kecepatan konstan mengikuti Gerak Lurus Beraturan (GLB), sedangkan benda dengan percepatan konstan mengikuti Gerak Lurus Berubah Beraturan (GLBB). Karena berpapasan terjadi pada momen waktu yang sama dalam acuan jam global ~t~, lama gerak benda yang berangkat terlambat adalah (~t~ − ~t~_(0)).',
        relevansi:
          'Kesalahan paling sering terjadi jika lama gerak kedua benda dianggap sama. Padahal, selama 12 sekon pertama bus sudah menempuh 180 m sebelum mobil patroli mulai bergerak.',
        penjelasanPemula:
          'Bayangkan kamu memakai satu stopwatch yang dinyalakan saat bus berangkat (~t~ = 0). Ketika stopwatch menunjukkan angka ~t~ (misalnya 32 sekon), bus sudah berjalan selama ~t~ sekon penuh, sedangkan mobil patroli baru berjalan selama (~t~ − 12) sekon.',
      },
      strategiPenyelesaian: {
        pendekatan:
          'Tetapkan ~t~ sebagai waktu sejak bus berangkat (~t~ ≥ 12 s), nyatakan jarak tempuh bus dan mobil patroli dalam variabel ~t~, lalu jumlahkan keduanya sama dengan 880 m untuk membentuk persamaan kuadrat.',
        analisisVisual:
          'Periksa dulu apakah keduanya sudah berpapasan sebelum ~t~ = 12 s: dalam 12 s, bus hanya menempuh 15 × 12 = 180 m (< 880 m), sehingga keduanya pasti berpapasan setelah mobil patroli berangkat (~t~ > 12 s).',
        rumus: [
          {
            persamaan: '~x~_(bus)(~t~) = ~v~_(bus) · ~t~',
            keteranganSimbol: [
              '~x~_(bus): jarak tempuh bus dari Pos Timur (m)',
              '~v~_(bus): kecepatan tetap bus (m/s)',
              '~t~: waktu sejak bus berangkat (s)',
            ],
          },
          {
            persamaan: '~x~_(pat)(~t~) = ~v~_(0,pat)(~t~ − ~t~_(0)) + [1|2]~a~(~t~ − ~t~_(0))^(2)',
            keteranganSimbol: [
              '~x~_(pat): jarak tempuh mobil patroli dari Pos Barat (m)',
              '~t~_(0): waktu tunda keberangkatan mobil patroli = 12 s',
              '~a~: percepatan tetap mobil patroli (m/s^(2))',
            ],
          },
        ],
      },
      langkahPenyelesaian: [
        {
          judul: 'Menuliskan persamaan posisi masing-masing kendaraan',
          penjelasan:
            'Substitusikan kecepatan bus dan percepatan mobil patroli untuk waktu ~t~ ≥ 12 s.',
          persamaan: '~x~_(bus) = 15~t~   dan   ~x~_(pat) = 0 + [1|2](2)(~t~ − 12)^(2) = (~t~ − 12)^(2)',
          alasanLangkah:
            'Koefisien [1|2] · 2 menyederhanakan persamaan mobil patroli menjadi bentuk kuadrat murni.',
          catatanSatuan: 'Semua besaran sudah dalam satuan SI (m, s, m/s^(2)).',
        },
        {
          judul: 'Menerapkan syarat berpapasan',
          penjelasan:
            'Saat berpapasan di satu titik, jumlah jarak tempuh bus dari Pos Timur dan mobil patroli dari Pos Barat sama dengan panjang lintasan 880 m.',
          persamaan: '15~t~ + (~t~ − 12)^(2) = 880',
          alasanLangkah:
            'Dua benda yang berangkat dari ujung berlawanan bertemu ketika total panjang jalan terbagi habis oleh lintasan keduanya.',
        },
        {
          judul: 'Menyelesaikan persamaan kuadrat untuk mencari waktu temu ~t~',
          penjelasan:
            'Jabarkan suku kuadrat (~t~ − 12)^(2) = ~t~^(2) − 24~t~ + 144, lalu kumpulkan seluruh suku ke satu ruas.',
          persamaan: '~t~^(2) − 9~t~ + 144 = 880  ⇒  ~t~^(2) − 9~t~ − 736 = 0',
          alasanLangkah:
            'Bentuk baku persamaan kuadrat memudahkan pemfaktoran untuk menemukan akar waktu yang valid.',
        },
        {
          judul: 'Memfaktorkan dan menguji kelayakan akar waktu',
          penjelasan:
            'Cari dua bilangan yang hasil kalinya −736 dan selisihnya −9, yaitu −32 dan +23.',
          persamaan: '(~t~ − 32)(~t~ + 23) = 0  ⇒  ~t~ = 32 s  atau  ~t~ = −23 s',
          alasanLangkah:
            'Waktu fisis tidak boleh negatif dan harus memenuhi syarat ~t~ ≥ 12 s, sehingga ~t~ = 32 s adalah satu-satunya solusi yang sah.',
        },
        {
          judul: 'Menghitung jarak bus listrik dari Pos Timur',
          penjelasan:
            'Masukkan ~t~ = 32 s ke persamaan jarak bus, lalu lakukan pengecekan silang dengan jarak mobil patroli.',
          persamaan: '~x~_(bus) = 15 × 32 = 480 m   |   Cek: ~x~_(pat) = (32 − 12)^(2) = 400 m  (480 + 400 = 880 m)',
          alasanLangkah:
            'Pengecekan silang memastikan tidak ada kekeliruan aljabar dan kedua jarak benar-benar berjumlah 880 m.',
          catatanSatuan: 'Satuan akhir adalah meter (m).',
        },
      ],
      kesimpulan: {
        hasilAkhir: '480 m',
        maknaKontekstual:
          'Bus listrik dan mobil patroli berpapasan pada ~t~ = 32 s setelah bus berangkat. Pada momen itu, bus telah menempuh jarak 480 m dari Pos Timur, sedangkan mobil patroli telah menempuh 400 m dari Pos Barat.',
        jawabanBenar: 'Pilihan D (480 m)',
      },
      tipsDanKonsep: {
        caraCepat:
          'Hitung dulu jarak awal bus selama 12 s yaitu 15 × 12 = 180 m, sehingga sisa jarak saat mobil patroli mulai bergerak tinggal 880 − 180 = 700 m dengan kecepatan awal relatif dan percepatan 2 m/s^(2): 15Δ~t~ + Δ~t~^(2) = 700 ⇒ Δ~t~(Δ~t~ + 15) = 700 ⇒ Δ~t~ = 20 s. Jadi ~x~_(bus) = 180 + 15(20) = 480 m.',
        kesalahanUmum: [
          'Menggunakan (~t~)^(2) alih-alih (~t~ − 12)^(2) sehingga lupa selisih waktu keberangkatan 12 s.',
          'Menjawab 400 m karena tertukar mengambil jarak tempuh mobil patroli dari Pos Barat.',
          'Mengalikan kecepatan bus 15 m/s dengan 20 s saja (300 m) dan melupakan 180 m yang sudah ditempuh pada 12 s pertama.',
        ],
        konsepPenting:
          'Dalam soal dua benda dengan waktu mulai berbeda, selalu gunakan satu acuan waktu global ~t~ dan pastikan setiap fungsi posisi memiliki domain waktu yang konsisten.',
        telaahOpsi: [
          { label: 'A (300 m)', benar: false, penjelasan: 'Hanya menghitung jarak bus selama 20 s setelah mobil patroli berangkat (15 × 20), melupakan 180 m awal.' },
          { label: 'B (400 m)', benar: false, penjelasan: 'Merupakan jarak mobil patroli dari Pos Barat (20^(2) = 400 m), bukan jarak bus dari Pos Timur.' },
          { label: 'C (440 m)', benar: false, penjelasan: 'Tebakan titik tengah lintasan (880 / 2) tanpa memperhitungkan kecepatan berbeda dan jeda waktu.' },
          { label: 'D (480 m)', benar: true, penjelasan: 'Tepat: 15 × 32 = 480 m, dan 480 m + 400 m = 880 m.' },
          { label: 'E (540 m)', benar: false, penjelasan: 'Terlalu besar; jika bus menempuh 540 m (36 s), mobil patroli telah menempuh 24^(2) = 576 m sehingga total melebihi 880 m.' },
        ],
      },
    },
    narratorSegments: [
      {
        stageIndex: 0,
        stageTitle: 'Memahami Permasalahan',
        spokenText:
          'Mari kita pahami soal nomor satu bersama-sama. Sebuah bus listrik berangkat dari Pos Timur menuju Pos Barat pada t sama dengan nol sekon dengan kecepatan tetap 15 meter per sekon sepanjang lintasan 880 meter. Dua belas sekon kemudian, mobil patroli berangkat dari Pos Barat menuju Pos Timur dari keadaan diam dengan percepatan tetap 2 meter per sekon kuadrat. Yang ditanyakan adalah jarak bus listrik dari Pos Timur tepat saat kedua kendaraan berpapasan.',
      },
      {
        stageIndex: 1,
        stageTitle: 'Mengidentifikasi Konsep Dasar',
        spokenText:
          'Konsep utama di sini adalah gerak berpapasan yang menggabungkan Gerak Lurus Beraturan pada bus dan Gerak Lurus Berubah Beraturan pada mobil patroli, disertai selisih waktu keberangkatan. Bayangkan kita menyalakan satu stopwatch saat bus mulai berjalan. Ketika stopwatch menunjukkan waktu t, bus sudah melaju selama t sekon penuh, sedangkan mobil patroli yang berangkat 12 sekon lebih lambat baru bergerak selama t dikurangi 12 sekon.',
      },
      {
        stageIndex: 2,
        stageTitle: 'Menentukan Strategi Penyelesaian',
        spokenText:
          'Strateginya sangat terstruktur. Pertama, pastikan dulu keduanya belum bertemu dalam 12 sekon awal: bus baru menempuh 15 kali 12 sama dengan 180 meter, masih jauh dari 880 meter. Kedua, kita gunakan rumus jarak bus x bus sama dengan v bus dikali t, dan jarak mobil patroli x patroli sama dengan setengah dikali a dikali kurung buka t minus 12 kurung tutup kuadrat karena kecepatan awalnya nol. Syarat berpapasan adalah x bus ditambah x patroli sama dengan 880 meter.',
      },
      {
        stageIndex: 3,
        stageTitle: 'Penyelesaian Langkah demi Langkah',
        spokenText:
          'Sekarang kita hitung langkah demi langkah. Dari persamaan x bus sama dengan 15 t, dan x patroli sama dengan setengah kali 2 kali t minus 12 kuadrat, yaitu t minus 12 kuadrat. Jika dijumlahkan menjadi 15 t ditambah t minus 12 kuadrat sama dengan 880. Kita jabarkan t minus 12 kuadrat menjadi t kuadrat dikurangi 24 t ditambah 144. Digabung dengan 15 t menghasilkan t kuadrat dikurangi 9 t ditambah 144 sama dengan 880, atau t kuadrat dikurangi 9 t dikurangi 736 sama dengan nol. Pemfaktorannya adalah kurung buka t minus 32 dikali kurung buka t plus 23 sama dengan nol. Karena waktu fisis harus positif dan lebih dari 12 sekon, kita ambil t sama dengan 32 sekon. Maka jarak bus dari Pos Timur adalah 15 dikali 32 sama dengan 480 meter.',
      },
      {
        stageIndex: 4,
        stageTitle: 'Menarik Kesimpulan',
        spokenText:
          'Kita periksa silang: dalam 20 sekon geraknya, mobil patroli menempuh 20 kuadrat sama dengan 400 meter. Dijumlahkan dengan 480 meter milik bus, hasilnya tepat 880 meter. Jadi, pilihan jawaban yang benar adalah D, yaitu 480 meter.',
      },
      {
        stageIndex: 5,
        stageTitle: 'Tips dan Pemahaman Konsep',
        spokenText:
          'Tips penting yang perlu selalu diingat: jangan pernah menjawab 400 meter karena itu jarak mobil patroli dari Pos Barat, bukan jarak bus dari Pos Timur. Dan jangan lupa menyertakan jarak 180 meter yang sudah ditempuh bus selama 12 sekon pertama sebelum mobil patroli bergerak.',
      },
    ],
  },
  {
    id: 2,
    type: 'mcq',
    topicGroup: 'Grafik Kinematika',
    topic: 'Grafik v–t · Perpindahan vs Jarak',
    level: 'HOTS · C4',
    title: 'Trem Otonom Pelabuhan',
    stem: [
      'Sebuah trem otonom bergerak pada rel lurus di area pelabuhan. Rekaman kecepatannya terhadap waktu selama 40 s ditunjukkan pada grafik v–t di bawah ini. Arah gerak mula-mula didefinisikan positif, sehingga kecepatan negatif berarti trem berbalik arah.',
      'Berdasarkan grafik tersebut, perpindahan dan jarak tempuh trem otonom selama 40 s berturut-turut adalah …',
    ],
    stimulusCaption: 'Grafik v–t trem otonom pelabuhan (digambar berskala sesuai data rekaman sensor).',
    stimulusChips: [
      '0–6 s: 0 → +20 m/s',
      '6–18 s: konstan +20 m/s',
      '18–24 s: menuju 0 m/s',
      '24–40 s: berbalik hingga −10 m/s',
    ],
    options: [
      '230 m dan 490 m',
      '490 m dan 230 m',
      '360 m dan 490 m',
      '230 m dan 360 m',
      '200 m dan 520 m',
    ],
    correctChoice: 0,
    keyLabel: 'A · 230 m dan 490 m',
    explanation: {
      memahamiPermasalahan: {
        situasi:
          'Trem otonom bergerak maju lalu berhenti sesaat pada ~t~ = 24 s dan berbalik arah hingga ~t~ = 40 s. Kita diminta menentukan dua besaran sekaligus secara berurutan: perpindahan (vektor) dan jarak tempuh (skalar).',
        diketahui: [
          'Selang 0–6 s: kecepatan naik linear dari 0 ke +20 m/s',
          'Selang 6–18 s: kecepatan konstan +20 m/s (durasi 12 s)',
          'Selang 18–24 s: kecepatan turun linear dari +20 m/s ke 0',
          'Selang 24–30 s: kecepatan berubah linear dari 0 ke −10 m/s',
          'Selang 30–40 s: kecepatan konstan −10 m/s (durasi 10 s)',
        ],
        ditanya: 'Nilai perpindahan dan jarak tempuh trem selama 40 s berturut-turut.',
        hubunganStimulus:
          'Pada grafik ~v~–~t~, garis di atas sumbu waktu (~v~ > 0) menyatakan gerak maju, sedangkan bagian di bawah sumbu waktu (~v~ < 0) menyatakan gerak mundur atau berbalik arah.',
      },
      mengidentifikasiKonsep: {
        judulKonsep: 'Interpretasi Luas Daerah di Bawah Grafik Kecepatan–Waktu (~v~–~t~)',
        prinsipIlmiah:
          'Luas daerah antara kurva ~v~(~t~) dan sumbu ~t~ merepresentasikan perubahan posisi. Untuk perpindahan (besaran vektor), luas di bawah sumbu ~t~ bernilai negatif sehingga saling mengurangi dengan luas positif. Untuk jarak tempuh (besaran skalar), seluruh nilai luas dimutlakkan lalu dijumlahkan.',
        relevansi:
          'Urutan kata "perpindahan dan jarak tempuh berturut-turut" menuntut nilai perpindahan (lebih kecil karena ada gerak balik) berada di depan, dan jarak tempuh berada di belakang.',
        penjelasanPemula:
          'Bayangkan kamu berjalan maju 360 langkah lalu berbalik mundur 130 langkah. Posisi akhirmu dari titik awal (perpindahan) hanya 230 langkah, tetapi total langkah kakimu (jarak tempuh) adalah 360 + 130 = 490 langkah.',
      },
      strategiPenyelesaian: {
        pendekatan:
          'Bagi grafik menjadi dua bangun trapesium utama: Trapesium 1 di atas sumbu ~t~ (0–24 s) dan Trapesium 2 di bawah sumbu ~t~ (24–40 s), lalu hitung luas masing-masing.',
        analisisVisual:
          'Trapesium atas memiliki alas bawah 24 s (dari 0 ke 24), sisi atas 12 s (dari 6 ke 18), dan tinggi 20 m/s. Trapesium bawah memiliki sisi mendatar atas 16 s (dari 24 ke 40), sisi bawah 10 s (dari 30 ke 40), dan kedalaman 10 m/s.',
        rumus: [
          {
            persamaan: '~L~_(trapesium) = [~a~ + ~b~|2] × ~t~_(tinggi)',
            keteranganSimbol: [
              '~a~, ~b~: panjang dua sisi sejajar pada sumbu waktu (s)',
              '~t~_(tinggi): nilai kecepatan puncak pada masing-masing fase (m/s)',
            ],
          },
          {
            persamaan: 'Δ~x~ = ~L~_(1) + ~L~_(2)   dan   ~s~ = |~L~_(1)| + |~L~_(2)|',
            keteranganSimbol: [
              'Δ~x~: perpindahan total (m)',
              '~s~: jarak tempuh total (m)',
            ],
          },
        ],
      },
      langkahPenyelesaian: [
        {
          judul: 'Menghitung luas daerah positif (0–24 s)',
          penjelasan:
            'Gunakan rumus luas trapesium pada selang 0–24 s dengan sisi sejajar 24 s dan (18 − 6) = 12 s serta tinggi 20 m/s.',
          persamaan: '~L~_(1) = [24 + 12|2] × 20 = 18 × 20 = +360 m',
          alasanLangkah:
            'Cara cepat ini setara dengan menjumlahkan segitiga awal (60 m), persegi panjang tengah (240 m), dan segitiga perlambatan (60 m).',
        },
        {
          judul: 'Menghitung luas daerah negatif (24–40 s)',
          penjelasan:
            'Pada selang 24–40 s, trem bergerak mundur membentuk trapesium terbalik dengan sisi sejajar (40 − 24) = 16 s dan (40 − 30) = 10 s serta tinggi −10 m/s.',
          persamaan: '~L~_(2) = [16 + 10|2] × (−10) = 13 × (−10) = −130 m',
          alasanLangkah:
            'Tanda negatif menunjukkan posisi trem berkurang sejauh 130 m karena bergerak berlawanan dengan arah mula-mula.',
        },
        {
          judul: 'Menentukan perpindahan total Δ~x~',
          penjelasan: 'Jumlahkan kedua luas secara aljabar dengan mempertahankan tanda negatif.',
          persamaan: 'Δ~x~ = 360 + (−130) = 230 m',
          alasanLangkah:
            'Perpindahan hanya bergantung pada selisih posisi akhir terhadap posisi awal.',
        },
        {
          judul: 'Menentukan jarak tempuh total ~s~',
          penjelasan: 'Jumlahkan nilai mutlak kedua luas karena jarak tidak mengenal arah negatif.',
          persamaan: '~s~ = |360| + |−130| = 360 + 130 = 490 m',
          alasanLangkah:
            'Total lintasan fisik yang dilalui roda trem mencakup perjalanan maju dan mundur.',
          catatanSatuan: 'Keduanya bersatuan meter (m).',
        },
      ],
      kesimpulan: {
        hasilAkhir: 'Perpindahan = 230 m dan Jarak tempuh = 490 m',
        maknaKontekstual:
          'Selama 40 s, trem melaju 360 m ke depan lalu mundur 130 m, sehingga berakhir 230 m di depan titik asal setelah menempuh total lintasan 490 m.',
        jawabanBenar: 'Pilihan A (230 m dan 490 m)',
      },
      tipsDanKonsep: {
        caraCepat:
          'Selalu periksa aturan fisika dasar: jarak tempuh selalu lebih besar atau sama dengan besar perpindahan (~s~ ≥ |Δ~x~|). Dari syarat ini saja, pilihan B langsung gugur karena 490 > 230.',
        kesalahanUmum: [
          'Tertukar urutan antara perpindahan dan jarak tempuh (memilih B).',
          'Menganggap daerah di bawah sumbu waktu berbentuk persegi panjang penuh 16 × 10 = 160 m, lupa bagian segitiga 24–30 s.',
          'Mengabaikan gerakan mundur saat menghitung jarak tempuh sehingga menjawab 360 m.',
        ],
        konsepPenting:
          'Luas grafik ~v~–~t~ di atas sumbu waktu bernilai positif (+), sedangkan di bawah sumbu waktu bernilai negatif (−).',
        telaahOpsi: [
          { label: 'A (230 m dan 490 m)', benar: true, penjelasan: 'Benar: Δ~x~ = 360 − 130 = 230 m dan ~s~ = 360 + 130 = 490 m.' },
          { label: 'B (490 m dan 230 m)', benar: false, penjelasan: 'Urutan terbalik; perpindahan tidak mungkin lebih besar daripada jarak tempuh.' },
          { label: 'C (360 m dan 490 m)', benar: false, penjelasan: 'Menganggap perpindahan hanya sebesar luas positif 360 m tanpa dikurangi 130 m.' },
          { label: 'D (230 m dan 360 m)', benar: false, penjelasan: 'Perpindahan benar 230 m, tetapi jarak tempuh lupa menambahkan lintasan balik 130 m.' },
          { label: 'E (200 m dan 520 m)', benar: false, penjelasan: 'Salah menghitung luas daerah negatif sebagai persegi panjang 16 × 10 = 160 m.' },
        ],
      },
    },
    narratorSegments: [
      {
        stageIndex: 0,
        stageTitle: 'Memahami Permasalahan',
        spokenText:
          'Pada soal nomor dua, kita menganalisis grafik kecepatan terhadap waktu dari sebuah trem otonom selama 40 sekon. Dari detik nol hingga 24, kecepatan bernilai positif yang berarti trem bergerak maju. Dari detik 24 hingga 40, kecepatan bernilai negatif yang artinya trem berbalik arah. Kita diminta menentukan perpindahan dan jarak tempuh berturut-turut.',
      },
      {
        stageIndex: 1,
        stageTitle: 'Mengidentifikasi Konsep Dasar',
        spokenText:
          'Konsep dasarnya adalah luas di bawah grafik v terhadap t. Luas daerah di atas sumbu waktu bernilai positif, sedangkan di bawah sumbu waktu bernilai negatif. Untuk menghitung perpindahan, kita jumlahkan luas dengan memperhatikan tanda positif dan negatifnya. Sebaliknya, untuk jarak tempuh, semua luas diambil nilai mutlaknya lalu dijumlahkan.',
      },
      {
        stageIndex: 2,
        stageTitle: 'Menentukan Strategi Penyelesaian',
        spokenText:
          'Strategi termudah adalah melihat grafik sebagai dua bangun trapesium. Trapesium pertama berada di atas sumbu waktu dari t nol sampai 24 sekon, dengan sisi sejajar 24 sekon dan 12 sekon serta tinggi 20 meter per sekon. Trapesium kedua berada di bawah sumbu waktu dari t 24 sampai 40 sekon, dengan sisi sejajar 16 sekon dan 10 sekon serta tinggi minus 10 meter per sekon.',
      },
      {
        stageIndex: 3,
        stageTitle: 'Penyelesaian Langkah demi Langkah',
        spokenText:
          'Mari kita hitung satu per satu. Luas pertama adalah kurung buka 24 ditambah 12 kurung tutup dibagi 2, hasilnya 18, lalu dikali tinggi 20, sama dengan positif 360 meter. Luas kedua adalah kurung buka 16 ditambah 10 kurung tutup dibagi 2, hasilnya 13, lalu dikali minus 10, sama dengan minus 130 meter. Maka perpindahannya adalah 360 dikurangi 130 sama dengan 230 meter. Sementara jarak tempuhnya adalah 360 ditambah 130 sama dengan 490 meter.',
      },
      {
        stageIndex: 4,
        stageTitle: 'Menarik Kesimpulan',
        spokenText:
          'Jadi, selama 40 sekon trem berpindah sejauh 230 meter dari posisi awal dan menempuh total jarak lintasan 490 meter. Pilihan yang tepat adalah A.',
      },
      {
        stageIndex: 5,
        stageTitle: 'Tips dan Pemahaman Konsep',
        spokenText:
          'Ingat tips cepat ini: nilai jarak tempuh tidak akan pernah lebih kecil daripada besar perpindahan. Jadi jika soal menanyakan perpindahan lalu jarak tempuh, angka pertama tidak mungkin lebih besar daripada angka kedua.',
      },
    ],
  },
  {
    id: 3,
    type: 'complex',
    topicGroup: 'Grafik Kinematika',
    topic: 'Grafik a–t · Hubungan a, v, Posisi',
    level: 'HOTS · C4–C5',
    title: 'Uji Akselerasi Kereta Ringan (LRT)',
    stem: [
      'Sebuah rangkaian kereta ringan (LRT) diuji pada lintasan lurus dari keadaan diam (v₀ = 0). Sensor akselerometer mencatat percepatan terhadap waktu: +4 m/s² selama 0–5 s, lalu 0 m/s² selama 5–15 s, lalu −2 m/s² selama 15–25 s seperti grafik a–t di bawah.',
      'Evaluasi setiap pernyataan berikut. Pilih SEMUA pernyataan yang benar — penilaian semua-atau-nol: satu kesalahan membuat skor soal ini 0.',
    ],
    stimulusCaption:
      'Grafik a–t hasil sensor uji LRT (berskala). Garis putus-putus vertikal menandai pergantian fase gerak.',
    stimulusChips: ['v₀ = 0', 'a = +4 m/s² (0–5 s)', 'a = 0 (5–15 s)', 'a = −2 m/s² (15–25 s)'],
    options: [
      'Kecepatan maksimum LRT adalah 20 m/s dan mulai dicapai pada t = 5 s.',
      'Pada t = 10 s, LRT mulai melambat karena percepatannya bernilai nol.',
      'Jarak yang ditempuh LRT selama fase perlambatan (15–25 s) adalah 100 m.',
      'Jarak total LRT dari t = 0 sampai berhenti di t = 25 s adalah 300 m.',
      'Pada selang waktu 5 s sampai 15 s, LRT menempuh jarak 200 m.',
    ],
    correctChoices: [0, 2, 4],
    keyLabel: 'A, C, E',
    explanation: {
      memahamiPermasalahan: {
        situasi:
          'Sebuah LRT bergerak dari keadaan diam dalam tiga fase berurutan berdasarkan rekaman percepatan ~a~–~t~: fase dipercepat (0–5 s), fase tanpa percepatan (5–15 s), dan fase diperlambat (15–25 s).',
        diketahui: [
          'Kecepatan awal ~v~_(0) = 0 m/s pada ~t~ = 0 s',
          'Fase 1 (0–5 s, Δ~t~_(1) = 5 s): ~a~_(1) = +4 m/s^(2)',
          'Fase 2 (5–15 s, Δ~t~_(2) = 10 s): ~a~_(2) = 0 m/s^(2)',
          'Fase 3 (15–25 s, Δ~t~_(3) = 10 s): ~a~_(3) = −2 m/s^(2)',
        ],
        ditanya: 'Menentukan seluruh pernyataan yang benar mengenai kecepatan dan jarak tempuh LRT.',
        hubunganStimulus:
          'Grafik ~a~–~t~ menunjukkan besar percepatan tiap selang waktu. Perubahan kecepatan Δ~v~ sama dengan luas persegi panjang di bawah grafik ~a~–~t~, sedangkan jarak harus dihitung dari kecepatan tiap fase.',
      },
      mengidentifikasiKonsep: {
        judulKonsep: 'Hubungan Grafik Percepatan (~a~–~t~) terhadap Kecepatan dan Jarak',
        prinsipIlmiah:
          'Luas daerah di bawah grafik ~a~–~t~ menyatakan perubahan kecepatan (Δ~v~ = ~a~ · Δ~t~). Nilai ~a~ = 0 bukan berarti benda diam atau melambat, melainkan bergerak dengan kecepatan tetap (GLB).',
        relevansi:
          'Pernyataan pengecoh menguji apakah murid memahami makna fisis ~a~ = 0 serta mampu menjumlahkan jarak dari ketiga fase secara utuh.',
        penjelasanPemula:
          'Percepatan itu ibarat pedal gas atau rem. Saat ~a~ = +4, gas ditekan sehingga kecepatan naik. Saat ~a~ = 0, pedal dilepas di jalan datar tanpa gesekan sehingga laju kereta tetap konstan, bukan melambat.',
      },
      strategiPenyelesaian: {
        pendekatan:
          'Hitung kecepatan di akhir setiap fase terlebih dahulu secara berantai (~v~_(5), ~v~_(15), ~v~_(25)), lalu hitung jarak masing-masing fase (~s~_(1), ~s~_(2), ~s~_(3)) dan jarak totalnya.',
        analisisVisual:
          'Luas blok pertama (+4 × 5) menaikkan kecepatan sebesar +20 m/s; blok kedua (0 × 10) tidak mengubah kecepatan; blok ketiga (−2 × 10) menurunkan kecepatan sebesar −20 m/s hingga kembali nol.',
        rumus: [
          {
            persamaan: '~v~_(akhir) = ~v~_(awal) + ~a~ · Δ~t~',
            keteranganSimbol: [
              '~v~_(awal), ~v~_(akhir): kecepatan awal dan akhir fase (m/s)',
              '~a~: percepatan konstan pada fase tersebut (m/s^(2))',
              'Δ~t~: lama waktu fase (s)',
            ],
          },
          {
            persamaan: '~s~ = ~v~_(awal) · Δ~t~ + [1|2]~a~(Δ~t~)^(2)',
            keteranganSimbol: ['~s~: jarak tempuh selama satu fase gerak (m)'],
          },
        ],
      },
      langkahPenyelesaian: [
        {
          judul: 'Menganalisis Fase 1 (0–5 s, GLBB dipercepat)',
          penjelasan: 'Dari keadaan diam (~v~_(0) = 0), hitung kecepatan pada ~t~ = 5 s dan jarak ~s~_(1).',
          persamaan: '~v~_(5) = 0 + 4(5) = 20 m/s   |   ~s~_(1) = 0 + [1|2](4)(5)^(2) = 50 m',
          alasanLangkah:
            'Selama 5 s pertama kecepatan terus meningkat hingga mencapai puncaknya 20 m/s.',
        },
        {
          judul: 'Menganalisis Fase 2 (5–15 s, GLB)',
          penjelasan:
            'Karena ~a~ = 0 selama 10 s, kecepatan tetap 20 m/s (termasuk pada ~t~ = 10 s). Hitung jarak ~s~_(2).',
          persamaan: '~v~_(15) = 20 m/s   |   ~s~_(2) = 20 × (15 − 5) = 200 m',
          alasanLangkah:
            'Percepatan nol menandakan kecepatan konstan, bukan perlambatan.',
        },
        {
          judul: 'Menganalisis Fase 3 (15–25 s, GLBB diperlambat)',
          penjelasan:
            'Dengan kecepatan awal 20 m/s dan percepatan −2 m/s^(2) selama 10 s, hitung kecepatan akhir ~v~_(25) dan jarak ~s~_(3).',
          persamaan: '~v~_(25) = 20 + (−2)(10) = 0 m/s   |   ~s~_(3) = 20(10) + [1|2](−2)(10)^(2) = 200 − 100 = 100 m',
          alasanLangkah:
            'Kecepatan berkurang secara teratur hingga LRT tepat berhenti pada ~t~ = 25 s.',
        },
        {
          judul: 'Menghitung jarak total seluruh perjalanan',
          penjelasan: 'Jumlahkan jarak dari Fase 1, Fase 2, dan Fase 3.',
          persamaan: '~s~_(total) = 50 + 200 + 100 = 350 m',
          alasanLangkah:
            'Penjumlahan ketiga fase memberi jarak total 350 m (bukan 300 m).',
          catatanSatuan: 'Semua jarak bersatuan meter (m).',
        },
      ],
      kesimpulan: {
        hasilAkhir: 'Pernyataan benar adalah A, C, dan E',
        maknaKontekstual:
          'LRT mencapai kelajuan maksimum 20 m/s pada 5–15 s, menempuh 200 m pada fase konstan, menempuh 100 m saat perlambatan, dan total menempuh 350 m.',
        jawabanBenar: 'Pilihan A, C, dan E',
      },
      tipsDanKonsep: {
        caraCepat:
          'Bayangkan bentuk grafik ~v~–~t~ yang terbentuk: trapesium dengan tinggi 20 m/s, alas bawah 25 s, dan alas atas 10 s. Luas totalnya langsung [25 + 10|2] × 20 = 350 m!',
        kesalahanUmum: [
          'Mengira ~a~ = 0 berarti benda mulai melambat atau diam (miskonsepsi klasik kinematika).',
          'Lupa menghitung jarak fase pertama (50 m) sehingga mengira jarak total hanya 200 + 100 = 300 m.',
        ],
        konsepPenting:
          'Percepatan nol (~a~ = 0) berarti laju perubahan kecepatan nol, sehingga benda tetap mempertahankan kecepatannya secara konstan.',
        telaahOpsi: [
          { label: 'A', benar: true, penjelasan: 'Benar: ~v~_(maks) = 4 × 5 = 20 m/s dan mulai dicapai tepat pada ~t~ = 5 s.' },
          { label: 'B', benar: false, penjelasan: 'Salah: pada ~t~ = 10 s, ~a~ = 0 artinya kecepatan konstan 20 m/s (GLB), bukan melambat.' },
          { label: 'C', benar: true, penjelasan: 'Benar: fase 15–25 s menempuh ~s~_(3) = 20(10) − [1|2](2)(100) = 100 m.' },
          { label: 'D', benar: false, penjelasan: 'Salah: jarak total adalah 50 + 200 + 100 = 350 m, bukan 300 m.' },
          { label: 'E', benar: true, penjelasan: 'Benar: selama 10 s dengan kecepatan tetap 20 m/s, jaraknya 20 × 10 = 200 m.' },
        ],
      },
    },
    narratorSegments: [
      {
        stageIndex: 0,
        stageTitle: 'Memahami Permasalahan',
        spokenText:
          'Soal nomor tiga adalah pilihan ganda kompleks tentang uji akselerasi kereta ringan LRT dari keadaan diam. Sensor mencatat percepatan positif 4 meter per sekon kuadrat dari nol hingga 5 sekon, kemudian nol dari 5 hingga 15 sekon, dan minus 2 meter per sekon kuadrat dari 15 hingga 25 sekon. Kita harus mengevaluasi lima pernyataan dan memilih semua yang benar.',
      },
      {
        stageIndex: 1,
        stageTitle: 'Mengidentifikasi Konsep Dasar',
        spokenText:
          'Konsep kuncinya adalah hubungan grafik percepatan terhadap waktu dengan kecepatan dan jarak. Perubahan kecepatan sama dengan luas di bawah grafik a terhadap t. Ingat baik-baik: saat percepatan bernilai nol, kereta tidak melambat dan tidak diam, melainkan bergerak dengan kecepatan konstan.',
      },
      {
        stageIndex: 2,
        stageTitle: 'Menentukan Strategi Penyelesaian',
        spokenText:
          'Mari kita hitung kecepatan di setiap titik transisi terlebih dahulu memakai v akhir sama dengan v awal ditambah a dikali delta t. Setelah mengetahui kecepatan tiap fase, kita hitung jarak masing-masing fase agar bisa menguji kelima pernyataan tanpa terjebak.',
      },
      {
        stageIndex: 3,
        stageTitle: 'Penyelesaian Langkah demi Langkah',
        spokenText:
          'Pada fase pertama nol sampai 5 sekon, v di detik kelima adalah nol ditambah 4 dikali 5 sama dengan 20 meter per sekon. Jarak fase satu adalah setengah dikali 4 dikali 5 kuadrat sama dengan 50 meter. Pada fase kedua dari 5 sampai 15 sekon, percepatan nol, jadi kecepatan tetap 20 meter per sekon selama 10 sekon. Jarak fase dua adalah 20 dikali 10 sama dengan 200 meter. Pada fase ketiga dari 15 sampai 25 sekon, kecepatan turun dari 20 dengan percepatan minus 2 selama 10 sekon menjadi nol meter per sekon. Jarak fase tiga adalah 20 dikali 10 dikurangi setengah dikali 2 dikali 10 kuadrat sama dengan 200 dikurangi 100, hasilnya 100 meter. Jadi jarak totalnya 50 ditambah 200 ditambah 100 sama dengan 350 meter.',
      },
      {
        stageIndex: 4,
        stageTitle: 'Menarik Kesimpulan',
        spokenText:
          'Berdasarkan perhitungan tadi, pernyataan A benar karena kecepatan maksimum 20 meter per sekon dicapai pada detik kelima. Pernyataan B salah karena pada detik kesepuluh kereta bergerak konstan, bukan melambat. Pernyataan C benar karena jarak fase perlambatan 100 meter. Pernyataan D salah karena jarak total 350 meter, bukan 300 meter. Dan pernyataan E benar karena jarak pada 5 sampai 15 sekon adalah 200 meter. Jadi yang dipilih adalah A, C, dan E.',
      },
      {
        stageIndex: 5,
        stageTitle: 'Tips dan Pemahaman Konsep',
        spokenText:
          'Cara cepat mengecek jarak totalnya adalah membayangkan grafik kecepatan berbentuk trapesium dengan tinggi 20, sisi atas 10, dan alas bawah 25. Luas trapesium adalah 35 per 2 dikali 20 sama dengan 350 meter. Waspadai selalu jebakan konsep bahwa a sama dengan nol berarti melambat.',
      },
    ],
  },
  {
    id: 4,
    type: 'complex',
    topicGroup: 'Gerak Vertikal',
    topic: 'Vertikal ke Atas dari Ketinggian',
    level: 'HOTS · C4–C5',
    title: 'Bola dari Anjungan Menara Pandang',
    stem: [
      'Seorang peneliti melempar sebuah bola vertikal ke atas dengan kecepatan awal 30 m/s dari tepi anjungan menara setinggi 80 m di atas permukaan tanah. Bola bergerak naik, mencapai titik tertinggi, lalu jatuh hingga menyentuh tanah di sisi menara. Gunakan g = 10 m/s² dan abaikan hambatan udara.',
      'Evaluasi setiap pernyataan di bawah ini. Pilih SEMUA pernyataan yang benar (penilaian semua-atau-nol).',
    ],
    stimulusCaption:
      'Pelemparan bola vertikal ke atas dari anjungan menara setinggi 80 m. Tinggi maksimum tidak ditampilkan pada gambar — harus dianalisis.',
    stimulusChips: [
      'Tinggi anjungan = 80 m',
      'v₀ = 30 m/s ke atas',
      'g = 10 m/s²',
      'Hambatan udara diabaikan',
    ],
    options: [
      'Bola mencapai ketinggian maksimum 125 m di atas tanah.',
      'Bola berada di udara selama 8 s sebelum menyentuh tanah.',
      'Saat kembali melewati ketinggian anjungan menara (80 m), kecepatan bola bernilai nol.',
      'Kelajuan bola tepat saat menyentuh tanah adalah 50 m/s.',
      'Selama 1 s pertama, kelajuan rata-rata bola adalah 30 m/s.',
    ],
    correctChoices: [0, 1, 3],
    keyLabel: 'A, B, D',
    explanation: {
      memahamiPermasalahan: {
        situasi:
          'Bola dilempar vertikal ke atas dari posisi awal 80 m di atas tanah, sehingga lintasan totalnya terdiri atas gerakan naik ke titik puncak lalu jatuh melewati tinggi pelemparan menuju dasar tanah.',
        diketahui: [
          'Ketinggian awal (anjungan): ~h~_(0) = 80 m di atas tanah',
          'Kecepatan awal ke atas: ~v~_(0) = +30 m/s',
          'Percepatan gravitasi ke bawah: ~g~ = 10 m/s^(2) (sehingga ~a~ = −10 m/s^(2))',
        ],
        ditanya: 'Memeriksa kebenaran lima pernyataan terkait ketinggian maksimum, waktu total di udara, kecepatan di titik anjungan, kelajuan saat menumbuk tanah, dan kelajuan rata-rata 1 s pertama.',
        hubunganStimulus:
          'Titik peluncuran berada di ketinggian 80 m (bukan tanah). Ketinggian maksimum diukur dari tanah harus menjumlahkan 80 m dengan tinggi kenaikan di atas anjungan.',
      },
      mengidentifikasiKonsep: {
        judulKonsep: 'Gerak Vertikal ke Atas (GLBB dengan Percepatan Gravitasi Konstan)',
        prinsipIlmiah:
          'Dengan menetapkan arah ke atas sebagai positif, percepatan gravitasi selalu bernilai negatif (~a~ = −~g~). Pada titik puncak, kecepatan sesaat adalah nol (~v~ = 0), namun ketika bola turun kembali melewati ketinggian pelemparan, kecepatannya memiliki besar yang sama dengan ~v~_(0) dengan arah berlawanan (−30 m/s).',
        relevansi:
          'Setiap pernyataan menguji detail kinematika vertikal: acuan ketinggian dari tanah, persamaan kuadrat waktu jatuh, simetri kecepatan, serta perbedaan antara kecepatan awal dan kelajuan rata-rata.',
        penjelasanPemula:
          'Saat bola dilempar ke atas, gravitasi terus mengerem laju bola sebesar 10 m/s setiap detik. Karena awalnya 30 m/s, bola butuh 3 detik untuk berhenti di puncak, lalu berbalik turun dan makin cepat 10 m/s setiap detik.',
      },
      strategiPenyelesaian: {
        pendekatan:
          'Tetapkan titik pelemparan sebagai ~y~ = 0 (maka tanah berada pada ~y~ = −80 m), lalu hitung satu per satu besaran yang diuji pada kelima pernyataan.',
        analisisVisual:
          'Diagram menunjukkan panah kecepatan awal ~v~_(0) = 30 m/s ke atas dan garis putus-putus jalur jatuh hingga ke dasar menara sejauh 80 m di bawah titik lempar.',
        rumus: [
          {
            persamaan: '~y~(~t~) = ~v~_(0)~t~ − [1|2]~g~~t~^(2)',
            keteranganSimbol: [
              '~y~: posisi vertikal relatif terhadap titik lempar (m)',
              '~v~_(0): kecepatan awal (+30 m/s)',
              '~g~: percepatan gravitasi (10 m/s^(2))',
            ],
          },
          {
            persamaan: '~v~^(2) = ~v~_(0)^(2) − 2~g~~y~',
            keteranganSimbol: ['~v~: kecepatan sesaat pada posisi ~y~ (m/s)'],
          },
        ],
      },
      langkahPenyelesaian: [
        {
          judul: 'Menghitung ketinggian maksimum di atas tanah (uji pernyataan A)',
          penjelasan:
            'Di titik puncak, ~v~ = 0. Hitung kenaikan maksimum Δ~h~ di atas anjungan, lalu tambahkan tinggi menara 80 m.',
          persamaan: 'Δ~h~ = [~v~_(0)^(2)|2~g~] = [30^(2)|2(10)] = [900|20] = 45 m  ⇒  ~H~_(maks) = 80 + 45 = 125 m',
          alasanLangkah:
            'Acuan pada pernyataan A adalah di atas tanah, bukan di atas anjungan.',
        },
        {
          judul: 'Menghitung waktu total bola di udara (uji pernyataan B)',
          penjelasan:
            'Saat menyentuh tanah, ~y~ = −80 m. Masukkan ke persamaan posisi.',
          persamaan: '−80 = 30~t~ − 5~t~^(2)  ⇒  5~t~^(2) − 30~t~ − 80 = 0  ⇒  ~t~^(2) − 6~t~ − 16 = 0',
          alasanLangkah:
            'Pemfaktoran (~t~ − 8)(~t~ + 2) = 0 menghasilkan ~t~ = 8 s (akar positif).',
        },
        {
          judul: 'Memeriksa kecepatan saat kembali melewati anjungan (uji pernyataan C)',
          penjelasan:
            'Dengan simetri gerak vertikal, waktu naik ke puncak ~t~_(naik) = 30/10 = 3 s, sehingga bola melewati anjungan lagi pada ~t~ = 6 s.',
          persamaan: '~v~(6) = 30 − 10(6) = −30 m/s   (tidak bernilai nol)',
          alasanLangkah:
            'Kecepatan bernilai nol hanya terjadi di titik tertinggi (~H~ = 125 m), bukan saat melewati anjungan.',
        },
        {
          judul: 'Menghitung kelajuan saat menyentuh tanah (uji pernyataan D)',
          penjelasan: 'Substitusikan ~t~ = 8 s ke persamaan kecepatan atau gunakan ~v~^(2) = ~v~_(0)^(2) − 2~g~~y~.',
          persamaan: '~v~(8) = 30 − 10(8) = −50 m/s  ⇒  kelajuan = |~v~| = 50 m/s',
          alasanLangkah:
            'Tanda minus berarti arahnya ke bawah, sedangkan kelajuan adalah nilai besarnya yaitu 50 m/s.',
        },
        {
          judul: 'Menghitung kelajuan rata-rata selama 1 s pertama (uji pernyataan E)',
          penjelasan:
            'Karena selama 1 s pertama bola masih terus bergerak naik (~t~ < 3 s), jarak tempuhnya sama dengan perpindahannya pada ~t~ = 1 s.',
          persamaan: '~y~(1) = 30(1) − 5(1)^(2) = 25 m  ⇒  ~v~_(rata-rata) = [25 m|1 s] = 25 m/s',
          alasanLangkah:
            'Kecepatan bola terus berkurang dari 30 m/s menjadi 20 m/s selama 1 s pertama, sehingga rata-ratanya 25 m/s, bukan 30 m/s.',
        },
      ],
      kesimpulan: {
        hasilAkhir: 'Pernyataan benar adalah A, B, dan D',
        maknaKontekstual:
          'Bola naik setinggi 45 m di atas menara hingga 125 m dari tanah, lalu jatuh total selama 8 s dan menumbuk tanah dengan kelajuan 50 m/s.',
        jawabanBenar: 'Pilihan A, B, dan D',
      },
      tipsDanKonsep: {
        caraCepat:
          'Setelah tahu ~H~_(maks) = 125 m dan ~t~_(naik) = 3 s, anggap bola jatuh bebas dari ketinggian 125 m: ~t~_(turun) = [root|2(125)/10] = [root|25] = 5 s. Waktu total langsung 3 + 5 = 8 s, dan kelajuan jatuh ~v~ = ~g~ · ~t~_(turun) = 10 × 5 = 50 m/s!',
        kesalahanUmum: [
          'Mengira tinggi maksimumnya 45 m karena lupa menambahkan tinggi menara 80 m.',
          'Menganggap kecepatan saat melewati ketinggian awal bernilai nol.',
          'Menggunakan kecepatan awal 30 m/s sebagai kelajuan rata-rata selama 1 s pertama.',
        ],
        konsepPenting:
          'Di titik tertinggi, kecepatan sesaat ~v~ = 0, tetapi percepatan gravitasi tetap ada dan bernilai ~g~ = 10 m/s^(2) ke bawah.',
        telaahOpsi: [
          { label: 'A', benar: true, penjelasan: 'Benar: ~H~_(maks) = 80 + 45 = 125 m di atas tanah.' },
          { label: 'B', benar: true, penjelasan: 'Benar: ~t~_(naik) + ~t~_(turun) = 3 s + 5 s = 8 s.' },
          { label: 'C', benar: false, penjelasan: 'Salah: saat melewati anjungan kembali, kecepatan bola adalah −30 m/s (kelajuan 30 m/s), bukan nol.' },
          { label: 'D', benar: true, penjelasan: 'Benar: kelajuan di tanah = 10 × 5 = 50 m/s.' },
          { label: 'E', benar: false, penjelasan: 'Salah: dari 30 m/s turun ke 20 m/s, kelajuan rata-rata 1 s pertama adalah (30 + 20)/2 = 25 m/s.' },
        ],
      },
    },
    narratorSegments: [
      {
        stageIndex: 0,
        stageTitle: 'Memahami Permasalahan',
        spokenText:
          'Pada soal nomor empat, sebuah bola dilempar vertikal ke atas dengan kecepatan awal 30 meter per sekon dari anjungan menara setinggi 80 meter di atas tanah, dengan percepatan gravitasi 10 meter per sekon kuadrat. Bola akan naik dulu ke puncak, lalu jatuh melewati anjungan hingga menyentuh tanah. Kita harus memeriksa lima pernyataan untuk menentukan mana saja yang benar.',
      },
      {
        stageIndex: 1,
        stageTitle: 'Mengidentifikasi Konsep Dasar',
        spokenText:
          'Ini adalah gerak vertikal ke atas dengan percepatan gravitasi konstan sebesar minus 10 meter per sekon kuadrat jika arah ke atas kita tetapkan positif. Ingat bahwa di titik puncak kecepatan sesaat memang nol, namun ketika bola turun kembali melewati titik lempar di ketinggian 80 meter, kelajuannya kembali sama dengan 30 meter per sekon ke arah bawah.',
      },
      {
        stageIndex: 2,
        stageTitle: 'Menentukan Strategi Penyelesaian',
        spokenText:
          'Strategi tercepat adalah membagi gerak menjadi dua tahap: tahap naik hingga puncak, lalu tahap jatuh bebas dari ketinggian maksimum ke tanah. Dengan cara ini, kita mudah menghitung tinggi maksimum, waktu total, dan kelajuan saat menumbuk tanah.',
      },
      {
        stageIndex: 3,
        stageTitle: 'Penyelesaian Langkah demi Langkah',
        spokenText:
          'Mari kita hitung. Waktu untuk mencapai puncak adalah v nol dibagi g, yaitu 30 dibagi 10 sama dengan 3 sekon. Kenaikan di atas menara adalah v nol kuadrat dibagi 2 g, yaitu 900 dibagi 20 sama dengan 45 meter. Ditambah tinggi menara 80 meter, ketinggian maksimum dari tanah adalah 125 meter. Jadi pernyataan A benar. Berikutnya, dari ketinggian 125 meter bola jatuh bebas selama t turun sama dengan akar dari 2 kali 125 dibagi 10, yaitu akar 25 sama dengan 5 sekon. Waktu total di udara menjadi 3 ditambah 5 sama dengan 8 sekon, sehingga pernyataan B benar. Pernyataan C salah karena saat melewati anjungan lagi kecepatannya minus 30 meter per sekon, bukan nol. Kemudian kelajuan di tanah adalah g dikali t turun, yaitu 10 dikali 5 sama dengan 50 meter per sekon, maka pernyataan D benar. Terakhir, selama 1 sekon pertama kecepatannya berkurang dari 30 menjadi 20 meter per sekon, sehingga kelajuan rata-ratanya 25 meter per sekon, bukan 30. Pernyataan E salah.',
      },
      {
        stageIndex: 4,
        stageTitle: 'Menarik Kesimpulan',
        spokenText:
          'Kesimpulannya, pernyataan yang benar adalah A, B, dan D.',
      },
      {
        stageIndex: 5,
        stageTitle: 'Tips dan Pemahaman Konsep',
        spokenText:
          'Selalu perhatikan titik acuan ketinggian dalam soal. Jika soal menyebut di atas tanah, jangan lupa menambahkan tinggi awal menara 80 meter pada hasil kenaikan maksimum 45 meter.',
      },
    ],
  },
  {
    id: 5,
    type: 'tf',
    topicGroup: 'Gerak Vertikal',
    topic: 'Jatuh Bebas vs Vertikal ke Bawah · Start Berbeda',
    level: 'HOTS · C4–C5',
    title: 'Dua Kapsul Uji di Menara Jatuh Bebas',
    stem: [
      'Dari puncak menara uji setinggi 245 m, kapsul A dijatuhkan tanpa kecepatan awal pada t = 0 s. Tepat 1 s kemudian (t = 1 s), kapsul B dilontarkan vertikal ke bawah dari titik yang sama dengan kecepatan awal 24 m/s. Gunakan g = 10 m/s²; seluruh waktu t dihitung sejak kapsul A dilepas.',
      'Tentukan BENAR atau SALAH setiap pernyataan berikut berdasarkan kasus di atas.',
    ],
    stimulusCaption:
      'Menara uji 245 m. Kapsul A dilepas dari diam pada t = 0; kapsul B dilontarkan ke bawah 1 s kemudian dari titik yang sama.',
    stimulusChips: [
      'Tinggi menara = 245 m',
      'A: v₀ = 0, t = 0 s',
      'B: v₀ = 24 m/s ↓, t = 1 s',
      'g = 10 m/s²',
    ],
    statements: [
      'Pada t = 3 s (sejak kapsul A dilepas), kelajuan kapsul B lebih besar daripada kelajuan kapsul A.',
      'Selama kedua kapsul masih di udara, percepatan kapsul B lebih besar daripada percepatan kapsul A karena kapsul B dilontarkan ke bawah.',
      'Kapsul B menyentuh tanah pada t = 6 s sejak kapsul A dilepas.',
      'Kapsul A menyentuh tanah lebih dahulu karena dilepas 1 s lebih awal daripada kapsul B.',
    ],
    correctTf: [true, false, true, false],
    keyLabel: 'P1: B · P2: S · P3: B · P4: S',
    explanation: {
      memahamiPermasalahan: {
        situasi:
          'Dua kapsul dijatuhkan dari puncak menara setinggi 245 m. Kapsul A mengalami gerak jatuh bebas pada ~t~ = 0 s, sedangkan kapsul B dilontarkan ke bawah dengan kecepatan awal 24 m/s pada ~t~ = 1 s.',
        diketahui: [
          'Ketinggian menara ~H~ = 245 m, percepatan gravitasi ~g~ = 10 m/s^(2)',
          'Kapsul A: ~v~_(0A) = 0 m/s, mulai bergerak pada ~t~ = 0 s',
          'Kapsul B: ~v~_(0B) = 24 m/s ke bawah, mulai bergerak pada ~t~ = 1 s (lama gerak Δ~t~_(B) = ~t~ − 1)',
        ],
        ditanya: 'Menentukan nilai kebenaran (BENAR atau SALAH) untuk masing-masing dari empat pernyataan.',
        hubunganStimulus:
          'Diagram menara menampilkan perbedaan waktu lepas (~t~ = 0 dan ~t~ = 1 s) serta panjang vektor kecepatan awal kapsul B ke bawah dibandingkan kapsul A yang dilepas diam.',
      },
      mengidentifikasiKonsep: {
        judulKonsep: 'Perbandingan Gerak Jatuh Bebas dan Gerak Vertikal ke Bawah',
        prinsipIlmiah:
          'Setelah dilepaskan atau dilontarkan di dekat permukaan bumi (tanpa hambatan udara), setiap benda jatuh bebas maupun yang dilempar ke bawah mengalami percepatan yang identik, yaitu percepatan gravitasi ~g~ = 10 m/s^(2) ke bawah. Kecepatan awal hanya memengaruhi kecepatan sesaat dan waktu tempuh, bukan besar percepatan.',
        relevansi:
          'Meski kapsul B berangkat 1 s lebih terlambat, dorongan awal 24 m/s membuatnya cepat mengejar kecepatan dan posisi kapsul A.',
        penjelasanPemula:
          'Begitu bola atau kapsul lepas dari tangan atau alat pelontar, alat pelontar tidak lagi mendorongnya. Di udara, hanya gaya gravitasi bumi yang bekerja, sehingga percepatan keduanya sama persis.',
      },
      strategiPenyelesaian: {
        pendekatan:
          'Uji masing-masing pernyataan secara kuantitatif: hitung kelajuan pada ~t~ = 3 s, bandingkan percepatan di udara, lalu hitung waktu tiba di tanah untuk kapsul B dan kapsul A.',
        analisisVisual:
          'Gunakan arah ke bawah sebagai arah positif agar seluruh perhitungan jarak jatuh dan kelajuan bernilai positif.',
        rumus: [
          {
            persamaan: '~v~(~t~) = ~v~_(0) + ~g~ · Δ~t~',
            keteranganSimbol: [
              '~v~: kelajuan ke bawah (m/s)',
              'Δ~t~: lama waktu masing-masing benda berada di udara (s)',
            ],
          },
          {
            persamaan: '~h~ = ~v~_(0)Δ~t~ + [1|2]~g~(Δ~t~)^(2)',
            keteranganSimbol: ['~h~: jarak vertikal yang ditempuh dari puncak menara (m)'],
          },
        ],
      },
      langkahPenyelesaian: [
        {
          judul: 'Menguji Pernyataan 1 (kelajuan pada ~t~ = 3 s)',
          penjelasan:
            'Pada ~t~ = 3 s, kapsul A sudah jatuh selama 3 s, sedangkan kapsul B baru bergerak selama (3 − 1) = 2 s.',
          persamaan: '~v~_(A)(3) = 0 + 10(3) = 30 m/s   |   ~v~_(B)(3) = 24 + 10(2) = 44 m/s',
          alasanLangkah: 'Karena 44 m/s > 30 m/s, Pernyataan 1 bernilai BENAR.',
        },
        {
          judul: 'Menguji Pernyataan 2 (perbandingan percepatan di udara)',
          penjelasan:
            'Tanpa hambatan udara, percepatan benda hanya ditentukan oleh gravitasi bumi.',
          persamaan: '~a~_(A) = ~a~_(B) = ~g~ = 10 m/s^(2)',
          alasanLangkah:
            'Kecepatan awal pelontar tidak menambah percepatan di udara, sehingga Pernyataan 2 bernilai SALAH.',
        },
        {
          judul: 'Menguji Pernyataan 3 (waktu tiba kapsul B di tanah)',
          penjelasan:
            'Misalkan kapsul B jatuh selama Δ~t~_(B) sekon untuk menempuh jarak 245 m.',
          persamaan: '245 = 24Δ~t~_(B) + 5(Δ~t~_(B))^(2)  ⇒  5(5)^(2) + 24(5) = 125 + 120 = 245  ⇒  Δ~t~_(B) = 5 s',
          alasanLangkah:
            'Karena kapsul B baru dilontarkan pada ~t~ = 1 s, waktu global saat menyentuh tanah adalah ~t~ = 1 + 5 = 6 s. Pernyataan 3 bernilai BENAR.',
        },
        {
          judul: 'Menguji Pernyataan 4 (waktu tiba kapsul A dibanding kapsul B)',
          penjelasan: 'Hitung waktu jatuh bebas kapsul A untuk jarak 245 m.',
          persamaan: '245 = [1|2](10)~t~_(A)^(2)  ⇒  ~t~_(A)^(2) = 49  ⇒  ~t~_(A) = 7 s',
          alasanLangkah:
            'Kapsul A tiba pada ~t~ = 7 s sedangkan kapsul B tiba pada ~t~ = 6 s. Artinya kapsul B menyentuh tanah lebih dahulu, sehingga Pernyataan 4 bernilai SALAH.',
        },
      ],
      kesimpulan: {
        hasilAkhir: 'P1: BENAR, P2: SALAH, P3: BENAR, P4: SALAH',
        maknaKontekstual:
          'Walaupun dilepas 1 s lebih lambat, kapsul B menyalip kapsul A dan menyentuh tanah 1 s lebih cepat (~t~ = 6 s dibanding ~t~ = 7 s) karena memiliki kecepatan awal 24 m/s.',
        jawabanBenar: 'P1 Benar · P2 Salah · P3 Benar · P4 Salah',
      },
      tipsDanKonsep: {
        caraCepat:
          'Ingat: semua benda yang bergerak bebas di bawah gravitasi memiliki percepatan sama (~g~ = 10 m/s^(2)). Begitu melihat klaim "percepatan lebih besar karena dilontarkan", langsung tandai SALAH.',
        kesalahanUmum: [
          'Mencampuradukkan kecepatan yang lebih besar dengan percepatan yang lebih besar.',
          'Lupa menambahkan waktu tunda 1 s saat melaporkan waktu tiba kapsul B pada acuan waktu global ~t~.',
        ],
        konsepPenting:
          'Kecepatan awal memengaruhi waktu tempuh, tetapi tidak pernah mengubah percepatan gravitasi yang dialami benda di udara.',
        telaahOpsi: [
          { label: 'Pernyataan 1', benar: true, penjelasan: 'BENAR: ~v~_(B)(3) = 44 m/s lebih besar daripada ~v~_(A)(3) = 30 m/s.' },
          { label: 'Pernyataan 2', benar: false, penjelasan: 'SALAH: percepatan kedua kapsul di udara sama, yakni ~g~ = 10 m/s^(2).' },
          { label: 'Pernyataan 3', benar: true, penjelasan: 'BENAR: kapsul B jatuh selama 5 s setelah ~t~ = 1 s, sehingga menyentuh tanah pada ~t~ = 6 s.' },
          { label: 'Pernyataan 4', benar: false, penjelasan: 'SALAH: kapsul A baru tiba pada ~t~ = 7 s, lebih lambat 1 s dari kapsul B.' },
        ],
      },
    },
    narratorSegments: [
      {
        stageIndex: 0,
        stageTitle: 'Memahami Permasalahan',
        spokenText:
          'Soal nomor lima adalah soal Benar atau Salah mengenai dua kapsul uji di menara setinggi 245 meter. Kapsul A jatuh bebas tanpa kecepatan awal pada t sama dengan nol. Satu sekon kemudian, kapsul B dilontarkan ke bawah dengan kecepatan awal 24 meter per sekon. Semua waktu t diukur sejak kapsul A dilepas.',
      },
      {
        stageIndex: 1,
        stageTitle: 'Mengidentifikasi Konsep Dasar',
        spokenText:
          'Konsep utamanya adalah membandingkan gerak jatuh bebas dengan gerak vertikal ke bawah. Begitu kedua kapsul berada di udara tanpa hambatan udara, satu-satunya percepatan yang bekerja adalah percepatan gravitasi sebesar 10 meter per sekon kuadrat. Kecepatan awal tidak mengubah percepatan gravitasi.',
      },
      {
        stageIndex: 2,
        stageTitle: 'Menentukan Strategi Penyelesaian',
        spokenText:
          'Kita uji satu demi satu pernyataan secara runtut: pertama hitung kelajuan kedua kapsul pada t sama dengan 3 sekon, kedua periksa percepatan di udara, lalu ketiga dan keempat hitung waktu masing-masing kapsul mencapai tanah.',
      },
      {
        stageIndex: 3,
        stageTitle: 'Penyelesaian Langkah demi Langkah',
        spokenText:
          'Pernyataan satu: pada t sama dengan 3 sekon, kapsul A telah jatuh 3 sekon sehingga kelajuannya 10 kali 3 sama dengan 30 meter per sekon. Kapsul B baru bergerak 2 sekon sehingga kelajuannya 24 ditambah 10 kali 2 sama dengan 44 meter per sekon. Karena 44 lebih besar dari 30, pernyataan satu Benar. Pernyataan dua menyatakan percepatan B lebih besar daripada A. Ini jelas Salah karena keduanya sama-sama dipercepat oleh gravitasi 10 meter per sekon kuadrat. Pernyataan tiga: untuk kapsul B menempuh 245 meter, persamaan 24 delta t ditambah 5 delta t kuadrat sama dengan 245 dipenuhi oleh delta t sama dengan 5 sekon, karena 120 ditambah 125 sama dengan 245. Karena B dilontarkan pada t sama dengan 1 sekon, B menyentuh tanah pada t sama dengan 1 ditambah 5 sama dengan 6 sekon. Jadi pernyataan tiga Benar. Pernyataan empat: kapsul A jatuh bebas sehingga 5 t A kuadrat sama dengan 245, t A kuadrat sama dengan 49, dan t A sama dengan 7 sekon. Ternyata A tiba lebih lambat daripada B, jadi pernyataan empat Salah.',
      },
      {
        stageIndex: 4,
        stageTitle: 'Menarik Kesimpulan',
        spokenText:
          'Kesimpulannya: pernyataan satu Benar, pernyataan dua Salah, pernyataan tiga Benar, dan pernyataan empat Salah.',
      },
      {
        stageIndex: 5,
        stageTitle: 'Tips dan Pemahaman Konsep',
        spokenText:
          'Selalu pisahkan antara lama gerak benda di udara dengan waktu pada jam global. Kapsul B hanya bergerak 5 sekon di udara, tetapi waktu tiba pada stopwatch global adalah 6 sekon karena berangkat terlambat 1 sekon.',
      },
    ],
  },
  {
    id: 6,
    type: 'numeric',
    topicGroup: 'GLB & Penyusulan',
    topic: 'GLB · Grafik x–t · Penyusulan',
    level: 'HOTS · C4',
    title: 'Uji Kecepatan Dua Pesepeda Trek',
    stem: [
      'Dua pesepeda berlatih pada lintasan lurus yang sama dari garis start (x = 0). Grafik posisi terhadap waktu (x–t) hanya menampilkan 10 s pertama: pesepeda P berangkat pada t = 0 s, sedangkan pesepeda Q berangkat dari garis start yang sama 4 s kemudian (t = 4 s). Keduanya bergerak lurus beraturan (GLB) — kecepatan masing-masing dapat dibaca dari kemiringan grafik.',
      'Karena peristiwa penyusulan terjadi di luar jendela grafik, susunlah persamaan gerak keduanya. Pada jarak berapa meter dari garis start pesepeda Q menyusul pesepeda P?',
    ],
    stimulusCaption:
      'Grafik x–t selama 10 s pertama (berskala). Titik penyusulan berada di luar jendela grafik.',
    stimulusChips: [
      'Garis start & lintasan sama',
      'Q berangkat 4 s setelah P',
      'Keduanya GLB — baca kemiringan grafik',
      'Gunakan Perbesar untuk membaca titik grafik',
    ],
    unit: 'm',
    placeholder: 'contoh: 72',
    correctNumeric: { value: 72, tolerance: 0.5 },
    keyLabel: '72 m',
    explanation: {
      memahamiPermasalahan: {
        situasi:
          'Pesepeda P berangkat lebih dulu dengan laju konstan, disusul pesepeda Q yang berangkat 4 s kemudian dengan laju lebih tinggi. Pada grafik 10 s pertama, garis grafik Q masih berada di bawah garis P namun tampak lebih curam.',
        diketahui: [
          'Pesepeda P (GLB): melewati titik (0 s, 0 m) dan (10 s, 60 m)',
          'Pesepeda Q (GLB): mulai dari garis start pada (4 s, 0 m) dan melewati titik (10 s, 54 m)',
        ],
        ditanya: 'Jarak dari garis start (~x~) ketika pesepeda Q tepat menyusul pesepeda P.',
        hubunganStimulus:
          'Jarak penyusulan belum tampak pada gambar karena terjadi pada ~t~ > 10 s. Informasi kecepatan harus diekstrak terlebih dahulu dari gradien garis lurus grafik ~x~–~t~.',
      },
      mengidentifikasiKonsep: {
        judulKonsep: 'Kemiringan Grafik Posisi–Waktu (~x~–~t~) dan Syarat Menyusul pada GLB',
        prinsipIlmiah:
          'Pada grafik ~x~–~t~, kemiringan (gradien) garis lurus sama dengan kecepatan tetap benda (~v~ = Δ~x~/Δ~t~). Dua benda yang berangkat dari tempat yang sama akan saling menyusul ketika fungsi posisinya bernilai sama (~x~_(P)(~t~) = ~x~_(Q)(~t~)).',
        relevansi:
          'Soal ini memadukan literasi grafik (membaca koordinat dengan cermat) dengan pemodelan aljabar linear dua benda.',
        penjelasanPemula:
          'Garis yang lebih miring atau lebih curam pada grafik ~x~–~t~ berarti pesepeda itu lebih cepat. Meski Q tertinggal di awal, kecepatannya yang lebih besar akan membuatnya mengejar dan akhirnya menyalip P.',
      },
      strategiPenyelesaian: {
        pendekatan:
          'Tentukan kecepatan ~v~_(P) dan ~v~_(Q) dari koordinat pada grafik, tuliskan persamaan posisi ~x~_(P)(~t~) dan ~x~_(Q)(~t~), samakan keduanya untuk memperoleh waktu susul ~t~, lalu substitusikan kembali untuk mendapatkan jarak ~x~.',
        analisisVisual:
          'Pada ~t~ = 10 s, grafik P berakhir tepat di ~x~ = 60 m dan grafik Q berakhir di ~x~ = 54 m (selisih jarak tinggal 6 m!).',
        rumus: [
          {
            persamaan: '~v~ = [Δ~x~|Δ~t~] = [~x~_(2) − ~x~_(1)|~t~_(2) − ~t~_(1)]',
            keteranganSimbol: [
              '~v~: kecepatan tetap pesepeda (m/s)',
              'Δ~x~: perubahan posisi (m)',
              'Δ~t~: selang waktu (s)',
            ],
          },
          {
            persamaan: '~x~_(P)(~t~) = ~v~_(P)~t~   dan   ~x~_(Q)(~t~) = ~v~_(Q)(~t~ − ~t~_(0))',
            keteranganSimbol: ['~t~_(0): selisih waktu keberangkatan Q = 4 s'],
          },
        ],
      },
      langkahPenyelesaian: [
        {
          judul: 'Menentukan kecepatan masing-masing pesepeda dari kemiringan grafik',
          penjelasan:
            'Baca titik ujung setiap garis pada ~t~ = 10 s serta titik awal keberangkatan masing-masing.',
          persamaan: '~v~_(P) = [60 − 0|10 − 0] = 6 m/s   |   ~v~_(Q) = [54 − 0|10 − 4] = [54|6] = 9 m/s',
          alasanLangkah:
            'Pesepeda Q hanya menempuh 54 m dalam 6 s (dari ~t~ = 4 s ke 10 s), sehingga kecepatannya 9 m/s.',
        },
        {
          judul: 'Menyusun persamaan posisi dan syarat menyusul',
          penjelasan:
            'Tuliskan posisi keduanya terhadap waktu ~t~ (sejak P berangkat) lalu samakan ~x~_(P) = ~x~_(Q).',
          persamaan: '6~t~ = 9(~t~ − 4)',
          alasanLangkah:
            'Pada saat menyusul, keduanya berada di posisi ~x~ yang sama dari garis start.',
        },
        {
          judul: 'Menyelesaikan waktu susul ~t~',
          penjelasan: 'Jabarkan ruas kanan dan pisahkan suku ~t~.',
          persamaan: '6~t~ = 9~t~ − 36  ⇒  3~t~ = 36  ⇒  ~t~ = 12 s',
          alasanLangkah:
            'Terbukti ~t~ = 12 s > 10 s, konsisten dengan fakta bahwa penyusulan terjadi di luar jendela grafik.',
        },
        {
          judul: 'Menghitung jarak penyusulan dari garis start',
          penjelasan: 'Substitusikan ~t~ = 12 s ke persamaan posisi P maupun Q untuk pengecekan.',
          persamaan: '~x~ = 6(12) = 72 m   |   Cek Q: 9(12 − 4) = 9(8) = 72 m',
          alasanLangkah: 'Hasil kedua persamaan identik sebesar 72 m.',
          catatanSatuan: 'Masukkan angka saja: 72 (satuan m sudah tertera).',
        },
      ],
      kesimpulan: {
        hasilAkhir: '72 m',
        maknaKontekstual:
          'Pesepeda Q menyusul pesepeda P pada detik ke-12 tepat di jarak 72 meter dari garis start.',
        jawabanBenar: '72',
      },
      tipsDanKonsep: {
        caraCepat:
          'Lihat posisi pada ~t~ = 10 s: P di 60 m dan Q di 54 m, selisihnya tinggal 6 m. Kecepatan relatif pengejaran Q terhadap P adalah 9 − 6 = 3 m/s. Jadi Q butuh waktu tambahan 6 / 3 = 2 s setelah ~t~ = 10 s (yaitu ~t~ = 12 s). Jarak total = 6 × 12 = 72 m!',
        kesalahanUmum: [
          'Membagi 54 m dengan 10 s untuk kecepatan Q, lupa bahwa Q baru mulai bergerak di ~t~ = 4 s (selang waktunya 6 s, bukan 10 s).',
          'Menjawab waktu susul 12 (dalam sekon) padahal yang ditanyakan adalah jarak (dalam meter).',
        ],
        konsepPenting:
          'Selalu perhatikan titik awal grafik di sumbu mendatar saat menghitung gradien garis.',
      },
    },
    narratorSegments: [
      {
        stageIndex: 0,
        stageTitle: 'Memahami Permasalahan',
        spokenText:
          'Pada soal nomor enam, kita melihat grafik posisi terhadap waktu untuk dua pesepeda P dan Q dalam 10 sekon pertama. Pesepeda P berangkat pada t sama dengan nol, sementara pesepeda Q berangkat dari garis start yang sama pada t sama dengan 4 sekon. Karena penyusulan terjadi setelah 10 sekon di luar jendela grafik, kita diminta mencari jarak penyusulan dari garis start.',
      },
      {
        stageIndex: 1,
        stageTitle: 'Mengidentifikasi Konsep Dasar',
        spokenText:
          'Konsep dasarnya adalah kemiringan atau gradien grafik x terhadap t merupakan nilai kecepatan tetap pada gerak lurus beraturan. Dua benda yang mulai dari garis start yang sama akan saling menyusul ketika posisi x keduanya bernilai sama pada waktu t yang sama.',
      },
      {
        stageIndex: 2,
        stageTitle: 'Menentukan Strategi Penyelesaian',
        spokenText:
          'Pertama, baca koordinat titik awal dan titik pada t sama dengan 10 sekon untuk menghitung kecepatan P dan kecepatan Q. Kedua, susun persamaan posisi x P dan x Q dengan memasukkan selisih waktu 4 sekon pada Q. Ketiga, samakan kedua persamaan posisi untuk menemukan waktu susul, lalu hitung jaraknya.',
      },
      {
        stageIndex: 3,
        stageTitle: 'Penyelesaian Langkah demi Langkah',
        spokenText:
          'Mari kita baca grafiknya. Garis pesepeda P berjalan dari nol koma nol menuju 10 koma 60. Maka kecepatan P adalah 60 dibagi 10 sama dengan 6 meter per sekon. Garis pesepeda Q berjalan dari 4 koma nol menuju 10 koma 54. Selang waktunya adalah 10 dikurangi 4 sama dengan 6 sekon. Maka kecepatan Q adalah 54 dibagi 6 sama dengan 9 meter per sekon. Sekarang kita samakan posisi keduanya: 6 t sama dengan 9 dikali kurung buka t minus 4. Kita jabarkan menjadi 6 t sama dengan 9 t dikurangi 36. Pindah ruas menghasilkan 3 t sama dengan 36, sehingga t sama dengan 12 sekon. Benar bahwa 12 sekon berada di luar grafik 10 sekon. Maka jarak dari garis start adalah 6 dikali 12 sama dengan 72 meter.',
      },
      {
        stageIndex: 4,
        stageTitle: 'Menarik Kesimpulan',
        spokenText:
          'Cek ulang untuk Q: 9 dikali 12 minus 4 yaitu 9 dikali 8 juga sama dengan 72 meter. Jadi jawabannya adalah 72 meter.',
      },
      {
        stageIndex: 5,
        stageTitle: 'Tips dan Pemahaman Konsep',
        spokenText:
          'Hati-hati saat membaca kecepatan Q: jangan membagi 54 dengan 10, melainkan bagi 54 dengan 6 karena Q baru mulai mengayuh pada t sama dengan 4 sekon. Dan pastikan angka yang kamu masukkan adalah jarak dalam meter, bukan waktu 12 sekon.',
      },
    ],
  },
  {
    id: 7,
    type: 'numeric',
    topicGroup: 'GLBB & Pengereman',
    topic: 'Pengereman Dua Tahap · Waktu Reaksi',
    level: 'HOTS · C4',
    title: 'Pengereman di Jalan Berkerikil dan Aspal',
    stem: [
      'Sebuah mobil melaju dengan kecepatan 90 km/jam di jalan lurus. Pengemudi melihat penghalang di depan dan memerlukan waktu reaksi 0,8 s sebelum menginjak pedal rem (selama waktu reaksi kecepatan tetap). Pengereman melewati 80 m pertama jalan berkerikil dengan perlambatan 2,5 m/s², lalu memasuki aspal kering dengan perlambatan 5 m/s² hingga berhenti.',
      'Hitung jarak total yang ditempuh mobil sejak pengemudi melihat penghalang sampai mobil benar-benar berhenti.',
    ],
    stimulusCaption:
      'Sketsa lintasan pengereman (tidak berskala): zona reaksi 0,8 s, jalan berkerikil 80 m, dan jalan aspal kering hingga berhenti.',
    stimulusChips: [
      'v awal = 90 km/jam',
      'Reaksi = 0,8 s',
      'Kerikil: 80 m · 2,5 m/s²',
      'Aspal kering: 5 m/s² hingga berhenti',
    ],
    unit: 'm',
    placeholder: 'contoh: 122,5',
    correctNumeric: { value: 122.5, tolerance: 0.5 },
    keyLabel: '122,5 m',
    explanation: {
      memahamiPermasalahan: {
        situasi:
          'Proses penghentian mobil terdiri atas tiga tahap berurutan: tahap reaksi (kecepatan konstan), tahap pengereman pertama di jalan berkerikil sepanjang 80 m, dan tahap pengereman kedua di aspal kering sampai berhenti.',
        diketahui: [
          'Kecepatan awal ~v~_(0) = 90 km/jam',
          'Waktu reaksi ~t~_(r) = 0,8 s (GLB)',
          'Tahap 2 (kerikil): ~s~_(2) = 80 m dengan perlambatan 2,5 m/s^(2) (~a~_(2) = −2,5 m/s^(2))',
          'Tahap 3 (aspal kering): perlambatan 5 m/s^(2) (~a~_(3) = −5 m/s^(2)) hingga ~v~_(akhir) = 0',
        ],
        ditanya: 'Jarak total ~s~_(total) = ~s~_(1) + ~s~_(2) + ~s~_(3) sejak melihat penghalang hingga berhenti.',
        hubunganStimulus:
          'Sketsa membagi lintasan menjadi tiga segmen berwarna berbeda. Perhatikan satuan kecepatan masih dalam km/jam sehingga wajib dikonversi ke m/s terlebih dahulu.',
      },
      mengidentifikasiKonsep: {
        judulKonsep: 'Kinematika Gerak Bertahap (GLB pada Reaksi + GLBB Pengereman Berantai)',
        prinsipIlmiah:
          'Selama waktu reaksi, rem belum bekerja sehingga mobil tetap melaju dengan kecepatan awal (GLB). Selama pengereman, kecepatan berkurang akibat perlambatan. Kecepatan akhir dari zona pengereman pertama menjadi kecepatan awal bagi zona pengereman kedua.',
        relevansi:
          'Konversi satuan 90 km/jam ke m/s dan penggunaan persamaan GLBB tanpa waktu (~v~^(2) = ~v~_(0)^(2) + 2~a~~s~) membuat perhitungan dua tahap pengereman jauh lebih ringkas.',
        penjelasanPemula:
          'Ketika pengemudi melihat bahaya, mata dan otak butuh 0,8 detik untuk memberi perintah ke kaki menginjak rem. Selama 0,8 detik itu mobil terus meluncur tanpa melambat sama sekali.',
      },
      strategiPenyelesaian: {
        pendekatan:
          'Konversi 90 km/jam ke m/s, hitung jarak reaksi ~s~_(1), cari kecepatan keluar dari jalan kerikil ~v~_(1) pada jarak 80 m, hitung jarak pengereman aspal kering ~s~_(3), lalu jumlahkan seluruhnya.',
        analisisVisual:
          'Tahap kerikil panjangnya sudah diketahui 80 m, namun kita belum tahu sisa kecepatannya saat masuk aspal kering. Kita harus mencari ~v~_(1) terlebih dahulu.',
        rumus: [
          {
            persamaan: '~s~_(1) = ~v~_(0) · ~t~_(r)',
            keteranganSimbol: ['~s~_(1): jarak selama waktu reaksi (m)'],
          },
          {
            persamaan: '~v~_(akhir)^(2) = ~v~_(awal)^(2) + 2~a~~s~',
            keteranganSimbol: [
              '~a~: percepatan negatif saat pengereman (m/s^(2))',
              '~s~: jarak pengereman pada segmen tersebut (m)',
            ],
          },
        ],
      },
      langkahPenyelesaian: [
        {
          judul: 'Mengonversi kecepatan awal ke satuan SI (m/s)',
          penjelasan: 'Bagi nilai km/jam dengan 3,6 untuk mengubahnya ke m/s.',
          persamaan: '~v~_(0) = [90 km|1 jam] = [90.000 m|3.600 s] = 25 m/s',
          alasanLangkah: 'Konsistensi satuan mutlak diperlukan agar dapat dihitung bersama m/s^(2) dan sekon.',
        },
        {
          judul: 'Menghitung jarak pada zona reaksi (Tahap 1)',
          penjelasan: 'Selama 0,8 s mobil melaju konstan 25 m/s.',
          persamaan: '~s~_(1) = 25 × 0,8 = 20 m',
          alasanLangkah: 'Pada fase reaksi belum terjadi perlambatan.',
        },
        {
          judul: 'Mencari kecepatan setelah melewati jalan berkerikil (Tahap 2)',
          penjelasan: 'Substitusikan ~v~_(0) = 25 m/s, ~a~_(2) = −2,5 m/s^(2), dan ~s~_(2) = 80 m.',
          persamaan: '~v~_(1)^(2) = 25^(2) + 2(−2,5)(80) = 625 − 400 = 225  ⇒  ~v~_(1) = 15 m/s',
          alasanLangkah:
            'Karena ~v~_(1)^(2) = 225 > 0, mobil memang belum berhenti saat keluar dari jalan kerikil dan memasuki aspal kering dengan kelajuan 15 m/s.',
        },
        {
          judul: 'Menghitung jarak pengereman di aspal kering hingga berhenti (Tahap 3)',
          penjelasan: 'Gunakan ~v~_(awal) = 15 m/s, ~v~_(akhir) = 0, dan ~a~_(3) = −5 m/s^(2).',
          persamaan: '0 = 225 + 2(−5)~s~_(3)  ⇒  10~s~_(3) = 225  ⇒  ~s~_(3) = 22,5 m',
          alasanLangkah: 'Mobil membutuhkan tambahan jarak 22,5 m di aspal kering untuk benar-benar berhenti.',
        },
        {
          judul: 'Menjumlahkan jarak total penghentian',
          penjelasan: 'Gabungkan ketiga segmen lintasan.',
          persamaan: '~s~_(total) = 20 + 80 + 22,5 = 122,5 m',
          alasanLangkah: 'Ketiga segmen melengkapi seluruh jarak sejak penghalang terlihat hingga berhenti.',
          catatanSatuan: 'Ketik 122,5 atau 122.5 pada kolom jawaban.',
        },
      ],
      kesimpulan: {
        hasilAkhir: '122,5 m',
        maknaKontekstual:
          'Mobil menempuh 20 m saat pengemudi bereaksi, 80 m di jalan berkerikil, dan 22,5 m di aspal kering sehingga total jarak hentinya adalah 122,5 meter.',
        jawabanBenar: '122,5',
      },
      tipsDanKonsep: {
        caraCepat:
          'Hafalkan konversi cepat kelipatan 18 km/jam: 18 = 5 m/s, 36 = 10 m/s, 54 = 15 m/s, 72 = 20 m/s, 90 = 25 m/s, 108 = 30 m/s.',
        kesalahanUmum: [
          'Lupa mengonversi 90 km/jam menjadi 25 m/s sebelum memasukkan ke rumus.',
          'Lupa menambahkan jarak reaksi 20 m ke dalam jarak total.',
          'Memasukkan percepatan bertanda positif saat mengerem sehingga kecepatan justru bertambah.',
        ],
        konsepPenting:
          'Dalam pengereman bertahap, selalu periksa tanda ~v~_(1)^(2): jika hasilnya masih positif, berarti benda benar lanjut ke tahap berikutnya.',
      },
    },
    narratorSegments: [
      {
        stageIndex: 0,
        stageTitle: 'Memahami Permasalahan',
        spokenText:
          'Pada soal nomor tujuh, sebuah mobil melaju 90 kilometer per jam, pengemudi bereaksi selama 0,8 sekon, lalu mengerem melewati 80 meter jalan berkerikil dengan perlambatan 2,5 meter per sekon kuadrat, kemudian masuk aspal kering dengan perlambatan 5 meter per sekon kuadrat hingga berhenti. Kita diminta menghitung jarak total sejak melihat penghalang hingga berhenti.',
      },
      {
        stageIndex: 1,
        stageTitle: 'Mengidentifikasi Konsep Dasar',
        spokenText:
          'Konsepnya adalah memecah perjalanan menjadi tiga fase berurutan: fase reaksi berupa Gerak Lurus Beraturan karena rem belum diinjak, fase pengereman pertama dengan perlambatan 2,5, dan fase pengereman kedua dengan perlambatan 5 hingga kecepatan menjadi nol. Ingat untuk selalu menyamakan satuan kecepatan ke meter per sekon terlebih dahulu.',
      },
      {
        stageIndex: 2,
        stageTitle: 'Menentukan Strategi Penyelesaian',
        spokenText:
          'Strateginya adalah mengubah 90 kilometer per jam menjadi meter per sekon, menghitung jarak reaksi dengan s sama dengan v nol kali t reaksi, lalu mencari sisa kecepatan saat keluar dari jalan kerikil memakai v kuadrat sama dengan v nol kuadrat ditambah 2 a s. Terakhir, hitung jarak henti di aspal kering dan jumlahkan ketiganya.',
      },
      {
        stageIndex: 3,
        stageTitle: 'Penyelesaian Langkah demi Langkah',
        spokenText:
          'Langkah pertama, konversi satuan: 90 dibagi 3,6 sama dengan 25 meter per sekon. Langkah kedua, jarak reaksi s satu sama dengan 25 dikali 0,8 sama dengan 20 meter. Langkah ketiga, di jalan berkerikil sepanjang 80 meter dengan perlambatan minus 2,5, kita hitung v satu kuadrat sama dengan 25 kuadrat dikurangi 2 kali 2,5 kali 80, yaitu 625 dikurangi 400 sama dengan 225. Akar dari 225 adalah 15 meter per sekon. Langkah keempat, pada aspal kering dengan perlambatan minus 5 hingga v akhir nol, nol sama dengan 225 dikurangi 2 kali 5 dikali s tiga. Berarti 10 s tiga sama dengan 225, sehingga s tiga sama dengan 22,5 meter. Langkah kelima, jumlahkan seluruh jarak: 20 ditambah 80 ditambah 22,5 sama dengan 122,5 meter.',
      },
      {
        stageIndex: 4,
        stageTitle: 'Menarik Kesimpulan',
        spokenText:
          'Jadi jarak total yang ditempuh mobil sejak pengemudi melihat penghalang hingga berhenti sempurna adalah 122,5 meter.',
      },
      {
        stageIndex: 5,
        stageTitle: 'Tips dan Pemahaman Konsep',
        spokenText:
          'Tips praktis: ingat kelipatan 18 kilometer per jam sama dengan 5 meter per sekon. Karena 90 adalah 5 kali 18, maka kecepatannya langsung ketemu 5 kali 5 sama dengan 25 meter per sekon. Jangan pernah lupa menjumlahkan jarak reaksi pada hasil akhir.',
      },
    ],
  },
  {
    id: 8,
    type: 'numeric',
    topicGroup: 'Gerak Vertikal',
    topic: 'Jatuh Bebas · Analisis Detik Terakhir',
    level: 'HOTS · C4',
    title: 'Bola Baja Jatuh dari Puncak Menara',
    stem: [
      'Sebuah bola baja dijatuhkan tanpa kecepatan awal (v₀ = 0) dari puncak sebuah menara uji. Rekaman kamera berkecepatan tinggi menunjukkan bahwa pada 1,0 s terakhir sebelum menyentuh tanah, bola menempuh jarak 55 m. Gunakan g = 10 m/s² dan abaikan hambatan udara.',
      'Berdasarkan informasi tersebut, tinggi menara uji itu adalah …',
    ],
    stimulusCaption:
      'Bola jatuh bebas dari puncak menara. Ruas bawah menandai jarak 55 m pada 1,0 s terakhir (sketsa tidak berskala).',
    stimulusChips: [
      'v₀ = 0 (jatuh bebas)',
      '1,0 s terakhir = 55 m',
      'g = 10 m/s²',
      'Tinggi h = ?',
    ],
    unit: 'm',
    placeholder: 'contoh: 180',
    correctNumeric: { value: 180, tolerance: 0.5 },
    keyLabel: '180 m',
    explanation: {
      memahamiPermasalahan: {
        situasi:
          'Sebuah bola baja jatuh bebas dari puncak menara. Kita tidak diberi tinggi menara ataupun waktu total jatuh, melainkan hanya jarak yang ditempuh bola tepat pada 1 sekon terakhir sebelum menyentuh tanah, yaitu 55 m.',
        diketahui: [
          'Kecepatan awal ~v~_(0) = 0 m/s (jatuh bebas)',
          'Jarak pada 1,0 s terakhir: Δ~h~ = 55 m (antara ~t~ − 1 dan ~t~)',
          'Percepatan gravitasi ~g~ = 10 m/s^(2)',
        ],
        ditanya: 'Tinggi total menara uji (~h~).',
        hubunganStimulus:
          'Pada diagram, ruas sepanjang 55 m terletak di bagian paling bawah menara (1 s terakhir), bukan dari puncak. Jarak tersebut sama dengan selisih jarak jatuh total hingga detik ke-~t~ dengan jarak jatuh hingga detik ke-(~t~ − 1).',
      },
      mengidentifikasiKonsep: {
        judulKonsep: 'Gerak Jatuh Bebas dan Selisih Jarak pada Selang Waktu Terakhir',
        prinsipIlmiah:
          'Karena percepatan gravitasi konstan, jarak jatuh benda meningkat secara kuadratik terhadap waktu (~h~(~t~) = [1|2]~g~~t~^(2)). Akibatnya, jarak tempuh setiap detiknya semakin besar. Selisih posisi antara waktu ~t~ dan (~t~ − 1) memungkinkan kita menemukan waktu jatuh total ~t~.',
        relevansi:
          'Banyak soal evaluasi HOTS tidak menanyakan jarak secara langsung dari ~t~, melainkan membalik data detik ke-~n~ untuk menemukan total waktu jatuh terlebih dahulu.',
        penjelasanPemula:
          'Detik ke-1 jatuh 5 m, detik ke-2 jatuh 15 m, detik ke-3 jatuh 25 m, dan seterusnya selalu bertambah 10 m tiap detik. Jadi jika di detik terakhir bola jatuh sejauh 55 m, kita bisa melacak itu detik keberapa!',
      },
      strategiPenyelesaian: {
        pendekatan:
          'Misalkan total waktu jatuh adalah ~t~ sekon. Tuliskan jarak jatuh total ~h~(~t~) dan jarak jatuh sampai satu detik sebelumnya ~h~(~t~ − 1), lalu kurangkan keduanya sama dengan 55 m.',
        analisisVisual:
          'Tinggi total menara ~h~ = ~h~_(sebelum 1 s terakhir) + 55 m.',
        rumus: [
          {
            persamaan: '~h~(~t~) = [1|2]~g~~t~^(2)',
            keteranganSimbol: [
              '~h~(~t~): jarak jatuh dari puncak selama ~t~ sekon (m)',
              '~g~: percepatan gravitasi (10 m/s^(2))',
            ],
          },
          {
            persamaan: 'Δ~h~_(terakhir) = ~h~(~t~) − ~h~(~t~ − 1) = [1|2]~g~[~t~^(2) − (~t~ − 1)^(2)]',
            keteranganSimbol: ['Δ~h~_(terakhir): jarak pada 1 s terakhir (55 m)'],
          },
        ],
      },
      langkahPenyelesaian: [
        {
          judul: 'Menyusun persamaan selisih jarak pada 1,0 s terakhir',
          penjelasan: 'Masukkan ~g~ = 10 m/s^(2) dan Δ~h~ = 55 m.',
          persamaan: '5~t~^(2) − 5(~t~ − 1)^(2) = 55',
          alasanLangkah:
            'Jarak yang ditempuh pada 1 s terakhir adalah jarak total dikurangi jarak sampai (~t~ − 1) s.',
        },
        {
          judul: 'Menyederhanakan persamaan untuk mencari waktu total ~t~',
          penjelasan: 'Jabarkan (~t~ − 1)^(2) = ~t~^(2) − 2~t~ + 1 lalu sederhanakan.',
          persamaan: '5[~t~^(2) − (~t~^(2) − 2~t~ + 1)] = 55  ⇒  5(2~t~ − 1) = 55  ⇒  2~t~ − 1 = 11  ⇒  ~t~ = 6 s',
          alasanLangkah:
            'Suku kuadrat ~t~^(2) saling meniadakan sehingga langsung menghasilkan persamaan linear yang sangat bersih.',
        },
        {
          judul: 'Menghitung tinggi menara uji ~h~',
          penjelasan: 'Substitusikan ~t~ = 6 s ke rumus jatuh bebas, lalu cek silang pada ~t~ = 5 s.',
          persamaan: '~h~ = [1|2](10)(6)^(2) = 5 × 36 = 180 m   |   Cek: ~h~(5) = 5 × 25 = 125 m  (180 − 125 = 55 m)',
          alasanLangkah: 'Selisih jarak detik ke-5 ke detik ke-6 tepat 55 m.',
          catatanSatuan: 'Masukkan angka 180 (satuan m sudah tertera).',
        },
      ],
      kesimpulan: {
        hasilAkhir: '180 m',
        maknaKontekstual:
          'Bola baja jatuh selama total 6 sekon dari puncak menara setinggi 180 meter; pada 5 sekon awal ia turun 125 meter dan pada 1 sekon terakhir menempuh 55 meter.',
        jawabanBenar: '180',
      },
      tipsDanKonsep: {
        caraCepat:
          'Untuk jatuh bebas dengan ~g~ = 10 m/s^(2), kelajuan rata-rata di 1 s terakhir sama dengan jarak dibagi 1 s, yaitu ~v~_(rata-rata) = 55 m/s! Karena percepatan 10 m/s^(2), nilai rata-rata ini terjadi di tengah selang yaitu pada ~t~ − 0,5 = 55 / 10 = 5,5 s. Jadi waktu totalnya langsung 5,5 + 0,5 = 6 s, dan ~h~ = 5(6)^(2) = 180 m!',
        kesalahanUmum: [
          'Mengira tinggi menara adalah ~h~ = 55 m atau mengira ~t~ = 1 s.',
          'Menggunakan rumus ~h~ = [1|2]~g~(~t~ − 1)^(2) saja tanpa mengurangkan dari ~h~(~t~).',
        ],
        konsepPenting:
          'Rumus jarak jatuh bebas pada detik ke-~n~ (selang 1 detik) dengan ~g~ = 10 m/s^(2) selalu memenuhi pola ~h~_(n) = 5(2~n~ − 1).',
      },
    },
    narratorSegments: [
      {
        stageIndex: 0,
        stageTitle: 'Memahami Permasalahan',
        spokenText:
          'Pada soal nomor delapan, sebuah bola baja dijatuhkan tanpa kecepatan awal dari puncak menara uji. Kamera mencatat bahwa pada 1,0 sekon terakhir sebelum menyentuh tanah, bola menempuh jarak 55 meter. Dengan gravitasi 10 meter per sekon kuadrat, kita harus menentukan tinggi total menara.',
      },
      {
        stageIndex: 1,
        stageTitle: 'Mengidentifikasi Konsep Dasar',
        spokenText:
          'Pada gerak jatuh bebas, kecepatan benda terus bertambah sehingga jarak yang ditempuh pada setiap detik juga makin panjang. Jarak pada satu sekon terakhir bukanlah tinggi menara, melainkan selisih antara jarak jatuh total selama t sekon dengan jarak jatuh hingga t minus 1 sekon.',
      },
      {
        stageIndex: 2,
        stageTitle: 'Menentukan Strategi Penyelesaian',
        spokenText:
          'Strateginya adalah memisalkan waktu jatuh total sebagai t sekon. Lalu kita tulis persamaan jarak jatuh selama t dikurangi jarak jatuh selama t minus 1, dan kita samakan dengan 55 meter untuk mencari t terlebih dahulu.',
      },
      {
        stageIndex: 3,
        stageTitle: 'Penyelesaian Langkah demi Langkah',
        spokenText:
          'Mari kita tuliskan: h pada detik t adalah 5 t kuadrat, sedangkan pada t minus 1 adalah 5 dikali kurung buka t minus 1 kuadrat. Selisihnya menjadi 5 t kuadrat dikurangi 5 dikali kurung buka t kuadrat minus 2 t plus 1 sama dengan 55. Suku t kuadrat saling habis, menyisakan 5 dikali kurung buka 2 t minus 1 sama dengan 55. Kedua ruas kita bagi 5 sehingga 2 t minus 1 sama dengan 11, maka 2 t sama dengan 12, dan waktu total t sama dengan 6 sekon. Sekarang kita masukkan t sama dengan 6 ke rumus tinggi menara: h sama dengan setengah dikali 10 dikali 6 kuadrat, yaitu 5 dikali 36 sama dengan 180 meter.',
      },
      {
        stageIndex: 4,
        stageTitle: 'Menarik Kesimpulan',
        spokenText:
          'Mari kita uji kebenarannya: pada detik kelima, jarak jatuh adalah 5 kali 25 sama dengan 125 meter. Pada detik keenam, 180 meter. Selisihnya tepat 55 meter. Jadi tinggi menara adalah 180 meter.',
      },
      {
        stageIndex: 5,
        stageTitle: 'Tips dan Pemahaman Konsep',
        spokenText:
          'Ada cara cepat yang sangat elegan: jarak 55 meter dalam 1 sekon berarti kecepatan rata-rata pada 1 sekon terakhir adalah 55 meter per sekon. Kecepatan rata-rata itu dicapai tepat di pertengahan detik terakhir, yakni pada waktu 5,5 sekon. Tambahkan setengah sekon lagi, langsung ketemu waktu total 6 sekon!',
      },
    ],
  },
  {
    id: 9,
    type: 'numeric',
    topicGroup: 'Gerak Vertikal',
    topic: 'Vertikal ke Atas · Simetri Dua Waktu',
    level: 'HOTS · C4–C5',
    title: 'Peluncur Bola Uji di Atas Dermaga',
    stem: [
      'Sebuah alat peluncur di atas dermaga melontarkan bola kecil vertikal ke atas untuk menguji sensor optik. Sensor mencatat bola melewati ketinggian 80 m di atas titik lontar sebanyak dua kali: pada t = 2 s (saat bergerak naik) dan t = 8 s (saat bergerak turun). Gunakan g = 10 m/s².',
      'Manfaatkan kedua data waktu tersebut untuk menentukan ketinggian maksimum bola di atas titik lontar.',
    ],
    stimulusCaption:
      'Lintasan bola di atas dermaga (skematis, tidak berskala). Penanda waktu menunjukkan data rekaman sensor pada ketinggian 80 m.',
    stimulusChips: [
      '80 m di atas titik lontar',
      'Naik: t = 2 s',
      'Turun: t = 8 s',
      'g = 10 m/s²',
    ],
    unit: 'm',
    placeholder: 'contoh: 125',
    correctNumeric: { value: 125, tolerance: 0.5 },
    keyLabel: '125 m',
    explanation: {
      memahamiPermasalahan: {
        situasi:
          'Bola dilontarkan vertikal ke atas dari dermaga tanpa diketahui kecepatan awalnya. Namun kita mengetahui dua waktu saat bola berada pada ketinggian yang sama (80 m), yakni sekali ketika naik (~t~_(1) = 2 s) dan sekali ketika turun (~t~_(2) = 8 s).',
        diketahui: [
          'Ketinggian acuan sensor: ~h~_(1) = 80 m di atas titik lontar',
          'Waktu melewati ~h~_(1) saat naik: ~t~_(1) = 2 s',
          'Waktu melewati ~h~_(1) saat turun: ~t~_(2) = 8 s',
          'Percepatan gravitasi: ~g~ = 10 m/s^(2)',
        ],
        ditanya: 'Ketinggian maksimum bola (~h~_(maks)) di atas titik lontar.',
        hubunganStimulus:
          'Pada diagram, bola melintasi garis 80 m menuju puncak lalu turun kembali melintasi garis yang sama. Bagian lintasan di atas 80 m bersifat simetris antara gerak naik dan gerak turun.',
      },
      mengidentifikasiKonsep: {
        judulKonsep: 'Simetri Waktu pada Gerak Vertikal ke Atas',
        prinsipIlmiah:
          'Gerak vertikal ke atas membentuk kurva parabola ~h~(~t~) = ~v~_(0)~t~ − [1|2]~g~~t~^(2) yang simetris terhadap sumbu waktu puncak ~t~_(maks). Karena simetris, waktu mencapai titik puncak selalu berada tepat di tengah antara dua waktu pada ketinggian yang sama: ~t~_(maks) = (~t~_(1) + ~t~_(2)) / 2.',
        relevansi:
          'Dengan memanfaatkan simetri dua waktu, kita dapat langsung menentukan waktu puncak dan kecepatan awal tanpa perlu memfaktorkan persamaan kuadrat yang rumit.',
        penjelasanPemula:
          'Lama waktu bola naik dari ketinggian 80 m ke puncak persis sama dengan lama waktu bola turun dari puncak kembali ke 80 m. Karena dari ~t~ = 2 s ke ~t~ = 8 s berjarak 6 detik, berarti butuh 3 detik naik ke puncak dan 3 detik turun kembali!',
      },
      strategiPenyelesaian: {
        pendekatan:
          'Gunakan rata-rata ~t~_(1) dan ~t~_(2) untuk menemukan waktu puncak ~t~_(maks), tentukan kecepatan awal ~v~_(0) dari syarat ~v~ = 0 di puncak, lalu hitung ~h~_(maks).',
        analisisVisual:
          'Periksa juga konsistensi data ~h~_(1) = 80 m dengan persamaan ~v~_(0)~t~ − 5~t~^(2) agar yakin seluruh informasi soal konsisten.',
        rumus: [
          {
            persamaan: '~t~_(maks) = [~t~_(1) + ~t~_(2)|2]',
            keteranganSimbol: [
              '~t~_(maks): waktu dari titik lontar ke ketinggian maksimum (s)',
              '~t~_(1), ~t~_(2): dua waktu pada ketinggian yang sama (s)',
            ],
          },
          {
            persamaan: '~v~_(0) = ~g~ · ~t~_(maks)   dan   ~h~_(maks) = [1|2]~g~~t~_(maks)^(2)',
            keteranganSimbol: [
              '~v~_(0): kecepatan awal lontaran (m/s)',
              '~h~_(maks): ketinggian maksimum di atas titik lontar (m)',
            ],
          },
        ],
      },
      langkahPenyelesaian: [
        {
          judul: 'Menentukan waktu mencapai titik tertinggi menggunakan simetri',
          penjelasan: 'Titik puncak berada tepat di tengah selang waktu ~t~ = 2 s dan ~t~ = 8 s.',
          persamaan: '~t~_(maks) = [2 + 8|2] = 5 s',
          alasanLangkah:
            'Waktu naik dari 0 ke puncak adalah 5 s, dan bola kembali ke titik lontar pada 2 × 5 = 10 s.',
        },
        {
          judul: 'Menentukan kecepatan awal lontaran ~v~_(0)',
          penjelasan: 'Pada puncak (~t~ = 5 s), kecepatan bola menjadi nol.',
          persamaan: '0 = ~v~_(0) − ~g~~t~_(maks)  ⇒  ~v~_(0) = 10 × 5 = 50 m/s',
          alasanLangkah:
            'Cek ketinggian pada ~t~ = 2 s: ~h~(2) = 50(2) − 5(2)^(2) = 100 − 20 = 80 m (tepat sesuai data sensor!).',
        },
        {
          judul: 'Menghitung ketinggian maksimum ~h~_(maks)',
          penjelasan: 'Substitusikan ~t~_(maks) = 5 s atau ~v~_(0) = 50 m/s ke rumus ketinggian maksimum.',
          persamaan: '~h~_(maks) = 50(5) − 5(5)^(2) = 250 − 125 = 125 m',
          alasanLangkah:
            'Dapat juga dihitung dari ~h~_(maks) = ~v~_(0)^(2) / (2~g~) = 2500 / 20 = 125 m.',
          catatanSatuan: 'Masukkan angka 125 (satuan m sudah tersedia).',
        },
      ],
      kesimpulan: {
        hasilAkhir: '125 m',
        maknaKontekstual:
          'Bola dilontarkan dengan kecepatan awal 50 m/s, melewati tinggi 80 m pada detik ke-2 dan ke-8, serta mencapai puncak setinggi 125 m pada detik ke-5.',
        jawabanBenar: '125',
      },
      tipsDanKonsep: {
        caraCepat:
          'Selisih waktu di atas ketinggian 80 m adalah Δ~t~ = 8 − 2 = 6 s, jadi waktu dari 80 m ke puncak adalah 3 s. Jarak tambahan di atas 80 m persis seperti jatuh bebas selama 3 s: Δ~h~ = 5(3)^(2) = 45 m. Maka ~h~_(maks) = 80 + 45 = 125 m!',
        kesalahanUmum: [
          'Menggunakan ~t~ = 2 s atau ~t~ = 8 s langsung sebagai waktu puncak.',
          'Hanya menghitung kenaikan di atas garis 80 m (45 m) dan lupa menjumlahkannya dengan 80 m.',
        ],
        konsepPenting:
          'Dua waktu yang tercatat pada ketinggian yang sama selalu memenuhi rumus Vieta: ~t~_(1) + ~t~_(2) = 2~v~_(0)/~g~ dan ~t~_(1)·~t~_(2) = 2~h~_(1)/~g~.',
        alternatifPenyelesaian:
          'Menggunakan rumus hasil kali akar ~h~_(1) = [1|2]~g~~t~_(1)~t~_(2) = 5(2)(8) = 80 m dan ~h~_(maks) = [1|2]~g~([~t~_(1)+~t~_(2)|2])^(2) = 5(5)^(2) = 125 m.',
      },
    },
    narratorSegments: [
      {
        stageIndex: 0,
        stageTitle: 'Memahami Permasalahan',
        spokenText:
          'Pada soal nomor sembilan, sebuah peluncur di atas dermaga melontarkan bola vertikal ke atas. Sensor mencatat bola melewati ketinggian 80 meter sebanyak dua kali, yakni pada t sama dengan 2 sekon saat naik dan t sama dengan 8 sekon saat turun. Kita diminta mencari ketinggian maksimum bola di atas titik lontar.',
      },
      {
        stageIndex: 1,
        stageTitle: 'Mengidentifikasi Konsep Dasar',
        spokenText:
          'Konsep utamanya adalah simetri gerak vertikal ke atas. Kurva ketinggian terhadap waktu berbentuk parabola yang simetris terhadap titik puncaknya. Artinya, waktu mencapai puncak berada tepat di pertengahan antara dua waktu ketika bola berada pada ketinggian yang sama.',
      },
      {
        stageIndex: 2,
        stageTitle: 'Menentukan Strategi Penyelesaian',
        spokenText:
          'Strateginya sangat ringkas. Pertama, hitung waktu puncak dengan merata-ratakan t satu dan t dua. Kedua, temukan kecepatan awal dari syarat bahwa kecepatan di puncak sama dengan nol. Ketiga, hitung ketinggian maksimum.',
      },
      {
        stageIndex: 3,
        stageTitle: 'Penyelesaian Langkah demi Langkah',
        spokenText:
          'Mari kita hitung. Waktu mencapai puncak adalah 2 ditambah 8 dibagi 2 sama dengan 5 sekon. Karena pada detik kelima kecepatan bola nol, maka kecepatan awal v nol sama dengan g dikali t puncak, yaitu 10 dikali 5 sama dengan 50 meter per sekon. Mari kita cek datanya pada t sama dengan 2 sekon: 50 dikali 2 dikurangi 5 dikali 4 sama dengan 100 dikurangi 20 sama dengan 80 meter. Tepat sekali dengan catatan sensor! Sekarang kita hitung ketinggian maksimum pada t sama dengan 5 sekon: h maksimum sama dengan 50 dikali 5 dikurangi 5 dikali 25, yaitu 250 dikurangi 125 sama dengan 125 meter.',
      },
      {
        stageIndex: 4,
        stageTitle: 'Menarik Kesimpulan',
        spokenText:
          'Jadi ketinggian maksimum bola di atas titik lontar adalah 125 meter.',
      },
      {
        stageIndex: 5,
        stageTitle: 'Tips dan Pemahaman Konsep',
        spokenText:
          'Cara cepat lain yang keren: selisih waktu di atas ketinggian 80 meter adalah 8 dikurangi 2 sama dengan 6 sekon, berarti 3 sekon naik dari 80 meter ke puncak. Kenaikan tambahannya setara jatuh bebas 3 sekon yaitu 5 dikali 3 kuadrat sama dengan 45 meter. Tinggal tambahkan 80 ditambah 45 sama dengan 125 meter!',
      },
    ],
  },
  {
    id: 10,
    type: 'numeric',
    topicGroup: 'GLBB & Pengereman',
    topic: 'Lift · GLBB Tiga Fase · Evaluasi Akar',
    level: 'HOTS · C5',
    title: 'Lift Cepat Gedung Perkantoran',
    stem: [
      'Sebuah lift bergerak naik dari keadaan diam di lantai dasar: dipercepat tetap 2,5 m/s² hingga mencapai kecepatan maksimum v_maks, lalu bergerak dengan kecepatan konstan, kemudian diperlambat tetap 2,5 m/s² hingga berhenti tepat di lantai tujuan. Seluruh perjalanan berlangsung selama 12 s dan menempuh ketinggian total 80 m.',
      'Susun persamaan dari sketsa grafik v–t (trapesium), selesaikan, lalu uji kelayakan fisis setiap akar solusi. Kecepatan maksimum lift adalah …',
    ],
    stimulusCaption:
      'Poros lift dan sketsa grafik v–t trapesium simetris (tidak berskala; v_maks belum diketahui).',
    stimulusChips: [
      'a = 2,5 m/s² (naik & turun)',
      'T total = 12 s',
      'H total = 80 m',
      'Mulai & akhir diam',
    ],
    unit: 'm/s',
    placeholder: 'contoh: 10',
    correctNumeric: { value: 10, tolerance: 0.1 },
    keyLabel: '10 m/s',
    explanation: {
      memahamiPermasalahan: {
        situasi:
          'Lift menempuh ketinggian 80 m dalam total waktu 12 s melalui tiga fase: dipercepat dengan 2,5 m/s^(2), melaju konstan pada kecepatan maksimum ~v~_(maks), lalu diperlambat 2,5 m/s^(2) hingga berhenti.',
        diketahui: [
          'Percepatan fase naik dan besar perlambatan fase turun sama: ~a~ = 2,5 m/s^(2)',
          'Waktu total perjalanan: ~T~ = 12 s',
          'Tinggi total (perpindahan): ~H~ = 80 m',
          'Kecepatan awal dan kecepatan akhir = 0 m/s',
        ],
        ditanya: 'Kecepatan maksimum lift (~v~_(maks)) yang memenuhi kelayakan fisis.',
        hubunganStimulus:
          'Sketsa grafik ~v~–~t~ membentuk bangun trapesium sama kaki karena percepatan dan perlambatannya sama besar. Luas trapesium menyatakan tinggi total 80 m.',
      },
      mengidentifikasiKonsep: {
        judulKonsep: 'Grafik Trapesium Tiga Fase dan Evaluasi Kelayakan Fisis Akar Kuadrat',
        prinsipIlmiah:
          'Pada grafik ~v~–~t~ berbentuk trapesium, luas grafik sama dengan ketinggian tempuh ~H~. Karena durasi fase percepatan ~t~_(1) bergantung pada ~v~_(maks) (~t~_(1) = ~v~_(maks)/~a~), luas trapesium membentuk persamaan kuadrat dengan dua akar. Secara fisis, durasi fase kecepatan konstan (~T~ − 2~t~_(1)) tidak boleh bernilai negatif.',
        relevansi:
          'Tingkat C5 (Evaluasi) menuntut murid tidak sekadar menghitung akar persamaan kuadrat, tetapi menguji akar mana yang masuk akal secara fisis.',
        penjelasanPemula:
          'Jika waktu yang dipakai untuk mempercepat dan memperlambat lift saja sudah lebih dari 12 detik, tentu tidak mungkin lift menyelesaikan perjalanan dalam 12 detik! Itulah alasan salah satu akar harus ditolak.',
      },
      strategiPenyelesaian: {
        pendekatan:
          'Nyatakan lama waktu fase percepatan ~t~_(1) dan fase kecepatan konstan dalam ~v~_(maks), susun rumus luas trapesium sama dengan 80 m, selesaikan persamaan kuadratnya, lalu uji setiap akar terhadap syarat ~t~_(konstan) ≥ 0.',
        analisisVisual:
          'Alas bawah trapesium panjangnya ~T~ = 12 s. Sisi atasnya adalah durasi kecepatan konstan yaitu (12 − 2~t~_(1)) s, dan tingginya adalah ~v~_(maks).',
        rumus: [
          {
            persamaan: '~t~_(1) = [~v~_(maks)|~a~] = [~v~_(maks)|2,5] = 0,4~v~_(maks)',
            keteranganSimbol: ['~t~_(1): waktu fase percepatan (juga sama dengan waktu fase perlambatan) (s)'],
          },
          {
            persamaan: '~H~ = [~T~ + (~T~ − 2~t~_(1))|2] · ~v~_(maks) = (~T~ − ~t~_(1)) · ~v~_(maks)',
            keteranganSimbol: [
              '~H~: tinggi total = 80 m',
              '~T~: waktu total = 12 s',
            ],
          },
        ],
      },
      langkahPenyelesaian: [
        {
          judul: 'Menyusun persamaan kuadrat dari luas trapesium',
          penjelasan: 'Substitusikan ~H~ = 80, ~T~ = 12, dan ~t~_(1) = 0,4~v~_(maks) ke rumus luas trapesium.',
          persamaan: '80 = (12 − 0,4~v~_(maks)) · ~v~_(maks)  ⇒  0,4~v~_(maks)^(2) − 12~v~_(maks) + 80 = 0',
          alasanLangkah:
            'Rumus luas trapesium langsung menghubungkan tinggi tempuh dengan satu variabel ~v~_(maks).',
        },
        {
          judul: 'Menyederhanakan dan memfaktorkan persamaan kuadrat',
          penjelasan: 'Kalikan kedua ruas dengan 2,5 untuk mengubah koefisien 0,4 menjadi 1.',
          persamaan: '~v~_(maks)^(2) − 30~v~_(maks) + 200 = 0  ⇒  (~v~_(maks) − 10)(~v~_(maks) − 20) = 0',
          alasanLangkah:
            'Diperoleh dua kandidat akar matematis: ~v~_(1) = 10 m/s dan ~v~_(2) = 20 m/s.',
        },
        {
          judul: 'Menguji kelayakan fisis kedua akar solusi',
          penjelasan: 'Periksa waktu fase konstan ~t~_(konstan) = 12 − 2~t~_(1) untuk masing-masing akar.',
          persamaan: 'Untuk ~v~ = 20 m/s: ~t~_(1) = 0,4(20) = 8 s ⇒ ~t~_(konstan) = 12 − 16 = −4 s (TIDAK LAYAK)',
          alasanLangkah:
            'Waktu tidak mungkin bernilai negatif; 2~t~_(1) = 16 s sudah melampaui total waktu perjalanan 12 s.',
        },
        {
          judul: 'Memverifikasi akar yang layak fisis',
          penjelasan: 'Uji akar ~v~ = 10 m/s dan hitung kembali luas trapesiumnya.',
          persamaan: 'Untuk ~v~ = 10 m/s: ~t~_(1) = 0,4(10) = 4 s ⇒ ~t~_(konstan) = 12 − 8 = 4 s ≥ 0 (LAYAK) | ~H~ = [12 + 4|2] × 10 = 80 m',
          alasanLangkah:
            'Fase naik 4 s, fase konstan 4 s, dan fase turun 4 s tepat berjumlah 12 s dengan tinggi 80 m.',
          catatanSatuan: 'Masukkan angka 10 (satuan m/s sudah tersedia).',
        },
      ],
      kesimpulan: {
        hasilAkhir: '10 m/s',
        maknaKontekstual:
          'Dari dua akar matematika (10 m/s dan 20 m/s), hanya 10 m/s yang memenuhi syarat fisik ~t~_(konstan) ≥ 0, menghasilkan perjalanan simetris 4 s – 4 s – 4 s sejauh 80 m.',
        jawabanBenar: '10',
      },
      tipsDanKonsep: {
        caraCepat:
          'Batas atas kecepatan maksimum terjadi jika seluruh grafik berupa segitiga tanpa fase konstan (~t~_(1) = ~T~/2 = 6 s): ~v~_(batas) = 2,5 × 6 = 15 m/s. Jadi akar mana pun yang lebih besar dari 15 m/s (seperti 20 m/s) otomatis gugur!',
        kesalahanUmum: [
          'Memilih akar yang lebih besar (20 m/s) karena terkecoh oleh kata "kecepatan maksimum".',
          'Mengira grafik berbentuk segitiga sehingga menghitung luas [1|2] × 12 × ~v~ = 80.',
        ],
        konsepPenting:
          'Dalam fisika, setiap akar persamaan kuadrat wajib diuji terhadap batasan domain fisis (waktu tidak negatif dan tidak melampaui durasi total).',
      },
    },
    narratorSegments: [
      {
        stageIndex: 0,
        stageTitle: 'Memahami Permasalahan',
        spokenText:
          'Soal nomor sepuluh adalah soal evaluasi tingkat tinggi mengenai gerak lift tiga fase. Lift dipercepat 2,5 meter per sekon kuadrat hingga kecepatan maksimum, melaju konstan, lalu diperlambat 2,5 meter per sekon kuadrat hingga berhenti. Seluruh perjalanan memakan waktu 12 sekon dan menempuh ketinggian 80 meter. Kita diminta menyusun persamaan dari trapesium grafik v terhadap t dan menguji kelayakan fisis setiap akarnya.',
      },
      {
        stageIndex: 1,
        stageTitle: 'Mengidentifikasi Konsep Dasar',
        spokenText:
          'Konsep utamanya adalah luas trapesium pada grafik v terhadap t sama dengan tinggi tempuh 80 meter. Karena waktu fase percepatan bergantung pada kecepatan maksimum, kita akan memperoleh persamaan kuadrat dengan dua akar. Namun secara fisis, waktu fase konstan tidak mungkin bernilai negatif.',
      },
      {
        stageIndex: 2,
        stageTitle: 'Menentukan Strategi Penyelesaian',
        spokenText:
          'Pertama, nyatakan waktu percepatan t satu sebagai v maksimum dibagi 2,5, yaitu 0,4 v maksimum. Karena percepatan dan perlambatan sama besar, waktu fase turun juga t satu. Dengan alas bawah 12 sekon dan sisi atas 12 dikurangi 2 t satu, luas trapesiumnya dapat kita samakan dengan 80 meter.',
      },
      {
        stageIndex: 3,
        stageTitle: 'Penyelesaian Langkah demi Langkah',
        spokenText:
          'Mari kita selesaikan. Luas trapesium adalah jumlah sisi sejajar dibagi 2 dikali tinggi, yang menyederhana menjadi kurung buka 12 dikurangi t satu dikali v maksimum sama dengan 80. Substitusi t satu sama dengan 0,4 v maksimum menghasilkan 12 v maksimum dikurangi 0,4 v maksimum kuadrat sama dengan 80. Agar mudah difaktorkan, kalikan seluruh persamaan dengan 2,5 dan pindahkan ke satu ruas, sehingga menjadi v maksimum kuadrat dikurangi 30 v maksimum ditambah 200 sama dengan nol. Pemfaktorannya adalah kurung buka v minus 10 dikali kurung buka v minus 20 sama dengan nol, sehingga kita mendapat dua kandidat akar: 10 meter per sekon dan 20 meter per sekon. Sekarang kita uji kelayakan fisisnya. Jika v sama dengan 20, maka t satu adalah 0,4 kali 20 sama dengan 8 sekon. Padahal ada fase naik dan fase turun, sehingga 2 t satu saja sudah 16 sekon, melebihi waktu total 12 sekon dan membuat waktu fase konstan minus 4 sekon. Itu mustahil secara fisis! Sebaliknya, jika v sama dengan 10, maka t satu sama dengan 4 sekon, dan waktu fase konstan adalah 12 dikurangi 8 sama dengan 4 sekon. Tinggi tempuhnya menjadi 12 ditambah 4 dibagi 2 dikali 10 sama dengan 80 meter. Tepat sekali!',
      },
      {
        stageIndex: 4,
        stageTitle: 'Menarik Kesimpulan',
        spokenText:
          'Jadi satu-satunya solusi kecepatan maksimum lift yang layak secara fisis adalah 10 meter per sekon.',
      },
      {
        stageIndex: 5,
        stageTitle: 'Tips dan Pemahaman Konsep',
        spokenText:
          'Tips cepat: kecepatan terbesar yang mungkin dicapai dalam 12 sekon adalah jika grafik membentuk segitiga tanpa fase konstan, yaitu 2,5 dikali 6 sekon sama dengan 15 meter per sekon. Maka akar 20 meter per sekon langsung bisa dicoret karena melampaui batas fisis 15 meter per sekon.',
      },
    ],
  },
];
