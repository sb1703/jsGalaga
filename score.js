import { DISPLAY_HEIGHT, DISPLAY_WIDTH } from "./constants"

class Score {
    constructor() {
        this.value = 0
        this.font_size = 20
        
        this.scoreElement = document.createElement("div")
        this.scoreElement.style.position = "absolute"
        this.scoreElement.innerText = "Score: " + this.value
        this.scoreElement.style.color = "white"
        this.scoreElement.style.zIndex = 1
        this.scoreElement.classList.add("score")

        this.x_pad = 20
        this.y_pad = 17

        this.x = DISPLAY_WIDTH - 100
        this.y = DISPLAY_HEIGHT - 30

        this.scoreElement.style.left = this.x + "px"
        this.scoreElement.style.top = this.y + "px"

        document.body.appendChild(this.scoreElement)
    }

    update() {

    }

    update_score(value) {
        this.value += value
        this.scoreElement.innerText = "Score: " + this.value
    }
}

export default Score