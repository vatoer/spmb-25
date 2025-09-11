import { z } from "zod";

export const AlamatSchema = z.object({
    jenis_alamat: z.enum(["DOMISILI_KK", "TINGGAL_SKD", "TINGGAL_PESANTREN", "TINGGAL_ASRAMA", "TINGGAL_PANTI_ASUHAN"]),
    alamat_jalan: z.string().min(3),
    rt: z.string().optional(),
    rw: z.string().optional(),
    nama_dusun: z.string().optional(),
    desa_kelurahan: z.string().min(2),
    kecamatan: z.string().min(2),
    kabupaten_kota: z.string().min(2),
    provinsi: z.string().min(2),
    kode_pos: z.string().optional(),
    lintang: z.coerce.number().optional(),
    bujur: z.coerce.number().optional(),
});

export type AlamatType = z.infer<typeof AlamatSchema>;

// ...tambahkan schema lain untuk Biodata, OrangTua, Sekolah, Dokumen, Pembayaran sesuai kebutuhan

export const BiodataSchema = z.object({
    nama_lengkap: z.string().min(3),
    jenis_kelamin: z.enum(["L", "P"]),
    nik: z.string().length(16),
    nisn: z.string().length(10).optional(),
    nomor_kk: z.string().length(16).optional(),
    tempat_lahir: z.string().min(2),
    tanggal_lahir: z.string(),
    agama: z.string().optional(),
    kewarganegaraan: z.string().optional(),
    kebutuhan_khusus: z.string().optional(),
    anak_ke: z.coerce.number().optional(),
    jumlah_saudara_kandung: z.coerce.number().optional(),
    nomor_telepon_hp: z.string().optional(),
    email: z.string().email().optional(),
});
export type BiodataType = z.infer<typeof BiodataSchema>;

const SingleOrtuSchema = z.object({
    nama_lengkap: z.string().min(3),
    nik: z.string().length(16).optional(),
    tahun_lahir: z.coerce.number().optional(),
    pendidikan_terakhir: z.string().optional(),
    pekerjaan: z.string().optional(),
    penghasilan_bulanan: z.string().optional(),
    kebutuhan_khusus: z.string().optional(),
    nomor_telepon_hp: z.string().optional(),
    jenis_kelamin: z.enum(["L", "P"]),
});
export const OrangTuaSchema = z.object({
    ayah: SingleOrtuSchema,
    ibu: SingleOrtuSchema,
    wali: SingleOrtuSchema.optional(),
});
export type OrangTuaType = z.infer<typeof OrangTuaSchema>;

export const SekolahSchema = z.object({
    sekolah_tujuan_id: z.string(),
    tahun_ajaran_id: z.string(),
    gelombang_id: z.string(),
    jalur_seleksi_pilihan_id: z.string(),
});
export type SekolahType = z.infer<typeof SekolahSchema>;

export const DokumenSchema = z.object({
    ref_dokumen_id: z.string(),
    file: z.any(),
    catatan_verifikator: z.string().optional(),
});
export type DokumenType = z.infer<typeof DokumenSchema>;

export const PembayaranSchema = z.object({
    metode_pembayaran: z.string(),
    kupon_diskon_id: z.string().optional(),
    jumlah_bayar: z.coerce.number(),
});
export type PembayaranType = z.infer<typeof PembayaranSchema>;

export const SekolahAsalSchema = z.object({
    npsn_sekolah_asal: z.string().length(8),
    nama_sekolah_asal: z.string().min(3),
    status_sekolah: z.string().optional(),
    alamat_sekolah_asal: z.string().optional(),
    tahun_lulus: z.coerce.number(),
});
export type SekolahAsalType = z.infer<typeof SekolahAsalSchema>;
