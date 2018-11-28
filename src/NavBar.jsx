import React, { Component } from "react";

class Navbar extends Component {
    render() {
        return (
            <nav className="navbar">
                <a href="/" className="navbar-brand">Chatty</a>
                <h2 className="navbar-userCount">Users: {this.props.userCount}</h2>
            </nav>
        )
    }
}

export default Navbar;