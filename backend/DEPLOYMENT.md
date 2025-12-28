# Guía de Deployment - CUMBRE Backend

## 🚀 Preparación para Producción

### 1. Variables de Entorno

Crea un archivo `.env.production` con valores de producción:

```env
# Base de Datos (usa credenciales seguras)
DATABASE_URL="postgresql://usuario_prod:contraseña_segura@host_produccion:5432/cumbre_prod"

# JWT (genera secretos aleatorios fuertes)
JWT_SECRET="aqui-va-un-secreto-muy-largo-y-aleatorio-de-al-menos-64-caracteres"
JWT_ACCESS_EXPIRATION="15m"
JWT_REFRESH_SECRET="otro-secreto-diferente-tambien-muy-largo-y-aleatorio-de-64-chars"
JWT_REFRESH_EXPIRATION="7d"

# Server
PORT=3000
NODE_ENV=production

# API
API_PREFIX=api/v1
API_RATE_LIMIT=100

# Swagger (desactivar en producción si no es necesario)
SWAGGER_ENABLED=false
SWAGGER_PATH=documentacion

# Security
BCRYPT_ROUNDS=12
ARGON2_MEMORY_COST=65536
ARGON2_TIME_COST=3
ARGON2_PARALLELISM=4

# Application
APP_NAME="CUMBRE - Plataforma de Soberanía Digital"
APP_VERSION="1.0.0"
APP_DESCRIPTION="Sistema de gestión de talento y activos digitales de Mendoza"
```

### 2. Compilar el Proyecto

```powershell
npm run build
```

Esto genera la carpeta `dist/` con el código compilado.

### 3. Ejecutar Migraciones en Producción

```powershell
# Generar cliente Prisma
npx prisma generate

# Aplicar migraciones (sin prompt interactivo)
npx prisma migrate deploy
```

### 4. Iniciar en Modo Producción

```powershell
npm run start:prod
```

---

## 🐳 Deployment con Docker

### Dockerfile

Crea un `Dockerfile` en la raíz del backend:

```dockerfile
FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma/

RUN npm ci

COPY . .

RUN npm run build
RUN npx prisma generate

FROM node:18-alpine

WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/package*.json ./

ENV NODE_ENV=production

EXPOSE 3000

CMD ["npm", "run", "start:prod"]
```

### docker-compose.yml

```yaml
version: '3.8'

services:
  postgres:
    image: postgres:17-alpine
    container_name: cumbre-postgres
    environment:
      POSTGRES_USER: cumbre_user
      POSTGRES_PASSWORD: ${DB_PASSWORD}
      POSTGRES_DB: cumbre_db
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
    networks:
      - cumbre-network
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U cumbre_user"]
      interval: 10s
      timeout: 5s
      retries: 5

  backend:
    build: .
    container_name: cumbre-backend
    ports:
      - "3000:3000"
    environment:
      DATABASE_URL: postgresql://cumbre_user:${DB_PASSWORD}@postgres:5432/cumbre_db
      JWT_SECRET: ${JWT_SECRET}
      JWT_REFRESH_SECRET: ${JWT_REFRESH_SECRET}
      NODE_ENV: production
    depends_on:
      postgres:
        condition: service_healthy
    networks:
      - cumbre-network
    restart: unless-stopped

volumes:
  postgres_data:

networks:
  cumbre-network:
    driver: bridge
```

### Comandos Docker

```powershell
# Construir y levantar
docker-compose up -d --build

# Ver logs
docker-compose logs -f backend

# Ejecutar migraciones
docker-compose exec backend npx prisma migrate deploy

# Ejecutar seed
docker-compose exec backend npm run prisma:seed

# Detener
docker-compose down

# Limpiar todo (⚠️ borra datos)
docker-compose down -v
```

---

## ☁️ Deployment en Cloud

### Opciones Recomendadas

#### 1. Railway.app (Más Simple)
```powershell
# Instalar CLI
npm install -g @railway/cli

# Login
railway login

# Inicializar proyecto
railway init

# Deploy
railway up
```

#### 2. Heroku
```powershell
# Instalar CLI de Heroku
# https://devcenter.heroku.com/articles/heroku-cli

# Login
heroku login

# Crear app
heroku create cumbre-backend

# Añadir PostgreSQL
heroku addons:create heroku-postgresql:hobby-dev

# Configurar variables de entorno
heroku config:set JWT_SECRET=tu_secreto_aqui
heroku config:set JWT_REFRESH_SECRET=otro_secreto

# Deploy
git push heroku main

# Ejecutar migraciones
heroku run npx prisma migrate deploy
```

#### 3. AWS (EC2 + RDS)
```powershell
# Configurar instancia EC2
# Instalar Node.js, PostgreSQL client
# Configurar RDS para PostgreSQL
# Configurar Security Groups
# Usar PM2 para gestión de procesos
pm2 start dist/main.js --name cumbre-backend
pm2 startup
pm2 save
```

#### 4. Vercel (Frontend) + Supabase (Backend DB)
- Deploy el backend en Vercel
- Usar Supabase para PostgreSQL
- Configurar variables de entorno en Vercel

---

## 🔒 Checklist de Seguridad

Antes de ir a producción, verifica:

- [ ] Variables de entorno con secretos fuertes
- [ ] HTTPS habilitado (certificado SSL)
- [ ] CORS configurado solo para dominios permitidos
- [ ] Rate limiting activado
- [ ] Logs configurados y monitoreados
- [ ] Backups de base de datos programados
- [ ] Swagger deshabilitado (o con autenticación)
- [ ] Prisma Studio no expuesto públicamente
- [ ] Variables sensibles no committed en Git
- [ ] Dependencias actualizadas (npm audit)

---

## 📊 Monitoreo

### PM2 (Para servidores)

```powershell
# Instalar PM2
npm install -g pm2

# Iniciar con PM2
pm2 start npm --name "cumbre-backend" -- run start:prod

# Ver logs
pm2 logs cumbre-backend

# Monitorear
pm2 monit

# Guardar configuración
pm2 save

# Auto-start en boot
pm2 startup
```

### Logs en Producción

Considera usar:
- Winston para logs estructurados
- Sentry para error tracking
- New Relic o DataDog para APM

---

## 🔄 CI/CD

### GitHub Actions (Ejemplo)

Crea `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: npm ci
        working-directory: ./backend
      
      - name: Run tests
        run: npm test
        working-directory: ./backend
      
      - name: Build
        run: npm run build
        working-directory: ./backend
      
      - name: Deploy to Railway
        run: railway up
        env:
          RAILWAY_TOKEN: ${{ secrets.RAILWAY_TOKEN }}
```

---

## 🆘 Troubleshooting en Producción

### Error: "Can't reach database server"
```powershell
# Verificar conexión
psql $DATABASE_URL

# Verificar firewall
telnet host_db 5432

# Verificar variables de entorno
echo $DATABASE_URL
```

### Error: "Port already in use"
```powershell
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Linux
lsof -ti:3000 | xargs kill
```

### Aplicación lenta
```powershell
# Ver uso de recursos
pm2 monit

# Analizar queries lentas (Prisma)
# Añade en schema.prisma:
log = ["query", "info", "warn", "error"]
```

### Memory leak
```powershell
# Analizar memoria con PM2
pm2 start dist/main.js --max-memory-restart 500M

# Heap snapshot
node --inspect dist/main.js
```

---

## 📦 Backups

### Base de Datos

```powershell
# Backup manual
pg_dump $DATABASE_URL > backup_$(date +%Y%m%d_%H%M%S).sql

# Restore
psql $DATABASE_URL < backup_20241227_150000.sql

# Backup automático (cron)
# Editar crontab: crontab -e
# Añadir: 0 2 * * * pg_dump $DATABASE_URL > /backups/cumbre_$(date +\%Y\%m\%d).sql
```

---

## 📈 Escalamiento

### Escalamiento Vertical
- Aumentar recursos de servidor (CPU, RAM)
- Optimizar queries de BD
- Implementar caching con Redis

### Escalamiento Horizontal
- Load balancer (nginx, AWS ELB)
- Múltiples instancias del backend
- Database replication (read replicas)

```nginx
# nginx.conf ejemplo
upstream cumbre_backend {
    server backend1:3000;
    server backend2:3000;
    server backend3:3000;
}

server {
    listen 80;
    location / {
        proxy_pass http://cumbre_backend;
    }
}
```

---

## ✅ Post-Deployment

Después del deploy:

1. Verificar healthcheck: `curl https://api.cumbre.com/api/v1/sistema/salud`
2. Probar endpoints críticos
3. Revisar logs por errores
4. Monitorear métricas de rendimiento
5. Notificar al equipo del deploy exitoso

---

**¡Backend listo para cambiar Mendoza! 🏔️**
