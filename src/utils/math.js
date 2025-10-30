/**
 * Get random number from `min` to `max` with `max` being included.
 *
 * @param {number} min
 * @param {number} max
 */
function random(min, max) {
   return min + Math.floor(Math.random() * (max - min))
}

export { random }
