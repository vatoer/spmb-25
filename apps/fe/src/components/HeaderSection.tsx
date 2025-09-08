"use client";
import { Button } from "@workspace/ui/components/button";
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
} from "@workspace/ui/components/navigation-menu";
import Link from "next/link";
import { useState } from "react";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";
import { IoCloseOutline, IoGlobeOutline, IoMenuOutline } from "react-icons/io5";
import ProfileAvatarMenu from "./ProfileAvatarMenu";

const socialLinks = [
    { icon: FaFacebookF, href: "https://facebook.com" },
    { icon: FaInstagram, href: "https://instagram.com" },
    { icon: FaTwitter, href: "https://twitter.com" },
];

const navLinks = [
    { label: "Beranda", href: "/" },
    { label: "Tentang", href: "/tentang" },
    { label: "Panduan", href: "/panduan" },
    { label: "Kontak", href: "/kontak" },
];

export default function HeaderSection({ isLoggedIn = false }: { isLoggedIn?: boolean }) {
    const [mobileOpen, setMobileOpen] = useState(false);
    return (
        <header className="w-full bg-white shadow-sm sticky top-0 z-50">
            {/* Top bar: Social & Language */}
            <div className="flex justify-between items-center px-2 py-[2px] text-[9px] bg-blue-50 border-b border-blue-100 min-h-[18px]">
                <nav aria-label="Social media" className="flex gap-1">
                    {socialLinks.map(({ icon: Icon, href }, i) => (
                        <Link key={i} href={href} target="_blank" rel="noopener" aria-label={href.split('://')[1]} className="text-blue-700 hover:text-blue-900 focus:outline focus:outline-blue-300 rounded p-[2px]">
                            <Icon size={12} />
                        </Link>
                    ))}
                </nav>
                <Button variant="ghost" size="sm" className="flex items-center gap-1 text-blue-700" aria-label="Pilih Bahasa">
                    <IoGlobeOutline size={16} />
                    <span>ID</span>
                </Button>
            </div>
            {/* Navbar with mobile menu */}
            <nav aria-label="Main navigation" className="flex flex-wrap items-center px-6 py-3">
                {/* Burger menu (mobile) di kiri */}
                <button className="md:hidden p-2 text-blue-700 mr-2" aria-label="Menu" onClick={() => setMobileOpen(v => !v)}>
                    {mobileOpen ? <IoCloseOutline size={24} /> : <IoMenuOutline size={24} />}
                </button>
                <Link href="/" className="text-xl font-bold text-blue-900" aria-label="SPMB Home">SPMB</Link>
                <div className="hidden md:flex flex-1 justify-center">
                    <NavigationMenu>
                        <NavigationMenuList>
                            {navLinks.map((nav, i) => (
                                <NavigationMenuItem key={i}>
                                    <NavigationMenuLink href={nav.href} className="text-blue-700 hover:text-blue-900 font-medium px-4 py-2" aria-label={nav.label}>
                                        {nav.label}
                                    </NavigationMenuLink>
                                </NavigationMenuItem>
                            ))}
                        </NavigationMenuList>
                    </NavigationMenu>
                </div>
                <div className="flex-1" />
                <div className="hidden md:block">
                    {isLoggedIn ? (
                        <ProfileAvatarMenu name="Pengguna" avatarUrl="/avatar.png" />
                    ) : (
                        <Link href="/login" aria-label="Login">
                            <Button size="sm" variant="outline" className="text-blue-600 border-blue-600">Login</Button>
                        </Link>
                    )}
                </div>
                {/* Avatar profile (mobile) di kanan */}
                <div className="block md:hidden ml-auto">
                    {isLoggedIn ? (
                        <ProfileAvatarMenu name="Pengguna" avatarUrl="/avatar.png" />
                    ) : <Link href="/login" aria-label="Login">
                        <Button size="sm" variant="outline" className="text-blue-600 border-blue-600">Login</Button>
                    </Link>}
                </div>
            </nav>
            {/* Mobile menu content */}
            {mobileOpen && (
                <div className="md:hidden bg-white border-t border-blue-100 px-6 py-4">
                    <ul className="flex flex-col gap-4 mb-4">
                        {navLinks.map((nav, i) => (
                            <li key={i}>
                                <Link href={nav.href} className="text-blue-700 hover:text-blue-900 font-medium block py-2" aria-label={nav.label} onClick={() => setMobileOpen(false)}>
                                    {nav.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                    <div className="block md:hidden mt-2">
                        {isLoggedIn ? (
                            <ProfileAvatarMenu name="Pengguna" avatarUrl="/avatar.png" />
                        ) : (
                            <Link href="/login" aria-label="Login" onClick={() => setMobileOpen(false)}>
                                <Button size="sm" variant="outline" className="text-blue-600 border-blue-600 w-full">Login</Button>
                            </Link>
                        )}
                    </div>
                </div>
            )}
        </header>
    );
}
