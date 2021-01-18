import React, { useState, useEffect,createContext } from 'react';
import { Spinner,Row,Col,Container,Card,Badge } from 'react-bootstrap'
import { Link } from 'react-router-dom';

import "../App.css"
const { Provider,Consumer } = createContext();

const defaultProps = {
  count: 0,
  results:[]
}

// const BaseUrl ={
//   api:"https://pokeapi.co/api/v2/pokemon/",
//   images:"https://pokeres.bastionbot.org/images/pokemon/"
// }

function Home () {
  const [pokemons, setPokemons] = useState(defaultProps)
  const [page] = useState(1)
  const [offset] = useState(0)
  const [limit] = useState(12)
  const [isRefresh] = useState(false)
  const [isLoading, setLoading] = useState(true)
  const [isErrors, setErrors] = useState(false)
  
  

  useEffect(()=>{
    document.title ='Pokemon Web'
    const base_url = 'https://pokeapi.co/api/v2/pokemon/';
    

    const fetchData = async () =>{
      try {
        const response = await fetch(`${base_url}?offset=${offset}&limit=${limit}`)
        const data = await response.json()
        setPokemons(current=> {
          return(
            {
              ...data,
              pokemons: [...current.results,...data.results],
              count: data.count
            }
          )
        })
        setLoading(false)
      } catch (error) {
        setLoading(false)
        setErrors(true)
      }
    }
    
    fetchData()
  },[page,limit,offset,isRefresh])

  return (
    <Provider value={pokemons}>
      <Container>
        <Row className="justify-content-md-center">
          
          { isLoading ? 
            <Col lg={2}>
              <Spinner  animation="grow" /> 
            </Col>
          : null}

          { isErrors ? 
            <Col lg={4}>
              <span className="alert alert-danger"> Opps Something is wrong</span> 
            </Col>
          : null}
        </Row>
        <Row>
          <Col lg={12}>
             <CardPokemon />
          </Col>
        </Row>
      </Container>
    </Provider>
  );
}


function CardPokemon(){
  const [url] = useState(
    'https://pokeres.bastionbot.org/images/pokemon/'
  )
  

  function myTrim(x) {
    return x.replace('https://pokeapi.co/api/v2/pokemon/','');
  }
  
  function rewrite(r){
    return r.replace('/','.png')
  }

  return (
    <Container>
      <Row>
        <Consumer>
          {value => value.results.map((el,index)=> {
            return (
              <Col md={3} key={index}>
                <Link
                  to={{
                    pathname: "/detail",
                    search: "?name=" + el.name,
                    state: { fromDashboard: true }
                  }} >
                      
                      <Card className="mt-2 p-2 border-0 cards">
                        <img src={url +rewrite(myTrim(el.url))} alt={el.name} className="rounded img-card" />
                        <Card.Body className="p-2 text-center">
                          <Card.Title className="text text-center"> {el.name }</Card.Title>
                          <Card.Text className="text text-center">
                            <Badge className="badge badge-light"> OWNED </Badge>
                          </Card.Text>
                        </Card.Body>
                      </Card>
                  </Link>
              </Col>
            )
          })}
        </Consumer>
      </Row>
    </Container>
  )
}
export default Home;