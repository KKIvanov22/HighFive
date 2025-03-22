import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios'; 
import Register from './Register';
import Challenges from './Challenges';
import BulgariaMap from './map';

const Container = styled.div`
  background-color: rgb(255, 255, 255);
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center; /* Center content vertically */
  min-height: 100vh;
`;

const TopBar = styled.div`
  width: 100%;
  height: 50px; /* Adjust height as needed */
  background-color: #679090; /* Example background color */
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-weight: bold;
`;

const AuthLinks = styled.div`
  display: flex;
  justify-content: space-between;
  width: 50%;
  margin-bottom: 20px;
  color: #679090;
  text-decoration: none;
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
  padding: 40px; /* Increase padding to expand the background */
  border-radius: 8px;
  width: 400px; /* Expand the background width */
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FormContent = styled.div`
  width: 300px; /* Keep the form itself the same size */
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
  width: 100%;a
  padding: 10px;
  background-color: #679090;
  color: white;
  border: none;
  border-radius: 4px;
  font-weight: bold;
  cursor: pointer;
  margin-left: 9px;
  &:hover {
    background-color: #557575;
  }
`;

const Header = styled.header`
  
  width: 100%;
  height: 150px; /* Increased height to accommodate the new div */
  background-color: #cfe1e5;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column; /* Stack elements vertically */
  justify-content: center;
  align-items: center;
  padding: 0 20px;
  box-sizing: border-box;
`;

const HeaderTop = styled.div`
  width: 100%;
  background-color: #679090; /* Example background color */
  color: white;
  text-align: center;
  padding: 10px 0;
  font-weight: bold;
`;

const HeaderContent = styled.div`
  width: 90%; /* Adjust width as needed */
  display: flex;
  justify-content: space-between;
  font-size: 20px;
`;

const HeaderText = styled.div`
  text-align: center;
`;

const HeaderSpan = styled.span`
  display: block;
  color: #4a4a4a;
  font-weight: 500;
  margin-bottom: 5px;
`;

const HeaderLink = styled(AuthLink)`
  color: #  color: #679090;
  text-decoration: none;
  font-weight: bold;
  font-size: 42px;
  &:hover {
    text-decoration: underline;
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
              
              <Header>
               
                <HeaderContent>
                <img src="https://media.discordapp.net/attachments/1351242842542178443/1352954923695870023/logo.png?ex=67dfe4f6&is=67de9376&hm=6ea249977282f867eed42b771b13fa796a785f8efb73198d6385c080b43bba8f&=&format=webp&quality=lossless&width=603&height=504" alt="HighFive Logo" style={{ height: '100px' }} />                  
                  <HeaderText>
                    <HeaderSpan>Don't have an account? Make one instantly!</HeaderSpan>
                    <HeaderLink to="/register">REGISTER</HeaderLink>
                  </HeaderText>
                  <HeaderText>
                    <HeaderSpan>Already have an account? Login now!</HeaderSpan>
                    <HeaderLink to="/">LOGIN</HeaderLink>
                  </HeaderText>
                </HeaderContent>
              </Header>
              <FormContainer>
                <FormContent>
                  <Title>LOGIN</Title>
                  <form onSubmit={handleLogin}>
                    <div style={{ marginBottom: '15px', textAlign: 'left' }}>
                      <label htmlFor="email" style={{ color: '#92A0A2', fontWeight: 'bold' }}>Email</label>
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <div style={{ marginBottom: '15px', textAlign: 'left' }}>
                      <label htmlFor="password" style={{ color: '#92A0A2', fontWeight: 'bold' }}>Password</label>
                      <Input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    <div style={{ textAlign: 'center' }}>
                      <Button type="submit">submit</Button>
                    </div>
                  </form>
                </FormContent>
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