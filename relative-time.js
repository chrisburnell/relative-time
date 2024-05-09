class RelativeTime extends HTMLElement {
	static register(tagName) {
		if ("customElements" in window) {
			customElements.define(tagName || "relative-time", RelativeTime)
		}
	}

	connectedCallback() {
		if (this.timeElements.length === 0) {
			return
		}

		this.lastUpdate = 0
		this.updateLoop

		this.setString()

		if (this.enableUpdates) {
			this.beginUpdateLoop()
			window.addEventListener("focus", () => {
				this.windowFocusHandler()
			})
			window.addEventListener("blur", () => {
				this.windowBlurHandler()
			})
		}
	}

	getRelativeTime(datetime, division) {
		let difference = (datetime.getTime() - Date.now()) / 1000

		if (division) {
			return this.rtf.format(Math.round(difference), division)
		}

		for (const division of RelativeTime.divisions) {
			if (this.maxDivision && division.name === this.maxDivision.replace(/s$/, "")) {
				return this.rtf.format(Math.round(difference), division.name)
			}
			if (Math.floor(Math.abs(difference)) < division.amount) {
				return this.rtf.format(Math.round(difference), division.name)
			}
			difference /= division.amount
		}
	}

	setString() {
		this.timeElements.forEach((element) => {
			const datetime = new Date(element.getAttribute("datetime"))
			element.innerHTML = this.getRelativeTime(datetime, this.division)
			element.title = `${datetime.toLocaleString()} (local time)`
		})
	}

	beginUpdateLoop() {
		const updateLoop = (currentTime) => {
			this.updateLoop = requestAnimationFrame(updateLoop)
			if (currentTime - this.lastUpdate >= this.update * 1000) {
				this.setString()
				this.lastUpdate = currentTime
			}
		}
		this.updateLoop = requestAnimationFrame(updateLoop)
	}

	stopUpdateLoop() {
		this.lastUpdate = 0
		cancelAnimationFrame(this.updateLoop)
	}

	windowFocusHandler() {
		this.setString()
		this.beginUpdateLoop()
	}

	windowBlurHandler() {
		this.stopUpdateLoop()
	}

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
	]

	static numericFormats = [
		"always",
		"auto",
	]

	static styleFormats = [
		"long",
		"short",
		"narrow",
	]

	get locale() {
		return this.getAttribute("lang") || this.closest("[lang]")?.getAttribute("lang") || (navigator.languages ? navigator.languages[0] : "en")
	}

	get rtf() {
		return new Intl.RelativeTimeFormat(this.locale, {
			localeMatcher: "best fit",
			numeric: this.formatNumeric,
			style: this.formatStyle,
		})
	}

	get timeElements() {
		return this.querySelectorAll("time[datetime]")
	}

	get division() {
		return this.getAttribute("division")
	}

	get maxDivision() {
		return this.getAttribute("max-division")
	}

	get formatNumeric() {
		// default = "auto"
		const numericFormat = this.getAttribute("format-numeric")
		if (numericFormat && RelativeTime.numericFormats.includes(numericFormat)) {
			return numericFormat
		} else if (this.division || this.maxDivision) {
			return "always"
		}
		return "auto"
	}

	get formatStyle() {
		// default = "long"
		const styleFormat = this.getAttribute("format-style")
		if (styleFormat && RelativeTime.styleFormats.includes(styleFormat)) {
			return styleFormat
		}
		return "long"
	}

	get update() {
		// default = 10 minutes
		return this.hasAttribute("update") ? Number(this.getAttribute("update")) : 600
	}

	get enableUpdates() {
		return this.getAttribute("update") !== "false"
	}

}

RelativeTime.register()
