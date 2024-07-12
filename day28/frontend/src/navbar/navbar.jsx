import { Link, Outlet, useNavigate } from "react-router-dom";
import "./Notfound.css";
import { Suspense } from "react";

export const Navbar = () => {
  const auth = localStorage.getItem("token");
  const navigate = useNavigate();

  const logout = () => {
    alert("You have logged out");
    localStorage.clear();
    navigate("/register");
  };

  return (
    <div>


      <nav>
        <ul>
          <li>
            <Link to="">Home</Link>
          </li>
          <li>
            <Link to="/products">Product </Link>{" "}
          </li>
          {auth ? (
            <>
              <li>
                <Link onClick={logout} to="/login">
                  Logout{" "}
                </Link>
              </li>
              <li>
                {" "}
                <Link to="/profile">My details</Link>{" "}
              </li>
            </>
          ) : (
            <>
              <li>
                {" "}
                <Link to="/register">Register</Link>
              </li>
              <li>
                <Link to="/login">Login </Link>{" "}
              </li>
            </>
          )}
        </ul>
      </nav>

      
      <Suspense
        fallback={
          <Loading/>
        }
      >
        <Outlet />
      </Suspense>
    </div>
  );
};

 export const Loading= ()=>{
 return (

 <h1 className="text-8xl mt-28 pt-40 h-80 w-[50%]  mx-auto bg-white font-bold text-gray-950 text-center">
     Loading...
   </h1>
 )
}  