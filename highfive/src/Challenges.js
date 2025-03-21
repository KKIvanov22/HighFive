import React from 'react';
import styled from 'styled-components';
import cameraIcon from '../assets/camera-icon.png'; // Replace with the actual camera icon path

const Container = styled.div`
  background-color: #DDE3E3;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
`;

const Content = styled.div`
  display: flex;
  justify-content: space-between;
  width: 80%;
  margin-bottom: 20px;
`;

const UploadSection = styled.div`
  background-color: #CFE1E5;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
  width: 45%;
`;

const CameraIcon = styled.img`
  width: 100px;
  height: 100px;
  margin-bottom: 10px;
`;

const QuestionsSection = styled.div`
  background-color: #6E7A7A;
  padding: 20px;
  border-radius: 8px;
  color: white;
  width: 45%;
`;

const TextSection = styled.div`
  text-align: left;
  width: 80%;
`;

const Title = styled.h1`
  color: #679090;
  font-size: 36px;
  margin-bottom: 10px;
`;

const Subtitle = styled.h2`
  color: #679090;
  font-size: 24px;
  margin: 10px 0;
`;

const Text = styled.p`
  color: #679090;
  font-size: 16px;
  margin: 10px 0;
`;

const ChatInput = styled.input`
  width: 80%;
  padding: 10px;
  background-color: #CFE1E5;
  border: none;
  border-radius: 4px;
  color: #679090;
  &::placeholder {
    color: #679090;
  }
`;

const Challenges = () => {
  return (
    <Container>
      <Content>
        <UploadSection>
          <CameraIcon src={cameraIcon} alt="Camera Icon" />
          <Text>Upload an image</Text>
        </UploadSection>
        <QuestionsSection>
          <Text>1. Which type of material was used?</Text>
          <Text>2. Which company produced the clothing?</Text>
        </QuestionsSection>
      </Content>
      <TextSection>
        <Title>Challenge yourself NOW!</Title>
        <Subtitle>The $10 Thrift Store Challenge: Can You Do It?</Subtitle>
        <Text>
          Think you’ve got style? Prove it. Your mission: create an entire outfit — head to toe — using only $10 and thrift store finds.
        </Text>
        <Subtitle>Why?</Subtitle>
        <Text>
          Fast fashion is drowning our planet. Water shortages, textile waste, pollution — it’s all connected. But you? You can make a difference.
        </Text>
        <Subtitle>The Challenge:</Subtitle>
        <Text>1. Hit your local thrift store.</Text>
        <Text>2. Build an epic, stylish outfit for $10 or less.</Text>
        <Text>3. Share your look and inspire others.</Text>
        <Text>Show us your outfit</Text>
        <Subtitle>Are you bold enough to prove fashion doesn’t have to cost the earth — or your wallet?</Subtitle>
      </TextSection>
      <ChatInput type="text" placeholder="Send message" />
    </Container>
  );
};

export default Challenges;