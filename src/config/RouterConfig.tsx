import {createBrowserRouter} from "react-router-dom";
import ProductListingPage from "../ui/page/ProductListingPage";
import LoginPage from "../ui/page/LoginPage";
import ProductDetail from "../ui/page/ProductDetail";
import Checkout from "../ui/page/Checkout";
import ThankYou from "../ui/page/ThankYou";
import ErrorPage from "../ui/page/ErrorPage";
import ShoppingCart from "../ui/page/ShoppingCart";
import SignupPage from "../ui/page/SignupPage";


export const router = createBrowserRouter([
    {
        path: "/",
        element: <ProductListingPage/>,
        errorElement : <ErrorPage/>
    },
    {
        path: "/product/:productId",
        element: <ProductDetail/>,
        errorElement : <ErrorPage/>
    },
    {
        path: "/shoppingCart",
        element: <ShoppingCart/>,
        errorElement : <ErrorPage/>
    },
    {
        path: "/login",
        element: <LoginPage/>,
        errorElement : <ErrorPage/>
    },
    {
        path: "/checkout/:transactionId",
        element: <Checkout/>,
        errorElement : <ErrorPage/>
    },
    {
        path: "/thankyou",
        element: <ThankYou/>,
        errorElement : <ErrorPage/>
    },
    {
        path: "/register",
        element: <SignupPage/>,
        errorElement : <ErrorPage/>
    },
    {
        path: "/error" ,
        element: <ErrorPage/>
    }
])