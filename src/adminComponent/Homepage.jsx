import React from 'react';
import { NavLink,withRouter} from 'react-router-dom';

function Homepage() {

    var x = "https://mdbootstrap.com/img/logo/mdb-transparent.png"  
    return(
        <>
    <div className="card text-center" >
      <div className="card-header">

        <nav className="navbar navbar-dark primary-color">

          <img src={x} />
          <h1 style={{marginRight :550 , color:"black",fontFamily: "fantasy"}} >Hiren test</h1>
        </nav>
      </div>
      <div className="card-header" style={{ backgroundColor: "lightblue" }}>
        <h4>
          Choose your role ?
    </h4>
      </div>
      <div className="card-body">
        <NavLink to="/adminlogin" className="btn btn-primary" style={{ borderRadius: 10 }}>admin</NavLink><br /><br />
        <NavLink to="/studentlogin" className="btn btn-primary" style={{ borderRadius: 10 }}>student</NavLink>
      </div>
    </div>
  </>
    ) ;
  }
  
export default Homepage;