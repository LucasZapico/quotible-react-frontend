import Axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useLocation, useHistory } from 'react-router-dom'
import axios from 'axios'
import { useAuthValue } from '../../context'

const emailReg = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/

const Login = () => {
  const { register, handleSubmit, watch, errors } = useForm()
  const [errorMessage, setErrorMessage] = useState('')
  const { currentUserObj, setCurrentUserObj } = useAuthValue()

  let history = useHistory()
  let location = useLocation()

  let { from } = location.state || { from: { pathname: '/' } }

  const onSubmit = data => {
    console.log(data)
    axios
      .post(
        `${process.env.REACT_APP_API_BASE_URL}/api/user/login`,
        data
      )
      .then(res => {
        console.log(res)
        setCurrentUserObj({
          email: res.data.email,
          token: res.data.token,
        })
        history.replace(from)
      })
      .catch(err => {
        console.log(err)
        setErrorMessage('The email or password was incorrect')
      })
  }
  // watch input value by passing the name of it

  return (
    <div className="login form">
      {/* "handleSubmit" will validate your inputs before invoking "onSubmit" */}
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* register your input into the hook by invoking the "register" function */}
        <div className="margin__bottom--m">
          <div className="input__container">
            <label>Email</label>
            <input
              name="email"
              // defaultValue="example@email.com"
              placeholder="example@email.com"
              ref={register({ required: true, pattern: emailReg })}
            />
          </div>
          {errors.email && (
            <div className="message__warn">Email is required</div>
          )}
        </div>
        <div className="margin__bottom--l">
          {/* include validation with required or other standard HTML validation rules */}
          <div className="input__container">
            <label>Password</label>
            <input
              name="password"
              ref={register({
                required: true,
                minLength: 10,
                maxLength: 40,
              })}
            />
            {/* errors will return when field validation fails  */}
          </div>
          {errors.password && (
            <div className="message__warn">Password is required</div>
          )}
        </div>
        {errorMessage !== '' ? (
          <div className="message__error">{errorMessage}</div>
        ) : undefined}
        <button
          className="btn btn__primary--light btn--fill"
          type="submit"
          value="Login"
        >
          Login
        </button>
      </form>
    </div>
  )
}

const SignUp = () => {
  const { register, handleSubmit, watch, errors } = useForm()
  const onSubmit = data => {
    console.log(data)

    axios
      .post(
        `${process.env.REACT_APP_API_BASE_URL}/api/user/signup`,
        data
      )
      .then(res => {
        console.log(res)
      })
  }
  // watch input value by passing the name of it

  return (
    <div className="signup form">
      {/* "handleSubmit" will validate your inputs before invoking "onSubmit" */}
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* register your input into the hook by invoking the "register" function */}
        <div className="margin__bottom--m">
          <div className="input__container">
            <label>Email</label>
            <input
              name="email"
              // defaultValue="example@email.com"
              placeholder="example@email.com"
              ref={register({ required: true, pattern: emailReg })}
            />
          </div>
          {errors.email && (
            <div className="message__warn">Email is required</div>
          )}
        </div>
        <div className="margin__bottom--l">
          {/* include validation with required or other standard HTML validation rules */}
          <div className="input__container">
            <label>Password</label>
            <input
              name="password"
              ref={register({
                required: true,
                minLength: 10,
                maxLength: 40,
              })}
            />
            {/* errors will return when field validation fails  */}
          </div>
          {errors.password && (
            <div className="message__warn">Password is required</div>
          )}
        </div>
        <button
          className="btn btn__primary--light btn--fill"
          type="submit"
          value="Sign Up"
        >
          Sign Up
        </button>
      </form>
    </div>
  )
}

const AuthPage = props => {
  const location = useLocation()
  console.log(location)
  const [signup, setSignup] = useState('true')
  return (
    <div className="page auth container__content">
      {location.pathname.includes('login') ? <Login /> : <SignUp />}
    </div>
  )
}

export default AuthPage
