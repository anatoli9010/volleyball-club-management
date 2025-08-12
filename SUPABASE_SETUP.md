# 🗄️ Supabase Setup за безплатна PostgreSQL база данни

## Стъпка 1: Създайте Supabase акаунт

1. Отидете на [supabase.com](https://supabase.com)
2. Натиснете "Start your project"
3. Влезте с GitHub акаунт
4. Създайте нов проект

## Стъпка 2: Настройте проекта

1. **Име на проекта:** `trenera-volleyball`
2. **Database Password:** Генерирайте сложна парола
3. **Region:** Изберете най-близкия регион (например Europe West)
4. Натиснете "Create new project"

## Стъпка 3: Вземете connection string

1. В проекта → "Settings" → "Database"
2. Намерете "Connection string" секцията
3. Копирайте "URI" формата
4. Заменете `[YOUR-PASSWORD]` с вашата парола

**Пример:**
```
postgresql://postgres:your-password@db.abcdefghijklmnop.supabase.co:5432/postgres
```

## Стъпка 4: Добавете в Railway

1. В Railway проект → "Variables"
2. Добавете `DATABASE_URL` с вашия connection string
3. Натиснете "Add"

## Стъпка 5: Тествайте връзката

1. Railway автоматично ще се свърже с Supabase
2. Приложението ще създаде таблиците автоматично
3. Влезте с `admin` / `admin123`

## 🔒 Безопасност

- **Database Password:** Използвайте сложна парола
- **Row Level Security:** Supabase има вградена защита
- **Backup:** Supabase автоматично прави backup

## 📊 Supabase Dashboard

В Supabase можете да:
- ✅ Преглеждате данните в таблиците
- ✅ Правите SQL заявки
- ✅ Следвате използването
- ✅ Управлявате потребители

## 💰 Цени

**Supabase Free Plan:**
- ✅ 500MB база данни
- ✅ 50,000 заявки/месец
- ✅ 2GB bandwidth
- ✅ 1 проект
- ✅ 7 дни backup

**За волейболен клуб това е повече от достатъчно!**

## 🆘 Проблеми

### Не може да се свърже с базата данни
1. Проверете дали `DATABASE_URL` е правилен
2. Уверете се, че паролата е точна
3. Проверете дали проектът е активен

### Приложението не стартира
1. Проверете Railway логовете
2. Уверете се, че всички environment variables са зададени
3. Проверете дали Supabase проектът работи

---

**С Supabase имате професионална PostgreSQL база данни безплатно! 🎉**
