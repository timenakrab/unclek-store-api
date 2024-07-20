module.exports = {
	parser: '@typescript-eslint/parser',
	extends: [
		'plugin:@typescript-eslint/recommended',
		'plugin:prettier/recommended',
		'plugin:import/errors',
		'plugin:import/warnings',
		'plugin:import/typescript',
	],
	plugins: ['@typescript-eslint', 'import', 'simple-import-sort'],
	parserOptions: {
		ecmaVersion: 2020,
		sourceType: 'module',
	},
	rules: {
		'@typescript-eslint/no-unused-vars': 'warn',
		'simple-import-sort/imports': 'error',
		'simple-import-sort/exports': 'error',
		'import/first': 'error',
		'import/newline-after-import': 'error',
		'import/no-duplicates': 'error',
		'@typescript-eslint/no-namespace': [2, { allowDeclarations: true }],
		'@typescript-eslint/no-explicit-any': 'ignore',
	},
};
