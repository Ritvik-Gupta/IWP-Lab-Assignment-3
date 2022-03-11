function computeExpressions() {
	const step = getCurrentStepFormIndex()
	const form = stepForms[step]

	switch (step) {
		case 0: {
			const stringValue = form.querySelector(`[data-input-for="string-value"]`).value
			const startIndex = parseInt(form.querySelector(`[data-input-for="start-index"]`).value)
			const endIndex = parseInt(form.querySelector(`[data-input-for="end-index"]`).value)

			const output = form.querySelector(`[data-input-for="output"]`)
			output.value = stringValue.substring(startIndex, endIndex)
			break
		}
		case 1: {
			const stringValue = form.querySelector(`[data-input-for="string-value"]`).value
			const searchSubstring = form.querySelector(`[data-input-for="search-substring"]`).value
			const replacementString = form.querySelector(`[data-input-for="replacement-string"]`).value

			const output = form.querySelector(`[data-input-for="output"]`)
			output.value = stringValue.replace(searchSubstring, replacementString)
			break
		}
		case 2: {
			const stringValue = form.querySelector(`[data-input-for="string-value"]`).value
			const pattern = form.querySelector(`[data-input-for="pattern"]`).value

			const output = form.querySelector(`[data-input-for="output"]`)
			output.value = new RegExp(pattern).test(stringValue) ? "Yes" : "No"
			break
		}
		case 3: {
			const array = form.querySelector(`[data-input-for="array"]`).value.split(/\s*,\s*/)

			const output = form.querySelector(`[data-input-for="output"]`)
			output.value = array.reverse().join(", ")
			break
		}
		case 4: {
			const firstDate = new Date(form.querySelector(`[data-input-for="first-date"]`).value)
			const secondDate = new Date(form.querySelector(`[data-input-for="second-date"]`).value)

			const differenceInTime = Math.abs(secondDate - firstDate)
			const differenceInDays = Math.ceil(differenceInTime / (1000 * 60 * 60 * 24))

			const output = form.querySelector(`[data-input-for="output"]`)
			output.value = `${differenceInDays} days`
			break
		}
		default:
			throw new Error()
	}
}
