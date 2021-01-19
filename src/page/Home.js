import React, { useState, useEffect } from 'react';
import { Spinner,Row,Col,Container,Button } from 'react-bootstrap'

import PokemonList from '../components/Pokemons/PokemonList'
import Footer from '../components/footer'
import "../App.css"

const defaultProps = {
  count: 0,
  results:[]
}

const baseUrl = { 
  endpoint:"https://pokeapi.co/api/v2/pokemon/",
  images:"https://pokeres.bastionbot.org/images/pokemon/"
}


function Home () {
  let defaultView = 12;
  const [pokemons, setPokemons] = useState(defaultProps)
  const [offset] = useState(0)
  const [limit,setLimit] = useState(defaultView)
  const [isLoading, setLoading] = useState(true)
  const [isErrors, setErrors] = useState(false)
  
  const [BaseUrl] = useState(baseUrl)
  
  useEffect(()=>{
    document.title ='Pokemon Web'
    
    const fetchData = async () =>{
      try {
        const response = await fetch(`${BaseUrl.endpoint}?offset=${offset}&limit=${limit}`)
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
  },[limit,offset,BaseUrl.endpoint,BaseUrl.images])

  

  return (
    <>
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
              <PokemonList pokemons={pokemons.results} url={BaseUrl.images}/>
          </Col>
        </Row>
        <Row className="justify-content-md-center mt-3 p-3">
          <Col lg={2}>
            <Button className="btn btb-block btn-light" onClick={()=>setLimit(prevState => prevState + defaultView)}>
              Load more
            </Button>
          </Col>

        </Row>
      </Container>
      <Footer />
    </>
  );
}

export default Home;