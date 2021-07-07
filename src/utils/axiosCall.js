import axios from "axios";

export default apiUrl => {
  return axios
    .get(`${apiUrl}`)
    .then(function(response) {
      return response;
    })
    .catch(function(error) {
      return error;
    });
};
