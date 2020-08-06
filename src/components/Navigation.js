import React from 'react';
import { Link } from 'react-router-dom';
import * as ROUTES from '../constants/routes';

const Navigation = () => {
  return (
    <div className="nav">
      <ul className="nav-links--container">
        {/* <li className="nav-links--link">
          <Link to={ROUTES.SIGN_IN}>Sign In</Link>
        </li> */}
        <li className="nav-links--link">
          <Link to={ROUTES.HOME}>Home</Link>
        </li>
        {/* <li className="nav-links--link">
          <Link to={ROUTES.HOME}>Landing</Link>
        </li> */}
        <li className="nav-links--link">
          <Link to={ROUTES.ALL_QUOTES}>Quotes</Link>
        </li>
      </ul>
    </div>
  );
};

export default Navigation;
