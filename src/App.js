import logo from './logo.svg';
import './App.css';
import ProductPage from './Addproduct';
import {BrowserRouter as Router,Routes,Route} from'react-router-dom';
import UpdateProduct from './Updateproduct';
import  Product from './Product';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route exact path = "/addProduct" element = {<Product/>}/>
          <Route exact path = "/updateproduct/:id" element = {<UpdateProduct/>}/>
          <Route exact path = "/product" element = {<Product/>}/>

        </Routes>
      </Router>
    </div>
   
  );
}

export default App;
