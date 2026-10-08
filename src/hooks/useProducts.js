// Custom Hook: useProducts
// Fetches product list from DummyJSON with support for search, category filtering, sorting, and pagination
import { useState, useEffect, useCallback } from "react";
import axiosClient from "../api/axiosClient";


export function useProducts(options = {}) {
  const {
    search = "",
    category = "",
    limit = 20,
    skip = 0,
    sortBy = "",
    order = "asc",
  } = options;

  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      let endpoint = "/products";
      const params = {};

      // Determine endpoint based on search query or category filter
      if (search && search.trim() !== "") {
        endpoint = "/products/search";
        params.q = search.trim();
      } else if (category && category !== "all") {
        endpoint = `/products/category/${encodeURIComponent(category)}`;
      }

      params.limit = limit;
      params.skip = skip;

      if (sortBy) {
        params.sortBy = sortBy;
        params.order = order;
      }

      const response = await axiosClient.get(endpoint, { params });

      setProducts(response.data.products || []);
      setTotal(response.data.total || 0);
    } catch (err) {
      setError(err?.message || "Failed to fetch products from DummyJSON API.");
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, [search, category, limit, skip, sortBy, order]);

  // Automatically fetch when query parameters change
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return {
    products,
    total,
    loading,
    error,
    refetch: fetchProducts,
  };
}

export default useProducts;
