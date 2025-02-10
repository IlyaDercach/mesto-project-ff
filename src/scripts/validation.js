const showInputError = (option, formElement, inputElement, errorMessage) => {
	const errorElement = formElement.querySelector(`.${inputElement.id}-error`)
	inputElement.classList.add(`${option.inputErrorClass}`)
	errorElement.textContent = errorMessage
	errorElement.classList.add(`${option.errorClass}`)
}

const hideInputError = (option, formElement, inputElement) => {
	const errorElement = formElement.querySelector(`.${inputElement.id}-error`)
	inputElement.classList.remove(`${option.inputErrorClass}`)
	errorElement.classList.remove(`${option.errorClass}`)
	errorElement.textContent = ''
}

const isValid = (option, formElement, inputElement) => {
	if (inputElement.validity.patternMismatch) {
		inputElement.setCustomValidity(inputElement.dataset.errorMessage)
	} else {
		inputElement.setCustomValidity('')
	}
	if (!inputElement.validity.valid) {
		showInputError(
			option,
			formElement,
			inputElement,
			inputElement.validationMessage
		)
	} else {
		hideInputError(option, formElement, inputElement)
	}
}

const hasInvalidInput = inputList => {
	return inputList.some(input => {
		return !input.validity.valid
	})
}

const toggleButtonState = (option, inputList, buttonElement) => {
	if (hasInvalidInput(inputList)) {
		buttonElement.classList.add(`${option.inactiveButtonClass}`)
		buttonElement.disabled = 'disabled'
	} else {
		buttonElement.classList.remove(`${option.inactiveButtonClass}`)
		buttonElement.disabled = ''
	}
}

const setEventListeners = (option, formElement) => {
	const inputList = Array.from(
		formElement.querySelectorAll(`${option.inputSelector}`)
	)
	const buttonElement = formElement.querySelector(
		`${option.submitButtonSelector}`
	)

	inputList.forEach(inputElement => {
		inputElement.addEventListener('input', () => {
			isValid(option, formElement, inputElement)
			toggleButtonState(option, inputList, buttonElement)
		})
	})
}

export function enableValidation(option) {
	const formList = Array.from(
		document.querySelectorAll(`${option.formSelector}`)
	)

	formList.forEach(formElement => {
		setEventListeners(option, formElement)
	})
}

export const clearValidation = (formElement, option) => {
	const { inputSelector, submitButtonSelector, inputErrorClass, errorClass } =
		option

	const inputList = Array.from(formElement.querySelectorAll(`${inputSelector}`))
	const buttonElement = formElement.querySelector(`${submitButtonSelector}`)

	inputList.forEach(inputElement => {
		const errorElement = formElement.querySelector(`.${inputElement.id}-error`)
		toggleButtonState(option, inputList, buttonElement)
		inputElement.setCustomValidity('')
		inputElement.classList.remove(`${inputErrorClass}`)
		errorElement.classList.remove(`${errorClass}`)
		errorElement.textContent = ''
	})
}
