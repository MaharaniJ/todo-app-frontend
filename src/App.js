import React, { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import {BrowserRouter as Router,Routes,Route, useNavigate} from 'react-router-dom'
import PrivateRoute from './components/PrivateRoute';
import Home from './pages/Home';
import EditProfile from './pages/EditProfile';
import Auth from './pages/Auth';
import './styles/global.css'
import Register from './components/Auth/Register';
// import Login from './components/Auth/Login';



function App() {
  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            fontSize: '1.8rem',
          },
        }}
      />
     <Router>
     <Routes>
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<Home />} />
          <Route path="/edit-profile" element={<EditProfile />} />
        </Route>
        <Route path="/auth" element={<Auth />} />
         <Route path='/register' element={<Register />} />
        {/* <Route path='/login' element={<Login />} /> */} 
      </Routes>
     </Router>
    </>
  );
}

export default App;
