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
]

routes = routes.map((route) => ({ ...route, component: 'GameView' }))

export default routes
