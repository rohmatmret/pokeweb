import React, { useState,useEffect,createContext,useContext } from 'react';
import { Link } from 'react-router-dom';

import '../App.css'
import { Container,Row,Col,Card ,Button, Alert} from 'react-bootstrap'
import Footer from '../components/footer'
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
  const [isSuccessRealease, setRealease] = useState(false)
  
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
    
    const cart = window.localStorage.getItem('cart')
    const storageCart = JSON.parse(cart)
    storageCart.splice(index, 1);
    
    window.localStorage.setItem('cart', JSON.stringify(storageCart));
    setCollection(prevState=> storageCart)
    props.setCart(storageCart.length)

    if (storageCart.length < 1) {
      setEmpty(true)
    }

    setRealease(true)
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
        <Row className="justify-content-md-center mt-3 pt-2">
          
          { isEmpty ? 
            <Col lg={2}>
              <Link to="/" className="btn btn-block btn-light">
                <i className="fa fa-compass" aria-hidden="true"></i>
              </Link>
            </Col>
          : null}
        </Row>
        <Row>
          <Col lg={12}>
            <Container>
              {(isSuccessRealease && !isEmpty) ?
                <>
                  <Row className="justify-content-md-center">
                    <Col lg={12}>
                      <Alert  variant={'success'}>
                        Success Realease
                      </Alert>
                    </Col>
                  </Row>
                  <Row className="justify-content-md-center">
                    { !isEmpty ?
                      <Col lg={2}>
                        <Button className="btn btn-block btn-light" onClick={()=>setRealease(false)}>
                          <i class="fa fa-arrow-left" aria-hidden="true"></i>
                        </Button>
                      </Col>
                    :null}
                  </Row>
                </>
              :
                <Row>
                  <Consumer>
                    {value => value.map((el,index)=> {
                      return (
                        <Col md={3} key={index}>
                          <Card className="mt-2 p-2 border-0 cards">
                            <Link
                              to={{
                                pathname: "/pokemon/"+el.id,
                                state: { incollection: true }
                              }} >
                                  
                              <img src={url + el.id +'.png'} alt={el.name} className="rounded img-card" />
                            </Link>
                            <Card.Body className="p-2">
                              <Card.Title className="text text-center capitalize"> 
                                {el.name}
                              </Card.Title>
                            </Card.Body>
                            <Button className="btn btn-none" onClick={()=>release(index)}> 
                              <img src="/icons8-open-pokeball-48.png"  alt="poke"/> 
                              Release
                            </Button>
                          </Card>
                        </Col>
                      )
                    })}
                  </Consumer>
                </Row>
              }
            </Container>
          </Col>
        </Row>
      </Container>
      <Footer/>
    </Provider>
  )
}


export default MyPokemons;