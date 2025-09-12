"use client";
import { fetchKabupaten, fetchKecamatan, fetchKelurahan, fetchProvinsi } from "@/actions/wilayah";
import type { wilayah } from "@workspace/database";
import { useEffect, useRef, useState } from "react";

type WilayahInitialValue = {
    provinsi?: string;
    kabupaten?: string;
    kecamatan?: string;
    kelurahan?: string;
};

export default function WilayahSelect({ initialValue, onChange }: {
    initialValue?: WilayahInitialValue;
    onChange?: (selected: { provinsi?: wilayah; kabupaten?: wilayah; kecamatan?: wilayah; kelurahan?: wilayah }) => void;
}) {
    const [provinsi, setProvinsi] = useState<wilayah[]>([]);
    const [kabupaten, setKabupaten] = useState<wilayah[]>([]);
    const [kecamatan, setKecamatan] = useState<wilayah[]>([]);
    const [kelurahan, setKelurahan] = useState<wilayah[]>([]);

    const [selectedProvinsi, setSelectedProvinsi] = useState<string>(initialValue?.provinsi || "");
    // Track if user has interacted with provinsi select
    const userSelectedProvinsiRef = useRef(false);
    const [selectedKabupaten, setSelectedKabupaten] = useState<string>(initialValue?.kabupaten || "");
    const [selectedKecamatan, setSelectedKecamatan] = useState<string>(initialValue?.kecamatan || "");
    const [selectedKelurahan, setSelectedKelurahan] = useState<string>(initialValue?.kelurahan || "");


    useEffect(() => {
        fetchProvinsi().then(setProvinsi);
        console.log('[WilayahSelect] fetchProvinsi dijalankan');
    }, []);

    useEffect(() => {
        console.log('initialValue changed:', initialValue);
    }, [initialValue]);

    // Ketika initialValue berubah, fetch data berantai dan set state dropdown sesuai data tersimpan
    useEffect(() => {
        let isMounted = true;
        // console.log('[WilayahSelect] initialValue berubah:', initialValue);
        // console.log('[WilayahSelect] provinsi saat ini:', provinsi);
        async function fetchWilayahInitial() {
            if (initialValue &&
                initialValue.provinsi &&
                provinsi.length > 0 &&
                !userSelectedProvinsiRef.current && provinsi.length > 0 // pastikan provinsi sudah di-fetch
            ) {
                // console.log('fetchWilayahInitial initialValue:', initialValue);
                setSelectedProvinsi(initialValue.provinsi || "");
                if (initialValue.provinsi) {
                    const kab = await fetchKabupaten(initialValue.provinsi);
                    // console.log('fetchWilayahInitial kabupaten:', kab);
                    if (isMounted) setKabupaten(kab);
                }
                setSelectedKabupaten(initialValue.kabupaten || "");
                if (initialValue.kabupaten) {
                    const kec = await fetchKecamatan(initialValue.kabupaten);
                    // console.log('fetchWilayahInitial kecamatan:', kec);
                    if (isMounted) setKecamatan(kec);
                }
                setSelectedKecamatan(initialValue.kecamatan || "");
                if (initialValue.kecamatan) {
                    const kel = await fetchKelurahan(initialValue.kecamatan);
                    // console.log('fetchWilayahInitial kelurahan:', kel);
                    if (isMounted) setKelurahan(kel);
                }
                setSelectedKelurahan(initialValue.kelurahan || "");
                // Setelah initialValue diproses, blok efek ini agar tidak overwrite interaksi user
                userSelectedProvinsiRef.current = true;

                onChange && onChange({
                    provinsi: provinsi.find(p => p.id === initialValue.provinsi),
                    kabupaten: kabupaten.find(k => k.id === initialValue.kabupaten),
                    kecamatan: kecamatan.find(kec => kec.id === initialValue.kecamatan),
                    kelurahan: kelurahan.find(kel => kel.id === initialValue.kelurahan),
                });
            } else {
                console.log('[WilayahSelect] Melewati pemrosesan initialValue karena kondisi tidak terpenuhi.', initialValue, userSelectedProvinsiRef.current, provinsi.length);
            }
        }
        fetchWilayahInitial();
        return () => { isMounted = false; };
    }, [provinsi, initialValue?.provinsi, initialValue?.kabupaten, initialValue?.kecamatan, initialValue?.kelurahan]);

    // Track previous provinsi to only reset if provinsi actually changes
    const prevProvinsiRef = useRef<string>("");
    useEffect(() => {
        if (selectedProvinsi) {
            fetchKabupaten(selectedProvinsi).then(setKabupaten);
            setKecamatan([]);
            setKelurahan([]);
            // Only reset kabupaten/kecamatan/kelurahan if provinsi benar-benar berubah
            if (prevProvinsiRef.current !== selectedProvinsi) {
                setSelectedKabupaten("");
                setSelectedKecamatan("");
                setSelectedKelurahan("");
            }
            prevProvinsiRef.current = selectedProvinsi;
        }
    }, [selectedProvinsi]);

    useEffect(() => {
        if (selectedKabupaten) {
            fetchKecamatan(selectedKabupaten).then(setKecamatan);
            setKelurahan([]);
            setSelectedKecamatan("");
            setSelectedKelurahan("");
        }
    }, [selectedKabupaten]);

    useEffect(() => {
        if (selectedKecamatan) {
            fetchKelurahan(selectedKecamatan).then(setKelurahan);
            setSelectedKelurahan("");
        }
    }, [selectedKecamatan]);

    useEffect(() => {
        const wilayahLog = {
            provinsi: provinsi.find(p => p.id === selectedProvinsi),
            kabupaten: kabupaten.find(k => k.id === selectedKabupaten),
            kecamatan: kecamatan.find(kec => kec.id === selectedKecamatan),
            kelurahan: kelurahan.find(kel => kel.id === selectedKelurahan),
        };
        // console.log('[WilayahSelect] Wilayah tersimpan:', wilayahLog);
        if (onChange) {
            onChange(wilayahLog);
        }
    }, [selectedProvinsi, selectedKabupaten, selectedKecamatan, selectedKelurahan]);

    return (
        <div className="bg-muted rounded-xl p-4 border border-border shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                    <label className="font-semibold text-muted-foreground mb-1">Provinsi</label>
                    <select value={selectedProvinsi} onChange={e => {
                        setSelectedProvinsi(e.target.value);
                        userSelectedProvinsiRef.current = true;
                    }} className="w-full border rounded-lg px-3 py-2 bg-background focus:ring-2 focus:ring-primary">
                        <option value="">Pilih Provinsi</option>
                        {provinsi.map(p => <option key={p.id} value={p.id}>{p.nama}</option>)}
                    </select>
                </div>
                <div className="flex flex-col gap-1">
                    <label className="font-semibold text-muted-foreground mb-1">Kabupaten/Kota</label>
                    <select value={selectedKabupaten} onChange={e => setSelectedKabupaten(e.target.value)} disabled={!selectedProvinsi} className="w-full border rounded-lg px-3 py-2 bg-background focus:ring-2 focus:ring-primary">
                        <option value="">Pilih Kabupaten/Kota</option>
                        {kabupaten.map(k => <option key={k.id} value={k.id}>{k.nama}</option>)}
                    </select>
                </div>
                <div className="flex flex-col gap-1">
                    <label className="font-semibold text-muted-foreground mb-1">Kecamatan</label>
                    <select value={selectedKecamatan} onChange={e => setSelectedKecamatan(e.target.value)} disabled={!selectedKabupaten} className="w-full border rounded-lg px-3 py-2 bg-background focus:ring-2 focus:ring-primary">
                        <option value="">Pilih Kecamatan</option>
                        {kecamatan.map(kec => <option key={kec.id} value={kec.id}>{kec.nama}</option>)}
                    </select>
                </div>
                <div className="flex flex-col gap-1">
                    <label className="font-semibold text-muted-foreground mb-1">Kelurahan/Desa</label>
                    <select value={selectedKelurahan} onChange={e => setSelectedKelurahan(e.target.value)} disabled={!selectedKecamatan} className="w-full border rounded-lg px-3 py-2 bg-background focus:ring-2 focus:ring-primary">
                        <option value="">Pilih Kelurahan/Desa</option>
                        {kelurahan.map(kel => <option key={kel.id} value={kel.id}>{kel.nama}</option>)}
                    </select>
                </div>
            </div>
        </div>
    );
}