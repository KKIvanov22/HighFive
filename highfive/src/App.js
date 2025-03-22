import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios'; // Import axios
import Register from './Register';
import Challenges from './Challenges';
import BulgariaMap from './map';

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

const App = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post('http://localhost:3005/login', {
        email,
        password,
      });

      alert('Login successful!');
    } catch (err) {
      if (err.response && err.response.data) {
        setError(err.response.data.error || 'Login failed');
      } else {
        setError('An error occurred. Please try again.');
      }
    }
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
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
                <Title>LOGIN</Title>
                <form onSubmit={handleLogin}>
                  <Input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <Input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  {error && <p style={{ color: 'red' }}>{error}</p>}
                  <Button type="submit">Login</Button>
                </form>
              </FormContainer>
            </Container>
          }
        />
        <Route path="/register" element={<Register />} />
        <Route path="/challenges" element={<Challenges />} />
        <Route path="/map" element={<BulgariaMap />} />
      </Routes>
    </Router>
  );
};

export default App;