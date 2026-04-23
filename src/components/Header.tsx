'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Search, ShoppingCart, User, Menu, X } from 'lucide-react';
import { useCartStore } from '@/lib/store';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter, useSearchParams } from 'next/navigation';

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const totalItems = useCartStore((state) => state.getTotalItems());
  const router = useRouter();
  const searchParams = useSearchParams();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams.toString());
    if (searchValue) {
      params.set('q', searchValue);
    } else {
      params.delete('q');
    }
    router.push(`/?${params.toString()}`);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-background/80 backdrop-blur-xl shadow-md py-3' : 'bg-background py-5'
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold tracking-tighter flex items-center gap-2">
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white rotate-12 shadow-lg">
            G
          </div>
          <span className="hidden sm:block">GravityShop</span>
        </Link>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="flex-1 max-w-md relative group hidden md:block">
          <input
            type="text"
            placeholder="Search for products..."
            className="w-full bg-secondary/50 border-none rounded-full py-2 px-10 focus:ring-2 focus:ring-primary outline-none transition-all"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
        </form>

        {/* Actions */}
        <div className="flex items-center gap-2 sm:gap-4">
          <button className="md:hidden p-2 hover:bg-secondary rounded-full transition-colors">
            <Search className="w-5 h-5" />
          </button>
          
          <Link href="/cart" className="relative p-2 hover:bg-secondary rounded-full transition-colors">
            <ShoppingCart className="w-5 h-5" />
            <AnimatePresence>
              {mounted && totalItems > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="absolute top-0 right-0 bg-primary text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-background"
                >
                  {totalItems}
                </motion.span>
              )}
            </AnimatePresence>
          </Link>

          <button className="p-2 hover:bg-secondary rounded-full transition-colors hidden sm:block">
            <User className="w-5 h-5" />
          </button>

          <button 
            className="md:hidden p-2 hover:bg-secondary rounded-full transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 glass border-t border-border p-4 md:hidden"
          >
            <form onSubmit={handleSearch} className="mb-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full bg-secondary border-none rounded-xl py-3 px-10 outline-none"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              </div>
            </form>
            <nav className="flex flex-col gap-2">
              <Link href="/" className="py-2 font-medium hover:text-primary transition-colors">Home</Link>
              <Link href="/categories" className="py-2 font-medium hover:text-primary transition-colors">Categories</Link>
              <Link href="/deals" className="py-2 font-medium hover:text-primary transition-colors">Hot Deals</Link>
              <Link href="/account" className="py-2 font-medium hover:text-primary transition-colors">My Account</Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
