import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container,Row,Card,Col,Button } from 'react-bootstrap'

class Example extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      pokemon:[],
      message:''
    }
  }
  componentDidMount(){
    const apiUrl = 'https://pokeapi.co/api/v2/pokemon?offset=10&limit=10';
  
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        this.setState({ pokemon : data.results })
        this.setState({ count : data.count })
        this.setState({ message:' message Hello'})
      });
  }
  render() {
    return (
      <Container>
        <Row>
          <div>
            <h3> Count Pokemon { this.state.count} </h3>
            <Col>
              { this.state.pokemon.map(data => {
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
      
    );
  }

}

export default Example