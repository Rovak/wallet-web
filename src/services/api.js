import HttpClient from "@tronprotocol/wallet-api/src/client/http";

export const Client = new HttpClient({
  url: process.env.API_URL,
});
