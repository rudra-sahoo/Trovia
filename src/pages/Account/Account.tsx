import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { X } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { Input } from '../../components/ui/input';
import { Alert, AlertDescription } from '../../components/ui/alert';
import { AlertCircle } from 'lucide-react'; 
import { ProductGrid } from './ProductGrid';

interface ProductForm {
  productName: string;
  productCategory: string;
  productPrice: string;
  photos: File[];
}

// First, add a Product interface
interface Product {
  _id: string;          // This maps to productId from API
  name: string;         // This maps to productName from API
  price: number;        // This maps to productPrice from API
  category: string;     // This maps to productCategory from API
  images: Array<{
    url: string;
    publicId: string;
  }>;
  userId: string;
  userEmail?: string;   // Make optional since it might not always be present
  userName?: string;    // Make optional since it might not always be present
  createdAt: string;
}

export const Account: React.FC = () => {
  const { isAuthenticated, userEmail, accessToken, userId } = useAuth();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [formData, setFormData] = useState<ProductForm>({
    productName: '',
    productCategory: '', // Remove hardcoded default
    productPrice: '',
    photos: []
  });

  // Add products state and fetch function
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Update the fetchUserProducts function
  const fetchUserProducts = async () => {
    setIsLoading(true);
    setError(null);
    
    if (!accessToken || !userId) {
      setError('Authentication required');
      navigate('/auth');
      return;
    }

    try {
      // Use the ngrok URL
      const apiUrl = `https://firm-bluegill-engaged.ngrok-free.app/api/products/user/${userId}`;
      console.log('Fetching products from API:', apiUrl);
      
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'ngrok-skip-browser-warning': 'true' // This is important for ngrok connections
        }
      });

      console.log('API response status:', response.status);
      
      if (!response.ok) {
        const errorBody = await response.text();
        console.error('Error response body:', errorBody);
        
        if (response.status === 401) { 
          navigate('/auth');
          throw new Error('Authentication expired. Please login again.');
        }
        throw new Error(`Failed to fetch products (Status: ${response.status})`);
      }

      const data = await response.json();
      console.log('Products data:', data);
      
      if (data && data.success && Array.isArray(data.products)) {
        // Map the API response to match your Product interface
        const formattedProducts = data.products.map((product: any) => ({
          _id: product.productId || '',
          name: product.productName || 'Unnamed Product',
          price: product.productPrice || 0,
          category: product.productCategory || 'Uncategorized',
          images: Array.isArray(product.images) ? product.images : [],
          userId: product.userId || '',
          userEmail: product.userEmail || '',
          userName: product.userName || '',
          createdAt: product.createdAt || new Date().toISOString()
        }));
        
        setProducts(formattedProducts);
        console.log('Formatted products:', formattedProducts);
      } else {
        console.warn('Unexpected data format or empty products array:', data);
        setProducts([]);
      }
    } catch (error: any) {
      console.error('Error fetching products:', error);
      setError(error.message || 'Failed to load products');
      setProducts([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/auth', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  // Add useEffect to fetch products on mount
  useEffect(() => {
    if (isAuthenticated) {
      fetchUserProducts();
    }
  }, [isAuthenticated]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    // Store the actual files instead of converting to base64
    setFormData(prev => ({
      ...prev,
      photos: [...Array.from(files)]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    if (!accessToken || !userId) {
      setError('Authentication required. Please login again.');
      setIsSubmitting(false);
      navigate('/auth');
      return;
    }

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('productName', formData.productName);
      formDataToSend.append('productCategory', formData.productCategory);
      formDataToSend.append('productPrice', formData.productPrice);
      formDataToSend.append('userId', userId);

      if (formData.photos.length < 4) {
        throw new Error('Minimum 4 photos required');
      }

      // Append each photo to form data
      formData.photos.forEach((photo) => {
        formDataToSend.append('images', photo);
      });

      const response = await fetch('https://firm-bluegill-engaged.ngrok-free.app/api/products/add', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`
        },
        body: formDataToSend
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 401) {
          navigate('/auth');
          throw new Error('Authentication expired. Please login again.');
        }
        throw new Error(data.message || 'Failed to add product');
      }

      // Reset form on success
      if (response.ok) {
        setFormData({
          productName: '',
          productCategory: '',
          productPrice: '',
          photos: []
        });
        setIsModalOpen(false);
        // Add this line to refresh products after adding a new one
        fetchUserProducts();
      }

    } catch (error: any) {
      console.error('Error adding product:', error);
      setError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isAuthenticated) return null;

  return (
    <div className="pt-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold">My Account</h1>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md"
          >
            Add Product
          </button>
        </div>
        
        <div className="space-y-4">
          <div>
            <h2 className="text-lg font-medium">Profile Information</h2>
            <div className="mt-2 p-4 bg-gray-50 rounded-md">
              <p className="text-sm text-gray-600">Email</p>
              <p className="font-medium">{userEmail}</p>
            </div>
          </div>

          <div className="mt-8">
            <h2 className="text-lg font-medium mb-4">My Listed Products</h2>
            {error && (
              <Alert variant="destructive" className="mb-4">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            
            <ProductGrid products={products} isLoading={isLoading} />
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Add New Product</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {error && (
              <Alert variant="destructive" className="mb-4">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Product Name
                </label>
                <Input
                  type="text"
                  value={formData.productName}
                  onChange={(e) => setFormData({ ...formData, productName: e.target.value })}
                  required
                  placeholder="Enter product name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Price per Day (₹)
                </label>
                <Input
                  type="number"
                  value={formData.productPrice}
                  onChange={(e) => setFormData({ ...formData, productPrice: e.target.value })}
                  required
                  min="0"
                  step="0.01"
                  placeholder="Enter price per day"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <select
                  value={formData.productCategory}
                  onChange={(e) => setFormData({ ...formData, productCategory: e.target.value })}
                  required
                  className="w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="">Select a category</option>
                  <option value="electronics">Electronics</option>
                  <option value="furniture">Furniture</option>
                  <option value="clothing">Clothing</option>
                  <option value="books">Books</option>
                  <option value="sports">Sports Equipment</option>
                  <option value="tools">Tools</option>
                  <option value="others">Others</option>
                </select>
              </div>
 
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Product Images
                </label>
                <Input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageChange}
                  required
                  className="mt-1"
                />
                <p className="text-sm text-gray-500 mt-1">
                  Selected files: {formData.photos.length} (minimum 4 images required)
                </p>
              </div>

              <button
                type="submit"
                disabled={isSubmitting || formData.photos.length === 0}
                className="w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50"
              >
                {isSubmitting ? 'Adding Product...' : 'Add Product'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
