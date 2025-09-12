import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@workspace/ui/components/button";
import { Input } from "@workspace/ui/components/input";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { PembayaranSchema, PembayaranType } from "./schemas";

export function PembayaranForm({ onNext, onPrev, metodeOptions, kuponOptions, defaultValues }: {
    onNext: (data: PembayaranType) => void;
    onPrev: () => void;
    metodeOptions: Array<{ label: string, value: string }>;
    kuponOptions: Array<{ label: string, value: string }>;
    defaultValues?: PembayaranType;
}) {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<PembayaranType>({ resolver: zodResolver(PembayaranSchema), defaultValues });

    useEffect(() => {
        if (defaultValues) {
            reset(defaultValues);
        }
    }, [defaultValues, reset]);

    return (
        <div className="max-w-2xl mx-auto">
            <div className="bg-card border border-border rounded-2xl shadow-lg p-8 mb-8">
                <h2 className="text-2xl font-bold text-primary mb-6">Formulir Pembayaran</h2>
                <form onSubmit={handleSubmit(onNext)}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex flex-col gap-1">
                            <label className="block font-semibold mb-1 text-muted-foreground">Nomor Rekening</label>
                            <Input {...register("nomor_rekening")} required className="w-full" />
                            {errors.nomor_rekening && <span className="text-destructive text-xs mt-1 block">{errors.nomor_rekening.message}</span>}
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className="block font-semibold mb-1 text-muted-foreground">Nama Bank</label>
                            <Input {...register("nama_bank")} required className="w-full" />
                            {errors.nama_bank && <span className="text-destructive text-xs mt-1 block">{errors.nama_bank.message}</span>}
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className="block font-semibold mb-1 text-muted-foreground">Atas Nama</label>
                            <Input {...register("atas_nama")} required className="w-full" />
                            {errors.atas_nama && <span className="text-destructive text-xs mt-1 block">{errors.atas_nama.message}</span>}
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className="block font-semibold mb-1 text-muted-foreground">Upload Bukti Pembayaran</label>
                            <input type="file" {...register("bukti_pembayaran")} required className="w-full border rounded-md px-3 py-2 bg-background" />
                            {errors.bukti_pembayaran && <span className="text-destructive text-xs mt-1 block">{errors.bukti_pembayaran?.message?.toString()}</span>}
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
