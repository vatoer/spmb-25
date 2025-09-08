import { z } from "zod";

export const biodataSchema = z.object({
    nama: z.string().min(2, "Nama wajib diisi dan minimal 2 karakter"),
    nik: z.string().length(16, "NIK harus 16 digit"),
    tempatLahir: z.string().min(2, "Tempat lahir wajib diisi"),
    tanggalLahir: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Format tanggal yyyy-mm-dd"),
    jenisKelamin: z.enum(["Laki-laki", "Perempuan"]),
    alamat: z.string().min(5, "Alamat wajib diisi"),
    namaOrangTua: z.string().min(2, "Nama orang tua wajib diisi"),
    noHp: z.string().min(10, "Nomor HP wajib diisi dan minimal 10 digit"),
});

export type BiodataFormValues = z.infer<typeof biodataSchema>;
