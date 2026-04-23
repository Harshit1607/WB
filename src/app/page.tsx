'use client';

import { Suspense, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { products } from '@/data/products';
import { Header } from '@/components/Header';
import { Sidebar } from '@/components/Sidebar';
import { ProductCard } from '@/components/ProductCard';
import { Footer } from '@/components/Footer';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag } from 'lucide-react';

function ProductListings() {
  const searchParams = useSearchParams();
  
  const filteredProducts = useMemo(() => {
    const q = searchParams.get('q')?.toLowerCase() || '';
    const category = searchParams.get('category');
    const maxPrice = Number(searchParams.get('maxPrice')) || Infinity;
    const brands = searchParams.get('brands')?.split(',') || [];

    return products.filter((product) => {
      const matchesSearch = product.title.toLowerCase().includes(q) || 
                           product.description.toLowerCase().includes(q);
      const matchesCategory = !category || product.category === category;
      const matchesPrice = product.price <= maxPrice;
      const matchesBrand = brands.length === 0 || brands.includes(product.brand);

      return matchesSearch && matchesCategory && matchesPrice && matchesBrand;
    });
  }, [searchParams]);

  return (
    <div className="flex-1">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-1">Our Collections</h1>
          <p className="text-muted-foreground text-sm">
            Showing {filteredProducts.length} products
          </p>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {filteredProducts.length > 0 ? (
          <motion.div 
            key="grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </motion.div>
        ) : (
          <motion.div 
            key="empty"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="flex flex-col items-center justify-center py-20 bg-secondary/20 rounded-3xl border-2 border-dashed border-border"
          >
            <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mb-4">
              <ShoppingBag className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-bold mb-2">No products found</h3>
            <p className="text-muted-foreground text-center max-w-xs">
              We couldn't find any products matching your current filters. Try adjusting them or reset to see all items.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen pt-24">
      <Suspense fallback={<div className="h-20 bg-background" />}>
        <Header />
      </Suspense>
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-10">
          {/* Sidebar */}
          <div className="w-full md:w-64 flex-shrink-0">
            <Suspense fallback={<div className="h-96 bg-secondary animate-pulse rounded-3xl" />}>
              <Sidebar />
            </Suspense>
          </div>

          {/* Listings */}
          <Suspense fallback={<div className="flex-1 h-screen bg-secondary/10 animate-pulse rounded-3xl" />}>
            <ProductListings />
          </Suspense>
        </div>
      </div>

      <Footer />
    </main>
  );
}
