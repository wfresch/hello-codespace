/* eslint-env node */
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
//import express from 'express'
import dotenv from 'dotenv'
import compression from 'compression'
import serveStatic from 'serve-static'
import { createServer } from 'node:http'
import { Server as SocketServer } from 'socket.io'

import { app as backendApp } from './backend/src/app.js'
import { handleSocket } from './backend/src/socket.js'
import { generateSitemap } from './generateSitemap.js'

dotenv.config()
const __dirname = path.dirname(fileURLToPath(import.meta.url))

async function createServerApp(isProd = false) {
  const app = backendApp

  if (isProd) {
    app.use(compression())
    app.use(
      serveStatic(path.resolve(__dirname, 'dist/client'), { index: false }),
    )
  }

  // Catch-all for SSR or static routes
  app.use('*', async (req, res, next) => {
    if (req.originalUrl === '/sitemap.xml') {
      const sitemap = await generateSitemap()
      return res
        .status(200)
        .set({ 'Content-Type': 'application/xml' })
        .end(sitemap)
    }

    try {
      const templatePath = isProd
        ? path.resolve(__dirname, 'dist/client/index.html')
        : path.resolve(__dirname, 'index.html')

      const templateHtml = fs.readFileSync(templatePath, 'utf-8')

      const renderModulePath = isProd
        ? './dist/server/entry-server.js'
        : '/src/entry-server.jsx'

      const { render } = isProd
        ? await import(renderModulePath)
        : await import(renderModulePath)

      const appHtml = await render(req)
      const html = templateHtml.replace('<!--ssr-outlet-->', appHtml)
      res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
    } catch (e) {
      next(e)
    }
  })

  const server = createServer(app)
  const io = new SocketServer(server, { cors: { origin: '*' } })
  handleSocket(io)

  const PORT = process.env.PORT || 3000
  server.listen(PORT, () =>
    console.log(
      `${
        isProd ? 'SSR production' : 'SSR dev'
      } + backend + Socket.IO running on http://localhost:${PORT}`,
    ),
  )
}

const isProd = process.env.NODE_ENV === 'production'
await createServerApp(isProd)
