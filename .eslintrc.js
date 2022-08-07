module.exports = {
	'env': {
		'browser': true,
		'es2021': true,
	},
	'extends': [
		'plugin:react/recommended',
		'google',
	],
	'parser': '@typescript-eslint/parser',
	'parserOptions': {
		'ecmaFeatures': {
			'jsx': true,
		},
		'ecmaVersion': 'latest',
		'sourceType': 'module',
	},
	'plugins': [
		'react',
		'@typescript-eslint',
	],
	'rules': {
		'require-jsdoc': 0,
		'indent': [1, 'tab'],
		'no-tabs': 0,
		'padded-blocks': 0,
		'no-unused-vars': 0,
	},
};
