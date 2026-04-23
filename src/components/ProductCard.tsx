'use client';

import Link from 'next/link';
import { ShoppingCart, Star, Plus } from 'lucide-react';
import { Product } from '@/data/products';
import { useCartStore } from '@/lib/store';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const addItem = useCartStore((state) => state.addItem);

  const handleAdd = () => {
    addItem(product);
    toast.success(`${product.title} added to cart!`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group relative bg-card rounded-3xl overflow-hidden product-card-shadow transition-all duration-500 border border-border"
    >
      {/* Image Section */}
      <Link href={`/product/${product.id}`} className="block relative aspect-square overflow-hidden bg-secondary/20">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        {/* Overlay with Quick Add */}
        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none" />
      </Link>

      {/* Content Section */}
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <span className="text-[10px] font-bold uppercase tracking-widest text-primary bg-primary/10 px-2 py-0.5 rounded-full">
            {product.category}
          </span>
          <div className="flex items-center gap-1 text-xs font-medium text-amber-500">
            <Star className="w-3 h-3 fill-current" />
            <span>{product.rating.rate}</span>
          </div>
        </div>

        <Link href={`/product/${product.id}`} className="block group/title">
          <h3 className="font-semibold text-lg line-clamp-1 group-hover/title:text-primary transition-colors">
            {product.title}
          </h3>
          <p className="text-muted-foreground text-xs font-medium mb-3">{product.brand}</p>
        </Link>

        <div className="flex items-center justify-between mt-auto">
          <div>
            <span className="text-xs text-muted-foreground line-through">$ {(product.price * 1.2).toFixed(2)}</span>
            <p className="text-xl font-bold text-foreground">${product.price}</p>
          </div>
          
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={handleAdd}
            className="bg-primary text-white p-3 rounded-2xl shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all hover:-translate-y-1"
          >
            <Plus className="w-5 h-5" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};
