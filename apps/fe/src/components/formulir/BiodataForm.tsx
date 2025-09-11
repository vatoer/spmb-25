import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@workspace/ui/components/button";
import { Input } from "@workspace/ui/components/input";
import { Label } from "@workspace/ui/components/label";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { BiodataSchema, BiodataType } from "./schemas";

export function BiodataForm({ onNext, defaultValues }: { onNext: (data: BiodataType) => void, defaultValues?: BiodataType }) {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<BiodataType>({ resolver: zodResolver(BiodataSchema), defaultValues });

    useEffect(() => {
        if (defaultValues) {
            reset(defaultValues);
        }
    }, [defaultValues, reset]);

    return (
        <div className="max-w-3xl mx-auto">
            <div className="bg-card border border-border rounded-2xl shadow-lg p-8 mb-8">
                <h2 className="text-2xl font-bold text-primary mb-6">Formulir Biodata Calon Murid</h2>
                <form onSubmit={handleSubmit(onNext)} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-1">
                        <Label htmlFor="nama_lengkap" className="block font-semibold mb-1 text-muted-foreground">Nama Lengkap</Label>
                        <Input id="nama_lengkap" {...register("nama_lengkap")} required className="w-full" />
                        {errors.nama_lengkap && <span className="text-destructive text-xs mt-1 block">{errors.nama_lengkap.message}</span>}
                    </div>
                    <div className="flex flex-col gap-1">
                        <Label htmlFor="jenis_kelamin" className="block font-semibold mb-1 text-muted-foreground">Jenis Kelamin</Label>
                        <select id="jenis_kelamin" {...register("jenis_kelamin")} required className="w-full border rounded-md px-3 py-2 bg-background">
                            <option value="">Pilih</option>
                            <option value="L">Laki-laki</option>
                            <option value="P">Perempuan</option>
                        </select>
                        {errors.jenis_kelamin && <span className="text-destructive text-xs mt-1 block">{errors.jenis_kelamin.message}</span>}
                    </div>
                    <div className="flex flex-col gap-1">
                        <Label htmlFor="nik" className="block font-semibold mb-1 text-muted-foreground">NIK</Label>
                        <Input id="nik" {...register("nik")} required className="w-full" />
                        {errors.nik && <span className="text-destructive text-xs mt-1 block">{errors.nik.message}</span>}
                    </div>
                    <div className="flex flex-col gap-1">
                        <Label htmlFor="nomor_kk" className="block font-semibold mb-1 text-muted-foreground">Nomor KK</Label>
                        <Input id="nomor_kk" {...register("nomor_kk")} required className="w-full" />
                        {errors.nomor_kk && <span className="text-destructive text-xs mt-1 block">{errors.nomor_kk.message}</span>}
                    </div>
                    <div className="flex flex-col gap-1">
                        <Label htmlFor="nisn" className="block font-semibold mb-1 text-muted-foreground">NISN</Label>
                        <Input id="nisn" {...register("nisn")} className="w-full" />
                        {errors.nisn && <span className="text-destructive text-xs mt-1 block">{errors.nisn.message}</span>}
                    </div>
                    <div className="flex flex-col gap-1">
                        <Label htmlFor="tempat_lahir" className="block font-semibold mb-1 text-muted-foreground">Tempat Lahir</Label>
                        <Input id="tempat_lahir" {...register("tempat_lahir")} required className="w-full" />
                        {errors.tempat_lahir && <span className="text-destructive text-xs mt-1 block">{errors.tempat_lahir.message}</span>}
                    </div>
                    <div className="flex flex-col gap-1">
                        <Label htmlFor="tanggal_lahir" className="block font-semibold mb-1 text-muted-foreground">Tanggal Lahir</Label>
                        <Input id="tanggal_lahir" type="date" {...register("tanggal_lahir")} required className="w-full" />
                        {errors.tanggal_lahir && <span className="text-destructive text-xs mt-1 block">{errors.tanggal_lahir.message}</span>}
                    </div>
                    <div className="flex flex-col gap-1">
                        <Label htmlFor="agama" className="block font-semibold mb-1 text-muted-foreground">Agama</Label>
                        <Input id="agama" {...register("agama")} className="w-full" />
                        {errors.agama && <span className="text-destructive text-xs mt-1 block">{errors.agama.message}</span>}
                    </div>
                    <div className="flex flex-col gap-1">
                        <Label htmlFor="kewarganegaraan" className="block font-semibold mb-1 text-muted-foreground">Kewarganegaraan</Label>
                        <Input id="kewarganegaraan" {...register("kewarganegaraan")} className="w-full" />
                        {errors.kewarganegaraan && <span className="text-destructive text-xs mt-1 block">{errors.kewarganegaraan.message}</span>}
                    </div>
                    <div className="flex flex-col gap-1">
                        <Label htmlFor="kebutuhan_khusus" className="block font-semibold mb-1 text-muted-foreground">Kebutuhan Khusus</Label>
                        <Input id="kebutuhan_khusus" {...register("kebutuhan_khusus")} className="w-full" />
                        {errors.kebutuhan_khusus && <span className="text-destructive text-xs mt-1 block">{errors.kebutuhan_khusus.message}</span>}
                    </div>
                    <div className="flex flex-col gap-1">
                        <Label htmlFor="anak_ke" className="block font-semibold mb-1 text-muted-foreground">Anak Ke</Label>
                        <Input id="anak_ke" type="number" {...register("anak_ke")} className="w-full" />
                        {errors.anak_ke && <span className="text-destructive text-xs mt-1 block">{errors.anak_ke.message}</span>}
                    </div>
                    <div className="flex flex-col gap-1">
                        <Label htmlFor="jumlah_saudara_kandung" className="block font-semibold mb-1 text-muted-foreground">Jumlah Saudara Kandung</Label>
                        <Input id="jumlah_saudara_kandung" type="number" {...register("jumlah_saudara_kandung")} className="w-full" />
                        {errors.jumlah_saudara_kandung && <span className="text-destructive text-xs mt-1 block">{errors.jumlah_saudara_kandung.message}</span>}
                    </div>
                    <div className="flex flex-col gap-1">
                        <Label htmlFor="nomor_telepon_hp" className="block font-semibold mb-1 text-muted-foreground">Nomor HP</Label>
                        <Input id="nomor_telepon_hp" {...register("nomor_telepon_hp")} className="w-full" />
                        {errors.nomor_telepon_hp && <span className="text-destructive text-xs mt-1 block">{errors.nomor_telepon_hp.message}</span>}
                    </div>
                    <div className="flex flex-col gap-1">
                        <Label htmlFor="email" className="block font-semibold mb-1 text-muted-foreground">Email</Label>
                        <Input id="email" type="email" {...register("email")} className="w-full" />
                        {errors.email && <span className="text-destructive text-xs mt-1 block">{errors.email.message}</span>}
                    </div>
                    <div className="md:col-span-2 flex justify-end mt-4">
                        <Button type="submit" className="w-full md:w-auto">Lanjut</Button>
                    </div>
                </form>
            </div>
        </div>
    );
}