// Register vue composition api globally
import { ViteSSG } from 'vite-ssg'
import generatedRoutes from 'virtual:generated-pages'
import { setupLayouts } from 'virtual:generated-layouts'
import App from './App.vue'

// Windicss layers
import 'virtual:windi-base.css'
import 'virtual:windi-components.css'
// Your custom styles here
import './styles/main.css'
// Windicss utilities should be the last style import
import 'virtual:windi-utilities.css'
// Windicss devtools support (dev only)
import 'virtual:windi-devtools'

const routes = setupLayouts(generatedRoutes)

// https://github.com/antfu/vite-ssg
export const createApp = ViteSSG(
  App,
  { routes },
  ctx => {
    // Install all modules under `modules/`
    Object.values(import.meta.globEager('./modules/*.ts')).map(i => i.install?.(ctx))
  },
)
