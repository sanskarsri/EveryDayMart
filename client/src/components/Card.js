import React from 'react';

export default function Card({idx, ele,handleAddtocart}){

  const {serial,price,quantity,title,company,expiry,batch,packsize,gst} = ele;

    const obj={
      idx,
      serial,
      title,
      expiry,
      batch,
      packsize,
      gst,
      company,
      price: parseFloat(price),
      amount: parseFloat(price),
      quantity_selected: 1
    };

    return (<>
    {quantity > 0 ? 
    <div className='col-12 mt-3'>
      <div className="card p-3" >
      <div className="row m-0" >
        <div className="col-12 col-md-10">
        <div className="card-body p-0 d-flex flex-column">
          <div >
          <span className="card-title"><b>{title}</b></span>
          <span href="#" class="badge badge-info ml-4">{quantity}</span>
          </div>
          <div>
            {company}
          </div>
          <span className="card-text">&#8377; {price}</span>
        </div>
        </div>
        <div className='col-12 col-md-2'>
          <div className="d-flex align-items-center justify-content-center h-100">
          <p className="btn btn-primary badge-info mb-0" onClick={()=>handleAddtocart(obj)}>Add</p>
          </div>
        </div>
      </div>
      </div>
    </div>
    : null}
    </>);
}