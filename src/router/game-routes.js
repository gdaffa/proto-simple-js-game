let routes = [
   {
      name: 'Example',
      difficulty: 3,
      description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit.',
      path: '/example',
   },
   {
      name: 'Tic Tac Toe',
      difficulty: 1,
      description: 'Permainan dengan lebar 3x3 kotak untuk mendapatkan 3 simbol secara berurutan.',
      path: '/tictactoe',
   },
   {
      name: 'Snake',
      difficulty: 0,
      description: 'Menjadi ular dan berusahalah tumbuh sepanjang mungkin tanpa menabrak.',
      path: '/snake',
   },
]

routes = routes.map((route) => ({ ...route, component: 'GameView' }))

export default routes
