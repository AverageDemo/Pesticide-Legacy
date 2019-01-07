import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getIssue } from "../../actions/issueActions";

class ViewIssue extends Component {
    constructor() {
        super();
        this.state = {
            errors: {}
        };
    }

    componentWillReceiveProps(nextProps) {
        nextProps.errors && this.setState({ errors: nextProps.errors });
    }

    componentWillMount() {
        const { issueTag } = this.props.match.params;
        this.props.getIssue(issueTag, this.props.history);
    }

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    onSubmit = e => {
        e.preventDefault();
    };

    render() {
        const { errors } = this.state;

        const { issue } = this.props.issue;
        let issueDisplay;

        issueDisplay = issue ? <div>{issue.name}</div> : <div>Loading</div>;

        return (
            <main role="main" className="flex-fill">
                <div className="container">
                    <p className="mt-5">{issueDisplay}</p>
                    {JSON.stringify(errors)}
                </div>
            </main>
        );
    }
}

ViewIssue.propTypes = {
    getIssue: PropTypes.func.isRequired,
    issue: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    issue: state.issues,
    auth: state.auth,
    errors: state.errors
});

export default connect(
    mapStateToProps,
    { getIssue }
)(ViewIssue);
