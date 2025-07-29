import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Plus, Trash2, Upload, Image as ImageIcon } from 'lucide-react';

interface Product {
  id: string;
  name: string;
}

interface ProductImage {
  id: string;
  product_id: string;
  image_url: string;
  title: string;
  description: string;
  is_main: boolean;
  created_at: string;
}

const ImagesAdmin = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [images, setImages] = useState<ProductImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<string>('');
  const [newImage, setNewImage] = useState({
    title: '',
    description: '',
    is_main: false
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Fetch products
      const { data: productsData, error: productsError } = await supabase
        .from('products')
        .select('id, name')
        .order('name');

      if (productsError) throw productsError;
      setProducts(productsData || []);

      // Fetch images
      const { data: imagesData, error: imagesError } = await supabase
        .from('product_images')
        .select('*')
        .order('created_at', { ascending: false });

      if (imagesError) throw imagesError;
      setImages(imagesData || []);
    } catch (error: any) {
      toast({
        title: "Hata",
        description: "Veriler yüklenirken hata oluştu: " + error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.type.startsWith('image/')) {
        setSelectedFile(file);
      } else {
        toast({
          title: "Hata",
          description: "Lütfen geçerli bir resim dosyası seçin.",
          variant: "destructive",
        });
      }
    }
  };

  const handleUploadImage = async () => {
    if (!selectedFile || !selectedProductId) {
      toast({
        title: "Hata",
        description: "Lütfen dosya ve ürün seçin.",
        variant: "destructive",
      });
      return;
    }

    setUploading(true);

    try {
      // Upload to Supabase Storage
      const fileExt = selectedFile.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `products/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('products')
        .upload(filePath, selectedFile);

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('products')
        .getPublicUrl(filePath);

      // Save to database
      const { error: dbError } = await supabase
        .from('product_images')
        .insert([{
          product_id: selectedProductId,
          image_url: publicUrl,
          title: newImage.title,
          description: newImage.description,
          is_main: newImage.is_main
        }]);

      if (dbError) throw dbError;

      toast({
        title: "Başarılı",
        description: "Resim başarıyla yüklendi.",
      });

      // Reset form
      setSelectedFile(null);
      setNewImage({ title: '', description: '', is_main: false });
      setSelectedProductId('');
      
      // Reset file input
      const fileInput = document.getElementById('image-file') as HTMLInputElement;
      if (fileInput) fileInput.value = '';

      fetchData();
    } catch (error: any) {
      toast({
        title: "Hata",
        description: "Resim yüklenirken hata oluştu: " + error.message,
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  const handleDeleteImage = async (image: ProductImage) => {
    if (!confirm('Bu resmi silmek istediğinizden emin misiniz?')) return;

    try {
      // Delete from database
      const { error: dbError } = await supabase
        .from('product_images')
        .delete()
        .eq('id', image.id);

      if (dbError) throw dbError;

      // Delete from storage if it's a uploaded file (contains products/ path)
      if (image.image_url.includes('products/')) {
        const fileName = image.image_url.split('/').pop();
        if (fileName) {
          const { error: storageError } = await supabase.storage
            .from('products')
            .remove([`products/${fileName}`]);
          
          if (storageError) {
            console.warn('Storage delete error:', storageError);
          }
        }
      }

      toast({
        title: "Başarılı",
        description: "Resim başarıyla silindi.",
      });

      fetchData();
    } catch (error: any) {
      toast({
        title: "Hata",
        description: "Resim silinirken hata oluştu: " + error.message,
        variant: "destructive",
      });
    }
  };

  const getProductName = (productId: string) => {
    const product = products.find(p => p.id === productId);
    return product?.name || 'Bilinmeyen Ürün';
  };

  if (loading) {
    return <div className="text-center">Resimler yükleniyor...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Fotoğraf Yönetimi</h2>
      </div>

      {/* Upload Form */}
      <Card>
        <CardHeader>
          <CardTitle>Yeni Fotoğraf Yükle</CardTitle>
          <CardDescription>
            Ürünleriniz için yeni fotoğraflar ekleyin
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="product-select">Ürün Seç</Label>
            <Select value={selectedProductId} onValueChange={setSelectedProductId}>
              <SelectTrigger>
                <SelectValue placeholder="Ürün seçin" />
              </SelectTrigger>
              <SelectContent>
                {products.map((product) => (
                  <SelectItem key={product.id} value={product.id}>
                    {product.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="image-file">Resim Dosyası</Label>
            <Input
              id="image-file"
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
            />
            {selectedFile && (
              <p className="text-sm text-muted-foreground mt-1">
                Seçilen dosya: {selectedFile.name}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="image-title">Resim Başlığı</Label>
            <Input
              id="image-title"
              value={newImage.title}
              onChange={(e) => setNewImage(prev => ({ ...prev, title: e.target.value }))}
              placeholder="Resim başlığını girin"
            />
          </div>

          <div>
            <Label htmlFor="image-description">Resim Açıklaması</Label>
            <Textarea
              id="image-description"
              value={newImage.description}
              onChange={(e) => setNewImage(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Resim açıklamasını girin"
              rows={2}
            />
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="is-main"
              checked={newImage.is_main}
              onChange={(e) => setNewImage(prev => ({ ...prev, is_main: e.target.checked }))}
              className="rounded border-gray-300"
            />
            <Label htmlFor="is-main">Ana resim olarak ayarla</Label>
          </div>

          <Button 
            onClick={handleUploadImage} 
            disabled={uploading || !selectedFile || !selectedProductId}
          >
            {uploading ? (
              <>
                <Upload className="h-4 w-4 mr-2 animate-spin" />
                Yükleniyor...
              </>
            ) : (
              <>
                <Upload className="h-4 w-4 mr-2" />
                Resmi Yükle
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Images Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {images.map((image) => (
          <Card key={image.id} className="overflow-hidden">
            <div className="aspect-square relative bg-muted">
              {image.image_url.startsWith('/src/') ? (
                <div className="w-full h-full flex items-center justify-center">
                  <ImageIcon className="h-16 w-16 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground ml-2">Static Asset</p>
                </div>
              ) : (
                <img
                  src={image.image_url}
                  alt={image.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    target.nextElementSibling?.classList.remove('hidden');
                  }}
                />
              )}
              <div className="hidden w-full h-full flex items-center justify-center">
                <ImageIcon className="h-16 w-16 text-muted-foreground" />
              </div>
              {image.is_main && (
                <div className="absolute top-2 right-2 bg-primary text-primary-foreground text-xs px-2 py-1 rounded">
                  Ana Resim
                </div>
              )}
            </div>
            <CardContent className="p-4">
              <h3 className="font-semibold">{image.title}</h3>
              <p className="text-sm text-muted-foreground mb-2">{image.description}</p>
              <p className="text-xs text-muted-foreground mb-3">
                Ürün: {getProductName(image.product_id)}
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleDeleteImage(image)}
                className="w-full"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Sil
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {images.length === 0 && (
        <Card>
          <CardContent className="text-center py-8">
            <ImageIcon className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">Henüz fotoğraf eklenmemiş</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ImagesAdmin;