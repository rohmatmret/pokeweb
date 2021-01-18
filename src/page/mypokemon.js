import React, { useState,useEffect,createContext,useContext } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css'
import { Container,Row,Col,Card ,Button} from 'react-bootstrap'

import AppContext from '../AppContext.js'
const { CartContext } = AppContext;
const { Provider,Consumer } = createContext();

function MyPokemons() {
  const [collection,setCollection] = useState([])
  const props = useContext(CartContext)

  const cart = window.localStorage.getItem('cart')
  const [url] = useState(
    'https://pokeres.bastionbot.org/images/pokemon/'
  )
  
  const [isEmpty, setEmpty] = useState(true)
  
  useEffect(()=>{
    document.title ='My Pokemons'
    const fetchCart = () =>{
      if(cart){
        let incart = JSON.parse(cart)
        setCollection((e=>incart))

        if (incart.length > 0) {
          setEmpty(false)
        }
      }
    }
    fetchCart()
  },[cart])

  function release(index){
    console.log(index)
    const cart = window.localStorage.getItem('cart')
    const storageCart = JSON.parse(cart)
    storageCart.splice(index, 1);
    
    window.localStorage.setItem('cart', JSON.stringify(storageCart));
    setCollection(prevState=> storageCart)
    props.setCart(storageCart.length)

    if (storageCart.length < 1) {
      setEmpty(true)
    }
  }

  return (
    <Provider value={collection}>
     <Container>
        <Row className="justify-content-md-center">
          
          { isEmpty ? 
            <Col lg={5}>
              <h3 className="h3 text-center">You Don't Have a Pokemon</h3>
            </Col>
          : null}
        </Row>
        <Row>
          <Col lg={12}>
            <Container>
              <Row>
                <Consumer>
                  {value => value.map((el,index)=> {
                    return (
                      <Col md={3} key={index}>
                        <Link
                          to={{
                            pathname: "/detail",
                            search: "?name=" + el.name,
                            state: { fromDashboard: true }
                          }} >
                              
                              <Card className="mt-2 p-2 border-0 cards">
                                <img src={url + el.id +'.png'} alt={el.name} className="rounded img-card" />
                                <Card.Body className="p-2">
                                  <Card.Title className="text text-center"> {el.name }</Card.Title>
                                </Card.Body>
                              </Card>
                        </Link>
                        <Button className="btn btn-block" onClick={()=>release(index)}> 
                          <img src="/icons8-open-pokeball-48.png"  alt="poke"/> 
                          <i> Release</i>
                        </Button>
                      </Col>
                    )
                  })}
                </Consumer>
              </Row>
            </Container>
          </Col>
        </Row>
      </Container>
    </Provider>
  )
}


export default MyPokemons;