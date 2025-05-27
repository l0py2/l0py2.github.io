'use strict';

function commandPrompt(outputElement, command) {
	const userText = document.createElement('span');
	userText.classList.add('fg-green');
	userText.append('user');
	const hostText = document.createElement('span');
	hostText.classList.add('fg-cyan');
	hostText.append('host');

	outputElement.append(userText, '@', hostText, ` $ ${command}\n`);
}

function clearOutput(outputElement) {
	outputElement.innerHTML = '';
}

function helpCommand(outputElement) {
	outputElement.append('===== HELP =====\n\n');
	outputElement.append('clear  - to clear all text\n');
	outputElement.append('help   - to get help\n');
	outputElement.append('about  - to know more about this page\n');
	outputElement.append('lfetch - to know more about me\n');
}

function aboutCommand(outputElement) {
	const sourceLink = document.createElement('a');
	sourceLink.setAttribute('href', 'https://github.com/l0py2/l0py2.github.io');
	sourceLink.setAttribute('target', '_blank');
	sourceLink.append('l0py2.github.io');

	outputElement.append('===== ABOUT =====\n\n');
	outputElement.append('Repository - ', sourceLink, '\n');
}

function lfetchCommand(outputElement) {
	const githubLink = document.createElement('a');
	githubLink.setAttribute('href', 'https://github.com/l0py2');
	githubLink.setAttribute('target', '_blank');
	githubLink.append('l0py2');
	const emailLink = document.createElement('a');
	emailLink.setAttribute('href', 'mailto:l0py2.contact@gmail.com');
	emailLink.append('l0py2.contact@gmail.com');

	outputElement.append('\n');
	outputElement.append(' ||    ||===== It\'s life\n');
	outputElement.append(' ||    ||      \n');
	outputElement.append(' ||    ||===== Github  - ', githubLink, '\n');
	outputElement.append(' ||    ||      Discord - l0py2@l0py2\n');
	outputElement.append(' ===== ||      Email   - ', emailLink, '\n\n');
	outputElement.append('Favourite programming language: C\n\n');
	outputElement.append('What I like:\n');
	outputElement.append('- Lemons\n');
	outputElement.append('- Potatoes\n');
	outputElement.append('- Computers\n');
	outputElement.append('- Minecraft\n');
	outputElement.append('- Automation games\n');
	outputElement.append('- Anime\n');
	outputElement.append('- Vocaloid\n');
	outputElement.append('- Breakbeat\n');
}

function invalidCommand(outputElement, command) {
	const text = document.createElement('span');
	text.classList.add('fg-red');
	outputElement.append(text);

	text.append(`Command "${command}" not found\n`);
	text.append('Use "help" to get help\n');
}

function submitCommand(outputElement, inputElement) {
	const command = inputElement.value;
	inputElement.value = '';

	commandPrompt(outputElement, command);

	switch(command) {
		case 'clear':
			clearOutput(outputElement);
			break;
		case 'help':
			helpCommand(outputElement);
			break;
		case 'about':
			aboutCommand(outputElement);
			break;
		case 'lfetch':
			lfetchCommand(outputElement);
			break;
		default:
			invalidCommand(outputElement, command);
	}
}

(async () => {
	const output = document.querySelector('#output');

	if(output == null) {
		throw new Error('output element not found');
	}

	const commandInput = document.querySelector('input[name="command"]');

	if(commandInput == null) {
		throw new Error('command input not found');
	}

	const commandSubmit = document.querySelector('button[type="submit"]');

	if(commandSubmit == null) {
		throw new Error('command submit button not found');
	}

	commandInput.addEventListener('keyup', event => {
		if(event.key == 'Enter') {
			submitCommand(output, commandInput);
		}
	});
	commandSubmit.addEventListener('click', event => {
		submitCommand(output, commandInput);
	});
})();
