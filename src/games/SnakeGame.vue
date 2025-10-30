<script setup>
import { ref, reactive, watch } from 'vue'
import { random } from '@/utils/math'

import GamepadButtonComp from '@/components/GamepadButtonComp.vue'
import GameInfoComp from '@/components/GameInfoComp.vue'
import OverlaySectionComp from '@/components/OverlaySectionComp.vue'
import GameStartButtonComp from '@/components/GameStartButtonComp.vue'

const [X_LENGTH, Y_LENGTH] = window.innerWidth >= 768 ? [16, 10] : [8, 10]
let board = getNewBoard()

const arrowDirection = {
   ArrowUp: [0, -1],
   ArrowDown: [0, 1],
   ArrowLeft: [-1, 0],
   ArrowRight: [1, 0],
}

let snakeCord = []
const initalLenght = 4

let direction = [1, 0]
let prevDirection = direction

const speed = ref(5)
let movement

const isStarted = ref(false)
const highestScore = ref(0)
let score = 0

// =============================================================================

/**
 * Generates and returns a new reactive board.
 */
function getNewBoard() {
   let vector = Array(X_LENGTH).fill()
   let table = vector.map(() =>
      Array(Y_LENGTH)
         .fill()
         .map(() => ({ content: '', order: null })),
   )
   return reactive(table)
}

/**
 * Generate random x and y position for an apple,
 * repeat until it finds an empty coordinate.
 */
function generateApple() {
   let x, y
   do {
      ;[x, y] = [random(0, X_LENGTH - 1), random(0, Y_LENGTH - 1)]
   } while (board[x][y].content == 'snake')

   board[x][y].content = 'apple'
}

/**
 * Get the board item as if it were a flat array
 * without using the `.flat()` method.
 *
 * @param {number} i
 */
function getBoardItem(i) {
   i -= 1
   return board[i % X_LENGTH][Math.floor(i / X_LENGTH)]
}

/**
 * Redirect snake direction with keyboard key code.
 *
 * @param {'ArrowUp'|'ArrowDown'|'ArrowLeft'|'ArrowRight'} key
 * @param {boolean} force
 */
function redirect(key, force = false) {
   let newDirection = arrowDirection[key]

   // if the direction wont hit itself before new move generated,
   // for example if original direction is [1, 0], it wont accept [-1, 0] direction
   if (
      (newDirection[0] * prevDirection[0] == 0 && newDirection[1] * prevDirection[1] == 0) ||
      force
   ) {
      direction = newDirection
   }
}

/**
 * Starts the snake's movement with snake coordinate validation on each step.
 */
function startMove() {
   return setInterval(() => {
      let [headX, headY] = snakeCord.slice(-1)[0]
      let [tailX, tailY] = snakeCord[0]
      let [newX, newY] = [headX + direction[0], headY + direction[1]]

      // if hit the wall, game over
      if (newX >= X_LENGTH || newX < 0 || newY >= Y_LENGTH || newY < 0) {
         return gameOver()
      }
      // if hit snake itself, game over
      if (snakeCord.slice(1).some(([x, y]) => x == newX && y == newY)) {
         return gameOver()
      }

      let hasEatenApple = board[newX][newY].content == 'apple'

      // if snake didn't eat the apple, remove the tail
      if (!hasEatenApple) {
         snakeCord.shift()
         board[tailX][tailY] = {
            content: '',
            order: null,
         }
      }

      prevDirection = direction
      snakeCord.forEach(([x, y]) => board[x][y].order++)

      // add new head
      snakeCord.push([newX, newY])
      board[newX][newY] = {
         content: 'snake',
         order: 0,
      }

      if (hasEatenApple) {
         score++
         generateApple()
      }
   }, 1000 / speed.value)
}

/**
 * Stop the game and update the score.
 */
function gameOver() {
   clearInterval(movement)

   let isYellow = false
   // flash/blink the snake's color to yellow to signal defeat
   let yellowFlicker = setInterval(() => {
      isYellow = !isYellow
      snakeCord.forEach(([x, y]) => (board[x][y].content = isYellow ? 'yellow' : 'snake'))
   }, 300)

   setTimeout(() => {
      isStarted.value = !isStarted.value
      clearInterval(yellowFlicker)
   }, 3000)

   highestScore.value = score > highestScore.value ? score : highestScore.value
}

/**
 * Start the game and the snake movement.
 */
function startTheGame() {
   if (speed.value <= 0) {
      return
   }

   score = 0
   snakeCord = []
   isStarted.value = true

   board = getNewBoard()
   redirect('ArrowRight', true)

   // add initial snake body to the board according to direction
   for (let i = 0; i < initalLenght; i++) {
      let [x, y] = [i * direction[0], i * direction[1]]

      snakeCord.push([x, y])
      board[x][y] = {
         content: 'snake',
         order: initalLenght - 1 - i,
      }
   }

   generateApple()
   movement = startMove()
}

// =============================================================================
window.addEventListener('keydown', (ev) => {
   if (!Object.keys(arrowDirection).includes(ev.code)) {
      return
   }
   redirect(ev.code)
})

// validate speed value to always be a positive number
watch(speed, (val, oldVal) => {
   let invalid = val.toString().search(/[^\d.]/) > -1

   let currentVal = invalid ? oldVal : val
   currentVal = currentVal == '' ? 0 : currentVal

   speed.value = currentVal
})
</script>

<template>
   <div class="relative h-full">
      <OverlaySectionComp v-if="!isStarted">
         <span>Kecepatan Ular</span>
         <div>
            <input
               ref="$InputElem"
               class="w-15 border-2 px-1 rounded-sm border-zinc-700 outline-none mr-2 inset-shadow-sm inset-shadow-zinc-900/40 appearance-none m-0"
               type="number"
               v-model="speed"
               @keydown.enter="startTheGame"
            />
            <span>blok / detik</span>
         </div>
         <GameInfoComp v-if="speed > 0">Sekitar {{ 1 / speed }} detik / blok</GameInfoComp>
         <GameInfoComp v-else status="danger">Kecepatan harus lebih dari 0!</GameInfoComp>
         <GameStartButtonComp @click="startTheGame" />
      </OverlaySectionComp>
      <div
         class="mx-auto flex flex-col justify-center h-full gap-2 relative lg:w-[calc(50lvw-var(--spacing-sidebar-close))]"
      >
         <div
            class="text-sm w-full px-2 lg:px-0 flex justify-between lg:w-[calc(50lvw-var(--spacing-sidebar-close))] mx-auto z-2 relative"
         >
            <div
               class="px-3 py-1 bg-zinc-700 rounded-md shadow-[0_1px_1px_1px] border-zinc-600 border-t-1 shadow-zinc-900/50"
            >
               Skor: {{ score }}
            </div>
            <div
               class="px-3 py-1 bg-zinc-700 rounded-md shadow-[0_1px_1px_1px] border-zinc-600 border-t-1 shadow-zinc-900/50"
            >
               Tertinggi: {{ highestScore }}
            </div>
         </div>
         <ol
            :style="{ gridTemplateColumns: `repeat(${X_LENGTH}, 1fr)` }"
            class="grid border-zinc-700 border-4 w-full"
         >
            <li
               v-for="i in X_LENGTH * Y_LENGTH"
               :key="i"
               :style="{
                  '--brightness': 1 - ((getBoardItem(i).order ?? 0) / (snakeCord.length - 1)) * 0.4,
               }"
               class="flex border-zinc-700 border-4 aspect-square after:w-full after:h-full after:brightness-(--brightness)"
               :class="{
                  'after:bg-red-500': getBoardItem(i).content == 'apple',
                  'after:bg-green-400': getBoardItem(i).content == 'snake',
                  'after:bg-yellow-400': getBoardItem(i).content == 'yellow',
               }"
            ></li>
         </ol>
         <div class="grid grid-cols-3 p-3 gap-3 items-center w-full">
            <GamepadButtonComp
               @click="redirect('ArrowUp')"
               class="w-full h-13 row-1 col-2"
               icon="mynaui:arrow-long-up-solid"
               clickedKey="ArrowUp"
            />
            <GamepadButtonComp
               @click="redirect('ArrowLeft')"
               class="w-full h-13 row-2 col-1"
               icon="mynaui:arrow-long-left-solid"
               clickedKey="ArrowLeft"
            />
            <GamepadButtonComp
               @click="redirect('ArrowDown')"
               class="w-full h-13 row-2 col-2"
               icon="mynaui:arrow-long-down-solid"
               clickedKey="ArrowDown"
            />
            <GamepadButtonComp
               @click="redirect('ArrowRight')"
               class="w-full h-13 row-2 col-3"
               icon="mynaui:arrow-long-right-solid"
               clickedKey="ArrowRight"
            />
         </div>
      </div>
   </div>
</template>
