-- 2.1. Tabel Konfigurasi Inti (The "Rules Engine")

-- Tabel untuk menyimpan data master sekolah
CREATE TABLE sekolah (
    id SERIAL PRIMARY KEY,
    npsn VARCHAR(8) UNIQUE NOT NULL, -- Nomor Pokok Sekolah Nasional, unik
    nama_sekolah VARCHAR(255) NOT NULL,
    bentuk_pendidikan VARCHAR(50), -- e.g., 'SMA', 'SMK'
    status_sekolah VARCHAR(50), -- e.g., 'Negeri', 'Swasta'
    alamat_jalan TEXT,
    desa_kelurahan VARCHAR(100),
    kecamatan VARCHAR(100),
    kabupaten_kota VARCHAR(100),
    provinsi VARCHAR(100),
    kode_pos VARCHAR(5),
    email VARCHAR(255),
    website VARCHAR(255),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    wilayah_id INT REFERENCES wilayah(id), -- Relasi ke tabel wilayah
    latitude NUMERIC(10,8),
    longitude NUMERIC(11,8)
);

-- Tabel untuk mendefinisikan tahun ajaran
CREATE TABLE tahun_ajaran (
    id SERIAL PRIMARY KEY,
    tahun_mulai INT NOT NULL,
    tahun_selesai INT NOT NULL,
    nama_tahun_ajaran VARCHAR(20) NOT NULL, -- e.g., '2025/2026'
    is_active BOOLEAN DEFAULT FALSE, -- Menandakan tahun ajaran yang sedang aktif
    UNIQUE(tahun_mulai, tahun_selesai)
);

-- Tabel untuk gelombang penerimaan dalam satu tahun ajaran
CREATE TABLE gelombang_penerimaan (
    id SERIAL PRIMARY KEY,
    tahun_ajaran_id INT REFERENCES tahun_ajaran(id) ON DELETE CASCADE,
    nama_gelombang VARCHAR(100) NOT NULL, -- e.g., 'Gelombang 1', 'Jalur Prestasi Tahap 2'
    tanggal_mulai DATE NOT NULL,
    tanggal_selesai DATE NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabel master untuk jalur seleksi sesuai Permendikbud
CREATE TABLE jalur_seleksi (
    id SERIAL PRIMARY KEY,
    kode_jalur VARCHAR(50) UNIQUE NOT NULL, -- e.g., 'ZONASI', 'AFIRMASI', 'PRESTASI'
    nama_jalur VARCHAR(100) NOT NULL,
    deskripsi TEXT
);

-- Tabel untuk menentukan kuota setiap jalur di setiap sekolah per tahun ajaran
CREATE TABLE kuota_jalur (
    id SERIAL PRIMARY KEY,
    sekolah_id INT REFERENCES sekolah(id) ON DELETE CASCADE,
    tahun_ajaran_id INT REFERENCES tahun_ajaran(id) ON DELETE CASCADE,
    jalur_seleksi_id INT REFERENCES jalur_seleksi(id) ON DELETE CASCADE,
    kuota_persen NUMERIC(5, 2) NOT NULL, -- Persentase kuota, e.g., 50.00
    kuota_absolut INT, -- Jumlah absolut murid jika ada
    UNIQUE(sekolah_id, tahun_ajaran_id, jalur_seleksi_id)
);

-- Tabel referensi untuk semua jenis dokumen yang mungkin diperlukan
CREATE TABLE ref_dokumen (
    id SERIAL PRIMARY KEY,
    kode_dokumen VARCHAR(50) UNIQUE NOT NULL, -- e.g., 'KK', 'AKTA_LAHIR', 'KIP'
    nama_dokumen VARCHAR(255) NOT NULL,
    deskripsi TEXT
);

-- Tabel penghubung yang mendefinisikan syarat dokumen untuk setiap jalur seleksi
CREATE TABLE syarat_jalur (
    id SERIAL PRIMARY KEY,
    jalur_seleksi_id INT REFERENCES jalur_seleksi(id) ON DELETE CASCADE,
    ref_dokumen_id INT REFERENCES ref_dokumen(id) ON DELETE CASCADE,
    is_wajib BOOLEAN NOT NULL DEFAULT TRUE,
    catatan TEXT, -- e.g., 'Diterbitkan minimal 1 tahun sebelum pendaftaran'
    UNIQUE(jalur_seleksi_id, ref_dokumen_id)
);

-- 2.2. Tabel Profil Pendaftar (Selaras Dapodik)
-- Tabel utama untuk data calon murid, selaras dengan standar Dapodik
CREATE TABLE calon_murid (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nama_lengkap VARCHAR(255) NOT NULL,
    jenis_kelamin CHAR(1) NOT NULL, -- 'L' atau 'P'
    nisn VARCHAR(10) UNIQUE, -- Bisa NULL jika belum punya
    nik VARCHAR(16) UNIQUE NOT NULL, -- Nomor Induk Kependudukan
    nomor_kk VARCHAR(16), -- Nomor Kartu Keluarga
    tempat_lahir VARCHAR(100) NOT NULL,
    tanggal_lahir DATE NOT NULL,
    agama VARCHAR(50),
    kewarganegaraan VARCHAR(50) DEFAULT 'Indonesia (WNI)',
    kebutuhan_khusus VARCHAR(100), -- Untuk penyandang disabilitas
    anak_ke INT,
    jumlah_saudara_kandung INT,
    nomor_telepon_hp VARCHAR(20),
    email VARCHAR(255),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    deleted_at TIMESTAMPTZ, -- Soft delete
    CONSTRAINT nik_format CHECK (char_length(nik) = 16),
    CONSTRAINT nisn_format CHECK (nisn IS NULL OR char_length(nisn) = 10)
);

-- Tabel master orang tua
CREATE TABLE orang_tua (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nama_lengkap VARCHAR(255) NOT NULL,
    nik VARCHAR(16),
    tahun_lahir INT,
    pendidikan_terakhir VARCHAR(50),
    pekerjaan VARCHAR(100),
    penghasilan_bulanan VARCHAR(100),
    kebutuhan_khusus VARCHAR(100),
    nomor_telepon_hp VARCHAR(20),
    jenis_kelamin CHAR(1) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabel relasi orang tua dan calon murid
CREATE TABLE orang_tua_murid (
    id SERIAL PRIMARY KEY,
    orang_tua_id UUID REFERENCES orang_tua(id) ON DELETE CASCADE,
    calon_murid_id UUID REFERENCES calon_murid(id) ON DELETE CASCADE,
    status_hubungan VARCHAR(50) NOT NULL, -- 'AYAH_KANDUNG', 'IBU_KANDUNG', 'WALI'
);

-- Tabel terdedikasi untuk alamat, penting untuk jalur zonasi
CREATE TABLE alamat (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    calon_murid_id UUID REFERENCES calon_murid(id) ON DELETE CASCADE,
    jenis_alamat VARCHAR(50) DEFAULT 'DOMISILI_KK', -- e.g., 'DOMISILI_KK', 'TEMPAT_TINGGAL'
    alamat_jalan TEXT NOT NULL,
    rt VARCHAR(3),
    rw VARCHAR(3),
    nama_dusun VARCHAR(100),
    desa_kelurahan VARCHAR(100) NOT NULL,
    kecamatan VARCHAR(100) NOT NULL,
    kabupaten_kota VARCHAR(100) NOT NULL,
    provinsi VARCHAR(100) NOT NULL,
    kode_pos VARCHAR(5),
    lintang NUMERIC(10, 8), -- Latitude, presisi tinggi untuk perhitungan jarak
    bujur NUMERIC(11, 8), -- Longitude, presisi tinggi untuk perhitungan jarak
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    wilayah_id INT REFERENCES wilayah(id) -- Relasi ke tabel wilayah
);

-- Tabel untuk menyimpan informasi sekolah asal calon murid
CREATE TABLE sekolah_asal (
    id SERIAL PRIMARY KEY,
    calon_murid_id UUID REFERENCES calon_murid(id) ON DELETE CASCADE,
    npsn_sekolah_asal VARCHAR(8),
    nama_sekolah_asal VARCHAR(255) NOT NULL,
    status_sekolah VARCHAR(50), -- 'Negeri' atau 'Swasta'
    alamat_sekolah_asal TEXT,
    tahun_lulus INT NOT NULL
);

-- 2.3. Tabel Pendaftaran dan Manajemen Dokumen
-- Tipe data ENUM untuk status pendaftaran agar konsisten
CREATE TYPE status_pendaftaran_enum AS ENUM ('BARU', 'MENUNGGU_VERIFIKASI', 'PERLU_PERBAIKAN', 'TERVERIFIKASI', 'DITERIMA', 'DITOLAK', 'DAFTAR_ULANG', 'MENGUNDURKAN_DIRI');

-- Tabel transaksi utama untuk setiap pendaftaran
CREATE TABLE pendaftaran (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nomor_pendaftaran VARCHAR(20) UNIQUE NOT NULL,
    user_id UUID NOT NULL,
    calon_murid_id UUID REFERENCES calon_murid(id) ON DELETE CASCADE,
    sekolah_tujuan_id INT REFERENCES sekolah(id) ON DELETE CASCADE,
    tahun_ajaran_id INT REFERENCES tahun_ajaran(id) ON DELETE CASCADE,
    gelombang_id INT REFERENCES gelombang_penerimaan(id) ON DELETE CASCADE,
    jalur_seleksi_pilihan_id INT REFERENCES jalur_seleksi(id) ON DELETE SET NULL,
    status_pendaftaran status_pendaftaran_enum NOT NULL DEFAULT 'BARU',
    tanggal_pendaftaran TIMESTAMPTZ DEFAULT NOW(),
    catatan_pendaftaran TEXT, -- Catatan dari panitia atau sistem
    is_deleted BOOLEAN DEFAULT FALSE,
    deleted_at TIMESTAMPTZ, -- Soft delete
    created_by VARCHAR(100),
    updated_by VARCHAR(100)
);

-- Tipe data ENUM untuk status verifikasi dokumen
CREATE TYPE status_verifikasi_enum AS ENUM ('MENUNGGU_VERIFIKASI', 'VALID', 'TIDAK_VALID', 'PERBAIKAN');

-- Tabel untuk menyimpan file dokumen yang diunggah oleh pendaftar
CREATE TABLE dokumen_pendaftar (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    pendaftaran_id UUID REFERENCES pendaftaran(id) ON DELETE CASCADE,
    ref_dokumen_id INT REFERENCES ref_dokumen(id) ON DELETE CASCADE,
    nama_file_asli VARCHAR(255) NOT NULL,
    path_file TEXT NOT NULL, -- Path di server atau cloud storage
    tipe_file VARCHAR(100),
    ukuran_file_kb INT,
    status_verifikasi status_verifikasi_enum NOT NULL DEFAULT 'MENUNGGU_VERIFIKASI',
    catatan_verifikator TEXT, -- Feedback jika dokumen ditolak
    diunggah_pada TIMESTAMPTZ DEFAULT NOW(),
    diverifikasi_pada TIMESTAMPTZ,
    diverifikasi_oleh VARCHAR(100), -- Nama atau ID verifikator
    tipe_storage VARCHAR(32),
    versi INT DEFAULT 1,
    is_active BOOLEAN DEFAULT TRUE,
    created_by VARCHAR(100),
    updated_by VARCHAR(100)
);

-- Tabel log untuk melacak setiap perubahan status pendaftaran (audit trail)
CREATE TABLE log_status_pendaftaran (
    id SERIAL PRIMARY KEY,
    pendaftaran_id UUID REFERENCES pendaftaran(id) ON DELETE CASCADE,
    status_lama status_pendaftaran_enum,
    status_baru status_pendaftaran_enum NOT NULL,
    diubah_oleh VARCHAR(100), -- 'SISTEM' atau nama admin
    waktu_perubahan TIMESTAMPTZ DEFAULT NOW(),
    catatan TEXT
);

-- 2.4. Tabel Keuangan dan Payment Gateway
-- Tabel untuk mendefinisikan semua komponen biaya yang mungkin ada
CREATE TABLE komponen_biaya (
    id SERIAL PRIMARY KEY,
    sekolah_id INT REFERENCES sekolah(id) ON DELETE CASCADE,
    tahun_ajaran_id INT REFERENCES tahun_ajaran(id),
    kode_biaya VARCHAR(50) NOT NULL,
    nama_biaya VARCHAR(255) NOT NULL,
    jumlah NUMERIC(15, 2) NOT NULL,
    is_wajib BOOLEAN NOT NULL DEFAULT TRUE,
    deskripsi TEXT,
    created_by VARCHAR(100),
    updated_by VARCHAR(100)
);
ALTER TABLE komponen_biaya ADD CONSTRAINT komponen_biaya_unik UNIQUE(sekolah_id, tahun_ajaran_id, kode_biaya);

-- Tabel untuk membuat tagihan (invoice) untuk setiap pendaftar
CREATE TABLE tagihan (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    pendaftaran_id UUID REFERENCES pendaftaran(id) ON DELETE CASCADE,
    nomor_tagihan VARCHAR(50) UNIQUE NOT NULL,
    total_tagihan NUMERIC(15, 2) NOT NULL,
    tanggal_terbit DATE NOT NULL,
    tanggal_jatuh_tempo DATE,
    status_tagihan status_tagihan_enum NOT NULL DEFAULT 'BELUM_LUNAS',
    tipe_tagihan VARCHAR(32) DEFAULT 'REGULER',
    jadwal_pembayaran JSONB, -- JSON jadwal pembayaran jika bertahap
    prioritas INT DEFAULT 1,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    created_by VARCHAR(100),
    updated_by VARCHAR(100)
);

-- Tabel detail untuk menghubungkan tagihan dengan komponen biaya (many-to-many)
CREATE TABLE detail_tagihan (
    tagihan_id UUID REFERENCES tagihan(id) ON DELETE CASCADE,
    komponen_biaya_id INT REFERENCES komponen_biaya(id) ON DELETE CASCADE,
    jumlah NUMERIC(15, 2) NOT NULL,
    PRIMARY KEY (tagihan_id, komponen_biaya_id)
);

-- Tipe data ENUM untuk status pembayaran
CREATE TYPE status_pembayaran_enum AS ENUM ('PENDING', 'SUCCESS', 'FAILED', 'EXPIRED', 'REFUNDED');

-- Tabel untuk mencatat setiap transaksi pembayaran
CREATE TABLE pembayaran (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tagihan_id UUID REFERENCES tagihan(id) ON DELETE CASCADE,
    nomor_referensi_gateway VARCHAR(255) UNIQUE, -- ID transaksi dari payment gateway
    metode_pembayaran VARCHAR(100), -- e.g., 'VIRTUAL_ACCOUNT_BCA', 'QRIS', 'GERAI_RETAIL'
    jumlah_bayar NUMERIC(15, 2) NOT NULL,
    status_pembayaran status_pembayaran_enum NOT NULL DEFAULT 'PENDING',
    waktu_transaksi TIMESTAMPTZ,
    waktu_penyelesaian TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    deleted_at TIMESTAMPTZ, -- Soft delete
    fee NUMERIC(15,2),
    refund_amount NUMERIC(15,2),
    error_message TEXT,
    created_by VARCHAR(100),
    updated_by VARCHAR(100)
);

-- Tabel master kupon/diskon pembayaran
-- Tabel master kupon/diskon pembayaran, relasi ke sekolah
CREATE TABLE kupon_diskon (
    id SERIAL PRIMARY KEY,
    sekolah_id INT REFERENCES sekolah(id) ON DELETE CASCADE, -- Diskon dikeluarkan oleh sekolah
    kode_kupon VARCHAR(32) UNIQUE NOT NULL,
    nama VARCHAR(128) NOT NULL,
    tipe_diskon VARCHAR(10) NOT NULL, -- 'persen' atau 'nominal'
    tipe_kupon VARCHAR(20) NOT NULL, -- 'EARLY_BIRD', 'SIBLING', 'LAINNYA'
    nilai NUMERIC(10,2) NOT NULL, -- nilai diskon (persen atau nominal)
    tanggal_mulai DATE,
    tanggal_selesai DATE,
    kuota INT, -- berapa kali bisa digunakan
    aktif BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    created_by VARCHAR(100),
    updated_by VARCHAR(100)
);

-- Tambahkan relasi kupon_diskon pada pembayaran
ALTER TABLE pembayaran ADD COLUMN kupon_diskon_id INT REFERENCES kupon_diskon(id);
ALTER TABLE pembayaran ADD COLUMN diskon_persen NUMERIC(5,2);
ALTER TABLE pembayaran ADD COLUMN diskon_nominal NUMERIC(15,2);
ALTER TABLE pembayaran ADD COLUMN jumlah_bayar_setelah_diskon NUMERIC(15,2);

-- Tabel tracking penggunaan kupon/diskon pada pendaftaran
CREATE TABLE penggunaan_kupon_diskon (
    id SERIAL PRIMARY KEY,
    pendaftaran_id UUID REFERENCES pendaftaran(id) ON DELETE CASCADE,
    kupon_diskon_id INT REFERENCES kupon_diskon(id) ON DELETE CASCADE,
    waktu_digunakan TIMESTAMPTZ DEFAULT NOW(),
    keterangan VARCHAR(255),
    created_by VARCHAR(100),
    updated_by VARCHAR(100)
);

-- Komentar dokumentasi
COMMENT ON COLUMN komponen_biaya.sekolah_id IS 'Relasi ke sekolah, komponen biaya bisa berbeda per sekolah dan tahun ajaran';
COMMENT ON COLUMN tagihan.tipe_tagihan IS 'Tipe tagihan: REGULER, WAJIB_AWAL, CICILAN, LAINNYA';
COMMENT ON COLUMN tagihan.jadwal_pembayaran IS 'Jadwal pembayaran bertahap, format JSON/teks';
COMMENT ON COLUMN tagihan.prioritas IS 'Urutan prioritas pembayaran, tagihan prioritas lebih dulu harus dibayar';
COMMENT ON TABLE wilayah IS 'Referensi wilayah administratif: provinsi, kabupaten/kota, kecamatan, desa/kelurahan';
COMMENT ON COLUMN sekolah.latitude IS 'Latitude sekolah untuk geo location dan zonasi';
COMMENT ON COLUMN sekolah.longitude IS 'Longitude sekolah untuk geo location dan zonasi';
COMMENT ON COLUMN dokumen_pendaftar.tipe_storage IS 'Jenis storage dokumen: local/cloud';
COMMENT ON COLUMN pembayaran.fee IS 'Biaya admin payment gateway';
COMMENT ON COLUMN pembayaran.refund_amount IS 'Jumlah refund jika ada pembatalan';
COMMENT ON COLUMN pembayaran.error_message IS 'Pesan error dari payment gateway';
COMMENT ON TABLE kupon_diskon IS 'Master kupon/diskon pembayaran, relasi ke sekolah, mendukung potongan persen dan nominal, tipe early bird/sibling';
COMMENT ON COLUMN kupon_diskon.sekolah_id IS 'Relasi ke sekolah yang mengeluarkan diskon';
COMMENT ON COLUMN kupon_diskon.tipe_kupon IS 'Tipe kupon: EARLY_BIRD, SIBLING, LAINNYA';
COMMENT ON TABLE penggunaan_kupon_diskon IS 'Tracking penggunaan kupon/diskon pada pendaftaran';
COMMENT ON COLUMN pembayaran.kupon_diskon_id IS 'Relasi ke kupon diskon yang digunakan';
COMMENT ON COLUMN pembayaran.diskon_persen IS 'Diskon dalam persen jika tipe diskon adalah persen';
COMMENT ON COLUMN pembayaran.diskon_nominal IS 'Diskon dalam nominal jika tipe diskon adalah nominal';
COMMENT ON COLUMN pembayaran.jumlah_bayar_setelah_diskon IS 'Jumlah bayar final setelah diskon diterapkan';

-- Index untuk pencarian dan join
CREATE INDEX idx_calon_murid_nik ON calon_murid(nik);
CREATE INDEX idx_calon_murid_nisn ON calon_murid(nisn);
CREATE INDEX idx_pendaftaran_nomor ON pendaftaran(nomor_pendaftaran);
CREATE INDEX idx_pembayaran_nomor_gateway ON pembayaran(nomor_referensi_gateway);
CREATE INDEX idx_sekolah_wilayah ON sekolah(wilayah_id);
CREATE INDEX idx_alamat_wilayah ON alamat(wilayah_id);

-- Komentar pada tabel dan kolom
COMMENT ON TABLE calon_murid IS 'Data pokok calon murid, selaras Dapodik';
COMMENT ON COLUMN calon_murid.nik IS 'Nomor Induk Kependudukan, wajib dan unik';
COMMENT ON TABLE sekolah IS 'Master data sekolah, relasi ke wilayah';
COMMENT ON COLUMN sekolah.wilayah_id IS 'Relasi ke tabel wilayah';
COMMENT ON TABLE alamat IS 'Alamat detail calon murid, relasi ke wilayah';
COMMENT ON COLUMN alamat.wilayah_id IS 'Relasi ke tabel wilayah';
COMMENT ON TABLE pembayaran IS 'Transaksi pembayaran, terhubung ke payment gateway';
COMMENT ON COLUMN pembayaran.nomor_referensi_gateway IS 'ID transaksi dari payment gateway';