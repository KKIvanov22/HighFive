import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ChatScreen = () => {
  const [message, setMessage] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);

  const handleSendMessage = () => {
    if (message.trim()) {
      // Logic to send message would go here
      setMessage('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const handleImageUpload = async () => {
    if (!selectedImage) {
      alert('Please select an image first.');
      return;
    }

    const formData = new FormData();
    formData.append('image', selectedImage);

    try {
      const response = await fetch('http://localhost:3005/upload_image', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();
      if (response.ok) {
        alert(`Image uploaded successfully: ${result.filename}`);
      } else {
        alert(`Error: ${result.error}`);
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Failed to upload image.');
    }
  };

  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      height: '88vh',
      backgroundColor: '#f5f5f5'
    },
    header: {
      textAlign: 'center',
      padding: '16px 0',
      backgroundColor: 'white',
      borderBottom: '1px solid #e0e0e0'
    },
    slogan: {
      fontSize: '18px',
      color: '#666',
      margin: 0
    },
    mainContent: {
      display: 'flex',
      flexGrow: 1
    },
    chatSection: {
      width: '66.67%',
      padding: '16px'
    },
    chatContainer: {
      backgroundColor: 'white',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      padding: '24px',
      height: '90%',
      overflowY: 'auto'
    },
    message: {
      marginBottom: '16px',
      padding: '12px',
      borderRadius: '8px',
      maxWidth: '240px'
    },
    userMessage: {
      backgroundColor: '#5aa9a9',
      color: 'white',
      marginLeft: 'auto'
    },
    botMessage: {
      backgroundColor: '#e6e6e6',
      color: '#333'
    },
    sideSection: {
      width: '33.33%',
      padding: '16px'
    },
    uploadBox: {
      backgroundColor: '#e6e6e6',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      padding: '24px',
      marginBottom: '16px',
      textAlign: 'center'
    },
    uploadArea: {
      border: '2px dashed #aaa',
      borderRadius: '4px',
      padding: '24px',
      marginBottom: '16px'
    },
    cameraIcon: {
      width: '80px',
      height: '80px',
      margin: '0 auto 16px',
      display: 'block',
      color: '#555'
    },
    uploadText: {
      color: '#666',
      fontSize: '18px'
    },
    challengesBox: {
      backgroundColor: '#6c757d',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      padding: '24px',
      color: 'white'
    },
    challengeItem: {
      marginBottom: '24px'
    },
    challengeTitle: {
      fontSize: '18px',
      marginBottom: '8px'
    },
    buttonContainer: {
      display: 'flex',
      justifyContent: 'flex-end'
    },
    
    inputContainer: {
      padding: '16px',
      backgroundColor: '#e6e6e6',
      borderTop: '1px solid #d4d4d4'
    },
    inputWrapper: {
      display: 'flex',
      alignItems: 'center',
      backgroundColor: 'white',
      borderRadius: '24px',
      padding: '8px 16px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    },
    input: {
      flexGrow: 1,
      outline: 'none',
      border: 'none',
      padding: '8px'
    },
    sendButton: {
      marginLeft: '8px',
      backgroundColor: 'transparent',
      border: 'none',
      color: '#5aa9a9',
      cursor: 'pointer'
    },
    navbar: {
        display: 'flex',
        alignItems: 'center',
        background: 'linear-gradient(to right, #d1e7e7, #d9e9ea)',
        padding: '10px 20px',
        borderBottom: '1px solid #bbd9d9',
        height: '70px'
      },
      logoContainer: {
        marginRight: '20px'
      },
      logo: {
        height: '60px',
        width: 'auto',
        borderRadius: '50%',
        border: '2px solid #5aa9a9'
      },
      navLinks: {
        display: 'flex',
        flexGrow: 1,
        justifyContent: 'center',
        gap: '60px'
      },
      navLink: {
        color: '#5aa9a9',
        textDecoration: 'none',
        fontSize: '24px',
        fontWeight: 'bold'
      }
  };

  return (
    
    <div>
      <div style={styles.container}>
        

        <div style={styles.mainContent}>
          <div style={styles.chatSection}>
            <div style={styles.chatContainer}>
              
            </div>
          </div>

          <div style={styles.sideSection}>
            <div style={styles.uploadBox}>
              <div style={styles.uploadArea}>
              <svg 
                style={styles.cameraIcon}
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
                <circle cx="12" cy="13" r="4"></circle>
              </svg>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setSelectedImage(e.target.files[0])}
                  style={{ marginBottom: '16px' }}
                />
                <button onClick={handleImageUpload} style={styles.sendButton}>
                  Upload Image
                </button>
              </div>
            </div>

            <div style={styles.challengesBox}>
              <div style={styles.challengeItem}>
                <h2 style={styles.challengeTitle}>1. Which type of material was used?</h2>
              </div>
              <div style={styles.challengeItem}>
                <h2 style={styles.challengeTitle}>2. Which company produced the clothing?</h2>
              </div>
              <div style={styles.buttonContainer}>
                
              </div>
            </div>
          </div>
        </div>

        <div style={styles.inputContainer}>
          <div style={styles.inputWrapper}>
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Send message"
              style={styles.input}
            />
            <button 
              onClick={handleSendMessage}
              style={styles.sendButton}
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatScreen;