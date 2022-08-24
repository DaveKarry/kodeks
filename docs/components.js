module.exports = {
  components:{
    securitySchemes:{
      bearerAuth:{
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      }
    },
    schemas: {
      'Author':{
        type: 'object',
        properties:{
          id: {},
          name: {},
          userId: {},
          updatedAt: {},
          createdAt: {}
        }
      }
    }
  },
  security:[
    {
      bearerAuth:[]
    }
  ]
  
};