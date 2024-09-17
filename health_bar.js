import { DISPLAY_HEIGHT } from "./constants"

class HealthBar {
  constructor(hp) {
    this.max_hp = hp
    this.hp = this.max_hp

    const originalImage = new Image()
    originalImage.src = "health_bar.png"

    this.max_width = originalImage.naturalWidth / 5

    originalImage.onload = () => {
      this.healthBarElement = document.createElement("img")
      this.healthBarElement.src = originalImage.src
      this.healthBarElement.style.position = "absolute"
      this.healthBarElement.width = originalImage.naturalWidth / 5
      this.healthBarElement.height = originalImage.naturalHeight / 5
      this.healthBarElement.style.transformOrigin = "left";

      this.x = 10
      this.y = DISPLAY_HEIGHT - this.healthBarElement.height - 25

      this.healthBarElement.style.left = this.x + "px"
      this.healthBarElement.style.top = this.y + "px"

      this.healthBarElement.classList.add("healthbar")
      document.body.appendChild(this.healthBarElement)
    }

    this.vel_x = 0
    this.vel_y = 0
  }

  update() {
    this.x += this.vel_x
    this.y += this.vel_y
  }

  decrease_hp_value() {
    this.hp--
    this.healthBarElement.style.transform = `scaleX(${this.hp / this.max_hp})`
  }

  reset_health_to_max() {
    this.hp = this.max_hp
    this.healthBarElement.style.transform = `scaleX(1)`
  }
}

export default HealthBar
