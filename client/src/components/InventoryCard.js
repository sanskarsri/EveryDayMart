import React from 'react';

export default function InventoryCard({ele,idx,inventoryproducts,updateinventory,setinventoryproducts}){

    const {price,quantity,title,company,expiry,batch,packsize,gst} = ele;

    // const obj={
    //   idx,
    //   image:img,
    //   price: parseFloat(price),
    //   title,
    //   amount: parseFloat(price),
    //   quantity_selected: 1
    // };
    // const updateinv = (index,val) => {
    //     // var x=inventoryproducts;
    //     // x[index].title=val;
    //     // console.log(x)
    //     const x=[...inventoryproducts];
    //     x[index].title={
    //         ...inventoryproducts[index],
    //         title: val
    //     }
    //     setinventoryproducts(x);
    // };

    return (<>
    <div className='col-12 mt-3'>
      <div className="card p-3" >
      <div className="row m-0" >
        <div className="col-12 col-md-10">
        <div className="card-body p-0 d-flex flex-column">
          <div >
              <input type="text" value={title} 
            //   onChange={(e)=>{
            //      updateinv(idx,e.target.value);
            //   }} 
              />
          <span className="card-title">{title}</span>
          <span className="card-title">{company}</span>
          <span className="card-title">{expiry}</span>
          <span className="card-title">{batch}</span>
          <span className="card-title">{packsize}</span>
          <span className="card-title">{gst}</span>
          </div>
          <span className="card-text">&#8377; {price}</span>
        </div>
        </div>
        <div className='col-12 col-md-2'>
          <div className="d-flex align-items-center justify-content-center h-100">
          {/* <p className="btn btn-primary badge-info mb-0" onClick={()=>handleAddtocart(obj)}>Add To Cart</p> */}
          
          <span href="#" class="badge badge-info ml-4">{quantity}</span>
          </div>
        </div>
      </div>
      </div>
    </div>
    </>);
}