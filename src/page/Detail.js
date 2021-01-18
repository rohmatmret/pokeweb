import React, { useState, useEffect,useContext } from 'react';
import { Redirect, useLocation } from 'react-router-dom'
import "../App.css"
import { Container,Row,Col } from 'react-bootstrap'
import AppContext from '../AppContext.js'
import CardLoading from '../components/Details/CardLoading'
import CardMoves from '../components/Details/CardMoves'
import CardImages from '../components/Details/Cardimages'
import CardAbility from '../components/Details/CardAbility'
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
  types:[],
  versions:[]
}


function Details () {
  let query = useQuery();
  let name  =  query.get('name')
  const cart = window.localStorage.getItem('cart')
  const [pokemons, setPokemons] = useState(defaultProps)
  const [isLoading, setLoading]= useState(true)
  const apiUrl = 'https://pokeapi.co/api/v2/pokemon/';
  const props = useContext(CartContext)
  const [collection, setCollection] = useState([])
  const [isErrors ,setErrors] = useState(false)
  const [actions ,setActions] = useState(false)
  const [isSuccessCatch ,setSuccessCatch] = useState(false)
  
  useEffect(()=>{
    document.title = 'Pokemon ' + query.get('name')
    const fetchData = async () =>{
      try {
        const response = await fetch(`${apiUrl}${name}`)
        const data = await response.json()
        
        setPokemons(prevState => ({
          ...data,           
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
          versions:data.sprites.versions
        }));
        setLoading(false)
        console.log('setloadiing false')
      } catch (error) {
        setLoading(false)
        console.log('setloadiing false')
        setErrors(true)
      }
    }
    
    fetchData()

  },[])

  useEffect(()=>{
    const fetchCart = () =>{
      if(cart){
        let incart = JSON.parse(cart)
        setCollection((e=>incart))
      }
    }
    fetchCart()
  },[cart])

  if (isErrors) {
    return <Redirect to='/' />
  }
  const add = ()=> {
    //success probability is 50%
    setActions(true)
    let isSuccess = Math.random() < 0.5 ? true : false;
    if (isSuccess) {
      
      if (cart) {
        let data = {
          name:pokemons.name,
          id: pokemons.id,
          url: pokemons.url
        }
        let incart = JSON.parse(cart)
  
        if (incart){
          incart.push(data)
          window.localStorage.setItem('cart',JSON.stringify(incart))  
          props.setCart(incart.length)
        }
        setSuccessCatch(true)
      } else {
        let data = [{
          name: pokemons.name,
          id: pokemons.id,
          url: pokemons.url
        }]
        props.setCart(data.length)
        window.localStorage.setItem('cart',JSON.stringify(data))
        setSuccessCatch(true)
      }
    } else {
      setSuccessCatch(false)
    }

  }


  return (
    <Container>
      <CardLoading isLoading={isLoading} />
      <Row>
        <Col lg={4}>
          <CardImages name={pokemons.name} sprites={pokemons.sprites} types={pokemons.types} collection={collection}/>
        </Col>
        <Col lg={3}>
          <CardAbility abilities={pokemons.abilities}/>
        </Col>
      </Row>
      <Row>
        <CardMoves moves={pokemons.moves} />
      </Row>
      <Row className="justify-content-md-center">
        <Col md={1}>
          <div className="btn-rounded button_bottom" onClick={add}> 
            <img src="/icons8-pokeball-48.png" className="img-circle" alt="poke"/>
          </div>
          
        </Col>
      </Row>
    </Container>
  );

}

export default Details;
