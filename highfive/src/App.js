import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import styled from 'styled-components';
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


// Rename this component to App
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={
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
              <Input type="email" placeholder="Email" />
              <Input type="password" placeholder="Password" />
            </FormContainer>
          </Container>
        } />
        <Route path="/register" element={<Register />} />
        <Route path="/challenges" element={<Challenges />} />
        <Route path="/map" element={<BulgariaMap />} />
      </Routes>
    </Router>
  );
};

export default App;