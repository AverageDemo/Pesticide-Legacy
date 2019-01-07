import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getHomeIssues } from "../../actions/issueActions";

class Landing extends Component {
    componentDidMount() {
        this.props.getHomeIssues();
    }

    render() {
        const { issues } = this.props.issues;
        let displayOpenIssues;
        let displayClosedIssues;

        if (issues) {
            displayOpenIssues = (
                <div>
                    {issues
                        .filter(issue => !issue.isResolved && !issue.isPrivate)
                        .slice(0, 4)
                        .map(issue => {
                            return (
                                <li className="list-group-item">
                                    <h4>
                                        <Link className="issueTitle" to={issue.tag}>
                                            {issue.name}
                                        </Link>
                                    </h4>
                                    <cite className="m-0 text-muted">{issue.category.name}</cite>
                                    <p className="issueDescription text-muted">
                                        {issue.description.substr(0, 128)}...
                                    </p>
                                </li>
                            );
                        })}
                </div>
            );

            displayClosedIssues = (
                <div>
                    {issues
                        .filter(issue => issue.isResolved && !issue.isPrivate)
                        .slice(0, 4)
                        // eslint-disable-next-line
                        .map(issue => {
                            if (!issue.isPrivate && issue.isResolved) {
                                return (
                                    <li className="list-group-item">
                                        <h4>
                                            <Link className="issueTitle" to={issue.tag}>
                                                {issue.name}
                                            </Link>
                                        </h4>
                                        <cite className="m-0 text-muted">
                                            {issue.category.name}
                                        </cite>
                                        <p className="issueDescription text-muted">
                                            {issue.description.substr(0, 128)}...
                                        </p>
                                    </li>
                                );
                            }
                        })}
                </div>
            );
        } else {
            displayOpenIssues = <div className="ml-2">Loading</div>;
            displayClosedIssues = <div className="ml-2">Loading</div>;
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
                            <div className="card alert-danger">
                                <div className="card-header">
                                    <i className="fas fa-bug mr-1" /> Recent Issues
                                </div>
                                <ul className="list-group list-group-flush">{displayOpenIssues}</ul>
                            </div>
                        </div>

                        <div className="col-xs-12 col-md-6">
                            <div className="card alert-success">
                                <div className="card-header">
                                    <i className="fas fa-check mr-1" /> Recently Closed Issues
                                </div>
                                <ul className="list-group list-group-flush">
                                    {displayClosedIssues}
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
