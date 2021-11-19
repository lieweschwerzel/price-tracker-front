import React, { useState, useEffect } from 'react';
import './App.css';
import ItemView from './components/ItemListView';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  const [ItemList, setItemList] = useState([{}])
  const [title, setTitle] = useState('')
  const [mail, setMail] = useState('')
  const [msg, setMsg] = useState(false)
  const [loading, setIsLoading] = useState(false)

  // Read all items by mail
  useEffect(() => {
    document.title = "AH Price Tracker"
    if (mail !== '') {
      axios.get(`https://price-tracker-back.herokuapp.com/api/item/${mail}`)
        .then(res => {
          setItemList(res.data)
        })
    }
  }, [mail, msg]);

  // Post an item
  const addItemHandler = () => {
    console.log("mail: " + mail)
    console.log("title: " + title)
    if (mail && title !== '') {
      console.log("added")
      setIsLoading(true)
      axios.post('https://price-tracker-back.herokuapp.com/api/item/', { 'mail': mail, 'title': title, 'price': 'none' })
        .then(res => {
          setItemList([...ItemList, res.data])
          setIsLoading(false)
        });
    }
    else console.log("not added")
  }

  const changeMessage = () => {
    msg ? setMsg(false) : setMsg(true)
  }

  return (
    <div className="App list-group-item  justify-content-center align-items-center mx-auto" style={{ "width": "400px", "backgroundColor": "white", "marginTop": "15px" }} >
      <h1 className="card text-white bg-primary mb-1" styleName="max-width: 20rem;">Price Tracker</h1>
      <h6 className="card text-white bg-primary mb-3">never miss an offer</h6>
      <div className="card-body">
        <h5 className="card text-white bg-dark mb-2">Your Email</h5>
        <span className="card-text">
          <input className="mb-3 form-control desIn" onChange={event => setMail(event.target.value)} placeholder='Email' required />
        </span>
        <h5 className="card text-white bg-dark mb-2">Add Your Product</h5>
        <span className="card-text">
          <input type="text" className="mb-3 form-control titleIn" onChange={event => setTitle(event.target.value)} placeholder='Title' required />
          <button className="btn btn-outline-primary mx-2 mb-4" style={{ 'borderRadius': '50px', "fontweight": "bold" }} onClick={addItemHandler} disabled={loading}>
            {loading && (<i className="fa fa-refresh fa-spin" style={{ marginRight: "5px" }} />)}
            {loading && <span>Adding..</span>}
            {!loading && <span>Add</span>}
          </button>
        </span>
        <h5 className="card text-white bg-primary mb-5">Your watched Products</h5>
        <div >
          <ItemView test={changeMessage} ItemList={ItemList} />
        </div>
      </div>
      <h6 className="card text-dark py-1 mb-0" >Copyright 2021, All rights reserved &copy;</h6>
    </div>
  );
}

export default App;