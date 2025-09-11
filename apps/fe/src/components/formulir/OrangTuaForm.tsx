import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@workspace/ui/components/button";
import { Input } from "@workspace/ui/components/input";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { OrangTuaSchema, OrangTuaType } from "./schemas";


export function OrangTuaForm({ onNext, onPrev, defaultValues }: { onNext: (data: OrangTuaType) => void; onPrev: () => void; defaultValues?: OrangTuaType }) {
    const [showWali, setShowWali] = useState(false);
    // Set default gender and ensure nama_lengkap is always a string for ayah and ibu
    const initialDefaults: OrangTuaType = {
        ayah: {
            nama_lengkap: defaultValues?.ayah?.nama_lengkap ?? "",
            jenis_kelamin: "L",
            nik: defaultValues?.ayah?.nik,
            tahun_lahir: defaultValues?.ayah?.tahun_lahir,
            pendidikan_terakhir: defaultValues?.ayah?.pendidikan_terakhir,
            pekerjaan: defaultValues?.ayah?.pekerjaan,
            penghasilan_bulanan: defaultValues?.ayah?.penghasilan_bulanan,
            kebutuhan_khusus: defaultValues?.ayah?.kebutuhan_khusus,
            nomor_telepon_hp: defaultValues?.ayah?.nomor_telepon_hp,
        },
        ibu: {
            nama_lengkap: defaultValues?.ibu?.nama_lengkap ?? "",
            jenis_kelamin: "P",
            nik: defaultValues?.ibu?.nik,
            tahun_lahir: defaultValues?.ibu?.tahun_lahir,
            pendidikan_terakhir: defaultValues?.ibu?.pendidikan_terakhir,
            pekerjaan: defaultValues?.ibu?.pekerjaan,
            penghasilan_bulanan: defaultValues?.ibu?.penghasilan_bulanan,
            kebutuhan_khusus: defaultValues?.ibu?.kebutuhan_khusus,
            nomor_telepon_hp: defaultValues?.ibu?.nomor_telepon_hp,
        },
        wali: defaultValues?.wali ?? undefined,
    };
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        getValues,
        resetField,
    } = useForm<OrangTuaType>({ resolver: zodResolver(OrangTuaSchema), defaultValues: initialDefaults });

    useEffect(() => {
        if (defaultValues) {
            reset(initialDefaults);
        }
    }, [defaultValues, reset]);

    // Helper to render section
    const renderSection = (prefix: "ayah" | "ibu" | "wali", title: string, required = true) => (
        <fieldset className="bg-card border border-border rounded-xl shadow-sm p-6 mb-6">
            <legend className="font-bold text-lg text-primary mb-4 px-2">{title}</legend>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block font-semibold mb-1 text-muted-foreground">Nama Lengkap</label>
                    <Input {...register(`${prefix}.nama_lengkap`)} required={required} className="w-full" />
                    {errors?.[prefix]?.nama_lengkap && <span className="text-destructive text-xs mt-1 block">{errors?.[prefix]?.nama_lengkap?.message}</span>}
                </div>
                <div>
                    <label className="block font-semibold mb-1 text-muted-foreground">NIK</label>
                    <Input {...register(`${prefix}.nik`)} className="w-full" />
                    {errors?.[prefix]?.nik && <span className="text-destructive text-xs mt-1 block">{errors?.[prefix]?.nik?.message}</span>}
                </div>
                <div>
                    <label className="block font-semibold mb-1 text-muted-foreground">Tahun Lahir</label>
                    <Input type="number" {...register(`${prefix}.tahun_lahir`)} className="w-full" />
                    {errors?.[prefix]?.tahun_lahir && <span className="text-destructive text-xs mt-1 block">{errors?.[prefix]?.tahun_lahir?.message}</span>}
                </div>
                <div>
                    <label className="block font-semibold mb-1 text-muted-foreground">Pendidikan Terakhir</label>
                    <Input {...register(`${prefix}.pendidikan_terakhir`)} className="w-full" />
                    {errors?.[prefix]?.pendidikan_terakhir && <span className="text-destructive text-xs mt-1 block">{errors?.[prefix]?.pendidikan_terakhir?.message}</span>}
                </div>
                <div>
                    <label className="block font-semibold mb-1 text-muted-foreground">Pekerjaan</label>
                    <Input {...register(`${prefix}.pekerjaan`)} className="w-full" />
                    {errors?.[prefix]?.pekerjaan && <span className="text-destructive text-xs mt-1 block">{errors?.[prefix]?.pekerjaan?.message}</span>}
                </div>
                <div>
                    <label className="block font-semibold mb-1 text-muted-foreground">Penghasilan Bulanan</label>
                    <Input {...register(`${prefix}.penghasilan_bulanan`)} className="w-full" />
                    {errors?.[prefix]?.penghasilan_bulanan && <span className="text-destructive text-xs mt-1 block">{errors?.[prefix]?.penghasilan_bulanan?.message}</span>}
                </div>
                <div>
                    <label className="block font-semibold mb-1 text-muted-foreground">Kebutuhan Khusus</label>
                    <Input {...register(`${prefix}.kebutuhan_khusus`)} className="w-full" />
                    {errors?.[prefix]?.kebutuhan_khusus && <span className="text-destructive text-xs mt-1 block">{errors?.[prefix]?.kebutuhan_khusus?.message}</span>}
                </div>
                <div>
                    <label className="block font-semibold mb-1 text-muted-foreground">Nomor HP</label>
                    <Input {...register(`${prefix}.nomor_telepon_hp`)} className="w-full" />
                    {errors?.[prefix]?.nomor_telepon_hp && <span className="text-destructive text-xs mt-1 block">{errors?.[prefix]?.nomor_telepon_hp?.message}</span>}
                </div>
                {/* Jenis Kelamin: Only show select for wali, not ayah/ibu */}
                {prefix === "wali" ? (
                    <div>
                        <label className="block font-semibold mb-1 text-muted-foreground">Jenis Kelamin</label>
                        <select {...register(`${prefix}.jenis_kelamin`)} required={required} className="w-full border rounded-md px-3 py-2 bg-background">
                            <option value="">Pilih</option>
                            <option value="L">Laki-laki</option>
                            <option value="P">Perempuan</option>
                        </select>
                        {errors?.[prefix]?.jenis_kelamin && <span className="text-destructive text-xs mt-1 block">{errors?.[prefix]?.jenis_kelamin?.message}</span>}
                    </div>
                ) : null}
            </div>
        </fieldset>
    );

    return (
        <div className="max-w-3xl mx-auto">
            <div className="bg-card shadow-lg rounded-2xl border border-border p-8 mb-8">
                <h2 className="text-2xl font-bold text-primary mb-6">Formulir Data Orang Tua/Wali</h2>
                <form
                    onSubmit={handleSubmit((data) => {
                        // Jika showWali tidak dicentang, pastikan data.wali undefined
                        const result: OrangTuaType = {
                            ayah: data.ayah,
                            ibu: data.ibu,
                            wali: showWali ? data.wali : undefined,
                        };
                        onNext(result);
                    })}
                    className="space-y-4"
                >
                    {renderSection("ayah", "Data Ayah", true)}
                    {renderSection("ibu", "Data Ibu", true)}
                    <div className="bg-muted rounded-lg p-4 mb-4 flex items-center gap-3">
                        <input
                            type="checkbox"
                            checked={showWali}
                            onChange={e => {
                                setShowWali(e.target.checked);
                                if (!e.target.checked) {
                                    resetField("wali", { defaultValue: undefined }); // benar-benar hapus value wali
                                }
                            }}
                            className="accent-primary w-5 h-5"
                        />
                        <span className="font-semibold text-muted-foreground">Ada Wali (opsional)</span>
                    </div>
                    {showWali && renderSection("wali", "Data Wali", false)}
                    <div className="flex justify-end gap-3 mt-6">
                        <Button type="button" variant="outline" onClick={onPrev}>Kembali</Button>
                        <Button type="submit">Lanjut</Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
