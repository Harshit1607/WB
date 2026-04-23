'use client';

import { Suspense, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { products } from '@/data/products';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { useCartStore } from '@/lib/store';
import { motion } from 'framer-motion';
import { Star, ShoppingCart, ArrowLeft, ShieldCheck, Truck, RotateCcw, Minus, Plus } from 'lucide-react';

export default function ProductDetail() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const product = products.find((p) => p.id === id);
  const addItem = useCartStore((state) => state.addItem);
  
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Product Not Found</h1>
          <button 
            onClick={() => router.push('/')}
            className="text-primary hover:underline flex items-center gap-2 mx-auto"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Shop
          </button>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    addItem(product);
  };

  return (
    <main className="min-h-screen pt-24">
      <Suspense fallback={<div className="h-20 bg-background" />}>
        <Header />
      </Suspense>
      
      <div className="container mx-auto px-4 py-8">
        <button 
          onClick={() => router.back()}
          className="group flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors mb-8"
        >
          <div className="p-1.5 rounded-full bg-secondary group-hover:bg-primary/10 transition-colors">
            <ArrowLeft className="w-4 h-4" />
          </div>
          Back to Results
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="relative"
          >
            <div className="aspect-square rounded-[40px] overflow-hidden bg-secondary/20 border border-border shadow-2xl">
              <img 
                src={product.image} 
                alt={product.title} 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex gap-4 mt-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="w-20 h-20 rounded-2xl border-2 border-border overflow-hidden cursor-pointer hover:border-primary transition-all">
                  <img src={product.image} alt="" className="w-full h-full object-cover opacity-60 hover:opacity-100" />
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col"
          >
            <div className="mb-8">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary mb-2 block">
                {product.category} — {product.brand}
              </span>
              <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">{product.title}</h1>
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-1 bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-sm font-bold">
                  <Star className="w-4 h-4 fill-current" />
                  <span>{product.rating.rate}</span>
                </div>
                <span className="text-muted-foreground text-sm font-medium">({product.rating.count} Verified Reviews)</span>
              </div>
              <p className="text-3xl font-bold text-foreground mb-6">${product.price}</p>
              <p className="text-muted-foreground leading-relaxed text-lg">
                {product.description}
              </p>
            </div>

            <div className="space-y-6 mb-10">
              <div>
                <h3 className="font-bold mb-3">Quantity</h3>
                <div className="flex items-center gap-4 w-fit bg-secondary/50 p-1.5 rounded-2xl border border-border">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 bg-background rounded-xl hover:bg-primary hover:text-white transition-all shadow-sm disabled:opacity-50"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-8 text-center font-bold">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2 bg-background rounded-xl hover:bg-primary hover:text-white transition-all shadow-sm"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={handleAddToCart}
                  className="flex-1 bg-primary text-white py-4 px-8 rounded-2xl font-bold text-lg shadow-xl shadow-primary/20 hover:shadow-primary/40 transition-all flex items-center justify-center gap-3 hover:-translate-y-1"
                >
                  <ShoppingCart className="w-5 h-5" />
                  Add to Cart
                </button>
                <button className="px-8 py-4 bg-secondary font-bold rounded-2xl hover:bg-secondary/70 transition-all">
                  Wishlist
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-border pt-10">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 text-primary rounded-lg">
                  <Truck className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold">Free Shipping</p>
                  <p className="text-[10px] text-muted-foreground">Orders over $50</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 text-primary rounded-lg">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold">2 Year Warranty</p>
                  <p className="text-[10px] text-muted-foreground">Full protection</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 text-primary rounded-lg">
                  <RotateCcw className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold">30-Day Returns</p>
                  <p className="text-[10px] text-muted-foreground">Easy exchange</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <section className="mt-24 border-t border-border pt-20">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl font-bold">Customer Reviews</h2>
            <button className="text-primary font-bold hover:underline">Write a Review</button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[1, 2].map((i) => (
              <div key={i} className="p-8 bg-secondary/20 rounded-[32px] border border-border">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center font-bold text-primary">
                    JD
                  </div>
                  <div>
                    <h4 className="font-bold">John Doe</h4>
                    <div className="flex text-amber-500">
                      {[1, 2, 3, 4, 5].map(s => <Star key={s} className="w-3 h-3 fill-current" />)}
                    </div>
                  </div>
                  <span className="ml-auto text-xs text-muted-foreground font-medium">2 days ago</span>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  "Absolutely love this product! The quality is outstanding and it exceeded all my expectations. Would definitely recommend to anyone looking for a premium experience."
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>

      <Footer />
    </main>
  );
}
