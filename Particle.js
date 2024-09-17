import { DISPLAY_WIDTH, DISPLAY_HEIGHT } from "./constants"
import { v4 as uuidv4 } from "uuid"

class Particle {
  constructor() {
    this.particle_width = Math.floor(Math.random() * (6 - 1)) + 1
    this.particle_height = this.particle_width

    this.particle_id = "particle" + uuidv4().replace(/-/g, "")

    this.particleElement = document.createElement("div")
    this.particleElement.style.position = "absolute"
    this.particleElement.style.width = this.particle_width + "px"
    this.particleElement.style.height = this.particle_height + "px"
    this.particleElement.style.backgroundColor = "white"
    this.particleElement.classList.add(this.particle_id)

    this.vel_x = Math.floor(Math.random() * (16 - -16)) + -16
    this.vel_y = Math.floor(Math.random() * (16 - -16)) + -16

    this.kill_timer = 45

    document.body.appendChild(this.particleElement)
  }

  update() {
    this.x += this.vel_x
    this.y += this.vel_y

    if (
      this.x < 0 ||
      this.x > DISPLAY_WIDTH ||
      this.y < 0 ||
      this.y > DISPLAY_HEIGHT
    ) {
      this.kill_timer = 0
    }

    this.kill_timer--
    if (this.kill_timer <= 0) {
      const existingParticle = document.body.querySelector(
        `.${CSS.escape(this.particle_id)}`
      )
      if (existingParticle) {
        existingParticle.remove()
      }
    }
  }

  draw() {
    this.particleElement.style.left = this.x + "px"
    this.particleElement.style.top = this.y + "px"
  }
}

export default Particle
