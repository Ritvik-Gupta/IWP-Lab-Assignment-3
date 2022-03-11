const multiStepForm = document.querySelector("#multi-step-form")

multiStepForm.addEventListener("submit", event => event.preventDefault())

stepForms.forEach(form =>
	form.addEventListener("keydown", ({ key }) => {
		if (key === "Enter") {
			const formButtons = form.querySelectorAll("[data-action]")
			formButtons[formButtons.length - 1].click()
		}
	})
)

document
	.querySelectorAll("[data-input-for]")
	.forEach(input => input.addEventListener("focus", () => removeHighlights(input)))

const nextButtons = [...document.querySelectorAll(`[data-action="next"]`)]
nextButtons.forEach(button =>
	button.addEventListener("click", () => {
		const areValidResponses = validateInputs()
		if (areValidResponses) performFormSwapAnimations({ updateOf: 1 })
	})
)

const previousButtons = [...document.querySelectorAll(`[data-action="previous"]`)]
previousButtons.forEach(button =>
	button.addEventListener("click", () => performFormSwapAnimations({ updateOf: -1 }))
)

const submitButton = document.querySelector(`[data-action="submit"]`)
submitButton.addEventListener("click", () => {
	const areValidResponses = validateInputs()
	if (areValidResponses) {
	}
})
