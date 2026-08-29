export default class RelativeTime extends HTMLElement {
	static define(tagName?: string): void;
	static readonly observedAttributes: readonly string[];
	static readonly divisions: readonly { amount: number; name: string }[];
	static readonly numericFormats: readonly ("auto" | "always")[];
	static readonly styleFormats: readonly ("long" | "short" | "narrow")[];
	readonly locale: string | undefined;
	readonly rtf: Intl.RelativeTimeFormat;
	readonly timeElements: NodeListOf<HTMLTimeElement>;
	readonly division: string | null;
	readonly maxDivision: string | null;
	readonly formatNumeric: "auto" | "always";
	readonly formatStyle: "long" | "short" | "narrow";
	readonly update: number;
	readonly enableUpdates: boolean;
	connectedCallback(): void;
	attributeChangedCallback(
		name: string,
		oldValue: string | null,
		newValue: string | null,
	): void;
	disconnectedCallback(): void;
	controller?: AbortController;
	observer?: MutationObserver;
	getRelativeTime(datetime: Date, division?: string): string | undefined;
	getDateTime(dateString: string): Date | null;
}

export interface RelativeTimeAttributes {
	lang?: string;
	update?: string | number | "false";
	division?: string;
	"max-division"?: string;
	"format-numeric"?: "auto" | "always";
	"numeric-format"?: "auto" | "always";
	"format-style"?: "long" | "short" | "narrow";
	"style-format"?: "long" | "short" | "narrow";
}

declare global {
	interface HTMLElementTagNameMap {
		"relative-time": RelativeTime;
	}
}
