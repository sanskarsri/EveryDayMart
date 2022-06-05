import React, { useState,useEffect } from 'react';
import './InventoryCard.css';

export default function InventoryCard({ele,idx,inventoryproducts}){ // ,updateinventory

    // const {price,quantity,title,company,expiry,batch,packsize,gst} = ele;
    const [title,settitle] = useState(ele.title);
    const [price,setprice] = useState(ele.price);
    const [quantity,setquantity] = useState(ele.quantity);
    const [company,setcompany] = useState(ele.company);
    const [expiry,setexpiry] = useState(ele.expiry);
    const [batch,setbatch] = useState(ele.batch);
    const [packsize,setpacksize] = useState(ele.packsize);
    const [gst,setgst] = useState(ele.gst);

    useEffect(()=>{
        const obj={
          serial: ele.serial,
          price,
          quantity,
          title, 
          company,
          expiry,
          batch,
          packsize,
          gst
      }

      var x=inventoryproducts;
      x[ele.serial -1]=obj;
      // updateinventory(x);

    },[price,quantity,title,company,expiry,batch,packsize,gst])


    return (<>
    <div className='col-12 mt-3'>
      <div className="card p-3" >
      <div className="row m-0" >
        <div className="col-12">
        <div className="card-body p-0">
            <div className="row m-0">
          <div className="col-12 col-md-6">
              <div className='d-flex justify-content-between form__group'>
              <b>Name: </b>
              <input type="text" className="form__field"  value={title} 
              onChange={(e)=>{
                settitle(e.target.value);
              }} 
              />
              </div>
          </div>
          <div className="col-12 col-md-6">
              <div className='d-flex justify-content-between form__group'>
              <b>Company Name: </b> 
              <input type="text" className="form__field"  value={company} 
              onChange={(e)=>{
                setcompany(e.target.value);
              }} 
              />
          </div>
          </div>
          <div className="col-12 col-md-6">
              <div className='d-flex justify-content-between form__group'>
              <b>Expiry Date: </b> 
              <input type="text" className="form__field"  value={expiry} 
              onChange={(e)=>{
                setexpiry(e.target.value);
              }} 
              />
          </div>
          </div>
          <div className="col-12 col-md-6">
              <div className='d-flex justify-content-between form__group'>
              <b>Batch Num: </b> 
              <input type="text" className="form__field"  value={batch} 
              onChange={(e)=>{
                setbatch(e.target.value);
              }} 
              />
          </div>
          </div>
          <div className="col-12 col-md-6">
              <div className='d-flex justify-content-between form__group'>
              <b>Pack Size: </b> 
              <input type="text" className="form__field"  value={packsize} 
              onChange={(e)=>{
                setpacksize(e.target.value);
              }} 
              />
          </div>
          </div>
          <div className="col-12 col-md-6">
              <div className='d-flex justify-content-between form__group'>
              <b>GST : </b> 
              <input type="text" className="form__field"  value={gst} 
              onChange={(e)=>{
                setgst(e.target.value);
              }} 
              />
          </div>
          </div>
          <div className="col-12 col-md-6">
              <div className='d-flex justify-content-between form__group'>
              <b>Price : </b> 
              <input type="text" className="form__field"  value={price} 
              onChange={(e)=>{
                setprice(e.target.value);
              }} 
              />
          </div>
          </div>
          <div className="col-12 col-md-6">
              <div className='d-flex justify-content-between form__group'>
              <b>Quantity Available: </b> 
              <input type="text" className="form__field"  value={quantity} 
              onChange={(e)=>{
                setquantity(e.target.value);
              }} 
              />
          </div>
          </div>

            </div>
          {/* <span className="card-title">{title}</span>
          <span className="card-title">{company}</span>
          <span className="card-title">{expiry}</span>
          <span className="card-title">{batch}</span>
          <span className="card-title">{packsize}</span>
          <span className="card-title">{gst}</span>
          <span className="card-text">&#8377; {price}</span> */}
        </div>
        </div>
      </div>
      </div>
    </div>
    </>);
}