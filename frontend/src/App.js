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
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NotFound from "./pages/notFound";
import LandingPage from "./pages/landingPage";
import Footer from "./components/footer";
import BmiCalculator from "./components/BmiCalculator";

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
    <div className="App m-0 bg-slate-100 font-Poppins">
      <PrimeReactProvider>
        <BrowserRouter>
          <Navbar />
          <div className=" max-w-screen-2xl p-5 mx-auto my-0">
            <Routes>
              <Route
                path="/"
                // element={user ? <Home /> : <Navigate to="/login" />}
                element={<LandingPage />}
              />
              <Route path="/home" element={!user ? <Login /> : <Home />} />
              <Route
                path="/BMI"
                element={!user ? <Login /> : <BmiCalculator />}
              />
              <Route
                path="/login"
                element={!user ? <Login /> : <Navigate to="/home" />}
              />
              <Route
                path="/signup"
                element={!user ? <Signup /> : <Navigate to="/home" />}
              />
              <Route path="/edit/:id" element={<EditWorkout />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </BrowserRouter>
        <Footer />
      </PrimeReactProvider>
      <ToastContainer pauseOnHover={false} />
    </div>
  );
}

export default App;
