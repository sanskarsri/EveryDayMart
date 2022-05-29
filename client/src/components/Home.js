import React , {useState, useEffect} from 'react';
import Card from "./Card";
import Axios from "axios";

export default function Home({handleAddtocart,handleRemovefromcart,products,setproducts}){


    const handleonLoad = async () => {
        await Axios({
          method: "get",
          url: "/api/read/getdata",
        })
          .then((res) => {
            if (res.status === 200) {
              console.log("Details Fetched");
              setproducts(res.data.details)
            } 
          })
          .catch((err) => {
            console.log(err);
          });
      };

    useEffect(()=>{
        handleonLoad();
    },[]);

    return (<>
        <div className="container mt-5">
            {
                products && products.length>0 ?
                <div className='row mb-5 pt-3' >
                    {
                        products.map((ele,i)=>
                        <Card key={ele.id} img={ele.image} idx={i} price={ele.price} quantity={ele.quantity} title={ele.title} handleAddtocart={handleAddtocart} />
                        )
                    }
                </div>
                :null
            }
        </div>    
    </>);
}