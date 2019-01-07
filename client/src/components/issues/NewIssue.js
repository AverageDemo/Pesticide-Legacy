import React, { Component } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import { connect } from "react-redux";
import { newIssue } from "../../actions/issueActions";

class NewIssue extends Component {
    constructor() {
        super();
        this.state = {
            name: "",
            description: "",
            reproduction: "",
            category: "",
            errors: {}
        };
    }

    componentDidMount() {
        !this.props.auth.isAuthenticated && this.props.history.push("/login");
    }

    componentWillReceiveProps(nextProps) {
        //nextProps.auth.isAuthenticated && this.props.history.push("/");
        nextProps.errors && this.setState({ errors: nextProps.errors });
    }

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    onSubmit = e => {
        e.preventDefault();

        const issueData = {
            name: this.state.name,
            description: this.state.description,
            reproduction: this.state.reproduction,
            category: this.state.category
        };

        this.props.newIssue(issueData, this.props.history);
    };

    render() {
        const { errors } = this.state;

        return (
            <div className="login flex-fill">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6 m-auto">
                            <h1 className="display-4 text-center mt-3 mb-5">New Issue</h1>
                            <form onSubmit={this.onSubmit}>
                                <div className="form-group">
                                    <input
                                        type="text"
                                        className={classnames("form-control form-control-lg", {
                                            "is-invalid": errors.name
                                        })}
                                        placeholder="Issue Name"
                                        name="name"
                                        value={this.state.issueName}
                                        onChange={this.onChange}
                                    />
                                    {errors.name && (
                                        <div className="invalid-feedback">{errors.name}</div>
                                    )}
                                </div>
                                <div className="form-group">
                                    <textarea
                                        type="text"
                                        className={classnames("form-control form-control-lg", {
                                            "is-invalid": errors.description
                                        })}
                                        placeholder="Description"
                                        name="description"
                                        value={this.state.description}
                                        onChange={this.onChange}
                                    >
                                        {" "}
                                    </textarea>
                                    {errors.description && (
                                        <div className="invalid-feedback">{errors.description}</div>
                                    )}
                                </div>
                                <div className="form-group">
                                    <textarea
                                        type="text"
                                        className={classnames("form-control form-control-lg", {
                                            "is-invalid": errors.reproduction
                                        })}
                                        placeholder="Reproduction"
                                        name="reproduction"
                                        value={this.state.reproduction}
                                        onChange={this.onChange}
                                    >
                                        {" "}
                                    </textarea>
                                    {errors.reproduction && (
                                        <div className="invalid-feedback">
                                            {errors.reproduction}
                                        </div>
                                    )}
                                </div>
                                <div className="form-group">
                                    <input
                                        type="text"
                                        className={classnames("form-control form-control-lg", {
                                            "is-invalid": errors.category
                                        })}
                                        placeholder="Category"
                                        name="category"
                                        value={this.state.category}
                                        onChange={this.onChange}
                                    />
                                    {errors.category && (
                                        <div className="invalid-feedback">{errors.category}</div>
                                    )}
                                </div>
                                <input type="submit" className="btn btn-dark btn-block mt-4" />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

NewIssue.propTypes = {
    newIssue: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(
    mapStateToProps,
    { newIssue }
)(NewIssue);
