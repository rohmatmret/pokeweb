import { Container,Row,Card,Col,Button } from 'react-bootstrap'

const PokemonList = ({pokemons,count}) =>{
  return (
    <Container>
      <Row>
        <div>
          <h3> Count Pokemon { count} </h3>
          <Col>
            { pokemons && pokemons.map(data => {
              return (
                <Card>
                  <Card.Body>
                    <Card.Title>Card {data.name }</Card.Title>
                    <Card.Text>
                      Some quick example text to build on the card title and make up the bulk of
                      the card's content.
                    </Card.Text>
                    <Button variant="primary">Go somewhere</Button>
                  </Card.Body>
                </Card>
              )
            })}
          </Col>
        </div>
      </Row>
    </Container>
  )
}

export default PokemonList;