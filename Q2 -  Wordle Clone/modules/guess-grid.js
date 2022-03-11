class GuessGrid {
	constructor() {
		this.grid = document.querySelector("[data-guess-grid]")
	}

	getActiveTiles = () => {
		return this.grid.querySelectorAll('[data-state="active"]')
	}

	pressKey = key => {
		const activeTiles = this.getActiveTiles()
		if (activeTiles.length >= WORD_LENGTH) return
		const nextTile = this.grid.querySelector(":not([data-letter])")
		nextTile.dataset.letter = key.toLowerCase()
		nextTile.textContent = key
		nextTile.dataset.state = "active"
	}

	deleteKey = () => {
		const activeTiles = this.getActiveTiles()
		const lastTile = activeTiles[activeTiles.length - 1]
		if (lastTile == null) return
		lastTile.textContent = ""
		delete lastTile.dataset.state
		delete lastTile.dataset.letter
	}
}
