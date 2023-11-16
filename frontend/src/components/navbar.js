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

              <button onClick={handleClick}>
                <span
                  style={{ marginRight: 5 }}
                  className="pi pi-sign-out"
                ></span>
                Log Out
              </button>
            </div>
          )}

          {!user && (
            <div>
              <NavLink to="/login">
                <span
                  style={{ marginRight: 5 }}
                  className="pi pi-sign-in"
                ></span>
                Login
              </NavLink>
              <NavLink to="/signup">
                <span
                  style={{ marginRight: 5 }}
                  className="pi pi-sign-in"
                ></span>
                Signup
              </NavLink>
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
