import { useState, useEffect } from "react";

import axios from "axios";



import { useParams } from "react-router-dom";

import { useNavigate } from "react-router-dom";




function Updateproduct() {

    const [product, setProduct] = useState({
        name: "",
        charges: "",
        quantity: "",
        category: "",
        size: "",

       });

    const { id } = useParams();

  const navigate = useNavigate();

    useEffect(() => {

        const fetchproduct = async () => {

          try {

            const response = await axios.get(`http://localhost:8080/viewProduct/${id}`,product);

            setProduct(response.data);

          } catch (error) {

            console.error(error);

          }

        };

        fetchproduct();

      }, [id]);

    const changeHandler = (e) => {

        setProduct({ ...product, [e.target.name]: e.target.value });

    }

        const submitHandler = async (e) => {

            e.preventDefault();

            try {

                await axios.put(`http://localhost:8080/updateProduct/${id}`, product);

                navigate("/product");

              } catch (error) {

                console.error(error);

              }

        };

   





return (
    <div className="container">
    <div className="product-container">
      <h1>UpdateProduct</h1>
   
  

  
      
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

        