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

    // When initialValue changes (e.g. after form reset), update selected values
    // Only set state from initialValue if initialValue changes and is different from current selection
    // Only set state from initialValue if initialValue changes and is different from current selection
    useEffect(() => {
        if (initialValue && !userSelectedProvinsiRef.current) {
            const isInitial =
                initialValue.provinsi !== selectedProvinsi ||
                initialValue.kabupaten !== selectedKabupaten ||
                initialValue.kecamatan !== selectedKecamatan ||
                initialValue.kelurahan !== selectedKelurahan;
            if (isInitial) {
                setSelectedProvinsi(initialValue.provinsi || "");
                setSelectedKabupaten(initialValue.kabupaten || "");
                setSelectedKecamatan(initialValue.kecamatan || "");
                setSelectedKelurahan(initialValue.kelurahan || "");
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [initialValue?.provinsi, initialValue?.kabupaten, initialValue?.kecamatan, initialValue?.kelurahan]);

    useEffect(() => {
        fetchProvinsi().then(setProvinsi);
    }, []);

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
        if (onChange) {
            onChange({
                provinsi: provinsi.find(p => p.id === selectedProvinsi),
                kabupaten: kabupaten.find(k => k.id === selectedKabupaten),
                kecamatan: kecamatan.find(kec => kec.id === selectedKecamatan),
                kelurahan: kelurahan.find(kel => kel.id === selectedKelurahan),
            });
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