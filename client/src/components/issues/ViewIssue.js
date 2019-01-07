import React, { Component } from "react";
import moment from "moment";
import PropTypes from "prop-types";
import classnames from "classnames";
import { connect } from "react-redux";
import { getIssue } from "../../actions/issueActions";

class ViewIssue extends Component {
    componentWillMount() {
        const { issueTag } = this.props.match.params;
        this.props.getIssue(issueTag, this.props.history);
    }

    render() {
        const { issue } = this.props.issue;
        let issueDisplay;

        if (issue) {
            let reproduction, stackTrace;

            if (issue.reproduction) {
                reproduction = (
                    <div className="card">
                        <div className="card-header">Steps to reproduce</div>
                        <div className="card-body">
                            <p className="card-text">{issue.reproduction}</p>
                        </div>
                    </div>
                );
            }

            if (issue.stackTrace) {
                stackTrace = (
                    <div className="card">
                        <div className="card-header">Stack trace</div>
                        <div className="card-body">
                            <p className="card-text">{issue.stackTrace}</p>
                        </div>
                    </div>
                );
            }

            issueDisplay = (
                <div>
                    <h5 className="text-muted issueTag">{issue.tag}</h5>
                    <h2 classname="issueName">{issue.name}</h2>
                    <hr />
                    <div className="row">
                        <div className="col-xs-12 col-md-8">
                            <div className="card">
                                <div className="card-header">Description</div>
                                <div className="card-body">
                                    <p className="card-text">{issue.description}</p>
                                </div>
                            </div>
                            <br />
                            {issue.reproduction && reproduction}
                            <br />
                            {issue.stackTrace && stackTrace}
                        </div>
                        <div className="col-xs-12 col-md-4">
                            <div
                                className={classnames("card", {
                                    "bg-danger": !issue.isResolved,
                                    "bg-success": issue.isResolved
                                })}
                            >
                                <div className="card-body">
                                    <p className="text-center m-0 status">
                                        {issue.isResolved ? "Resolved" : "Unresolved"}
                                    </p>
                                </div>
                            </div>
                            <br />
                            <div className="card">
                                <table border="1" bordercolor="lightgrey" frame="void" rules="rows">
                                    <tbody>
                                        <tr>
                                            <th className="tableHeader p-2 text-muted">
                                                Component
                                            </th>
                                            <td className="p-2">{issue.category.name}</td>
                                        </tr>
                                        <tr>
                                            <th className="tableHeader p-2 text-muted">
                                                Versions Affected
                                            </th>
                                            <td className="p-2">Not Yet Implemented</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <br />
                            <div className="card">
                                <table border="1" bordercolor="lightgrey" frame="void" rules="rows">
                                    <tbody>
                                        <tr>
                                            <th className="tableHeader p-2 text-muted">Created</th>
                                            <td className="p-2">
                                                {moment(issue.date).format("MMM DD, YYYY")}
                                            </td>
                                        </tr>
                                        <tr>
                                            <th className="tableHeader p-2 text-muted">Updated</th>
                                            <td className="p-2">
                                                {moment(issue.dateUpdated).format("MMM DD, YYYY")}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            );
        } else {
            issueDisplay = <div>Loading</div>;
        }

        return (
            <main role="main" className="flex-fill">
                <div className="container">
                    <p className="mt-5">{issueDisplay}</p>
                </div>
            </main>
        );
    }
}

ViewIssue.propTypes = {
    getIssue: PropTypes.func.isRequired,
    issue: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    issue: state.issues,
    auth: state.auth
});

export default connect(
    mapStateToProps,
    { getIssue }
)(ViewIssue);
