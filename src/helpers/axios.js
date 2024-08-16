import axios from 'axios';

const сurrencyConverter = axios.create({
  baseURL: 'https://api.getgeoapi.com',
});

сurrencyConverter.interceptors.response.use(function (response) {
  return response.data;
});

const headerCurrency = axios.create({
  baseURL: 'https://api.privatbank.ua',
});

headerCurrency.interceptors.response.use(function (response) {
  return response.data;
});

export { сurrencyConverter, headerCurrency };
