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

function validateInputs() {
	const inputs = new Map(
		[...getAllInputsIn(stepForms[getCurrentStepFormIndex()])].map(input => [
			input.dataset.inputFor,
			input,
		])
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
