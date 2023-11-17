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
    <header className="bg-header_bg">
      <div className="container max-w-screen-2xl my-0 mx-auto py-2 px-4 flex items-center justify-between">
        <NavLink to="/" className="h-32">
          {/* <h1 className="title"> */}{" "}
          <img
            className="max-h-32  transform scale-110 w-auto"
            src="./logo.png"
            alt="WorkoutBuddy"
          />
          {/* Workout Buddy */}
          {/* </h1> */}
        </NavLink>
        <nav className="flex items-center">
          {user && (
            <div>
              <span>{user.email}</span>

              <button
                className="bg-white text-primary border-2 border-primary p-2 rounded-md  cursor-pointer text-base"
                onClick={handleClick}
              >
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
