import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateProfile } from '../action';
import { Link } from 'react-router-dom';

const Profile = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state: any) => state.signUpData);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState(userData);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(updateProfile(formData));
    setEditMode(false);
  };

  return (
    <div className="container">
      <h1>Profile</h1>
      {userData ? (
        !editMode ? (
          <div className="mb-4">
            <div>
              <strong>First Name:</strong> {userData.firstName}
            </div>
            <div>
              <strong>Last Name:</strong> {userData.lastName}
            </div>
            <div>
              <strong>Gender:</strong> {userData.gender}
            </div>
            <div>
              <strong>Date of Birth:</strong> {userData.dob}
            </div>
            <div>
              <strong>Email:</strong> {userData.email}
            </div>
            <div>
              <strong>Mobile:</strong> {userData.mobile}
            </div>
            <button className="btn btn-primary mt-2" onClick={() => setEditMode(true)}>Edit</button>
          </div>
        ) : (
          <form onSubmit={handleFormSubmit}>
            <div className="mb-3">
              <label htmlFor="firstName" className="form-label">First Name:</label>
              <input
                required
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="lastName" className="form-label">Last Name:</label>
              <input
                required
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="gender" className="form-label">Gender:</label>
              <input
                required
                type="text"
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="dob" className="form-label">Date of Birth:</label>
              <input
                required
                type="date"
                id="dob"
                name="dob"
                value={formData.dob}
                onChange={handleInputChange}
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email:</label>
              <input
                required
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="mobile" className="form-label">Mobile:</label>
              <input
                required
                type="tel"
                id="mobile"
                name="mobile"
                value={formData.mobile}
                onChange={handleInputChange}
                className="form-control"
              />
            </div>
            <button type="submit" className="btn btn-primary">Update</button>
            <button className="btn btn-secondary ms-2" onClick={() => setEditMode(false)}>Cancel</button>
          </form>
        )
      ) : (
        <div>
          <Link to="/" >
         No User Found Click to Sign up
        </Link>
        </div>
      )}
    </div>
  );
};

export default Profile;
