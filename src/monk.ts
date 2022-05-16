import { Actor, Animation, CollisionType, Engine, range, vec } from 'excalibur'
import { PlayerResources, playerSpriteSheet } from './resurces'

export class Monk extends Actor {
	constructor(name: string, x: number, y: number) {
		super({
			name,
			pos: vec(x, y),
			collisionType: CollisionType.Passive,
		})
	}

	onInitialize(_engine: Engine) {
		const animDuration = 150
		const spriteSheet = playerSpriteSheet(PlayerResources['monk'])
		const setIndex = Math.floor(Math.random() * 4) * 3
		const bodyIndex = ((Math.floor(Math.random() * 3) + 1) * 3) + (12 * 4)

		const getAnimations = (index: number) => {
			const idle = Animation.fromSpriteSheet(spriteSheet, [index + 1], animDuration)
			const down = Animation.fromSpriteSheet(spriteSheet, range(index, index + 2), animDuration)
			const left = Animation.fromSpriteSheet(spriteSheet, range(index + 12, index + 14), animDuration)
			const right = Animation.fromSpriteSheet(spriteSheet, range(index + 24, index + 26), animDuration)
			const up = Animation.fromSpriteSheet(spriteSheet, range(index + 36, index + 38), animDuration)
			return {
				idle,
				down,
				left,
				right,
				up
			}
		}

		const body = getAnimations(bodyIndex);
		const skin = getAnimations(setIndex);

		const bodyActor = new Actor()
		const skinActor = new Actor()

		const addGraphics = (actor: Actor, animations: any) => {
			actor.graphics.add('down', animations.down)
			actor.graphics.add('up', animations.up)
			actor.graphics.add('left', animations.left)
			actor.graphics.add('right', animations.right)
			actor.graphics.add('idle', animations.idle)
			return actor
		}

		this.addChild(addGraphics(bodyActor, body))
		this.addChild(addGraphics(skinActor, skin))

		this.scale.x = 1
		this.scale.y = 1
	}

	onPostUpdate(_engine: Engine, _delta: number) {
		const useAnimation = (name: string) =>  {
			this.children.forEach((child) => {
				child.graphics.use(name)
			})
		}

		if (this.vel.y < 0) {
			useAnimation('up')
		}

		if (this.vel.y > 0) {
			useAnimation('down')
		}

		if (this.vel.x > 0) {
			useAnimation('right')
		}

		if (this.vel.x < 0) {
			useAnimation('left')
		}

		if (this.vel.y ===  0 && this.vel.x == 0) {
			useAnimation('idle')
		}
	}
}
