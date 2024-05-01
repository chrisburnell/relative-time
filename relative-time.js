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
		console.log("connected callback")
		if (this.timeElements.length === 0) {
			return
		}

		this.division = this.getAttribute("division")
		this.maxDivision = this.getAttribute("max-division")
		this.update = this.hasAttribute("update") ? Number(this.getAttribute("update")) : 600 // 600 * 1000 = 10 minutes
		this.lastUpdate = 0
		this.enableUpdates = this.getAttribute("update") !== "false"
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

	get timeElements() {
		return this.querySelectorAll("time[datetime]")
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
}

RelativeTime.register()
