let canShoot = true
let shootCooldown = 100

const handle_events = (actor) => {
  document.addEventListener("keydown", (e) => {
    if (e.key === "a") {
      actor.vel_x = -actor.speed
    } else if (e.key === "d") {
      actor.vel_x = actor.speed
    } else if (e.key === " " && canShoot) {
      actor.shoot()
      canShoot = false
      setTimeout(() => {
        canShoot = true
      }, shootCooldown)
    }
  })

  document.addEventListener("keyup", (e) => {
    if (e.key === "a" || e.key === "d") {
      actor.vel_x = 0
    }
  })
}

export default handle_events
