"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@workspace/ui/components/avatar";
import { Button } from "@workspace/ui/components/button";
import { Popover, PopoverContent, PopoverTrigger } from "@workspace/ui/components/popover";
import { useEffect, useRef, useState } from "react";

export default function ProfileAvatarMenu({ name = "Pengguna", avatarUrl = "/avatar.png" }: { name?: string; avatarUrl?: string }) {
    // Pastikan hanya akses data dinamis di client
    const [open, setOpen] = useState(false);
    const [clientName, setClientName] = useState(name);
    const [clientAvatarUrl, setClientAvatarUrl] = useState(avatarUrl);
    const isMounted = useRef(false);

    useEffect(() => {
        // Hindari perbedaan antara server dan client
        if (!isMounted.current) {
            isMounted.current = true;
            setClientName(name);
            setClientAvatarUrl(avatarUrl);
        }
    }, [name, avatarUrl]);

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <button className="flex items-center gap-2 focus:outline-none" aria-label="Profil" type="button" onClick={() => setOpen(!open)} suppressHydrationWarning>
                    <Avatar>
                        <AvatarImage src={clientAvatarUrl} alt="Profil" />
                        <AvatarFallback suppressHydrationWarning>{clientName[0]}</AvatarFallback>
                    </Avatar>
                </button>
            </PopoverTrigger>
            <PopoverContent align="end" className="min-w-[220px] p-0 rounded-lg shadow-lg border border-blue-100">
                <div className="flex flex-col items-center py-5 px-4 bg-gradient-to-b from-blue-50 to-white rounded-t-lg">
                    <Avatar className="w-14 h-14 border-2 border-blue-200 shadow-sm">
                        <AvatarImage src={clientAvatarUrl} alt="Profil" />
                        <AvatarFallback suppressHydrationWarning>{clientName[0]}</AvatarFallback>
                    </Avatar>
                    <span className="mt-3 font-semibold text-blue-900 text-base" suppressHydrationWarning>{clientName}</span>
                    {/* <span className="text-xs text-blue-600">pengguna@email.com</span> */}
                </div>
                <div className="border-t border-blue-100" />
                <div className="flex flex-col gap-1 p-4">
                    <Button className="w-full flex items-center gap-2 justify-start px-3 py-2 rounded-md hover:bg-blue-50 transition" variant="ghost">
                        <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" className="text-blue-700 mr-2" viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" /></svg>
                        Lihat Profil
                    </Button>
                    <Button
                        className="w-full flex items-center gap-2 justify-start px-3 py-2 rounded-md text-blue-900 hover:bg-blue-50 transition"
                        variant="ghost"
                    >
                        {/* Power icon for logout */}
                        <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" className="text-blue-700 mr-2" viewBox="0 0 24 24">
                            <path d="M12 2v10" />
                            <circle cx="12" cy="16" r="6" />
                        </svg>
                        Logout
                    </Button>
                </div>
            </PopoverContent>
        </Popover>
    );
}
