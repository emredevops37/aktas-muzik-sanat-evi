import { Button } from './ui/button';
import { ArrowDown, Star, Award, Users } from 'lucide-react';
import heroImage from '@/assets/hero-turkish-instruments.jpg';

const Hero = () => {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Geleneksel Türk müzik aletleri"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/80 via-primary/60 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center lg:text-left">
        <div className="lg:grid lg:grid-cols-2 lg:gap-12 items-center">
          <div className="space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-accent/20 backdrop-blur-sm border border-accent/30 rounded-full px-4 py-2 text-accent-foreground">
              <Star className="h-4 w-4 text-accent" />
              <span className="text-sm font-medium">El İşçiliği ile Üretim</span>
            </div>

            {/* Main Title */}
            <div>
              <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground leading-tight">
                <span className="block">Mustafa Aktaş</span>
                <span className="block text-accent-glow">Müzik Aletleri</span>
              </h1>
              <p className="mt-6 text-lg md:text-xl text-primary-foreground/90 leading-relaxed max-w-2xl">
                Geleneksel Türk müzik kültürünün vazgeçilmez aletleri Zurna, Balaban ve Mey'i 
                ustaca el işçiliği ile üretiyoruz. Ayrıca düğün ve organizasyonlarınız için 
                profesyonel Davul-Zurna ekibimizle hizmetinizdeyiz.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-6">
              <div className="text-center lg:text-left">
                <div className="flex items-center justify-center lg:justify-start gap-2 text-accent-glow mb-2">
                  <Award className="h-5 w-5" />
                  <span className="font-heading text-2xl font-bold">25+</span>
                </div>
                <p className="text-sm text-primary-foreground/80">Yıllık Deneyim</p>
              </div>
              <div className="text-center lg:text-left">
                <div className="flex items-center justify-center lg:justify-start gap-2 text-accent-glow mb-2">
                  <Star className="h-5 w-5" />
                  <span className="font-heading text-2xl font-bold">1000+</span>
                </div>
                <p className="text-sm text-primary-foreground/80">Üretilen Alet</p>
              </div>
              <div className="text-center lg:text-left">
                <div className="flex items-center justify-center lg:justify-start gap-2 text-accent-glow mb-2">
                  <Users className="h-5 w-5" />
                  <span className="font-heading text-2xl font-bold">500+</span>
                </div>
                <p className="text-sm text-primary-foreground/80">Mutlu Müşteri</p>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <Button
                variant="hero"
                size="xl"
                onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Ürünlerimizi İnceleyin
              </Button>
              <Button
                variant="outline"
                size="xl"
                className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              >
                İletişime Geçin
              </Button>
            </div>
          </div>

          {/* Right side - could be used for additional content */}
          <div className="hidden lg:block"></div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <button
          onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}
          className="animate-bounce p-2 rounded-full bg-accent/20 backdrop-blur-sm border border-accent/30 text-accent hover:bg-accent/30 transition-colors duration-300"
          aria-label="Aşağı kaydır"
        >
          <ArrowDown className="h-6 w-6" />
        </button>
      </div>
    </section>
  );
};

export default Hero;