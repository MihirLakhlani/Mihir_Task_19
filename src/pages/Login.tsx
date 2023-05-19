import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../action';

interface LoginProps {
  login: (email: string) => void;
  loggedInUser: any; // Update the type as per your user data structure
}

const Login: React.FC<LoginProps> = ({ login, loggedInUser }) => {
  const [email, setEmail] = useState('');
  const [loginError, setLoginError] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (loggedInUser && loggedInUser.email === email) {
      // Dispatch the login action with the email
      login(email);
      // Reset form fields after successful submission
      setEmail('');
      setLoginError(false);
      // Navigate to the home page
      navigate('/home');
    } else {
      // Show login error
      setLoginError(true);
    }
  };

  if (loggedInUser && loggedInUser.email) {
    // Redirect to the home page if the user is already logged in
    navigate('/home');
  }

  const handleSignOut = () => {
    navigate('/');
  };

  return (
    <div>
      <h2>Login</h2>
      <p>
        Don't have an account?{' '}
        <Link to="/" onClick={handleSignOut}>
          Sign up
        </Link>
      </p>
      {loginError && <p>Invalid email</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </form>
    </div>
  );
};

const mapStateToProps = (state: any) => {
  return {
    loggedInUser: state.loggedInUser,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    login: (email: string) => dispatch(login(email)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
