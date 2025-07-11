import { MessageCircle } from 'lucide-react';
import { Button } from './ui/button';

const WhatsAppButton = () => {
  const handleWhatsAppClick = () => {
    const phoneNumber = "905336830805"; // Telefon numarasını güncelleyin
    const message = "Merhaba, müzik aletleriniz hakkında bilgi almak istiyorum.";
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
      <div className="bg-white/90 backdrop-blur-sm px-3 py-2 rounded-lg shadow-md">
        <p className="text-sm font-medium text-foreground whitespace-nowrap">
          Yardıma ihtiyacınız var mı ?
        </p>
      </div>
      <Button
        onClick={handleWhatsAppClick}
        className="w-14 h-14 rounded-full bg-green-500 hover:bg-green-600 text-white shadow-elegant hover:shadow-glow transition-all duration-300 hover:scale-110"
        size="icon"
        aria-label="WhatsApp ile iletişime geç"
      >
        <MessageCircle className="h-6 w-6" />
      </Button>
    </div>
  );
};

export default WhatsAppButton;