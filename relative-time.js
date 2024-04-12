class RelativeTime extends HTMLElement {
	static register(tagName) {
		if ("customElements" in window) {
			customElements.define(tagName || "relative-time", RelativeTime)
		}
	}

	static locale = document.querySelector("html").getAttribute("lang") || navigator.languages ? navigator.languages[0] : "en"

	static rtf = new Intl.RelativeTimeFormat(RelativeTime.locale, {
		localeMatcher: "best fit",
		numeric: "always",
		style: "long",
	})

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

	connectedCallback() {
		this.timeElements = [...this.querySelectorAll("time[datetime]")]

		if (this.timeElements.length === 0) {
			return
		}

		this.interval

		if (!this.initialized) {
			this.init()
		}
	}

	init() {
		this.initialized = true

		this.update = this.hasAttribute("update") ? Number(this.getAttribute("update")) : 600 // 600 * 1000 = 10 minutes
		this.enableUpdates = this.getAttribute("update") !== "false"
		this.division = this.getAttribute("division")
		this.maxDivision = this.getAttribute("max-division")

		this.setString()

		if (this.enableUpdates) {
			this.beginInterval()
			window.addEventListener("focus", () => {
				this.windowFocusHandler()
			})
			window.addEventListener("blur", () => {
				this.stopInterval()
			})
		}
	}

	getRelativeTime(datetime, division) {
		let difference = (datetime.getTime() - Date.now()) / 1000

		if (division) {
			return RelativeTime.rtf.format(Math.round(difference), division)
		}

		for (const division of RelativeTime.divisions) {
			if (this.maxDivision && division.name === this.maxDivision) {
				return RelativeTime.rtf.format(Math.round(difference), division.name)
			}
			if (Math.floor(Math.abs(difference)) < division.amount) {
				return RelativeTime.rtf.format(Math.round(difference), division.name)
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

	beginInterval() {
		this.interval = setInterval(
			() => {
				this.setString()
				this.beginInterval()
			},
			this.update * 1000
		)
	}

	stopInterval() {
		clearInterval(this.interval)
	}

	windowFocusHandler() {
		this.stopInterval()
		this.setString()
		this.beginInterval()
	}
}

RelativeTime.register()
