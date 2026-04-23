import Link from 'next/link';
import { Globe, Mail, Gift, Smile } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-secondary/30 border-t border-border mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="text-xl font-bold tracking-tighter flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white rotate-12 shadow-sm">
                G
              </div>
              <span>GravityShop</span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Experience the best in modern e-commerce. Premium products, seamless experience, and dedicated support.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Shop</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/" className="hover:text-primary transition-colors">All Products</Link></li>
              <li><Link href="/?category=Electronics" className="hover:text-primary transition-colors">Electronics</Link></li>
              <li><Link href="/?category=Apparel" className="hover:text-primary transition-colors">Apparel</Link></li>
              <li><Link href="/?category=Home" className="hover:text-primary transition-colors">Home & Living</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/about" className="hover:text-primary transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
              <li><Link href="/terms" className="hover:text-primary transition-colors">Terms of Service</Link></li>
              <li><Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Socials */}
          <div>
            <h3 className="font-semibold mb-4">Connect With Us</h3>
            <div className="flex items-center gap-4">
              <Link href="#" className="p-2 bg-background rounded-full hover:bg-primary hover:text-white transition-all shadow-sm">
                <Globe className="w-4 h-4" />
              </Link>
              <Link href="#" className="p-2 bg-background rounded-full hover:bg-primary hover:text-white transition-all shadow-sm">
                <Mail className="w-4 h-4" />
              </Link>
              <Link href="#" className="p-2 bg-background rounded-full hover:bg-primary hover:text-white transition-all shadow-sm">
                <Smile className="w-4 h-4" />
              </Link>
              <Link href="#" className="p-2 bg-background rounded-full hover:bg-primary hover:text-white transition-all shadow-sm">
                <Gift className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-12 pt-8 flex flex-col md:row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} GravityShop. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/2560px-Visa_Inc._logo.svg.png" alt="Visa" className="h-4 opacity-50 grayscale hover:grayscale-0 transition-all" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/1280px-Mastercard-logo.svg.png" alt="Mastercard" className="h-6 opacity-50 grayscale hover:grayscale-0 transition-all" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/PayPal.svg/1200px-PayPal.svg.png" alt="PayPal" className="h-4 opacity-50 grayscale hover:grayscale-0 transition-all" />
          </div>
        </div>
      </div>
    </footer>
  );
};
