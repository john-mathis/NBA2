import axios from "axios";

const client = axios.create({
  baseURL: "https://sports-information.p.rapidapi.com/nba",
});

const headers = (axios.defaults.headers.common = {
  "x-rapidapi-key": "2ca63158damsh7d1d8b2476028f6p18ebc1jsnc3f7cbc89314",
  "x-rapidapi-host": "sports-information.p.rapidapi.com",
});


// const mack = axios.interceptors.request.use((config)=>{

// })

export const request = async ({ ...options }) => {
  client.defaults.headers.common = headers;
  client.defaults.params = 
  const onSuccess = (response: any) => response;
  const onError = (error: any) => {
    // optionally catch errors

    return error;
  };

  return client(options).then(onSuccess).catch(onError);
};

export default headers;
