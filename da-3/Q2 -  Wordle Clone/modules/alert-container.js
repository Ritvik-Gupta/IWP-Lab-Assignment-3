class AlertContainer {
	constructor() {
		this.container = document.querySelector("[data-alert-container]")
	}

	showAlert = (message, duration = 1000) => {
		const alert = document.createElement("div")
		alert.textContent = message
		alert.classList.add("alert")
		this.container.prepend(alert)
		if (duration == null) return

		setTimeout(() => {
			alert.classList.add("hide")
			alert.addEventListener("transitionend", () => {
				alert.remove()
			})
		}, duration)
	}
}
