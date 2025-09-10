const wordList = 'Lorem ipsum dolor sit amet consectetur adipisicing elit'.split(' ')

const routes = [...Array(6)].map((_, index) => {
   let id = index + 1
   return {
      name: `Game ${random(0, 999)}`,
      path: `game-${id}`,
      difficulty: random(0, 4),
      description: wordList.slice(0, random(3, wordList.length)).join(' ') + '.',
   }
})

function random(start, end) {
   return start + Math.floor(Math.random() * (end - start + 1))
}

export default routes
