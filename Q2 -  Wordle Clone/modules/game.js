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

	static validateGuess = guessTiles => {
		if (guessTiles.length !== WORD_LENGTH) throw "Not enough letters"
		const guess = guessTiles.map(tile => tile.dataset.letter).join("")
		if (!DICTIONARY.includes(guess)) throw "Not in word list"
		return guess
	}

	// Whenever the events on the screen need to be (re)activated, this method
	// is called to listen to events
	startInteraction = () => {
		// Listen for any Click Events on the Screen
		document.addEventListener("click", this.handleMouseClick)
		// Listen for any Key Press Events on the Website
		document.addEventListener("keydown", this.handleKeyPress)
	}

	// Whenever the events on the screen need to be deactivated, this method
	// is called to remove current listening handles.
	// Is required whenever an Animation or Transition is being played
	// on the screen for the Active Tiles
	stopInteraction = () => {
		// Remove Click and Key events on the Screen
		document.removeEventListener("click", this.handleMouseClick)
		document.removeEventListener("keydown", this.handleKeyPress)
	}

	// Check the Mouse Click location for the Screen Keyboard Key being pressed
	handleMouseClick = ({ target }) => {
		if (target.matches("[data-enter]")) this.submitGuess()
		else if (target.matches("[data-delete]")) this.guessGrid.deleteKey()
		else if (target.matches("[data-key]")) this.guessGrid.pressKey(target.dataset.key)
	}

	// Check the Key Pressed
	handleKeyPress = ({ key }) => {
		if (key === "Enter") this.submitGuess()
		else if (key === "Backspace" || key === "Delete") this.guessGrid.deleteKey()
		else if (key.match(/^[a-z]$/)) this.guessGrid.pressKey(key)
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

		// A Flip Transition is associated with the Tile being processed
		setTimeout(() => {
			tile.classList.add("flip")
		}, (index * FLIP_ANIMATION_DURATION) / 2)

		// Listen to the Event of Tile Flip End when it can be validated for correctness
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
					// If this is the last tile being flipped we need to
					// wait for end of its Flip Transition
					tile.addEventListener(
						"transitionend",
						() => {
							// And re-activate the Keypress and Click events on the Screen
							this.startInteraction()
							// validate and verify the board for win condition
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
			// An Animation on Click is not supported in CSS thus we need to add
			// additional HTML Class and remove after animation
			tile.classList.add("shake")
			// When the Animation ends we need to remove it manually from the HTML Class
			// So later we can add and Shake the Tiles again
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
