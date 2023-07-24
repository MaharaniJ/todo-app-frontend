// import axios from "axios";
// import { useEffect, useState } from "react";
// import env from "../config";

// const useAuth = () => {
//   const [auth, setAuth] = useState(undefined);

//   const verifyAuth = async () => {
//     try {
//       const res = await axios.get(`${env.api}/auth/is_logged_in`);
//       return res.data;
//     } catch (err) {
//       console.log(err);
//       return false;
//     }
//   };

//   useEffect(() => {
//     (async () => {
//       const data = await verifyAuth();
//       setAuth(data);
//     })();
//   }, []);

//   return { auth };
// };

// export default useAuth;


import axios from 'axios';
import { useEffect, useState } from 'react';
import env from "../config";
import axiosInstance from '../config';

export default () => {
  const [auth, setAuth] = useState();

  const verifyAuth = async () => {
    try {
      const res = await axiosInstance.get('/auth/is_logged_in',{
        params: {
          timestamp: Date.now(), // Adding a unique timestamp as a query parameter
        },
      });
      return res.data;
    } catch (err) {
      console.log(err);
      return false;
    }
  };

  useEffect(() => {
    (
      async () => {
        const data = await verifyAuth();
        setAuth(data);
      }
    )();
  }, []);

  return { auth };
};