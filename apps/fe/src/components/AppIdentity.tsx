export default function AppIdentity({ subtle = false }: { subtle?: boolean }) {
    return (
        <div className={subtle ? "mb-2 text-center text-blue-900 text-lg font-semibold opacity-70" : "mb-6 text-center text-blue-900 text-2xl font-bold"}>
            SPMB
            <span className="ml-2 text-blue-600 font-normal">Sistem Penerimaan Murid Baru</span>
            {subtle && <span className="block text-xs text-blue-400 mt-1">Halaman Daftar Akun</span>}
        </div>
    );
}
