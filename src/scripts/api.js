const API_KEY = '9dfd7803-ba42-4cdf-9792-1877bab2e321'

const config = {
	BASE_URL: 'https://mesto.nomoreparties.co/v1/wff-cohort-31',
	headers: {
		authorization: API_KEY,
		'Content-Type': 'application/json'
	}
}

const handleResponse = res => {
	if (res.ok) {
		return res.json()
	}
	return Promise.reject(`Ошибка: ${res.status}`)
}

/**
 * @route GET /card
 * @desc get all cards
 */
export const fetchCards = async () => {
	try {
		const response = await fetch(`${config.BASE_URL}/cards`, {
			headers: config.headers
		})
		return handleResponse(response)
	} catch (err) {
		throw new Error(`Request Error GetUserData: ${err?.status} ${err?.message}`)
	}
}

/**
 * @route GET /users/me
 * @desc get user data
 */
export const fetchUser = async () => {
	try {
		const response = await fetch(`${config.BASE_URL}/users/me`, {
			headers: config.headers
		})
		return handleResponse(response)
	} catch (err) {
		throw new Error(`Request Error GetUserData: ${err?.status} ${err?.message}`)
	}
}

/**
 * @route PATCH /users/me
 * @desc change user data
 */
export const editUser = async user => {
	try {
		const { name, about } = user
		const response = await fetch(`${config.BASE_URL}/users/me`, {
			method: 'PATCH',
			headers: config.headers,
			body: JSON.stringify({
				name,
				about
			})
		})
		return handleResponse(response)
	} catch (err) {
		throw new Error(
			`Request Error EditUserData: ${err?.status} ${err?.message}`
		)
	}
}

/**
 * @route POST /cards
 * @desc create new card
 */
export const createNewCard = async ({ name, link }) => {
	try {
		const response = await fetch(`${config.BASE_URL}/cards`, {
			method: 'POST',
			headers: config.headers,
			body: JSON.stringify({
				name,
				link
			})
		})
		return handleResponse(response)
	} catch (err) {
		throw new Error(`Request Error CreateCard: ${err?.status} ${err?.message}`)
	}
}

/**
 * @route DELETE /cards/:id
 * @desc remove card by id
 */
export const removeCard = async id => {
	try {
		const response = await fetch(`${config.BASE_URL}/cards/${id}`, {
			method: 'DELETE',
			headers: config.headers
		})
		return handleResponse(response)
	} catch (err) {
		throw new Error(`Request Error DeleteCard: ${err?.status} ${err?.message}`)
	}
}

/**
 * @route PUT /cards/likes/:id
 * @desc edit card like by id
 */
export const setLikeCard = async id => {
	try {
		const response = await fetch(`${config.BASE_URL}/cards/likes/${id}`, {
			method: 'PUT',
			headers: config.headers
		})
		return handleResponse(response)
	} catch (err) {
		throw new Error(`Request Error SetLikeCard: ${err?.status} ${err?.message}`)
	}
}

/**
 * @route DELETE /cards/likes/:id
 * @desc remove card like by id
 */
export const removeLikeCard = async id => {
	try {
		const response = await fetch(`${config.BASE_URL}/cards/likes/${id}`, {
			method: 'DELETE',
			headers: config.headers
		})
		return handleResponse(response)
	} catch (err) {
		throw new Error(
			`Request Error RemoveLikeCard: ${err?.status} ${err?.message}`
		)
	}
}

/**
 * @route PATCH /users/me/avatar
 * @desc edit profile avatar
 */
export const editProfileAvatar = async avatar => {
	try {
		const response = await fetch(`${config.BASE_URL}/users/me/avatar`, {
			method: 'PATCH',
			headers: config.headers,
			body: JSON.stringify({
				avatar
			})
		})
		return handleResponse(response)
	} catch (err) {
		throw new Error(
			`Request Error EditProfileAvatar: ${err?.status} ${err?.message}`
		)
	}
}
