"use client";
import { BiodataFormValues, biodataSchema } from "@/schemas/biodataSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@workspace/ui/components/button";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function BiodataForm({ onSubmit }: { onSubmit?: (data: BiodataFormValues) => void }) {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<BiodataFormValues>({
        resolver: zodResolver(biodataSchema),
        mode: "onTouched",
    });
    const [success, setSuccess] = useState(false);

    const submitHandler = (data: BiodataFormValues) => {
        setSuccess(true);
        onSubmit?.(data);
        setTimeout(() => setSuccess(false), 2000);
        reset();
    };

    return (
        <form onSubmit={handleSubmit(submitHandler)} className="space-y-6 max-w-lg mx-auto p-8 bg-white rounded-xl shadow-md border border-blue-100">
            <div className="grid grid-cols-1 gap-5">
                <div>
                    <label className="block text-sm font-semibold text-blue-900 mb-2">Nama Lengkap</label>
                    <input type="text" {...register("nama")}
                        className={`w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300 bg-blue-50 text-blue-900 placeholder:text-blue-400 ${errors.nama ? "border-red-500" : "border-blue-200"}`} placeholder="Masukkan nama lengkap" />
                    {errors.nama && <span className="text-red-500 text-xs mt-1 block">{errors.nama.message}</span>}
                </div>
                <div>
                    <label className="block text-sm font-semibold text-blue-900 mb-2">NIK</label>
                    <input type="text" {...register("nik")}
                        className={`w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300 bg-blue-50 text-blue-900 placeholder:text-blue-400 ${errors.nik ? "border-red-500" : "border-blue-200"}`} maxLength={16} placeholder="16 digit NIK" />
                    {errors.nik && <span className="text-red-500 text-xs mt-1 block">{errors.nik.message}</span>}
                </div>
                <div className="grid grid-cols-2 gap-5">
                    <div>
                        <label className="block text-sm font-semibold text-blue-900 mb-2">Tempat Lahir</label>
                        <input type="text" {...register("tempatLahir")}
                            className={`w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300 bg-blue-50 text-blue-900 placeholder:text-blue-400 ${errors.tempatLahir ? "border-red-500" : "border-blue-200"}`} placeholder="Kota/Kabupaten" />
                        {errors.tempatLahir && <span className="text-red-500 text-xs mt-1 block">{errors.tempatLahir.message}</span>}
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-blue-900 mb-2">Tanggal Lahir</label>
                        <input type="date" {...register("tanggalLahir")}
                            className={`w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300 bg-blue-50 text-blue-900 placeholder:text-blue-400 ${errors.tanggalLahir ? "border-red-500" : "border-blue-200"}`} />
                        {errors.tanggalLahir && <span className="text-red-500 text-xs mt-1 block">{errors.tanggalLahir.message}</span>}
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-semibold text-blue-900 mb-2">Jenis Kelamin</label>
                    <select {...register("jenisKelamin")}
                        className={`w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300 bg-blue-50 text-blue-900 ${errors.jenisKelamin ? "border-red-500" : "border-blue-200"}`}>
                        <option value="">Pilih</option>
                        <option value="Laki-laki">Laki-laki</option>
                        <option value="Perempuan">Perempuan</option>
                    </select>
                    {errors.jenisKelamin && <span className="text-red-500 text-xs mt-1 block">{errors.jenisKelamin.message}</span>}
                </div>
                <div>
                    <label className="block text-sm font-semibold text-blue-900 mb-2">Alamat</label>
                    <textarea {...register("alamat")}
                        className={`w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300 bg-blue-50 text-blue-900 placeholder:text-blue-400 ${errors.alamat ? "border-red-500" : "border-blue-200"}`} rows={2} placeholder="Alamat lengkap" />
                    {errors.alamat && <span className="text-red-500 text-xs mt-1 block">{errors.alamat.message}</span>}
                </div>
                <div className="grid grid-cols-2 gap-5">
                    <div>
                        <label className="block text-sm font-semibold text-blue-900 mb-2">Nama Orang Tua/Wali</label>
                        <input type="text" {...register("namaOrangTua")}
                            className={`w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300 bg-blue-50 text-blue-900 placeholder:text-blue-400 ${errors.namaOrangTua ? "border-red-500" : "border-blue-200"}`} placeholder="Nama orang tua/wali" />
                        {errors.namaOrangTua && <span className="text-red-500 text-xs mt-1 block">{errors.namaOrangTua.message}</span>}
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-blue-900 mb-2">Nomor HP</label>
                        <input type="tel" {...register("noHp")}
                            className={`w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300 bg-blue-50 text-blue-900 placeholder:text-blue-400 ${errors.noHp ? "border-red-500" : "border-blue-200"}`} placeholder="08xxxxxxxxxx" />
                        {errors.noHp && <span className="text-red-500 text-xs mt-1 block">{errors.noHp.message}</span>}
                    </div>
                </div>
            </div>
            <Button type="submit" className="w-full mt-4" variant="default" disabled={isSubmitting}>
                {isSubmitting ? "Menyimpan..." : "Simpan Biodata"}
            </Button>
            {success && <div className="text-green-600 text-center mt-2">Biodata berhasil disimpan!</div>}
        </form>
    );
}
