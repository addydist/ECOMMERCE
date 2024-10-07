import React, { useState, useRef } from "react";
import { ArrowLeft, ChevronDown, ChevronUp } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import Header from "./Header";
import LoadingSpinner from "./LoadingSpinner";
import SuccessModal from "./SuccessModal";
import CartSlider from "./CartSlider";
import {
  CheckoutContainer,
  CheckoutForms,
  BackLink,
  Section,
  SectionHeader,
  SectionTitle,
  SectionContent,
  Form,
  FormGroup,
  Label,
  Input,
  Select,
  Button,
  OrderSummary,
  SummaryTitle,
  SummaryItem,
  Total,
  RadioGroup,
  RadioButton,
} from "../style/Checkout.style";
import Footer from "./Footer";

export default function Checkout() {
  const [activeSection, setActiveSection] = useState("billing");
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [orderReferenceId, setOrderReferenceId] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [isCartOpen, setIsCartOpen] = useState(false);
  const navigate = useNavigate();
  const { cart, cartTotal, clearCart } = useCart();

  const formRef = useRef<HTMLFormElement>(null);

  const handleBack = () => {
    navigate("/");
  };

  const toggleSection = (section: string) => {
    setActiveSection(section);
  };
  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };
  const handleEdit = (e: React.MouseEvent) => {
    e.preventDefault();
    toggleCart(); 
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formRef.current?.checkValidity()) {
      formRef.current?.reportValidity();
      return;
    }

    setIsLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));

      setOrderReferenceId(`ORD-${Math.random().toString(36).substr(2, 9)}`);
      if (paymentMethod !== "cod") {
        setTransactionId(`TXN-${Math.random().toString(36).substr(2, 9)}`);
      }
      clearCart();
      setShowSuccessModal(true);
    } catch (error) {
      console.error("Error processing order:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (cart.length === 0 && !showSuccessModal) {
    return (
      <CheckoutContainer>
        <CheckoutForms>
          <h2>Your cart is empty</h2>
          <BackLink onClick={handleBack}>
            <ArrowLeft size={16} />
            <span>Continue shopping</span>
          </BackLink>
        </CheckoutForms>
      </CheckoutContainer>
      
    );
  }

  return (
    <>
      <Header showCartIcon={false} showSearch={false} />
      <CheckoutContainer>
        <CheckoutForms>
          <BackLink onClick={handleBack}>
            <ArrowLeft size={16} />
            <span>Continue shopping</span>
          </BackLink>

          <Form onSubmit={handleSubmit} ref={formRef}>
            <Section>
              <SectionHeader
                isActive={activeSection === "billing"}
                onClick={() => toggleSection("billing")}
              >
                <SectionTitle>Billing</SectionTitle>
                {activeSection === "billing" ? <ChevronUp /> : <ChevronDown />}
              </SectionHeader>
              <SectionContent isOpen={activeSection === "billing"}>
                <FormGroup>
                  <Label htmlFor="fullName">Full name*</Label>
                  <Input type="text" id="fullName" name="fullName" required />
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="email">Email*</Label>
                  <Input type="email" id="email" name="email" required />
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="address">Address*</Label>
                  <Input type="text" id="address" name="address" required />
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="city">City*</Label>
                  <Input type="text" id="city" name="city" required />
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="country">Country*</Label>
                  <Select id="country" name="country" required>
                    <option value="">Select a country</option>
                    <option value="India">India</option>
                    <option value="USA">USA</option>
                  </Select>
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="postalCode">Postal/ZIP code*</Label>
                  <Input
                    type="text"
                    id="postalCode"
                    name="postalCode"
                    required
                  />
                </FormGroup>
              </SectionContent>
            </Section>

            <Section>
              <SectionHeader
                isActive={activeSection === "shipping"}
                onClick={() => toggleSection("shipping")}
              >
                <SectionTitle>Shipping</SectionTitle>
                {activeSection === "shipping" ? <ChevronUp /> : <ChevronDown />}
              </SectionHeader>
              <SectionContent isOpen={activeSection === "shipping"}>
                <FormGroup>
                  <Label htmlFor="shippingAddress">Shipping Address*</Label>
                  <Input
                    type="text"
                    id="shippingAddress"
                    name="shippingAddress"
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="shippingCity">City*</Label>
                  <Input
                    type="text"
                    id="shippingCity"
                    name="shippingCity"
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="shippingCountry">Country*</Label>
                  <Select id="shippingCountry" name="shippingCountry" required>
                    <option value="">Select a country</option>
                    <option value="India">India</option>
                    <option value="USA">USA</option>
                  </Select>
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="shippingPostalCode">Postal/ZIP code*</Label>
                  <Input
                    type="text"
                    id="shippingPostalCode"
                    name="shippingPostalCode"
                    required
                  />
                </FormGroup>
              </SectionContent>
            </Section>

            <Section>
              <SectionHeader
                isActive={activeSection === "payment"}
                onClick={() => toggleSection("payment")}
              >
                <SectionTitle>Payment</SectionTitle>
                {activeSection === "payment" ? <ChevronUp /> : <ChevronDown />}
              </SectionHeader>
              <SectionContent isOpen={activeSection === "payment"}>
                <FormGroup>
                  <Label>Payment Method*</Label>
                  <RadioGroup>
                    <RadioButton>
                      <input
                        type="radio"
                        id="card"
                        name="paymentMethod"
                        value="card"
                        checked={paymentMethod === "card"}
                        onChange={() => setPaymentMethod("card")}
                        required
                      />
                      <Label htmlFor="card">Card</Label>
                    </RadioButton>
                    <RadioButton>
                      <input
                        type="radio"
                        id="upi"
                        name="paymentMethod"
                        value="upi"
                        checked={paymentMethod === "upi"}
                        onChange={() => setPaymentMethod("upi")}
                      />
                      <Label htmlFor="upi">UPI</Label>
                    </RadioButton>
                    <RadioButton>
                      <input
                        type="radio"
                        id="cod"
                        name="paymentMethod"
                        value="cod"
                        checked={paymentMethod === "cod"}
                        onChange={() => setPaymentMethod("cod")}
                      />
                      <Label htmlFor="cod">Cash on Delivery</Label>
                    </RadioButton>
                  </RadioGroup>
                </FormGroup>

                {paymentMethod === "card" && (
                  <>
                    <FormGroup>
                      <Label htmlFor="cardNumber">Card Number*</Label>
                      <Input
                        type="text"
                        id="cardNumber"
                        name="cardNumber"
                        required
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label htmlFor="cardName">Name on Card*</Label>
                      <Input
                        type="text"
                        id="cardName"
                        name="cardName"
                        required
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label htmlFor="expiryDate">Expiry Date*</Label>
                      <Input
                        type="text"
                        id="expiryDate"
                        name="expiryDate"
                        placeholder="MM/YY"
                        required
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label htmlFor="cvv">CVV*</Label>
                      <Input type="text" id="cvv" name="cvv" required />
                    </FormGroup>
                  </>
                )}

                {paymentMethod === "upi" && (
                  <FormGroup>
                    <Label htmlFor="upiId">UPI ID*</Label>
                    <Input type="text" id="upiId" name="upiId" required />
                  </FormGroup>
                )}

                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "Processing..." : "Place Order"}
                </Button>
              </SectionContent>
            </Section>
          </Form>
        </CheckoutForms>

        <OrderSummary>
          <SummaryTitle>
            Order summary
            <BackLink href="/" onClick={handleEdit}>
              Edit
            </BackLink>
          </SummaryTitle>
          {cart.map((item) => (
            <SummaryItem key={item.id}>
              <span>
                {item.title} x{item.quantity}
              </span>
              <span>₹{(item.price * item.quantity).toFixed(2)}</span>
            </SummaryItem>
          ))}
          <Total>
            <span>Total</span>
            <span>₹{cartTotal.toFixed(2)}</span>
          </Total>
        </OrderSummary>
      </CheckoutContainer>

      {isLoading && <LoadingSpinner text={"Order is Processing.."} />}
      {showSuccessModal && (
        <SuccessModal
          onClose={() => {
            setShowSuccessModal(false);
            navigate("/");
          }}
          transactionId={transactionId}
          orderReferenceId={orderReferenceId}
        />
      )}
      <Footer />
      <CartSlider isOpen={isCartOpen} onClose={toggleCart} />
    </>
  );
}
