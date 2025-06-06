import React from 'react';
import Header from "./Header/Header.jsx";
import {Outlet} from "react-router-dom";
import Footer from "./Footer/Footer.jsx";

function MainLayout({children}) {
    return (
        <>
            <Header/>
            <main className="bg-gray-100 pt-28 sm:pt-36 pb-16">
                <div className="container px-2">
                    {children || <Outlet/>}
                </div>
            </main>
            <Footer/>
        </>
    );
}

export default MainLayout;