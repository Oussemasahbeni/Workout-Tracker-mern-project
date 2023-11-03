import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import Home from "./pages/home";

const Router = createBrowserRouter(
  createRoutesFromElements(<Route path="/" element={<Home />}></Route>)
);
function App() {
  return (
    <div className="App">
      <div className="pages">
        <RouterProvider router={Router} />
      </div>
    </div>
  );
}

export default App;
