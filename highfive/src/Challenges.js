import React from 'react';
import ReactPlayer from 'react-player'; // Import ReactPlayer
import video from './1.mp4'; // Import the video file (ensure the file is in the correct path)
import logo from './figma/logo.png'; // Import the logo image (ensure the file is in the correct path)

function Challenges() {
  // Define styles as JavaScript objects
  const styles = {
    challenges: {
      // No specific styles were applied to the root .Challenges class, so this can be empty
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: '#CFE1E5', // Light green
      padding: '10px 20px',
    },
    logo: {
      width: '40px',
      height: '40px',
    },
    nav: {
      display: 'flex',
      gap: '20px',
      justifyContent: 'center', // Center the navigation links
      alignItems: 'center', // Align items vertically in the center
    },
    navLink: {
      textDecoration: 'none',
      color: '#649D9D', // Dark green for navigation links
      fontWeight: 'bold',
      fontSize: '18px', // Bigger font size
    },
    navSpacer: {
      width: '40px', // Spacer to balance the layout and center the nav
    },
    subheader: {
      backgroundColor: 'transparent', // No green background
      textAlign: 'center', // Centered
      padding: '5px 0',
      fontSize: '16px', // Increased font size
      color: '#6E7A7A', // Grey for secondary text
      marginTop: '10px', // Separate it from the navbar
    },
    videoSection: {
      margin: '80px 0', // Increased margin to add more space above and below the video
    },
    videoPlayer: {
      maxWidth: '800px', // Increased width
      height: 'auto', // Adjust height to maintain aspect ratio
      borderRadius: '8px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      margin: '0 auto', // Center the video
    },
    mainContent: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '40px 20px',
      textAlign: 'center', // Center the main heading
    },
    mainHeading: {
      fontSize: '50px', // Increased font size
      fontWeight: 'bold',
      color: '#649D9D', // Dark green for the main heading
      marginBottom: '60px', // Increased margin to add more space below
      textAlign: 'center', // Centered
    },
    contentWrapper: {
      display: 'flex',
      justifyContent: 'space-between',
      gap: '40px',
      alignItems: 'flex-start', // Align items to the top
      marginTop: '40px', // Added margin to move the text boxes further down
    },
    leftColumn: {
      flex: 1,
      textAlign: 'center', // Center the text blocks within the column
    },
    rightColumn: {
      flex: 1,
      textAlign: 'center', // Center the text blocks within the column
    },
    textBox: {
      marginBottom: '50px', // Vertical separation between text boxes
      maxWidth: '300px', // Shorten the text boxes horizontally
      marginLeft: 'auto', // Center the text box within the column
      marginRight: 'auto', // Center the text box within the column
    },
    textBoxLast: {
      marginBottom: '0', // Remove margin from the last text box
    },
    textBoxHeading: {
      fontSize: '26px', // Increased font size
      fontWeight: 'bold',
      marginBottom: '15px',
      color: '#6E7A7A', // Grey for the heading
      textAlign: 'center', // Center the heading
    },
    textBoxParagraph: {
      fontSize: '18px', // Increased font size
      lineHeight: 1.0, // Reduced line height to make text more "snatched"
      marginBottom: '15px',
      color: '#6E7A7A', // Grey for the text
      textAlign: 'center', // Center the text
    },
    textBoxList: {
      listStylePosition: 'inside',
      fontSize: '18px', // Increased font size
      lineHeight: 1.0, // Reduced line height to make text more "snatched"
      paddingLeft: '0', // Remove default padding for better alignment
      color: '#6E7A7A', // Grey for the text
      textAlign: 'center', // Center the list
    },
    plusIcon: {
      width: '100px',
      height: '100px',
      backgroundColor: '#DDE3E3', // Dark green for the plus icon background
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      fontSize: '70px',
      color: '#6E7A7A', // Grey for the plus icon
      margin: '0 auto',
    },
    footerQuestion: {
      fontSize: '26px', // Increased font size
      fontWeight: 'bold',
      marginTop: '40px',
      textAlign: 'center', // Centered
      color: '#649D9D', // Dark green
    },
  };

  return (
    <div style={styles.challenges}>

      {/* Subheader - Positioned below the navbar, outside the green rectangle */}
      <div style={styles.subheader}>
        <p>Secondhand, First Choice — Look Good, Feel Good, Do Good.</p>
      </div>

      {/* Main Content */}
      <main style={styles.mainContent}>
        <h1 style={styles.mainHeading}>Challenge yourself NOW!</h1>
        <div style={styles.contentWrapper}>
          {/* Left Column */}
          <div style={styles.leftColumn}>
            {/* Text Box 1: Challenge Title and Description */}
            <div style={styles.textBox}>
              <h2 style={styles.textBoxHeading}>The $10 Thrift Store Challenge: Can You Do It?</h2>
              <p style={styles.textBoxParagraph}>
                Think you’ve got style? Prove it. Your mission: create an entire outfit — head to toe — using only $10 and thrift store finds.
              </p>
            </div>

            {/* Text Box 2: The Challenge Steps */}
            <div style={{ ...styles.textBox, ...styles.textBoxLast }}>
              <h2 style={styles.textBoxHeading}>The Challenge:</h2>
              <ol style={styles.textBoxList}>
                <li>Hit your local thrift store.</li>
                <li>Build an epic, stylish outfit for $10 or less.</li>
                <li>Share your look and inspire others.</li>
              </ol>
            </div>
          </div>

          {/* Right Column */}
          <div style={styles.rightColumn}>
            {/* Text Box 3: Why Section */}
            <div style={styles.textBox}>
              <h2 style={styles.textBoxHeading}>Why?</h2>
              <p style={styles.textBoxParagraph}>
                Fast fashion is drowning our planet. Water shortages, textile waste, pollution — it’s all connected. But you? You can make a difference.
              </p>
            </div>

            {/* Text Box 4: Show Us Your Outfit */}
            <div style={{ ...styles.textBox, ...styles.textBoxLast }}>
              <h2 style={styles.textBoxHeading}>Show us your outfit</h2>
              <div style={styles.plusIcon}>+</div>
            </div>
          </div>
        </div>

        {/* Video Section - Moved to below the challenges, before the footer question */}
        <div style={styles.videoSection}>
          <ReactPlayer
            url={video}
            playing={true}
            loop={true}
            muted={true}
            width="80%" // Increased width
            height="auto" // Adjust height to maintain aspect ratio
            style={styles.videoPlayer}
          />
        </div>

        {/* Footer Question */}
        <p style={styles.footerQuestion}>
          Are you bold enough to prove fashion doesn’t have to cost the earth — or your wallet?
        </p>
      </main>
    </div>
  );
}

export default Challenges;