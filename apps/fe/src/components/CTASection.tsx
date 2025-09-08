import { Button } from "@workspace/ui/components/button";
import Link from "next/link";

export default function CTASection({ isLoggedIn = false }: { isLoggedIn?: boolean }) {
    return (
        <section className="py-16 text-center bg-blue-600">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Siap Mendaftar?</h2>
            <p className="text-white mb-8">Mulai proses pendaftaran SPMB dengan satu langkah mudah.</p>
            <Link href="/pendaftaran-sekolah">
                <Button size="lg" className="bg-white text-blue-600 font-semibold shadow-md cursor-pointer">Mulai Daftar</Button>
            </Link>
            {!isLoggedIn && (
                <p className="text-sm text-blue-100 mt-6">
                    Belum punya akun?{' '}
                    <Link href="/buat-akun" className="underline text-white hover:text-blue-200 cursor-pointer">Buat akun terlebih dahulu</Link>.
                </p>
            )}
        </section>
    );
}
