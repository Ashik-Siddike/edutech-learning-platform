// Custom Hook: useProduct
// Fetches a single product's complete details from DummyJSON by ID
import { useState, useEffect, useCallback } from "react";
import axiosClient from "../api/axiosClient";

/**
 * Custom hook to fetch a single product by ID
 * @param {number|string|null} productId - The ID of the product
 * @returns {{ product: Object|null, loading: boolean, error: string|null, refetch: Function }}
 */
export function useProduct(productId) {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchProduct = useCallback(async () => {
    if (!productId) {
      setProduct(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await axiosClient.get(`/products/${productId}`);
      setProduct(response.data || null);
    } catch (err) {
      setError(err?.message || `Failed to fetch product details for ID #${productId}`);
      setProduct(null);
    } finally {
      setLoading(false);
    }
  }, [productId]);

  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);

  return {
    product,
    loading,
    error,
    refetch: fetchProduct,
  };
}

export default useProduct;
