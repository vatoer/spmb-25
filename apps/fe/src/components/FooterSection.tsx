export default function FooterSection() {
    return (
        <footer className="bg-blue-900 text-white py-8 text-center">
            <div className="mb-2">&copy; {new Date().getFullYear()} SPMB - Sistem Penerimaan Murid Baru</div>
            <div>
                <a href="#" className="underline text-blue-200">Kontak</a> | <a href="#" className="underline text-blue-200">Kebijakan Privasi</a>
            </div>
        </footer>
    );
}
