import React, { useState,useRef,useEffect } from 'react';
import { Card,Badge,Row, Col } from 'react-bootstrap'
import '../../App.css'
function CardImages({name,sprites,types,collection,index,id,onEdit}){
  const [Iname, setName] = useState(name? name :null)
  const [active, setActive] =useState(onEdit)
  const [inIndex] =useState(index)
  
  let inputName = useRef()

  function findOwned(id){
    let find = collection.filter((c => c.id === parseInt(id)))
    return find.length;
  }
  function handleChange(event) {
    let value = event.target.value;
    //console.log(value)
    setName(value);
  }
  useEffect(() => {
    if (active) {
      inputName.current.focus();
    } else if(!active && onEdit) {

      updatedCollection()
    }
  }, [active,inIndex]);

  function updatedCollection(){
    let objIndex = collection.findIndex((obj => obj._id === index));

    //Log object to Console.
    console.log("Before update: ", collection[objIndex])

    //Update object's name property.
    collection[objIndex].name = Iname
    window.localStorage.setItem('cart',JSON.stringify(collection))
  }
  return (
    <Card className="col-lg-12 cards-detail">
      <img src={sprites.front_default }  alt={sprites.front_default } 
        className="rounded detail-img-card"/>
      
        {onEdit ?

            <div className="form-group row">
              <Col sm={9}>
                <input type="text" ref={inputName}
                onChange={handleChange}
                className="form-control" value={Iname}
                disabled={active ? false : true}
                />
              </Col>
              <Col sm={3}>
                <div className="btn btn-sm btn-light" onClick={()=>setActive(active ? false : true)}>
                  {active ? 'Save' :'Edit'}
                  <img
                    alt=""
                    src="/icons8-pencil-100.png"
                    width="25px"
                    height="auto"
                    />
                </div>
              </Col>
            </div>
        
          :
          <>
            <Card.Text className="text text-center">
              {name}
            </Card.Text>
          </> 
        }
        
        <Card.Text className="text text-center">
          <Badge className="badge badge-light"> OWNED {findOwned(id)} </Badge>
        </Card.Text>
        <Row>
          { types.map((t,index) => {
            return ( 
            <Col md={2}>
              <Badge key={index}  variant="primary" 
              className="p-2 mr-1">{t.type ? t.type.name :null} 
              </Badge>
              </Col>
            )
          })}
          
          
        </Row>

      
    </Card>
  )
}

export default CardImages;