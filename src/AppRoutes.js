import React, { Component, Suspense, lazy } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

const Home = lazy(() => import("./views/Home.js"));
const Dashboard = lazy(() => import("./views/Dashboard.js"));
const GeneralContainer = lazy(() => import("./components/GeneralContainer.js"));

class AppRoutes extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Suspense fallback={<div></div>}>
                <Switch>
                    {/* Home / Login */}
                    <Route
                        exact path="/"
                        render={(props) => (
                            <GeneralContainer {...props} componente={<Home {...props}/>}/>
                            )
                        }
                    />

                    {/* Dashboard con las métricas */}
                    <Route
                        exact path="/dashboard"
                        render={(props) => (
                            <GeneralContainer {...props} componente={<Dashboard {...props}/>}/>
                            )
                        }
                    />
                    <Redirect to="/" />
                </Switch>
            </Suspense>
        );
    }
}

export default AppRoutes;
