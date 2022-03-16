const form = document.querySelector("#form")

form.addEventListener("submit", e => {
	e.preventDefault()

	const fullAmount = parseInt(form.querySelector("#full-amount").value)
	const months = parseInt(form.querySelector("#months").value)
	const rate = parseInt(form.querySelector("#rate").value)

	const monthlyInterestRate = rate / 100 / 12

	const emi =
		fullAmount *
		monthlyInterestRate *
		((1 + monthlyInterestRate) ** months / ((1 + monthlyInterestRate) ** months - 1))

	console.log("Full Amount :\t", fullAmount)
	console.log("Number of Months :\t", months)
	console.log("Monthly Interest Rate :\t", monthlyInterestRate)
	console.log("EMI Computed :\t", emi)

	let principalOutstanding = fullAmount

	const data = []
	for (let i = 0; i < months; ++i) {
		const principal = principalOutstanding
		const interest = principal * monthlyInterestRate
		const principalRepayment = emi - interest
		principalOutstanding = principal - principalRepayment

		const loanRepaidPercentage = 100 * (1 - principalOutstanding / fullAmount)

		data.push({
			principal: principal.toFixed(2),
			interest: interest.toFixed(2),
			principalRepayment: principalRepayment.toFixed(2),
			principalOutstanding: principalOutstanding.toFixed(2),
			loanRepaidPercentage: loanRepaidPercentage.toFixed(2),
		})
	}

	console.table(data)
})
