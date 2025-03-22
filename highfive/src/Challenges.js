import React from 'react';
import ReactPlayer from 'react-player';
import video from './1.mp4';
import logo from './figma/logo.png';

function Challenges() {
  const styles = {
    challenges: {},
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: '#CFE1E5',
      padding: '10px 20px',
    },
    logo: {
      width: '40px',
      height: '40px',
    },
    nav: {
      display: 'flex',
      gap: '20px',
      justifyContent: 'center',
      alignItems: 'center',
    },
    navLink: {
      textDecoration: 'none',
      color: '#649D9D',
      fontWeight: 'bold',
      fontSize: '18px',
    },
    navSpacer: {
      width: '40px',
    },
    subheader: {
      backgroundColor: 'transparent',
      textAlign: 'center',
      padding: '5px 0',
      fontSize: '16px',
      color: '#6E7A7A',
      marginTop: '10px',
    },
    videoSection: {
      margin: '80px 0',
    },
    videoPlayer: {
      maxWidth: '800px',
      height: 'auto',
      borderRadius: '8px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      margin: '0 auto',
    },
    mainContent: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '40px 20px',
      textAlign: 'center',
    },
    mainHeading: {
      fontSize: '50px',
      fontWeight: 'bold',
      color: '#649D9D',
      marginBottom: '60px',
      textAlign: 'center',
    },
    contentWrapper: {
      display: 'flex',
      justifyContent: 'space-between',
      gap: '40px',
      alignItems: 'flex-start',
      marginTop: '40px',
    },
    leftColumn: {
      flex: 1,
      textAlign: 'center',
    },
    rightColumn: {
      flex: 1,
      textAlign: 'center',
    },
    challengeRow: {  // New style for the row containing Challenge and Show us your outfit
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: '20px',
      marginBottom: '50px',
    },
    textBox: {
      marginBottom: '50px',
      maxWidth: '300px',
      marginLeft: 'auto',
      marginRight: 'auto',
    },
    textBoxLast: {
      marginBottom: '0',
    },
    textBoxHeading: {
      fontSize: '26px',
      fontWeight: 'bold',
      marginBottom: '15px',
      color: '#6E7A7A',
      textAlign: 'center',
    },
    textBoxParagraph: {
      fontSize: '18px',
      lineHeight: 1.0,
      marginBottom: '15px',
      color: '#6E7A7A',
      textAlign: 'center',
    },
    textBoxList: {
      listStylePosition: 'inside',
      fontSize: '18px',
      lineHeight: 1.0,
      paddingLeft: '0',
      color: '#6E7A7A',
      textAlign: 'center',
    },
    plusIcon: {
      width: '100px',
      height: '100px',
      backgroundColor: '#DDE3E3',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      fontSize: '70px',
      color: '#6E7A7A',
      margin: '0 auto',
    },
    footerQuestion: {
      fontSize: '26px',
      fontWeight: 'bold',
      marginTop: '40px',
      textAlign: 'center',
      color: '#649D9D',
    },
  };

  return (
    <div style={styles.challenges}>
      <div style={styles.subheader}>
        <p>Secondhand, First Choice — Look Good, Feel Good, Do Good.</p>
      </div>

      <main style={styles.mainContent}>
        <h1 style={styles.mainHeading}>Challenge yourself NOW!</h1>
        <div style={styles.contentWrapper}>
          {/* Left Column */}
          <div style={styles.leftColumn}>
            <div style={styles.textBox}>
              <h2 style={styles.textBoxHeading}>The $10 Thrift Store Challenge: Can You Do It?</h2>
              <p style={styles.textBoxParagraph}>
                Think you’ve got style? Prove it. Your mission: create an entire outfit — head to toe — using only $10 and thrift store finds.
              </p>
            </div>
          </div>

          {/* Right Column */}
          <div style={styles.rightColumn}>
            <div style={styles.textBox}>
              <h2 style={styles.textBoxHeading}>Why?</h2>
              <p style={styles.textBoxParagraph}>
                Fast fashion is drowning our planet. Water shortages, textile waste, pollution — it’s all connected. But you? You can make a difference.
              </p>
            </div>
          </div>
        </div>

        {/* New Row for Challenge and Show us your outfit */}
        <div style={styles.challengeRow}>
          <div style={{ ...styles.textBox, flex: 1 }}>
            <h2 style={styles.textBoxHeading}>The Challenge:</h2>
            <ol style={styles.textBoxList}>
              <li>Hit your local thrift store.</li>
              <li>Build an epic, stylish outfit for $10 or less.</li>
              <li>Share your look and inspire others.</li>
            </ol>
          </div>
          <div style={{ ...styles.textBox, flex: 1 }}>
            <h2 style={styles.textBoxHeading}>Show us your outfit:</h2>
            <div style={styles.plusIcon}>+</div>
          </div>
        </div>

        <div style={styles.videoSection}>
          <ReactPlayer
            url={video}
            playing={true}
            loop={true}
            muted={true}
            width="80%"
            height="auto"
            style={styles.videoPlayer}
          />
        </div>

        <p style={styles.footerQuestion}>
          Are you bold enough to prove fashion doesn’t have to cost the earth — or your wallet?
        </p>
      </main>
    </div>
  );
}

export default Challenges;