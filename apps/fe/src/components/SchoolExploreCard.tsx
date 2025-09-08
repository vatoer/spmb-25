import { Button } from "@workspace/ui/components/button";
import { FiSearch } from "react-icons/fi";

export default function SchoolExploreCard({ onExplore }: { onExplore?: () => void }) {
    return (
        <div className="flex flex-col items-center justify-center h-full min-h-[180px] bg-blue-50 rounded-xl border border-blue-100 shadow-sm p-6 text-center hover:shadow-md transition cursor-pointer">
            <div className="mb-3">
                <div className="flex items-center justify-center w-14 h-14 rounded-full bg-blue-100">
                    <FiSearch size={32} className="text-blue-500" />
                </div>
            </div>
            <div className="font-semibold text-blue-900 text-lg mb-1">Telusuri sekolah lainnya</div>
            <div className="text-blue-600 text-sm mb-4">Masih banyak sekolah lain yang bisa kamu cari sesuai lokasi dan preferensi.</div>
            <Button variant="outline" className="w-full max-w-[180px]" onClick={onExplore}>
                Telusuri Semua Sekolah
            </Button>
        </div>
    );
}
