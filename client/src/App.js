import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import { Provider } from "react-redux";
import store from "./store";

import NoMatch from "./components/layout/NoMatch";

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Landing from "./components/layout/Landing";

import Login from "./components/auth/Login";
import Register from "./components/auth/Register";

import NewIssue from "./components/issues/NewIssue";

import "./App.css";

if (localStorage.jwtToken) {
    setAuthToken(localStorage.jwtToken);
    const decoded = jwt_decode(localStorage.jwtToken);
    store.dispatch(setCurrentUser(decoded));

    const currentTime = Date.now() / 1000;
    if (decoded.exp < currentTime) {
        store.dispatch(logoutUser());
        window.location.href = "/login";
    }
}

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <Router>
                    <div className="App">
                        <div className="d-flex flex-column content-box">
                            <Navbar />
                            <Switch>
                                <Route exact path="/" component={Landing} />
                                <Route exact path="/register" component={Register} />
                                <Route exact path="/login" component={Login} />
                                <Route exact path="/newIssue" component={NewIssue} />
                                <Route component={NoMatch} />
                            </Switch>
                            <Footer />
                        </div>
                    </div>
                </Router>
            </Provider>
        );
    }
}

export default App;
