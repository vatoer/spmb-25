import AppIdentity from "@/components/AppIdentity";
import GoogleLoginButton from "@/components/GoogleLoginButton";
import RegistrationForm from "@/components/RegistrationForm";

export default function BuatAkunPage() {
    return (
        <main className="min-h-svh flex flex-col items-center justify-center bg-white">
            <div className="w-full max-w-md p-6 rounded-lg shadow-lg bg-white">
                <AppIdentity subtle />
                <h1 className="text-2xl font-bold text-center mb-4">Buat Akun SPMB</h1>
                <RegistrationForm buttonLabel="Buat Akun" />
                <div className="my-6 flex items-center justify-center">
                    <span className="text-gray-500">atau</span>
                </div>
                <GoogleLoginButton label="Buat Akun dengan Google" />
            </div>
        </main>
    );
}
