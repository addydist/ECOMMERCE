import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from './Header';
import { MoveLeft,MoveRight  } from 'lucide-react';
import { useCart,Product} from '../context/CartContext';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
    PaginationContainer,
    PaginationButton,
    CategoryGrid,
    CategoryCard,
    StockInfo,
    OutOfStockOverlay
  } from "../styles";
import Footer from './Footer';



interface Category {
    slug: string;
    name: string;
    url: string;
  }
  

  
  export default function Categories() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [products, setProducts] = useState<Product[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [outOfStockProducts, setOutOfStockProducts] = useState<number[]>([]);
    const itemsPerPage = 8;
    const navigate = useNavigate();
    const location = useLocation();
    const { addToCart,updateProductStock } = useCart();
  
    useEffect(() => {
      fetchCategories();
      const params = new URLSearchParams(location.search);
      const category = params.get('category');
      const page = params.get('page');
      if (category) {
        setSelectedCategory(category);
        fetchProductsByCategory(category, page ? parseInt(page) : 1);
      } else {
        setSelectedCategory(null);
        setProducts([]); 
      }
      console.log("heheheh",selectedCategory)
    }, [location]);
  
    const fetchCategories = async () => {
      try {
        const response = await fetch('https://dummyjson.com/products/categories');
        const data = await response.json();
        setCategories(data.map((category: Category) => ({
          slug: category.slug,
          name: category.name,
          url: category.url
        })));
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
  
    const fetchProductsByCategory = async (category: string, page: number) => {
      try {
        const response = await fetch(`https://dummyjson.com/products/category/${category}?limit=${itemsPerPage}&skip=${(page - 1) * itemsPerPage}`);
        const data = await response.json();
        const productsWithStock = data.products.map((product: Product) => ({
            ...product,
            stock: getProductStock(product.id, product.stock)
          }));
          setProducts(productsWithStock);
        setTotalPages(Math.ceil(data.total / itemsPerPage));
        setCurrentPage(page);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
  
    const handleCategoryClick = (category: Category) => {
      setSelectedCategory(category.name);
      navigate(`/categories?category=${category.slug}&page=1`);
    };
  
    const handlePageChange = (page: number) => {
      if (selectedCategory) {
        navigate(`/categories?category=${selectedCategory}&page=${page}`);
      }
    };
  
    const handleAddToCart = (e: React.MouseEvent, product: Product) => {
        e.stopPropagation();
        if (product.stock > 0) {
          addToCart(product);
          updateProductStock(product.id, product.stock - 1);
          setProducts(prevProducts => 
            prevProducts.map(p => 
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
        } else {
          setOutOfStockProducts(prev => [...prev, product.id]);
          setTimeout(() => {
            setOutOfStockProducts(prev => prev.filter(id => id !== product.id));
          }, 2000);
          toast.error(`${product.title} is out of stock!`, {
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
        <Header showCartIcon={true} showSearch={false} />
        <Container>
          {!selectedCategory ? (
            <>
              <Title>CATEGORIES</Title>
              <CategoryGrid>
                {categories.map((category) => (
                  <CategoryCard key={category.slug} onClick={() => handleCategoryClick(category)}>
                    {category.name}
                  </CategoryCard>
                ))}
              </CategoryGrid>
            </>
          ) : (
            <>
              <Title>{selectedCategory.toUpperCase()} PRODUCTS</Title>
              <ProductGrid>
                {products.map((product) => (
                  <ProductCard key={product.id} onClick={() => navigate(`/product/${product.id}`)}>
                    <ProductImage src={product.thumbnail} alt={product.title} />
                    <ProductInfo>
                      <ProductTitle>{product.title}</ProductTitle>
                      <ProductDescription>
                       {product.description.substring(0, 100)}...
                      </ProductDescription>
                      <ProductPrice>₹{product.price.toFixed(2)}</ProductPrice>
                      <StockInfo>Stock: {product.stock}</StockInfo>
                    </ProductInfo>
                    <AddToCartButton 
                    onClick={(e) => handleAddToCart(e, product)}
                    disabled={product.stock === 0}
                  >
                    Add to Cart
                  </AddToCartButton>
                  {outOfStockProducts.includes(product.id) && (
                    <OutOfStockOverlay>Out of Stock</OutOfStockOverlay>
                  )}
                  </ProductCard>
                ))}
              </ProductGrid>
              <PaginationContainer>
                <PaginationButton
                  onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
                  disabled={currentPage === 1}
                >
                  <MoveLeft/>
                </PaginationButton>
                {[...Array(totalPages)].map((_, i) => (
                  <PaginationButton
                    key={i}
                    onClick={() => handlePageChange(i + 1)}
                    active={currentPage === i + 1}
                  >
                    {i + 1}
                  </PaginationButton>
                ))}
                <PaginationButton
                  onClick={() => handlePageChange(Math.min(currentPage + 1, totalPages))}
                  disabled={currentPage === totalPages}
                >
                  <MoveRight />
                </PaginationButton>
              </PaginationContainer>
            </>
          )}
          <ToastContainer />
        </Container>
      <Footer/>
      </>
    );
  }