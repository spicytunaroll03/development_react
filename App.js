import "./App.css";
import { useState } from "react";
import bakeryData from "./assets/bakery-data.json";
import ProductItem from "./components/ProductItem.js";
import 'bootstrap/dist/css/bootstrap.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


/* ####### DO NOT TOUCH -- this makes the image URLs work ####### */
bakeryData.forEach((item) => {
  item.image = process.env.PUBLIC_URL + "/" + item.image;
});
/* ############################################################## */

function App() {
  // ADDING TO THE CART ########################################################
  const [cartItems, setCartItems] = useState([])
  const [totalPrice, countTotalPrice] = useState(0);

  function addToCart(item) {
    setCartItems([...cartItems, item]) //cartItems is an array and the ... expands the array and this new item is appended to this array 
    countTotalPrice(totalPrice + 1)
  }

  function calculateTotal() {
    let total = 0
    for (let i = 0; i < cartItems.length; i++) {
      total += cartItems[i].price
    }
    return total
  }

  // ###########################################################################
  
  return (
    <div className="App">
      <h1>Product Gallery</h1> {/* TODO: personalize your bakery (if you want) */}
      <Row> 
        <div className="main">
          {/*GALLERY OF PRODUCTS*/}
          <Col md="7" style={{backgroundColor: 'yellow'}}> 
            <div className="gallery"> 
              {bakeryData.map((item, index) => ( 
                <ProductItem item={item} addToCart={addToCart}/> // this maps each bakery item to its data!
              ))}
            </div>
          </Col>
          {/*CART*/}
          <Col md="3" style={{backgroundColor: 'blue'}}>
            <div className="cart">
              <h2>Cart</h2>
              <div> 
                { cartItems.map((item, index)=> <p> {item.name} </p>)}
                <h2> Price: {calculateTotal()} </h2>
              </div>
            </div>
          </Col>
        
        </div>
      </Row>
    </div>
  );
}

export default App;