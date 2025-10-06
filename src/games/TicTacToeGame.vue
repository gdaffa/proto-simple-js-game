<script setup>
import { ref, reactive, computed } from 'vue'
import { Icon } from '@iconify/vue'

import SwitchButton from '@/components/SwitchButton.vue'

defineProps(['type'])

// =============================================================================

const winCon = [
   [1, 2, 3],
   [4, 5, 6],
   [7, 8, 9],
   [1, 4, 7],
   [2, 5, 8],
   [3, 6, 9],
   [1, 5, 9],
   [3, 5, 7],
]

let realTurnBool = true
const realBoardCon = reactive(Array(9).fill(''))

// true = bot, false = friend
const playWithBool = ref(true)
// true = X, false = O
const playAsBool = ref(true)
let started = ref(false)

const iconList = { x: 'mingcute:close-line', o: 'mingcute:round-line' }

// =============================================================================

function getIcon(n) {
   return iconList[realBoardCon[n]] ?? ''
}

/**
 * To fill the board with given turn.
 *
 * @param {number} n
 * @param {boolean} turnBool
 * @param {string[]} boardCon
 */
function fill(n, turnBool, boardCon) {
   boardCon[n] = turnBool ? 'x' : 'o'
}

/**
 * To check the terminal state in the board.
 * - return `1` if the given turn win
 * - return `-1` if the board is full
 * - return `0` if the game still continue.
 *
 * Both 1 and -1 is true and 0 is false.
 *
 * @param {boolean} turnBool
 * @param {string[]} boardCon
 */
function checkState(turnBool, boardCon) {
   let turn = turnBool ? 'x' : 'o'

   // if there is a win return 1
   if (winCon.some((con) => con.every((nCon) => boardCon[nCon - 1] == turn))) {
      return 1
   }
   // if the board is already full return -1
   if (!boardCon.includes('')) {
      return -1
   }
   // if the game still continue return 0
   return 0
}

/**
 * Review the real game. If the game stopped, popup the result.
 */
function realGameReview() {
   let state = checkState(realTurnBool, realBoardCon)
   if (state == 0) {
      return
   }

   started.value = false
   let turn = realTurnBool ? 'X' : 'O'
   let msg = state == 1 ? `${turn} menang!` : 'permainan seri!'

   alert(`Game over, ${msg}!`)
}

/**
 * A function to determine the optimal step for the bot,
 * assuming that the opponent is playing optimally too.
 *
 * @param {boolean} returnN
 * @param {boolean} turnBool
 * @param {string[]} boardCon
 */
function minimax(returnN, turnBool, boardCon) {
   // [best condition, best n according to condition]
   let best = [-Infinity, null]

   for (let n = 0; n < 9; n++) {
      // if n already filled
      if (boardCon[n]) {
         continue
      }

      let boardConTemp = [...boardCon]
      fill(n, turnBool, boardConTemp)

      // this is the 1st alpha beta pruning
      let state = checkState(turnBool, boardConTemp)
      if (state != 0) {
         return returnN ? n : state == 1 ? 1 : 0
      }

      // check the best n prediction for the opponent times -1,
      // as the best oppenent move is the worst for the current turn,
      // this is the 2nd alpha beta pruning
      let pred = -minimax(false, !turnBool, boardConTemp)
      if (pred == 1) {
         return returnN ? n : 1
      }
      best = pred > best[0] ? [pred, n] : best
   }

   return best[returnN ? 1 : 0]
}

/**
 * Function for user turn.
 *
 * @param {number} n
 */
function userTurn(n) {
   fill(n, realTurnBool, realBoardCon)
   realGameReview()
   realTurnBool = !realTurnBool
}

/**
 * Function for bot turn.
 *
 * @param {number} n
 */
function botTurn() {
   // let t = Date.now()
   let pred = minimax(true, realTurnBool, realBoardCon)
   // console.log(Date.now() - t)
   fill(pred, realTurnBool, realBoardCon)
   realGameReview()
   realTurnBool = !realTurnBool
}

/**
 * When a box got clicked in real board.
 *
 * @param {number} n
 */
function click(n) {
   if (!started.value || realBoardCon[n] != '') {
      return
   }

   userTurn(n)
   if (started.value && playWithBool.value) {
      botTurn()
   }
}

/**
 * For starting the game when `Mulai` button got clicked.
 */
function startTheGame() {
   realTurnBool = true
   started.value = true
   for (let n = 0; n < 9; n++) {
      realBoardCon[n] = ''
   }
   if (playWithBool.value && !playAsBool.value) {
      botTurn()
   }
}

// =============================================================================

function getOptionsClasses(status) {
   return ['transition-all flex flex-wrap justify-center', { 'opacity-45': status }]
}

const $startButton = computed(() => [
   ...getOptionsClasses(started.value),
   {
      'cursor-not-allowed': started.value,
      'cursor-pointer hover:scale-105': !started.value,
   },
])
</script>

<template>
   <div class="h-full flex flex-col justify-center items-center gap-4 p-4">
      <ol
         class="w-62 max-w-full aspect-square mx-auto grid grid-cols-3 grid-rows-3 transition-all -mt-6 mb-6"
      >
         <li
            v-for="n in 9"
            :key="n"
            @click="click(n - 1)"
            class="border-3 border-zinc-700 grid place-items-center select-none box-border"
            :class="{
               'border-t-0': n < 4,
               'border-b-0': n > 6,
               'border-l-0': n % 3 == 1,
               'border-r-0': n % 3 == 0,
            }"
         >
            <Icon :icon="getIcon(n - 1)" class="text-white text-7xl"></Icon>
         </li>
      </ol>
      <SwitchButton
         :class="getOptionsClasses(started)"
         @toggle="playWithBool = !playWithBool"
         :status="playWithBool"
         :disabled="started"
      >
         Pilih lawan
         <template #true>Bot</template>
         <template #false>Teman</template>
      </SwitchButton>
      <SwitchButton
         :class="getOptionsClasses(started || !playWithBool)"
         @toggle="playAsBool = !playAsBool"
         :status="playAsBool"
         :disabled="started || !playWithBool"
         :slot-width="10"
      >
         Bermain sebagai
         <template #true>X</template>
         <template #false>O</template>
      </SwitchButton>
      <button
         class="text-lg font-semibold bg-teal-700 mt-6 px-10 py-1 rounded-full select-none"
         :class="$startButton"
         @click="startTheGame"
      >
         Mulai!
      </button>
   </div>
</template>
