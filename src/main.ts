import './style.css'
import { Actor, Color, DisplayMode, Engine, Font, FontStyle, FontUnit, Text, vec, } from 'excalibur'
import { loader, } from './resurces'
import { Player } from './player'
import { Monk } from './monk'

const game = new Engine({
    canvasElementId: 'app',
    backgroundColor: Color.Transparent,
    displayMode: DisplayMode.FillScreen
})
await game.start(loader)

const playerSpeed = 32
const move = {
	left: (player: Player) => {
		player.vel.x = -playerSpeed
		player.vel.y = 0
	},
	right: (player: Player) => {
		player.vel.x = playerSpeed
		player.vel.y = 0
	},
	up: (player: Player) => {
		player.vel.x = 0
		player.vel.y = -playerSpeed
	},
	down: (player: Player) => {
		player.vel.x = 0
		player.vel.y = playerSpeed
	},
}

const vertical = (player: Player) => {
	player.on('postupdate', () => {
		if (player.pos.y < 32) {
			move.down(player)
		}
		if (player.pos.y > game.drawHeight - 32) {
			move.up(player)
		}
	})
}

const perimeter = (player: Player) => {
	player.on('postupdate', () => {
		if (player.pos.x > (game.drawWidth - 32) && player.pos.y < (game.drawHeight / 2)) {
			player.pos.x = game.drawWidth - 32
			move.down(player)
		}

		if (player.pos.x < 32 && player.pos.y > (game.drawHeight / 2)) {
			player.pos.x = 32
			move.up(player)
		}

		if (player.pos.y < 32 && player.pos.x < (game.drawWidth / 2)) {
			player.pos.y = 32
			move.right(player)
		}

		if ((player.pos.y > game.drawHeight - 32) && player.pos.x > (game.drawHeight / 2)) {
			player.pos.y = game.drawHeight - 32
			move.left(player)
		}
	})
}

const routes: Record<string, (player: Player) => void> = {
	vertical,
	perimeter
}

const setRoute = (player: Player, route: keyof typeof routes) => {
	routes[route](player)
}

const say = (selectedPlayer: Player, message: string) => {
	selectedPlayer.vel.y = 0
	const text = new Text({
		text: message,
		font: new Font({
			family: 'impact',
			size: 14,
			unit: FontUnit.Px,
			color: Color.White,
			style: FontStyle.Normal,
			// shadow: {
			// 	offset: vec(0, 0),
			// 	color: Color.Black,
			// 	blur: 12,
			// }
		})
	});

	const actor = new Actor({
		pos: vec(selectedPlayer.pos.x, selectedPlayer.pos.y - 32)
	});
	actor.graphics.use(text);
	game.currentScene.add(actor);
	setTimeout(() => {
		selectedPlayer.vel.y = 50
		actor.kill()
	}, 5000)
}

const btnHello = document.getElementById('button-hello')
if (btnHello) {
	btnHello.addEventListener('click', () => {
		const messages = [
			'Салют!',
			'Привет!',
			'Вечер в хату!',
			'Здарова были',
			'Вот так встреча!',
			'Здравия желаю',
			'Моё почтение!',
			'Позвольте Вас приветствовать',
			'Сердечно приветствую Вас!',
			'Ave!',
			'Ола!',
			'Холв!',
			'Алоха',
			'Нижайшее почтение!'
		]
		players.forEach(player => {
			say(player, messages[Math.floor(Math.random() * messages.length)])
		})
	})
}

const players: Player[] = []

const addPlayer = (monk: boolean = false) => {
	let newPlayer = null
	if (monk) {
		newPlayer = new Monk('player-name', 64,32)
	} else {
		newPlayer = new Player('player-name', 64,32)
	}
	game.add(newPlayer)
	players.push(newPlayer)
	setRoute(newPlayer, 'vertical')
	move.down(newPlayer)
}


for await (let i of [0, 0, 0]) {
	addPlayer(i === 0);
	await new Promise((resolve) => {
		setTimeout(resolve, 5000)
	})
}

const btnAdd = document.getElementById('button-add')
if (btnAdd) {
	btnAdd.addEventListener('click', () => {
		addPlayer()
	})
}
