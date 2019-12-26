const config = {
  production: {
    baseUrl: 'https://scheduler.rumbley.io',
  },
  development: {
    baseUrl: 'http://localhost:1337',
  },
};

const environment = process.env.NODE_ENV;

export default { ...config, ...config[environment] };
