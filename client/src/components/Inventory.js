import React , {useEffect, useState} from 'react';
import InventoryCard from "./InventoryCard";
import Axios from "axios";

export default function Inventory(){

  const [inventoryproducts,setinventoryproducts] = useState([]);
  const [searchproducts,setsearchproducts] = useState([]);
    
    const handleonLoad = async () => {
        await Axios({
          method: "get",
          url: "/api/read/getdata",
        })
          .then((res) => {
            if (res.status === 200) {
              console.log("Details Fetched");
              setinventoryproducts(res.data.details)
              setsearchproducts(res.data.details)
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
    const [bool,setbool] = useState(true);

    useEffect(()=>{
        handleonLoad();
    },[]);

    useEffect(()=>{
      var temp=[];
      inventoryproducts.map((ele)=>{
        if(ele.title.toLowerCase().startsWith(searchText.toLocaleLowerCase()))
        {
          temp.push(ele);
        }
      })
      setsearchproducts(temp);
  },[searchText]);

  const updateval = (mode,val,idxm,idx) => {
    let x=inventoryproducts,y=searchproducts;
    setbool(false);
    switch(mode){
      case "title":
          x[idxm].title=val;
          y[idx].title=val;
          setinventoryproducts(x)
          setsearchproducts(y)
          console.log(x,y);
          break;
      
    }
    setinventoryproducts(x)
    setsearchproducts(y)
    setbool(true);
  }

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
                searchproducts && searchproducts.length>0 ?
                <div className='row mb-5 pt-3' >
                    {
                        bool && searchproducts.map((v,i)=>
                        (
                          <>
                            <div key={i} className='col-12 mt-3'>
                              <div className="card p-3" >
                              <div className="row m-0" >
                                <div className="col-12">
                                <div className="card-body p-0">
                                    <div className="row m-0">
                                  <div className="col-12 col-md-6">
                                      <div className='d-flex justify-content-between form__group'>
                                      <b>Name: </b>
                                      <input type="text" className="form__field"  value={v.title} 
                                      onChange={(e)=>{
                                        // settitle(e.target.value);
                                        updateval("title",e.target.value,v.serial-1,i)
                                      }} 
                                      />
                                      </div>
                                  </div>
                                  <div className="col-12 col-md-6">
                                      <div className='d-flex justify-content-between form__group'>
                                      <b>Company Name: </b> 
                                      <input type="text" className="form__field"  value={v.company} 
                                      onChange={(e)=>{
                                        // setcompany(e.target.value);
                                      }} 
                                      />
                                  </div>
                                  </div>
                                  <div className="col-12 col-md-6">
                                      <div className='d-flex justify-content-between form__group'>
                                      <b>Expiry Date: </b> 
                                      <input type="text" className="form__field"  value={v.expiry} 
                                      onChange={(e)=>{
                                        // setexpiry(e.target.value);
                                      }} 
                                      />
                                  </div>
                                  </div>
                                  <div className="col-12 col-md-6">
                                      <div className='d-flex justify-content-between form__group'>
                                      <b>Batch Num: </b> 
                                      <input type="text" className="form__field"  value={v.batch} 
                                      onChange={(e)=>{
                                        // setbatch(e.target.value);
                                      }} 
                                      />
                                  </div>
                                  </div>
                                  <div className="col-12 col-md-6">
                                      <div className='d-flex justify-content-between form__group'>
                                      <b>Pack Size: </b> 
                                      <input type="text" className="form__field"  value={v.packsize} 
                                      onChange={(e)=>{
                                        // setpacksize(e.target.value);
                                      }} 
                                      />
                                  </div>
                                  </div>
                                  <div className="col-12 col-md-6">
                                      <div className='d-flex justify-content-between form__group'>
                                      <b>GST : </b> 
                                      <input type="text" className="form__field"  value={v.gst} 
                                      onChange={(e)=>{
                                        // setgst(e.target.value);
                                      }} 
                                      />
                                  </div>
                                  </div>
                                  <div className="col-12 col-md-6">
                                      <div className='d-flex justify-content-between form__group'>
                                      <b>Price : </b> 
                                      <input type="text" className="form__field"  value={v.price} 
                                      onChange={(e)=>{
                                        // setprice(e.target.value);
                                      }} 
                                      />
                                  </div>
                                  </div>
                                  <div className="col-12 col-md-6">
                                      <div className='d-flex justify-content-between form__group'>
                                      <b>Quantity Available: </b> 
                                      <input type="text" className="form__field"  value={v.quantity} 
                                      onChange={(e)=>{
                                        // setquantity(e.target.value);
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
                            </>
                        //   <>
                        // <InventoryCard key={i} ele={v} idx={i} inventoryproducts={inventoryproducts} 
                        // // updateinventory={updateinventory} 
                        // />
                        // </>

                        ))
                    }
                </div>
                :null
            }
        </div> 
    </>);
}