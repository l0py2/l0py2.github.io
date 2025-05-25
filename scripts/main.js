'use strict';

function appendLetter(element, letter) {
	return new Promise(resolve => {
		setTimeout(() => {
			element.append(letter);

			resolve();
		}, 1);
	});
}

async function appendText(element, lines, className) {
	const resultText = document.createElement('span');
	if(className != null) {
		resultText.classList.add(className);
	}
	element.append(resultText);

	const newBreak = document.createElement('hr');
	element.append(newBreak);

	for(const line of lines) {
		const newParagraph = document.createElement('p');
		resultText.append(newParagraph);

		for(const letter of line) {
			await appendLetter(resultText, letter);
		}
	}
}

function appendCommand(element, command) {
	const newLine = document.createElement('p');
	element.append(newLine);

	const promptText = document.createElement('span');
	promptText.classList.add('fg-blue');
	newLine.append(promptText);

	promptText.append('user@host $ ');
	newLine.append(command);
}

function clear(element) {
	element.innerHTML = '';
}

async function help(element) {
	await appendText(
		element,
		[
			'===== HELP =====',
			'clear - To clear all text',
			'help  - For help',
			'fetch - Fetch information about me'
		],
		null
	);
}

async function fetchAbout(element) {
	await appendText(
		element,
		[
			'===============',
			' My name: l0py2',
			'==============='
		],
		null
	);
}

async function invalidCommand(element, command) {
	await appendText(
		element,
		[
			`Command "${command}" not found`,
			'Use "help" to get help'
		],
		'fg-red'
	);
}

async function runCommand(element, command) {
	appendCommand(element, command);

	switch(command) {
		case 'clear':
			clear(element);
			break;
		case 'help':
			help(element);
			break;
		case 'fetch':
			fetchAbout(element);
			break;
		default:
			invalidCommand(element, command);
	}
}

function submitHandler(element, commandInput) {
	runCommand(element, commandInput.value);
	commandInput.value = '';
}

(async () => {
	const main = document.querySelector('main');

	if(main == null) {
		return;
	}

	const commandInput = document.querySelector('input[name="command"]');

	if(commandInput == null) {
		return;
	}

	const submitButton = document.querySelector('button[type="submit"]');

	if(submitButton == null) {
		return;
	}

	submitButton.addEventListener('click', event => submitHandler(main, commandInput));
	commandInput.addEventListener('keyup', event => {
		if(event.key ==  'Enter') {
			submitHandler(main, commandInput);
		}
	});
})();
