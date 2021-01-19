import { Row,Col,Badge } from 'react-bootstrap'

function CardAbility({abilities,height,weight}){
  return (
    <>
      <h4 className="h4">Ability</h4>
      { abilities.map((g,index) => {
        return <Badge key={index} pill variant="light" className="p-2 m-1">{g.ability ? g.ability.name :null} </Badge>
      })}
    
      <Row>
        <Col>
          <Badge pill variant="light" className="p-2">Height : {height}</Badge>
          <Badge pill variant="light" className="p-2">Weight : {weight}</Badge>
        </Col>
      </Row>
    </>
  )
}


export default CardAbility