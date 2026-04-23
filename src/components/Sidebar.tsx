'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Filter, RotateCcw } from 'lucide-react';

const CATEGORIES = ['Electronics', 'Footwear', 'Apparel', 'Accessories', 'Home'];
const BRANDS = ['Velocity', 'AudioTech', 'InnoWatch', 'UrbanWear', 'TravelLog', 'SnapShot', 'Lumina', 'Hide&Seek'];

export const Sidebar = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [selectedCategory, setSelectedCategory] = useState<string | null>(searchParams.get('category'));
  const [priceRange, setPriceRange] = useState<number>(Number(searchParams.get('maxPrice')) || 1000);
  const [selectedBrands, setSelectedBrands] = useState<string[]>(searchParams.get('brands')?.split(',') || []);

  const updateFilters = (newCategory?: string | null, newPrice?: number, newBrands?: string[]) => {
    const params = new URLSearchParams(searchParams.toString());
    
    if (newCategory !== undefined) {
      if (newCategory) params.set('category', newCategory);
      else params.delete('category');
    }
    
    if (newPrice !== undefined) {
      params.set('maxPrice', newPrice.toString());
    }
    
    if (newBrands !== undefined) {
      if (newBrands.length > 0) params.set('brands', newBrands.join(','));
      else params.delete('brands');
    }

    router.push(`/?${params.toString()}`);
  };

  const handleBrandToggle = (brand: string) => {
    const updated = selectedBrands.includes(brand)
      ? selectedBrands.filter(b => b !== brand)
      : [...selectedBrands, brand];
    setSelectedBrands(updated);
    updateFilters(undefined, undefined, updated);
  };

  const resetFilters = () => {
    setSelectedCategory(null);
    setPriceRange(1000);
    setSelectedBrands([]);
    router.push('/');
  };

  return (
    <aside className="space-y-8 sticky top-24 h-fit">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold flex items-center gap-2">
          <Filter className="w-5 h-5 text-primary" />
          Filters
        </h2>
        <button 
          onClick={resetFilters}
          className="text-xs font-medium text-muted-foreground hover:text-primary flex items-center gap-1 transition-colors"
        >
          <RotateCcw className="w-3 h-3" />
          Reset
        </button>
      </div>

      {/* Categories */}
      <div>
        <h3 className="font-semibold mb-4 text-sm uppercase tracking-wider text-muted-foreground">Category</h3>
        <div className="flex flex-col gap-2">
          <button
            onClick={() => { setSelectedCategory(null); updateFilters(null); }}
            className={`text-left px-4 py-2 rounded-xl text-sm font-medium transition-all ${
              !selectedCategory ? 'bg-primary text-white shadow-md shadow-primary/20' : 'hover:bg-secondary'
            }`}
          >
            All Products
          </button>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => { setSelectedCategory(cat); updateFilters(cat); }}
              className={`text-left px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                selectedCategory === cat ? 'bg-primary text-white shadow-md shadow-primary/20' : 'hover:bg-secondary'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground">Max Price</h3>
          <span className="text-primary font-bold">${priceRange}</span>
        </div>
        <input
          type="range"
          min="0"
          max="1000"
          step="10"
          value={priceRange}
          onChange={(e) => {
            const val = parseInt(e.target.value);
            setPriceRange(val);
          }}
          onMouseUp={() => updateFilters(undefined, priceRange)}
          className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary"
        />
        <div className="flex justify-between mt-2 text-[10px] text-muted-foreground font-bold">
          <span>$0</span>
          <span>$1000</span>
        </div>
      </div>

      {/* Brands */}
      <div>
        <h3 className="font-semibold mb-4 text-sm uppercase tracking-wider text-muted-foreground">Brands</h3>
        <div className="grid grid-cols-1 gap-2">
          {BRANDS.map((brand) => (
            <label key={brand} className="flex items-center gap-3 group cursor-pointer">
              <div className="relative flex items-center justify-center">
                <input
                  type="checkbox"
                  className="peer appearance-none w-5 h-5 border-2 border-border rounded-md checked:bg-primary checked:border-primary transition-all"
                  checked={selectedBrands.includes(brand)}
                  onChange={() => handleBrandToggle(brand)}
                />
                <div className="absolute opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none">
                  <svg className="w-3.3 h-3.3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
              <span className="text-sm font-medium group-hover:text-primary transition-colors">
                {brand}
              </span>
            </label>
          ))}
        </div>
      </div>
    </aside>
  );
};
