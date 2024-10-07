import React, { useState, ChangeEvent, FormEvent } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

interface Product {
  id?: number;
  title: string;
  description: string;
  price: number;
  stock: number;
  brand:string;
  category: string;
  thumbnail: string;
  images: string;
  quantity?: number;
}

const AddProductWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f9f9f9;
`;

const FormContainer = styled.form`
  background-color: #fff;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  max-width: 600px;
  width: 100%;
`;

const Title = styled.h2`
  margin-bottom: 1.5rem;
  font-size: 1.75rem;
  text-align: center;
`;

const InputField = styled.input`
  width: 96%;
  padding: 0.75rem;
  margin-bottom: 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
`;

const TextArea = styled.textarea`
  width: 96%;
  padding: 0.75rem;
  margin-bottom: 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
`;

const Button = styled.button`
  width: 100%;
  padding: 0.75rem;
  background-color: #0d2e52;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const AddProduct: React.FC = () => {
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product>({
    title: "",
    description: "",
    price: 1,
    stock: 1,
    brand:"",
    category: "",
    thumbnail: "",
    images: "",
    quantity: 1,
  });

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: value,
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch("https://dummyjson.com/products/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
      });

      if (!response.ok) {
        throw new Error("Failed to add product");
      }

      const data = await response.json();
      console.log("Product added:", data);

  
      const newProductId = Date.now();

    
      const newProduct = { ...data, id: newProductId };
      const existingProducts = JSON.parse(
        localStorage.getItem("newProducts") || "[]"
      );
      existingProducts.push(newProduct);
      localStorage.setItem("newProducts", JSON.stringify(existingProducts));

    
      navigate(`/new-product/${newProductId}`, {
        state: { product: newProduct, newProduct: true },
      });
    } catch (error) {
      console.error("Error adding product:", error);
    
    }
  };

  return (
    <AddProductWrapper>
      <FormContainer onSubmit={handleSubmit}>
        <Title>Add New Product</Title>
        <InputField
          type="text"
          name="title"
          placeholder="Product Title"
          value={product.title}
          onChange={handleInputChange}
        />
        <TextArea
          name="description"
          placeholder="Product Description"
          value={product.description}
          onChange={handleInputChange}
        />
        <InputField
          type="text"
          name="category"
          placeholder="Category"
          value={product.category}
          onChange={handleInputChange}
        />
         <InputField
          type="text"
          name="brand"
          placeholder="Brand"
          value={product.brand}
          onChange={handleInputChange}
        />
        <InputField
          type="number"
          name="price"
          placeholder="Price"
          value={product.price}
          onChange={handleInputChange}
        />
        <InputField
          type="number"
          name="stock"
          placeholder="Stock"
          value={product.stock}
          onChange={handleInputChange}
        />
        <InputField
          type="text"
          name="thumbnail"
          placeholder="Thumbnail URL"
          value={product.thumbnail}
          onChange={handleInputChange}
        />
        <InputField
          type="text"
          name="images"
          placeholder="Image URL"
          value={product.images}
          onChange={handleInputChange}
        />
        <Button type="submit">Add Product</Button>
      </FormContainer>
    </AddProductWrapper>
  );
};

export default AddProduct;
