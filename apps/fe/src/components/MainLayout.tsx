import FooterSection from "@/components/FooterSection";
import HeaderSection from "@/components/HeaderSection";

export default function MainLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <HeaderSection />
            <main className="min-h-[60vh]">{children}</main>
            <FooterSection />
        </>
    );
}
