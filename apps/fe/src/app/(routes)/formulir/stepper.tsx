
import { FormulirStepper as Stepper } from "@/components/ui/stepper";

export function FormulirStepper({ step }: { step: number }) {
    return <Stepper step={step} />;
}
