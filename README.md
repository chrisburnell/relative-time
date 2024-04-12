# `<relative-time>`

A Web Component to display an event countdown.

**[Demo](https://chrisburnell.github.io/relative-time/demo.html)** | **[Further reading](https://chrisburnell.com/relative-time/)**

## Usage

### General usage example

```html
<script type="module" src="relative-time.js"></script>

<relative-time><time datetime="2024-04-09T00:00:00+14:00">9 April 2024</time></relative-time>
```

### Update frequency

```html
<script type="module" src="relative-time.js"></script>

<!-- Updates every 1 second -->
<relative-time update="1"><time datetime="2024-04-09T00:00:00+14:00">9 April 2024</time></relative-time>

<!-- Disable updates -->
<relative-time update="false"><time datetime="2024-04-09T00:00:00+14:00">9 April 2024</time></relative-time>
```

### Specific division

```html
<script type="module" src="relative-time.js"></script>

<relative-time division="second"><time datetime="2024-04-09T00:00:00+14:00">9 April 2024</time></relative-time>
```

### Maximum division

```html
<script type="module" src="relative-time.js"></script>

<relative-time max-divions="minute"><time datetime="2024-04-09T00:00:00+14:00">9 April 2024</time></relative-time>
```

## Installation

You have a few options (choose one of these):

1. Install via [npm](https://www.npmjs.com/package/@chrisburnell/relative-time): `npm install @chrisburnell/relative-time`
1. [Download the source manually from GitHub](https://github.com/chrisburnell/relative-time/releases) into your project.
1. Skip this step and use the script directly via a 3rd party CDN (not recommended for production use)

## Usage

Make sure you include the `<script>` in your project (choose one of these):

```html
<!-- Host yourself -->
<script type="module" src="relative-time.js"></script>
```

```html
<!-- 3rd party CDN, not recommended for production use -->
<script
  type="module"
  src="https://www.unpkg.com/@chrisburnell/relative-time/relative-time.js"
></script>
```

```html
<!-- 3rd party CDN, not recommended for production use -->
<script
  type="module"
  src="https://esm.sh/@chrisburnell/relative-time"
></script>
```

## Credit

With thanks to the following people:

- [David Darnes](https://darn.es) for creating this [Web Component repo template](https://github.com/daviddarnes/component-template)
