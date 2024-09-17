import { DISPLAY_HEIGHT } from "./constants"

class Lives {
    constructor(num_lives) {
        this.num_lives = num_lives
        this.width = 80
        this.height = 40

        this.livesElement = document.createElement("div")
        this.livesElement.style.position = "absolute"
        this.livesElement.style.width = this.width + "px"
        this.livesElement.style.height = this.height + "px"
        // this.livesElement.style.backgroundColor = "black"
        this.livesElement.style.color = "white"
        this.livesElement.style.zIndex = 1
        this.livesElement.classList.add("lives")

        this.shipImage = new Image()
        this.shipImage.src = "ship.png"

        this.shipImage.onload = () => {
            this.shipImage.width = this.shipImage.naturalWidth * 0.05
            this.shipImage.height = this.shipImage.naturalHeight * 0.05
            this.livesElement.appendChild(this.shipImage)

            this.font_size = 20
            this.fontElement = document.createElement("div")
            this.fontElement.style.fontSize = this.font_size + "px"
            this.fontElement.style.color = "white"
            this.fontElement.innerHTML = "x" + this.num_lives
            this.livesElement.appendChild(this.fontElement)
        }
        
        this.x = 200
        this.y = DISPLAY_HEIGHT-40

        this.livesElement.style.left = this.x + "px"
        this.livesElement.style.top = this.y + "px"

        document.body.appendChild(this.livesElement)
        
        this.vel_x = 0
        this.vel_y = 0
    }

    update() {

    }

    decrement_life() {
        this.num_lives--
        if(this.num_lives < 0) {
            this.num_lives = 0
        } else {
            this.fontElement.innerHTML = "x" + this.num_lives
        }
    }
}

export default Lives