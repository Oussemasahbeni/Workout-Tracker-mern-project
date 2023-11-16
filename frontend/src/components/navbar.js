import { NavLink } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";

const Navbar = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();
  const handleClick = () => {
    logout();
  };

  //console.log(user);
  return (
    <header>
      <div className="container">
        <NavLink to="/">
          <h1>Workout Buddy</h1>
        </NavLink>
        <nav>
          {user && (
            <div>
              <span>{user.email}</span>
              <button onClick={handleClick}>Log Out</button>
            </div>
          )}

          {!user && (
            <div>
              <NavLink to="/login">Login</NavLink>
              <NavLink to="/signup">Signup</NavLink>
            </div>
          )}
        </nav>
      </div>
    </header>
    /* <main>
        <Outlet />
      </main> */
  );
};

export default Navbar;
