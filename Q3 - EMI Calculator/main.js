const form = document.querySelector("#form")
const table = document.querySelector("[monthly-emi-table]")
const emiTableScroller = document.querySelector(`a[href="#emi-table"]`)

form.addEventListener("submit", e => {
	e.preventDefault()

	table.innerHTML = ""

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
			Principal: principal.toFixed(2),
			Interest: interest.toFixed(2),
			"Principal Repayment": principalRepayment.toFixed(2),
			"Principal Outstanding": principalOutstanding.toFixed(2),
			"Percentage of Loan Repaid": `${loanRepaidPercentage.toFixed(2)} %`,
		})

		let row = `<td>${i + 1}</td>`
		for (key in data[i]) row += `<td>${data[i][key]}</td>`
		table.innerHTML += `<tr>${row}</tr>`
	}

	emiTableScroller.click()

	console.table(data)
})
