import React, { Component } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import { connect } from "react-redux";
import { newIssue } from "../../actions/issueActions";
import { getCategories } from "../../actions/categoryActions";

class NewIssue extends Component {
    constructor() {
        super();
        this.state = {
            name: "",
            description: "",
            reproduction: "",
            stackTrace: "",
            category: "",
            isPrivate: false,
            errors: {}
        };
    }

    componentWillMount() {
        this.props.getCategories();
    }

    componentDidMount() {
        !this.props.auth.isAuthenticated && this.props.history.push("/login");
    }

    componentWillReceiveProps(nextProps) {
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
            stackTrace: this.state.stackTrace,
            category: this.state.category,
            isPrivate: this.state.isPrivate
        };

        this.props.newIssue(issueData, this.props.history);
    };

    render() {
        const { errors } = this.state;
        const { categories } = this.props.categories;
        let populateSelect;

        if (categories) {
            this.state.category = categories[Object.keys(categories)[0]]._id;

            populateSelect = (
                <div className="form-group">
                    <select
                        class="form-control form-control-lg"
                        value={this.state.category}
                        onChange={this.onChange}
                        className={classnames("form-control form-control-lg", {
                            "is-invalid": errors.category
                        })}
                        name="category"
                    >
                        {categories.map(category => {
                            return <option value={category._id}>{category.name}</option>;
                        })}
                    </select>
                    {errors.category && <div className="invalid-feedback">{errors.category}</div>}
                </div>
            );
        }

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
                                    <textarea
                                        type="text"
                                        className={classnames("form-control form-control-lg", {
                                            "is-invalid": errors.stackTrace
                                        })}
                                        placeholder="Stacktrace"
                                        name="stackTrace"
                                        value={this.state.stackTrace}
                                        onChange={this.onChange}
                                    >
                                        {" "}
                                    </textarea>
                                    {errors.stackTrace && (
                                        <div className="invalid-feedback">{errors.stackTrace}</div>
                                    )}
                                </div>
                                {populateSelect}
                                <div className="form-group">
                                    <input
                                        type="checkbox"
                                        name="isPrivate"
                                        checked={this.state.isPrivate || this.state.isPrivate}
                                        value="true"
                                        onChange={this.onChange}
                                    />{" "}
                                    Private?{" "}
                                    <span class="text-muted">
                                        - Only developers or administrators will see this issue
                                    </span>
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
    getCategories: PropTypes.func.isRequired,
    newIssue: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    categories: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors,
    categories: state.categories
});

export default connect(
    mapStateToProps,
    { newIssue, getCategories }
)(NewIssue);
