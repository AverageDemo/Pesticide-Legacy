import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <footer className="mt-auto py-1">
            <div className="container">
                Copyright &copy;{new Date().getFullYear()} Pesticide
                <ul className="float-right list-inline mb-0">
                    <li className="list-inline-item">
                        <Link className="footerItem" to="#">
                            About
                        </Link>
                    </li>
                    <li className="list-inline-item">
                        <Link className="footerItem" to="#">
                            Terms of Service
                        </Link>
                    </li>
                </ul>
            </div>
        </footer>
    );
}
