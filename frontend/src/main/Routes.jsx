import React from 'react'
import {Switch, Route, Redirect } from 'react-router'
// Switch que dizer escolha
// Route que dizer rota

import Home from '../components/home/Home'
import UserCrud from '../components/user/UserCrud'


//Redirect ele atualiza a pagina quando não tem um url valido
export default props => 
    <Switch>
        <Route exact path="/" component={Home} />
        <Route path='/users' component={UserCrud} />
        <Redirect from='*' to='/' />
    </Switch>
 