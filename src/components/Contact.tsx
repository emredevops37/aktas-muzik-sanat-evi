
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Phone, Mail, MapPin, Clock, MessageCircle, Send } from "lucide-react";

const Contact = () => {
  const contactInfo = [
    {
      icon: Phone,
      title: "Telefon",
      content: "‪+90 (533) 683 08 05‬",
      subtitle: "Hemen arayın, uzman ekibimizle konuşun",
    },
    {
      icon: Mail,
      title: "E-posta",
      content: "info@mustafaaktas.com",
      subtitle: "Detaylı bilgi için e-posta gönderin",
    },
    {
      icon: MapPin,
      title: "Adres",
      content: "",
      subtitle: "İstanbul, Türkiye",
    },
    {
      icon: Clock,
      title: "Çalışma Saatleri",
      content: "Pazartesi - Cumartesi: 09:00 - 18:00",
      subtitle: "Pazar günü randevulu çalışıyoruz",
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form submission logic here
    alert(
      "Mesajınız başarıyla gönderildi! En kısa sürede sizinle iletişime geçeceğiz."
    );
  };

  return (
    <section
      id="contact"
      className="py-20 bg-gradient-to-br from-muted/20 to-background"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-accent/10 rounded-full px-4 py-2 mb-6">
            <MessageCircle className="h-4 w-4 text-accent" />
            <span className="text-accent font-medium">İletişim</span>
          </div>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-6">
            Bizimle İletişime Geçin
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Ürünlerimiz, hizmetlerimiz veya özel siparişleriniz hakkında bilgi
            almak için bizimle iletişime geçmekten çekinmeyin.
          </p>
        </div>

        {/* Contact Info Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {contactInfo.map((info, index) => (
            <Card
              key={index}
              className="p-6 text-center group hover:shadow-warm transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="bg-gradient-copper rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <info.icon className="h-8 w-8 text-copper-foreground" />
              </div>
              <h3 className="font-heading text-lg font-bold text-primary mb-2">
                {info.title}
              </h3>
              <p className="text-primary font-semibold mb-1">{info.content}</p>
              <p className="text-muted-foreground text-sm">{info.subtitle}</p>
            </Card>
          ))}
        </div>

        {/* Contact Form and Map */}
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card className="p-8">
            <h3 className="font-heading text-2xl font-bold text-primary mb-6">
              Mesaj Gönderin
            </h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-primary mb-2"
                  >
                    Adınız Soyadınız *
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent transition-colors duration-300 bg-background"
                    placeholder="Adınızı girin"
                  />
                </div>
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-primary mb-2"
                  >
                    Telefon Numaranız *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    required
                    className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent transition-colors duration-300 bg-background"
                    placeholder="0555 123 45 67"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-primary mb-2"
                >
                  E-posta Adresiniz *
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent transition-colors duration-300 bg-background"
                  placeholder="ornek@email.com"
                />
              </div>

              <div>
                <label
                  htmlFor="subject"
                  className="block text-sm font-medium text-primary mb-2"
                >
                  Konu
                </label>
                <select
                  id="subject"
                  className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent transition-colors duration-300 bg-background"
                >
                  <option value="">Konu seçin</option>
                  <option value="product">Ürün Bilgisi</option>
                  <option value="order">Sipariş Vermek İstiyorum</option>
                  <option value="team">Davul-Zurna Ekibi</option>
                  <option value="custom">Özel Sipariş</option>
                  <option value="other">Diğer</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-primary mb-2"
                >
                  Mesajınız *
                </label>
                <textarea
                  id="message"
                  required
                  rows={5}
                  className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent transition-colors duration-300 bg-background resize-none"
                  placeholder="Mesajınızı buraya yazın..."
                ></textarea>
              </div>

              <Button type="submit" variant="hero" size="lg" className="w-full">
                <Send className="mr-2 h-5 w-5" />
                Mesajı Gönder
              </Button>
            </form>
          </Card>

          {/* Map and Additional Info */}
          <div className="space-y-6">
            {/* Map Placeholder */}
            <Card className="p-8 h-80 flex items-center justify-center bg-muted/30">
              <div className="text-center">
                <MapPin className="h-12 w-12 text-accent mx-auto mb-4" />
                <h4 className="font-heading text-lg font-bold text-primary mb-2">
                  Atölyemizi Ziyaret Edin
                </h4>
                <p className="text-muted-foreground text-sm">
                  İstanbul, Türkiye
                  <br />
                  
                </p>
                <Button
                  variant="outline"
                  className="mt-4"
                  onClick={() => {
                    window.open(
                      "https://www.google.com/maps/place/Maltepe%2F%C4%B0stanbul/@40.9505179,29.1041687,15z/data=!4m6!3m5!1s0x14cac4336e39827f:0x608e0ae971e8ddc2!8m2!3d40.9498022!4d29.1739513!16zL20vMDV5cF81?entry=ttu&g_ep=EgoyMDI1MDcwNy4wIKXMDSoASAFQAw%3D%3D",
                      "_blank"
                    );
                  }}
                >
                  Haritada Göster
                </Button>
              </div>
            </Card>

            {/* Quick Contact */}
            <Card className="p-6 bg-gradient-accent">
              <h4 className="font-heading text-lg font-bold text-accent-foreground mb-4">
                Hızlı İletişim
              </h4>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-accent-foreground" />
                  <span className="text-accent-foreground">
                    Telefon : 0533 683 08 05
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <MessageCircle className="h-5 w-5 text-accent-foreground" />
                  <span className="text-accent-foreground">
                    WhatsApp: +90 (533) 683 08 05
                  </span>
                </div>
              </div>
              <div className="flex gap-3 mt-6">
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-accent-foreground/10 border-accent-foreground/20 text-accent-foreground hover:bg-accent-foreground/20"
                  onClick={() => {
                    window.open("https://wa.me/905551234567", "_blank");
                  }}
                >
                  WhatsApp
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-accent-foreground/10 border-accent-foreground/20 text-accent-foreground hover:bg-accent-foreground/20"
                  onClick={() => {
                    window.open("tel:+905551234567", "_blank");
                  }}
                >
                  Ara
                </Button>
              </div>
            </Card>

            {/* FAQ */}
            <Card className="p-6">
              <h4 className="font-heading text-lg font-bold text-primary mb-4">
                Sık Sorulan Sorular
              </h4>
              <div className="space-y-3 text-sm">
                <div>
                  <strong className="text-primary">
                    Sipariş süresi ne kadar?
                  </strong>
                  <p className="text-muted-foreground">
                    Standart ürünler için 2-3 hafta, özel siparişler için 4-6
                    hafta.
                  </p>
                </div>
                <div>
                  <strong className="text-primary">Kargo ücreti var mı?</strong>
                  <p className="text-muted-foreground">
                    Türkiye genelinde ücretsiz kargo hizmeti veriyoruz.
                  </p>
                </div>
                <div>
                  <strong className="text-primary">
                    Davul-Zurna ekibi hangi illere gidiyor?
                  </strong>
                  <p className="text-muted-foreground">
                    Türkiye'nin her yerinde hizmet veriyoruz.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;

