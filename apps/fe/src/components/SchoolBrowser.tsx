"use client";

import { useState } from "react";
import SchoolCard from "./SchoolCard";
import SchoolExploreCard from "./SchoolExploreCard";
import SchoolSearchBar from "./SchoolSearchBar";

const schools = [
    { name: "SMA Negeri 1", location: "Kota Lamongan", desc: "Sekolah unggulan dengan fasilitas lengkap." },
    { name: "SMA Negeri 2", location: "Kota Surabaya", desc: "Fokus pada pengembangan karakter dan akademik." },
    { name: "SMA Negeri 3", location: "Kota Bekasi", desc: "Lingkungan belajar nyaman dan modern." },
    { name: "SMA Negeri 4", location: "Kota Bandung", desc: "Program ekstrakurikuler beragam dan menarik." },
    { name: "SMA Negeri 5", location: "Kota Jakarta", desc: "Fasilitas olahraga yang lengkap dan modern." },
    { name: "SMA Negeri 6", location: "Kota Yogyakarta", desc: "Sekolah dengan prestasi akademik tinggi." },
    { name: "SMA Negeri 7", location: "Kota Semarang", desc: "Lingkungan belajar yang asri dan nyaman." },
    { name: "SMA Negeri 8", location: "Kota Malang", desc: "Fokus pada pengembangan seni dan budaya." },
    { name: "SMA Negeri 9", location: "Kota Medan", desc: "Sekolah dengan fasilitas teknologi modern." },
    { name: "SMA Negeri 10", location: "Kota Palembang", desc: "Program olahraga unggulan dan prestasi." },
    { name: "SMA Negeri 11", location: "Kota Pontianak", desc: "Sekolah dengan lingkungan belajar yang kondusif." },
    { name: "SMA Negeri 12", location: "Kota Manado", desc: "Fokus pada pengembangan karakter dan kepemimpinan." },
    { name: "SMA Negeri 13", location: "Kota Makassar", desc: "Sekolah dengan program unggulan di bidang sains." },
    { name: "SMA Negeri 14", location: "Kota Palu", desc: "Fasilitas lengkap untuk pengembangan seni dan budaya." },
    { name: "SMA Negeri 15", location: "Kota Ambon", desc: "Lingkungan belajar yang mendukung kreativitas siswa." },
    { name: "SMA Negeri 16", location: "Kota Jayapura", desc: "Sekolah dengan program internasional." },
    { name: "SMA Negeri 17", location: "Kota Kupang", desc: "Fokus pada pengembangan teknologi dan inovasi." },
    { name: "SMA Negeri 18", location: "Kota Ternate", desc: "Sekolah dengan program kewirausahaan." },
    { name: "SMA Negeri 19", location: "Kota Serang", desc: "Lingkungan belajar yang inklusif dan ramah." },
    { name: "SMA Negeri 20", location: "Kota Cirebon", desc: "Fasilitas seni dan budaya yang lengkap." },
    { name: "SMA Negeri 21", location: "Kota Tasikmalaya", desc: "Sekolah dengan program olahraga unggulan." },
    { name: "SMA Negeri 22", location: "Kota Sukabumi", desc: "Fokus pada pengembangan karakter siswa." },
    { name: "SMA Negeri 23", location: "Kota Bogor", desc: "Sekolah dengan lingkungan belajar yang asri." },
    { name: "SMA Negeri 24", location: "Kota Depok", desc: "Fasilitas teknologi yang mendukung pembelajaran." },
    { name: "SMA Negeri 25", location: "Kota Tangerang", desc: "Sekolah dengan program akademik unggulan." },
];

export default function SchoolBrowser() {
    const [search, setSearch] = useState("");
    const filteredSchools = schools.filter(school =>
        school.name.toLowerCase().includes(search.toLowerCase()) ||
        school.location.toLowerCase().includes(search.toLowerCase()) ||
        school.desc.toLowerCase().includes(search.toLowerCase())
    ).slice(0, 8);

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
