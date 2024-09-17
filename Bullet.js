import { v4 as uuidv4 } from "uuid"

class Bullet {
  constructor(x, y) {
    this.bullet_width = 3
    this.bullet_height = 16

    this.bullet_id = "bullet" + uuidv4().replace(/-/g, "")

    this.bulletElement = document.createElement("div")
    this.bulletElement.style.position = "absolute"
    this.bulletElement.style.width = this.bullet_width + "px"
    this.bulletElement.style.height = this.bullet_height + "px"
    this.bulletElement.style.backgroundColor = "white"
    this.x = x
    this.y = y
    this.bulletElement.style.left = this.x + "px"
    this.bulletElement.style.top = this.y + "px"
    this.bulletElement.classList.add(this.bullet_id)

    this.vel_x = 0
    this.vel_y = 0
    this.speed = 20

    document.body.appendChild(this.bulletElement)
  }

  update() {
      this.x += this.vel_x
      this.y += this.vel_y
  }

  draw() {
      this.bulletElement.style.left = this.x + "px"
      this.bulletElement.style.top = this.y + "px"
  }
}

export default Bullet