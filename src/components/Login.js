import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaFacebookF } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    const response = await fetch('http://localhost:8088/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ email, password }),
    });

    const result = await response.json();
    alert(result.message);
    if (result.success) {
      navigate('/dashboard');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Login</h2>

        <input
          style={styles.input}
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />

        <div style={styles.passwordContainer}>
          <input
            style={styles.input}
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <span
            style={styles.eyeIcon}
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? '🙈' : '👁️'}
          </span>
        </div>

        <p style={styles.forgotPassword}>Forgot password?</p>

        <button style={styles.loginBtn} onClick={handleLogin}>
          Login
        </button>

        <p style={styles.signupText}>
          Don’t have an account?{' '}
          <span style={styles.signupLink} onClick={() => navigate('/')}>
            Signup
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
    </div>
  );
}

const styles = {
  container: {
    backgroundColor: '#f2f2f2',
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    background: '#fff',
    padding: '30px 25px',
    borderRadius: 16,
    width: 320,
    boxShadow: '0 6px 20px rgba(0,0,0,0.15)',
    fontFamily: 'sans-serif',
    textAlign: 'center',
  },
  title: {
    marginBottom: 24,
    fontSize: 24,
    fontWeight: 'bold',
  },
  input: {
    width: '90%',
    padding: '10px',
    marginBottom: 12,
    borderRadius: 8,
    border: '1px solid #ccc',
    fontSize: 14,
  },
  passwordContainer: {
    position: 'relative',
  },
  eyeIcon: {
    position: 'absolute',
    right: 12,
    top: 10,
    cursor: 'pointer',
    fontSize: 16,
  },
  forgotPassword: {
    color: '#3b82f6',
    fontSize: 13,
    textAlign: 'right',
    marginTop: -8,
    marginBottom: 16,
    cursor: 'pointer',
  },
  loginBtn: {
    width: '100%',
    padding: '10px',
    backgroundColor: '#2563eb',
    color: '#fff',
    border: 'none',
    borderRadius: 8,
    fontSize: 16,
    cursor: 'pointer',
  },
  signupText: {
    fontSize: 14,
    marginTop: 14,
  },
  signupLink: {
    color: '#2563eb',
    cursor: 'pointer',
    textDecoration: 'underline',
  },
  divider: {
    margin: '20px 0',
    borderTop: '1px solid #ddd',
    position: 'relative',
    textAlign: 'center',
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
