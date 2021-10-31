import axios from "axios";

const instance = axios.create({
  baseURL: "https://burgerss-fdd19-default-rtdb.firebaseio.com/"
});

export default instance;
