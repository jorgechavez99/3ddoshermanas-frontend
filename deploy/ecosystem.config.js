/**
 * Configuracion de PM2 para el VPS.
 * La web escucha solo en 127.0.0.1: Nginx es quien la expone a Internet.
 */
module.exports = {
  apps: [
    {
      name: '3ddoshermanas-web',
      cwd: '/var/www/3ddoshermanas-web',
      script: 'node_modules/next/dist/bin/next',
      args: 'start -p 3010 -H 127.0.0.1',
      env: { NODE_ENV: 'production' },
      max_memory_restart: '300M',
    },
  ],
}
