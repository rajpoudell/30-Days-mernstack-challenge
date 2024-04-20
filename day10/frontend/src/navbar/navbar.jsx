import { Link, Outlet, useNavigate } from "react-router-dom";
import "./Notfound.css"

export const Navbar = () => {
  const auth = localStorage.getItem('token');
  const navigate =  useNavigate();

  const logout = () =>{
    alert("You have logged out")
    localStorage.clear();
    navigate('/register');
    
  }

    return (
      <div>
        
        <nav>
          <ul>
            <li>
                <Link to="">Home</Link>
            </li>
                  {
                    auth ? 
                          <>
                          <li><Link onClick={logout} to='/login'>Logout  </Link></li>
                          <li> <Link to="/myprofile">My details</Link> </li>
                          </>
                          :
                          <> 
                          <li> <Link to="/register">Register</Link></li>
                          <li><Link to="/login">Login </Link> </li>
                          </>
                  }
          </ul>
        </nav>
  
        
  
        {/* An <Outlet> renders whatever child route is currently active,
            so you can think about this <Outlet> as a placeholder for
            the child routes we defined above. */}
        <Outlet />
      </div>
    );
  }