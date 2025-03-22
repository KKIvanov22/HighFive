import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';

const Container = styled.div`
  position: relative;
  background: #CFE1E5;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

const Logo = styled.img`
  position: absolute;
  top: 20px;
  left: 20px;
  width: 130px;
`;

const Card = styled.div`
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  padding: 40px;
  width: 350px;
  text-align: center;
`;

const Title = styled.h2`
  color: #6E7A7A; // Changed from #2d3436 to #6E7A7A
  margin-bottom: 20px;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px; // Increased from 10px for consistency
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
  box-sizing: border-box; // Added for consistent sizing
  &:focus {
    border-color: #74b9ff;
    outline: none;
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 12px; // Increased from 10px to match inputs
  background-color: #649D9D;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  margin-top: 10px;
  box-sizing: border-box; // Added for consistent sizing
  &:hover {
    background-color: #5A8C8C;
  }
`;

const LinkContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const StyledLink = styled(Link)`
  color: rgb(90, 169, 170);
  text-decoration: none;
  font-weight: bold;
  &:hover {
    text-decoration: underline;
  }
`;

const Message = styled.p`
  margin-top: 15px;
  color: #d63031;
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
      const response = await axios.post(
        'http://localhost:3005/register',
        formData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response?.data?.error || 'Registration failed');
    }
  };

  return (
    <Container>
      <Logo src="https://media.discordapp.net/attachments/1351242842542178443/1352954923695870023/logo.png?ex=67dfe4f6&is=67de9376&hm=6ea249977282f867eed42b771b13fa796a785f8efb73198d6385c080b43bba8f&=&format=webp&quality=lossless&width=603&height=504" alt="HighFive Logo" style={{ height: '100px' }} />
      <Card>
        <Title>Register</Title>
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
            placeholder="Phone Number"
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
        {message && <Message>{message}</Message>}
        <LinkContainer>
          <StyledLink to="/">Already have an account?</StyledLink>
        </LinkContainer>
      </Card>
    </Container>
  );
};

export default Register;