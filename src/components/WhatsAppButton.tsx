import { MessageCircle } from 'lucide-react';
import { Button } from './ui/button';

const WhatsAppButton = () => {
  const handleWhatsAppClick = () => {
    const phoneNumber = "905551234567"; // Telefon numarasını güncelleyin
    const message = "Merhaba, müzik aletleriniz hakkında bilgi almak istiyorum.";
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <Button
      onClick={handleWhatsAppClick}
      className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-green-500 hover:bg-green-600 text-white shadow-elegant hover:shadow-glow transition-all duration-300 hover:scale-110"
      size="icon"
      aria-label="WhatsApp ile iletişime geç"
    >
      <MessageCircle className="h-6 w-6" />
    </Button>
  );
};

export default WhatsAppButton;