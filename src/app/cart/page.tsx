'use client';

import { useCartStore } from '@/lib/store';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, Minus, Plus, ArrowLeft, CreditCard, ShoppingBag } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function CartPage() {
  const { items, removeItem, updateQuantity, getTotalPrice } = useCartStore();
  const router = useRouter();
  const totalPrice = getTotalPrice();
  const shipping = items.length > 0 ? (totalPrice > 500 ? 0 : 25) : 0;
  const tax = totalPrice * 0.08;

  return (
    <main className="min-h-screen pt-24">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-10 tracking-tight">Your Shopping Cart</h1>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-12">
          {/* Cart Items List */}
          <div className="xl:col-span-2 space-y-6">
            <AnimatePresence mode="popLayout">
              {items.length > 0 ? (
                items.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="flex flex-col sm:flex-row items-center gap-6 p-6 bg-card border border-border rounded-[32px] product-card-shadow"
                  >
                    {/* Image */}
                    <div className="w-full sm:w-32 aspect-square rounded-2xl overflow-hidden bg-secondary/20 flex-shrink-0">
                      <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                    </div>

                    {/* Info */}
                    <div className="flex-1 text-center sm:text-left">
                      <Link href={`/product/${item.id}`} className="hover:text-primary transition-colors">
                        <h3 className="text-xl font-bold mb-1">{item.title}</h3>
                      </Link>
                      <p className="text-muted-foreground text-sm font-medium mb-4">{item.category}</p>
                      <p className="text-2xl font-bold text-primary">${item.price}</p>
                    </div>

                    {/* Controls */}
                    <div className="flex flex-col sm:items-end gap-4 w-full sm:w-auto">
                      <div className="flex items-center gap-4 bg-secondary/50 p-1.5 rounded-2xl border border-border self-center sm:self-auto">
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-2 bg-background rounded-xl hover:bg-primary hover:text-white transition-all shadow-sm"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-8 text-center font-bold">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-2 bg-background rounded-xl hover:bg-primary hover:text-white transition-all shadow-sm"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                      <button 
                        onClick={() => removeItem(item.id)}
                        className="text-red-500 hover:text-red-600 font-medium flex items-center gap-2 text-sm transition-colors self-center sm:self-auto px-4 py-2 rounded-xl hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4" />
                        Remove
                      </button>
                    </div>
                  </motion.div>
                ))
              ) : (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex flex-col items-center justify-center py-24 bg-secondary/10 rounded-[40px] border-2 border-dashed border-border"
                >
                  <div className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center mb-6">
                    <ShoppingBag className="w-10 h-10 text-muted-foreground" />
                  </div>
                  <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
                  <p className="text-muted-foreground mb-8 text-center max-w-xs">
                    Looks like you haven't added anything to your cart yet.
                  </p>
                  <Link 
                    href="/" 
                    className="bg-primary text-white px-8 py-4 rounded-2xl font-bold shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all hover:-translate-y-1"
                  >
                    Start Shopping
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
            
            {items.length > 0 && (
              <button 
                onClick={() => router.push('/')}
                className="flex items-center gap-2 font-bold text-muted-foreground hover:text-primary transition-colors py-4"
              >
                <ArrowLeft className="w-5 h-5" />
                Continue Shopping
              </button>
            )}
          </div>

          {/* Summary */}
          <div className="xl:col-span-1">
            <div className="bg-card border border-border rounded-[40px] p-8 product-card-shadow sticky top-24">
              <h2 className="text-2xl font-bold mb-8">Order Summary</h2>
              
              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-muted-foreground font-medium">
                  <span>Subtotal</span>
                  <span className="text-foreground">${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-muted-foreground font-medium">
                  <span>Shipping</span>
                  <span className="text-foreground">{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between text-muted-foreground font-medium">
                  <span>Estimated Tax</span>
                  <span className="text-foreground">${tax.toFixed(2)}</span>
                </div>
                <div className="border-t border-border pt-4 mt-4 flex justify-between items-center">
                  <span className="text-xl font-bold">Total</span>
                  <span className="text-3xl font-extrabold text-primary">${(totalPrice + shipping + tax).toFixed(2)}</span>
                </div>
              </div>

              <button 
                disabled={items.length === 0}
                className="w-full bg-foreground text-background py-5 rounded-3xl font-bold text-lg hover:opacity-90 transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed group"
              >
                <CreditCard className="w-6 h-6 group-hover:animate-bounce" />
                Checkout Now
              </button>
              
              <div className="mt-8 pt-8 border-t border-border space-y-4">
                <p className="text-xs text-center text-muted-foreground font-medium uppercase tracking-widest">
                  Secure Payment Guaranteed
                </p>
                <div className="flex justify-center gap-4 opacity-50 grayscale">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/2560px-Visa_Inc._logo.svg.png" className="h-4" alt="Visa" />
                  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/1280px-Mastercard-logo.svg.png" className="h-6" alt="Mastercard" />
                  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/PayPal.svg/1200px-PayPal.svg.png" className="h-4" alt="PayPal" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
