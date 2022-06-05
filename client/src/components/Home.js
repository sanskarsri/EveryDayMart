import React , {useState, useEffect} from 'react';
import Card from "./Card";
import Axios from "axios";

export default function Home({handleAddtocart,handleRemovefromcart,products,setproducts}){


    const [searchText,setsearchText] = useState("");
    const [searchproducts,setsearchproducts] = useState([]);


    const handleonLoad = async () => {
        await Axios({
          method: "get",
          url: "/api/read/getdata",
        })
          .then((res) => {
            if (res.status === 200) {
              console.log("Details Fetched");
              setproducts(res.data.details)
              setsearchproducts(res.data.details)
            } 
          })
          .catch((err) => {
            console.log(err);
          });
      };


    useEffect(()=>{
      let x=[];
      products.map((ele)=>{
        if(ele.title
          .toLowerCase()
          .startsWith(searchText.toLowerCase()))
          x.push(ele);
      })
      setsearchproducts(x)
    },[searchText])

    useEffect(()=>{
        handleonLoad();
    },[]);

    return (<>
        <div className="container mt-5">
        <div className="d-flex flex-column align-items-center my-3 mt-5">
          <input type="text" value={searchText} onChange={(e)=>setsearchText(e.target.value)} className="form__field mt-5" style={{borderBottom:"2px solid #fff",color:"#fff",width:"50%"}} placeholder="Search" />
        </div>
        <div className='mt-5'  style={{minHeight:"70vh"}} >
            {
                searchproducts && searchproducts.length>0 ?
                <div className='row mb-5 pt-3' >
                    {
                        searchproducts.filter((ele) => {
                          if (searchText === "") return ele;
                          else if (
                            ele.title
                              .toLowerCase()
                              .startsWith(searchText.toLocaleLowerCase())
                          ) {
                            return ele;
                          }
                        })
                        .map((ele,i)=>
                        <Card key={ele.id} ele={ele} idx={i} handleAddtocart={handleAddtocart} />
                        )
                    }
                </div>
                :
                <h1 className='d-flex justify-content-center align-items-center text-light'>
                  No Product
                  </h1>
            }
            </div>
        </div>    
    </>);
}