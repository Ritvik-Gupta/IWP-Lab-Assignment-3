const stepForms = [...document.querySelectorAll("fieldset")]
const progressIndicators = [...document.querySelectorAll("#progressbar li")]

document.querySelectorAll("input:not([data-action]),textarea").forEach(input =>
	input.addEventListener("focus", () => {
		const formControl = input.parentElement
		formControl.classList.remove("success")
		formControl.classList.remove("error")
	})
)

const getCurrentStepFormIndex = () => stepForms.findIndex(step => step.classList.contains("active"))
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

function validateInputs() {
	const inputs = new Map(
		[
			...stepForms[getCurrentStepFormIndex()].querySelectorAll("input:not([data-action]),textarea"),
		].map(input => [input.id, input])
	)

	return Array.from(inputs, ([id, input]) => {
		const inputValue = input.value.trim()
		try {
			switch (id) {
				case "email":
					if (inputValue.length === 0) throw "Email cannot be empty"

					const isEmail =
						/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
							inputValue
						)
					if (!isEmail) throw "Invalid Email Format Specified"

					break
				case "password":
					if (inputValue.length === 0) throw "Password cannot be empty"
					if (inputs.get("confirm-password").value !== inputValue)
						throw "Passwords provided dont match"

					break
				case "confirm-password":
					if (inputValue.length === 0) throw "Password cannot be empty"
					if (inputs.get("password").value !== inputValue) throw "Passwords provided dont match"

					break
				case "firstname":
					if (inputValue.length === 0) throw "First Name must be provided"

					break
				case "lastname":
					if (inputValue.length === 0) throw "Last Name must be provided"

					break
				case "phone-number":
					if (inputValue.length === 0) throw "Phone Number must be provided"

					break
				case "address":
					if (inputValue.length === 0) throw "Address must be provided"

					break
				case "github-address":
					break
			}
			setSuccessFor(input)
			return true
		} catch (errorMessage) {
			setErrorFor(input, errorMessage)
			return false
		}
	}).every(isValid => isValid)
}

function setErrorFor(input, message) {
	const formControl = input.parentElement
	formControl.classList.add("error")

	const small = formControl.querySelector("small")
	small.innerText = message
}

function setSuccessFor(input) {
	const formControl = input.parentElement
	formControl.classList.add("success")
}

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
	return validateInputs()
})
