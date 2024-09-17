import { DISPLAY_HEIGHT, DISPLAY_WIDTH } from "./constants"

class Alert_Box {
    constructor(message) {
        this.alertElement = document.createElement("div")
        this.alertElement.style.position = "absolute"
        this.alertElement.style.color = "red"
        this.alertElement.style.zIndex = 1
        this.alertElement.classList.add("alert")
        this.alertElement.style.fontSize = "50px"
        this.x = DISPLAY_WIDTH/4 - 40
        this.y = DISPLAY_HEIGHT/2 - 25
        this.alertElement.style.left = this.x + "px"
        this.alertElement.style.top = this.y + "px"
        this.alertElement.innerText = message

        document.body.appendChild(this.alertElement)

        this.vel_x = 0
        this.vel_y = 0
    }

    update() {
        this.x += this.vel_x
        this.y += this.vel_y
    }
}

export default Alert_Box