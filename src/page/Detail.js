import React, { useState, useEffect,useContext,Suspense } from 'react';
import { Redirect,Link,useParams } from 'react-router-dom'
import { v4 as uuidv4 } from "uuid";
import "../App.css"
import { Container,Row,Col,Button } from 'react-bootstrap'
import AppContext from '../AppContext.js'
const CardLoading = React.lazy(()=> import( '../components/Details/CardLoading'));
const CardMoves = React.lazy(()=> import( '../components/Details/CardMoves'));
const CardImages = React.lazy(()=> import( '../components/Details/Cardimages'));
const CardAbility = React.lazy(()=> import( '../components/Details/CardAbility'));
const Footer = React.lazy(()=> import( '../components/footer'));
const { CartContext } = AppContext;


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
  let params = useParams();
  const cart = window.localStorage.getItem('cart')
  const [pokemons, setPokemons] = useState(defaultProps)
  const [isLoading, setLoading]= useState(true)
  const apiUrl = 'https://pokeapi.co/api/v2/pokemon/';
  const props = useContext(CartContext)
  const [collection, setCollection] = useState([])
  const [isErrors ,setErrors] = useState(false)
  const [actions ,setActions] = useState(false)
  const [isSuccessCatch ,setSuccessCatch] = useState(false)
  const [isFormEdit , setEditForm] = useState(false)
  const [_id,setUid] = useState('null')
  useEffect(()=>{
    const fetchData = async () =>{
      try {
        const response = await fetch(`${apiUrl}${params.id}`)
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
      document.title = 'Pokemon '+pokemons.name
    }
    
    fetchData()

  },[params.id,pokemons.name])

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
      let uid = uuidv4()
      if (cart) {
        let data = {
          _id:uid,
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
          _id:uid,
          name: pokemons.name,
          id: pokemons.id,
          url: pokemons.url
        }]
        props.setCart(data.length)
        window.localStorage.setItem('cart',JSON.stringify(data))
        setSuccessCatch(true)
      }
      setUid(uid)
    } else {
      setSuccessCatch(false)
    }

  }


  return (
    <>
      <Container>
        <Suspense fallback={null}>
            <CardLoading isLoading={isLoading} />
        </Suspense>
      { (actions === true && isSuccessCatch ===false) ? 
        <>
        <Row className="justify-content-md-center">
          <Col lg={5}>
            <h3 className="h3 text-center"> Opps Failed Catch</h3>
          </Col>
        </Row>
        <Row className="justify-content-md-center">
          <Col lg={3}>
            <Link to="/" className="btn btn-block btn-light"> 
            <i class="fa fa-arrow-left" aria-hidden="true"></i>
            </Link>
          </Col>
        </Row>
        </>
      :
        null
      }
      { (actions === true && isSuccessCatch ===true && isFormEdit === false) ? 
        <>
          <Row className="justify-content-md-center mt-3">
            <Col lg={5}>
                <h3 className="h3 text-center"> Yay ..</h3>
                <h4 className="h4 text-center">i got a Pokemon</h4>
               
            </Col>
          </Row>
          <Row className="justify-content-md-center">
            <Col lg={2}>
              <Button  className="btn btn-block btn-light" onClick={()=>setEditForm(true)}> 
                Next <i class="fa fa-arrow-right" aria-hidden="true"></i>
                </Button>
            </Col>
          </Row>
        </>
      :
        null
      }
      { (!actions && !isSuccessCatch) ? 
        <>
        <Row>
          <Col lg={4}>
            <Suspense fallback={null}>
              <CardImages 
                name={pokemons.name} 
                sprites={pokemons.sprites} 
                types={pokemons.types} 
                collection={collection}
                index={_id}
                id={pokemons.id}
                onEdit={isFormEdit}
              />
            </Suspense>
          </Col>
          <Col lg={3}>
            <Suspense fallback={null}>
              <CardAbility 
                abilities={pokemons.abilities}
                height={pokemons.height}
                weight={pokemons.weight}
              />
            </Suspense>
          </Col>
        </Row>
        <Row>
        <Suspense fallback={null}>
          <CardMoves moves={pokemons.moves} />
          </Suspense>
        </Row>
        <Row className="justify-content-md-center">
          <Col md={1}>
            <div className="btn-rounded button_bottom" onClick={add}> 
              <img src="/icons8-pokeball-48.png" className="img-circle" alt="poke"/>
            </div>
            
          </Col>
        </Row>
        </>
      : null}
      {isFormEdit ?
        <>
         <Row>
           <Col lg={4}>
           <Suspense fallback={null}>
             <CardImages 
               name={pokemons.name} 
               sprites={pokemons.sprites} 
               types={pokemons.types} 
               collection={collection}
               index={_id}
               id={pokemons.id}
               onEdit={isFormEdit}
             />
             </Suspense>
           </Col>
           <Col lg={3}>
           <Suspense fallback={null}>
             <CardAbility abilities={pokemons.abilities}
                height={pokemons.height}
                weight={pokemons.weight}
              />
            </Suspense>
           </Col>
         </Row>
         <Row>
         <Suspense fallback={null}>
           <CardMoves moves={pokemons.moves} />
           </Suspense>
         </Row>
         </>
       :null}
      
    </Container>
    <Suspense fallback={null}>
      <Footer />
    </Suspense>
    </>
  );

}

export default Details;
