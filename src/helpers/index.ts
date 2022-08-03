export function flattenObj(obj: any, parent: any = undefined, res: any = {}) {
	for (const key of Object.keys(obj)) {
		const propName = parent ? parent + '.' + key : key;
		if (typeof obj[key] === 'object') {
			flattenObj(obj[key], propName, res);
		} else {
			res[propName] = obj[key];
		}
	}
	return res;
}
