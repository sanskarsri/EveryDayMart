import React, { useState,useEffect } from 'react';
import './InventoryCard.css';

export default function InventoryCard({ele,inventoryproducts,updateinventory}){

    // const {price,quantity,title,company,expiry,batch,packsize,gst} = ele;
  //  console.log(ele)
  
    const [title,settitle] = useState();
    const [price,setprice] = useState();
    const [quantity,setquantity] = useState();
    const [company,setcompany] = useState();
    const [expiry,setexpiry] = useState();
    const [batch,setbatch] = useState();
    const [packsize,setpacksize] = useState();
    const [gst,setgst] = useState();
    const [obj,setobj] = useState();
    
    useEffect(()=>{
      settitle(ele.title);
      setprice(ele.price);
      setquantity(ele.quantity);
      setcompany(ele.company);
      setexpiry(ele.expiry);
      setbatch(ele.batch);
      setpacksize(ele.packsize);
      setgst(ele.gst);
      setobj(ele);
    },[ele])
      

    // console.log(price,quantity,title,company,expiry,batch,packsize,gst);

    function handleChange(name,value) {
      // const { name, value } = event.target;
      // console.log(name,value);
      setobj(prevobj => {
        return {
          ...prevobj,
          [name]: value
        };
      });
    }

    useEffect(()=>{
      if(obj)
      {
      var x=inventoryproducts;
      x[obj.serial-1]=obj;
      updateinventory(x);
      }
    },[obj])


    // useEffect(()=>{
        // const obj={
        //     price,
        //     quantity,
        //     title,
        //     company,
        //     expiry,
        //     batch,
        //     packsize,
        //     gst
        // }

        // var x=inventoryproducts;
        // x[idx]=obj;
        // updateinventory(x);
        // setinventoryproducts(x);
        // console.log(inventoryproducts);

    // },[price,quantity,title,company,expiry,batch,packsize,gst])

    return (<>
    <div className='col-12 mt-3'>
      <div className="card p-3" >
      <div className="row m-0" >
        <div className="col-12">
        <div className="card-body p-0">
            <div className="row m-0">
          <div className="col-12 col-md-6 inventory_card">
              <div className='d-flex form__group'>
              <b>Name: </b>
              <input type="text" className="form__field"  value={obj?obj.title:null} 
              onChange={(e)=>{
                handleChange("title",e.target.value)
              }} 
              />
              </div>
          </div>
          <div className="col-12 col-md-6 inventory_card">
              <div className='d-flex form__group'>
              <b>Company Name: </b> 
              <input type="text" className="form__field"  value={obj?obj.company:null} 
              onChange={(e)=>{
                handleChange("company",e.target.value)
              }} 
              />
          </div>
          </div>
          <div className="col-12 col-md-6 inventory_card">
              <div className='d-flex form__group'>
              <b>Expiry Date: </b> 
              <input type="text" className="form__field"  value={obj?obj.expiry:null} 
              onChange={(e)=>{
                handleChange("expiry",e.target.value)
              }} 
              />
          </div>
          </div>
          <div className="col-12 col-md-6 inventory_card">
              <div className='d-flex form__group'>
              <b>Batch Num: </b> 
              <input type="text" className="form__field"  value={obj?obj.batch:null} 
              onChange={(e)=>{
                handleChange("batch",e.target.value)
              }} 
              />
          </div>
          </div>
          <div className="col-12 col-md-6 inventory_card">
              <div className='d-flex form__group'>
              <b>Pack Size: </b> 
              <input type="text" className="form__field"  value={obj?obj.packsize:null} 
              onChange={(e)=>{
                handleChange("packsize",e.target.value)
              }} 
              />
          </div>
          </div>
          <div className="col-12 col-md-6 inventory_card">
              <div className='d-flex form__group'>
              <b>GST : </b> 
              <input type="text" className="form__field"  value={obj?obj.gst:null} 
              onChange={(e)=>{
                handleChange("gst",e.target.value)
              }} 
              />
          </div>
          </div>
          <div className="col-12 col-md-6 inventory_card">
              <div className='d-flex form__group'>
              <b>Price : </b> 
              <input type="text" className="form__field"  value={obj?obj.price:null} 
              onChange={(e)=>{
                handleChange("price",e.target.value)
              }} 
              />
          </div>
          </div>
          <div className="col-12 col-md-6 inventory_card">
              <div className='d-flex form__group'>
              <b>Quantity Available: </b> 
              <input type="text" className="form__field"  value={obj?obj.quantity:null} 
              onChange={(e)=>{
                handleChange("quantity",e.target.value)
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