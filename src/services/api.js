import HttpClient from "tronaccount/src/client/http";

export const Client = new HttpClient({
  url: process.env.API_URL,
});
