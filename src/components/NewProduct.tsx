import { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft, Minus, Plus } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useCart } from "../context/CartContext";
import {
  PageContainer,
  BackButton,
  ProductContainer,
  ImageContainer,
  ProductImage,
  ProductInfo,
  ProductTitle,
  ProductDescription,
  ProductPrice,
  ProductMeta,
  AddToCartButton,
  QuantityControl,
  QuantityButton,
  QuantityDisplay,
  StockWarning,
} from "../style/ProductPreview.style";
import Header from "./Header";
import Footer from "./Footer";
import LoadingSpinner from "./LoadingSpinner";

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  quantity?: number;
}

export default function NewProduct() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(0);
  const location = useLocation();
  const { addToCart, cart, updateCartItemQuantity } = useCart();
  const updateStock = (newStock: number) => {
    if (product) {
      setProduct({ ...product, stock: newStock });
      localStorage.setItem(`product_${product.id}_stock`, newStock.toString());
    }
  };
  const handleAddToCart = () => {
    if (product && product.stock > 0) {
      addToCart({ ...product, quantity: 1 });
      const newStock = product.stock - 1;
      updateStock(newStock);
      setProduct({ ...product, stock: product.stock - 1 });
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
  useEffect(() => {
    if (product && cart) {
      const cartItem = cart.find((item) => item.id === product.id);
      setQuantity(cartItem ? cartItem.quantity : 0);
    }
  }, [product, cart]);
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const storedProducts = JSON.parse(
          localStorage.getItem("newProducts") || "[]"
        );
        const storedProduct = storedProducts.find(
          (p: Product) => p.id.toString() === id
        );
        if (storedProduct) {
          setProduct(storedProduct);
        } else {
          throw new Error("Product not found");
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [id, location.state]);
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
            <ProductDescription>{product.description}</ProductDescription>
            <ProductPrice>₹{product.price}</ProductPrice>
            <ProductMeta>
              <p>Brand: {product.brand || "N/A"}</p>
              <p>Category: {product.category}</p>
              <p>Stock: {product.stock}</p>
            </ProductMeta>
            {product.stock === 0 && <StockWarning>Out of Stock</StockWarning>}
            {quantity > 0 ? (
              <QuantityControl>
                <QuantityButton onClick={() => handleQuantityChange(-1)}>
                  <Minus size={16}  />
                </QuantityButton>
                <QuantityDisplay>{quantity}</QuantityDisplay>
                <QuantityButton onClick={() => handleQuantityChange(1)} >
                  <Plus size={16} onClick={handleAddToCart} />
                </QuantityButton>
              </QuantityControl>
            ) : (
              <AddToCartButton
                disabled={product.stock === 0}
                onClick={handleAddToCart}
              >
                Add to Cart
              </AddToCartButton>
            )}
          </ProductInfo>
        </ProductContainer>
        <ToastContainer />
      </PageContainer>
      <Footer />
    </>
  );
}
