import React , {useEffect, useState} from 'react';
import InventoryCard from "./InventoryCard";
import Axios from "axios";

export default function Inventory(){

  const [inventoryproducts,setinventoryproducts] = useState([]);
    
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

    const [searchText,setsearchText] = useState("");

    useEffect(()=>{
        handleonLoad();
    },[]);

    return (<>
    <div className="container mt-5">
      <div className='d-flex justify-content-between align-items-center pt-3'>
        <h2 className="w-fit" style={{color:"#fff",paddingTop:"20px"}}>INVENTORY</h2>
        <div className='btn btn-light text-dark w-fit' onClick={()=>{updateexcel()}}>Update</div>
        </div>
        <div className="d-flex flex-column align-items-center my-3">
          <input type="text" value={searchText} onChange={(e)=>setsearchText(e.target.value)} className="form__field" style={{borderBottom:"2px solid #fff",color:"#fff",width:"50%"}} placeholder="Search" />
        </div>
            {
                inventoryproducts && inventoryproducts.length>0 ?
                <div className='row mb-5 pt-3' >
                    {
                        inventoryproducts
                        .filter((ele) => {
                          if (searchText === "") return ele;
                          else if (
                            ele.title
                              .toLowerCase()
                              .startsWith(searchText.toLowerCase())
                          ) {
                            // console.log(ele);
                            return ele;
                          }
                        }).map((ele,i)=>
                        (
                          <>
                          {console.log(i,ele)}
                        <InventoryCard key={i} ele={ele} idx={i} inventoryproducts={inventoryproducts} updateinventory={updateinventory} />
                        </>
                        ))
                    }
                </div>
                :null
            }
        </div> 
    </>);
}