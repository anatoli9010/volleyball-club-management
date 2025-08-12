# 🏐 Trenera - Волейболен Клуб Мениджър

Система за управление на волейболен клуб с функции за:
- 📊 Управление на състезатели
- 💰 Проследяване на плащания
- 📅 Организиране на тренировки
- 📱 Telegram известия
- 📧 Email уведомления

## 🚀 Деплойване в Railway (Препоръчвам)

### Стъпка 1: Подготовка
1. Отидете на [Railway.app](https://railway.app)
2. Създайте акаунт с GitHub
3. Натиснете "New Project" → "Deploy from GitHub repo"

### Стъпка 2: Конфигурация
1. **Добавете PostgreSQL база данни:**
   - В проекта → "New" → "Database" → "PostgreSQL"
   - Railway ще създаде `DATABASE_URL` автоматично

2. **Добавете environment variables:**
   - `SECRET_KEY` = генерирайте сложна парола
   - `TELEGRAM_BOT_TOKEN` = вашият Telegram bot token
   - `SMTP_HOST` = вашият SMTP сървър
   - `SMTP_PORT` = 587 (или 465 за SSL)
   - `SMTP_USER` = вашият email
   - `SMTP_PASS` = вашата парола

### Стъпка 3: Деплойване
1. Railway ще автоматично деплойва от GitHub
2. След успешен деплой, отидете на URL-а
3. Влезте с: `admin` / `admin123`

## 🔧 Локално развитие

### Инсталация
```bash
# Клонирайте проекта
git clone <your-repo>
cd trenera

# Създайте virtual environment
python -m venv venv
venv\Scripts\activate  # Windows
source venv/bin/activate  # Linux/Mac

# Инсталирайте зависимости
pip install -r requirements.txt

# Инициализирайте базата данни
python migrations.py init

# Стартирайте приложението
python app_v3.py
```

### Backup и Restore
```bash
# Създайте backup на текущите данни
python migrations.py backup

# Възстановете данни от backup
python migrations.py restore
```

## 📱 Telegram Bot Setup

1. Създайте bot в Telegram:
   - Напишете на @BotFather
   - `/newbot` → следвайте инструкциите
   - Запазете token-а

2. Добавете token в Railway environment variables

3. Webhook ще се настрои автоматично

## 📧 Email Setup

За Gmail:
- `SMTP_HOST` = smtp.gmail.com
- `SMTP_PORT` = 587
- `SMTP_USER` = вашият@gmail.com
- `SMTP_PASS` = App Password (не основната парола)

## 🗄️ База данни

### Локално (SQLite)
- Файл: `instance/trenera.db`
- Автоматично се създава при първо стартиране

### Production (PostgreSQL)
- Railway автоматично предоставя PostgreSQL
- Данните се запазват постоянно
- Няма загуба при рестартиране

## 🔒 Безопасност

- Променете `admin123` паролата след първо влизане
- Използвайте сложен `SECRET_KEY`
- Не споделяйте environment variables

## 📊 Функции

### За Администратори:
- ✅ Управление на потребители
- ✅ Създаване на отбори
- ✅ Пълен достъп до всички функции

### За Треньори:
- ✅ Добавяне/редактиране на състезатели
- ✅ Управление на плащания
- ✅ Организиране на тренировки
- ✅ Отбелязване на присъствие

### За Родители (чрез Telegram):
- ✅ Получаване на известия за плащания
- ✅ Информация за присъствие
- ✅ Напомняния

## 🛠️ Поддръжка

### Логове
- Railway предоставя автоматични логове
- Проверете "Deployments" → "View Logs"

### Backup
- Railway автоматично прави backup на PostgreSQL
- Можете да правите ръчни backup с `python migrations.py backup`

### Обновяване
1. Направете промени в кода
2. Push-нете в GitHub
3. Railway автоматично ще деплойва

## 💰 Цени

### Railway
- **Безплатен план:** $5 кредит/месец
- **Платен план:** $20/месец за повече ресурси

### Heroku (алтернатива)
- **Платен план:** $7/месец
- **PostgreSQL:** $5/месец

## 🆘 Проблеми

### Приложението не стартира
1. Проверете логовете в Railway
2. Уверете се, че всички environment variables са зададени
3. Проверете дали PostgreSQL е свързан

### Данните се губят
1. Railway PostgreSQL е постоянен
2. Ако използвате SQLite, данните са в `instance/trenera.db`
3. Правите backup с `python migrations.py backup`

### Telegram не работи
1. Проверете дали `TELEGRAM_BOT_TOKEN` е правилен
2. Уверете се, че webhook URL е достъпен
3. Проверете логовете за грешки

## 📞 Поддръжка

За въпроси и проблеми:
- Създайте Issue в GitHub
- Проверете логовете в Railway
- Уверете се, че следвате инструкциите стъпка по стъпка

---

**Успех с вашия волейболен клуб! 🏐**

