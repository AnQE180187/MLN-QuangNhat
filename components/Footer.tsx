export function Footer() {
    return (
        <footer className="bg-slate-900 text-slate-200 py-6">
            <div className="container mx-auto px-4 text-center">
                <p className="mb-2">MLN122 – Các Quan Hệ Lợi Ích Kinh Tế Ở Việt Nam</p>
                <p className="text-sm text-slate-400 mb-4">Đại học FPT Quy Nhơn | Nhóm sinh viên 2025</p>
                <div className="flex justify-center space-x-4">
                    <a
                        href="#"
                        className="hover:text-orange-400 transition-colors flex items-center"
                    >
                        <span className="mr-2">📄</span>
                        Tài liệu PDF
                    </a>
                    <a
                        href="https://www.facebook.com/FPTU.QN"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-orange-400 transition-colors flex items-center"
                    >
                        <span className="mr-2">📱</span>
                        FPT Quy Nhơn
                    </a>
                </div>
            </div>
        </footer>
    );
}