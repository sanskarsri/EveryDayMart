import React, {useState,useEffect} from 'react';
import {Link} from "react-router-dom";
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import InventoryIcon from '@mui/icons-material/Inventory';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import CloseIcon from '@mui/icons-material/Close';
import './../index.css';
import CartCard from './CartCard';
import DownloadIcon from '@mui/icons-material/Download';
import Axios from "axios";
import { jsPDF } from "jspdf";

const style = {
  position: 'fixed',
  top: '0%',
  right: '0%',
  // transform: 'translate(-50%, -50%)',
  // width: 400,
  height: '100%',
  bgcolor: 'background.paper',
  // border: '2px solid #000',
  boxShadow: 24,
  // zIndex: 10001,
  p: 4,
};

const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
      right: -3,
      top: 13,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: '0 4px',
    },
  }));

export default function Navbar({cart,setCart,products}){
  
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [bool, setbool] = useState(false);
  const [amountopay, setamountopay] = useState(Math.round(cart.reduce((partialSum, a) => partialSum + Math.round(a.amount * 100) / 100, 0)*100)/100);

  useEffect(()=>{
    setamountopay(Math.round(cart.reduce((partialSum, a) => partialSum + Math.round(a.amount * 100) / 100, 0)*100)/100);
    setbool(false);
    // console.log(amountopay)
  },[bool])

  const handleRemovefromcart = (item) => {

    var i;
    // console.log(item,amountopay)
    let temp=[];
    for (i = 0; i < cart.length; i++) {
        if (cart[i].serial != item.serial) {
            temp.push(cart[i]);
        }
        // else{
        //   setamountopay(amountopay-item.amount);
        // }
    }

    setCart(temp);
    setbool(true);
    // setamountopay(Math.round(cart.reduce((partialSum, a) => partialSum + Math.round(a.amount * 100) / 100, 0)*100)/100);
    
    // console.log(item,amountopay)
  };

  const downloadbill= async () => {
    setamountopay(Math.round(cart.reduce((partialSum, a) => partialSum + Math.round(a.amount * 100) / 100, 0)*100)/100);
    var templist=products;
    cart.map((x)=>{
      templist[x.idx].quantity -= x.quantity_selected;
    });

    await Axios({
      method: "post",
      url: "/api/write",
      data:{
        final: templist,
        cart:cart
      }
    })
      .then((res) => {
        if (res.status === 200) {
          var doc = new jsPDF();
          // doc.text(20, 10 , 
          //     "index title price quantity amount ");
          cart.map(function(item, i){
              doc.text(20, 20 + (i * 10), 
                  ` ${i+1}. ${item.title}:   ${item.price} * ${item.quantity_selected} + ${item.gst}%(GST) = ${item.amount} `)});
          doc.text(`TOTAL :  ${amountopay} Rupees only /-`, 100, 30+cart.length*10);
          doc.save(`Bill-${new Date().toLocaleString()}.pdf`);


          window.location.reload();
        } 
      })
      .catch((err) => {
        alert("Some Error occured Please close the excel sheet and refresh");
        console.log(err);
      });


  };

    return (
      <>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" ></span>
          </button>
          <Link className="navbar-brand text-light" to="/">EverydayMart</Link>
            
          <div className="collapse navbar-collapse justify-content-end" id="navbarTogglerDemo03">
            {/* <form className="form-inline my-2 my-lg-0">
              <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
            </form> */}
            <Link to="/inventory">
            <InventoryIcon style={{color:"white",marginRight:"5px",cursor:"pointer"}} />
            </Link>
            <IconButton aria-label="cart" onClick={handleOpen}>
              <StyledBadge badgeContent={cart.length} color="secondary">
                <ShoppingCartIcon style={{color:"white"}} />
              </StyledBadge>
            </IconButton>
          </div>
        </nav>
        <Modal
        open={open}
        onClose={handleClose}
        className="modal-cart"
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
          <Box sx={style}>
            <div className="d-flex justify-content-between">
              <h2 className='w-fit text-light'>Cart</h2>
              <CloseIcon onClick={handleClose} style={{cursor:"pointer",fill:"#fff"}} />
            </div>
            {cart && cart.length>0?
            <div className='cartcards'>
               {cart.map((obj,i)=> <CartCard products={products} handleRemovefromcart={handleRemovefromcart} key={i} obj={obj} setbool={setbool} id={i} cart={cart} setCart={setCart} idx={obj.idx} />)}
            </div>
            : null}
            <div className='cartamount mt-3 bg-light'>
              <div className='d-flex justify-content-between w-100'>
                <p className='w-fit mb-0'>Total Amount:</p>
                <div className='w-fit'>
                <p className='w-fit mb-0'>&#8377; 
                  {cart && cart.length>0 ? amountopay : 0}
                  {" "} 
                  <DownloadIcon onClick={()=>{
                    if(cart&&cart.length>0 && amountopay!=0)
                     downloadbill()
                  }} style={{cursor:"pointer"}} sx={{fontSize:"medium"}} />
                </p>
                </div>
              </div>
            </div>
          </Box>
      </Modal>
      </>
    )
}