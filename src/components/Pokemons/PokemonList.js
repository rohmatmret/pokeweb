import React, { useEffect, useState} from 'react';
import { Row, Col,Container,Card,Badge} from 'react-bootstrap'
import { Link } from 'react-router-dom';

const PokemonList =({pokemons,url})=> {
  const [MyCollection, setMyCollection] = useState([])
  const cart = window.localStorage.getItem('cart')
  function myTrim(x) {
    return x.replace('https://pokeapi.co/api/v2/pokemon/','');
  }
  
  function rewrite(r){
    return r.replace('/','.png')
  }

  function getID(x){
    return x.replace('/','')
  }
  
  function findOwned(id){
    let find = MyCollection.filter((c => c.id === parseInt(id) ))
    return find.length
  }

  useEffect(()=>{
    if(cart){
      let incart = JSON.parse(cart)
      setMyCollection((e=>incart))
    }
  },[cart])
  return (
    <>
      <Container>
        <Row>
            {pokemons.map((el,index)=> {
              return (
                <Col md={3} key={index}>
                  <Card className="mt-2 p-2 border-0 cards">
                    <Link
                      to={{
                        pathname: "/pokemon/" +getID(myTrim(el.url)),
                        state: { fromDashboard: true }
                      }} >
                        
                        <img src={url +rewrite(myTrim(el.url))} alt={el.name} className="img-rounded img-card" />
                      </Link>
                      <Card.Body className="p-2 text-center">
                        <Card.Text className="text text-center capitalize"> {el.name }</Card.Text>
                        <Card.Text className="text text-center">
                          <Badge className="badge badge-light"> OWNED  {findOwned(getID(myTrim(el.url)))} </Badge>
                        </Card.Text>
                      </Card.Body>
                    </Card>
                </Col>
              )
            })}
        </Row>
      </Container>
    </>
  )
}

export default PokemonList