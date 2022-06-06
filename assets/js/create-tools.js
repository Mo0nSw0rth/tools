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
new ToolBuilder("Random number generator", "Generate a random number", "Random")
    .addInput("Min", "number", {placeholder: "12", value: 1})
    .addInput("Max", "number", {placeholder: "26", value: 10})
    .addInput("Amount", "number", {placeholder: "1", value: 1})
    .addInput("Decimal", "checkbox")
    .addLoaderButton("Preset: Dice", (inputs) => {
        inputs["Min"].value = "1"
        inputs["Max"].value = "6"
        inputs["Amount"].value = "1"
        inputs["Decimal"].checked = false
    })
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
new ToolBuilder("Random string generator", "Generate a random string of characters", "Random")
    .addInput("Length", "number", {placeholder: "10", value: 10})
    .addInput("Amount", "number", {placeholder: "1", value: 1})
    .addInput("Custom characters", "text", {placeholder: "abcdefghijklmnopqrstuvwxyz"})
    .addInput("Use custom characters", "checkbox")
    .addLoaderButton("Preset: Password", (inputs) => {
        inputs["Length"].value = 16
        inputs["Custom characters"].value = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVXYZ0123456789~`! @#$%^&*()_-+={[}]|\\:;\"'<,>.?/"
        inputs["Use custom characters"].checked = true
    })
    .addLoaderButton("Preset: A-Z", (inputs) => {
        inputs["Custom characters"].value = "ABCDEFGHIJKLMNOPQRSTUVXYZ"
        inputs["Use custom characters"].checked = true
    })
    .addLoaderButton("Preset: a-z", (inputs) => {
        inputs["Custom characters"].value = "abcdefghijklmnopqrstuvwxyz"
        inputs["Use custom characters"].checked = true
    })
    .addLoaderButton("Preset: a-Z0-9", (inputs) => {
        inputs["Custom characters"].value = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVXYZ0123456789"
        inputs["Use custom characters"].checked = true
    })
    .addLoaderButton("Preset: 0-9", (inputs) => {
        inputs["Custom characters"].value = "0123456789"
        inputs["Use custom characters"].checked = true
    })
    .addLoaderButton("Preset: Hex", (inputs) => {
        inputs["Custom characters"].value = "0123456789abcdef"
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

// IPv6 shortener
new ToolBuilder("IPv6 shortener", "Short an IPv6 address", "Networking")
    .addInput("IPv6 address", "text", {placeholder: "2001:3fac:9e5b:0000:0000:3311:0312:da61"})
    .addActionButton("Shorten", (inputs, result) => {
        let ipv6 = inputs["IPv6 address"].value.replace(" ", "")
        if (!ipv6.match(/(?:^|(?<=\s))(([\da-fA-F]{1,4}:){7}[\da-fA-F]{1,4}|([\da-fA-F]{1,4}:){1,7}:|([\da-fA-F]{1,4}:){1,6}:[\da-fA-F]{1,4}|([\da-fA-F]{1,4}:){1,5}(:[\da-fA-F]{1,4}){1,2}|([\da-fA-F]{1,4}:){1,4}(:[\da-fA-F]{1,4}){1,3}|([\da-fA-F]{1,4}:){1,3}(:[\da-fA-F]{1,4}){1,4}|([\da-fA-F]{1,4}:){1,2}(:[\da-fA-F]{1,4}){1,5}|[\da-fA-F]{1,4}:((:[\da-fA-F]{1,4}){1,6})|:((:[\da-fA-F]{1,4}){1,7}|:)|fe80:(:[\da-fA-F]{0,4}){0,4}%[\da-zA-Z]+|::(ffff(:0{1,4})?:)?((25[0-5]|(2[0-4]|1?\d)?\d)\.){3}(25[0-5]|(2[0-4]|1?\d)?\d)|([\da-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1?\d)?\d)\.){3}(25[0-5]|(2[0-4]|1?\d)?\d))(?=\s|$)/)) {
            result("Invalid input - only IPv6 allowed", true)
            return
        }
        result(ipv6.replace(/(^|:)0+(?!:|$)/g, "$1").replace(/(:(?:0:){2,})(?!\S*\10:)/, "::"))
    })
    .build()

// Random color
new ToolBuilder("Random color", "Randomly generate a color", "Random")
    .addActionButton("Generate", (__, result) => {
        let randomColor = () => {
            let str = ""
            let set = "0123456789abcdef"
            for (let i = 0; i < 6; i++) {
                str += set.split("").at(Math.random() * set.length)
            }
            return str
        }
        let containingDiv = document.createElement("div")
        let color = document.createElement("span")
        let hexColor = "#" + randomColor()
        let c = hexColor.substring(1);
        let rgb = parseInt(c, 16);
        let r = (rgb >> 16) & 0xff;
        let g = (rgb >>  8) & 0xff;
        let b = (rgb >>  0) & 0xff;
        let luma = 0.2126 * r + 0.7152 * g + 0.0722 * b;
        if (luma < 40)
            color.style.color = "#fff"
        color.innerText = hexColor
        color.style.backgroundColor = hexColor
        color.style.padding = "20px 20px"
        containingDiv.appendChild(color)
        containingDiv.style.display = "flex"
        containingDiv.style.margin = "3"
        containingDiv.style.padding = "0"
        result(containingDiv)
    })
    .build()

// Generate true or false
new ToolBuilder("True or false", "Get true or false", "Util")
    .addActionButton("Generate", (__, result) => {
        result(Math.random() > .5 ? "True" : "False")
    })
    .build()

// Binary to ASCII
new ToolBuilder("Binary to ASCII", "Convert Binary to ASCII", "Conversion")
    .addInput("Binary", "textarea", {placeholder: "01100111 01101111 01101111 01100100"})
    .addActionButton("To ASCII", (inputs, result) => {
        let binary = inputs["Binary"].value
        let bin = binary.split(" ")
        let binCode = []
        for (let i = 0; i < bin.length; i++) {
            binCode.push(String.fromCharCode(parseInt(bin[i], 2)))
        }
        result(binCode.join(""))
    })
    .build()

// SHA256 Hash
new ToolBuilder("SHA256 Hash", "Hash a string with SHA256", "Hashing")
    .addInput("Text", "text", {placeholder: "Shorty"})
    .addActionButton("Hash", (inputs, result) => {
        let text = inputs["Text"].value
        hash("SHA-256", text).then(hash => {
            result(hash)
        })
    })
    .build()

// SHA512 Hash
new ToolBuilder("SHA512 Hash", "Hash a string with SHA512", "Hashing")
    .addInput("Text", "text", {placeholder: "Shorty"})
    .addActionButton("Hash", (inputs, result) => {
        let text = inputs["Text"].value
        hash("SHA-512", text).then(hash => {
            result(hash)
        })
    })
    .build()

// Random item picker
new ToolBuilder("Random item picker", "Pick a random item from a list", "Random")
    .addInput("List of items", "textarea", {placeholder: "First\nSecond\nThird"})
    .addActionButton("Random item", (inputs, result) => {
        let items = inputs["List of items"].value.split("\n").filter(s => s !== "")
        result(items.at(Math.random() * items.length))
    })
    .build()

async function hash(algorithm, message) {
    const msgBuffer = new TextEncoder().encode(message);
    const hashBuffer = await crypto.subtle.digest(algorithm, msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));

    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

loadAll(parent)