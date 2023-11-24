import { NavLink } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";

const LandingPage = () => {
  const { user } = useAuthContext();
  return (
    <div className=" flex justify-center items-center  flex-col   ">
      <div className=" text-center  p-10 border-2 rounded-3xl bg-background bg-contain   ">
        <h1 className="leading-[50px] font-semibold md:leading-[60px] lg:leading-[80px] text-gray-950 tracking-[-1.4px] text-4xl md:text-6xl lg:text-7xl">
          The All-In-One Workout App for
        </h1>
        <span className=" span_tag font-bold text-5xl text-gradient-to-r from-green-400 to-blue-500 lead-[80px]">
          Fitness enthusiasts
        </span>

        <p className="text-iso-gray w-4/5 text-lg md:text-xl pt-2 mt-4 font-normal text-center tracking-loose mx-auto">
          Streamline your workflow with the all-in-one calendar and organization
          app for founders. Get started with a free trial today, no credit card
          needed.
        </p>
        {user && (
          <NavLink to={"/home"}>
            <button className="text-white  mt-10 bg-[#000C1A] hover:drop-shadow-lg focus:ring-4  focus:ring-blue-300 font-normal rounded-full text-base md:text-lg px-8 md:px-10 py-3 md:py-5 mr-4 mb-2 focus:outline-none">
              {" "}
              Get Started
            </button>
          </NavLink>
        )}
        {!user && (
          <NavLink to={"/login"}>
            <button className="text-white  mt-10 bg-[#000C1A] hover:drop-shadow-lg focus:ring-4  focus:ring-blue-300 font-normal rounded-full text-base md:text-lg px-8 md:px-10 py-3 md:py-5 mr-4 mb-2 focus:outline-none">
              {" "}
              Get Started
            </button>
          </NavLink>
        )}

        <div className="mt-7 pt-9 mx-auto rounded-2xl lg:w-5/5">
          <img
            alt="CalendarPlan dashboard with loading elements"
            loading="lazy"
            width="1800"
            height="800"
            decoding="async"
            data-nimg="1"
            className="rounded-3xl border-2 border-white mx-auto object-cover bg-transparent "
            src="/landingPageImg.jpg"
          ></img>
        </div>
        <div className="w-full md:w-5/5 mx-auto text-center lg:pt-12 mt-6 bg-white border-5 rounded-3xl">
          <span className="badgeBoxShadow uppercase rounded-2xl text-[#6A65FF] text-sm md:text-base font-medium leading-loose  tracking-widest px-5 py-3 badgeGradientText text-transparent bg-clip-text">
            Features
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl mb-4 font-bold text-iso-gray-dark pt-3 mt-2">
            Explore Our Amazing
          </h1>
          <span className=" span_tag font-bold text-3xl text-gradient-to-r from-green-400 to-blue-500 lead-[80px]">
            Features
          </span>
          <p className="text-iso-gray w-4/5 text-lg md:text-xl pt-2 mt-4 font-normal text-center tracking-loose mx-auto">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus
            doloremque alias sint et modi explicabo blanditiis ab autem facere
            ea, repellat, velit ratione cum nam fugiat temporibus molestias rem
            porro?
          </p>
          <div className="pt-12 md:pt-24 mx-auto w-4/5  lg:grid lg:gap-8 lg:grid-cols-2">
            <div className=" pb-12 m-auto text-left">
              <h1 className="w-4/5 text-3xl md:text-4xl lg:text-3xl leading-tight pt-4 tracking-tight mb-4 font-semibold  text-iso-gray-dark">
                Create tasks and notes with ease
              </h1>
              <p className="mb-8 leading-relaxed font-normal mt-4 text-iso-gray text-lg w-4/5 ">
                With our workout app, you can quickly add loads and sets to help
                you plan and organize your workouts.
              </p>
              <ul className="font-normal text-iso-gray flex flex-col flex-wrap space-y-4 text-lg">
                <li className="flex items-center space-x-2">
                  <i
                    className="pi pi-check-circle"
                    style={{ color: "blue", fontSize: "1.3rem" }}
                  ></i>
                  <span>Quickly create notes and tasks to help you plan</span>
                </li>
                <li className="flex items-center space-x-2">
                  <i
                    className="pi pi-check-circle"
                    style={{ color: "blue", fontSize: "1.3rem" }}
                  ></i>
                  <span>Quickly create notes and tasks to help you plan</span>
                </li>
                <li className="flex items-center space-x-2">
                  <i
                    className="pi pi-check-circle"
                    style={{ color: "blue", fontSize: "1.3rem" }}
                  ></i>
                  <span>Quickly create notes and tasks to help you plan</span>
                </li>
              </ul>
            </div>
            <div className=" mx-auto rounded-3xl h-5/6 pt-8 mt-4">
              <img
                alt="hero"
                loading="lazy"
                width="500"
                height="500"
                decoding="async"
                data-nimg="1"
                className="object-cover object-center rounded-3xl w-full h-full"
                src="/workoutForm.jpg"
                // style="color:transparent"
              ></img>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
