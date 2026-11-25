# Despliegue en el VPS de IONOS

Guía para publicar la web en el VPS con Node, PM2 y Nginx, con HTTPS gratuito.
Se asume Ubuntu y acceso por SSH como usuario con `sudo`.

## 1. Dominio

1. Comprar `3ddoshermanas.com` (o `.es`) en IONOS. Si es `.es`, cambiar el dominio en `.env`, en `deploy/nginx-3ddoshermanas.conf` y en los comandos de esta guía.
2. En la zona DNS del dominio crear dos registros `A` que apunten a la IP del VPS:
   - `@` -> IP del VPS
   - `www` -> IP del VPS
3. Comprobar desde tu ordenador (puede tardar hasta unas horas): `ping 3ddoshermanas.com`.

## 2. Preparar el servidor (una sola vez)

```bash
# Node 22 LTS
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt-get install -y nodejs nginx git
sudo npm install -g pm2
```

## 3. Descargar y compilar la web

```bash
sudo mkdir -p /var/www && sudo chown $USER /var/www
cd /var/www
git clone https://github.com/jorgechavez99/3ddoshermanas-web.git
cd 3ddoshermanas-web
cp .env_template .env          # revisar NEXT_PUBLIC_SITE_URL
npm ci
npm run build
npm run comprobar-seo          # debe terminar en "Comprobación SEO correcta"
```

## 4. Arrancar con PM2

```bash
pm2 start deploy/ecosystem.config.js
pm2 save
pm2 startup                    # copia y ejecuta el comando que imprime
```

La web queda escuchando en `127.0.0.1:3010`, solo accesible desde el propio servidor.

## 5. Nginx como proxy

```bash
sudo cp deploy/nginx-3ddoshermanas.conf /etc/nginx/sites-available/3ddoshermanas
sudo ln -s /etc/nginx/sites-available/3ddoshermanas /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx
```

Si gastroton.com ya usa Nginx en el mismo VPS no hay conflicto: cada dominio tiene su `server_name`.

## 6. HTTPS con Let's Encrypt

```bash
sudo apt-get install -y certbot python3-certbot-nginx
sudo certbot --nginx -d 3ddoshermanas.com -d www.3ddoshermanas.com
```

Certbot añade el HTTPS y la renovación automática.

## 7. Actualizar la web

```bash
cd /var/www/3ddoshermanas-web
git pull origin main
npm ci
npm run build && npm run comprobar-seo && pm2 reload 3ddoshermanas-web
```

## 8. Después de publicar

1. Poner `https://3ddoshermanas.com` como sitio web en la ficha de Google Business Profile y en las biografías de las redes.
2. Dar de alta la web en Google Search Console (verificación por DNS en IONOS) y enviar `https://3ddoshermanas.com/sitemap.xml`.
