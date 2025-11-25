require('dotenv').config();
const axios = require('axios');

const BASE_URL =
  process.env.API_EXTERNAL_URL ||
  'https://echo-serv.tbxnet.com/v1/secret';

const API_KEY =
  process.env.API_KEY || 'aSuperSecretKey';

const client = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${API_KEY}`,
  },
  timeout: 8000,
});

async function listFiles() {
  const { data } = await client.get('/files');
  return data.files || [];
}

async function getFile(fileName) {
  const { data } = await client.get(`/file/${fileName}`);
  return data;
}

module.exports = {
  listFiles,
  getFile,
};
