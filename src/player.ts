import { Actor, Animation, CollisionType, Engine, range, vec } from 'excalibur'
import { PlayerResources, playerSpriteSheet } from './resurces'

export class Player extends Actor {
	constructor(name: string, x: number, y: number) {
		super({
			name,
			pos: vec(x, y),
			collisionType: CollisionType.Passive,
		})
	}

	onInitialize(_engine: Engine) {
		const animDuration = 150
		const spriteSheet = playerSpriteSheet(PlayerResources['sets'])
		const setIndex = Math.floor(Math.random() * 4) * 3 + (Math.floor(Math.random() * 2) * (12 * 4))
		const idle = Animation.fromSpriteSheet(spriteSheet, [setIndex + 1], animDuration)

		const down = Animation.fromSpriteSheet(spriteSheet, range(setIndex, setIndex + 2), animDuration)
		const left = Animation.fromSpriteSheet(spriteSheet, range(setIndex + 12, setIndex + 14), animDuration)
		const right = Animation.fromSpriteSheet(spriteSheet, range(setIndex + 24, setIndex + 26), animDuration)
		const up = Animation.fromSpriteSheet(spriteSheet, range(setIndex + 36, setIndex + 38), animDuration)
		this.graphics.add('down', down)
		this.graphics.add('up', up)
		this.graphics.add('left', left)
		this.graphics.add('right', right)
		this.graphics.add('idle', idle)
		this.scale.x = 1
		this.scale.y = 1
	}

	onPostUpdate(_engine: Engine, _delta: number) {
		if (this.vel.y < 0) {
			this.graphics.use('up')
		}

		if (this.vel.y > 0) {
			this.graphics.use('down')
		}

		if (this.vel.x > 0) {
			this.graphics.use('right')
		}

		if (this.vel.x < 0) {
			this.graphics.use('left')
		}

		if (this.vel.y ===  0 && this.vel.x == 0) {
			this.graphics.use('idle')
		}
	}
}
