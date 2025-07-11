import { Music, Phone, Mail, MapPin, Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Music className="h-8 w-8 text-accent" />
              <div>
                <h3 className="font-heading font-bold text-xl">Mustafa Aktaş</h3>
                <p className="text-primary-foreground/80 text-sm">Müzik Aletleri</p>
              </div>
            </div>
            <p className="text-primary-foreground/80 text-sm leading-relaxed">
              25 yılı aşkın deneyimimizle geleneksel Türk müzik aletleri üretimi 
              ve profesyonel müzik hizmetleri sunuyoruz.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-bold text-lg mb-4">Hızlı Erişim</h4>
            <ul className="space-y-2">
              <li>
                <a href="#hero" className="text-primary-foreground/80 hover:text-accent transition-colors duration-300">
                  Ana Sayfa
                </a>
              </li>
              <li>
                <a href="#products" className="text-primary-foreground/80 hover:text-accent transition-colors duration-300">
                  Ürünlerimiz
                </a>
              </li>
              <li>
                <a href="#team" className="text-primary-foreground/80 hover:text-accent transition-colors duration-300">
                  Davul-Zurna Ekibi
                </a>
              </li>
              <li>
                <a href="#about" className="text-primary-foreground/80 hover:text-accent transition-colors duration-300">
                  Hakkımızda
                </a>
              </li>
              <li>
                <a href="#contact" className="text-primary-foreground/80 hover:text-accent transition-colors duration-300">
                  İletişim
                </a>
              </li>
            </ul>
          </div>

          {/* Products */}
          <div>
            <h4 className="font-heading font-bold text-lg mb-4">Ürünlerimiz</h4>
            <ul className="space-y-2">
              <li className="text-primary-foreground/80">Zurna</li>
              <li className="text-primary-foreground/80">Balaban</li>
              <li className="text-primary-foreground/80">Mey</li>
              <li className="text-primary-foreground/80">Özel Sipariş</li>
              <li className="text-primary-foreground/80">Davul-Zurna Hizmetleri</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-heading font-bold text-lg mb-4">İletişim</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-accent flex-shrink-0" />
                <span className="text-primary-foreground/80 text-sm">+90 (555) 123 45 67</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-accent flex-shrink-0" />
                <span className="text-primary-foreground/80 text-sm">info@mustafaaktas.com</span>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="h-4 w-4 text-accent flex-shrink-0 mt-0.5" />
                <span className="text-primary-foreground/80 text-sm">İstanbul, Türkiye
                  <br />
                  
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-primary-foreground/20">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-primary-foreground/60 text-sm">
              © 2024 Mustafa Aktaş Müzik Aletleri. Tüm hakları saklıdır.
            </p>
            <p className="text-primary-foreground/60 text-sm flex items-center gap-1">
              <Heart className="h-4 w-4 text-accent" />
              Geleneksel Türk müziği ile yapılmıştır.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;