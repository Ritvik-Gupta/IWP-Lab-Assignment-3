const WORD_LENGTH = 5
const FLIP_ANIMATION_DURATION = 500
const DANCE_ANIMATION_DURATION = 500
const OFFSET_FROM_DATE = new Date(2022, 0, 1)

class Game {
	constructor() {
		this.keyboard = document.querySelector("[data-keyboard]")
		this.alertContainer = new AlertContainer()
		this.guessGrid = new GuessGrid()

		const dayOffset = (Date.now() - OFFSET_FROM_DATE) / (1000 * 60 * 60 * 24)
		this.targetWord = TARGET_WORDS[Math.floor(dayOffset)]

		this.startInteraction()
	}

	startInteraction = () => {
		document.addEventListener("click", this.handleMouseClick, this)
		document.addEventListener("keydown", this.handleKeyPress)
	}

	stopInteraction = () => {
		document.removeEventListener("click", this.handleMouseClick)
		document.removeEventListener("keydown", this.handleKeyPress)
	}

	handleMouseClick = ({ target }) => {
		if (target.matches("[data-enter]")) this.submitGuess()
		else if (target.matches("[data-delete]")) this.guessGrid.deleteKey()
		else if (target.matches("[data-key]")) this.guessGrid.pressKey(target.dataset.key)
	}

	handleKeyPress = ({ key }) => {
		if (key === "Enter") this.submitGuess()
		else if (key === "Backspace" || key === "Delete") this.guessGrid.deleteKey()
		else if (key.match(/^[a-z]$/)) this.guessGrid.pressKey(key)
	}

	static validateGuess = guessTiles => {
		if (guessTiles.length !== WORD_LENGTH) throw "Not enough letters"
		const guess = guessTiles.map(tile => tile.dataset.letter).join("")
		if (!DICTIONARY.includes(guess)) throw "Not in word list"
		return guess
	}

	submitGuess = () => {
		const activeTiles = [...this.guessGrid.getActiveTiles()]
		try {
			const guess = Game.validateGuess(activeTiles)

			this.stopInteraction()
			activeTiles.forEach((...params) => this.flipTile(...params, guess))
		} catch (err) {
			this.alertContainer.showAlert(err)
			this.shakeTiles(activeTiles)
		}
	}

	flipTile = (tile, index, array, guess) => {
		const letter = tile.dataset.letter
		const key = this.keyboard.querySelector(`[data-key="${letter}"i]`)
		setTimeout(() => {
			tile.classList.add("flip")
		}, (index * FLIP_ANIMATION_DURATION) / 2)

		tile.addEventListener(
			"transitionend",
			() => {
				tile.classList.remove("flip")
				if (this.targetWord[index] === letter) {
					tile.dataset.state = "correct"
					key.classList.add("correct")
				} else if (this.targetWord.includes(letter)) {
					tile.dataset.state = "misplaced"
					key.classList.add("misplaced")
				} else {
					tile.dataset.state = "wrong"
					key.classList.add("wrong")
				}

				if (index === array.length - 1) {
					tile.addEventListener(
						"transitionend",
						() => {
							this.startInteraction()
							this.checkWinLose(guess, array)
						},
						{ once: true }
					)
				}
			},
			{ once: true }
		)
	}

	shakeTiles = tiles => {
		tiles.forEach(tile => {
			tile.classList.add("shake")
			tile.addEventListener(
				"animationend",
				() => {
					tile.classList.remove("shake")
				},
				{ once: true }
			)
		})
	}

	checkWinLose = (guess, tiles) => {
		if (guess === this.targetWord) {
			this.alertContainer.showAlert("You Win", 5000)
			this.danceTiles(tiles)
			this.stopInteraction()
			return
		}

		const remainingTiles = this.guessGrid.grid.querySelectorAll(":not([data-letter])")
		if (remainingTiles.length === 0) {
			this.alertContainer.showAlert(this.targetWord.toUpperCase(), null)
			this.stopInteraction()
		}
	}

	danceTiles = tiles => {
		tiles.forEach((tile, index) => {
			setTimeout(() => {
				tile.classList.add("dance")
				tile.addEventListener(
					"animationend",
					() => {
						tile.classList.remove("dance")
					},
					{ once: true }
				)
			}, (index * DANCE_ANIMATION_DURATION) / 5)
		})
	}
}
