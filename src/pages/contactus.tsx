import React, { useState } from 'react';

const ContactUs = () => {
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [formError, setFormError] = useState(false);

  const handleSubmit = (e:any) => {
    e.preventDefault();

    // Validate form fields
    if (!subject.trim() || !body.trim()) {
      setFormError(true);
      return;
    }

    // Logic to handle form submission (e.g., send email)
    alert(`${subject} has been sent`);
    // console.log('Body:', body);

    // Reset form fields and error state
    setSubject('');
    setBody('');
    setFormError(false);
  };

  return (
    <div className="container">
      <h1>Contact Us</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="subject" className="form-label">Subject:</label>
          <input
            type="text"
            id="subject"
            className="form-control"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="body" className="form-label">Body:</label>
          <textarea
            id="body"
            className="form-control"
            value={body}
            onChange={(e) => setBody(e.target.value)}
          ></textarea>
        </div>
        {formError && (
          <div className="alert alert-danger" role="alert">
            Please fill in all fields.
          </div>
        )}
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default ContactUs;
