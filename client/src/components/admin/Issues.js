import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import "../../Admin.css";

class Issues extends Component {
    constructor() {
        super();
        this.state = {
            loaded: false
        };
    }

    async componentWillMount() {
        try {
            const response = await axios.get("/api/users/isadmin");
            (!this.props.auth.isAuthenticated || !response.data) && this.props.history.push("/");
        } catch (e) {
            this.props.history.push("/");
        }
    }

    render() {
        return (
            <main role="main" className="flex-fill">
                <div className="row">
                    <nav className="col-md-2 d-none d-md-block bg-light sidebar">
                        <div className="sidebar-sticky">
                            <ul className="nav flex-column">
                                <li className="nav-item">
                                    <Link className="nav-link" to="/admin">
                                        Dashboard <span className="sr-only">(current)</span>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/admin/users">
                                        Users
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/admin/devgroups">
                                        Development Groups
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/admin/categories">
                                        Categories
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link active" to="/admin/issues">
                                        Issues
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </nav>
                    <div className="col-md-9 ml-sm-auto col-lg-10 px-4">
                        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                            <h1 className="h2">Issues</h1>
                        </div>
                    </div>
                </div>
            </main>
        );
    }
}

Issues.propTypes = {
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps,
    {}
)(Issues);
