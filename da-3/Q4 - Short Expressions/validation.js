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
