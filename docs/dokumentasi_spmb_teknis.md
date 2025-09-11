# Dokumentasi Teknis SPMB - Sistem Informasi Penerimaan Murid Baru

## 1. Simulasi Use Case

### Use Case 1: Orang Tua Mendaftarkan Anak
- Orang tua (user) login/register di sistem.
- Orang tua mengisi data pendaftaran untuk satu atau lebih anak (calon murid).
- Sistem menyimpan data pendaftaran, relasi user → pendaftaran → calon_murid.
- Orang tua mengunggah dokumen persyaratan.
- Sistem melakukan verifikasi dokumen dan status pendaftaran.
- Orang tua melakukan pembayaran biaya pendaftaran/tagihan.
- Jika memenuhi syarat, status pendaftaran berubah menjadi diterima.

### Use Case 2: Admin Sekolah Mengelola Kuota dan Seleksi
- Admin login sebagai user dengan role admin.
- Admin mengatur kuota jalur seleksi, komponen biaya, dan tahun ajaran.
- Admin memverifikasi dokumen dan status pendaftar.
- Admin mengelola pembayaran, diskon, dan kupon.

### Use Case 3: Operator Dinas Melakukan Audit
- Operator dinas login sebagai user dengan role dinas.
- Operator mengakses data audit trail, log status pendaftaran, dan laporan pembayaran.

## 2. User Journey

1. User (Orang Tua) membuat akun dan login.
2. User mengisi data anak (calon murid) dan data orang tua.
3. User memilih sekolah tujuan, jalur seleksi, dan gelombang penerimaan.
4. User mengisi formulir pendaftaran dan mengunggah dokumen.
5. User menerima tagihan dan melakukan pembayaran.
6. User memantau status pendaftaran dan verifikasi dokumen.
7. Jika diterima, user melakukan daftar ulang dan pelaporan diri.

## 3. Functional Requirement

- Registrasi dan login user (orang tua, admin, operator dinas).
- Multi anak per user (user dapat mendaftarkan lebih dari satu calon murid).
- Manajemen data calon murid, orang tua, alamat, sekolah asal.
- Pendaftaran sekolah tujuan, jalur seleksi, gelombang penerimaan.
- Upload dan verifikasi dokumen persyaratan.
- Manajemen tagihan, pembayaran, diskon, kupon.
- Audit trail status pendaftaran dan pembayaran.
- Soft delete dan audit (created_by, updated_by, deleted_at, is_deleted).
- Multi sekolah dan multi tahun ajaran.
- Validasi data (NIK, NISN, format dokumen, status pembayaran).

## 4. Desain Isian Formulir & Keterangan

### Formulir Pendaftaran Calon Murid
- Nama Lengkap: Wajib, sesuai dokumen.
- Jenis Kelamin: Pilihan (L/P).
- NIK: Wajib, 16 digit, unik.
- NISN: Opsional, 10 digit.
- Tempat & Tanggal Lahir: Wajib.
- Agama: Pilihan.
- Kewarganegaraan: Default 'Indonesia (WNI)'.
- Kebutuhan Khusus: Opsional.
- Anak Ke, Jumlah Saudara Kandung: Opsional.
- Nomor Telepon HP, Email: Opsional.

### Formulir Data Orang Tua
- Nama Lengkap: Wajib.
- NIK: Opsional.
- Tahun Lahir: Opsional.
- Pendidikan Terakhir: Pilihan.
- Pekerjaan: Pilihan.
- Penghasilan Bulanan: Pilihan.
- Kebutuhan Khusus: Opsional.
- Nomor Telepon HP: Opsional.
- Jenis Kelamin: Pilihan (L/P).

### Formulir Alamat
- Jenis Alamat: Pilihan (DOMISILI_KK/TEMPAT_TINGGAL).
- Alamat Jalan, RT/RW, Dusun, Desa/Kelurahan, Kecamatan, Kabupaten/Kota, Provinsi, Kode Pos: Wajib.
- Lintang/Bujur: Opsional (untuk zonasi).

### Formulir Pendaftaran Sekolah
- Sekolah Tujuan: Pilihan dari daftar sekolah.
- Tahun Ajaran: Pilihan dari daftar tahun ajaran.
- Gelombang Penerimaan: Pilihan dari daftar gelombang.
- Jalur Seleksi: Pilihan dari daftar jalur seleksi.

### Formulir Upload Dokumen
- Jenis Dokumen: Pilihan dari daftar dokumen persyaratan.
- File Upload: Wajib, format dan ukuran sesuai ketentuan.

### Formulir Pembayaran
- Metode Pembayaran: Pilihan (VA, QRIS, Retail, dll).
- Kupon/Diskon: Opsional, jika tersedia.
- Jumlah Bayar: Otomatis terhitung.

### Keterangan Isian
- Semua field wajib harus divalidasi di frontend dan backend.
- Field opsional tetap bisa diisi untuk kelengkapan data.
- Dokumen harus diverifikasi oleh admin/operator.
- Status pendaftaran dan pembayaran dapat dipantau oleh user.

---

Dokumentasi ini dapat dikembangkan sesuai kebutuhan implementasi dan integrasi frontend/backend.
