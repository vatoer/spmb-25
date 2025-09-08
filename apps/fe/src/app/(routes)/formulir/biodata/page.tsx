

import BiodataForm from "@/components/BiodataForm";
import MainLayout from "@/components/MainLayout";

export default function FormulirBiodataPage() {
    return (
        <MainLayout>
            <div className="w-full max-w-6xl mx-auto p-6 rounded-lg shadow-lg bg-white">
                <h1 className="text-3xl md:text-4xl font-bold text-center text-blue-900 mb-4">Formulir Biodata Calon Murid</h1>
                <p className="text-center text-blue-700 mb-8">Isi data diri calon murid dengan lengkap dan benar.</p>
                <BiodataForm />
            </div>
        </MainLayout>
    );
}
