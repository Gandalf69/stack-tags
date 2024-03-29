import axios from "axios";

export const getTags = () => axios.get(`https://api.stackexchange.com/2.3/tags?site=stackoverflow`);