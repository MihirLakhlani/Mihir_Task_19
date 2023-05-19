import React, { useState } from 'react';
import { connect } from 'react-redux';
import { signUp } from '../action';
import { Link, useNavigate } from 'react-router-dom';

interface SignUpProps {
  signUp: (userData: {
    firstName: string;
    lastName: string;
    gender: string;
    dob: string;
    email: string;
    mobile: string;
  }) => void;
}

const SignUp: React.FC<SignUpProps> = ({ signUp }) => {
  const history = useNavigate();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [gender, setGender] = useState('');
  const [dob, setDob] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');

  const [firstNameError, setFirstNameError] = useState('');
  const [lastNameError, setLastNameError] = useState('');
  const [genderError, setGenderError] = useState('');
  const [dobError, setDobError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [mobileError, setMobileError] = useState('');

  const validateForm = () => {
    let isValid = true;

    // Validate First Name
    if (firstName.trim() === '') {
      setFirstNameError('First Name is required');
      isValid = false;
    } else {
      setFirstNameError('');
    }

    // Validate Last Name
    if (lastName.trim() === '') {
      setLastNameError('Last Name is required');
      isValid = false;
    } else {
      setLastNameError('');
    }

    // Validate Gender
    if (gender === '') {
      setGenderError('Gender is required');
      isValid = false;
    } else {
      setGenderError('');
    }

    // Validate Date of Birth
    if (dob === '') {
      setDobError('Date of Birth is required');
      isValid = false;
    } else {
      setDobError('');
    }

    // Validate Email
    if (email.trim() === '') {
      setEmailError('Email is required');
      isValid = false;
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      setEmailError('Invalid email format');
      isValid = false;
    } else {
      setEmailError('');
    }

    // Validate Mobile
    if (mobile.trim() === '') {
      setMobileError('Mobile is required');
      isValid = false;
    } else if (!/^\d{10}$/.test(mobile)) {
      setMobileError('Mobile number must be 10 digits');
      isValid = false;
    } else {
      setMobileError('');
    }

    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      signUp({
        firstName,
        lastName,
        gender,
        dob,
        email,
        mobile,
      });

      // Reset form fields after successful submission
      setFirstName('');
      setLastName('');
      setGender('');
      setDob('');
      setEmail('');
      setMobile('');

      history('/home');
    }
  };

  const handleSignIn = () => {
    history('/login');
  };

  return (
    <div className="container">
      <h2>Sign Up</h2>

      <p>
        Already have an account?{' '}
        <Link to="/login" onClick={handleSignIn}>
          Sign in
        </Link>
      </p>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="firstName" className="form-label">
            First Name:
          </label>
          <input
            type="text"
            className="form-control"
            id="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          {firstNameError && <div className="text-danger">{firstNameError}</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="lastName" className="form-label">
            Last Name:
          </label>
          <input
            type="text"
            className="form-control"
            id="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          {lastNameError && <div className="text-danger">{lastNameError}</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="gender" className="form-label">
            Gender:
          </label>
          <select
            className="form-select"
            id="gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          >
            <option value="">Select</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          {genderError && <div className="text-danger">{genderError}</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="dob" className="form-label">
            Date of Birth:
          </label>
          <input
            type="date"
            className="form-control"
            id="dob"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
          />
          {dobError && <div className="text-danger">{dobError}</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email:
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {emailError && <div className="text-danger">{emailError}</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="mobile" className="form-label">
            Mobile:
          </label>
          <input
            type="tel"
            className="form-control"
            id="mobile"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
          />
          {mobileError && <div className="text-danger">{mobileError}</div>}
        </div>
        <button type="submit" className="btn btn-primary">
          Sign Up
        </button>
      </form>
    </div>
  );
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    signUp: (userData: {
      firstName: string;
      lastName: string;
      gender: string;
      dob: string;
      email: string;
      mobile: string;
    }) => dispatch(signUp(userData)),
  };
};

export default connect(null, mapDispatchToProps)(SignUp);
