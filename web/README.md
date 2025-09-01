# Проект публичного веб-сайта Гостиницы «Орбиталь»

## Настройка проекта

- Установить [Node.js](https://nodejs.org/en) 16 версии
- Скопировать файл `.env.example` в `.env` и установить env переменные

## Деплой

Перед деплоем, а конкретно сборкой образа нужно установить env переменные в файле `.env`

Пример деплоя проекта:
```
$ docker build -f deploy/Dockerfile -t <image-tag> .
$ docker run -p 80:80 -d <image-tag>
```
или конкретнее:
```
$ docker build -f deploy/Dockerfile -t orbital-web .
$ docker run -p 8000:80 -d orbital-web
```