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
                      'description': 'Пустые поля / Пользователь с такой почтой зарегистрирован / Ошибка валидации'
                    }
                  }
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
                  'type': 'object',
                  'properties': {
                    'message': {
                      'type': 'string',
                      'description': 'Нет пользователя с такой почтой'
                    }
                  }
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
                  'type': 'object',
                  'properties': {
                    'message': {
                      'type': 'string',
                      'description': 'Пустые поля / Уже существует музыкант / Ошибка валидации'
                    }
                  }
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
                  'type': 'object',
                  'properties': {
                    'message': {
                      'type': 'string',
                      'description': 'не найден'
                    }
                  }
                }
              }
            }
          },
          '400': {
            'description': 'Запись автора из бд',
            'content':{
              'application/json': {
                'schema': {
                  'type': 'object',
                  'properties': {
                    'message': {
                      'type': 'string',
                      'description': 'Ошибка неверный формат id'
                    }
                  }
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
                  'type': 'object',
                  'properties': {
                    'message': {
                      'type': 'string',
                      'description': 'не найден'
                    }
                  }
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
                  'type': 'object',
                  'properties': {
                    'message': {
                      'type': 'string',
                      'description': 'Ошибка валидации'
                    }
                  }
                }
              }
            },
          },
          '404': {
            'description': 'Не найден',
            'content':{
              'application/json': {
                'schema': {
                  'type': 'object',
                  'properties': {
                    'message': {
                      'type': 'string',
                      'description': 'не найден'
                    }
                  }
                }
              }
            }
          }
        }
      },
    }
  }
};