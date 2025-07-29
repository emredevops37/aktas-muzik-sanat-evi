import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Plus, Edit, Trash2, Save, X } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  description: string;
  features: string[];
  price: string;
  created_at: string;
}

const ProductsAdmin = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    features: [''],
    price: ''
  });
  const [showAddForm, setShowAddForm] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('name');

      if (error) throw error;
      setProducts(data || []);
    } catch (error: any) {
      toast({
        title: "Hata",
        description: "Ürünler yüklenirken hata oluştu: " + error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAddProduct = async () => {
    try {
      const { error } = await supabase
        .from('products')
        .insert([{
          name: newProduct.name,
          description: newProduct.description,
          features: newProduct.features.filter(f => f.trim() !== ''),
          price: newProduct.price
        }]);

      if (error) throw error;

      toast({
        title: "Başarılı",
        description: "Ürün başarıyla eklendi.",
      });

      setNewProduct({ name: '', description: '', features: [''], price: '' });
      setShowAddForm(false);
      fetchProducts();
    } catch (error: any) {
      toast({
        title: "Hata",
        description: "Ürün eklenirken hata oluştu: " + error.message,
        variant: "destructive",
      });
    }
  };

  const handleUpdateProduct = async () => {
    if (!editingProduct) return;

    try {
      const { error } = await supabase
        .from('products')
        .update({
          name: editingProduct.name,
          description: editingProduct.description,
          features: editingProduct.features.filter(f => f.trim() !== ''),
          price: editingProduct.price
        })
        .eq('id', editingProduct.id);

      if (error) throw error;

      toast({
        title: "Başarılı",
        description: "Ürün başarıyla güncellendi.",
      });

      setEditingProduct(null);
      fetchProducts();
    } catch (error: any) {
      toast({
        title: "Hata",
        description: "Ürün güncellenirken hata oluştu: " + error.message,
        variant: "destructive",
      });
    }
  };

  const handleDeleteProduct = async (id: string) => {
    if (!confirm('Bu ürünü silmek istediğinizden emin misiniz?')) return;

    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Başarılı",
        description: "Ürün başarıyla silindi.",
      });

      fetchProducts();
    } catch (error: any) {
      toast({
        title: "Hata",
        description: "Ürün silinirken hata oluştu: " + error.message,
        variant: "destructive",
      });
    }
  };

  const addFeatureField = (isNewProduct = false) => {
    if (isNewProduct) {
      setNewProduct(prev => ({
        ...prev,
        features: [...prev.features, '']
      }));
    } else if (editingProduct) {
      setEditingProduct(prev => prev ? ({
        ...prev,
        features: [...prev.features, '']
      }) : null);
    }
  };

  const updateFeature = (index: number, value: string, isNewProduct = false) => {
    if (isNewProduct) {
      setNewProduct(prev => ({
        ...prev,
        features: prev.features.map((f, i) => i === index ? value : f)
      }));
    } else if (editingProduct) {
      setEditingProduct(prev => prev ? ({
        ...prev,
        features: prev.features.map((f, i) => i === index ? value : f)
      }) : null);
    }
  };

  const removeFeature = (index: number, isNewProduct = false) => {
    if (isNewProduct) {
      setNewProduct(prev => ({
        ...prev,
        features: prev.features.filter((_, i) => i !== index)
      }));
    } else if (editingProduct) {
      setEditingProduct(prev => prev ? ({
        ...prev,
        features: prev.features.filter((_, i) => i !== index)
      }) : null);
    }
  };

  if (loading) {
    return <div className="text-center">Ürünler yükleniyor...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Ürün Yönetimi</h2>
        <Button onClick={() => setShowAddForm(true)} disabled={showAddForm}>
          <Plus className="h-4 w-4 mr-2" />
          Yeni Ürün Ekle
        </Button>
      </div>

      {/* Add Product Form */}
      {showAddForm && (
        <Card>
          <CardHeader>
            <CardTitle>Yeni Ürün Ekle</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="new-name">Ürün Adı</Label>
              <Input
                id="new-name"
                value={newProduct.name}
                onChange={(e) => setNewProduct(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Ürün adını girin"
              />
            </div>
            <div>
              <Label htmlFor="new-description">Açıklama</Label>
              <Textarea
                id="new-description"
                value={newProduct.description}
                onChange={(e) => setNewProduct(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Ürün açıklamasını girin"
                rows={3}
              />
            </div>
            <div>
              <Label>Özellikler</Label>
              {newProduct.features.map((feature, index) => (
                <div key={index} className="flex gap-2 mt-2">
                  <Input
                    value={feature}
                    onChange={(e) => updateFeature(index, e.target.value, true)}
                    placeholder="Özellik girin"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => removeFeature(index, true)}
                    disabled={newProduct.features.length <= 1}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => addFeatureField(true)}
                className="mt-2"
              >
                <Plus className="h-4 w-4 mr-2" />
                Özellik Ekle
              </Button>
            </div>
            <div>
              <Label htmlFor="new-price">Fiyat</Label>
              <Input
                id="new-price"
                value={newProduct.price}
                onChange={(e) => setNewProduct(prev => ({ ...prev, price: e.target.value }))}
                placeholder="Fiyat bilgisi (opsiyonel)"
              />
            </div>
            <div className="flex gap-2">
              <Button onClick={handleAddProduct}>
                <Save className="h-4 w-4 mr-2" />
                Kaydet
              </Button>
              <Button variant="outline" onClick={() => setShowAddForm(false)}>
                <X className="h-4 w-4 mr-2" />
                İptal
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Products List */}
      <div className="grid gap-6">
        {products.map((product) => (
          <Card key={product.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                {editingProduct?.id === product.id ? (
                  <div className="flex-1 space-y-4">
                    <Input
                      value={editingProduct.name}
                      onChange={(e) => setEditingProduct(prev => prev ? ({ ...prev, name: e.target.value }) : null)}
                      className="text-xl font-bold"
                    />
                    <Textarea
                      value={editingProduct.description}
                      onChange={(e) => setEditingProduct(prev => prev ? ({ ...prev, description: e.target.value }) : null)}
                      rows={3}
                    />
                    <div>
                      <Label>Özellikler</Label>
                      {editingProduct.features.map((feature, index) => (
                        <div key={index} className="flex gap-2 mt-2">
                          <Input
                            value={feature}
                            onChange={(e) => updateFeature(index, e.target.value)}
                            placeholder="Özellik girin"
                          />
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => removeFeature(index)}
                            disabled={editingProduct.features.length <= 1}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => addFeatureField()}
                        className="mt-2"
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Özellik Ekle
                      </Button>
                    </div>
                    <Input
                      value={editingProduct.price}
                      onChange={(e) => setEditingProduct(prev => prev ? ({ ...prev, price: e.target.value }) : null)}
                      placeholder="Fiyat bilgisi"
                    />
                    <div className="flex gap-2">
                      <Button onClick={handleUpdateProduct}>
                        <Save className="h-4 w-4 mr-2" />
                        Kaydet
                      </Button>
                      <Button variant="outline" onClick={() => setEditingProduct(null)}>
                        <X className="h-4 w-4 mr-2" />
                        İptal
                      </Button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div>
                      <CardTitle>{product.name}</CardTitle>
                      <CardDescription className="mt-2">
                        {product.description}
                      </CardDescription>
                      <div className="mt-4">
                        <h4 className="font-semibold mb-2">Özellikler:</h4>
                        <ul className="list-disc list-inside space-y-1">
                          {product.features.map((feature, index) => (
                            <li key={index} className="text-sm text-muted-foreground">{feature}</li>
                          ))}
                        </ul>
                      </div>
                      {product.price && (
                        <p className="mt-2 font-semibold">Fiyat: {product.price}</p>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setEditingProduct(product)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeleteProduct(product.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </>
                )}
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ProductsAdmin;