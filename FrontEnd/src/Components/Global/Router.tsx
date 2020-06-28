import {Login,Todo, Main } from "../Pages"
import { BrowserRouter as Router, Route, Link ,Switch} from "react-router-dom";
import React from "react";

export function AppRouter(){
    return(
        <div>
            <Switch>
                <Route path = "/todo" component = {Todo}/>
                <Route path="/" component = {Login}/>
            </Switch>
        </div>
    )
}