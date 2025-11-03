'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';

export function Navbar() {
    const pathname = usePathname();

    const isActive = (path: string) => {
        return pathname === path ? 'text-orange-500 font-medium' : 'text-slate-600 hover:text-slate-900';
    };

    return (
        <header className="fixed top-0 left-0 right-0 h-16 bg-white shadow-sm z-50">
            <div className="container mx-auto h-full flex items-center justify-between px-4">
                <Link href="/" className="flex items-center space-x-2">
                    <span className="text-2xl">📚</span>
                    <h1 className="text-xl font-semibold text-slate-900">MLN122</h1>
                </Link>

                <nav className="hidden md:flex items-center space-x-6">
                    <Link href="/" className={isActive('/')}>
                        Trang chủ
                    </Link>
                    <Link href="/content" className={isActive('/content')}>
                        Nội dung
                    </Link>
                    <Link href="/quiz" className={isActive('/quiz')}>
                        Trắc nghiệm
                    </Link>
                    <Link href="/chat" className={isActive('/chat')}>
                        Chatbot học tập
                    </Link>
                </nav>

                <Button asChild className="bg-orange-500 hover:bg-orange-600">
                    <Link href="/quiz">Làm trắc nghiệm</Link>
                </Button>
            </div>
        </header>
    );
}