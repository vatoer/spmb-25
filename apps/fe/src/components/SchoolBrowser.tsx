"use client";

import { fetchAllSekolah } from "@/actions/sekolah";
import { sekolah } from "@workspace/database";
import { useEffect, useState } from "react";
import SchoolCard from "./SchoolCard";
import SchoolExploreCard from "./SchoolExploreCard";
import SchoolSearchBar from "./SchoolSearchBar";

export default function SchoolBrowser() {
    const [search, setSearch] = useState("");
    const [sekolahList, setSekolahList] = useState<sekolah[]>([]);
    const filteredSchools = sekolahList.filter(school =>
        school.nama_sekolah.toLowerCase().includes(search.toLowerCase()) ||
        school.desa_kelurahan?.toLowerCase().includes(search.toLowerCase()) ||
        school.kabupaten_kota?.toLowerCase().includes(search.toLowerCase())
    ).slice(0, 8);

    useEffect(() => {
        console.log("fetchAllSekolah:", "fetchAllSekolah");

        const fetchData = async () => {
            // Panggil fungsi fetchAllSekolah di sini
            const result = await fetchAllSekolah();
            setSekolahList(result);
            // Tambahkan log untuk melihat hasil yang diambil
            console.log("Fetched schools:", result);
        };

        fetchData();

    }, []);

    return (
        <div>
            <SchoolSearchBar value={search} onChange={setSearch} />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {filteredSchools.length > 0 ? (
                    <>
                        {filteredSchools.map((school, i) => (
                            <SchoolCard key={i} school={school} />
                        ))}
                        {/* Card khusus di akhir grid */}
                        <SchoolExploreCard />
                    </>
                ) : (
                    <div className="col-span-3 text-center text-blue-700 py-8">
                        Sekolah tidak ditemukan.<br />
                        <div className="mt-6 flex justify-center">
                            <div className="max-w-xs w-full">
                                <SchoolExploreCard />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
