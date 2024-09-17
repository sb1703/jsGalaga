import { DISPLAY_HEIGHT } from "./constants"
import HealthBar from "./health_bar"
import Lives from "./lives"
import Score from "./score"

class HUD {
  constructor(hp, num_lives) {
    const hudImage = new Image()
    hudImage.src = "hud.png"

    hudImage.onload = () => {
      this.hudElement = document.createElement("img")
      this.hudElement.src = hudImage.src
      this.hudElement.style.position = "absolute"
      this.hudElement.width = hudImage.naturalWidth * 1.06
      this.hudElement.height = hudImage.naturalHeight

      this.x = 0
      this.y = DISPLAY_HEIGHT - this.hudElement.height

      this.hudElement.style.left = this.x + "px"
      this.hudElement.style.top = this.y + "px"

      this.hudElement.classList.add("hud")
      document.body.appendChild(this.hudElement)
    }

    this.vel_x = 0
    this.vel_y = 0

    // healthbar
    this.healthbar = new HealthBar(hp)

    // score
    this.score = new Score()

    // lives
    this.lives = new Lives(num_lives)
  }

  update() {
    // healthbar
    this.healthbar.update()
    // lives
    this.lives.update()
    // score
    this.score.update()
    this.x += this.vel_x
    this.y += this.vel_y
  }

  draw() {
    
  }
}

export default HUD