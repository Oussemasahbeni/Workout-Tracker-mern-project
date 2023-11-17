// import {
//   createBrowserRouter,
//   Route,
//   createRoutesFromElements,
//   RouterProvider,
// } from "react-router-dom";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";
import { PrimeReactProvider } from "primereact/api";
import Home from "./pages/home";
import Navbar from "./components/navbar";
import Login from "./pages/login";
import Signup from "./pages/signup";
import EditWorkout from "./components/EditWorkout";

// const Router = createBrowserRouter(
//   createRoutesFromElements(
//     <Route path="/" element={<Navbar />}>
//       <Route index element={<Home />} />
//     </Route>
//   )
// );
function App() {
  const { user } = useAuthContext();
  return (
    <div className="App bg-white m-0 font-Poppins">
      <PrimeReactProvider>
        <BrowserRouter>
          <Navbar />
          <div className="pages max-w-screen-2xl p-5 mx-auto my-0">
            <Routes>
              <Route
                path="/"
                element={user ? <Home /> : <Navigate to="/login" />}
              />
              <Route
                path="/login"
                element={!user ? <Login /> : <Navigate to="/" />}
              />
              <Route
                path="/signup"
                element={!user ? <Signup /> : <Navigate to="/" />}
              />
              <Route path="/edit/:id" element={<EditWorkout />} />
            </Routes>
          </div>
        </BrowserRouter>
      </PrimeReactProvider>
    </div>
  );
}

export default App;
