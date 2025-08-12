# 🏐 Trenera - Волейболен Клуб Мениджър

Система за управление на волейболен клуб с функции за:
- 📊 Управление на състезатели
- 💰 Проследяване на плащания
- 📅 Организиране на тренировки
- 📱 Telegram известия
- 📧 Email уведомления

## 🚀 Деплойване в Render (24/7 хостиране)

### Стъпка 1: Подготовка
1. Отидете на [Render.com](https://render.com)
2. Създайте акаунт с GitHub
3. Натиснете "New +" → "Web Service"

### Стъпка 2: Конфигурация
1. **Свържете GitHub repository:**
   - Изберете `anatoli9010/volleyball-club-management`
   - Render ще автоматично открие Python проекта

2. **Настройте Web Service:**
   - **Name:** `trenera-volleyball`
   - **Environment:** `Python 3`
   - **Build Command:** `pip install -r requirements.txt`
   - **Start Command:** `gunicorn app_v3:app`
   - **Plan:** Free

3. **Добавете PostgreSQL база данни:**
   - В проекта → "New +" → "PostgreSQL"
   - **Name:** `trenera-db`
   - **Plan:** Free
   - Render ще създаде `DATABASE_URL` автоматично

4. **Добавете Environment Variables:**
   - `SECRET_KEY` = генерирайте сложна парола
   - `TELEGRAM_BOT_TOKEN` = вашият Telegram bot token
   - `SMTP_HOST` = вашият SMTP сървър (smtp.gmail.com)
   - `SMTP_PORT` = 587
   - `SMTP_USER` = вашият email
   - `SMTP_PASS` = вашата app парола

### Стъпка 3: Деплойване
1. Натиснете "Create Web Service"
2. Render ще започне автоматично да build-ва проекта
3. След 2-3 минути приложението ще бъде достъпно

## 🔧 Локално разработване

### Инсталиране на зависимости:
```bash
pip install -r requirements.txt
```

### Стартиране на приложението:
```bash
python app_v3.py
```

### Инициализиране на базата данни:
```bash
python migrations.py init
```

## 📊 Функции

### Управление на състезатели:
- Добавяне/редактиране на състезатели
- Проследяване на възраст, позиция, контакти
- История на плащанията

### Плащания:
- Регистриране на плащания
- Проследяване на дългове
- Автоматични известия

### Тренировки:
- Създаване на тренировъчни сесии
- Отчитане на присъствие
- Статистика

### Известия:
- Telegram bot интеграция
- Email уведомления
- Автоматични напомняния

## 🔐 Вход в системата

**Потребителско име:** `admin`
**Парола:** `admin123`

## 📱 Telegram Bot

За да активирате Telegram известия:
1. Създайте bot чрез @BotFather
2. Вземете TOKEN
3. Добавете го в environment variables
4. Настройте webhook

## 📧 Email настройки

За Gmail:
- SMTP_HOST: smtp.gmail.com
- SMTP_PORT: 587
- SMTP_USER: вашият@gmail.com
- SMTP_PASS: App Password (не обикновената парола)

## 🗄️ База данни

Приложението поддържа:
- **SQLite** (за разработка)
- **PostgreSQL** (за production)

Данните се запазват автоматично и не се губят при рестартиране.

## 🚀 24/7 Достъп

След деплойване в Render:
- Приложението е достъпно 24/7
- Базата данни е постоянна
- Автоматични backup-и
- SSL сертификат включен

## 📞 Поддръжка

При проблеми:
1. Проверете logs в Render dashboard
2. Уверете се, че environment variables са правилни
3. Проверете дали базата данни е свързана

---
**Създадено с ❤️ за волейболните клубове**

