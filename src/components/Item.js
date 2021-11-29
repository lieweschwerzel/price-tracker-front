import axios from 'axios'
import React from 'react'

function TrackedItem(props) {
    const deleteitemHandler = (title) => {
        axios.delete(`https://price-tracker-back.herokuapp.com/api/item/${title}`)
            .then(res => {
                console.log("Clicked from Grandchild");
                props.test();
            })
    }

    if (!props.item.mail ) {
        return (
            <div>
                <p>
                    <span>
                    </span>                            
                </p>
            </div>
        )
    }
    else {
        return (
            <div>
                <p> 
                   <button onClick={() => deleteitemHandler(props.item.title)} className="btn btn-outline-danger my-2 mx-2" style={{ borderRadius: '15px'}}>X</button>
                    <span style={{ fontWeight: 'bold, underline' , flex: 1, flexDirection: 'row'}}>
                        <img src={props.item.img_url} alt="ahimage" style={{width: '100px', height: '50%'}}/>
                       
                    {props.item.title}: €</span>{props.item.price}
                    
                    <hr></hr>
                </p>
            </div>
        )
    }


}

export default TrackedItem;