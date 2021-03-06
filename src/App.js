import React, { useContext} from 'react';
import {
  Switch,
  Link,
  Route
} from "react-router-dom";
import { Navbar} from 'react-bootstrap'
import Detail from './page/Detail.js'
import MyPokemons from './page/mypokemon.js'
import Home from './page/Home.js'
import AppContext from './AppContext.js'
import 'bootstrap/dist/css/bootstrap.min.css';

const { CartProvider, CartContext } = AppContext

function App() {
  
  return (
    <CartProvider>
      <div>
        <Navbar fixed="top">
          <Navbar.Brand>
          <Link to={{ pathname :'/'}}>
            <img
              alt=""
              src="/pokemon.png"
              width="100"
              height="auto"
              className="d-inline-block align-top"
            />
            </Link>
          </Navbar.Brand>
          <Navbar.Collapse className="justify-content-end">
            
              <Navbar.Text>
                
                <Cart/>
              </Navbar.Text>
            
          </Navbar.Collapse>
        </Navbar>
        <div className="container-fluid mt-5 pt-4">
          <Switch>
            <Route exact path={["/", "/pokemon"]} component={Home} />
            <Route exact path={["/pokemon/:id"]} component={Detail} />
            <Route exact path="/my-pokemon" component={MyPokemons} />
          </Switch>
        </div>
      </div>
    </CartProvider>
  );
}


function Cart() {
  const props = useContext(CartContext)
  return (
    <>
      <Link to={{ pathname :'/my-pokemon'}} className="ransel">
        <img
          alt=""
          src="/ransel.png"
          width="45px"
          height="auto"
          className="d-inline-block align-top mr-1"
        />
        
      </Link>
      <div className="strong">
        <strong>{props.cart}</strong>
      </div>
    </>
  )
}

export default App;
