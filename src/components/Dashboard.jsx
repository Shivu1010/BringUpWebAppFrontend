import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const [userId, setUserId] = useState(null);
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
          setUserId(data.userId);
        }
      });
  }, []);

  const logout = async () => {
    await fetch('http://localhost:8088/api/auth/logout', {
      credentials: 'include',
    });
    navigate('/login');
  };

  return (
    <div>
      <h2>Welcome!</h2>
      <p>User ID: {userId}</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
