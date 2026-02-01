# Полный гайд по деплою проекта "bts tickets" (Ubuntu 22.04)

Этот гайд проведет вас через все этапы: от покупки "голого" сервера до работающего сайта с SSL-сертификатом и уведомлениями в Telegram.

---

## 1. Покупка сервера (VPS)

Для работы проекта рекомендуется сервер со следующими характеристиками:
- **ОС:** Ubuntu 22.04 LTS
- **CPU:** Минимум 1 ядро (лучше 2)
- **RAM:** Минимум 2 ГБ
- **Disk:** SSD/NVMe от 20 ГБ

**Популярные провайдеры:**
- [Aeza](https://aeza.net/) (принимают RU-карты)
- [Timeweb Cloud](https://timeweb.cloud/) (принимают RU-карты)
- [Hetzner](https://www.hetzner.com/) (зарубежный, нужен зарубежный паспорт/карта)
- [DigitalOcean](https://www.digitalocean.com/)

---

## 2. Подключение к серверу

После покупки вы получите IP-адрес сервера и пароль (или SSH-ключ) для пользователя `root`.

### Как подключиться:
- **Windows:** Используйте программу [PuTTY](https://www.putty.org/) или стандартный терминал (PowerShell).
- **Mac/Linux:** Откройте терминал.

Команда для подключения:
```bash
ssh root@ваш_IP_адрес
```

---

## 3. Начальная настройка системы

Первым делом обновим пакеты:
```bash
apt update && apt upgrade -y
```

Установим базовые утилиты:
```bash
apt install -y curl git wget build-essential
```

---

## 4. Установка Docker и Docker Compose

Проект работает внутри Docker-контейнеров, что упрощает деплой.

### Установка Docker:
```bash
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh
```

### Установка Docker Compose:
```bash
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
```

Проверьте установку:
```bash
docker --version
docker-compose --version
```

---

## 5. Подготовка проекта

### Клонирование репозитория:
```bash
git clone <https://github.com/playerokjamal228-del/bts-tickets> /var/www/bts-tickets
cd /var/www/bts-tickets
```

### Создание файла настроек (.env):
Файл `.env` — это "пульт управления" вашим сайтом. В нем хранятся секретные ключи, пароли и настройки. 
В репозитории есть файл-шаблон `.env.example`. Мы копируем его в новый файл `.env`, который и будем редактировать.

1. **Создайте файл на основе шаблона:**
   ```bash
   cp .env.example .env
   ```

2. **Откройте его для редактирования:**
   ```bash
   nano .env
   ```

3. **Что там нужно изменить:**
   Внутри вы увидите строки вроде `TELEGRAM_BOT_TOKEN="your-token"`. Вам нужно заменить текст в кавычках на ваши реальные данные (как их получить — расписано в следующем пункте).

> [!TIP]
> Мы делаем копию, потому что `.env.example` виден всем в интернете (в GitHub), а ваш личный файл `.env` с настоящими паролями останется только на сервере — это стандарт безопасности.

---

## 6. Настройка функций (Telegram и База Данных)

### Настройка базы данных
В файле `.env` найдите строку `DATABASE_URL`. Для работы внутри Docker Compose укажите:
```env
DATABASE_URL="postgresql://user:password@db:5432/bts_tickets"
```
*(Замените `user` и `password` на свои)*

### Настройка Telegram бота
1.  **Создание бота:**
    *   Напишите [@BotFather](https://t.me/BotFather) в Telegram.
    *   Создайте нового бота (`/newbot`) и получите **API Token**.
2.  **Получение Chat ID:**
    *   Напишите [@userinfobot](https://t.me/userinfobot) или [@myidbot](https://t.me/myidbot).
    *   Он пришлет ваш цифровой ID (например, `123456789`).

**Вставьте данные в `.env`:**
```env
TELEGRAM_BOT_TOKEN="ваш_токен_от_botfather"
TELEGRAM_CHAT_ID="ваш_id"
```

*Чтобы сохранить изменения в `nano`, нажмите `Ctrl+O`, `Enter`, затем `Ctrl+X`.*

---
## 7. Запуск проекта

Файл `docker-compose.yml` уже находится в корне проекта. Он настроен на запуск самого приложения и базы данных PostgreSQL.

**Запустите сборку и старт:**
```bash
docker-compose up -d --build
```

### Наполнение базы данных (Seed):
Чтобы на сайте появились билеты и мероприятия (как в нашей текущей версии), нужно запустить специальный скрипт наполнения:
```bash
docker-compose exec app npx prisma db seed
```
*Эта команда заполнит пустую базу данных начальными данными из файла `prisma/seed.ts`.*

---

## 8. Настройка домена и SSL (Nginx)

### Установка Nginx:
```bash
apt install -y nginx
```

### Настройка конфигурации:
Создайте файл для вашего домена:
```bash
nano /etc/nginx/sites-available/yourdomain.com
```

Вставьте содержимое (заменив `yourdomain.com` на ваш домен):
```nginx
server {
    listen 80;
    server_name yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Активируйте конфиг:
```bash
ln -s /etc/nginx/sites-available/yourdomain.com /etc/nginx/sites-enabled/
nginx -t
systemctl restart nginx
```

### Настройка SSL (HTTPS):
Используем Certbot (Let's Encrypt):
```bash
apt install -y certbot python3-certbot-nginx
certbot --nginx -d yourdomain.com
```
*Следуйте инструкциям на экране (нужно будет ввести Email и подтвердить условия).*

---

## 9. Полезные команды

- **Логи приложения:** `docker-compose logs -f app`
- **Перезапуск проекта:** `docker-compose restart`
- **Остановка:** `docker-compose down`
- **Проверка статуса контейнеров:** `docker ps`

---

**Готово!** Теперь ваш сайт доступен по адресу `https://yourdomain.com`.
