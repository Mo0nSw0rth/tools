// Binary to decimal
const parent = document.getElementById("tools")
new ToolBuilder("Binary to decimal", "Convert binary to decimal", "Conversion", parent)
    .addInput("Binary", "text", { placeholder: 1011 })
    .addButton("To Decimal", (inputs, result) => {
        let binary = inputs[0].value.replace(" ", "")
        if (!binary.match(/^[0-1]+$/)) {
            result("Invalid input - only binary allowed", true)
            return
        }
        result(parseInt(binary, 2))
    })
    .build()