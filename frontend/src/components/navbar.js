import { NavLink, Outlet } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="container">
      <header>
        <NavLink to="/">
          <h1>Workout Buddy</h1>
        </NavLink>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Navbar;
