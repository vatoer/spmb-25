import { Button } from "@workspace/ui/components/button";
import Link from "next/link";

export default function HeroSection({ isLoggedIn = false }: { isLoggedIn?: boolean }) {
    return (
        <section className="bg-gradient-to-b from-blue-50 to-white py-16 text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-blue-900 mb-4">Sistem Penerimaan Murid Baru (SPMB)</h1>
            <p className="text-lg md:text-xl text-blue-700 mb-8">Mudah, transparan, dan aman untuk calon siswa dan orang tua.</p>
            <Link href="/pendaftaran-sekolah">
                <Button size="lg" className="bg-blue-600 text-white cursor-pointer">Daftar Sekarang</Button>
            </Link>
            {!isLoggedIn && (
                <p className="text-sm text-blue-700 mt-4">
                    Belum punya akun?{' '}
                    <Link href="/buat-akun" className="underline text-blue-900 hover:text-blue-600 cursor-pointer">Buat akun terlebih dahulu</Link>.
                </p>
            )}
        </section>
    );
}
