import { Card,Badge } from 'react-bootstrap'

function CardImages({name,sprites,types,collection}){
  
  function findOwned(name){
    let find = collection.filter((c => c.name === name ))
    return find.length;
  }

  return (
    <Card className="cards-detail">
      <img src={sprites.front_default }  alt={sprites.front_default } 
        className="rounded detail-img-card"/>
      <Card.Body>
        <Card.Text className="text text-center">
          {name}
        </Card.Text>
        <Card.Text className="text text-center">
          <Badge className="badge badge-light"> OWNED  {findOwned(name)} </Badge>
        </Card.Text>
        <Card.Text>
          Type :
        </Card.Text>

        { types.map((t,index) => {
          return <Badge key={index}  variant="primary" className="p-2 mr-1">{t.type ? t.type.name :null} </Badge>
        })}
      </Card.Body>
    </Card>
  )
}

export default CardImages;