import { DISPLAY_WIDTH } from "./constants.js"
import { v4 as uuidv4 } from "uuid"

class Star {
  constructor() {
    this.star_width = Math.floor(Math.random() * (4 - 1)) + 1
    this.star_height = this.star_width

    this.star_id = "star" + uuidv4().replace(/-/g, "")

    this.starElement = document.createElement("div")
    this.starElement.style.position = "absolute"
    this.starElement.style.width = this.star_width + "px"
    this.starElement.style.height = this.star_height + "px"
    this.starElement.style.backgroundColor = "white"
    this.starElement.classList.add(this.star_id)

    this.x = Math.floor(Math.random() * (DISPLAY_WIDTH - 0)) + 0
    this.y = 0
    this.vel_x = 0
    this.vel_y = Math.floor(Math.random() * (15 - 5)) + 5

    document.body.appendChild(this.starElement)
  }

  update() {
    this.x += this.vel_x
    this.y += this.vel_y
  }

  draw() {
    this.starElement.style.left = this.x + "px"
    this.starElement.style.top = this.y + "px"
  }
}

export default Star
