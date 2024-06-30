# Snap Popup

Snap Popup is a JavaScript library for creating stylish and customizable popups. With minimal setup, you can easily integrate popups into your web applications.

## Features

- Easy to use with minimal setup
- Customizable popup content
- Includes built-in support for headers, details, footers, and buttons
- Automatic and manual close options
- Style and animation customization

## Installation

To use Snap Popup, simply include the JavaScript file in your project:

```html
<script src="path/to/snap-popup.js"></script>

```
## Way to use

```javascript
snap.spark({
    header: "Hello World",
    details: "This is a simple popup example.",
    okButton: true,
    okButtonText: "Close"
});

```

| Option                 | Type        | Default   | Description                                                             |
|------------------------|-------------|-----------|-------------------------------------------------------------------------|
| `header`               | `string`    | `""`      | The header text of the popup.                                           |
| `details`              | `string`    | `""`      | The detailed message or description of the popup.                       |
| `type`                 | `string`    | `""`      | The type of popup (e.g., "success", "error").                           |
| `autoclose`            | `number`    | `0`       | The time in milliseconds after which the popup will automatically close.|
| `closeButton`          | `boolean`   | `true`    | Whether to show a close button on the popup.                            |
| `okButton`             | `boolean`   | `false`   | Whether to show an OK button on the popup.                              |
| `okButtonText`         | `string`    | `"Okay"`  | The text to display on the OK button.                                   |
| `okButtonFunction`     | `function`  | `null`    | The function to execute when the OK button is clicked.                  |
| `cancelButton`         | `boolean`   | `false`   | Whether to show a Cancel button on the popup.                           |
| `cancelButtonText`     | `string`    | `"Cancel"`| The text to display on the Cancel button.                               |
| `cancelButtonFunction` | `function`  | `null`    | The function to execute when the Cancel button is clicked.              |
| `footer`               | `string`    | `""`      | The footer text of the popup.                                           |
| `htmlCode`             | `string`    | `""`      | Custom HTML code to include inside the popup.                           |
| `width`                | `number`    | `450`     | The width of the popup in pixels.                                       |

