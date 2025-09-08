import { Card } from "@workspace/ui/components/card";

const steps = [
    { title: "Pilih Sekolah", desc: "Telusuri dan pilih sekolah tujuan Anda." },
    { title: "Lengkapi Data", desc: "Isi data diri dan dokumen pendukung." },
    { title: "Kirim Pendaftaran", desc: "Submit pendaftaran dan tunggu hasil seleksi." },
];

export default function RegistrationSteps() {
    return (
        <div className="mb-8">
            <h2 className="text-xl font-bold mb-4 text-blue-900 text-center">Langkah Pendaftaran</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {steps.map((step, i) => (
                    <Card key={i} className="p-4 text-center shadow-sm">
                        <h3 className="font-semibold text-blue-800 mb-2">{step.title}</h3>
                        <p className="text-gray-600 text-sm">{step.desc}</p>
                    </Card>
                ))}
            </div>
        </div>
    );
}
