import { DISPLAY_HEIGHT } from "./constants"
import Enemy from "./Enemy"

class Enemyspawners {
  constructor() {
    this.enemy_group = []
    this.spawn_timer = Math.floor(Math.random() * (60 - 40)) + 40
    this.stop = false
  }

  update() {
    if (!this.stop) {
      this.enemy_group.forEach((enemy) => {
        enemy.update()
      })

      this.enemy_group = this.enemy_group.filter((enemy) => {
        if (enemy.y <= DISPLAY_HEIGHT) {
          return true
        } else {
          const existingEnemy = document.body.querySelector(
            `.${CSS.escape(enemy.enemy_id)}`
          )
          console.log(enemy.enemy_id, existingEnemy, enemy.enemyElement)
          if (existingEnemy) {
            existingEnemy.remove()
          } else {
            return true
          }
          return false
        }
      })

      if (this.spawn_timer == 0) {
        const new_enemy = new Enemy()
        this.enemy_group.push(new_enemy)
        this.spawn_timer = Math.floor(Math.random() * (60 - 40)) + 40
      }

      this.enemy_group.forEach((enemy) => {
        enemy.draw()
      })

      this.spawn_timer--
    } else {
      this.clear_enemies()
    }
  }

  clear_enemies() {
    this.enemy_group.forEach((enemy) => {
      const existingEnemy = document.body.querySelector(
        `.${CSS.escape(enemy.enemy_id)}`
      )
      if (existingEnemy) {
        existingEnemy.remove()
      }
    })
    this.enemy_group = []
  }

  draw() {}
}

export default Enemyspawners
