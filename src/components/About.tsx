import { Card } from './ui/card';
import { Hammer, Heart, Award, Users, Clock, Sparkles } from 'lucide-react';

const About = () => {
  const values = [
    {
      icon: Hammer,
      title: 'El İşçiliği',
      description: 'Her alet, ustaca el işçiliği ile özenle üretilir. Makineleşmenin getirdiği soğukluğa karşı, insan elinin sıcaklığını koruyoruz.'
    },
    {
      icon: Heart,
      title: 'Gelenek Sevgisi',
      description: 'Atalarımızdan miras kalan müzik kültürümüzü yaşatmak ve gelecek nesillere aktarmak en büyük sorumluluğumuz.'
    },
    {
      icon: Award,
      title: 'Kalite Odaklı',
      description: 'Sadece en kaliteli malzemeler kullanıyor, her ürünümüzde mükemmeliyeti hedefliyoruz.'
    },
    {
      icon: Users,
      title: 'Müşteri Memnuniyeti',
      description: 'Müşterilerimizin ihtiyaçlarını anlayıp, beklentilerini aşan ürünler sunmaya odaklanıyoruz.'
    }
  ];

  const milestones = [
    { year: '1998', event: 'Mustafa Aktaş tarafından atölyenin kurulması' },
    { year: '2005', event: 'İlk profesyonel müzisyen siparişleri' },
    { year: '2010', event: 'Davul-Zurna ekibinin oluşturulması' },
    { year: '2015', event: '1000+ müzik aleti üretim milestonu' },
    { year: '2020', event: 'Online platformunun kurulması' },
    { year: '2024', event: 'Yeni nesil çırakların yetiştirilmeye başlanması' }
  ];

  return (
    <section id="about" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-primary/10 rounded-full px-4 py-2 mb-6">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-primary font-medium">Hikayemiz</span>
          </div>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-6">
            Hakkımızda
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            25 yılı aşkın süredir geleneksel Türk müzik aletleri üretimi ve 
            müzik hizmetleri konusunda faaliyet gösteriyoruz.
          </p>
        </div>

        {/* Main Story */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          <div className="space-y-6">
            <h3 className="font-heading text-2xl font-bold text-primary">
              Gelenekten Geleceğe
            </h3>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                <strong className="text-primary">Mustafa Aktaş Müzik Aletleri</strong>, 1998 yılında kurulan 
                aile işletmemizde, Türk halk müziğinin vazgeçilmez çalgıları olan 
                zurna, balaban ve mey üretimi konusunda uzmanlaştık.
              </p>
              <p>
                Ustamız Mustafa Aktaş'ın 25 yılı aşkın deneyimi ile başlayan bu yolculuk, 
                bugün geleneksel el işçiliğini modern kalite standartları ile buluşturan 
                bir atölye haline geldi.
              </p>
              <p>
                Sadece müzik aleti üretimi değil, aynı zamanda geleneksel Türk müziğini 
                yaşatmak amacıyla kurduğumuz <strong className="text-primary">Davul-Zurna ekibimiz</strong> ile 
                düğün, organizasyon ve kültürel etkinliklerde hizmet veriyoruz.
              </p>
            </div>
          </div>

          <div className="relative">
            <div className="bg-gradient-accent rounded-2xl p-8 shadow-elegant">
              <h4 className="font-heading text-xl font-bold text-accent-foreground mb-6">
                Neden Bizi Tercih Etmelisiniz?
              </h4>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-accent-foreground rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-accent-foreground">25+ yıllık deneyim ve uzmanlık</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-accent-foreground rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-accent-foreground">%100 el işçiliği ile üretim</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-accent-foreground rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-accent-foreground">Sadece kaliteli doğal malzemeler</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-accent-foreground rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-accent-foreground">Özel sipariş imkanı</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-accent-foreground rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-accent-foreground">Profesyonel müzik hizmetleri</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Values */}
        <div className="mb-20">
          <h3 className="font-heading text-2xl font-bold text-primary text-center mb-12">
            Değerlerimiz
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <Card key={index} className="p-6 text-center group hover:shadow-warm transition-all duration-300 transform hover:-translate-y-2">
                <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors duration-300">
                  <value.icon className="h-8 w-8 text-primary" />
                </div>
                <h4 className="font-heading text-lg font-bold text-primary mb-3">
                  {value.title}
                </h4>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {value.description}
                </p>
              </Card>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div className="bg-muted/30 rounded-2xl p-8">
          <h3 className="font-heading text-2xl font-bold text-primary text-center mb-12">
            Yolculuğumuz
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {milestones.map((milestone, index) => (
              <div key={index} className="relative">
                <div className="bg-card rounded-xl p-6 shadow-sm border border-border hover:shadow-warm transition-shadow duration-300">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="bg-accent text-accent-foreground rounded-full px-3 py-1 text-sm font-bold">
                      {milestone.year}
                    </div>
                    <Clock className="h-4 w-4 text-accent" />
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {milestone.event}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;