import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classnames from "classnames";
import { newCategory } from "../../actions/adminActions";
import { getCategories } from "../../actions/helperActions";
import "../../Admin.css";

class Categories extends Component {
    constructor() {
        super();
        this.state = {
            loaded: false,
            categoryName: "",
            errors: {}
        };
    }

    componentWillReceiveProps(nextProps) {
        nextProps.errors && this.setState({ errors: nextProps.errors });
    }

    async componentWillMount() {
        try {
            const response = await axios.get("/api/users/isadmin");
            (!this.props.auth.isAuthenticated || !response.data) && this.props.history.push("/");
        } catch (e) {
            this.props.history.push("/");
        }

        this.props.getCategories();
    }

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    onSubmit = e => {
        e.preventDefault();

        const newCategory = {
            categoryName: this.state.categoryName
        };

        this.props.newCategory(newCategory, this.props.history);
    };

    render() {
        const { errors } = this.state;
        const { categories } = this.props.helpers;
        let displayCategories;

        if (categories) {
            displayCategories = categories.map(category => {
                return (
                    <div class="col-sm-3 mb-2">
                        <div class="card">
                            <div class="card-body p-2">
                                <h5 class="card-title m-0">{category.name}</h5>
                            </div>
                        </div>
                    </div>
                );
            });
        }

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
                                    <Link className="nav-link active" to="/admin/categories">
                                        Categories
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/admin/issues">
                                        Issues
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </nav>
                    <div className="col-md-9 ml-sm-auto col-lg-10 px-4">
                        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                            <h1 className="h2">Categories</h1>
                        </div>
                        <form onSubmit={this.onSubmit}>
                            <div class="form-row">
                                <div class="col-2">
                                    <div className="form-group">
                                        <input
                                            type="text"
                                            className={classnames("form-control form-control-md ", {
                                                "is-invalid": errors.categoryName
                                            })}
                                            placeholder="New Category"
                                            name="categoryName"
                                            value={this.state.category}
                                            onChange={this.onChange}
                                        />
                                        {errors.categoryName && (
                                            <div className="invalid-feedback">
                                                {errors.categoryName}
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div class="col">
                                    <input type="submit" className="btn btn-dark" />
                                </div>
                            </div>
                        </form>
                        <div class="row">{categories && displayCategories}</div>
                    </div>
                </div>
            </main>
        );
    }
}

Categories.propTypes = {
    getCategories: PropTypes.func.isRequired,
    newCategory: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors,
    helpers: state.helpers
});

export default connect(
    mapStateToProps,
    { newCategory, getCategories }
)(Categories);
