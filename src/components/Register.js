import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaFacebookF } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';

export default function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (!username || !email || !password || !confirmPassword) {
      alert('All fields are required!');
      return;
    }

    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    const response = await fetch('http://localhost:8088/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ username, email, password, confirmPassword }),
    });

    const result = await response.json();
    alert(result.message);
    if (result.success) {
      navigate('/login');
    }
  };

  return (
    <div style={styles.card}>
      <h2 style={styles.title}>Signup</h2>

      <input
        style={styles.input}
        placeholder="Username"
        value={username}
        onChange={e => setUsername(e.target.value)}
      />

      <input
        style={styles.input}
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />

      <input
        style={styles.input}
        type={showPassword ? 'text' : 'password'}
        placeholder="Create password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />

      <div style={styles.passwordContainer}>
        <input
          style={{ ...styles.input, marginBottom: 0 }}
          type={showPassword ? 'text' : 'password'}
          placeholder="Confirm password"
          value={confirmPassword}
          onChange={e => setConfirmPassword(e.target.value)}
        />
        <span
          style={styles.eyeIcon}
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? '🙈' : '👁️'}
        </span>
      </div>

      <button style={styles.signupBtn} onClick={handleRegister}>
        Signup
      </button>

      <p style={styles.loginText}>
        Already have an account?{' '}
        <span style={styles.loginLink} onClick={() => navigate('/login')}>
          Login
        </span>
      </p>

      <div style={styles.divider}><span>Or</span></div>

      <button style={styles.fbBtn}>
          <FaFacebookF style={styles.icon} />
            Login with Facebook
                    </button>
      <button style={styles.googleBtn}>
            <FcGoogle style={styles.icon} />
                Login with Google
        </button>
    </div>
  );
}

const styles = {
  card: {
    width: 350,
    margin: '50px auto',
    padding: 24,
    borderRadius: 16,
    background: '#ffffff',
    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
    fontFamily: 'sans-serif',
    textAlign: 'center',
  },
  title: {
    marginBottom: 20,
    fontSize: 24,
    fontWeight: 'bold',
  },
  input: {
    width: '90%',
    padding: 10,
    marginBottom: 12,
    borderRadius: 8,
    border: '1px solid #ccc',
    fontSize: 14,
  },
  passwordContainer: {
    position: 'relative',
    marginBottom: 12,
  },
  eyeIcon: {
    position: 'absolute',
    right: 12,
    top: '50%',
    transform: 'translateY(-50%)',
    cursor: 'pointer',
    fontSize: 18,
  },
  signupBtn: {
    width: '100%',
    padding: 12,
    background: '#2563eb',
    color: '#fff',
    border: 'none',
    borderRadius: 8,
    fontSize: 16,
    cursor: 'pointer',
    marginTop: 10,
  },
  loginText: {
    marginTop: 14,
    fontSize: 14,
  },
  loginLink: {
    color: '#2563eb',
    cursor: 'pointer',
    textDecoration: 'underline',
    marginLeft: 4,
  },
  divider: {
    margin: '20px 0',
    borderTop: '1px solid #ddd',
    position: 'relative',
    textAlign: 'center',
    fontSize: 14,
  },
  fbBtn: {
    width: '100%',
    padding: '10px',
    backgroundColor: '#3b5998',
    color: '#fff',
    border: 'none',
    borderRadius: 8,
    fontSize: 14,
    fontWeight: 500,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  googleBtn: {
    width: '100%',
    padding: '10px',
    backgroundColor: '#fff',
    border: '1px solid #ccc',
    borderRadius: 8,
    fontSize: 14,
    fontWeight: 500,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    marginRight: 8,
    fontSize: 18,
    verticalAlign: 'middle',
  },
};
