const getAllInputsIn = selectIn => selectIn.querySelectorAll("[data-input-for]")

const getCurrentStepFormIndex = () => stepForms.findIndex(step => step.classList.contains("active"))

const stepForms = [...document.querySelectorAll("fieldset")]
