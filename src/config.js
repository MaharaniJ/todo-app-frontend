// export const env = {
//    api : 'http://localhost:8080/api'
// }



import axios from 'axios';

const env = {
  api: "http://localhost:8080/api", // Replace this with your actual API URL
};
const axiosInstance = axios.create({
  baseURL: env.api,
  
});

export default axiosInstance;

 
