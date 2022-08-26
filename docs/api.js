module.exports = {
  paths: {
    '/api/user/v1/registration':{
      'post':{
        'tags': [
          'autorisation'
        ],
        'security': [],
        'summary': 'Позволяет зарегистрироваться в системе',
        'requestBody': {
          'content': {
            'application/json': {
              'schema': {
                'type': 'object',
                'required': [
                  'login',
                  'password'
                ],
                'properties': {
                  'login': {
                    'type': 'string',
                    'format': 'email',
                    'description': 'Почта для регистрации'
                  },
                  'password': {
                    'type': 'string',
                    'format': 'password',
                    'description': 'Пароль, необходимый для входа'
                  }
                }
              }
            }
          }
        },
        'responses': {
          '200': {
            'description': 'Успешная регистрация, возвращает токен',
            'content': {
              'application/json': {
                'schema': {
                  'type': 'object',
                  'properties': {
                    'token': {
                      'type': 'string',
                      'description': 'Токен пользователя'
                    }
                  }
                }
              }
            },
          },
          '400':{
            'description': 'Ошибка',
            'content':{
              'application/json': {
                'schema': {
                  $ref: '#/components/schemas/ValidationError'
                }
              }
            }
          }
        }
      }
    },
    '/api/user/v1/login': {
      'post':{
        'tags': [
          'autorisation'
        ],
        'security': [],
        'summary': 'Позволяет войти в систему',
        'requestBody': {
          'content': {
            'application/json': {
              'schema': {
                'type': 'object',
                'required': [
                  'login',
                  'password'
                ],
                'properties': {
                  'login': {
                    'type': 'string',
                    'format': 'email',
                    'description': 'Почта введеная при регистрации'
                  },
                  'password': {
                    'type': 'string',
                    'format': 'password',
                    'description': 'Пароль, необходимый для входа'
                  }
                }
              }
            }
          }
        },
        'responses': {
          '200': {
            'description': 'Успешная регистрация, возвращает токен',
            'content': {
              'application/json': {
                'schema': {
                  'type': 'object',
                  'properties': {
                    'token': {
                      'type': 'string',
                      'description': 'Токен пользователя'
                    }
                  }
                }
              }
            },
          },
          '400':{
            'description': 'Ошибка',
            'content':{
              'application/json': {
                'schema': {
                  'type': 'object',
                  'properties': {
                    'message': {
                      'type': 'string',
                      'description': 'Пароль неверный'
                    }
                  }
                }
              }
            }
          },
          '404':{
            'description': 'Ошибка',
            'content':{
              'application/json': {
                'schema': {
                  $ref: '#/components/schemas/NotFound'
                }
              }
            }
          }
        }
      }
    },
    '/api/author/v1':{
      'post':{
        'tags': [
          'author'
        ],
        'summary': 'Позволяет создать автора',
        'requestBody': {
          'content': {
            'application/json': {
              'schema': {
                'type': 'object',
                'required': [
                  'name',
                ],
                'properties': {
                  'name': {
                    'type': 'string',
                    'description': 'Название группы'
                  },
                }
              }
            }
          }
        },
        'responses': {
          '200': {
            'description': 'Успешное создание создает автора',
            'content': {
              'application/json': {
                'schema': {
                  $ref:'#/components/schemas/Author'
                }
              }
            },
          },
          '400':{
            'description': 'Ошибка',
            'content':{
              'application/json': {
                'schema': {
                  $ref: '#/components/schemas/ValidationError'
                }
              }
            }
          }
        }
      },
      'get':{
        'tags': [
          'author'
        ],
        'summary': 'Получает авторов',
        'responses': {
          '200': {
            'description': 'Запись автора из бд',
            'content': {
              'application/json': {
                'schema': {
                  $ref:'#/components/schemas/Author'
                }
              }
            },
          }
        }
      }
    },
    '/api/author/v1/{id}': {
      'get':{
        'tags': [
          'author'
        ],
        'summary': 'Получает автора по id',
        parameters:[
          {
            name:'id',
            in:'path',
            required:true,
            description: 'id пользователя'
          }
        ],
        'responses': {
          '200': {
            'description': 'Запись автора из бд',
            'content': {
              'application/json': {
                'schema': {
                  $ref:'#/components/schemas/Author'
                }
              }
            },
          },
          '404': {
            'description': 'Запись автора из бд',
            'content':{
              'application/json': {
                'schema': {
                  $ref: '#/components/schemas/NotFound'
                }
              }
            }
          },
          '400': {
            'description': 'Запись автора из бд',
            'content':{
              'application/json': {
                'schema': {
                  $ref: '#/components/schemas/ValidationError'
                }
              }
            }
          }
        }
      },
      'delete':{
        'tags': [
          'author'
        ],
        'summary': 'Удаляет автора по id',
        parameters:[
          {
            name:'id',
            in:'path',
            required:true,
            description: 'id пользователя'
          }
        ],
        'responses': {
          '200': {
            'description': 'Удалено',
          },
          '404': {
            'description': 'Ошибка',
            'content':{
              'application/json': {
                'schema': {
                  $ref: '#/components/schemas/NotFound'
                }
              }
            }
          }
        }
      },
      'put':{
        'tags': [
          'author'
        ],
        'summary': 'Обновляет автора по id',
        parameters:[
          {
            name:'id',
            in:'path',
            required:true,
            description: 'id пользователя'
          }
        ],
        'requestBody': {
          'content': {
            'application/json': {
              'schema': {
                'type': 'object',
                'required': [
                  'name',
                ],
                'properties': {
                  'name': {
                    'type': 'string',
                    'description': 'Название группы'
                  },
                }
              }
            }
          }
        },
        'responses': {
          '200': {
            'description': 'Запись автора из бд',
            'content': {
              'application/json': {
                'schema': {
                  $ref:'#/components/schemas/Author'
                }
              }
            },
          },
          '400': {
            'description': 'Ошибка',
            'content': {
              'application/json': {
                'schema': {
                  $ref: '#/components/schemas/ValidationError'
                }
              }
            },
          },
          '404': {
            'description': 'Не найден',
            'content':{
              'application/json': {
                'schema': {
                  $ref: '#/components/schemas/NotFound'
                }
              }
            }
          }
        }
      },
    },
    '/api/music/v1/': {
      'post':{
        'tags': [
          'music'
        ],
        'summary': 'Позволяет создать музыку',
        'requestBody': {
          'content': {
            'multipart/form-data': {
              'schema': {
                'type': 'object',
                'properties': {
                  'files': {
                    'type': 'string',
                    'format': 'binary'
                  },
                  'authorId': {
                    'type': 'string',
                    'description': 'id музыканта'
                  },
                  'name': {
                    'type': 'string',
                    'description': 'название песни'
                  }
                }
              }
            }
          }
        },
        'responses': {
          '200': {
            'description': 'Успешное создание создает автора',
            'content': {
              'application/json': {
                'schema': {
                  $ref:'#/components/schemas/Music'
                }
              }
            },
          },
          '400':{
            'description': 'Ошибка',
            'content':{
              'application/json': {
                'schema': {
                  $ref: '#/components/schemas/ValidationError'
                }
              }
            }
          }
        }
      },
      'get':{
        'tags': [
          'music'
        ],
        'summary': 'Получает музыки',
        parameters:[
          {
            name:'limit',
            in:'query',
            description: 'limit'
          },
          {
            name:'offset',
            in:'query',
            description: 'offset'
          },
          {
            name:'id',
            in:'query',
            description: 'id'
          },
          {
            name:'authorId',
            in:'query',
            description: 'authorId'
          },
          {
            name:'name',
            in:'query',
            description: 'name'
          },
          {
            name:'start',
            in:'query',
            description: 'start'
          },
          {
            name:'end',
            in:'query',
            description: 'end'
          },
        ],
        'responses': {
          '200': {
            'description': 'Запись автора из бд',
            'content': {
              'application/json': {
                'schema': {
                  $ref:'#/components/schemas/Music'
                }
              }
            }
          }
        }
      }
    },
    '/api/music/v1/{id}': {
      'delete':{
        'tags': [
          'music'
        ],
        'summary': 'Удаление музыки',
        parameters:[
          {
            name:'id',
            in:'query',
            description: 'id'
          }
        ],
        'responses': {
          '200': {
            'description': 'Удалено',
          }
        }
      }
    }
  }
};