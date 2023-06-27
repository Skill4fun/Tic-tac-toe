////------------------ Navbar ------------------
// Custom simple navigation bar component for multiple use

import React from 'react';
import './Navbar.scss';
import { Link } from 'react-router-dom';
import { useLoggedInUserContext } from '../../helper/LoggedInUserContextProvider';

export default function Navbar() {
  const { loggedInUser, setLoggedInUser } = useLoggedInUserContext();

  return (
    <div className="navbar-header">
      <div className="text-center mb-5">
        <h1>Amőba</h1>
        {loggedInUser === true
          ? (
            <Link
              className="btn btn-secondary m-3" to='/login'
              onClick={() => { setLoggedInUser({}); localStorage.removeItem('tictactoeToken') }}
            >
              Kijelentkezés
            </Link>)
          : (
            <>
              <Link
                className="btn btn-secondary m-3" to='/login'>
                Bejelentkezés
              </Link>
              <Link
                className="btn btn-secondary m-3" to='/gameboard'>
                Játék
              </Link>
            </>
          )
        }
      </div>
    </div>
  );
};