import { Card } from "@workspace/ui/components/card";

export default function SchoolCard({ school }: { school: { name: string; location: string; desc: string } }) {
    return (
        <Card className="p-4 shadow-sm flex flex-col h-full">
            <h3 className="font-semibold text-blue-800 mb-1">{school.name}</h3>
            <p className="text-sm text-blue-600 mb-2">{school.location}</p>
            <p className="text-gray-600 text-sm mb-2">{school.desc}</p>
            <div className="flex-1" />
            <button className="px-4 py-2 bg-blue-600 text-white rounded cursor-pointer w-full">Pilih Sekolah</button>
        </Card>
    );
}