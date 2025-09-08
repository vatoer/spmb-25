import { Button } from "@workspace/ui/components/button";
import { Input } from "@workspace/ui/components/input";

export default function RegistrationForm({ buttonLabel = "Daftar" }: { buttonLabel?: string }) {
    return (
        <form className="flex flex-col gap-4">
            <Input type="text" placeholder="Nama Lengkap" required />
            <Input type="email" placeholder="Email" required />
            <Input type="password" placeholder="Kata Sandi" required />
            <Button type="submit" className="w-full bg-blue-600 text-white">{buttonLabel}</Button>
        </form>
    );
}
