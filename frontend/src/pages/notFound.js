import { NavLink } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center text-red-600 text-3xl">
      <h2 className="mb-4 font-bold">404 Page not found!</h2>
      <img
        className="w-full max-w-md mb-4"
        src="/notFound.jpg"
        alt="404 Not Found"
      />

      <p className="border-4 border-red-600 p-2">
        Go to the{" "}
        <NavLink to="/" className="text-blue-500">
          Homepage
        </NavLink>{" "}
        instead .
      </p>
    </div>
  );
};

export default NotFound;
