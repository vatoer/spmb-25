import { Card } from "@workspace/ui/components/card";

const features = [
    { title: "Proses Mudah", desc: "Pendaftaran online tanpa ribet." },
    { title: "Transparan", desc: "Seleksi terbuka dan adil." },
    { title: "Aman", desc: "Data dijamin privasi dan keamanan." },
];

export default function FeaturesSection() {
    return (
        <section className="py-12 bg-white">
            <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
                {features.map((f, i) => (
                    <Card key={i} className="p-6 text-center shadow-md">
                        <h3 className="text-xl font-semibold mb-2 text-blue-800">{f.title}</h3>
                        <p className="text-gray-600">{f.desc}</p>
                    </Card>
                ))}
            </div>
        </section>
    );
}
