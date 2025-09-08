import { Button } from "@workspace/ui/components/button";
import { FcGoogle } from "react-icons/fc";

export default function GoogleLoginButton({ label = "Login dengan Google" }: { label?: string }) {
    return (
        <Button variant="outline" className="w-full flex items-center justify-center gap-2 border-gray-300">
            <FcGoogle size={20} />
            {label}
        </Button>
    );
}
