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

let validate = true

function validateInputs() {
	const inputs = new Map(
		[...stepForms[getCurrentStepFormIndex()].querySelectorAll("[data-input-for]")].map(input => [
			input.dataset.inputFor,
			input,
		])
	)

	if (!validate) return true

	return Array.from(inputs, ([id, input]) => {
		const inputValue = input.value.trim()
		try {
			switch (id) {
				case "email":
					if (inputValue.length === 0) throw "Email cannot be empty"

					const isValidEmail =
						/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
							inputValue
						)
					if (!isValidEmail) throw "Invalid Email Format Specified"

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
				case "phone":
					if (inputValue.length === 0) throw "Phone Number must be provided"
					const isValidPhoneNumber = /^[0-9]{10}$/.test(inputValue)
					console.log(isValidPhoneNumber)
					if (!isValidPhoneNumber) throw "Phone Number must have 10 numbers"

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
