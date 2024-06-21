import { Link, Outlet} from "react-router-dom";
import "./Notfound.css";

export const Navbar = () => {

  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="">Home</Link>
          </li>
          <li>
            <Link to="/register">Register</Link>
          </li>
          <li>
            <Link to="/users">Users </Link>
          </li>
        </ul>
      </nav>

      <Outlet />
    </div>
  );
};
