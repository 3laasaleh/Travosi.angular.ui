const publicHost = 'seaworld-prod.premiumasp.net';

export const environment = {
  indexingEnabled: true,
  partion: true,
  baseUrl: 'https://seaworldholidays.com/api/',
  imageUrl: 'https://seaworldholidays.com/images/',
  publicBaseUrl: `https://${publicHost}`,
  ssrAllowedHosts: `localhost,127.0.0.1,seaworldholidays.com,www.seaworldholidays.com,${publicHost}`,
};
