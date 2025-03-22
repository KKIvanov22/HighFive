import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';

const Container = styled.div`
  background-color: #DDE3E3;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
`;

const AuthLinks = styled.div`
  display: flex;
  justify-content: space-between;
  width: 50%;
  margin-bottom: 20px;
`;

const AuthLink = styled(Link)`
  color: #679090;
  text-decoration: none;
  font-weight: bold;
  &:hover {
    text-decoration: underline;
  }
`;

const FormContainer = styled.div`
  background-color: #CFE1E5;
  padding: 20px;
  border-radius: 8px;
  width: 300px;
  text-align: center;
`;

const Title = styled.h2`
  color: #679090;
  margin-bottom: 20px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  background-color: #6E7A7A;
  border: none;
  border-radius: 4px;
  color: white;
  &::placeholder {
    color: white;
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #679090;
  color: white;
  border: none;
  border-radius: 4px;
  font-weight: bold;
  cursor: pointer;
  &:hover {
    background-color: #557575;
  }
`;

const Register = () => {
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    phoneNumber: '',
    password: '',
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3005/register', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response?.data?.error || 'Registration failed');
    }
  };

  return (
    <Container>
      <AuthLinks>
        <div>
          <span>Don't have an account? Make one instantly!</span>
          <AuthLink to="/register"> REGISTER</AuthLink>
        </div>
        <div>
          <span>Already have an account? Login now!</span>
          <AuthLink to="/"> LOGIN</AuthLink>
        </div>
      </AuthLinks>
      <FormContainer>
        <Title>REGISTER</Title>
        <form onSubmit={handleSubmit}>
          <Input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />
          <Input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
          />
          <Input
            type="tel"
            name="phoneNumber"
            placeholder="Phone"
            value={formData.phoneNumber}
            onChange={handleChange}
          />
          <Input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />
          <Button type="submit">Register</Button>
        </form>
        {message && <p>{message}</p>}
      </FormContainer>
    </Container>
  );
};

export default Register;