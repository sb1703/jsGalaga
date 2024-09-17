import handle_events from "./event_handler.js"
import Ship from "./Ship.js"
import Bg from "./Bg.js"
import Enemyspawners from "./Enemyspawners.js"
import Paritclespawners from "./Particlespawners.js"
import Alert_Box from "./alert_box.js"

let lastFrameTime = 0
const fps = 60
const frameDuration = 1000 / fps

const bg = new Bg()
const player = new Ship()
const enemy_spawner = new Enemyspawners()
const particle_spawner = new Paritclespawners()
let alert_box = undefined

const theme = new Audio("Theme.ogg")
theme.loop = true
theme.play()

function gameLoop(timestamp) {
  const timeSinceLastFrame = timestamp - lastFrameTime

  if (timeSinceLastFrame >= frameDuration) {
    // Update the last frame time to the current timestamp
    lastFrameTime = timestamp

    // handle events
    handle_events(player)

    // update
    bg.update()
    player.update()
    enemy_spawner.update()
    particle_spawner.update()

    // check collisions
    for (let i = 0; i < player.bullet_group.length; i++) {
      let bullet = player.bullet_group[i]

      for (let j = 0; j < enemy_spawner.enemy_group.length; j++) {
        let enemy = enemy_spawner.enemy_group[j]

        const bulletRect = bullet.bulletElement.getBoundingClientRect()
        if(enemy.enemyElement) {
          const enemyRect = enemy.enemyElement.getBoundingClientRect()

          if (
            bulletRect.left < enemyRect.right &&
            bulletRect.right > enemyRect.left &&
            bulletRect.top < enemyRect.bottom &&
            bulletRect.bottom > enemyRect.top &&
            !enemy.is_invincible
          ) {
            enemy.get_hit()
            // hud update
            player.hud.score.update_score(enemy.score_value)
            particle_spawner.spawn_particles([bullet.x, bullet.y])
            const existingBullet = document.body.querySelector(
              `.${CSS.escape(bullet.bullet_id)}`
            )
            if (existingBullet) {
              existingBullet.remove()
            }
            break
          }
        }

      }
    }

    // check collisions
    for (let j = 0; j < enemy_spawner.enemy_group.length; j++) {
      let enemy = enemy_spawner.enemy_group[j]

      const playerRect = player.shipElement.getBoundingClientRect()
      if(enemy.enemyElement) {
        const enemyRect = enemy.enemyElement.getBoundingClientRect()
        
        if (
          playerRect.left < enemyRect.right &&
          playerRect.right > enemyRect.left &&
          playerRect.top < enemyRect.bottom &&
          playerRect.bottom > enemyRect.top &&
          !enemy.is_invincible &&
          !player.is_invincible
        ) {
          player.get_hit()
          enemy.hp = 0
          enemy.get_hit()
          break
        }
      }

    }

    // check for game over
    if(!player.is_alive) {
      enemy_spawner.stop = true
      enemy_spawner.clear_enemies()
      if(!alert_box) {
        alert_box = new Alert_Box("Game Over")
      }
    }

    // render
    bg.draw()
    player.draw()
    enemy_spawner.draw()
    particle_spawner.draw()
  }

  // Request the next frame
  requestAnimationFrame(gameLoop)
}

// Start the game loop
requestAnimationFrame(gameLoop)
