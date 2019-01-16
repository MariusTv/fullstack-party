import React from 'react';
import { Link } from 'react-router-dom';

class Header extends React.Component {
    render() {
        return (
            <div className="header">
                <Link to="/">
                    <img src="/images/testio-logo.png" alt="Testio logo" />
                </Link>
                <a href="/logout" className="header__button">
                    <span className="show-for-desktop">Logout</span>
                </a>
            </div>
        );
    }
}

export default Header;