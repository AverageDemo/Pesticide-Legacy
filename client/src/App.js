import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Landing from "./components/layout/Landing";

import "./App.css";

class App extends Component {
    render() {
        return (
            <Router>
                <div className="App">
                    <div className="d-flex flex-column content-box">
                        <Navbar />
                        <Route exact path="/" component={Landing} />
                        <Footer />
                    </div>
                </div>
            </Router>
        );
    }
}

export default App;
