import { Card } from './ui/card';
import { Button } from './ui/button';
import { Star, Award, Sparkles } from 'lucide-react';
import zurnaImage from '@/assets/zurna-product.jpg';
import balabanImage from '@/assets/balaban-product.jpg';
import meyImage from '@/assets/mey-product.jpg';

const Products = () => {
  const instruments = [
    {
      id: 1,
      name: 'Zurna',
      description: 'Geleneksel Türk halk müziğinin vazgeçilmez nefesli çalgısı. El işçiliği ile özenle işlenmiş ahşap gövde ve kaliteli kamış ile üretilmektedir.',
      features: [
        'El işçiliği ahşap gövde',
        'Kaliteli doğal kamış',
        'Geleneksel boyama teknikleri',
        'Uzun ömürlü kullanım'
      ],
      price: '1.500 - 3.000 TL',
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
      price: '2.000 - 4.000 TL',
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
        'Taşıma çantası dahil'
      ],
      price: '1.800 - 3.500 TL',
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
                <img
                  src={instrument.image}
                  alt={instrument.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Quality Badge */}
                <div className="absolute top-4 right-4 bg-accent/90 backdrop-blur-sm rounded-full p-2">
                  <Award className="h-4 w-4 text-accent-foreground" />
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
    </section>
  );
};

export default Products;