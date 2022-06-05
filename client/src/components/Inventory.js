import React , {useEffect} from 'react';
import InventoryCard from "./InventoryCard";
import Axios from "axios";

export default function Inventory({inventoryproducts,setinventoryproducts}){

    
    const handleonLoad = async () => {
        await Axios({
          method: "get",
          url: "/api/read/getdata",
        })
          .then((res) => {
            if (res.status === 200) {
              console.log("Details Fetched");
              setinventoryproducts(res.data.details)
            } 
          })
          .catch((err) => {
            console.log(err);
          });
      };

    // const updateinventory = (index,val) => {
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

    const updateinventory = (x) => {
        setinventoryproducts(x)
    };

    const updateexcel = async () => {
        await Axios({
            method: "post",
            url: "/api/update",
            data:{
              inventory: inventoryproducts
            }
          })
            .then((res) => {
              if (res.status === 200) {
                alert("Successfully Updated")
                window.location.reload();
              } 
            })
            .catch((err) => {
              alert("Some Error occured Please close the excel sheet and refresh");
              console.log(err);
            });
    }

    useEffect(()=>{
        handleonLoad();
    },[]);

    return (<>
    <div className="container mt-5">
        <h2 style={{color:"#fff",paddingTop:"20px"}}>INVENTORY</h2>
        <div className='btn btn-light text-dark' onClick={()=>{updateexcel()}}>Update</div>
            {
                inventoryproducts && inventoryproducts.length>0 ?
                <div className='row mb-5 pt-3' >
                    {
                        inventoryproducts.map((ele,i)=>
                        <InventoryCard key={ele.id} ele={ele} idx={i} inventoryproducts={inventoryproducts} updateinventory={updateinventory} setinventoryproducts={setinventoryproducts} />
                        )
                    }
                </div>
                :null
            }
        </div> 
    </>);
}