import { DISPLAY_WIDTH, DISPLAY_HEIGHT } from "./constants.js"
import Bullet from "./Bullet.js"
import HUD from "./hud.js"

class Ship {
  constructor() {
    this.shipElement = document.createElement("img")
    this.shipElement.src = "ship.png"
    this.shipElement.style.position = "absolute"
    this.shipElement.classList.add("ship")

    this.x = DISPLAY_WIDTH / 2 - 40

    this.shipElement.onload = () => {
      this.shipElement.width = this.shipElement.naturalWidth * 0.125
      this.shipElement.height = this.shipElement.naturalHeight * 0.125

      this.y = DISPLAY_HEIGHT - this.shipElement.height * 1.5
    }

    this.max_hp = 3
    this.hp = this.max_hp
    this.lives = 3
    this.is_alive = true

    this.hud = new HUD(this.hp, this.lives)

    this.is_invincible = false
    this.max_invincible_timer = 60
    this.invincible_timer = this.max_invincible_timer

    this.vel_x = 0
    this.vel_y = 0
    this.speed = 5

    this.bullet_group = []

    document.body.appendChild(this.shipElement)
  }

  update() {
    this.bullet_group.forEach((bullet) => {
      bullet.update()
    })

    this.hud.update()

    this.bullet_group = this.bullet_group.filter((bullet) => {
      if (bullet.y >= 0) {
        return true
      } else {
        const existingBullet = document.body.querySelector(
          `.${CSS.escape(bullet.bullet_id)}`
        )
        if (existingBullet) {
          existingBullet.remove()
        }
        return false
      }
    })

    this.bullet_group.forEach((bullet) => {
      bullet.draw()
    })

    if (this.x > DISPLAY_WIDTH - this.shipElement.width + 20) {
      this.x = DISPLAY_WIDTH - this.shipElement.width + 20
    }

    if (this.x < -20) {
      this.x = -20
    }

    this.x += this.vel_x
    this.y += this.vel_y

    if (this.invincible_timer > 0) {
      this.invincible_timer--
    } else {
      this.is_invincible = false
    }
  }

  shoot() {
    if (this.is_alive) {
      const snd_shoot = new Audio("Shoot1.ogg")
      snd_shoot.volume = 0.1
      snd_shoot.play()
      const new_bullet = new Bullet(this.x + 32, this.y)
      new_bullet.vel_y = -new_bullet.speed
      this.bullet_group.push(new_bullet)
    }
  }

  get_hit() {
    if (this.is_alive) {
      this.hp--
      this.hud.healthbar.decrease_hp_value()
      if (this.hp <= 0) {
        this.hp = 0
        this.death()
      }
    }
  }

  death() {
    this.lives--
    if (this.lives <= 0) {
      this.lives = 0
      this.is_alive = false
      const existingShip = document.body.querySelector(`.ship`)
      if (existingShip) {
        existingShip.remove()
      }
    }
    this.hp = this.max_hp
    this.hud.healthbar.reset_health_to_max()
    this.hud.lives.decrement_life()
    this.x = DISPLAY_WIDTH / 2 - 40
    this.is_invincible = true
    this.invincible_timer = this.max_invincible_timer
  }

  draw() {
    this.shipElement.style.left = this.x + "px"
    this.shipElement.style.top = this.y + "px"
  }
}

export default Ship
