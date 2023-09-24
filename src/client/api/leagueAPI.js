import axios from "axios";

let leagueAPI = axios.create({
    baseURL: "http://localhost:3000/",
    headers: {
        accept: 'application/json'
    }
});

export default leagueAPI