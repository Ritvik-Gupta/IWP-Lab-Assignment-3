const getAllInputsIn = selectIn => selectIn.querySelectorAll("[data-input-for]")

const stepForms = [...document.querySelectorAll("[data-step-form]")]

const getCurrentStepFormIndex = () => stepForms.findIndex(step => step.classList.contains("active"))
