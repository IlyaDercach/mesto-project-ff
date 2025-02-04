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
	console.log(inputElement.validity.patternMismatch)
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

// очистка ошибок валидации вызовом clearValidation очищает ошибки валидации формы и делает кнопку неактивной
// параметры DOM-элемент формы, для которой очищаются ошибки валидации и объект с настройками валидации. Используйте функцию clearValidation при заполнении формы профиля во время её открытия и при очистке формы добавления карточки.

export const clearValidation = (formElement, option) => {
	const inputList = Array.from(
		formElement.querySelectorAll(`${option.inputSelector}`)
	)
	const buttonElement = formElement.querySelector(
		`${option.submitButtonSelector}`
	)

	inputList.forEach(inputElement => {
		// if (!inputElement.validity.valid) {
		// 	isValid(option, formElement, inputElement)
		// 	toggleButtonState(option, inputList, buttonElement)
		// } else {
		// 	isValid(option, formElement, inputElement)
		// }
		toggleButtonState(option, inputList, buttonElement)
		const errorElement = formElement.querySelector(`.${inputElement.id}-error`)
		inputElement.setCustomValidity('')
		inputElement.classList.remove(`${option.inputErrorClass}`)
		errorElement.classList.remove(`${option.errorClass}`)
		errorElement.textContent = ''
	})
}
