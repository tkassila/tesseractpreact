import axios from "axios";

export default axios.create({
  baseURL: "http://127.0.0.1:9998",
  headers: {
      'Content-Type': 'multipart/form-data',
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
      "Origins": "*",
      "Accept": "*/*"
  }
});
