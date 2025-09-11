"use client";
import { AlamatForm } from "@/components/formulir/AlamatForm";
import { BiodataForm } from "@/components/formulir/BiodataForm";
import { DokumenForm } from "@/components/formulir/DokumenForm";
import { OrangTuaForm } from "@/components/formulir/OrangTuaForm";
import { PembayaranForm } from "@/components/formulir/PembayaranForm";
import { SekolahForm } from "@/components/formulir/SekolahForm";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { FormulirStepper } from "../stepper";


type FormulirData = {
    biodata?: any;
    orangTua?: any;
    alamat?: any;
    sekolah?: any;
    dokumen?: any;
    pembayaran?: any;
};

const useFormulirStore = create(
    persist<{
        data: FormulirData;
        step: number;
        setStepData: (step: number, value: any) => void;
        setStep: (step: number) => void;
    }>(
        (set) => ({
            data: {},
            step: 0,
            setStepData: (step, value) => set((state) => {
                const keys = ["biodata", "orangTua", "alamat", "sekolah", "dokumen", "pembayaran"];
                return { data: { ...state.data, [keys[step]]: value } };
            }),
            setStep: (step) => set(() => ({ step })),
        }),
        {
            name: "formulir-data-store", // unique name in localStorage
        }
    )
);

const steps = [
    (props: any) => <BiodataForm {...props} defaultValues={useFormulirStore.getState().data.biodata} />,
    (props: any) => <OrangTuaForm {...props} defaultValues={useFormulirStore.getState().data.orangTua} />,
    (props: any) => <AlamatForm {...props} defaultValues={useFormulirStore.getState().data.alamat} />,
    (props: any) => (
        <SekolahForm
            {...props}
            defaultValues={useFormulirStore.getState().data.sekolah}
            sekolahOptions={[{ label: "SMA 1", value: "1" }]}
            tahunAjaranOptions={[{ label: "2025/2026", value: "2025" }]}
            gelombangOptions={[{ label: "Gelombang 1", value: "1" }]}
            jalurOptions={[{ label: "Zonasi", value: "ZONASI" }]}
        />
    ),
    (props: any) => (
        <DokumenForm
            {...props}
            defaultValues={useFormulirStore.getState().data.dokumen}
            dokumenOptions={[{ label: "KK", value: "1" }, { label: "Akta Lahir", value: "2" }]}
        />
    ),
    (props: any) => (
        <PembayaranForm
            {...props}
            defaultValues={useFormulirStore.getState().data.pembayaran}
            metodeOptions={[{ label: "VA BCA", value: "VA_BCA" }]}
            kuponOptions={[{ label: "EARLYBIRD", value: "1" }]}
        />
    ),
];

export default function FormulirStepPage() {
    const step = useFormulirStore(state => state.step);
    const setStep = useFormulirStore(state => state.setStep);
    const setStepData = useFormulirStore(state => state.setStepData);
    const CurrentForm = steps[step];

    const handleNext = (data: any) => {
        setStepData(step, data);
        console.log("Data saved for step", step, data);
        if (step < steps.length - 1) setStep(step + 1);
    };
    const handlePrev = () => {
        if (step > 0) setStep(step - 1);
    };

    return (
        <div className="max-w-2xl mx-auto py-8">
            <FormulirStepper step={step} />
            <CurrentForm onNext={handleNext} onPrev={handlePrev} />
        </div>
    );
}
