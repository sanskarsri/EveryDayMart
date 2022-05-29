import React  from 'react';
import FavoriteIcon from '@mui/icons-material/Favorite';

export default function Footer(){

    return (<>
        <footer className="footer d-flex w-100 justify-content-center align-items-center bg-dark text-light">
            &copy;
              {new Date().getFullYear()}, made with <FavoriteIcon style={{margin:"0 5px"}} /> by
            <a href="http://sanskar-sri.herokuapp.com/" target="_blank"> Sanskar Srivastava</a>.
      </footer>   
    </>);
}