/**
 * @tag relative-time
 * @summary A Web Component to display a relative time (e.g. "5 minutes ago", "in 2 days"). Uses the built-in Intl.RelativeTimeFormat API.
 * @attr {string} lang - Language code to control locale formatting.
 * @attr {number} update - How often to refresh the displayed time in seconds. Defaults to 600.
 * @attr {string} division - Force a specific unit (e.g. "minute", "hour").
 * @attr {string} max-division - Maximum unit allowed when formatting.
 * @attr {string} format-numeric - Determines numeric display ("auto" or "always").
 * @attr {string} numeric-format - Alias for `format-numeric`.
 * @attr {string} format-style - Determines style ("long", "short", "narrow").
 * @attr {string} style-format - Alias for `format-style`.
 */
export default class RelativeTime extends HTMLElement {
	/**
	 * @param {string} [tagName="relative-time"]
	 */
	static define(tagName) {
		if ("customElements" in window) {
			customElements.define(tagName || "relative-time", RelativeTime);
		}
	}

	/**
	 * @inheritdoc
	 */
	connectedCallback() {
		if (this.timeElements.length === 0) {
			return;
		}

		this.updateLoop;

		this.#setString();

		if (this.enableUpdates) {
			this.#beginUpdateLoop();
			const { signal } = (this.controller = new AbortController());
			window.addEventListener(
				"focus",
				() => {
					this.#windowFocusHandler();
				},
				{ signal },
			);
			window.addEventListener(
				"blur",
				() => {
					this.#windowBlurHandler();
				},
				{ signal },
			);
		}

		if (typeof MutationObserver === "function") {
			this.observer = new MutationObserver(
				this.#handleMutations.bind(this),
			);
			this.#observeDateTimes();
		}
	}

	/**
	 * @inheritdoc
	 */
	attributeChangedCallback() {
		this.#setString();
	}

	/**
	 * @inheritdoc
	 */
	disconnectedCallback() {
		if (this.controller) {
			this.controller.abort();
		}
		if (this.observer) {
			this.observer.disconnect();
		}
	}

	/**
	 * @type {string[]}
	 * @readonly
	 */
	static observedAttributes = [
		"lang",
		"update",
		"division",
		"max-division",
		"format-numeric",
		"numeric-format",
		"format-style",
		"style-format",
	];

	/**
	 * @type {{ amount: number, name: string }[]}
	 * @readonly
	 */
	static divisions = [
		{
			amount: 60,
			name: "second",
		},
		{
			amount: 60,
			name: "minute",
		},
		{
			amount: 24,
			name: "hour",
		},
		{
			amount: 7,
			name: "day",
		},
		{
			amount: 4.34524,
			name: "week",
		},
		{
			amount: 12,
			name: "month",
		},
		{
			amount: Number.POSITIVE_INFINITY,
			name: "year",
		},
	];

	/**
	 * @type {string[]}
	 * @readonly
	 */
	static numericFormats = ["always", "auto"];

	/**
	 * @type {string[]}
	 * @readonly
	 */
	static styleFormats = ["long", "short", "narrow"];

	/**
	 * @type {string|undefined}
	 * @readonly
	 */
	get locale() {
		return (
			this.getAttribute("lang") ||
			this.closest("[lang]")?.getAttribute("lang") ||
			undefined
		);
	}

	/**
	 * @type {Intl.RelativeTimeFormat}
	 * @readonly
	 */
	get rtf() {
		return new Intl.RelativeTimeFormat(this.locale, {
			localeMatcher: "best fit",
			numeric: this.formatNumeric,
			style: this.formatStyle,
		});
	}

	/**
	 * @type {NodeList}
	 * @readonly
	 */
	get timeElements() {
		return this.querySelectorAll("time[datetime]");
	}

	/**
	 * @type {string|null}
	 * @readonly
	 */
	get division() {
		return this.getAttribute("division");
	}

	/**
	 * @type {string|null}
	 * @readonly
	 */
	get maxDivision() {
		return this.getAttribute("max-division");
	}

	/**
	 * @type {string}
	 * @readonly
	 */
	get formatNumeric() {
		// default = "auto"
		const numericFormat =
			this.getAttribute("format-numeric") ||
			this.getAttribute("numeric-format");
		if (
			numericFormat &&
			RelativeTime.numericFormats.includes(numericFormat)
		) {
			return numericFormat;
		} else if (this.division || this.maxDivision) {
			return "always";
		}
		return "auto";
	}

	/**
	 * @type {string}
	 * @readonly
	 */
	get formatStyle() {
		// default = "long"
		const styleFormat =
			this.getAttribute("format-style") ||
			this.getAttribute("style-format");
		if (styleFormat && RelativeTime.styleFormats.includes(styleFormat)) {
			return styleFormat;
		}
		return "long";
	}

	/**
	 * @type {number}
	 * @readonly
	 */
	get update() {
		// default = 600 seconds = 10 minutes
		return this.hasAttribute("update")
			? Number(this.getAttribute("update"))
			: 600;
	}

	/**
	 * @type {boolean}
	 * @readonly
	 */
	get enableUpdates() {
		return this.getAttribute("update") !== "false";
	}

	/**
	 * @returns {void}
	 * @private
	 */
	#observeDateTimes() {
		this.timeElements.forEach((timeElement) => {
			this.observer.observe(timeElement, {
				attributes: true,
				attributeFilter: ["datetime"],
			});
		});
	}

	/**
	 * @returns {void}
	 * @private
	 */
	#handleMutations() {
		this.#setString();
	}

	/**
	 * @returns {void}
	 * @private
	 */
	#setString() {
		this.timeElements.forEach((element) => {
			const datetime = this.getDateTime(element.getAttribute("datetime"));
			if (!datetime) {
				return;
			}
			element.innerHTML = this.getRelativeTime(datetime, this.division);
			const title = datetime.toLocaleString(undefined, {
				timeZoneName: "short",
			});
			if (element.title !== title) {
				element.title = title;
			}
		});
	}

	/**
	 * @returns {void}
	 * @private
	 */
	#beginUpdateLoop() {
		this.updateLoop = setInterval(() => {
			this.#setString();
		}, this.update * 1000);
		// Node's Timeout supports unref(); browsers' interval id doesn't,
		// so this is a no-op there and never keeps a page from going idle.
		this.updateLoop.unref?.();
	}

	/**
	 * @returns {void}
	 * @private
	 */
	#stopUpdateLoop() {
		clearInterval(this.updateLoop);
	}

	/**
	 * @returns {void}
	 * @private
	 */
	#windowFocusHandler() {
		this.#setString();
		this.#beginUpdateLoop();
	}

	/**
	 * @returns {void}
	 * @private
	 */
	#windowBlurHandler() {
		this.#stopUpdateLoop();
	}

	/**
	 * @param {Date} datetime
	 * @param {string} [division]
	 * @returns {string|undefined}
	 */
	getRelativeTime(datetime, division) {
		let difference = (datetime.getTime() - Date.now()) / 1000;

		if (division) {
			return this.rtf.format(Math.round(difference), division);
		}

		for (const division of RelativeTime.divisions) {
			if (
				this.maxDivision &&
				division.name === this.maxDivision.replace(/s$/, "")
			) {
				return this.rtf.format(Math.round(difference), division.name);
			}
			if (Math.floor(Math.abs(difference)) < division.amount) {
				return this.rtf.format(Math.round(difference), division.name);
			}
			difference /= division.amount;
		}
	}

	/**
	 * @param {string} dateString
	 * @returns {Date|null}
	 */
	getDateTime(dateString) {
		const datetime = new Date(dateString);
		return !isNaN(datetime) ? datetime : null;
	}
}

if (!new URL(import.meta.url).searchParams.has("nodefine")) {
	RelativeTime.define();
}
