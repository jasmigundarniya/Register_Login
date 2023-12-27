import axios from "axios";

export function ApiPost(path, body) {
  return new Promise((resolve, reject) => {
    let tokenData = localStorage.getItem("token")
      ? localStorage.getItem("token")
      : "";
    let headers = {
      Authorization: `Bearer ${tokenData}`,
      "Content-Type": "application/json",
    };
    axios
      .post(`http://192.168.29.218:8001/user/${path}`, body, {
        headers: headers,
      })
      .then((response) => {
        resolve(response);
      })
      .catch((err) => {
        if (err.response.status === 401) {
          localStorage.removeItem("token");
          localStorage.removeItem("userid");
          // window.location.href = "http://localhost:3015/login";
        }
        reject(err.response);
      });
  });
}
