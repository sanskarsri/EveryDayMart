import React from 'react';

export default function Card({idx, img,price,quantity,title,handleAddtocart}){

    const obj={
      idx,
      image:img,
      price: parseFloat(price),
      title,
      amount: parseFloat(price),
      quantity_selected: 1
    };

    return (<>
    {quantity > 0 ? 
    <div className='col-md-4 col-12 mt-3'>
      <div className="card" >
        <div className="product-imagebox">
          <img src={img} className="card-img-top product-img" alt={title} />
        </div>
        <div className="card-body d-flex flex-column align-items-center justify-content-center">
          <h5 className="card-title">{title}</h5>
          <span className="card-text my-3">&#8377; {price}</span>
          <p className="btn btn-primary w-fit" onClick={()=>handleAddtocart(obj)}>Add To Cart</p>
        </div>
      </div>
    </div>
    : null}
    </>);
}