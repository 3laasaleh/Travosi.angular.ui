const publicHost = 'www.seaworldholidays.com';

export const environment = {
  indexingEnabled: true,
  partion: true,
  baseUrl: 'https://api.seaworldholidays.com/api/',
  imageUrl: 'https://api.seaworldholidays.com/images/',
  publicBaseUrl: `https://${publicHost}`,
  ssrAllowedHosts: `seaworldholidays.com,${publicHost}`,
};
