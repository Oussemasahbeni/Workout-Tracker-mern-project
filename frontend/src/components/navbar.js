import { NavLink } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";
import { useRef } from "react";
import { Button } from "primereact/button";
import { TieredMenu } from "primereact/tieredmenu";

const Navbar = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();
  const menu = useRef(null);
  const items = [
    {
      label: "Settings",
      icon: "pi pi-fw pi-file",
    },
    {
      label: "Edit",
      icon: "pi pi-fw pi-pencil",
    },
    {
      separator: true,
    },
    {
      label: "Quit",
      id: "quitMenuItem",
      icon: "pi pi-fw pi-power-off",
      command: () => logout(),
    },
  ];
  // const handleClick = () => {
  //   logout();
  // };

  //console.log(user);
  return (
    <header className="bg-header_bg border-b-2  border-black">
      <div className="container max-w-screen-2xl my-0 mx-auto py-2 px-4 flex items-center justify-between ">
        <NavLink to="/" className="h-32">
          <img
            className="max-h-32  transform scale-110 w-auto"
            src="./logo.png"
            alt="WorkoutBuddy"
          />
        </NavLink>

        {user && (
          <div className=" flex content-start">
            <NavLink className={"mr-4"} to="/home">
              <div className="bg-white text-primary border-l-2 border-black p-2   cursor-pointer text-base">
                Workouts
              </div>
            </NavLink>
            <NavLink className={"mr-4"} to="/BMI">
              <div className="bg-white text-primary border-l-2  border-black p-2   cursor-pointer text-base">
                BMI CALCULATOR
              </div>
            </NavLink>
           {/* <NavLink className={"mr-4"} to="/BMI">
              <div className="bg-white text-primary border-l-2  border-black p-2  cursor-pointer text-base">
                Protein intake
              </div>
            </NavLink>

            <NavLink to="/BMI">
              <div className="bg-white text-primary border-x-2  border-black p-2   cursor-pointer text-base">
                One Rep Max Calculator
              </div>
            </NavLink>*/}
          </div>
        )}

        <nav className="flex items-center ">
          {user && (
            <div>
              <TieredMenu model={items} popup ref={menu} breakpoint="767px" />
              <Button
                label={user.username}
                icon="pi pi-bars"
                className="bg-white text-primary border-2 border-primary p-2 rounded-md  cursor-pointer text-base"
                onClick={(e) => menu.current.toggle(e)}
              />
              {/* <span>{user.email}</span> */}

              {/* <button
                className="bg-white text-primary border-2 border-primary p-2 rounded-md  cursor-pointer text-base"
                onClick={handleClick}
              >
                <span
                  style={{ marginRight: 5 }}
                  className="pi pi-sign-out"
                ></span>
                Log Out
              </button> */}
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
                  className="pi pi-user-plus"
                ></span>
                Signup
              </NavLink>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
