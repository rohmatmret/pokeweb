import React, { useState,useRef,useEffect } from 'react';
import { Card,Badge,Row, Col,Button } from 'react-bootstrap'
import '../../App.css'
import 'font-awesome/css/font-awesome.min.css';
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
      
      function updatedCollection(){
        let objIndex = collection.findIndex((obj => obj._id === index));
        collection[objIndex].name = Iname
        window.localStorage.setItem('cart',JSON.stringify(collection))
      }
      updatedCollection()
    }
  }, [Iname,active,inIndex,index,onEdit,collection]);

  return (
    <Card className="cards-detail">
      <img src={sprites.front_default }  alt={sprites.front_default } 
        className="rounded detail-img-card"/>
      
        { onEdit ?
            <div className="form-group row">
              <Col lg={10}>
                <input type="text" ref={inputName}
                onChange={handleChange}
                className="form-control" value={Iname}
                disabled={active ? false : true}
                />
              </Col>
              <Col lg={2}>
                <Button className="btn btn-block btn-light" onClick={()=>setActive(active ? false : true)}>
                  <i className="fa fa-pencil" aria-hidden="true"></i> 
                </Button>
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
        <Row className="justify-content-md-center">
          { types.map((t,index) => {
            return ( 
              <Col md={3}>
                <Badge key={index} pill  variant="primary" 
                  className="p-2 mr-2">{t.type ? t.type.name :null} 
                </Badge>
              </Col>
            )
          })}
          
          
        </Row>

      
    </Card>
  )
}

export default CardImages;