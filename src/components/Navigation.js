import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import * as ROUTES from '../constants/routes'
import {
  IoIosMenu,
  IoIosClose,
  IoIosPerson,
  IoMdHeart,
} from 'react-icons/io'
import { useAuthValue } from '../context'

const NavAuth = () => {
  const { setCurrentUserObj } = useAuthValue()
  return (
    <div className="nav">
      <div className="nav__item">
        <Link to={ROUTES.HOME}>Mark</Link>&nbsp;
      </div>
      <ul className="nav__items">
        <li
          className="nav__item"
          onClick={() => setCurrentUserObj('')}
        >
          Sign Out
        </li>
      </ul>
    </div>
  )
}

const NavNonAuth = () => {
  return (
    <div className="nav">
      <div className="nav__item">
        <Link to={ROUTES.HOME}>Mark</Link>&nbsp;
      </div>
      <ul className="nav__items">
        <li className="nav__item">
          <Link to={ROUTES.LOG_IN}>Login</Link>&nbsp;
          <IoIosPerson />
        </li>
        {'/'}
        <li className="nav__item">
          <Link to={ROUTES.SIGN_UP}>Sign Up</Link>&nbsp;
          <IoIosPerson />
        </li>
      </ul>
    </div>
  )
}

const Navigation = () => {
  const { currentUserObj } = useAuthValue()
  useEffect(() => {
    console.log('nav', currentUserObj)
    return () => {}
  }, [currentUserObj])
  return (
    <div className="nav__container">
      {currentUserObj !== '' ? <NavAuth /> : <NavNonAuth />}
    </div>
  )
}

export default Navigation
