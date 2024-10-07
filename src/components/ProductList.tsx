"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Header from "./Header";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Container,
  Title,
  ProductGrid,
  ProductCard,
  ProductImage,
  ProductInfo,
  ProductTitle,
  ProductDescription,
  ProductPrice,
  AddToCartButton,
  ButtonLink,
  StockInfo,
  LoadingSpinner,
  NoResultsMessage,
} from "../styles";
import { useCart, Product } from "../context/CartContext";
import NoDataFound from "./NodataFound";
import Footer from "./Footer";

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [isSearching, setIsSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [noProductsFound, setNoProductsFound] = useState(false);
  // const [outOfStockProducts, setOutOfStockProducts] = useState<number[]>([]);
  const [page, setPage] = useState(0);
  const itemsPerPage = 8;
  const navigate = useNavigate();
  const location = useLocation();
  const { addToCart, cart, updateProductStock } = useCart();
  const observer = useRef<IntersectionObserver | null>(null);

  const lastProductElementRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [isLoading, hasMore]
  );

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = params.get("q");
    if (query) {
      setSearchQuery(query);
      setIsSearching(true);
      handleSearch(query);
    } else {
      setIsSearching(false);
      setProducts([]);
      setPage(0);
      fetchProducts();
    }
  }, [location]);

  useEffect(() => {
    if (!isSearching) {
      fetchProducts();
    }
  }, [page, isSearching]);

  useEffect(() => {
    setProducts((prevProducts) =>
      prevProducts.map((product) => ({
        ...product,
        stock: getProductStock(product.id, product.stock),
      }))
    );
  }, [cart]);

  const fetchProducts = async () => {
    if (isLoading || !hasMore) return;
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://dummyjson.com/products?limit=${itemsPerPage}&skip=${
          page * itemsPerPage
        }`
      );
      const data = await response.json();
      const newProducts = data.products.map((product: Product) => ({
        ...product,
        stock: getProductStock(product.id, product.stock),
      }));
      setProducts((prevProducts) => {
        const updatedProducts = [...prevProducts, ...newProducts];
        const uniqueProducts = updatedProducts.filter(
          (product, index, self) =>
            index === self.findIndex((t) => t.id === product.id)
        );
        return uniqueProducts;
      });
      setHasMore(data.products.length === itemsPerPage);
      setNoProductsFound(data.total === 0);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = async (query: string) => {
    setIsLoading(true);
    setProducts([]);
    setPage(0);
    try {
      const response = await fetch(
        `https://dummyjson.com/products/search?q=${query}`
      );
      const data = await response.json();
      const productsWithStock = data.products.map((product: Product) => ({
        ...product,
        stock: getProductStock(product.id, product.stock),
      }));
      setProducts(productsWithStock);
      setHasMore(false);
      setNoProductsFound(data.products.length === 0);
    } catch (error) {
      console.error("Error searching products:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddToCart = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation();
    if (product.stock > 0) {
      addToCart(product);
      updateProductStock(product.id, product.stock - 1);
      setProducts((prevProducts) =>
        prevProducts.map((p) =>
          p.id === product.id ? { ...p, stock: p.stock - 1 } : p
        )
      );
      toast.success(`${product.title} added to cart!`, {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const getProductStock = (productId: number, initialStock: number): number => {
    const storedStock = localStorage.getItem(`product_${productId}_stock`);
    return storedStock !== null ? parseInt(storedStock, 10) : initialStock;
  };

  return (
    <>
      <Header showCartIcon={true} showSearch={true} />
      <Container>
        <ButtonLink to="/categories">View Categories</ButtonLink>{" "}
        <ButtonLink to="/add-product">Add Product</ButtonLink>
        <Title>
          {isSearching ? `Search Results for "${searchQuery}"` : "PRODUCT LIST"}
        </Title>
        {noProductsFound ? (
          // <NoResultsMessage>No products found{isSearching ? ` for "${searchQuery}"` : ''}.</NoResultsMessage>
          <NoDataFound searchTerm={searchQuery} />
        ) : (
          <ProductGrid>
            {products.map((product, index) => (
              <ProductCard
                key={`${product.id}-${index}`}
                onClick={() => navigate(`/product/${product.id}`)}
                ref={
                  index === products.length - 1 ? lastProductElementRef : null
                }
              >
                <ProductImage src={product.thumbnail} alt={product.title} />
                <ProductInfo>
                  <ProductTitle>{product.title}</ProductTitle>
                  <ProductDescription>
                    {product.description.substring(0, 100)}...
                  </ProductDescription>
                  <ProductPrice>₹{product.price.toFixed(2)}</ProductPrice>
                  <StockInfo>
                    {product.stock === 0 ? (
                      <span style={{ color: "red" }}>Out of Stock</span>
                    ) : (
                      <>Stock: {product.stock}</>
                    )}
                  </StockInfo>
                </ProductInfo>
                <AddToCartButton
                  onClick={(e) => handleAddToCart(e, product)}
                  disabled={product.stock === 0}
                >
                  Add to Cart
                </AddToCartButton>
              </ProductCard>
            ))}
          </ProductGrid>
        )}
        {isLoading && <LoadingSpinner />}
        {!isLoading && !hasMore && !noProductsFound && (
          <NoResultsMessage>No more products to load.</NoResultsMessage>
        )}
        <ToastContainer />
      </Container>
      <Footer />
    </>
  );
}
