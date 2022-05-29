import react,{useState, useEffect} from "react";
import CloseIcon from '@mui/icons-material/Close';

export default function CartCard({idx,products,obj,cart,setCart,id,setbool,handleRemovefromcart}){

    const [count,setcount]=useState(obj.quantity_selected);
    const [itemamount,setitemamount]=useState(Math.round(products[idx].price*count * 100) / 100);
    function handleChangeCount(value){
        if(value<=0)
        {
            setcount(0);
        }
        else if(value<=products[idx].quantity)
        {
            setcount(value);
        }
        else{
            alert(`Only ${products[idx].quantity} items are present of ${products[idx].title} in stock`)
        }
    }
    function handleinc(){
        handleChangeCount(count+1);
    }
    function handledec(){
        handleChangeCount(count-1);
    }
    useEffect(()=>{
        setitemamount(Math.round(products[idx].price*count * 100) / 100);
        var temp=cart;
        temp[id].quantity_selected=count;
        temp[id].amount=itemamount;
        console.log("temp",temp)
        setbool(true);

        setCart(temp);
        console.log("cart",cart)
    },[count,itemamount])

    return (
        <>
            <div className="card cartcard flex-row row m-0 py-3 mt-2">
                {/* <div className="col-12 col-md-1"></div> */}
                <div className="col-12 col-md-4 d-flex justify-content-center">
                    <img className="card-img-top" src={products[idx].image} alt={products[idx].title} />
                </div>
                <div style={{cursor:"pointer",position:"absolute",top:"2%",right:"2%",zIndex:"10000"}} onClick={()=>handleRemovefromcart(obj)}>
                    <CloseIcon />
                </div>
                <div className="col-12 col-md-8">
                    <div className="card-body py-0">
                      <h5 className="card-title">{products[idx].title}</h5>
                      <p className="card-text"><b>Price:</b> &#8377; {products[idx].price}</p>
                      <div className="btn-group" role="group" aria-label="Basic example">
                        <button type="button" className="btn btn-secondary" onClick={handledec}>-</button>
                        <input type="text" value={count} className="btn text-dark" onChange={(ele)=>handleChangeCount(ele.target.value)} />
                        <button type="button" className="btn btn-secondary" onClick={handleinc}>+</button>
                      </div>
                      <div className="d-flex justify-content-end mt-3">
                          <div className="btn btn-secondary">&#8377; {itemamount}</div>
                      </div>
                    </div>
                </div>
            </div>
        </>
    )
};