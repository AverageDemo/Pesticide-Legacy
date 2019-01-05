import React from "react";

export default function Footer() {
    return (
        <footer className="mt-auto py-1">
            <div className="container">
                Copyright &copy;{new Date().getFullYear()} Bugtracker
                <ul className="float-right list-inline mb-0">
                    <li className="list-inline-item">
                        <a className="footerItem" href="#">
                            About
                        </a>
                    </li>
                    <li className="list-inline-item">
                        <a className="footerItem" href="#">
                            Terms of Service
                        </a>
                    </li>
                </ul>
            </div>
        </footer>
    );
}
