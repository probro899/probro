import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '@blueprintjs/core';
import { IconNames } from '@blueprintjs/icons';

class Navbar extends Component {
    render() {
        return(
          <div className="navbar">
            <div className="navbar-left">
                <Link to="#">
                    <div className="navbar-item">
                        <span>ProBro</span>
                    </div>
                </Link>
                <Link to="#">
                    <div className="navbar-item">
                        <span>Blogs
                            <Icon icon={IconNames.CARET_DOWN} iconSize={Icon.SIZE_LARGE} />
                        </span>
                    </div>
                </Link>
                <Link to="#">
                    <div className="navbar-item">
                        <span>Get Help
                            <Icon icon={IconNames.CARET_DOWN} iconSize={Icon.SIZE_LARGE} />
                        </span>
                    </div>
                </Link>
            </div>
            <div className="navbar-right">
                <Link to="#">
                    <div className="navbar-item">
                        <span>Take a Tour
                            <Icon icon={IconNames.CARET_DOWN} iconSize={Icon.SIZE_LARGE} />
                        </span>
                    </div>
                </Link>
                <Link to="/login">
                    <div className="navbar-item">
                        <span>Login</span>
                    </div>
                </Link>
            </div>
          </div>
        );
    }
}

export default Navbar;