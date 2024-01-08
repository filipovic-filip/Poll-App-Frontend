export function checkEmptyFormFields(obj, skipFields = []) {
	let errMessage = ""

	for (const fieldName in obj) {
		if (skipFields.includes(fieldName)) {
			continue
		}
		
		let val = obj[fieldName]
		if (val === null || val.length == 0) {
			errMessage += `${fieldName} can't be empty\n`
		}
	}

	return errMessage
}

export function replaceUrlParams(url, params) {
	let newUrl = url

	for (let [paramName, paramVal] of Object.entries(params)) {
		newUrl = newUrl.replaceAll(`:${paramName}`, paramVal)
	}

	return newUrl
}