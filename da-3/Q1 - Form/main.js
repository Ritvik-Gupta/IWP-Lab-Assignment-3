const stepForms = [...document.querySelectorAll("fieldset")]
const progressIndicators = [...document.querySelectorAll("#progressbar li")]

const nextButtons = [...document.querySelectorAll(".next")]
const previousButtons = [...document.querySelectorAll(".previous")]
const submitButton = document.querySelector(".submit")

let step = stepForms.findIndex(step => step.classList.contains("active"))
let animating = false

performFormSwapAnimations = ({ updateOf }) => {
	const nextToStep = step + updateOf
	const directionOfSlide = step < nextToStep ? "left" : "right"

	if (animating) return false
	animating = true

	stepForms[step].classList.add("shrink-fade")
	stepForms[step].addEventListener(
		"animationend",
		() => {
			progressIndicators[step].classList.remove("active")
			stepForms[step].classList.remove("shrink-fade")
			stepForms[step].classList.remove("active")
		},
		{ once: true }
	)

	progressIndicators[nextToStep].classList.add("active")
	stepForms[nextToStep].classList.add("active")

	stepForms[nextToStep].classList.add(`slide-from-${directionOfSlide}`)
	stepForms[nextToStep].addEventListener(
		"animationend",
		() => {
			step = nextToStep
			stepForms[nextToStep].classList.remove(`slide-from-${directionOfSlide}`)
			animating = false
		},
		{ once: true }
	)
}

nextButtons.forEach(button =>
	button.addEventListener("click", () => performFormSwapAnimations({ updateOf: 1 }))
)

previousButtons.forEach(button =>
	button.addEventListener("click", () => performFormSwapAnimations({ updateOf: -1 }))
)
