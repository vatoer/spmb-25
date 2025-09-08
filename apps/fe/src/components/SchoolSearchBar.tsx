
"use client";
import { Input } from "@workspace/ui/components/input";
import { FiSearch } from "react-icons/fi";

export default function SchoolSearchBar({ value, onChange }: { value: string; onChange: (v: string) => void }) {
    return (
        <div className="mb-4 flex justify-center">
            <div className="relative max-w-md w-full">
                <Input
                    type="text"
                    value={value}
                    onChange={e => onChange(e.target.value)}
                    placeholder="Cari sekolah berdasarkan nama atau lokasi..."
                    className="w-full pr-10 border border-blue-200 rounded-lg py-2 pl-3 focus:outline-none focus:ring-2 focus:ring-blue-300 bg-blue-50 text-blue-900 placeholder:text-blue-400"
                    aria-label="Cari sekolah"
                />
                <button
                    type="button"
                    tabIndex={-1}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-blue-500 hover:text-blue-700 focus:outline-none bg-transparent p-1"
                    aria-label="Cari"
                    disabled
                >
                    <FiSearch size={20} />
                </button>
            </div>
        </div>
    );
}
