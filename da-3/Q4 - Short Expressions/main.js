const multiStepForm = document.querySelector("#multi-step-form")

multiStepForm.addEventListener("submit", event => event.preventDefault())

stepForms.forEach(form =>
	form.addEventListener("keydown", ({ key }) => {
		if (key === "Enter") {
			const runButton = form.querySelector(`[data-action="run"]`)
			runButton.click()
		}
	})
)

document.querySelectorAll("[data-input-for]").forEach(input =>
	input.addEventListener("focus", () => {
		const formControl = input.parentElement
		formControl.classList.remove("success", "error")
	})
)

const runButtons = [...document.querySelectorAll(`[data-action="run"]`)]
runButtons.forEach(button => button.addEventListener("click", computeExpressions))

const nextButtons = [...document.querySelectorAll(`[data-action="next"]`)]
nextButtons.forEach(button =>
	button.addEventListener("click", () => performFormSwapAnimations({ updateOf: 1 }))
)

const previousButtons = [...document.querySelectorAll(`[data-action="previous"]`)]
previousButtons.forEach(button =>
	button.addEventListener("click", () => performFormSwapAnimations({ updateOf: -1 }))
)
