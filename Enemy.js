import { DISPLAY_WIDTH } from "./constants";
import { v4 as uuidv4 } from "uuid";

class Enemy {
  constructor() {
    this.enemyElement = null;
    this.anim_explosion = [
      "frame1.png",
      "frame2.png",
      "frame3.png",
      "frame4.png",
      "frame5.png",
      "frame6.png",
    ].map((src) => {
      const img = new Image();
      img.src = src;
      return img;
    });

    this.anim_index = 0;
    this.frame_length_max = 8;
    this.frame_length = this.frame_length_max;
    this.is_destroyed = false;
    this.is_invincible = false;

    this.enemy_id = "enemy" + uuidv4().replace(/-/g, "");

    this.x = 0;
    this.y = 0;
    this.vel_x = 0;
    this.speed = Math.floor(Math.random() * (8 - 3)) + 3;
    this.vel_y = this.speed;

    this.hp = 3;
    this.score_value = 5;

    this.initializeEnemy();
  }

  initializeEnemy() {
    const enemyImage = new Image();
    enemyImage.src = "enemy.png";

    enemyImage.onload = () => {
      this.enemyElement = document.createElement("img");
      this.enemyElement.src = enemyImage.src;
      this.enemyElement.style.position = "absolute";
      this.enemyElement.width = enemyImage.naturalWidth * 0.05;
      this.enemyElement.height = enemyImage.naturalHeight * 0.05;

      this.x = Math.floor(
        Math.random() * (DISPLAY_WIDTH - this.enemyElement.width)
      );
      this.y = -this.enemyElement.height;

      this.enemyElement.style.left = this.x + "px";
      this.enemyElement.style.top = this.y + "px";

      this.enemyElement.classList.add(this.enemy_id);
      document.body.appendChild(this.enemyElement);
    };
  }

  update() {
    if (this.enemyElement) {
      this.x += this.vel_x;
      this.y += this.vel_y;

      if (this.is_destroyed) {
        const max_index = this.anim_explosion.length - 1;
        if (this.frame_length == 0) {
          this.anim_index++;
          if (this.anim_index > max_index) {
            this.removeFromDOM();
          } else {
            this.updateExplosionAnimation();
          }
        } else {
          this.frame_length--;
        }
      }
    }
  }

  updateExplosionAnimation() {
    const currentFrame = this.anim_explosion[this.anim_index];
    if (currentFrame.complete) {
      this.enemyElement.src = currentFrame.src;
      this.enemyElement.width = currentFrame.naturalWidth * 2;
      this.enemyElement.height = currentFrame.naturalHeight * 2;
      this.frame_length = this.frame_length_max;
    }
  }

  get_hit() {
    if (!this.is_invincible) {
      const snd_shoot = new Audio("Hit.ogg");
      snd_shoot.play();
      this.hp--;
      if (this.hp <= 0) {
        this.is_destroyed = true;
        this.is_invincible = true;
        this.vel_x = 0;
        this.vel_y = 0;
        this.x -= 20;
        this.y -= 20;
        this.updateExplosionAnimation();
      }
    }
  }

  draw() {
    if (this.enemyElement) {
      this.enemyElement.style.left = this.x + "px";
      this.enemyElement.style.top = this.y + "px";
    }
  }

  removeFromDOM() {
    if (this.enemyElement && this.enemyElement.parentNode) {
      this.enemyElement.parentNode.removeChild(this.enemyElement);
    }
    this.enemyElement = null;
  }
}

export default Enemy;