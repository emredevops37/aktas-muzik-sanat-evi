
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Phone, Mail, MapPin, Clock, MessageCircle, Send } from "lucide-react";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { useToast } from './ui/use-toast';
import emailjs from '@emailjs/browser';

const formSchema = z.object({
  name: z.string().min(2, 'İsim en az 2 karakter olmalıdır').max(50, 'İsim 50 karakterden fazla olamaz'),
  phone: z.string().min(10, 'Telefon numarası en az 10 haneli olmalıdır').max(15, 'Telefon numarası 15 haneden fazla olamaz'),
  email: z.string().email('Geçerli bir email adresi giriniz'),
  subject: z.string().min(1, 'Konu seçimi zorunludur'),
  message: z.string().min(10, 'Mesaj en az 10 karakter olmalıdır').max(500, 'Mesaj 500 karakterden fazla olamaz'),
});

const Contact = () => {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      phone: '',
      email: '',
      subject: '',
      message: '',
    },
  });

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
      content: "emrkts37@gmail.com",
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

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    // Sanitize values before processing
    const sanitizedValues = {
      name: values.name.trim(),
      phone: values.phone.replace(/[^\d+\-\s]/g, ''),
      email: values.email.trim().toLowerCase(),
      subject: values.subject,
      message: values.message.trim(),
    };
    
    try {
      // EmailJS ile email gönderimi
      const result = await emailjs.send(
        'service_k83tjy8', // EmailJS'den alacağınız Service ID
        'template_s7113j9', // EmailJS'den alacağınız Template ID
        {
          from_name: sanitizedValues.name,
          email: sanitizedValues.email,
          phone: sanitizedValues.phone,
          subject: sanitizedValues.subject,
          message: sanitizedValues.message
          // to_email: 'emrkts37@gmail.com'
        },
        '2MEg4k2QVJUFcqlCh' // EmailJS'den alacağınız Public Key
      );

      console.log('Email sent successfully:', result);
      toast({
        title: "Mesajınız başarıyla gönderildi!",
        description: "En kısa sürede dönüş yapacağız.",
      });
      form.reset();
    } catch (error) {
      console.error('Email sending failed:', error);
      toast({
        title: "Mesaj gönderilemedi!",
        description: "Lütfen daha sonra tekrar deneyin veya telefon ile iletişime geçin.",
        variant: "destructive",
      });
    }
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
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Adınız Soyadınız *</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Adınızı girin"
                            className="px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent transition-colors duration-300"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Telefon Numaranız *</FormLabel>
                        <FormControl>
                          <Input 
                            type="tel" 
                            placeholder="0555 123 45 67"
                            className="px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent transition-colors duration-300"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>E-posta Adresiniz *</FormLabel>
                      <FormControl>
                        <Input 
                          type="email" 
                          placeholder="ornek@email.com"
                          className="px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent transition-colors duration-300"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="subject"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Konu</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent transition-colors duration-300">
                            <SelectValue placeholder="Konu seçin" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Ürün Bilgisi">Ürün Bilgisi</SelectItem>
                          <SelectItem value="Sipariş Vermek İstiyorum">Sipariş Vermek İstiyorum</SelectItem>
                          <SelectItem value="Davul-Zurna Ekibi">Davul-Zurna Ekibi</SelectItem>
                          <SelectItem value="Özel Sipariş">Özel Sipariş</SelectItem>
                          <SelectItem value="Diğer">Diğer</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mesajınız *</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Mesajınızı buraya yazın..."
                          rows={5}
                          className="px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent transition-colors duration-300 resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button 
                  type="submit" 
                  variant="hero" 
                  size="lg" 
                  className="w-full" 
                  disabled={form.formState.isSubmitting}
                >
                  <Send className="mr-2 h-5 w-5" />
                  Mesajı Gönder
                </Button>
              </form>
            </Form>
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
                      "https://www.google.com/maps/place/Havaalan%C4%B1,+34230+Esenler%2F%C4%B0stanbul/@41.0580665,28.8632993,15.75z/data=!4m6!3m5!1s0x14cabaa894f4d6ff:0x21ed7f7d3d0901fa!8m2!3d41.0579!4d28.8696819!16s%2Fg%2F1thbgm7k?entry=ttu&g_ep=EgoyMDI1MDcxNS4xIKXMDSoASAFQAw%3D%3D",
                      "_blank",
                      "noopener,noreferrer"
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
                    window.open("https://wa.me/905336830805", "_blank", "noopener,noreferrer");
                  }}
                >
                  WhatsApp
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-accent-foreground/10 border-accent-foreground/20 text-accent-foreground hover:bg-accent-foreground/20"
                  onClick={() => {
                    window.open("tel:+905336830805");
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

