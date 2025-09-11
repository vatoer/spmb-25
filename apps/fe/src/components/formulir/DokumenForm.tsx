import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@workspace/ui/components/button";
import { Input } from "@workspace/ui/components/input";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { DokumenSchema, DokumenType } from "./schemas";

export function DokumenForm({ onNext, onPrev, dokumenOptions, defaultValues }: {
    onNext: (data: DokumenType) => void;
    onPrev: () => void;
    dokumenOptions: Array<{ label: string, value: string }>;
    defaultValues?: DokumenType;
}) {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<DokumenType>({ resolver: zodResolver(DokumenSchema), defaultValues });

    useEffect(() => {
        if (defaultValues) {
            reset(defaultValues);
        }
    }, [defaultValues, reset]);

    return (
        <div className="max-w-2xl mx-auto">
            <div className="bg-card border border-border rounded-2xl shadow-lg p-8 mb-8">
                <h2 className="text-2xl font-bold text-primary mb-6">Formulir Dokumen</h2>
                <form onSubmit={handleSubmit(onNext)}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex flex-col gap-1 md:col-span-2">
                            <label className="block font-semibold mb-1 text-muted-foreground">Jenis Dokumen</label>
                            <select {...register("ref_dokumen_id")} required className="w-full border rounded-md px-3 py-2 bg-background">
                                <option value="">Pilih</option>
                                {dokumenOptions.map(opt => (
                                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                                ))}
                            </select>
                            <span className="text-destructive text-xs mt-1 block">{errors.ref_dokumen_id?.message ?? ""}</span>
                        </div>
                        <div className="flex flex-col gap-1 md:col-span-2">
                            <label className="block font-semibold mb-1 text-muted-foreground">Upload Dokumen</label>
                            <input type="file" {...register("file")} required className="w-full border rounded-md px-3 py-2 bg-background" />
                            <span className="text-destructive text-xs mt-1 block">{typeof errors.file?.message === "string" ? errors.file.message : ""}</span>
                        </div>
                        <div className="flex flex-col gap-1 md:col-span-2">
                            <label className="block font-semibold mb-1 text-muted-foreground">Catatan Verifikator (opsional)</label>
                            <Input {...register("catatan_verifikator")} className="w-full" />
                            <span className="text-destructive text-xs mt-1 block">{errors.catatan_verifikator?.message ?? ""}</span>
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
