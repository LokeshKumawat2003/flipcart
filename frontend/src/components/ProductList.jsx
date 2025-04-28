import React, { useState, useEffect } from 'react';
import { productService } from '../services/apiService';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await productService.getProducts({ page, limit: 8 });
        setProducts(response.data.data);
        
        // Calculate total pages
        const total = response.data.total;
        const limit = 8;
        setTotalPages(Math.ceil(total / limit));
        
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch products');
        setLoading(false);
      }
    };

    fetchProducts();
  }, [page]);

  const handlePrevPage = () => {
    setPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  if (loading) return <div className="text-center py-10">Loading products...</div>;
  if (error) return <div className="text-red-500 text-center py-10">Error: {error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-semibold mb-6">Our Products</h2>
      
      {products.length === 0 ? (
        <div className="text-center py-10">No products found</div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <div key={product._id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="h-48 overflow-hidden">
                  <img 
                    src={product.images && product.images.length > 0 
                      ? product.images[0] 
                      : 'https://via.placeholder.com/300x200'} 
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-2 truncate">{product.name}</h3>
                  <p className="text-gray-600 text-sm mb-2 line-clamp-2">{product.description}</p>
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="font-bold text-lg">${product.price.toFixed(2)}</span>
                      {product.discountPrice && (
                        <span className="text-gray-500 line-through ml-2">
                          ${product.discountPrice.toFixed(2)}
                        </span>
                      )}
                    </div>
                    <button 
                      className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Pagination */}
          <div className="flex justify-center mt-8">
            <button 
              onClick={handlePrevPage} 
              disabled={page === 1}
              className={`px-4 py-2 mx-1 rounded ${
                page === 1 ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              Previous
            </button>
            <span className="px-4 py-2 mx-1">
              Page {page} of {totalPages}
            </span>
            <button 
              onClick={handleNextPage} 
              disabled={page === totalPages}
              className={`px-4 py-2 mx-1 rounded ${
                page === totalPages ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ProductList; 