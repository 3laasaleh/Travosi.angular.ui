const publicHost = 'seaworldholidays.com';

export const environment = {
  indexingEnabled: true,
  partion: true,
  baseUrl: 'https://seeworld-api-prod.premiumasp.net/api/',
  imageUrl: 'https://seeworld-api-prod.premiumasp.net/images/',
  publicBaseUrl: `https://${publicHost}`,
  ssrAllowedHosts: `www.seaworldholidays.com,${publicHost}`,
};
