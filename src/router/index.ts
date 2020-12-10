import { Game } from '../components/Game'
import { WebGL } from '../components/WebGL'

const routes = [
  {
    path: '/',
    component: Game,
  },
  {
    path: '/webGL',
    component: WebGL,
  },
]

export default routes
