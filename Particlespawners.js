import { DISPLAY_HEIGHT } from './constants.js'
import Particle from './Particle.js'

class Paritclespawners {
    constructor() {
        this.particle_group = []
    }

    update() {
        this.particle_group = this.particle_group.filter((particle) => {
            const existingParticle = document.body.querySelector(
                `.${CSS.escape(particle.particle_id)}`
            )
            if(existingParticle) {
                return true
            }
        })
        
        this.particle_group.forEach(particle => {
            particle.update()
        })

        this.particle_group = this.particle_group.filter((particle) => {
            const existingParticle = document.body.querySelector(
                `.${CSS.escape(particle.particle_id)}`
            )
            if(existingParticle) {
                return true
            }
        })

        this.particle_group.forEach(particle => {
            particle.draw()
        })
    }

    spawn_particles(pos) {
        const random_number = Math.floor(Math.random() * (20 - 3)) + 3
        for (let i = 0; i < random_number; i++) {
            const new_particle = new Particle()
            new_particle.x = pos[0]
            new_particle.y = pos[1]
            this.particle_group.push(new_particle)
        }
    }

    draw() {

    }
}

export default Paritclespawners