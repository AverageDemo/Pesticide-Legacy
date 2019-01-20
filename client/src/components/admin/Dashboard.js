import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import PropTypes from "prop-types";
import { connect } from "react-redux";

class Dashboard extends Component {
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
                <div className="container">
                    <h1>Admin Panel</h1>
                </div>
            </main>
        );
    }
}

Dashboard.propTypes = {
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps,
    {}
)(Dashboard);
