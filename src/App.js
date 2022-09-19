import logo from './logo.svg';
import React, { createContext, useState } from "react";
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Component/Home";
import About from "./Component/About";
import Contact from "./Component/Contact";
import Name from "./Component/Name";
import Header from "./Component/Navbar";
import Error from "./Component/Error";
import All from "./Crud/All";
import Edit from "./Crud/Edit";
import Add from "./Crud/Add";
import Login from "./Component/Login";
import Register from "./Component/Register";
import Protect from "./Component/Protect";

const context = createContext();
function App() {
    const token = localStorage.getItem('api_token')
    const [ApiList, setApiList] = useState([]);
    const [editApiList, seteditApiList] = useState([]);
    const GetPro = async () => {
        const fet = await fetch("http://localhost/apitest/public/api/product",{headers : { 
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization' : "Bearer "+token
           }});
        const response = await fet.json();
        const result = response;
        setApiList(result.product);
    }

return (
    <>
        <BrowserRouter>
            <Header />
            <context.Provider value={{ GetPro, ApiList, editApiList, seteditApiList }}>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/logout" />
                    <Route path="/" element={<Home name="Home"/>} />
                    <Route path="/about" element={<Protect Component={About} />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/name/:fname" element={<Name />} />
                    <Route path="*" element={<Error />} />
                    <Route path="/all" element={<Protect Component={All} />} />
                    <Route path="/add" element={<Protect Component={Add} />} />
                    <Route path="/edit/:id" element={<Protect Component={Edit} />} />
                </Routes>
            </context.Provider>
        </BrowserRouter>
    </>
)
}

export default App;
export { context };
