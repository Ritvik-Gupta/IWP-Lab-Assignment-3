document.querySelector("#multi-step-form").addEventListener("submit", e => e.preventDefault())

getAllInputsIn(document).forEach(input =>
	input.addEventListener("focus", () => {
		const formControl = input.parentElement
		formControl.classList.remove("success")
		formControl.classList.remove("error")
	})
)

const nextButtons = [...document.querySelectorAll(".next")]
nextButtons.forEach(button =>
	button.addEventListener("click", () => {
		const areValidResponses = validateInputs()
		if (areValidResponses) performFormSwapAnimations({ updateOf: 1 })
	})
)

const previousButtons = [...document.querySelectorAll(".previous")]
previousButtons.forEach(button =>
	button.addEventListener("click", () => performFormSwapAnimations({ updateOf: -1 }))
)

const submitButton = document.querySelector(".submit")
submitButton.addEventListener("click", () => {
	console.log(validateInputs())
})
