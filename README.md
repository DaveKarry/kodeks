# kodeks
Тестовое задание Консорциум Кодекс

# Запуск

## Начальная настройка

создайте .env файл и запишите туда переменные среды из .env.defaults, если лень, ничего не делайте и тогда зхначения из .env.defaults подставятся сами.

## Запуск в докере

композер состоит из 2 сервисов, бд-пострги и сервера под ноду.
``` console
> docker-compose up 
```

## запуск в DEV 
Установи зависимости и запускай dev скрипт.

``` console
> npm i
> npm run dev
```

## запуск без dev

``` console
> npm i
> npm run start
```

# Как работать?

по пути <b>/api-docs/</b> можно найти swagger-документацию, которую мрожно протыкать и посмотреть как работает сервер.

## Авторизация

Авторизация происходит по токенам Bearer(смотри правый верхний угол свагера). 

Все запросы апи(кроме логина и регистрации) требуют наличие токена авторризации, поэтому перед тем как делать запросы - создай себе юзера через <b>/api/user/v1/registration</b> и вставь в авторизацию полученый токен.

## Авторы музыки и музыка

Создай музыканта! дай ему имя и он появится в бд.

После того как ты добавишь музыканту музыку через <b>/api/music/v1</b>, внутри папки files добавится папка с id музыканта, туда будет складываться эта и следующие файлы от этого музыканта.


## Логи

Логгирование происходит с помощью библиотеки winston, логи хранятся в файловой системе в файлах logs.log(хранит все запросы) и err.log(хранит ошибки).

* level - тип лога(info/error)

* message: лог запроса
    > login - логин

    > ip - ip

    > request - запрос и метод

    > status - статус выполнения

    > message - тип ошибки

* timestamp - время выполнения

## тома докера

в коревой папке появится папка volumes, если был запуск через докер, бдшка будет там. (пароль и логин написаны в .env) 

# P.S.

https://github.com/DaveKarry - будет круто получить ревью прям в гите) 


# Само задание звучит так: 


Как заказчику, мне нужен бекенд приложения для работы с каталогом музыки.

Основные возможности:

- [x] Создать, прочитать, изменить, удалить записи об исполнителях.
- [ ] Создать, прочитать, изменить, удалить записи о песнях исполнителей.

Планирую, что в дальнейшем поддерживать приложение будут другие разработчики, поэтому стоит использовать знакомый им стек технологий и писать код так, чтобы у них не взорвался мозг, когда они начнут заниматься поддержкой.

Применяемые технологии: NodeJS, PostgreSQL, Sequelize.

- [x] Настройки подключения к базе данных должны храниться в текстовом конфигурационном файле.

Бекенд должен логировать запросы, чтобы для каждой операции была возможность узнать:
- [x] Когда совершилось действие
- [x] Какое действие совершилось
- [x] IP адрес, откуда пришёл запрос
- [x] Какая ошибка произошла, если операцию не удалось выполнить

Бекенд должен предоставлять API, с помощью которого можно будет:
- Использовать основные возможности приложения.
- [x] Получить все песни определенного исполнителя или нескольких исполнителей.
- [x] Получить выборку песен или исполнителей по части их названия.
- [x] Получить выборку песен или исполнителей по дате внесения записи.
- [x] Получить часть выборки песен или исполнителей. Например, 10 песен, идущих после первых 20-и от начала выборки.

- [x] В составе приложения должна быть HTML-страница для демонстрации всех возможностей API. Внешний вид и юзабилити страницы значения не имеют.

Как заказчик, я очень не люблю песни певицы Монеточки. Сделайте, пожалуйста, чтобы ее нельзя было внести в систему, как исполнителя.