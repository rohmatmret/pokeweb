import React, { useState, useEffect,Suspense } from 'react';
import { Spinner,Row,Col,Container,Button } from 'react-bootstrap'
import "../App.css"
import 'font-awesome/css/font-awesome.min.css';

const PokemonList = React.lazy(()=> import('../components/Pokemons/PokemonList'));
const Footer = React.lazy(()=> import('../components/footer'));


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

  const loadMore =()=> {
    setLoading(true)
    setLimit(prevState => prevState + defaultView)
  }

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
            <Suspense fallback={<div>Loading...</div>}>
                <PokemonList pokemons={pokemons.results} url={BaseUrl.images}/>
            </Suspense>
          </Col>
        </Row>
        <Row className="justify-content-md-center mt-3">
          <Col md={2}>
            <Button className="btn btn-block btn-light" onClick={loadMore}>
              <i className="fa fa-arrow-circle-down" aria-hidden="true"></i> {isLoading ? "Loading":"Load More"}
            </Button>
          </Col>

        </Row>
      </Container>
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </>
  );
}

export default Home;