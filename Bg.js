import { DISPLAY_SIZE, DISPLAY_HEIGHT } from "./constants.js"
import Star from "./Star.js"

class Bg {
  constructor() {
    this.time = Math.floor(Math.random() * (7 - 1)) + 1
    this.group_star = []
  }

  update() {
    this.group_star.forEach((star) => {
      star.update()
    })

    this.group_star = this.group_star.filter(
      (star) => {
        if(star.y <= DISPLAY_HEIGHT) {
            return true
        } else {
            const existingStar = document.body.querySelector(
              `.${CSS.escape(star.star_id)}`
            )
            if (existingStar) {
              existingStar.remove()
            }
            return false
        }
      }
    )

    if (this.time == 0) {
      const new_star = new Star()
      this.group_star.push(new_star)
      this.time = Math.floor(Math.random() * (7 - 1)) + 1
    }

    this.group_star.forEach((star) => {
      star.draw()
    })

    this.time--
  }

  draw() {
    
  }
}

export default Bg
