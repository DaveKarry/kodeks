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
      },
      'User': {
        type: 'object',
        properties:{
          id: {},
          login: {},
          password: {},
          updatedAt: {},
          createdAt: {}
        }
      },
      'NotFound':{
        'type': 'object',
        'properties': {
          'message': {
            'type': 'string',
            default: 'Не найден',
            'description': 'не найден'
          }
        }
      },
      'ValidationError': {
        'type': 'object',
        'properties': {
          'message': {
            'type': 'string',
            default: 'Ошибка неверный формат id/Ошибка валидации',
            'description': 'Ошибка валидации'
          }
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