# Shorty's Tools

This is the GitHub repository for [my tools site](https://tools.shortydev.eu).

## Contribute

Feel free to fork and contribute to the public tools page!
I support all kinds of tools. Please avoid the use of public libraries 

### How to add your own tool

If you add a new tool, the code for the tool has to be added
to [`assets/js/create-tools.js`](https://github.com/ShortyDev/tools/tree/main/assets/js/create-tools.js) following the
convention:

- Product or standard names (like SHA256 or Morse) have to be written in the proper case
- English grammar and spelling has to be correct at all times
- Use a descriptive description
- Use a proper tag and check if a variation that might mean the same already exists

By submitting a pull request, you allow ShortyDev and tools.shortydev.eu to use your tool and potentially modify title, description, tag, content and/or general functionality to a certain point.

## Documentation of ToolBuilder
ToolBuilder is a JS class for my website which allows you to simply create new tools and add them to the site.

### Initialization
ToolBuilder takes 3 arguments when calling the constructor.

`constructor(name, description, type)`

`name` - Name/Title of the tool

`description` - Description of the tools functionality

`type` - Tag of the tool (Generator, Conversion, Encoding, ...)

### Methods
#### ToolBuilder#addInput(label, type, attributes)
Add an input field to the tool.

`label` - The name or label of the input field (Unique)

`type` - Input field type (text, number, ...)

`attributes` - Custom attributes for the input field (placeholder, value, ...)

```js
addInput("Custom characters", "text", { placeholder: "abcdef", value: "abc" })
```

#### ToolBuilder#addLoaderButton(text, logic)
Add a button which populates the input fields with preset values.

`text` - Button text

`logic` - Function which calls with `inputs` at each click

```js
addLoaderButton("Preset: a-z", (inputs) => {
  inputs["Custom characters"].value = "abcdefghijklmnopqrstuvwxyz"
  inputs["Use custom characters"].checked = true
})
```

#### ToolBuilder#addActionButton(text, logic)
Add a button which calls the main function of the tool.

Please try to format and write your checks and function bodies as close to the already existing ones as possible.

`text` - Button text

`logic` - Function which calls with `inputs` and `result` at each click

`result` - A function that can be called with a text (result) and a boolean (whether the process failed)
```js
addActionButton("To Decimal", (inputs, result) => {
  let hexadecimal = inputs["Hex"].value.replace(" ", "")
  if (!hexadecimal.match(/^[\da-f]+$/)) {
    result("Invalid input - only hexadecimal allowed", true)
    return
  }
  result(parseInt(hexadecimal, 16))
})
```

#### ToolBuilder#build()
Build the tool. Nothing has to be done after this step.