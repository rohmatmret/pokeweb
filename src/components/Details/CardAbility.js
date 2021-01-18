import { Row,Col,Badge } from 'react-bootstrap'

function CardAbility({abilities}){
  return (
    <>
      <h4 className="h4">Ability</h4>
      { abilities.map((g,index) => {
        return <Badge key={index} pill variant="light" className="p-2 m-1">{g.ability ? g.ability.name :null} </Badge>
      })}
    
      <Row>
        <Col>
        <Badge>Height : {abilities.height}</Badge>
        <Badge>Weight : {abilities.weight}</Badge>
        </Col>
      </Row>
    </>
  )
}


export default CardAbility