import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

class Landing extends Component {
    render() {
        return (
            <main role="main" className="flex-fill">
                <div className="container">
                    <p className="mt-5">
                        <span className="h1">Pesticide </span>
                        <span className="h5 text-muted">Issues</span>
                        <hr />
                    </p>
                    <form>
                        <div className="form-group mb-4">
                            <h4 id="searchHelp" className="form-text text-muted mb-3">
                                You can search by <strong>name</strong> or <strong>ID</strong>
                            </h4>

                            <div class="input-group mb-3">
                                <input
                                    type="text"
                                    aria-describedby="searchHelp"
                                    className="form-control"
                                    placeholder="Search for an issue."
                                />
                                <div class="input-group-append">
                                    <button
                                        class="btn btn-outline-secondary"
                                        type="button"
                                        id="searchHelp"
                                    >
                                        <i className="fas fa-search" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
                    <div className="row">
                        <div className="col-xs-12 col-md-6">
                            <div className="card bg-danger">
                                <div className="card-header">
                                    <i className="fas fa-bug mr-1" /> Recent Issues
                                </div>
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item">Issue content</li>
                                </ul>
                            </div>
                        </div>

                        <div className="col-xs-12 col-md-6">
                            <div className="card bg-success">
                                <div className="card-header">
                                    <i className="fas fa-check mr-1" /> Recently Closed Issues
                                </div>
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item">Issue content</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        );
    }
}

Landing.propTypes = {
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps)(Landing);
