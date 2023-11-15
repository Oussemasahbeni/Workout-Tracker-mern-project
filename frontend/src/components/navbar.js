import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <header>
      <div className="container">
        <NavLink to="/">
          <h1>Workout Buddy</h1>
        </NavLink>
      </div>
    </header>
    /* <main>
        <Outlet />
      </main> */
  );
};

export default Navbar;
