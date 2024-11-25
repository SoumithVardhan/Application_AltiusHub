import './App.css';
import { useState } from 'react';

export default function App() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Real-time validation
    switch (name) {
      case 'email':
        setErrors({
          ...errors,
          email: /\S+@\S+\.\S+/.test(value) ? '' : 'Invalid email format.',
        });
        break;
      case 'password':
        setErrors({
          ...errors,
          password: value.length >= 6 ? '' : 'Password must be at least 6 characters.',
        });
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check for client-side validation
    if (!formData.email || !formData.password || errors.email || errors.password) {
      alert('Please fix the validation errors before submitting.');
      return;
    }

    try {
      // const response = await axios.post('http://localhost:4000/', formData);
      setSuccessMessage('User registered successfully!');
      setFormData({ firstName: '', lastName: '', email: '', password: '' });
    } catch (error) {
      setErrors({ ...errors, server: error.response?.data?.message || 'Server error' });
    }
  };

  return (
    <main>
      <h1>Register</h1>
      <form onSubmit={handleSubmit} className="form-container">
        <div className="form-field">
          <label>First Name:</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-field">
          <label>Last Name:</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-field">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <span className="error">{errors.email}</span>}
        </div>
        <div className="form-field">
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && <span className="error">{errors.password}</span>}
        </div>
        {errors.server && <span className="error">{errors.server}</span>}
        {successMessage && <span className="success">{successMessage}</span>}
        <button type="submit">Register</button>
      </form>
    </main>
  );
}
