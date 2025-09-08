import { Card } from "@workspace/ui/components/card";

const steps = [
    { title: "Registrasi Akun", desc: "Buat akun sebagai calon siswa." },
    { title: "Lengkapi Data", desc: "Isi data diri dan dokumen pendukung." },
    { title: "Seleksi & Pengumuman", desc: "Ikuti proses seleksi dan cek hasil." },
];

export default function ProcessSteps() {
    return (
        <section className="py-12 bg-blue-50">
            <h2 className="text-2xl font-bold text-center mb-8 text-blue-900">Alur Pendaftaran</h2>
            <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
                {steps.map((s, i) => (
                    <Card key={i} className="p-6 text-center">
                        <h4 className="text-lg font-semibold mb-2 text-blue-800">{s.title}</h4>
                        <p className="text-gray-600">{s.desc}</p>
                    </Card>
                ))}
            </div>
        </section>
    );
}
