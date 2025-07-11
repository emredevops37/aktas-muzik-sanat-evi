import { Card } from './ui/card';
import { Button } from './ui/button';
import { Music, Users, Calendar, MapPin, Heart, Trophy, Clock, Star } from 'lucide-react';
import teamImage from '@/assets/davul-zurna-team.jpg';

const TeamServices = () => {
  const services = [
    {
      icon: Heart,
      title: 'Düğün Törenleri',
      description: 'Düğün törenlerinizde geleneksel Türk müziği ile unutulmaz anlar yaşatıyoruz.'
    },
    {
      icon: Users,
      title: 'Kültürel Etkinlikler',
      description: 'Festival, şenlik ve kültürel etkinliklerde profesyonel performans sergiliyoruz.'
    },
    {
      icon: Trophy,
      title: 'Özel Organizasyonlar',
      description: 'Kurumsal etkinlik, doğum günü ve özel günlerinizde sizlerleyiz.'
    },
    {
      icon: MapPin,
      title: 'Her Yere Gidiyoruz',
      description: 'Türkiye\'nin her yerinde hizmet veriyoruz. Ulaşım tamamen bizden.'
    }
  ];

  const features = [
    { icon: Music, text: 'Profesyonel davul ve zurna icracıları' },
    { icon: Clock, text: '7/24 rezervasyon hizmetimiz' },
    { icon: Star, text: '15+ yıllık sahne deneyimi' },
    { icon: Users, text: '3-8 kişilik esnek ekip büyüklüğü' }
  ];

  return (
    <section id="team" className="py-20 bg-gradient-to-br from-muted/30 to-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-copper/10 rounded-full px-4 py-2 mb-6">
            <Music className="h-4 w-4 text-copper" />
            <span className="text-copper font-medium">Profesyonel Hizmet</span>
          </div>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-6">
            Davul-Zurna Ekibimiz
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Düğün, organizasyon ve özel günlerinizde geleneksel Türk müziğinin 
            coşkusunu yaşatmak için profesyonel ekibimizle hizmetinizdeyiz.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Image */}
          <div className="relative group">
            <div className="relative overflow-hidden rounded-2xl shadow-elegant">
              <img
                src={teamImage}
                alt="Davul-Zurna Ekibi Performansı"
                className="w-full h-96 object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent"></div>
              
              {/* Play Button Overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-accent/90 backdrop-blur-sm rounded-full p-6 group-hover:scale-110 transition-transform duration-300 cursor-pointer">
                  <Music className="h-8 w-8 text-accent-foreground" />
                </div>
              </div>
            </div>
            
            {/* Stats Overlay */}
            <div className="absolute -bottom-6 -right-6 bg-card rounded-xl p-4 shadow-warm border border-border">
              <div className="flex items-center gap-2 text-accent mb-1">
                <Trophy className="h-5 w-5" />
                <span className="font-heading text-2xl font-bold">200+</span>
              </div>
              <p className="text-sm text-muted-foreground">Başarılı Etkinlik</p>
            </div>
          </div>

          {/* Content */}
          <div className="space-y-6">
            <div>
              <h3 className="font-heading text-2xl font-bold text-primary mb-4">
                Geleneksel Müziğin Profesyonel Temsilcileri
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Yılların deneyimi ile biriken bilgi birikimimizi, modern organizasyon 
                anlayışımızla harmanlayarak sizlere unutulmaz müzik deneyimi sunuyoruz. 
                Ekibimiz, geleneksel Türk halk müziğinin en güzel örneklerini 
                profesyonelce icra ediyor.
              </p>
            </div>

            {/* Features */}
            <div className="grid grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="bg-accent/10 rounded-lg p-2">
                    <feature.icon className="h-4 w-4 text-accent" />
                  </div>
                  <span className="text-sm text-muted-foreground">{feature.text}</span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="pt-6">
              <Button 
                variant="elegant" 
                size="lg"
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Etkinliğiniz İçin Rezervasyon Yapın
              </Button>
            </div>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <Card key={index} className="group p-6 text-center hover:shadow-warm transition-all duration-300 transform hover:-translate-y-2">
              <div className="bg-gradient-copper rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <service.icon className="h-8 w-8 text-copper-foreground" />
              </div>
              <h4 className="font-heading text-lg font-bold text-primary mb-3">
                {service.title}
              </h4>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {service.description}
              </p>
            </Card>
          ))}
        </div>

        {/* Pricing Info */}
        <div className="mt-16 bg-accent/5 rounded-2xl p-8 border border-accent/20">
          <div className="text-center mb-8">
            <h3 className="font-heading text-2xl font-bold text-primary mb-4">
              Hizmet Paketlerimiz
            </h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Etkinliğinizin büyüklüğüne ve ihtiyaçlarınıza göre esnek paket seçenekleri sunuyoruz.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-card rounded-xl">
              <h4 className="font-heading text-lg font-bold text-primary mb-2">Standart Paket</h4>
              <p className="text-muted-foreground text-sm mb-3">3-4 kişilik ekip</p>
              <div className="text-accent font-heading text-xl font-bold"></div>
            </div>
            <div className="text-center p-6 bg-accent/10 rounded-xl border-2 border-accent/30">
              <h4 className="font-heading text-lg font-bold text-primary mb-2">Premium Paket</h4>
              <p className="text-muted-foreground text-sm mb-3">5-6 kişilik ekip</p>
              <div className="text-accent font-heading text-xl font-bold"></div>
            </div>
            <div className="text-center p-6 bg-card rounded-xl">
              <h4 className="font-heading text-lg font-bold text-primary mb-2">Deluxe Paket</h4>
              <p className="text-muted-foreground text-sm mb-3">7-8 kişilik ekip</p>
              <div className="text-accent font-heading text-xl font-bold"></div>
            </div>
          </div>

          <div className="text-center mt-8">
            <p className="text-muted-foreground text-sm mb-4">
              
            </p>
            <Button 
              variant="hero"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Detaylı Fiyat Teklifi Alın
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamServices;