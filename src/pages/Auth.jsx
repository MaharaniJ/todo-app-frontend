import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Login from '../components/Auth/Login';
import Register from '../components/Auth/Register';
import Layout from '../components/Layout';
import useAuth from '../hooks/useAuth';


function Auth() {
  const { auth } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (auth) {
      navigate('/');
    }
  }, [auth, navigate]);

  return (
    <Layout>
      <div className="form_container">
        <Login />
        <Register />
      </div>
    </Layout>
      
   
     
  );
}

export default Auth;