const wordList = 'Lorem ipsum dolor sit amet consectetur adipisicing elit'.split(' ')

const routes = [...Array(6)].map(() => {
   return {
      name: `Example`,
      path: `/game`,
      component: 'GameView',
      difficulty: random(0, 4),
      description: wordList.slice(0, random(3, wordList.length)).join(' ') + '.',
   }
})

function random(start, end) {
   return start + Math.floor(Math.random() * (end - start + 1))
}

export default routes
