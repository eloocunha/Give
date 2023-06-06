import React from 'react';
import { BrowserRouter, Route, Switch} from 'react-router-dom';
//O Switch faz com que apenas uma rota seja executada por momento

import Login from './pages/Login';
import Home from './pages/HomePage';
import SignUp from './pages/SignUp/index';
import InfoClient from './pages/InfoClient';
import SignUpClient from './pages/SignUpClient';
import ClientHome from './pages/ClientPage';
import LoginCliente from './pages/LoginCliente';
import UpdateEmpresa from './pages/UpdateForm';
import ListCompany from './pages/ListCompany';
import ChatEmpresa from './pages/ChatEmpresa';
import Comments from './pages/Comments';
import Admin from './pages/Admin';
import Chat from './pages/Chat';


export default function Routes(){
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component = {Home} />
                <Route path="/login" component = {Login} />
                <Route path="/signup" component = {SignUp} />
                <Route path="/info" component = {InfoClient} />
                <Route path="/signupC" component = {SignUpClient} />
                <Route path="/clientHome" component = {ClientHome} />
                <Route path="/clientLogin" component = {LoginCliente} />
                <Route path="/updateEmpresa" component = {UpdateEmpresa} />
                <Route path="/listCompany" component = {ListCompany} />
                <Route path="/comments" component = {Comments} />
                <Route path="/admin" component = {Admin} />
                <Route path="/chat" component = {Chat} />
                <Route path="/chatEmpresa" component = {ChatEmpresa} />
            </Switch>
        </BrowserRouter>
    );
}
