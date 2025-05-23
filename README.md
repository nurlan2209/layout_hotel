# Hotel CRM Setup Instructions

## Структура проекта

```
frontend/
├── public/
├── src/
│   ├── components/
│   │   ├── Layout/
│   │   │   ├── Layout.jsx
│   │   │   └── Layout.css
│   │   ├── Dashboard/
│   │   │   ├── Dashboard.jsx
│   │   │   └── Dashboard.css
│   │   ├── Conversations/
│   │   │   ├── Conversations.jsx
│   │   │   └── Conversations.css
│   │   ├── Guests/
│   │   │   ├── Guests.jsx
│   │   │   └── Guests.css
│   │   ├── Tasks/
│   │   │   ├── Tasks.jsx
│   │   │   └── Tasks.css
│   │   └── Rooms/
│   │       ├── Rooms.jsx
│   │       └── Rooms.css
│   ├── mockData/
│   │   ├── guests.json
│   │   ├── rooms.json
│   │   ├── tasks.json
│   │   ├── bookings.json
│   │   ├── conversations.json
│   │   └── activities.json
│   ├── services/
│   │   └── api.js
│   ├── contexts/
│   │   └── DataContext.jsx
│   ├── App.jsx
│   ├── App.css
│   └── main.jsx
```

## Установка зависимостей

```bash
cd frontend
npm install react-router-dom recharts react-icons
```

## Создание файлов

1. Создайте все папки согласно структуре выше
2. Скопируйте код из артефактов в соответствующие файлы
3. Убедитесь, что все пути импортов правильные

## Запуск проекта

```bash
npm run dev
```

## Особенности реализации

1. **Mock данные**: Все данные хранятся в папке `mockData` в формате JSON
2. **API сервис**: Файл `services/api.js` содержит заглушки для всех API методов
3. **Context**: `DataContext` управляет глобальным состоянием приложения
4. **Роутинг**: Используется React Router v6
5. **Стили**: Чистый CSS, каждый компонент имеет свой файл стилей

## Для интеграции с бэкендом

1. Замените mock импорты в `api.js` на реальные API вызовы
2. Обновите URL endpoints в соответствии с вашим бэкендом
3. Добавьте обработку ошибок и загрузки
4. Настройте аутентификацию

## Примечания

- Все компоненты готовы к подключению реального API
- DataContext обеспечивает централизованное управление состоянием
- Структура данных соответствует скриншотам
- CSS стили максимально приближены к оригинальному дизайну