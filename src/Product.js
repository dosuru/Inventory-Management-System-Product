import React, { useState, useEffect } from 'react';

import axios from 'axios';

import { Link, useNavigate } from 'react-router-dom';

import Popup from 'reactjs-popup';



function Product() {

    const [products, setProduct] = useState([]);

    const [showPopup, setShowPopup] = useState(false); // New state for controlling popup visibility

    const [selectedProductId, setSelectedProductId] = useState(null);

    const [searchOption, setSearchOption] = useState('default');




  const [searchValue, setSearchValue] = useState('');

    const navigate = useNavigate();




    useEffect(() => {

        axios.get('http://localhost:8080/product/getAllProducts/')

            .then(response => {

                setProduct(response.data);

            })




    }, [products]);

    const deleteproduct = async (id) => {




        await axios.delete(`http://localhost:8080/product/deleteProduct/${id}`);

        setProduct(products.filter(product => product.id !== id));

        setShowPopup(false); // Close the popup after deleting the product

    };

    const handleSearchOptionChange = (event) => {




        setSearchOption(event.target.value);

   

      };

   

   

   

   

      const handleSearchInputChange = (event) => {

   

        setSearchValue(event.target.value);

   

      };

   

      const filters = (products) => {

   

        if (searchOption === 'default') {

   

          return true;

   

        } else if (searchOption === 'productName') {

   

          return products.productName.toLowerCase().includes(searchValue.toLowerCase());

   

        } else if (searchOption === 'price') {

   

          return products.price === Number(searchValue);

   

        }

   

      };




    const openPopup = (id) => {

        setSelectedProductId(id);

        setShowPopup(true);

    };




    const closePopup = () => {

        setShowPopup(false);

    };






    return (

        <>






            <div>

                <Link className="btn btn-success mx-2" to={`/addproduct`} style={{ marginTop: '1rem', float: 'right', marginBottom: '5rem' }}>Add product</Link>

            </div>

            <div className="product-container">

            <div className="search-container">





<h1 align="center">Product</h1>

<select value={searchOption} onChange={handleSearchOptionChange}>




            <option value="default">View Product</option>




            <option value="name">Search by Product Name</option>




            <option value="price">Search by Price</option>




           




          </select>




          {(searchOption === 'name' || searchOption === 'price') && (




            <input type="text" value={searchValue} onChange={handleSearchInputChange} />




          )}

          </div>

                <h2><u>Product Details</u></h2>

                <div className="product-grid">

                    {products.map(product => (

                        <div className="product-card" key={product.productid} style={{ height: "350px" }}>

                            <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHQ7AXGqNl4CNxMtxquN03ZsS7q-EcOlu_7A&usqp=CAU' height="50px" width={"70px"}></img>

                            <h2><b>Name: </b>{product.name}</h2>

                            <p><b>description: </b>{product.description}</p>

                            <p><b>Price: </b>{product.price}</p>

                            <div className="product-buttons">

                                <Link className="btn btn-success mx-2" to={`/updateproduct/${product.id}`}>

                                    Update

                                </Link>

                                <Popup

                                    trigger={<button className='btn btn-danger'>Delete</button>}

                                    position="top center"

                                    modal

                                    closeOnDocumentClick

                                    contentStyle={{ background: "#36393f", border: "none" }}

                                    className="custom-popup"

                                >

                                    <div id="popText">Are you sure you want to delete this product record?</div>

                                    <button className='btn btn-danger' onClick={() => deleteproduct(product.id)}>Yes</button>

                                </Popup>

                            </div>

                        </div>

                    ))}

                </div>

            </div>

        </>

    );

}




export default Product;