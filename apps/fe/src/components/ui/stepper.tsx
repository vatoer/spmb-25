

import { cn } from "@workspace/ui/lib/utils";
import { MdCheck } from "react-icons/md";

export function FormulirStepper({ step }: { step: number }) {
    const steps = [
        "Data Murid",
        "Data Orang Tua",
        "Alamat",
        "Sekolah Tujuan",
        "Dokumen",
        "Pembayaran",
    ];

    return (
        <div className="w-full mb-8 flex flex-col items-center">
            <div className="flex justify-center gap-6 w-full">
                {steps.map((label, idx) => {
                    const isCompleted = step > idx;
                    const isActive = step === idx;
                    return (
                        <div key={label} className="flex flex-col items-center flex-1">
                            <div
                                className={cn(
                                    "w-9 h-9 flex items-center justify-center rounded-full border-2 text-base font-bold transition-all duration-200",
                                    isCompleted
                                        ? "bg-green-500 text-white border-success"
                                        : isActive
                                            ? "bg-primary text-white border-primary shadow-lg scale-110"
                                            : "bg-background text-muted-foreground border-border"
                                )}
                            >
                                {isCompleted ? (
                                    <MdCheck className="w-5 h-5" />
                                ) : (
                                    idx + 1
                                )}
                            </div>
                            <span className={cn(
                                "mt-2 text-xs text-center font-medium",
                                isActive ? "text-primary" : isCompleted ? "text-success" : "text-muted-foreground"
                            )}>{label}</span>
                        </div>
                    );
                })}
            </div>
            <div className="w-full h-2 mt-4 bg-muted rounded-full relative">
                <div
                    className="absolute top-0 left-0 h-2 bg-primary rounded-full transition-all duration-300"
                    style={{ width: `${((step + 1) / steps.length) * 100}%` }}
                />
            </div>
        </div>
    );
}
