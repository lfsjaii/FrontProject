import NavList from "../../component/NavList";
import {useLocation} from "react-router-dom";

export default function ThankYou() {
    const location = useLocation();

    return(
        <div className="shopping-cart-container">
            <NavList/>
            <h1>Thank You Page!</h1>
            <h3>Pathname: {location.pathname} </h3>

        </div>
    )
}