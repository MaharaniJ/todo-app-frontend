import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaUserAlt } from 'react-icons/fa';
import { toast } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import './nav.css';
import env from '../../config';

function Navbar() {
  const [user, setUser] = useState();
  const navigate = useNavigate();

  const getUser = async () => {
    try {
      const { data } = await axios.get(`${env.api}/users/userinfo`);
      setUser(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  const handleLogout = async () => {
    try {
      await axios.get(`${env.api}/auth/logout`);
      setUser(null);
      toast.success('Logged out successfully');
      navigate('/auth');
    } catch (err) {
      console.error(err);
    }
  };

  if (!user) return null;

  return (
    <header>
      <div className='userInfo'>
        <FaUserAlt className='userIcon' />
        <div>
          <h1 className='name'>{user.name}</h1>
          <p className='email'>{user.email}</p>
          <Link to='/edit-profile' className='editBtn'>
            Edit
          </Link>
        </div>
      </div>
      <nav>
        <button type='button' className='logout' onClick={handleLogout}>
          Logout
        </button>
      </nav>
    </header>
  );
}

export default Navbar;
