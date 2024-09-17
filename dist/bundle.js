/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./Bg.js":
/*!***************!*\
  !*** ./Bg.js ***!
  \***************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _constants_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants.js */ \"./constants.js\");\n/* harmony import */ var _Star_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Star.js */ \"./Star.js\");\n\n\n\nclass Bg {\n  constructor() {\n    this.time = Math.floor(Math.random() * (7 - 1)) + 1\n    this.group_star = []\n  }\n\n  update() {\n    this.group_star.forEach((star) => {\n      star.update()\n    })\n\n    this.group_star = this.group_star.filter(\n      (star) => {\n        if(star.y <= _constants_js__WEBPACK_IMPORTED_MODULE_0__.DISPLAY_HEIGHT) {\n            return true\n        } else {\n            const existingStar = document.body.querySelector(\n              `.${CSS.escape(star.star_id)}`\n            )\n            if (existingStar) {\n              existingStar.remove()\n            }\n            return false\n        }\n      }\n    )\n\n    if (this.time == 0) {\n      const new_star = new _Star_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"]()\n      this.group_star.push(new_star)\n      this.time = Math.floor(Math.random() * (7 - 1)) + 1\n    }\n\n    this.group_star.forEach((star) => {\n      star.draw()\n    })\n\n    this.time--\n  }\n\n  draw() {\n    \n  }\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Bg);\n\n\n//# sourceURL=webpack://galaga/./Bg.js?");

/***/ }),

/***/ "./Bullet.js":
/*!*******************!*\
  !*** ./Bullet.js ***!
  \*******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! uuid */ \"./node_modules/uuid/dist/esm-browser/v4.js\");\n\n\nclass Bullet {\n  constructor(x, y) {\n    this.bullet_width = 3\n    this.bullet_height = 16\n\n    this.bullet_id = \"bullet\" + (0,uuid__WEBPACK_IMPORTED_MODULE_0__[\"default\"])().replace(/-/g, \"\")\n\n    this.bulletElement = document.createElement(\"div\")\n    this.bulletElement.style.position = \"absolute\"\n    this.bulletElement.style.width = this.bullet_width + \"px\"\n    this.bulletElement.style.height = this.bullet_height + \"px\"\n    this.bulletElement.style.backgroundColor = \"white\"\n    this.x = x\n    this.y = y\n    this.bulletElement.style.left = this.x + \"px\"\n    this.bulletElement.style.top = this.y + \"px\"\n    this.bulletElement.classList.add(this.bullet_id)\n\n    this.vel_x = 0\n    this.vel_y = 0\n    this.speed = 20\n\n    document.body.appendChild(this.bulletElement)\n  }\n\n  update() {\n      this.x += this.vel_x\n      this.y += this.vel_y\n  }\n\n  draw() {\n      this.bulletElement.style.left = this.x + \"px\"\n      this.bulletElement.style.top = this.y + \"px\"\n  }\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Bullet);\n\n//# sourceURL=webpack://galaga/./Bullet.js?");

/***/ }),

/***/ "./Enemy.js":
/*!******************!*\
  !*** ./Enemy.js ***!
  \******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants */ \"./constants.js\");\n/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! uuid */ \"./node_modules/uuid/dist/esm-browser/v4.js\");\n\n\n\nclass Enemy {\n  constructor() {\n    this.enemyElement = null;\n    this.anim_explosion = [\n      \"frame1.png\",\n      \"frame2.png\",\n      \"frame3.png\",\n      \"frame4.png\",\n      \"frame5.png\",\n      \"frame6.png\",\n    ].map((src) => {\n      const img = new Image();\n      img.src = src;\n      return img;\n    });\n\n    this.anim_index = 0;\n    this.frame_length_max = 8;\n    this.frame_length = this.frame_length_max;\n    this.is_destroyed = false;\n    this.is_invincible = false;\n\n    this.enemy_id = \"enemy\" + (0,uuid__WEBPACK_IMPORTED_MODULE_1__[\"default\"])().replace(/-/g, \"\");\n\n    this.x = 0;\n    this.y = 0;\n    this.vel_x = 0;\n    this.speed = Math.floor(Math.random() * (8 - 3)) + 3;\n    this.vel_y = this.speed;\n\n    this.hp = 3;\n    this.score_value = 5;\n\n    this.initializeEnemy();\n  }\n\n  initializeEnemy() {\n    const enemyImage = new Image();\n    enemyImage.src = \"enemy.png\";\n\n    enemyImage.onload = () => {\n      this.enemyElement = document.createElement(\"img\");\n      this.enemyElement.src = enemyImage.src;\n      this.enemyElement.style.position = \"absolute\";\n      this.enemyElement.width = enemyImage.naturalWidth * 0.05;\n      this.enemyElement.height = enemyImage.naturalHeight * 0.05;\n\n      this.x = Math.floor(\n        Math.random() * (_constants__WEBPACK_IMPORTED_MODULE_0__.DISPLAY_WIDTH - this.enemyElement.width)\n      );\n      this.y = -this.enemyElement.height;\n\n      this.enemyElement.style.left = this.x + \"px\";\n      this.enemyElement.style.top = this.y + \"px\";\n\n      this.enemyElement.classList.add(this.enemy_id);\n      document.body.appendChild(this.enemyElement);\n    };\n  }\n\n  update() {\n    if (this.enemyElement) {\n      this.x += this.vel_x;\n      this.y += this.vel_y;\n\n      if (this.is_destroyed) {\n        const max_index = this.anim_explosion.length - 1;\n        if (this.frame_length == 0) {\n          this.anim_index++;\n          if (this.anim_index > max_index) {\n            this.removeFromDOM();\n          } else {\n            this.updateExplosionAnimation();\n          }\n        } else {\n          this.frame_length--;\n        }\n      }\n    }\n  }\n\n  updateExplosionAnimation() {\n    const currentFrame = this.anim_explosion[this.anim_index];\n    if (currentFrame.complete) {\n      this.enemyElement.src = currentFrame.src;\n      this.enemyElement.width = currentFrame.naturalWidth * 2;\n      this.enemyElement.height = currentFrame.naturalHeight * 2;\n      this.frame_length = this.frame_length_max;\n    }\n  }\n\n  get_hit() {\n    if (!this.is_invincible) {\n      const snd_shoot = new Audio(\"Hit.ogg\");\n      snd_shoot.play();\n      this.hp--;\n      if (this.hp <= 0) {\n        this.is_destroyed = true;\n        this.is_invincible = true;\n        this.vel_x = 0;\n        this.vel_y = 0;\n        this.x -= 20;\n        this.y -= 20;\n        this.updateExplosionAnimation();\n      }\n    }\n  }\n\n  draw() {\n    if (this.enemyElement) {\n      this.enemyElement.style.left = this.x + \"px\";\n      this.enemyElement.style.top = this.y + \"px\";\n    }\n  }\n\n  removeFromDOM() {\n    if (this.enemyElement && this.enemyElement.parentNode) {\n      this.enemyElement.parentNode.removeChild(this.enemyElement);\n    }\n    this.enemyElement = null;\n  }\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Enemy);\n\n//# sourceURL=webpack://galaga/./Enemy.js?");

/***/ }),

/***/ "./Enemyspawners.js":
/*!**************************!*\
  !*** ./Enemyspawners.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants */ \"./constants.js\");\n/* harmony import */ var _Enemy__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Enemy */ \"./Enemy.js\");\n\n\n\nclass Enemyspawners {\n  constructor() {\n    this.enemy_group = []\n    this.spawn_timer = Math.floor(Math.random() * (60 - 40)) + 40\n    this.stop = false\n  }\n\n  update() {\n    if (!this.stop) {\n      this.enemy_group.forEach((enemy) => {\n        enemy.update()\n      })\n\n      this.enemy_group = this.enemy_group.filter((enemy) => {\n        if (enemy.y <= _constants__WEBPACK_IMPORTED_MODULE_0__.DISPLAY_HEIGHT) {\n          return true\n        } else {\n          const existingEnemy = document.body.querySelector(\n            `.${CSS.escape(enemy.enemy_id)}`\n          )\n          console.log(enemy.enemy_id, existingEnemy, enemy.enemyElement)\n          if (existingEnemy) {\n            existingEnemy.remove()\n          } else {\n            return true\n          }\n          return false\n        }\n      })\n\n      if (this.spawn_timer == 0) {\n        const new_enemy = new _Enemy__WEBPACK_IMPORTED_MODULE_1__[\"default\"]()\n        this.enemy_group.push(new_enemy)\n        this.spawn_timer = Math.floor(Math.random() * (60 - 40)) + 40\n      }\n\n      this.enemy_group.forEach((enemy) => {\n        enemy.draw()\n      })\n\n      this.spawn_timer--\n    } else {\n      this.clear_enemies()\n    }\n  }\n\n  clear_enemies() {\n    this.enemy_group.forEach((enemy) => {\n      const existingEnemy = document.body.querySelector(\n        `.${CSS.escape(enemy.enemy_id)}`\n      )\n      if (existingEnemy) {\n        existingEnemy.remove()\n      }\n    })\n    this.enemy_group = []\n  }\n\n  draw() {}\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Enemyspawners);\n\n\n//# sourceURL=webpack://galaga/./Enemyspawners.js?");

/***/ }),

/***/ "./Galaga.js":
/*!*******************!*\
  !*** ./Galaga.js ***!
  \*******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _event_handler_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./event_handler.js */ \"./event_handler.js\");\n/* harmony import */ var _Ship_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Ship.js */ \"./Ship.js\");\n/* harmony import */ var _Bg_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Bg.js */ \"./Bg.js\");\n/* harmony import */ var _Enemyspawners_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Enemyspawners.js */ \"./Enemyspawners.js\");\n/* harmony import */ var _Particlespawners_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Particlespawners.js */ \"./Particlespawners.js\");\n/* harmony import */ var _alert_box_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./alert_box.js */ \"./alert_box.js\");\n\n\n\n\n\n\n\nlet lastFrameTime = 0\nconst fps = 60\nconst frameDuration = 1000 / fps\n\nconst bg = new _Bg_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"]()\nconst player = new _Ship_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"]()\nconst enemy_spawner = new _Enemyspawners_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"]()\nconst particle_spawner = new _Particlespawners_js__WEBPACK_IMPORTED_MODULE_4__[\"default\"]()\nlet alert_box = undefined\n\nconst theme = new Audio(\"Theme.ogg\")\ntheme.loop = true\ntheme.play()\n\nfunction gameLoop(timestamp) {\n  const timeSinceLastFrame = timestamp - lastFrameTime\n\n  if (timeSinceLastFrame >= frameDuration) {\n    // Update the last frame time to the current timestamp\n    lastFrameTime = timestamp\n\n    // handle events\n    ;(0,_event_handler_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(player)\n\n    // update\n    bg.update()\n    player.update()\n    enemy_spawner.update()\n    particle_spawner.update()\n\n    // check collisions\n    for (let i = 0; i < player.bullet_group.length; i++) {\n      let bullet = player.bullet_group[i]\n\n      for (let j = 0; j < enemy_spawner.enemy_group.length; j++) {\n        let enemy = enemy_spawner.enemy_group[j]\n\n        const bulletRect = bullet.bulletElement.getBoundingClientRect()\n        if(enemy.enemyElement) {\n          const enemyRect = enemy.enemyElement.getBoundingClientRect()\n\n          if (\n            bulletRect.left < enemyRect.right &&\n            bulletRect.right > enemyRect.left &&\n            bulletRect.top < enemyRect.bottom &&\n            bulletRect.bottom > enemyRect.top &&\n            !enemy.is_invincible\n          ) {\n            enemy.get_hit()\n            // hud update\n            player.hud.score.update_score(enemy.score_value)\n            particle_spawner.spawn_particles([bullet.x, bullet.y])\n            const existingBullet = document.body.querySelector(\n              `.${CSS.escape(bullet.bullet_id)}`\n            )\n            if (existingBullet) {\n              existingBullet.remove()\n            }\n            break\n          }\n        }\n\n      }\n    }\n\n    // check collisions\n    for (let j = 0; j < enemy_spawner.enemy_group.length; j++) {\n      let enemy = enemy_spawner.enemy_group[j]\n\n      const playerRect = player.shipElement.getBoundingClientRect()\n      if(enemy.enemyElement) {\n        const enemyRect = enemy.enemyElement.getBoundingClientRect()\n        \n        if (\n          playerRect.left < enemyRect.right &&\n          playerRect.right > enemyRect.left &&\n          playerRect.top < enemyRect.bottom &&\n          playerRect.bottom > enemyRect.top &&\n          !enemy.is_invincible &&\n          !player.is_invincible\n        ) {\n          player.get_hit()\n          enemy.hp = 0\n          enemy.get_hit()\n          break\n        }\n      }\n\n    }\n\n    // check for game over\n    if(!player.is_alive) {\n      enemy_spawner.stop = true\n      enemy_spawner.clear_enemies()\n      if(!alert_box) {\n        alert_box = new _alert_box_js__WEBPACK_IMPORTED_MODULE_5__[\"default\"](\"Game Over\")\n      }\n    }\n\n    // render\n    bg.draw()\n    player.draw()\n    enemy_spawner.draw()\n    particle_spawner.draw()\n  }\n\n  // Request the next frame\n  requestAnimationFrame(gameLoop)\n}\n\n// Start the game loop\nrequestAnimationFrame(gameLoop)\n\n\n//# sourceURL=webpack://galaga/./Galaga.js?");

/***/ }),

/***/ "./Particle.js":
/*!*********************!*\
  !*** ./Particle.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants */ \"./constants.js\");\n/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! uuid */ \"./node_modules/uuid/dist/esm-browser/v4.js\");\n\n\n\nclass Particle {\n  constructor() {\n    this.particle_width = Math.floor(Math.random() * (6 - 1)) + 1\n    this.particle_height = this.particle_width\n\n    this.particle_id = \"particle\" + (0,uuid__WEBPACK_IMPORTED_MODULE_1__[\"default\"])().replace(/-/g, \"\")\n\n    this.particleElement = document.createElement(\"div\")\n    this.particleElement.style.position = \"absolute\"\n    this.particleElement.style.width = this.particle_width + \"px\"\n    this.particleElement.style.height = this.particle_height + \"px\"\n    this.particleElement.style.backgroundColor = \"white\"\n    this.particleElement.classList.add(this.particle_id)\n\n    this.vel_x = Math.floor(Math.random() * (16 - -16)) + -16\n    this.vel_y = Math.floor(Math.random() * (16 - -16)) + -16\n\n    this.kill_timer = 45\n\n    document.body.appendChild(this.particleElement)\n  }\n\n  update() {\n    this.x += this.vel_x\n    this.y += this.vel_y\n\n    if (\n      this.x < 0 ||\n      this.x > _constants__WEBPACK_IMPORTED_MODULE_0__.DISPLAY_WIDTH ||\n      this.y < 0 ||\n      this.y > _constants__WEBPACK_IMPORTED_MODULE_0__.DISPLAY_HEIGHT\n    ) {\n      this.kill_timer = 0\n    }\n\n    this.kill_timer--\n    if (this.kill_timer <= 0) {\n      const existingParticle = document.body.querySelector(\n        `.${CSS.escape(this.particle_id)}`\n      )\n      if (existingParticle) {\n        existingParticle.remove()\n      }\n    }\n  }\n\n  draw() {\n    this.particleElement.style.left = this.x + \"px\"\n    this.particleElement.style.top = this.y + \"px\"\n  }\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Particle);\n\n\n//# sourceURL=webpack://galaga/./Particle.js?");

/***/ }),

/***/ "./Particlespawners.js":
/*!*****************************!*\
  !*** ./Particlespawners.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _constants_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants.js */ \"./constants.js\");\n/* harmony import */ var _Particle_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Particle.js */ \"./Particle.js\");\n\n\n\nclass Paritclespawners {\n    constructor() {\n        this.particle_group = []\n    }\n\n    update() {\n        this.particle_group = this.particle_group.filter((particle) => {\n            const existingParticle = document.body.querySelector(\n                `.${CSS.escape(particle.particle_id)}`\n            )\n            if(existingParticle) {\n                return true\n            }\n        })\n        \n        this.particle_group.forEach(particle => {\n            particle.update()\n        })\n\n        this.particle_group = this.particle_group.filter((particle) => {\n            const existingParticle = document.body.querySelector(\n                `.${CSS.escape(particle.particle_id)}`\n            )\n            if(existingParticle) {\n                return true\n            }\n        })\n\n        this.particle_group.forEach(particle => {\n            particle.draw()\n        })\n    }\n\n    spawn_particles(pos) {\n        const random_number = Math.floor(Math.random() * (20 - 3)) + 3\n        for (let i = 0; i < random_number; i++) {\n            const new_particle = new _Particle_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"]()\n            new_particle.x = pos[0]\n            new_particle.y = pos[1]\n            this.particle_group.push(new_particle)\n        }\n    }\n\n    draw() {\n\n    }\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Paritclespawners);\n\n//# sourceURL=webpack://galaga/./Particlespawners.js?");

/***/ }),

/***/ "./Ship.js":
/*!*****************!*\
  !*** ./Ship.js ***!
  \*****************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _constants_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants.js */ \"./constants.js\");\n/* harmony import */ var _Bullet_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Bullet.js */ \"./Bullet.js\");\n/* harmony import */ var _hud_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./hud.js */ \"./hud.js\");\n\n\n\n\nclass Ship {\n  constructor() {\n    this.shipElement = document.createElement(\"img\")\n    this.shipElement.src = \"ship.png\"\n    this.shipElement.style.position = \"absolute\"\n    this.shipElement.classList.add(\"ship\")\n\n    this.x = _constants_js__WEBPACK_IMPORTED_MODULE_0__.DISPLAY_WIDTH / 2 - 40\n\n    this.shipElement.onload = () => {\n      this.shipElement.width = this.shipElement.naturalWidth * 0.125\n      this.shipElement.height = this.shipElement.naturalHeight * 0.125\n\n      this.y = _constants_js__WEBPACK_IMPORTED_MODULE_0__.DISPLAY_HEIGHT - this.shipElement.height * 1.5\n    }\n\n    this.max_hp = 3\n    this.hp = this.max_hp\n    this.lives = 3\n    this.is_alive = true\n\n    this.hud = new _hud_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"](this.hp, this.lives)\n\n    this.is_invincible = false\n    this.max_invincible_timer = 60\n    this.invincible_timer = this.max_invincible_timer\n\n    this.vel_x = 0\n    this.vel_y = 0\n    this.speed = 5\n\n    this.bullet_group = []\n\n    document.body.appendChild(this.shipElement)\n  }\n\n  update() {\n    this.bullet_group.forEach((bullet) => {\n      bullet.update()\n    })\n\n    this.hud.update()\n\n    this.bullet_group = this.bullet_group.filter((bullet) => {\n      if (bullet.y >= 0) {\n        return true\n      } else {\n        const existingBullet = document.body.querySelector(\n          `.${CSS.escape(bullet.bullet_id)}`\n        )\n        if (existingBullet) {\n          existingBullet.remove()\n        }\n        return false\n      }\n    })\n\n    this.bullet_group.forEach((bullet) => {\n      bullet.draw()\n    })\n\n    if (this.x > _constants_js__WEBPACK_IMPORTED_MODULE_0__.DISPLAY_WIDTH - this.shipElement.width + 20) {\n      this.x = _constants_js__WEBPACK_IMPORTED_MODULE_0__.DISPLAY_WIDTH - this.shipElement.width + 20\n    }\n\n    if (this.x < -20) {\n      this.x = -20\n    }\n\n    this.x += this.vel_x\n    this.y += this.vel_y\n\n    if (this.invincible_timer > 0) {\n      this.invincible_timer--\n    } else {\n      this.is_invincible = false\n    }\n  }\n\n  shoot() {\n    if (this.is_alive) {\n      const snd_shoot = new Audio(\"Shoot1.ogg\")\n      snd_shoot.volume = 0.1\n      snd_shoot.play()\n      const new_bullet = new _Bullet_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"](this.x + 32, this.y)\n      new_bullet.vel_y = -new_bullet.speed\n      this.bullet_group.push(new_bullet)\n    }\n  }\n\n  get_hit() {\n    if (this.is_alive) {\n      this.hp--\n      this.hud.healthbar.decrease_hp_value()\n      if (this.hp <= 0) {\n        this.hp = 0\n        this.death()\n      }\n    }\n  }\n\n  death() {\n    this.lives--\n    if (this.lives <= 0) {\n      this.lives = 0\n      this.is_alive = false\n      const existingShip = document.body.querySelector(`.ship`)\n      if (existingShip) {\n        existingShip.remove()\n      }\n    }\n    this.hp = this.max_hp\n    this.hud.healthbar.reset_health_to_max()\n    this.hud.lives.decrement_life()\n    this.x = _constants_js__WEBPACK_IMPORTED_MODULE_0__.DISPLAY_WIDTH / 2 - 40\n    this.is_invincible = true\n    this.invincible_timer = this.max_invincible_timer\n  }\n\n  draw() {\n    this.shipElement.style.left = this.x + \"px\"\n    this.shipElement.style.top = this.y + \"px\"\n  }\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Ship);\n\n\n//# sourceURL=webpack://galaga/./Ship.js?");

/***/ }),

/***/ "./Star.js":
/*!*****************!*\
  !*** ./Star.js ***!
  \*****************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _constants_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants.js */ \"./constants.js\");\n/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! uuid */ \"./node_modules/uuid/dist/esm-browser/v4.js\");\n\n\n\nclass Star {\n  constructor() {\n    this.star_width = Math.floor(Math.random() * (4 - 1)) + 1\n    this.star_height = this.star_width\n\n    this.star_id = \"star\" + (0,uuid__WEBPACK_IMPORTED_MODULE_1__[\"default\"])().replace(/-/g, \"\")\n\n    this.starElement = document.createElement(\"div\")\n    this.starElement.style.position = \"absolute\"\n    this.starElement.style.width = this.star_width + \"px\"\n    this.starElement.style.height = this.star_height + \"px\"\n    this.starElement.style.backgroundColor = \"white\"\n    this.starElement.classList.add(this.star_id)\n\n    this.x = Math.floor(Math.random() * (_constants_js__WEBPACK_IMPORTED_MODULE_0__.DISPLAY_WIDTH - 0)) + 0\n    this.y = 0\n    this.vel_x = 0\n    this.vel_y = Math.floor(Math.random() * (15 - 5)) + 5\n\n    document.body.appendChild(this.starElement)\n  }\n\n  update() {\n    this.x += this.vel_x\n    this.y += this.vel_y\n  }\n\n  draw() {\n    this.starElement.style.left = this.x + \"px\"\n    this.starElement.style.top = this.y + \"px\"\n  }\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Star);\n\n\n//# sourceURL=webpack://galaga/./Star.js?");

/***/ }),

/***/ "./alert_box.js":
/*!**********************!*\
  !*** ./alert_box.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants */ \"./constants.js\");\n\n\nclass Alert_Box {\n    constructor(message) {\n        this.alertElement = document.createElement(\"div\")\n        this.alertElement.style.position = \"absolute\"\n        this.alertElement.style.color = \"red\"\n        this.alertElement.style.zIndex = 1\n        this.alertElement.classList.add(\"alert\")\n        this.alertElement.style.fontSize = \"50px\"\n        this.x = _constants__WEBPACK_IMPORTED_MODULE_0__.DISPLAY_WIDTH/4 - 40\n        this.y = _constants__WEBPACK_IMPORTED_MODULE_0__.DISPLAY_HEIGHT/2 - 25\n        this.alertElement.style.left = this.x + \"px\"\n        this.alertElement.style.top = this.y + \"px\"\n        this.alertElement.innerText = message\n\n        document.body.appendChild(this.alertElement)\n\n        this.vel_x = 0\n        this.vel_y = 0\n    }\n\n    update() {\n        this.x += this.vel_x\n        this.y += this.vel_y\n    }\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Alert_Box);\n\n//# sourceURL=webpack://galaga/./alert_box.js?");

/***/ }),

/***/ "./constants.js":
/*!**********************!*\
  !*** ./constants.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   DISPLAY_HEIGHT: () => (/* binding */ DISPLAY_HEIGHT),\n/* harmony export */   DISPLAY_SIZE: () => (/* binding */ DISPLAY_SIZE),\n/* harmony export */   DISPLAY_WIDTH: () => (/* binding */ DISPLAY_WIDTH)\n/* harmony export */ });\n// DISPLAY INFORMATION\nconst DISPLAY_WIDTH = 400\nconst DISPLAY_HEIGHT = 600\nconst DISPLAY_SIZE=(DISPLAY_WIDTH, DISPLAY_HEIGHT)\n\n\n\n//# sourceURL=webpack://galaga/./constants.js?");

/***/ }),

/***/ "./event_handler.js":
/*!**************************!*\
  !*** ./event_handler.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nlet canShoot = true\nlet shootCooldown = 100\n\nconst handle_events = (actor) => {\n  document.addEventListener(\"keydown\", (e) => {\n    if (e.key === \"a\") {\n      actor.vel_x = -actor.speed\n    } else if (e.key === \"d\") {\n      actor.vel_x = actor.speed\n    } else if (e.key === \" \" && canShoot) {\n      actor.shoot()\n      canShoot = false\n      setTimeout(() => {\n        canShoot = true\n      }, shootCooldown)\n    }\n  })\n\n  document.addEventListener(\"keyup\", (e) => {\n    if (e.key === \"a\" || e.key === \"d\") {\n      actor.vel_x = 0\n    }\n  })\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (handle_events);\n\n\n//# sourceURL=webpack://galaga/./event_handler.js?");

/***/ }),

/***/ "./health_bar.js":
/*!***********************!*\
  !*** ./health_bar.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants */ \"./constants.js\");\n\n\nclass HealthBar {\n  constructor(hp) {\n    this.max_hp = hp\n    this.hp = this.max_hp\n\n    const originalImage = new Image()\n    originalImage.src = \"health_bar.png\"\n\n    this.max_width = originalImage.naturalWidth / 5\n\n    originalImage.onload = () => {\n      this.healthBarElement = document.createElement(\"img\")\n      this.healthBarElement.src = originalImage.src\n      this.healthBarElement.style.position = \"absolute\"\n      this.healthBarElement.width = originalImage.naturalWidth / 5\n      this.healthBarElement.height = originalImage.naturalHeight / 5\n      this.healthBarElement.style.transformOrigin = \"left\";\n\n      this.x = 10\n      this.y = _constants__WEBPACK_IMPORTED_MODULE_0__.DISPLAY_HEIGHT - this.healthBarElement.height - 25\n\n      this.healthBarElement.style.left = this.x + \"px\"\n      this.healthBarElement.style.top = this.y + \"px\"\n\n      this.healthBarElement.classList.add(\"healthbar\")\n      document.body.appendChild(this.healthBarElement)\n    }\n\n    this.vel_x = 0\n    this.vel_y = 0\n  }\n\n  update() {\n    this.x += this.vel_x\n    this.y += this.vel_y\n  }\n\n  decrease_hp_value() {\n    this.hp--\n    this.healthBarElement.style.transform = `scaleX(${this.hp / this.max_hp})`\n  }\n\n  reset_health_to_max() {\n    this.hp = this.max_hp\n    this.healthBarElement.style.transform = `scaleX(1)`\n  }\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (HealthBar);\n\n\n//# sourceURL=webpack://galaga/./health_bar.js?");

/***/ }),

/***/ "./hud.js":
/*!****************!*\
  !*** ./hud.js ***!
  \****************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants */ \"./constants.js\");\n/* harmony import */ var _health_bar__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./health_bar */ \"./health_bar.js\");\n/* harmony import */ var _lives__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./lives */ \"./lives.js\");\n/* harmony import */ var _score__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./score */ \"./score.js\");\n\n\n\n\n\nclass HUD {\n  constructor(hp, num_lives) {\n    const hudImage = new Image()\n    hudImage.src = \"hud.png\"\n\n    hudImage.onload = () => {\n      this.hudElement = document.createElement(\"img\")\n      this.hudElement.src = hudImage.src\n      this.hudElement.style.position = \"absolute\"\n      this.hudElement.width = hudImage.naturalWidth * 1.06\n      this.hudElement.height = hudImage.naturalHeight\n\n      this.x = 0\n      this.y = _constants__WEBPACK_IMPORTED_MODULE_0__.DISPLAY_HEIGHT - this.hudElement.height\n\n      this.hudElement.style.left = this.x + \"px\"\n      this.hudElement.style.top = this.y + \"px\"\n\n      this.hudElement.classList.add(\"hud\")\n      document.body.appendChild(this.hudElement)\n    }\n\n    this.vel_x = 0\n    this.vel_y = 0\n\n    // healthbar\n    this.healthbar = new _health_bar__WEBPACK_IMPORTED_MODULE_1__[\"default\"](hp)\n\n    // score\n    this.score = new _score__WEBPACK_IMPORTED_MODULE_3__[\"default\"]()\n\n    // lives\n    this.lives = new _lives__WEBPACK_IMPORTED_MODULE_2__[\"default\"](num_lives)\n  }\n\n  update() {\n    // healthbar\n    this.healthbar.update()\n    // lives\n    this.lives.update()\n    // score\n    this.score.update()\n    this.x += this.vel_x\n    this.y += this.vel_y\n  }\n\n  draw() {\n    \n  }\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (HUD);\n\n//# sourceURL=webpack://galaga/./hud.js?");

/***/ }),

/***/ "./lives.js":
/*!******************!*\
  !*** ./lives.js ***!
  \******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants */ \"./constants.js\");\n\n\nclass Lives {\n    constructor(num_lives) {\n        this.num_lives = num_lives\n        this.width = 80\n        this.height = 40\n\n        this.livesElement = document.createElement(\"div\")\n        this.livesElement.style.position = \"absolute\"\n        this.livesElement.style.width = this.width + \"px\"\n        this.livesElement.style.height = this.height + \"px\"\n        // this.livesElement.style.backgroundColor = \"black\"\n        this.livesElement.style.color = \"white\"\n        this.livesElement.style.zIndex = 1\n        this.livesElement.classList.add(\"lives\")\n\n        this.shipImage = new Image()\n        this.shipImage.src = \"ship.png\"\n\n        this.shipImage.onload = () => {\n            this.shipImage.width = this.shipImage.naturalWidth * 0.05\n            this.shipImage.height = this.shipImage.naturalHeight * 0.05\n            this.livesElement.appendChild(this.shipImage)\n\n            this.font_size = 20\n            this.fontElement = document.createElement(\"div\")\n            this.fontElement.style.fontSize = this.font_size + \"px\"\n            this.fontElement.style.color = \"white\"\n            this.fontElement.innerHTML = \"x\" + this.num_lives\n            this.livesElement.appendChild(this.fontElement)\n        }\n        \n        this.x = 200\n        this.y = _constants__WEBPACK_IMPORTED_MODULE_0__.DISPLAY_HEIGHT-40\n\n        this.livesElement.style.left = this.x + \"px\"\n        this.livesElement.style.top = this.y + \"px\"\n\n        document.body.appendChild(this.livesElement)\n        \n        this.vel_x = 0\n        this.vel_y = 0\n    }\n\n    update() {\n\n    }\n\n    decrement_life() {\n        this.num_lives--\n        if(this.num_lives < 0) {\n            this.num_lives = 0\n        } else {\n            this.fontElement.innerHTML = \"x\" + this.num_lives\n        }\n    }\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Lives);\n\n//# sourceURL=webpack://galaga/./lives.js?");

/***/ }),

/***/ "./node_modules/uuid/dist/esm-browser/native.js":
/*!******************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/native.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nvar randomUUID = typeof crypto !== 'undefined' && crypto.randomUUID && crypto.randomUUID.bind(crypto);\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({\n  randomUUID\n});\n\n//# sourceURL=webpack://galaga/./node_modules/uuid/dist/esm-browser/native.js?");

/***/ }),

/***/ "./node_modules/uuid/dist/esm-browser/regex.js":
/*!*****************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/regex.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (/^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$/i);\n\n//# sourceURL=webpack://galaga/./node_modules/uuid/dist/esm-browser/regex.js?");

/***/ }),

/***/ "./node_modules/uuid/dist/esm-browser/rng.js":
/*!***************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/rng.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ rng)\n/* harmony export */ });\n// Unique ID creation requires a high quality random # generator. In the browser we therefore\n// require the crypto API and do not support built-in fallback to lower quality random number\n// generators (like Math.random()).\n\nvar getRandomValues;\nvar rnds8 = new Uint8Array(16);\nfunction rng() {\n  // lazy load so that environments that need to polyfill have a chance to do so\n  if (!getRandomValues) {\n    // getRandomValues needs to be invoked in a context where \"this\" is a Crypto implementation.\n    getRandomValues = typeof crypto !== 'undefined' && crypto.getRandomValues && crypto.getRandomValues.bind(crypto);\n    if (!getRandomValues) {\n      throw new Error('crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported');\n    }\n  }\n  return getRandomValues(rnds8);\n}\n\n//# sourceURL=webpack://galaga/./node_modules/uuid/dist/esm-browser/rng.js?");

/***/ }),

/***/ "./node_modules/uuid/dist/esm-browser/stringify.js":
/*!*********************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/stringify.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__),\n/* harmony export */   unsafeStringify: () => (/* binding */ unsafeStringify)\n/* harmony export */ });\n/* harmony import */ var _validate_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./validate.js */ \"./node_modules/uuid/dist/esm-browser/validate.js\");\n\n\n/**\n * Convert array of 16 byte values to UUID string format of the form:\n * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX\n */\nvar byteToHex = [];\nfor (var i = 0; i < 256; ++i) {\n  byteToHex.push((i + 0x100).toString(16).slice(1));\n}\nfunction unsafeStringify(arr, offset = 0) {\n  // Note: Be careful editing this code!  It's been tuned for performance\n  // and works in ways you may not expect. See https://github.com/uuidjs/uuid/pull/434\n  //\n  // Note to future-self: No, you can't remove the `toLowerCase()` call.\n  // REF: https://github.com/uuidjs/uuid/pull/677#issuecomment-1757351351\n  return (byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + '-' + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + '-' + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + '-' + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + '-' + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]]).toLowerCase();\n}\nfunction stringify(arr, offset = 0) {\n  var uuid = unsafeStringify(arr, offset);\n  // Consistency check for valid UUID.  If this throws, it's likely due to one\n  // of the following:\n  // - One or more input array values don't map to a hex octet (leading to\n  // \"undefined\" in the uuid)\n  // - Invalid input values for the RFC `version` or `variant` fields\n  if (!(0,_validate_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(uuid)) {\n    throw TypeError('Stringified UUID is invalid');\n  }\n  return uuid;\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (stringify);\n\n//# sourceURL=webpack://galaga/./node_modules/uuid/dist/esm-browser/stringify.js?");

/***/ }),

/***/ "./node_modules/uuid/dist/esm-browser/v4.js":
/*!**************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/v4.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _native_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./native.js */ \"./node_modules/uuid/dist/esm-browser/native.js\");\n/* harmony import */ var _rng_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./rng.js */ \"./node_modules/uuid/dist/esm-browser/rng.js\");\n/* harmony import */ var _stringify_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./stringify.js */ \"./node_modules/uuid/dist/esm-browser/stringify.js\");\n\n\n\nfunction v4(options, buf, offset) {\n  if (_native_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].randomUUID && !buf && !options) {\n    return _native_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].randomUUID();\n  }\n  options = options || {};\n  var rnds = options.random || (options.rng || _rng_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"])();\n\n  // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`\n  rnds[6] = rnds[6] & 0x0f | 0x40;\n  rnds[8] = rnds[8] & 0x3f | 0x80;\n\n  // Copy bytes to buffer, if provided\n  if (buf) {\n    offset = offset || 0;\n    for (var i = 0; i < 16; ++i) {\n      buf[offset + i] = rnds[i];\n    }\n    return buf;\n  }\n  return (0,_stringify_js__WEBPACK_IMPORTED_MODULE_2__.unsafeStringify)(rnds);\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (v4);\n\n//# sourceURL=webpack://galaga/./node_modules/uuid/dist/esm-browser/v4.js?");

/***/ }),

/***/ "./node_modules/uuid/dist/esm-browser/validate.js":
/*!********************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/validate.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _regex_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./regex.js */ \"./node_modules/uuid/dist/esm-browser/regex.js\");\n\nfunction validate(uuid) {\n  return typeof uuid === 'string' && _regex_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].test(uuid);\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (validate);\n\n//# sourceURL=webpack://galaga/./node_modules/uuid/dist/esm-browser/validate.js?");

/***/ }),

/***/ "./score.js":
/*!******************!*\
  !*** ./score.js ***!
  \******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants */ \"./constants.js\");\n\n\nclass Score {\n    constructor() {\n        this.value = 0\n        this.font_size = 20\n        \n        this.scoreElement = document.createElement(\"div\")\n        this.scoreElement.style.position = \"absolute\"\n        this.scoreElement.innerText = \"Score: \" + this.value\n        this.scoreElement.style.color = \"white\"\n        this.scoreElement.style.zIndex = 1\n        this.scoreElement.classList.add(\"score\")\n\n        this.x_pad = 20\n        this.y_pad = 17\n\n        this.x = _constants__WEBPACK_IMPORTED_MODULE_0__.DISPLAY_WIDTH - 100\n        this.y = _constants__WEBPACK_IMPORTED_MODULE_0__.DISPLAY_HEIGHT - 30\n\n        this.scoreElement.style.left = this.x + \"px\"\n        this.scoreElement.style.top = this.y + \"px\"\n\n        document.body.appendChild(this.scoreElement)\n    }\n\n    update() {\n\n    }\n\n    update_score(value) {\n        this.value += value\n        this.scoreElement.innerText = \"Score: \" + this.value\n    }\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Score);\n\n//# sourceURL=webpack://galaga/./score.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./Galaga.js");
/******/ 	
/******/ })()
;