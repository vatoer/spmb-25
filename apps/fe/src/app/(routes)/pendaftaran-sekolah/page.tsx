
import MainLayout from "@/components/MainLayout";
import SchoolBrowser from "@/components/SchoolBrowser";

export default function PendaftaranSekolahPage() {
    return (
        <MainLayout>
            <div className="w-full max-w-6xl mx-auto p-6 rounded-lg shadow-lg bg-white">
                <h1 className="text-3xl md:text-4xl font-bold text-center text-blue-900 mb-4">Pendaftaran Sekolah</h1>
                <p className="text-center text-blue-700 mb-8">Cari dan pilih sekolah tujuan Anda untuk pendaftaran tahun ajaran baru.</p>
                <SchoolBrowser />
            </div>
        </MainLayout>
    );
}
