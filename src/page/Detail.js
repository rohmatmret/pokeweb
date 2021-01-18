import React, { useState, useEffect,useContext } from 'react';
import { useLocation } from 'react-router-dom'
import { Spinner,Row,Col,Card,Container,Badge,Button } from 'react-bootstrap'
import "../App.css"
import AppContext from '../AppContext.js'
const { CartContext } = AppContext;


function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const defaultProps = {
  id:0,
  url:'',
  name:'',
  abilities:[],
  form:{},
  game_indices:[],
  species:{},
  base_experience:0,
  sprites:{},
  moves:[],
  types:[]
}


function Details () {
  let query = useQuery();
  let name  =  query.get('name')
  const [pokemons, setPokemons] = useState(defaultProps)
  const [isLoading, setLoading]= useState(true)
  const apiUrl = 'https://pokeapi.co/api/v2/pokemon/';
  const props = useContext(CartContext)
  useEffect(()=>{
    document.title = 'Pokemon ' + query.get('name')
    const fetchData = async () =>{
      try {
        const response = await fetch(`${apiUrl}${name}`)
        const data = await response.json()
        
        setPokemons(prevState => ({
          ...data,           // copy all other field/objects
          id:data.id,
          name:data.name,
          url:data.url,
          abilities:data.abilities,
          game_indices:data.game_indices,
          species: data.species,
          base_experience:data.base_experience,
          sprites: data.sprites,
          moves: data.moves,
          types:data.types,
        }));
        setLoading(false)
      } catch (error) {
        setLoading(false)
        console.log(error)
      }
    }
    
    fetchData()
  },[ query,name])
  const add = ()=> {
    const cart = window.localStorage.getItem('cart')
    if (cart) {
      let data = {
        name:pokemons.name,
        id: pokemons.id,
        url: pokemons.url
      }
      let incart = JSON.parse(cart)

      if (incart){
        //incart.push(data)
        console.log(typeof incart)
        console.log('data cart' ,JSON.stringify(incart))
        incart.push(data)
        window.localStorage.setItem('cart',JSON.stringify(incart))  
        props.setCart(incart.length)
      }
      // incart.push(data)
    } else {
      let data = [{
        name: pokemons.name,
        id: pokemons.id,
        url: pokemons.url
      }]
      props.setCart(data.length)
      window.localStorage.setItem('cart',JSON.stringify(data))

    }

  }

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col lg={1}>
          { isLoading ? <Spinner  animation="grow" /> : null}
        </Col>
      </Row>
      <Row>
        <Col lg={4}>
          <Card className="cards-detail">
            <img src={pokemons.sprites.front_default }  alt={pokemons.sprites.front_default } className="rounded detail-img-card"/>
            <Card.Body>
              <Card.Text>
                <p className="h2 text-center">{pokemons.name} </p>
              </Card.Text>
              <Card.Text>
              { pokemons.types.map((t,index) => {
                return <Badge key={index}pill variant="primary" className="p-3 m-1">{t.type ? t.type.name :null} </Badge>
              })}
              </Card.Text>
            </Card.Body>
            
            <Card.Body>
            </Card.Body>
          </Card>
        </Col>
        <Col lg={3}>
          <h4 className="h4">Ability</h4>
            { pokemons.abilities.map((g,index) => {
              return <Badge key={index} pill variant="light" className="p-2 m-1">{g.ability ? g.ability.name :null} </Badge>
            })}
          
        </Col>
        <Col lg={4}>
          <h4 className="h4">Moves</h4>
            { pokemons.moves.map((m,index) => {
              return <Badge key={index} pill variant="dark" className="p-2 m-1">
                {m.move ? m.move.name :null}
              </Badge>
            })}
        </Col>
        {/* <Col>
          <h4 className="h4">Experiences</h4>
          <span className="score"> { pokemons.base_experience } </span>
        </Col> */}
      </Row>
      <Row>
        <div className="button_bottom">
          <Button className="btn" onClick={add}> 
            <img src="/icons8-pokeball-48.png"  alt="poke"/> 
            <br/>
            CATCH
          </Button>
          
        </div>
      </Row>
    </Container>
  );

}

export default Details;
