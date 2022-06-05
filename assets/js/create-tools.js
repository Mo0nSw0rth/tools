const parent = document.getElementById("tools")
// Binary to decimal
new ToolBuilder("Binary to decimal", "Convert binary to decimal", "Conversion")
    .addInput("Binary", "text", {placeholder: 1011})
    .addActionButton("To Decimal", (inputs, result) => {
        let binary = inputs["Binary"].value.replace(" ", "")
        if (!binary.match(/^[0-1]+$/)) {
            result("Invalid input - only binary allowed", true)
            return
        }
        result(parseInt(binary, 2))
    })
    .build()

// Decimal to binary
new ToolBuilder("Decimal to binary", "Convert decimal to binary", "Conversion")
    .addInput("Decimal", "text", {placeholder: 501})
    .addActionButton("To Binary", (inputs, result) => {
        let decimal = inputs["Decimal"].value.replace(" ", "")
        if (!decimal.match(/^\d+$/)) {
            result("Invalid input - only decimal allowed", true)
            return
        }
        result(parseInt(decimal).toString(2))
    })
    .build()

// Decimal to hex
new ToolBuilder("Decimal to hex", "Convert decimal to hex", "Conversion")
    .addInput("Decimal", "text", {placeholder: 501})
    .addActionButton("To Hex", (inputs, result) => {
        let decimal = inputs["Decimal"].value.replace(" ", "")
        if (!decimal.match(/^\d+$/)) {
            result("Invalid input - only decimal allowed", true)
            return
        }
        result(parseInt(decimal).toString(16))
    })
    .build()

// Hex to decimal
new ToolBuilder("Hex to decimal", "Convert hex to decimal", "Conversion")
    .addInput("Hex", "text", {placeholder: "ff5a"})
    .addActionButton("To Decimal", (inputs, result) => {
        let hexadecimal = inputs["Hex"].value.replace(" ", "")
        if (!hexadecimal.match(/^[\da-f]+$/)) {
            result("Invalid input - only hexadecimal allowed", true)
            return
        }
        result(parseInt(hexadecimal, 16))
    })
    .build()

// Decode morse
new ToolBuilder("Decode Morse", "Decode Morse Code to text", "Decoding")
    .addInput("Morse", "text", {placeholder: "... .... --- .-. - -.--"})
    .addInput("Short signal", "text", {value: "."})
    .addInput("Long signal", "text", {value: "-"})
    .addInput("Space", "text", {value: "/"})
    .addActionButton("To Text", (inputs, result) => {
        let decodeMorse = (morseCode) => {
            let ref = {
                '.-': 'a', '-...': 'b', '-.-.': 'c', '-..': 'd',
                '.': 'e', '..-.': 'f', '--.': 'g', '....': 'h', '..': 'i',
                '.---': 'j', '-.-': 'k', '.-..': 'l',
                '--': 'm', '-.': 'n', '---': 'o', '.--.': 'p',
                '--.-': 'q', '.-.': 'r', '...': 's', '-': 't',
                '..-': 'u', '...-': 'v', '.--': 'w', '-..-': 'x',
                '-.--': 'y', '--..': 'z', '/': ' ',
                '.----': '1', '..---': '2', '...--': '3', '....-': '4',
                '.....': '5', '-....': '6', '--...': '7', '---..': '8',
                '----.': '9', '-----': '0',
            };
            return morseCode
                .split('   ')
                .map(
                    a => a
                        .split(' ')
                        .map(
                            b => ref[b]
                        ).join('')
                ).join(' ');
        }
        let short = inputs["Short signal"].value
        let long = inputs["Long signal"].value
        let space = inputs["Space"].value
        let morse = inputs["Morse"].value.replaceAll(short, ".").replaceAll(long, "-").replaceAll(space, "/")
        console.log(morse)
        if (!morse.match(/^[.\s\-/]+$/)) {
            result("Invalid input - only morse allowed", true)
            return
        }
        result(decodeMorse(morse))
    })
    .build()

// Encode morse
new ToolBuilder("Encode Morse", "Encode text to Morse Code", "Encoding")
    .addInput("Text", "text", {placeholder: "Shorty really likes flowers"})
    .addInput("Short signal", "text", {value: "."})
    .addInput("Long signal", "text", {value: "-"})
    .addInput("Space", "text", {value: "/"})
    .addActionButton("To Morse", (inputs, result) => {
        let encodeMorse = (morseCode) => {
            let ref = {
                'a': '.-', 'b': '-...', 'c': '-.-.', 'd': '-..',
                'e': '.', 'f': '..-.', 'g': '--.', 'h': '....',
                'i': '..', 'j': '.---', 'k': '-.-', 'l': '.-..',
                'm': '--', 'n': '-.', 'o': '---', 'p': '.--.',
                'q': '--.-', 'r': '.-.', 's': '...', 't': '-',
                'u': '..-', 'v': '...-', 'w': '.--', 'x': '-..-',
                'y': '-.--', 'z': '--..', ' ': '/',
                '1': '.----', '2': '..---', '3': '...--', '4': '....-',
                '5': '.....', '6': '-....', '7': '--...', '8': '---..',
                '9': '----.', '0': '-----',
            };
            return morseCode
                .split('')
                .map((e) => {
                    return ref[e.toLowerCase()] || '';
                })
                .join(' ')
                .replace(/ +/g, ' ');
        }
        let short = inputs["Short signal"].value
        let long = inputs["Long signal"].value
        let space = inputs["Space"].value
        let text = inputs["Text"].value.toLowerCase()
        if (!text.match(/^[a-z\d ]+$/)) {
            result("Invalid input - only text (a-z and digits) allowed", true)
            return
        }
        result(encodeMorse(text).replaceAll(".", short).replaceAll("-", long).replaceAll("/", space))
    })
    .build()

// Generate random number
new ToolBuilder("Random number generator", "Generate a random number", "Generator")
    .addInput("Min", "number", {placeholder: "12", value: 1})
    .addInput("Max", "number", {placeholder: "26", value: 10})
    .addInput("Amount", "number", {placeholder: "1", value: 1})
    .addInput("Decimal", "checkbox")
    .addActionButton("Generate", (inputs, result) => {
        let min = inputs["Min"].value
        let max = inputs["Max"].value
        let amount = inputs["Amount"].value
        if (parseInt(amount) > 1000)
            if (!confirm("This operation can cause lag, do you wish to continue?"))
                return
        if (!(min + max + amount).match(/^\d+$/)) {
            result("Invalid input - only numbers allowed", true)
            return
        }
        let generated = ""
        for (let i = 0; i < parseInt(amount); i++) {
            if (!inputs["Decimal"].checked)
                generated += Math.round(parseInt(min) + Math.random() * (max - 1)) + "\n"
            else
                generated += parseInt(min) + Math.random() * (max - 1) + "\n"
        }
        result(generated)
    })
    .build()

// Generate random string
new ToolBuilder("Random string generator", "Generate a random string of characters", "Generator")
    .addInput("Length", "number", {placeholder: "10", value: 10})
    .addInput("Amount", "number", {placeholder: "1", value: 1})
    .addInput("Custom characters", "text", {placeholder: "abcdefghijklmnopqrstuvwxyz"})
    .addInput("Use custom characters", "checkbox")
    .addLoaderButton("Load password preset", (inputs, result) => {
        inputs["Length"].value = 16
        inputs["Custom characters"].value = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVXYZ0123456789~`! @#$%^&*()_-+={[}]|\\:;\"'<,>.?/"
        inputs["Use custom characters"].checked = true
    })
    .addActionButton("Generate", (inputs, result) => {
        let custom = inputs["Custom characters"].value
        let length = inputs["Length"].value
        let amount = inputs["Amount"].value
        if (parseInt(amount) > 100 || parseInt(length) > 10000)
            if (!confirm("This operation can cause lag, do you wish to continue?"))
                return
        if (!custom && inputs["Use custom characters"].checked) {
            result("(Custom characters) Invalid input - can't be empty", true)
            return
        }
        if (!(amount + length).match(/^\d+$/)) {
            result("(Length/Amount) Invalid input - only numbers allowed", true)
            return
        }
        let default_set = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVXYZ"
        let generated = ""
        for (let i = 0; i < parseInt(amount); i++) {
            let str = ""
            for (let j = 0; j < parseInt(length); j++) {
                if (!inputs["Use custom characters"].checked)
                    str += default_set.split("").at(Math.random() * default_set.length)
                else
                    str += custom.split("").at(Math.random() * custom.length)
            }
            generated += str + "\n"
        }
        result(generated)
    })
    .build()

loadAll(parent)