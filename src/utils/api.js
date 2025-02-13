import axios from "axios";

// 상황따라 주소 다름
const LOCAL_BACKEND = process.env.REACT_APP_LOCAL_BACKEND;

const api = axios.create({
  baseURL: LOCAL_BACKEND + '/api',
//   headers: {
//     authorization: `Bearer ${sessionStorage.getItem("token")}`,
//   },
});
// const api = axios.create({
//   baseURL: LOCAL_BACKEND + '/api',
// //   headers: {
// //     authorization: `Bearer ${sessionStorage.getItem("token")}`,
// //   },
// });


api.interceptors.request.use(
  (request) => {
    console.log("Starting Request", request);
    // request.headers.authorization = `Bearer ${sessionStorage.getItem("token")}`;
    return request;
  },
  function (error) {
    console.log("REQUEST ERROR", error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  function (error) {
    error = error.response.data;
    console.log("RESPONSE ERROR", error);
    return Promise.reject(error);
  }
);

export default api;