import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const [username, setUsername] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:8088/api/auth/me', {
      credentials: 'include',
    })
      .then(res => res.json())
      .then(data => {
        if (!data.loggedIn) {
          navigate('/login');
        } else {
          setUsername(data.userId); // or data.username if available
        }
      });
  }, [navigate]);

  const logout = async () => {
    await fetch('http://localhost:8088/api/auth/logout', {
      credentials: 'include',
    });
    navigate('/login');
  };

  const services = [
    'Women’s Salon & Spa',
    'Men’s Salon & Massage',
    'AC & Appliance Repair',
    'Cleaning & Pest Control',
    'Electrician, Plumber & Carpenter',
    'Native Water Purifier',
    'Painting & Waterproofing',
    'Wall Panels',
  ];

  const stats = [
    { icon: '⭐', label: 'Service Rating*', value: '4.8' },
    { icon: '👥', label: 'Customers Globally*', value: '12M+' },
  ];

  const images = []; // Add image URLs here if needed

  return (
    <div style={styles.container}>
      {/* Left Panel */}
      <div style={styles.leftPanel}>
        <h2 style={styles.heading}>Home services at your doorstep</h2>
        <div style={styles.serviceBox}>
          <h3 style={styles.subheading}>What are you looking for?</h3>
          <div style={styles.grid}>
            {services.map((service, i) => (
              <div key={i} style={styles.gridItem}>{service}</div>
            ))}
          </div>
        </div>
        <div style={styles.stats}>
          {stats.map((stat, i) => (
            <div key={i} style={styles.statItem}>
              {stat.icon}<br />
              <span>{stat.value}</span><br />
              {stat.label}
            </div>
          ))}
        </div>
      </div>

      {/* Right Panel */}
      <div style={styles.rightPanel}>
        <div style={styles.card}>
          <h2>Welcome!</h2>
          <p>username: {username}</p>
          <button style={styles.logoutButton} onClick={logout}>Logout</button>
        </div>
        <div style={styles.imageGrid}>
          {images.map((img, i) => (
            <img key={i} src={img} alt={`Service ${i + 1}`} style={styles.img} />
          ))}
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    padding: '40px 60px',
    fontFamily: 'sans-serif',
    backgroundColor: '#fff',
    height: '100vh',
    boxSizing: 'border-box',
  },
  leftPanel: {
    flex: 1,
    paddingRight: '40px',
  },
  rightPanel: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
  },
  heading: {
    fontSize: '28px',
    marginBottom: '24px',
  },
  subheading: {
    fontSize: '18px',
    marginBottom: '16px',
  },
  serviceBox: {
    backgroundColor: '#f9f9f9',
    padding: '20px',
    borderRadius: '12px',
    border: '1px solid #ddd',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '12px',
  },
  gridItem: {
    backgroundColor: '#fff',
    border: '1px solid #ddd',
    padding: '10px 12px',
    borderRadius: '8px',
    textAlign: 'center',
    fontSize: '14px',
  },
  stats: {
    display: 'flex',
    gap: '40px',
    marginTop: '40px',
    fontSize: '14px',
  },
  statItem: {
    textAlign: 'center',
    color: '#444',
  },
  card: {
    padding: '24px',
    borderRadius: '12px',
    boxShadow: '0 6px 20px rgba(0,0,0,0.1)',
    backgroundColor: '#fff',
    textAlign: 'center',
  },
  logoutButton: {
    marginTop: '16px',
    padding: '10px 20px',
    backgroundColor: '#2563eb',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
  },
  imageGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '12px',
  },
  img: {
    width: '100%',
    borderRadius: '12px',
    objectFit: 'cover',
    height: '160px',
  },
};
