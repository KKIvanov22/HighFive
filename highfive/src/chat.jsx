import React from 'react';
import { Link } from 'react-router-dom';

const styles = {
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

export default function Register() {
  return (
    <div style={styles.navbar}>
      <div style={styles.logoContainer}>
        <img 
            src="https://media.discordapp.net/attachments/1351242842542178443/1352954923695870023/logo.png?ex=67dfe4f6&is=67de9376&hm=6ea249977282f867eed42b771b13fa796a785f8efb73198d6385c080b43bba8f&=&format=webp&quality=lossless&width=603&height=504" 
            alt="Eco Logo" 
          style={styles.logo}
        />
      </div>
      <div style={styles.navLinks}>
        <Link to="/home" style={styles.navLink}>HOME</Link>
        <Link to="/" style={styles.navLink}>CHAT</Link>
        <Link to="/challenges" style={styles.navLink}>CHALLENGES</Link>
      </div>
    </div>
  );
}
