import { ImageSource, Loader, SpriteSheet } from 'excalibur'

import monk from './assets/monk.png'
import sets from './assets/sets/4x2.png'

const PlayerResources = {
	monk: new ImageSource(monk),
	sets: new ImageSource(sets)
}

const loader = new Loader()
loader.logoHeight = 0
loader.logoWidth = 0
loader.backgroundColor = '#00000000'
loader.startButtonFactory = () => {
	let myButton = document.createElement('button')
	myButton.className = 'button-start'
	myButton.textContent = 'Запустить эту лабуду'
	return myButton
}

const playerSpriteSheet = (source: ImageSource) => SpriteSheet.fromImageSource({
	image: source,
	grid: {
		columns: 12,
		rows: 8,
		spriteWidth: 64,
		spriteHeight: 64
	}
})

for (const source in PlayerResources) {
	loader.addResource((PlayerResources as any)[source])
}

export {
	PlayerResources,
	loader,
	playerSpriteSheet
}
