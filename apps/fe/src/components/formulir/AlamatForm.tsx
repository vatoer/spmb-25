import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@workspace/ui/components/button";
import { Input } from "@workspace/ui/components/input";
import { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import z from "zod";
import WilayahSelect from "../WilayahSelect";
import { AlamatSchema, AlamatType } from "./schemas";

export function AlamatForm({
    // Sinkronisasi alamat_tinggal dengan alamat_kk jika checkbox dicentang
    onNext,
    onPrev,
    defaultValues,
}: {
    onNext: (data: { alamat_kk: AlamatType; alamat_tinggal: AlamatType }) => void;
    onPrev: () => void;
    defaultValues?: { alamat_kk: AlamatType; alamat_tinggal: AlamatType };
}) {
    // State for checkbox: alamat tinggal sama dengan KK
    // Centang default mengikuti data yang diisi pengguna
    const [alamatTinggalSamaKK, setAlamatTinggalSamaKK] = useState(() => {
        if (defaultValues) {
            const kk = defaultValues.alamat_kk;
            const tinggal = defaultValues.alamat_tinggal;
            if (kk && tinggal) {
                const keys: (keyof AlamatType)[] = [
                    "jenis_alamat",
                    "alamat_jalan",
                    "rt",
                    "rw",
                    "nama_dusun",
                    "desa_kelurahan",
                    "kecamatan",
                    "kabupaten_kota",
                    "provinsi",
                    "kode_pos",
                    "lintang",
                    "bujur",
                ];
                return keys.every(k => kk[k] === tinggal[k]);
            }
        }
        // console.log("Alamat tinggal sama dengan KK:", alamatTinggalSamaKK);
        return true;
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        watch,
        setValue,
        control
    } = useForm<{ alamat_kk: AlamatType; alamat_tinggal: AlamatType }>({
        resolver: zodResolver(
            z.object({
                alamat_kk: AlamatSchema,
                alamat_tinggal: AlamatSchema,
            })
        ),
        defaultValues: {
            alamat_kk: defaultValues?.alamat_kk || {},
            alamat_tinggal: defaultValues?.alamat_tinggal || {},
        },
    });

    // Sinkronisasi alamat_tinggal dengan alamat_kk jika checkbox dicentang
    const alamatKkValue = useWatch({ name: "alamat_kk", control });
    useEffect(() => {
        if (alamatTinggalSamaKK) {
            setValue("alamat_tinggal", alamatKkValue);
            // console.log("copy alamat");
        }
    }, [alamatTinggalSamaKK, ...Object.values(alamatKkValue)]);

    useEffect(() => {
        console.log("defaultValues changed:", defaultValues);
        if (defaultValues) {
            reset({ alamat_kk: defaultValues.alamat_kk, alamat_tinggal: defaultValues.alamat_tinggal });
            // Update centang sesuai data
            const kk = defaultValues.alamat_kk;
            const tinggal = defaultValues.alamat_tinggal;
            if (kk && tinggal) {
                const keys: (keyof AlamatType)[] = [
                    "jenis_alamat",
                    "alamat_jalan",
                    "rt",
                    "rw",
                    "nama_dusun",
                    "desa_kelurahan",
                    "kecamatan",
                    "kabupaten_kota",
                    "provinsi",
                    "kode_pos",
                    "lintang",
                    "bujur",
                ];
                setAlamatTinggalSamaKK(keys.every(k => kk[k] === tinggal[k]));
            } else {
                setAlamatTinggalSamaKK(true);
            }
        }
    }, [defaultValues, reset]);

    return (
        <div className="max-w-3xl mx-auto">
            <div className="bg-card shadow-lg rounded-2xl border border-border p-8 mb-8">
                <h2 className="text-2xl font-bold text-primary mb-6">Formulir Alamat</h2>
                <form
                    onSubmit={handleSubmit(data => {
                        // console.log("Form submitted:", data);
                        if (alamatTinggalSamaKK) {
                            onNext({ alamat_kk: data.alamat_kk, alamat_tinggal: data.alamat_kk });
                        } else {
                            onNext({ alamat_kk: data.alamat_kk, alamat_tinggal: data.alamat_tinggal });
                        }
                    }, err => {
                        console.log("Form errors:", err);
                        // console.log("form data watch ", { alamat_kk: watch("alamat_kk"), alamat_tinggal: watch("alamat_tinggal") });
                    })}
                >
                    <fieldset className="bg-card border border-border rounded-xl shadow-sm p-6 mb-6">
                        <legend className="font-bold text-lg text-primary mb-4 px-2">Alamat Domisili KK</legend>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="flex flex-col gap-1">
                                <label className="block font-semibold mb-1 text-muted-foreground">Alamat Jalan</label>
                                <Input {...register("alamat_kk.alamat_jalan")} required className="w-full" />
                            </div>
                            <div className="flex flex-col gap-1">
                                <label className="block font-semibold mb-1 text-muted-foreground">RT</label>
                                <Input {...register("alamat_kk.rt")} className="w-full" />
                            </div>
                            <div className="flex flex-col gap-1">
                                <label className="block font-semibold mb-1 text-muted-foreground">RW</label>
                                <Input {...register("alamat_kk.rw")} className="w-full" />
                            </div>
                            <div className="flex flex-col gap-1">
                                <label className="block font-semibold mb-1 text-muted-foreground">Nama Dusun</label>
                                <Input {...register("alamat_kk.nama_dusun")} className="w-full" />
                            </div>
                            <div className="flex flex-col gap-1 col-span-2">
                                <label className="block font-semibold mb-1 text-muted-foreground">Wilayah KK</label>
                                <WilayahSelect
                                    initialValue={{
                                        provinsi: defaultValues?.alamat_kk?.provinsi,
                                        kabupaten: defaultValues?.alamat_kk?.kabupaten_kota,
                                        kecamatan: defaultValues?.alamat_kk?.kecamatan,
                                        kelurahan: defaultValues?.alamat_kk?.desa_kelurahan,
                                    }}
                                    onChange={wil => {
                                        // console.log("Wilayah KK changed:", wil);
                                        if (wil) {
                                            setValue("alamat_kk.provinsi", wil.provinsi?.id || "");
                                            setValue("alamat_kk.kabupaten_kota", wil.kabupaten?.id || "");
                                            setValue("alamat_kk.kecamatan", wil.kecamatan?.id || "");
                                            setValue("alamat_kk.desa_kelurahan", wil.kelurahan?.id || "");
                                        }
                                    }}
                                />
                            </div>
                            <div className="flex flex-col gap-1">
                                <label className="block font-semibold mb-1 text-muted-foreground">Kode Pos</label>
                                <Input {...register("alamat_kk.kode_pos")} className="w-full" />
                            </div>
                            <div className="flex flex-col gap-1">
                                <label className="block font-semibold mb-1 text-muted-foreground">Lintang</label>
                                <Input type="number" {...register("alamat_kk.lintang")} className="w-full" />
                            </div>
                            <div className="flex flex-col gap-1">
                                <label className="block font-semibold mb-1 text-muted-foreground">Bujur</label>
                                <Input type="number" {...register("alamat_kk.bujur")} className="w-full" />
                            </div>
                        </div>
                    </fieldset>
                    <div className="bg-muted rounded-lg p-4 mb-4 flex items-center gap-3">
                        <input
                            type="checkbox"
                            checked={alamatTinggalSamaKK}
                            onChange={e => setAlamatTinggalSamaKK(e.target.checked)}
                            className="accent-primary w-5 h-5"
                        />
                        <span className="font-semibold text-muted-foreground">Alamat tinggal sama dengan KK</span>
                    </div>
                    {!alamatTinggalSamaKK && (
                        <fieldset className="bg-card border border-border rounded-xl shadow-sm p-6 mb-6">
                            <legend className="font-bold text-lg text-primary mb-4 px-2">Alamat Tinggal</legend>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="flex flex-col gap-1">
                                    <label className="block font-semibold mb-1 text-muted-foreground">Jenis Tempat Tinggal</label>
                                    <select {...register("alamat_tinggal.jenis_alamat")}
                                        required className="w-full border rounded-md px-3 py-2 bg-background">
                                        <option value="">Pilih</option>
                                        <option value="TINGGAL_SKD">SKD (Surat Keterangan Domisili)</option>
                                        <option value="TINGGAL_PESANTREN">Pesantren</option>
                                        <option value="TINGGAL_ASRAMA">Asrama</option>
                                        <option value="TINGGAL_PANTI_ASUHAN">Panti Asuhan</option>
                                    </select>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <label className="block font-semibold mb-1 text-muted-foreground">Alamat Jalan</label>
                                    <Input {...register("alamat_tinggal.alamat_jalan")} required className="w-full" />
                                </div>
                                <div className="flex flex-col gap-1">
                                    <label className="block font-semibold mb-1 text-muted-foreground">Nama Dusun</label>
                                    <Input {...register("alamat_tinggal.nama_dusun")} className="w-full" />
                                </div>
                                <div className="flex flex-col gap-1">
                                    <label className="block font-semibold mb-1 text-muted-foreground">RT</label>
                                    <Input {...register("alamat_tinggal.rt")} className="w-full" />
                                </div>
                                <div className="flex flex-col gap-1">
                                    <label className="block font-semibold mb-1 text-muted-foreground">RW</label>
                                    <Input {...register("alamat_tinggal.rw")} className="w-full" />
                                </div>
                                <div className="flex flex-col gap-1 col-span-2">
                                    <label className="block font-semibold mb-1 text-muted-foreground">Wilayah Tinggal</label>
                                    <WilayahSelect
                                        initialValue={{
                                            provinsi: defaultValues?.alamat_tinggal?.provinsi,
                                            kabupaten: defaultValues?.alamat_tinggal?.kabupaten_kota,
                                            kecamatan: defaultValues?.alamat_tinggal?.kecamatan,
                                            kelurahan: defaultValues?.alamat_tinggal?.desa_kelurahan,
                                        }}
                                        onChange={wil => {
                                            if (wil) {
                                                setValue("alamat_tinggal.provinsi", wil.provinsi?.id || "");
                                                setValue("alamat_tinggal.kabupaten_kota", wil.kabupaten?.id || "");
                                                setValue("alamat_tinggal.kecamatan", wil.kecamatan?.id || "");
                                                setValue("alamat_tinggal.desa_kelurahan", wil.kelurahan?.id || "");
                                            }
                                        }}
                                    />
                                </div>
                                <div className="flex flex-col gap-1">
                                    <label className="block font-semibold mb-1 text-muted-foreground">Kode Pos</label>
                                    <Input {...register("alamat_tinggal.kode_pos")} className="w-full" />
                                </div>
                                <div className="flex flex-col gap-1">
                                    <label className="block font-semibold mb-1 text-muted-foreground">Lintang</label>
                                    <Input type="number" {...register("alamat_tinggal.lintang")} className="w-full" />
                                </div>
                                <div className="flex flex-col gap-1">
                                    <label className="block font-semibold mb-1 text-muted-foreground">Bujur</label>
                                    <Input type="number" {...register("alamat_tinggal.bujur")} className="w-full" />
                                </div>
                            </div>
                        </fieldset>
                    )}
                    <div className="md:col-span-2 flex justify-end mt-8 gap-3">
                        <Button type="button" variant="outline" onClick={onPrev}>Kembali</Button>
                        <Button type="submit">Lanjut</Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
