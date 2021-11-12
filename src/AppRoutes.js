import React, { Component, Suspense, lazy } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

// Formato: const Home = lazy(() => import("views/Home.js"));

class AppRoutes extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Suspense fallback={<div></div>}>
                <Switch>
                    <Redirect to="/" />
                </Switch>
            </Suspense>
        );
    }
}

export default AppRoutes;
