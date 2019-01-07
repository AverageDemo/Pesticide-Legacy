import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getHomeIssues } from "../../actions/issueActions";

class Landing extends Component {
    componentWillMount() {
        this.props.getHomeIssues();
    }

    render() {
        const { issues } = this.props.issues;
        let displayIssues;

        if (issues) {
            displayIssues = (
                <div>
                    {issues.map(issue => {
                        return (
                            <li className="list-group-item">
                                <h4>{issue.name}</h4>
                                <cite>{issue.category.name}</cite>
                                <p>{issue.description}</p>
                            </li>
                        );
                    })}
                </div>
            );
        } else {
            displayIssues = <div className="ml-2">Loading</div>;
        }

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
                                <ul className="list-group list-group-flush">{displayIssues}</ul>
                            </div>
                        </div>

                        <div className="col-xs-12 col-md-6">
                            <div className="card bg-success">
                                <div className="card-header">
                                    <i className="fas fa-check mr-1" /> Recently Closed Issues
                                </div>
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item">
                                        <h4>Issue Title</h4>
                                        <cite>Issue Category</cite>
                                        <p>Issue Description</p>
                                    </li>
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
    getHomeIssues: PropTypes.func.isRequired,
    issues: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    issues: state.issues,
    auth: state.auth
});

export default connect(
    mapStateToProps,
    { getHomeIssues }
)(Landing);
