import { createBrowserRouter } from "react-router-dom";
import Dashboard from "../layout/Dashboard/Dashboard";
import Main from "../layout/Main";
import About from "../pages/About";
import Cart from "../pages/Cart";
import Home from "../pages/Home";
import ProductList from "../pages/Dashboard/ProductList";
import AddProduct from "../pages/Dashboard/AddProduct";
import TopRated from "../pages/TopRated";
import Wishlist from "../pages/Wishlist";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "top-rated",
        element: <TopRated />,
      },
      {
        path: "cart",
        element: <Cart />,
      },
      {
        path: "wishlist",
        element: <Wishlist />,
      },
    ],
  },
  {
    path:'/dashboard',
    element: <Dashboard/>,
    children:[
      {
        path:'/dashboard',
        element:<ProductList/>
      },
      {
        path:'add-product',
        element:<AddProduct/>
      }
    ]
  }
]);

export default routes;
