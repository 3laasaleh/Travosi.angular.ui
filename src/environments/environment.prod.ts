const publicHost = 'seaworldholidays.com';

export const environment = {
  indexingEnabled: true,
  partion: true,
  baseUrl: 'https://api.seaworldholidays.com/api/',
  imageUrl: 'https://api.seaworldholidays.com/images/',
  publicBaseUrl: `https://${publicHost}`,
  ssrAllowedHosts: `www.seaworldholidays.com,${publicHost}`,
};
