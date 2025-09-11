import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@workspace/ui/components/button";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { SekolahSchema, SekolahType } from "./schemas";

export function SekolahForm({ onNext, onPrev, sekolahOptions, tahunAjaranOptions, gelombangOptions, jalurOptions, defaultValues }: {
    onNext: (data: SekolahType) => void;
    onPrev: () => void;
    sekolahOptions: Array<{ label: string, value: string }>;
    tahunAjaranOptions: Array<{ label: string, value: string }>;
    gelombangOptions: Array<{ label: string, value: string }>;
    jalurOptions: Array<{ label: string, value: string }>;
    defaultValues?: SekolahType;
}) {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<SekolahType>({ resolver: zodResolver(SekolahSchema), defaultValues });

    useEffect(() => {
        if (defaultValues) {
            reset(defaultValues);
        }
    }, [defaultValues, reset]);

    return (
        <div className="max-w-2xl mx-auto">
            <div className="bg-card border border-border rounded-2xl shadow-lg p-8 mb-8">
                <h2 className="text-2xl font-bold text-primary mb-6">Formulir Sekolah Tujuan</h2>
                <form onSubmit={handleSubmit(onNext)}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex flex-col gap-1">
                            <label className="block font-semibold mb-1 text-muted-foreground">Sekolah Tujuan</label>
                            <select {...register("sekolah_tujuan_id")} required className="w-full border rounded-md px-3 py-2 bg-background">
                                <option value="">Pilih</option>
                                {sekolahOptions.map(opt => (
                                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                                ))}
                            </select>
                            {errors.sekolah_tujuan_id && <span className="text-destructive text-xs mt-1 block">{errors.sekolah_tujuan_id.message}</span>}
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className="block font-semibold mb-1 text-muted-foreground">Tahun Ajaran</label>
                            <select {...register("tahun_ajaran_id")} required className="w-full border rounded-md px-3 py-2 bg-background">
                                <option value="">Pilih</option>
                                {tahunAjaranOptions.map(opt => (
                                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                                ))}
                            </select>
                            {errors.tahun_ajaran_id && <span className="text-destructive text-xs mt-1 block">{errors.tahun_ajaran_id.message}</span>}
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className="block font-semibold mb-1 text-muted-foreground">Gelombang</label>
                            <select {...register("gelombang_id")} required className="w-full border rounded-md px-3 py-2 bg-background">
                                <option value="">Pilih</option>
                                {gelombangOptions.map(opt => (
                                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                                ))}
                            </select>
                            {errors.gelombang_id && <span className="text-destructive text-xs mt-1 block">{errors.gelombang_id.message}</span>}
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className="block font-semibold mb-1 text-muted-foreground">Jalur Seleksi</label>
                            <select {...register("jalur_seleksi_pilihan_id")} required className="w-full border rounded-md px-3 py-2 bg-background">
                                <option value="">Pilih</option>
                                {jalurOptions.map(opt => (
                                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                                ))}
                            </select>
                            {errors.jalur_seleksi_pilihan_id && <span className="text-destructive text-xs mt-1 block">{errors.jalur_seleksi_pilihan_id.message}</span>}
                        </div>
                    </div>
                    <div className="md:col-span-2 flex justify-end mt-8 gap-3">
                        <Button type="button" variant="outline" onClick={onPrev}>Kembali</Button>
                        <Button type="submit">Lanjut</Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
