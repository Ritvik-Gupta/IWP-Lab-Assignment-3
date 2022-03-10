const progressIndicators = [...document.querySelectorAll("#progressbar li")]

let animating = false

function performFormSwapAnimations({ updateOf }) {
	const step = getCurrentStepFormIndex()
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
			stepForms[nextToStep].classList.remove(`slide-from-${directionOfSlide}`)
			animating = false
		},
		{ once: true }
	)
}
