# `relative-time`

A Web Component to display an event countdown.

**[Demo](https://chrisburnell.github.io/relative-time/demo.html)** | **[Further reading](https://chrisburnell.com/relative-time/)**

## Usage

### General usage example

```html
<script type="module" src="relative-time.js"></script>

<relative-time name="My event" start="2024-04-09T00:00:00+14:00"></relative-time>
```

### With end point

```html
<script type="module" src="relative-time.js"></script>

<relative-time name="My event" end="2024-04-09T23:59:59-12:00"></relative-time>
```

### Both start and end points

```html
<script type="module" src="relative-time.js"></script>

<relative-time name="My event" start="2024-04-09T00:00:00+14:00" end="2024-04-09T23:59:59-12:00"></relative-time>
```

### Annual events

```html
<script type="module" src="relative-time.js"></script>

<relative-time name="My event" start="2024-04-09T00:00:00+14:00"annual="true"></relative-time>
```

### Update frequency

```html
<script type="module" src="relative-time.js"></script>

<!-- Updates every 1 second -->
<relative-time name="My event" start="2024-04-09T00:00:00+14:00" update="1"></relative-time>

<!-- Disable updates -->
<relative-time name="My event" start="2024-04-09T00:00:00+14:00" update="false"></relative-time>
```

### Specific division

```html
<script type="module" src="relative-time.js"></script>

<relative-time name="My event" start="2024-04-09T00:00:00+14:00" division="second"></relative-time>
```

### Maximum division

```html
<script type="module" src="relative-time.js"></script>

<relative-time name="My event" start="2024-04-09T00:00:00+14:00" max-division="minute"></relative-time>
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
