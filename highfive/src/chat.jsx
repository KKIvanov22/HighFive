import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Chart from 'chart.js/auto';  // Add this import

const ChatScreen = () => {
  const [message, setMessage] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [chatMessages, setChatMessages] = useState([]);
  const [showWaterChart, setShowWaterChart] = useState(false);
  const chartRef = useRef(null);

  useEffect(() => {
    if (selectedImage) {
      const objectUrl = URL.createObjectURL(selectedImage);
      setImagePreview(objectUrl);
      
      return () => URL.revokeObjectURL(objectUrl);
    }
  }, [selectedImage]);

  useEffect(() => {
    if (showWaterChart && chartRef.current) {
      const ctx = chartRef.current.getContext('2d');
      
      // Clear any existing chart
      if (window.waterConsumptionChart) {
        window.waterConsumptionChart.destroy();
      }
      
      // Data for each brand
      const brands = ['Adidas', 'Forever 21', 'Nike', 'Louis Vuitton', 'H&M', 'Zara'];
      const waterConsumption = [4276, 4111, 4998, 2700, 2700, 2700]; // in litres

      // Create the chart
      window.waterConsumptionChart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: brands,
          datasets: [{
            label: 'Water Consumption (litres)',
            data: waterConsumption,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: 'Litres of Water'
              }
            }
          },
          plugins: {
            title: {
              display: true,
              text: 'Water Consumption per Cotton T-Shirt by Brand'
            }
          }
        }
      });
    }
  }, [showWaterChart]);

  const handleSendMessage = async () => {
    if (message.trim() && selectedImage) {
      const userMessage = {
        text: message,
        isUser: true,
        id: Date.now()
      };
      setChatMessages(prevMessages => [...prevMessages, userMessage]);
      
      const formData = new FormData();
      formData.append('image', selectedImage);
      formData.append('brand', message.trim());

      try {
        setChatMessages(prevMessages => [
          ...prevMessages, 
          { text: "Processing your request...", isUser: false, id: Date.now() + 1 }
        ]);

        const response = await fetch('http://localhost:3005/upload_image', {
          method: 'POST',
          body: formData,
        });

        const result = await response.json();
        
        setChatMessages(prevMessages => 
          prevMessages.filter(msg => msg.text !== "Processing your request...")
        );

        if (response.ok) {
          const botMessage = {
            text: `Material: ${result.material} (${result.material_confidence})\n\nEffect: ${result.effect}`,
            isUser: false,
            id: Date.now() + 2
          };
          setChatMessages(prevMessages => [...prevMessages, botMessage]);
          
          setMessage('');
          setSelectedImage(null);
          setShowWaterChart(true); // Show the chart after successful response
        } else {
          const errorMessage = {
            text: `Error: ${result.error}`,
            isUser: false,
            id: Date.now() + 2
          };
          setChatMessages(prevMessages => [...prevMessages, errorMessage]);
          setShowWaterChart(false);
        }
      } catch (error) {
        console.error('Error processing request:', error);
        const errorMessage = {
          text: "Failed to process your request. Please try again.",
          isUser: false,
          id: Date.now() + 2
        };
        setChatMessages(prevMessages => [...prevMessages, errorMessage]);
      }
    } else if (!selectedImage) {
      alert('Please select an image first.');
    } else if (!message.trim()) {
      alert('Please enter the brand name.');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const handleImageUpload = (e) => {
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
    }
    setSelectedImage(e.target.files[0]);
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
      maxWidth: '70%',
      whiteSpace: 'pre-wrap'
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
      padding: '40px 24px 24px 30px',
      marginBottom: '16px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
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
    imageSelected: {
      marginTop: '10px',
      color: '#5aa9a9',
      fontWeight: 'bold'
    },
    chartContainer: {
      backgroundColor: 'white',
      padding: '15px',
      borderRadius: '8px',
      marginTop: '20px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      width: '100%'
    },
  };

  return (
    <div>
      <div style={styles.container}>
        <div style={styles.mainContent}>
          <div style={styles.chatSection}>
            <div style={styles.chatContainer}>
              {chatMessages.map(msg => (
                <div 
                  key={msg.id}
                  style={{
                    ...styles.message,
                    ...(msg.isUser ? styles.userMessage : styles.botMessage)
                  }}
                >
                  {msg.text}
                </div>
              ))}
              
              {showWaterChart && (
                <div style={styles.chartContainer}>
                  <h3>Water Consumption for Cotton T-Shirts by Brand</h3>
                  <canvas ref={chartRef} width="400" height="200"></canvas>
                </div>
              )}
            </div>
          </div>
          
          <div style={styles.sideSection}>
            <div style={styles.uploadBox}>
              <div style={styles.uploadArea}>
                {!imagePreview ? (
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
                ) : (
                  <img 
                    src={imagePreview} 
                    alt="Preview" 
                    style={{
                      maxWidth: '100%',
                      maxHeight: '200px',
                      marginBottom: '16px',
                      borderRadius: '4px'
                    }} 
                  />
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  style={{ marginBottom: '16px' }}
                />
                {selectedImage && (
                  <div style={styles.imageSelected}>
                    Image selected: {selectedImage.name}
                  </div>
                )}
              </div>
            </div>

            <div style={styles.challengesBox}>
              <div style={styles.challengeItem}>
                <h2 style={styles.challengeTitle}>1. Which type of material was used?</h2>
                <p>Upload an image to identify the material</p>
              </div>
              <div style={styles.challengeItem}>
                <h2 style={styles.challengeTitle}>2. Which company produced the clothing?</h2>
                <p>Type the brand name in the message box</p>
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
              placeholder="Enter the brand name"
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