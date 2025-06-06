import HomePage from "./pages/HomePage.jsx";
import ProductPage from "./pages/ProductPage.jsx";
import LoginPage from "./pages/loginPage.jsx";
import SignUp from "./pages/SignupPage.jsx";
import NewProductPage from "./pages/NewProductPage.jsx";
import CartPage from "./pages/CartPage.jsx";
import MainLayout from "./layout/MainLayout.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";

const routes = [
    {
        path: "/",
        element: <MainLayout/>,
        children: [
            {path: "", element: <HomePage/>},
            {path: "/product/:id", element: <ProductPage/>},
            {path: "/new-product", element: <NewProductPage/>},
            {path: "/cart", element: <CartPage/>},
        ]
    },
    {path: "/login", element: <LoginPage/>},
    {path: "/sign-up", element: <SignUp/>},
    {path: "*", element: <NotFoundPage/>}
]

export default routes;