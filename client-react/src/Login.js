import React from 'react'
import { useHistory, Link } from 'react-router-dom'

export default function Login (props) {
  const history = useHistory()

  function redirectHome (err) {
    if (err) return console.log(err)
    props.handleFetch()
    history.push('/')
  }

  return (
    <div>
      <h1>Login</h1>
      <div>
        <LoginForm onSubmit={props.handleLogin} redirectHome={redirectHome} />
      </div>
    </div>
  )
}

class LoginForm extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      username: '',
      password: ''
    }
  }

  handleChangeUsername (event) {
    this.setState({ username: event.target.value })
  }

  handleChangePassword (event) {
    this.setState({ password: event.target.value })
  }

  handleSubmit (evt) {
    evt.preventDefault()
    this.props.onSubmit({ username: this.state.username, password: this.state.password }, this.props.redirectHome)
  }

  render () {
    return (
      <div className='w-full max-w-xs'>
        <form className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4' id='login-form' onSubmit={this.handleSubmit.bind(this)}>
          <div className='mb-4'>
            <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' id='username' type='text' placeholder='username...' value={this.state.username} onChange={this.handleChangeUsername.bind(this)} />
          </div>
          <div className='mb-6'>
            <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' id='password' type='password' placeholder='password...' value={this.state.password} onChange={this.handleChangePassword.bind(this)} />
          </div>
          <div className='items-center'>
            <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline' type='submit'>Log in</button>
          </div>
        </form>

        <div className='login-signup-redirect'>
          <span>Don't have an account?</span>
          <Link to='/sign-up'>Sign up here</Link>
        </div>
      </div>
    )
  }
}
