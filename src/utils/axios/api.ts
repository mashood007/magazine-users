
import axios from 'axios';
import { toast } from 'react-hot-toast';

const api = axios.create({
  baseURL: 'http://localhost:3000/users',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    "ngrok-skip-browser-warning": "69420",
  }
});


api.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    const res = error.response;
    if (res?.data?.message)
      toast.error(res?.data?.message, { position: 'bottom-right' })
    console.error("Looks like there was a problem. Status Code: ", res.status);
    return Promise.reject(error);
  }
);

export default api;

