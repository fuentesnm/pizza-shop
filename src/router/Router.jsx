import { BrowserRouter, Routes, Route } from "react-router-dom";
import {Products} from "../views/products/Products.jsx";
import { Home } from "../views/Home.jsx";

const AppRouter = () => {
    return (<BrowserRouter>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
        </Routes>
    </BrowserRouter>)
}

export default AppRouter;