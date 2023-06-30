import React, { useState } from "react";
import axios from "axios";
import "./App.css";




export function ProductPage() {
  const [product,setProduct] = useState({
    name: "",
    charges: "",
    quantity: "",
    category: "",
    size: "",
  });
  
  const { name, charges, quantity, category, size } = product;
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      await axios.post("http://localhost:8080/addProduct", product);
      alert("Added successfully");
    }
    setProduct({
        name: "",
        charges: "",
        quantity: "",
        category: "",
        size: "",

    })

    
    
  };

  const categories = ["Home Appliances", "Industrial Appliances"];
  const sizes = ["Small", "Medium", "Large"];

  const validateForm = () => {
    let isValid = true;
    const errors = {};
    const nameRegex = /^[a-zA-Z\s]*$/;
    if (!product.name) {
      errors.name = "name is required";
      isValid = false;
    } else if (!nameRegex.test(product.name)) {
      errors.name = "name should contain only alphabets";
      isValid = false;
    } else if (product.name.length < 3) {
      errors.name = "name should contain at least 3 characters";
      isValid = false;
    }
    if (!product.charges || product.charges <= 0) {
      errors.charges = "Charge should be greater than zero";
      isValid = false;
    }
    if (!product.quantity || product.quantity <= 0) {
      errors.quantity = "Quantity should be greater than zero";
      isValid = false;
    }
    if (!product.category) {
      errors.category = "Please select a category";
      isValid = false;
    }
    setErrors(errors);
    return isValid;
  };

  return (
    <div className="container">
      <div className="product-container">
        <h1>Product</h1>
     
    

    
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
         
            <label htmlFor="name">Product name</label>
            <br></br>
            <input
              type="text"
              className="largeInput"
              name="name"
              value={name}
              onChange={handleChange}
              onBlur={validateForm}
            />
            {errors.name && <div className="error">{errors.name}</div>}
          </div>
          <div>
            <label htmlFor="charges">Product charge</label>
            <br></br>
            <input
              type="text"
              className="largeInput"
              name="charges"
              value={charges}
              onChange={handleChange}
              onBlur={validateForm}
            />
            {errors.charges && <div className="error">{errors.charges}</div>}
          </div>
          <div>
            <label htmlFor="quantity">Quantity</label>
            <br></br>
            <input
              type="text"
              className="largeInput"
              name="quantity"
              value={quantity}
              onChange={handleChange}
              onBlur={validateForm}
            />
            {errors.quantity && <div className="error">{errors.quantity}</div>}
            </div>
          <div>
            <label htmlFor="category">Category</label>
            <br></br>
            <select
              className="largeInput"
              name="category"
              value={category}
              onChange={handleChange}
              onBlur={validateForm}
            >
              <option className="option">Select category</option>
              {categories.map((categoryOption, index) => (
                <option key={index} value={categoryOption}>
                  {categoryOption}
                </option>
              ))}
            </select>
            {errors.category && <div className="error">{errors.category}</div>}
          </div>
          <div>
            
              <label htmlFor="size">Product size</label>
              <br />
              {sizes.map((sizeOption, index) => (
                <div key={index}>
                  <input
                    type="radio"
                    name="size"
                    value={sizeOption}
                    checked={size === sizeOption}
                    onChange={handleChange}
                  />
                  <label htmlFor={sizeOption}>{sizeOption}</label>
                </div>
              ))}
            
          </div>
          <center><button type="submit">Add Product</button></center>
         
        </form>
        </div>
       
      
    </div>
  );
}

export default ProductPage;
