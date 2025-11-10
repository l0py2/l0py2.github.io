'use strict';

const terminalColors = {
	black: 'color0',
	red: 'color1',
	green: 'color2',
	yellow: 'color3',
	blue: 'color4',
	pink: 'color5',
	teal: 'color6',
	white: 'color7'
}

function colorText(text, color) {
	const coloredText = document.createElement('span');

	coloredText.style.color = `var(--term-${color})`;

	if (text) {
		coloredText.append(text);
	}

	return coloredText;
}

function commandPrompt(outputElement, command) {
	const userText = colorText('user', terminalColors.green);
	const hostText = colorText('host', terminalColors.blue);

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
	const text = colorText('', terminalColors.red);
	text.append(`Command "${command}" not found\n`);
	text.append('Use "help" to get help\n');

	outputElement.append(text);
}

function submitCommand(outputFrame, outputElement, inputElement) {
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

	outputFrame.scroll({
		top: outputFrame.scrollHeight,
		left: 0,
		behavior: 'auto'
	});
}

(async () => {
	const outputFrame = document.querySelector('div.terminal-output');

	if(outputFrame == null) {
		throw new Error('output frame not found');
	}

	const output = document.querySelector('pre.terminal-output');

	if(output == null) {
		throw new Error('output element not found');
	}

	const commandInput = document.querySelector('input.terminal-input');

	if(commandInput == null) {
		throw new Error('command input not found');
	}

	const commandSubmit = document.querySelector('button.terminal-input');

	if(commandSubmit == null) {
		throw new Error('command submit button not found');
	}

	commandInput.addEventListener('keyup', event => {
		if(event.key == 'Enter') {
			submitCommand(outputFrame, output, commandInput);
		}
	});
	commandSubmit.addEventListener('click', event => {
		submitCommand(outputFrame, output, commandInput);
	});
})();
