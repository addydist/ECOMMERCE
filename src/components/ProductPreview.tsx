import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Plus, Minus, Star, ArrowLeft } from "lucide-react";
import { useCart } from "../context/CartContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./Header";
import LoadingSpinner from "./LoadingSpinner";
import Footer from "./Footer";
import {
  PageContainer,
  BackButton,
  ProductContainer,
  ImageContainer,
  ProductImage,
  ProductInfo,
  ProductTitle,
  ProductDescription,
  AddToCartButton,
  ProductPrice,
  QuantityControl,
  QuantityButton,
  QuantityDisplay,
  ProductMeta,
  RatingContainer,
  ReviewsContainer,
  ReviewItem,
  StockWarning,
} from "../style/ProductPreview.style";

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
  quantity?: number;
  reviews: {
    rating: number;
    comment: string;
    date: string;
    reviewerName: string;
  }[];
}

export default function ProductPreview() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(0);
  const navigate = useNavigate();
  const { addToCart, cart, updateCartItemQuantity, updateProductStock } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`https://dummyjson.com/products/${id}`);
        const data = await response.json();
        const storedStock = localStorage.getItem(`product_${id}_stock`);
        if (storedStock !== null) {
          data.stock = parseInt(storedStock, 10);
        }
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [id]);

  useEffect(() => {
    if (product && cart) {
      const cartItem = cart.find((item) => item.id === product.id);
      setQuantity(cartItem ? cartItem.quantity : 0);
    }
  }, [product, cart]);

  const updateStock = (newStock: number) => {
    if (product) {
      setProduct({ ...product, stock: newStock });
      updateProductStock(product.id, newStock);
    }
  };

  const handleAddToCart = () => {
    if (product && product.stock > 0) {
      addToCart({ ...product, quantity: 1 });
      const newStock = product.stock - 1;
      updateStock(newStock);
      setQuantity((prev) => prev + 1);
      toast.success("Item added to cart!", {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } else {
      toast.error("Out of Stock!", {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  const handleQuantityChange = (change: number) => {
    if (product) {
      const newQuantity = quantity + change;
      if (newQuantity >= 0 && newQuantity <= product.stock + quantity) {
        updateCartItemQuantity(product.id, newQuantity);
        setQuantity(newQuantity);
        const newStock = product.stock - change;
        updateStock(newStock);
      }
    }
  };

  if (!product) {
    return (
      <div>
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <>
      <Header showCartIcon={true} showSearch={false} />
      <PageContainer>
        <BackButton onClick={() => navigate("/")}>
          <ArrowLeft size={16} />
          Back to Products
        </BackButton>

        <ProductContainer>
          <ImageContainer>
            <ProductImage src={product.thumbnail} alt={product.title} />
          </ImageContainer>
          <ProductInfo>
            <ProductTitle>{product.title}</ProductTitle>
            <RatingContainer>
              {[...Array(5)].map((_, index) => (
                <Star
                  key={index}
                  size={16}
                  fill={index < Math.floor(product.rating) ? "#ffc107" : "none"}
                  stroke={
                    index < Math.floor(product.rating) ? "#ffc107" : "#ccc"
                  }
                />
              ))}
              <span>({product.rating.toFixed(1)})</span>
            </RatingContainer>
            <ProductDescription>{product.description}</ProductDescription>
            <ProductPrice>₹{product.price.toFixed(2)}</ProductPrice>
            {quantity > 0 ? (
              <QuantityControl>
                <QuantityButton onClick={() => handleQuantityChange(-1)}>
                  <Minus size={16} />
                </QuantityButton>
                <QuantityDisplay>{quantity}</QuantityDisplay>
                <QuantityButton onClick={() => handleQuantityChange(1)}>
                  <Plus size={16} />
                </QuantityButton>
              </QuantityControl>
            ) : (
              <AddToCartButton
                onClick={handleAddToCart}
                disabled={product.stock === 0}
              >
                Add to Cart
              </AddToCartButton>
            )}
            {product.stock === 0 && <StockWarning>Out of Stock</StockWarning>}
            <ProductMeta>
              <p>Brand: {product.brand}</p>
              <p>Category: {product.category}</p>
              <p>Stock: {product.stock}</p>
            </ProductMeta>
          </ProductInfo>
        </ProductContainer>

        <ReviewsContainer>
          <h2>Customer Reviews</h2>
          {product.reviews.map((review, index) => (
            <ReviewItem key={index}>
              <RatingContainer>
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    fill={i < review.rating ? "#ffc107" : "none"}
                    stroke={i < review.rating ? "#ffc107" : "#ccc"}
                  />
                ))}
                <span>({review.rating.toFixed(1)})</span>
              </RatingContainer>
              <p>{review.comment}</p>
            </ReviewItem>
          ))}
        </ReviewsContainer>

        <ToastContainer />
      </PageContainer>
      <Footer />
    </>
  );
}