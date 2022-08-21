const options = {
  swaggerDefinition: {
    info: {
      description: 'This is a sample server',
      title: 'Swagger',
      version: '3.0.0',
    },
    host: 'localhost:5000',
    basePath: '/api',
    produces: [
      'application/json',
      'application/xml'
    ],
    schemes: ['http', 'https'],
    securityDefinitions: {
      JWT: {
        type: 'apiKey',
        in: 'header',
        name: 'Authorization',
        description: '',
      }
    }
  },
  basedir: __dirname, //app absolute path
  files: ['./routers/**/*.js'] //Path to the API handle folder
};


module.exports = options;