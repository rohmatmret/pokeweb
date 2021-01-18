import { Spinner,Row,Col } from 'react-bootstrap'

function CardLoading ({isLoading}) {
  
  return (
    <>
      <Row className="justify-content-md-center">
        <Col lg={1}>
          { isLoading ? <Spinner  animation="grow" /> : null}
        </Col>
      </Row>
    </>
  )
}

export default CardLoading