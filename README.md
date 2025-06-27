# Проектная работа 11-го спринта

# Stellar Burgers

Космическое приложение для сборки и заказа бургеров. Реализована авторизация, личный кабинет, лента заказов и работа с API в реальном времени.

[Макет](<https://www.figma.com/file/vIywAvqfkOIRWGOkfOnReY/React-Fullstack_-Проектные-задачи-(3-месяца)_external_link?type=design&node-id=0-1&mode=design>)

[Чеклист](https://www.notion.so/praktikum/0527c10b723d4873aa75686bad54b32e?pvs=4)

## Функциональность

- Конструктор бургеров с интерактивным интерфейсом
- Авторизация, регистрация и восстановление пароля
- Личный кабинет с историей заказов
- Лента заказов, обновляемая по WebSocket
- Поддержка модальных окон на основе маршрутов
- Защищённые маршруты с автоматическим редиректом

## Установка и запуск

```bash
git clone https://github.com/ваш-логин/stellar-burgers.git
cd stellar-burgers
npm install
```

Создайте `.env` файл на основе `.env.example`:

```env
BURGER_API_URL=https://norma.nomoreparties.space/api
```

Затем запустите проект:

```bash
npm start
```

## Технологии

- React + TypeScript
- Redux Toolkit
- React Router v6
- WebSocket
- CSS Modules
- Redux DevTools

