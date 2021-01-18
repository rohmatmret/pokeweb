import { Col,Badge } from 'react-bootstrap'

function CardMoves({moves}){
  return (
    <>
      <Col lg={12} className="mt-2">
        <h4 className="h4">Moves</h4>
          { moves.map((m,index) => {
            return <Badge key={index} pill variant="light" className="p-2 m-1">
              {m.move ? m.move.name :null}
            </Badge>
          })}
      </Col>
    </>
  )
}

export default CardMoves;