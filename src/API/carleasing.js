import axios from "axios"; // http client. connects back-end to front-end

export default axios.create({baseURL: "http://localhost:8888/api/v1/",});