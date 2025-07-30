import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Star, Award, Sparkles } from 'lucide-react';
import Gallery from './Gallery';
import zurnaImage from '@/assets/zurna-product.jpg';
import balabanImage from '@/assets/balaban-product.jpg';
import meyImage from '@/assets/mey-product.jpg';
import zurnaGallery1 from '@/assets/zurna-gallery-1.jpg';
import zurnaGallery2 from '@/assets/zurna-gallery-2.jpg';
import zurnaGallery3 from '@/assets/zurna-gallery-3.jpg';
import zurnaGallery4 from '@/assets/zurna-gallery-4.jpg';
import balabanGallery1 from '@/assets/balaban-gallery-1.jpg';
import balabanGallery2 from '@/assets/balaban-gallery-2.jpg';
import balabanGallery3 from '@/assets/balaban-gallery-3.jpg';
import meyGallery1 from '@/assets/mey-gallery-1.jpg';
import meyGallery2 from '@/assets/mey-gallery-2.jpg';
import meyGallery3 from '@/assets/mey-gallery-3.jpg';

const Products = () => {
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [selectedInstrument, setSelectedInstrument] = useState<string>('');

  const zurnaGalleryImages = [
    { src: zurnaGallery1, title: "Zurna Takım", description: "Sol, Sol Diyez, La, Si, Do" },
    { src: zurnaGallery2, title: "Zurna Çeşitlerimiz (La zurna)", description: "Farklı boyut ve ahşap türlerinde zurna koleksiyonumuz" },
    { src: zurnaGallery3, title: "Üretim Süreci", description: "Usta ellerde şekillenen zurna yapım aşaması (Sol zurna)" },
    { src: zurnaGallery4, title: "Profesyonel Zurna", description: "Kamış detayı ile profesyonel kalitede zurna (Sol Diyez)" }
  ];

  const balabanGalleryImages = [
    { src: balabanGallery1, title: "Balaban Detay", description: "Geleneksel Azerbaycan balaban çalgısı" },
    { src: balabanGallery2, title: "Balaban Koleksiyonu", description: "Farklı türlerde balaban çeşitlerimiz" },
    { src: balabanGallery3, title: "Profesyonel Balaban", description: "Komple balaban seti" }
  ];

  const meyGalleryImages = [
    { src: meyGallery1, title: "Mey Çalgısı", description: "Orta Asya kökenli geleneksel mey" },
    { src: meyGallery2, title: "Mey Çeşitleri", description: "Değişik boyutlarda mey koleksiyonumuz" },
    { src: meyGallery3, title: "Mey Üretimi", description: "Geleneksel yöntemlerle mey yapım süreci" }
  ];

  const handleImageClick = (instrumentName: string) => {
    setSelectedInstrument(instrumentName);
    setGalleryOpen(true);
  };

  const instruments = [
    {
      id: 1,
      name: 'Zurna',
      description: 'Geleneksel Türk halk müziğinin vazgeçilmez nefesli çalgısı. El işçiliği ile özenle işlenmiş ahşap gövde ve kaliteli kamış ile üretilmektedir.',
      features: [
        'El işçiliği ahşap gövde',
        'Kaliteli doğal',
        'Geleneksel boyama teknikleri',
        'Uzun ömürlü kullanım'
      ],
      price: '',
      image: zurnaImage
    },
    {
      id: 2,
      name: 'Balaban',
      description: 'Azerbaycan ve Türk müzik kültürünün önemli çalgılarından biri. Derin ve melodik sesi ile dinleyicileri büyüler.',
      features: [
        'Özel seçilmiş ahşap',
        'Profesyonel kamış sistemi',
        'Ergonomik tutuş tasarımı',
        'Zengin ton kalitesi'
      ],
      price: '',
      image: balabanImage
    },
    {
      id: 3,
      name: 'Mey',
      description: 'Orta Asya kökenli bu güzel çalgı, sıcak ve duygusal tınısı ile halk müziğimizin vazgeçilmez parçasıdır.',
      features: [
        'Geleneksel el işçiliği',
        'Doğal malzemeler',
        'Özel tuning sistemi',
        'Ürün çeşitliliği'
      ],
      price: '',
      image: meyImage
    }
  ];

  return (
    <section id="products" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-accent/10 rounded-full px-4 py-2 mb-6">
            <Sparkles className="h-4 w-4 text-accent" />
            <span className="text-accent font-medium">El İşçiliği Ürünlerimiz</span>
          </div>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-6">
            Geleneksel Müzik Aletlerimiz
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Yılların deneyimi ve ustaca el işçiliği ile ürettiğimiz zurna, balaban ve mey 
            aletlerimiz, geleneksel Türk müziğinin en kaliteli temsilcileridir.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {instruments.map((instrument) => (
            <Card key={instrument.id} className="group overflow-hidden bg-card hover:shadow-elegant transition-all duration-500 transform hover:scale-105">
              {/* Image */}
              <div className="relative overflow-hidden h-64">
                <div 
                  className="cursor-pointer h-full"
                  onClick={() => handleImageClick(instrument.name)}
                >
                  <img
                    src={instrument.image}
                    alt={instrument.name}
                    className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                
                {/* Quality Badge */}
                <div className="absolute top-4 right-4 bg-accent/90 backdrop-blur-sm rounded-full p-2">
                  <Award className="h-4 w-4 text-accent-foreground" />
                </div>
                
                {/* Galeri Butonu - Alt kısımda sabit */}
                <div 
                  className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-primary/40 to-primary/20 backdrop-blur-sm cursor-pointer transition-all duration-300 hover:from-primary/70 hover:to-primary/50"
                  onClick={() => handleImageClick(instrument.name)}
                >
                  <div className="flex items-center justify-center gap-2 py-3">
                    <Sparkles className="h-4 w-4 text-primary-foreground" />
                    <span className="text-primary-foreground text-sm font-medium">Galeriye Git</span>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-heading text-2xl font-bold text-primary">
                    {instrument.name}
                  </h3>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                    ))}
                  </div>
                </div>

                <p className="text-muted-foreground leading-relaxed">
                  {instrument.description}
                </p>

                {/* Features */}
                <div className="space-y-2">
                  <h4 className="font-semibold text-primary">Özellikler:</h4>
                  <ul className="space-y-1">
                    {instrument.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <div className="w-1.5 h-1.5 bg-accent rounded-full"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Price and CTA */}
                <div className="pt-4 border-t border-border">
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-heading text-xl font-bold text-accent">
                      {instrument.price}
                    </span>
                  </div>
                  <Button 
                    className="w-full" 
                    variant="elegant"
                    onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                  >
                    Bilgi Al & Sipariş Ver
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-16 text-center bg-muted rounded-2xl p-8">
          <h3 className="font-heading text-2xl font-bold text-primary mb-4">
            Özel Sipariş İmkanı
          </h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            İstediğiniz ölçü, renk ve özel tasarımda müzik aleti üretimi yapıyoruz. 
            Profesyonel müzisyenler için özelleştirilmiş çözümler sunuyoruz.
          </p>
          <Button 
            variant="hero" 
            size="lg"
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Özel Sipariş İçin İletişime Geçin
          </Button>
        </div>
      </div>

      {/* Gallery Modal */}
      <Gallery
        isOpen={galleryOpen}
        onClose={() => setGalleryOpen(false)}
        title={selectedInstrument}
        images={
          selectedInstrument === 'Zurna' ? zurnaGalleryImages :
          selectedInstrument === 'Balaban' ? balabanGalleryImages :
          selectedInstrument === 'Mey' ? meyGalleryImages : []
        }
      />
    </section>
  );
};

export default Products;