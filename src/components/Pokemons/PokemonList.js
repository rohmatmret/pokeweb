import { Row, Col,Container,Card,Badge} from 'react-bootstrap'
import { Link } from 'react-router-dom';

const PokemonList =({pokemons,url,collection})=> {

  function myTrim(x) {
    return x.replace('https://pokeapi.co/api/v2/pokemon/','');
  }
  
  function rewrite(r){
    return r.replace('/','.png')
  }
  
  function findOwned(name){
    console.log('find id '+ name)
    let find = collection.filter((c => c.name === name ))
    return find.length;
  }

  return (
    <>
      <Container>
        <Row>
            {pokemons.map((el,index)=> {
              return (
                <Col md={3} key={index}>
                  <Link
                    to={{
                      pathname: "/detail",
                      search: "?name=" + el.name,
                      state: { fromDashboard: true }
                    }} >
                        
                        <Card className="mt-2 p-2 border-0 cards">
                          <img src={url +rewrite(myTrim(el.url))} alt={el.name} className="img-rounded img-card" />
                          <Card.Body className="p-2 text-center">
                            <Card.Text className="text text-center capitalize"> {el.name }</Card.Text>
                            <Card.Text className="text text-center">
                              <Badge className="badge badge-light"> OWNED  {findOwned(el.name)} </Badge>
                            </Card.Text>
                          </Card.Body>
                        </Card>
                    </Link>
                </Col>
              )
            })}
        </Row>
      </Container>
    </>
  )
}

export default PokemonList