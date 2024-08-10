import { parseHTML } from "linkedom";
import assert from "node:assert/strict";
import { afterEach, before, describe, it } from "node:test";

describe("<relative-time> Web Component", () => {
	let window, document, customElements, HTMLElement, DocumentFragment, Event;

	const now = new Date();
	const defaultBody = `<relative-time><time datetime="${now.toISOString()}">${now.toISOString()}</time></relative-time>`;

	before(async () => {
		window = global.window = parseHTML(`
			<!DOCTYPE html>
			<html lang="en">
				<body>
					${defaultBody}
				</body>
			</html>
		`);
		DocumentFragment = global.DocumentFragment = window.DocumentFragment;
		document = global.document = window.document;
		customElements = global.customElements = window.customElements;
		Event = global.Event = window.Event;
		HTMLElement = global.HTMLElement = window.HTMLElement;

		await import("./relative-time.js");
	});

	afterEach(() => {
		document.body.innerHTML = defaultBody;
	});

	it("Should be defined in the customElements registry", () => {
		assert.strictEqual(!!customElements.get("relative-time"), true);
	});

	it("Should modify the innerHTML of children <time> elements", () => {
		const timeElement = document.querySelector("time");

		assert.notStrictEqual(timeElement.innerHTML, now.toISOString());
	});

	it("Should set a localized datetime to <time> elements’ title attribute", () => {
		const timeElement = document.querySelector("time");

		assert.strictEqual(!!timeElement.getAttribute("title"), true);
	});

	it("Should be able to use a specific division", () => {
		const customElement = document.querySelector("relative-time");
		customElement.setAttribute("division", "seconds");

		const timeElement = document.querySelector("time");

		assert.strictEqual(/second/.test(timeElement.innerHTML), true);
	});

	it("Should be able to use a maximum division", () => {
		const customElement = document.querySelector("relative-time");
		customElement.setAttribute("max-division", "seconds");

		const timeElement = document.querySelector("time");

		assert.strictEqual(/second/.test(timeElement.innerHTML), true);
	});

	it("Should be able to force a numeric format", () => {
		const yesterday = new Date();
		yesterday.setDate(new Date().getDate() - 1);
		document.body.innerHTML = `<relative-time format-numeric="always"><time datetime="${yesterday.toISOString()}">${yesterday.toISOString()}</time></relative-time>`;

		const timeElement = document.querySelector("time");

		assert.strictEqual(/\d+/.test(timeElement.innerHTML), true);
	});

	it("Should be able to force a long style format", () => {
		const recent = new Date(new Date().getTime() - 10000);
		document.body.innerHTML = `<relative-time format-style="long"><time datetime="${recent}">${recent}</time></relative-time>`;

		const timeElement = document.querySelector("time");

		assert.strictEqual(/\d+ second/.test(timeElement.innerHTML), true);
	});

	it("Should be able to force a short style format", () => {
		const recent = new Date(new Date().getTime() - 10000);
		document.body.innerHTML = `<relative-time format-style="short"><time datetime="${recent}">${recent}</time></relative-time>`;

		const timeElement = document.querySelector("time");

		assert.strictEqual(/\d+ sec\./.test(timeElement.innerHTML), true);
	});

	it("Should be able to force a narrow style format", () => {
		const recent = new Date(new Date().getTime() - 10000);
		document.body.innerHTML = `<relative-time format-style="narrow"><time datetime="${recent}">${recent}</time></relative-time>`;

		const timeElement = document.querySelector("time");

		assert.strictEqual(/\d+s\s/.test(timeElement.innerHTML), true);
	});
});
