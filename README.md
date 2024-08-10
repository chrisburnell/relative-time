# `<relative-time>`

A Web Component to display a relative time.

**[Demo](https://chrisburnell.github.io/relative-time/demo.html)** | **[Further reading](https://chrisburnell.com/relative-time/)**

## Usage

### General usage example

```html
<script type="module" src="relative-time.js"></script>

<relative-time><time datetime="2024-04-09T00:00:00+14:00">9 April 2024</time></relative-time>
```

### Explicit locale

```html
<script type="module" src="relative-time.js"></script>

<relative-time lang="fr"><time datetime="2024-04-09T00:00:00+14:00">9 April 2024</time></relative-time>
```

### Inherited locale

```html
<script type="module" src="relative-time.js"></script>

<p lang="fr">
    <relative-time><time datetime="2024-04-09T00:00:00+14:00">9 April 2024</time></relative-time>
</p>
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

<!-- Always format using seconds -->
<relative-time division="second"><time datetime="2024-04-09T00:00:00+14:00">9 April 2024</time></relative-time>
```

### Maximum division

```html
<script type="module" src="relative-time.js"></script>

<!-- Format using seconds up to minutes -->
<relative-time max-division="minute"><time datetime="2024-04-09T00:00:00+14:00">9 April 2024</time></relative-time>
```

### Numeric format

```html
<script type="module" src="relative-time.js"></script>

<!-- Automatically choose when to use numbers vs. words in formatting -->
<relative-time format-numeric="auto"><time datetime="2024-04-09T00:00:00+14:00">9 April 2024</time></relative-time>

<!-- Always use numbers in time formatting -->
<relative-time format-numeric="always"><time datetime="2024-04-09T00:00:00+14:00">9 April 2024</time></relative-time>
```

### Style format

```html
<script type="module" src="relative-time.js"></script>

<!-- Long formatting (e.g. 1 second) -->
<relative-time format-style="long"><time datetime="2024-04-09T00:00:00+14:00">9 April 2024</time></relative-time>

<!-- Short formatting (e.g. 1 sec.) -->
<relative-time format-style="short"><time datetime="2024-04-09T00:00:00+14:00">9 April 2024</time></relative-time>

<!-- Narrow formatting (e.g. 1s) -->
<relative-time format-style="narrow"><time datetime="2024-04-09T00:00:00+14:00">9 April 2024</time></relative-time>
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
