'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { BookOpen, Menu, X, Home, FileText, FileQuestion, MessageCircle } from 'lucide-react';

export function Navbar() {
    const pathname = usePathname();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { scrollY } = useScroll();

    useMotionValueEvent(scrollY, "change", (latest) => {
        setIsScrolled(latest > 50);
    });

    const isActive = (path: string) => {
        return pathname === path;
    };

    const navItems = [
        { href: '/', label: 'Trang chủ', icon: Home },
        { href: '/content', label: 'Nội dung', icon: FileText },
        { href: '/quiz', label: 'Trắc nghiệm', icon: FileQuestion },
        { href: '/chat', label: 'Chatbot học tập', icon: MessageCircle },
    ];

    return (
        <motion.header
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
                isScrolled 
                    ? 'bg-white/70 backdrop-blur-3xl shadow-2xl shadow-slate-900/10 border-b border-white/20 h-16' 
                    : 'bg-white/60 backdrop-blur-2xl shadow-xl shadow-slate-900/5 border-b border-white/30 h-20'
            }`}
            style={{
                background: isScrolled 
                    ? 'linear-gradient(135deg, rgba(255, 255, 255, 0.7) 0%, rgba(255, 255, 255, 0.5) 100%)'
                    : 'linear-gradient(135deg, rgba(255, 255, 255, 0.6) 0%, rgba(255, 255, 255, 0.4) 100%)',
            }}
        >
            {/* Animated gradient border */}
            <div className="absolute bottom-0 left-0 right-0 h-[2px] overflow-hidden">
                <motion.div
                    animate={{
                        x: ['-100%', '100%'],
                    }}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                    className="h-full w-1/2 bg-gradient-to-r from-transparent via-orange-500/60 to-transparent"
                />
            </div>

            <div className="container mx-auto h-full flex items-center justify-between px-4 md:px-6 lg:px-8">
                {/* Logo */}
                <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex-shrink-0"
                >
                    <Link href="/" className="flex items-center space-x-3 group">
                        <div className="relative">
                            {/* Main logo icon */}
                            <div className="relative bg-gradient-to-br from-orange-500 via-orange-500 to-orange-600 p-2.5 rounded-2xl shadow-md transition-all duration-300 backdrop-blur-sm">
                                <BookOpen className="w-6 h-6 text-white rounded-lg" />
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <motion.h1 
                                className={`font-bold bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 bg-clip-text text-transparent transition-all ${
                                    isScrolled ? 'text-lg' : 'text-xl'
                                }`}
                            >
                                MLN122
                            </motion.h1>
                            <motion.p 
                                className={`text-xs font-medium bg-gradient-to-r from-slate-500 to-slate-600 bg-clip-text text-transparent transition-all duration-300 ${
                                    isScrolled ? 'opacity-0 h-0 overflow-hidden' : 'opacity-100 h-auto'
                                }`}
                            >
                                Học tập thông minh
                            </motion.p>
                        </div>
                    </Link>
                </motion.div>

                {/* Desktop Navigation */}
                <nav className="hidden lg:flex items-center space-x-2">
                    {navItems.map((item, index) => {
                        const Icon = item.icon;
                        const active = isActive(item.href);
                        return (
                            <motion.div
                                key={item.href}
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <Link 
                                    href={item.href}
                                    className={`relative flex items-center gap-2 px-4 py-2.5 rounded-full transition-all ${
                                        active
                                            ? 'bg-orange-500 text-white'
                                            : 'text-slate-600 hover:bg-slate-100'
                                    }`}
                                >
                                    <Icon className="w-4 h-4" />
                                    <span className="font-semibold text-sm whitespace-nowrap">
                                        {item.label}
                                    </span>
                                </Link>
                            </motion.div>
                        );
                    })}
                </nav>

                {/* CTA Button & Mobile Menu Toggle */}
                <div className="flex items-center gap-3">
                    <motion.div
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        className="hidden lg:block relative"
                    >
                        <Button 
                            asChild 
                            className="relative bg-gradient-to-r from-orange-500/90 via-orange-500/90 to-orange-600/90 hover:from-orange-600 hover:via-orange-600 hover:to-orange-700 backdrop-blur-md text-white shadow-md transition-all duration-300 font-semibold px-6 py-2.5 overflow-hidden group rounded-2xl border border-orange-400/30"
                        >
                            <Link href="/quiz" className="flex items-center gap-2 relative z-10">
                                <div className="p-1 bg-white/20 rounded-lg backdrop-blur-sm">
                                    <FileQuestion className="w-4 h-4 group-hover:rotate-12 transition-transform rounded-md" />
                                </div>
                                <span className="px-2 py-1 rounded-lg bg-white/10 backdrop-blur-sm">Làm trắc nghiệm</span>
                            </Link>
                        </Button>
                        {/* Shine effect - moved outside Button */}
                        <motion.div
                            animate={{
                                x: ['-100%', '100%'],
                            }}
                            transition={{
                                duration: 3,
                                repeat: Infinity,
                                ease: "linear",
                                repeatDelay: 2
                            }}
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none rounded-md"
                        />
                    </motion.div>

                    <motion.button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        whileTap={{ scale: 0.9 }}
                        whileHover={{ scale: 1.1 }}
                        className="lg:hidden p-2.5 rounded-2xl text-slate-600 hover:bg-white/40 active:bg-white/60 backdrop-blur-sm transition-colors relative border border-white/30"
                        aria-label="Toggle menu"
                    >
                        <AnimatePresence mode="wait">
                            {isMobileMenuOpen ? (
                                <motion.div
                                    key="close"
                                    initial={{ rotate: -180, opacity: 0 }}
                                    animate={{ rotate: 0, opacity: 1 }}
                                    exit={{ rotate: 180, opacity: 0 }}
                                    transition={{ duration: 0.3, type: "spring" }}
                                >
                                    <X className="w-6 h-6" />
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="menu"
                                    initial={{ rotate: 180, opacity: 0 }}
                                    animate={{ rotate: 0, opacity: 1 }}
                                    exit={{ rotate: -180, opacity: 0 }}
                                    transition={{ duration: 0.3, type: "spring" }}
                                >
                                    <Menu className="w-6 h-6" />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.button>
                </div>
            </div>

            {/* Mobile Menu with backdrop */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="lg:hidden fixed inset-0 bg-black/20 backdrop-blur-sm z-[-1] mt-20"
                        />
                        
                        {/* Menu */}
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="lg:hidden overflow-hidden bg-white/80 backdrop-blur-2xl border-t border-white/30 shadow-xl"
                        >
                            <nav className="container mx-auto px-4 py-6 space-y-2">
                                {navItems.map((item, index) => {
                                    const Icon = item.icon;
                                    const active = isActive(item.href);
                                    return (
                                        <motion.div
                                            key={item.href}
                                            initial={{ opacity: 0, x: -30 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: index * 0.08, type: "spring" }}
                                        >
                                            <Link
                                                href={item.href}
                                                onClick={() => setIsMobileMenuOpen(false)}
                                                className={`flex items-center gap-3 px-4 py-3 rounded-full transition-all ${
                                                    active
                                                        ? 'bg-orange-500 text-white'
                                                        : 'text-slate-600 hover:bg-slate-100'
                                                }`}
                                            >
                                                <Icon className="w-5 h-5" />
                                                <span className="font-semibold">{item.label}</span>
                                            </Link>
                                        </motion.div>
                                    );
                                })}
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: navItems.length * 0.08, type: "spring" }}
                                    className="pt-4"
                                >
                                    <Button 
                                        asChild 
                                        className="w-full bg-gradient-to-r from-orange-500/90 to-orange-600/90 hover:from-orange-600 hover:to-orange-700 backdrop-blur-md text-white shadow-md font-semibold py-6 rounded-2xl border border-orange-400/30"
                                    >
                                        <Link href="/quiz" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center justify-center gap-2">
                                            <div className="p-1 bg-white/20 rounded-lg backdrop-blur-sm">
                                                <FileQuestion className="w-5 h-5 rounded-md" />
                                            </div>
                                            <span className="px-2 py-1 rounded-lg bg-white/10 backdrop-blur-sm">Làm trắc nghiệm</span>
                                        </Link>
                                    </Button>
                                </motion.div>
                            </nav>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </motion.header>
    );
}
