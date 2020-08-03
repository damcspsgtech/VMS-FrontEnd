import axios from 'axios';
 let axiosInstance =  axios.create({
//  baseURL:'http://localhost:4000'
     baseURL : `https://project.amcspsgtech.in:4000`
  });
  export default axiosInstance;
  