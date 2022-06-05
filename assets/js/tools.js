class ToolBuilder {

    inputs = []
    buttons = []

    constructor(name, description, type, parent) {
        let domToolDiv = document.createElement("div")
        domToolDiv.className = "listed-tool"
        let domToolTitleDiv = document.createElement("div")
        this.name = name
        this.description = description
        this.toolDiv = domToolDiv
        let domTag = document.createElement("span")
        domTag.className = "tag"
        domTag.innerText = type
        let domTitle = document.createElement("span")
        domTitle.innerText = name
        let domDesc = document.createElement("span")
        domDesc.innerText = description
        domDesc.className = "description"
        domToolTitleDiv.appendChild(domTag)
        domToolTitleDiv.appendChild(domTitle)
        domToolTitleDiv.appendChild(domDesc)
        domToolDiv.appendChild(domToolTitleDiv)
        parent.appendChild(domToolDiv)
    }

    addInput = (label, type, attributes) => {
        this.inputs.push({
            name: label,
            type: type,
            attributes: attributes
        })
        return this
    }

    addButton = (text, logic) => {
        this.buttons.push({
            text: text,
            onClick: logic
        })
        return this
    }

    build = () => {
        let domResultDiv = document.createElement("div")
        domResultDiv.className = "tool flex flex-col items-start"
        let domResult = document.createElement("span")
        let domInputDiv = document.createElement("div")
        domInputDiv.className = "flex flex-row"
        this.inputs.forEach((input) => {
            let domInputIDiv = document.createElement("div")
            domInputIDiv.className = "flex flex-col items-start input-i"
            let domLabel = document.createElement("label")
            domLabel.innerText = input.name
            domLabel.className = "input-label"
            domLabel["for"] = input.type

            let domInput = document.createElement("input")
            domInput.className = "input-real"
            domInput.name = input.type
            domInput.type = input.type
            Object.keys(input.attributes).forEach((attr) => {
                domInput[attr] = input.attributes[attr]
            })
            domInputIDiv.appendChild(domLabel)
            domInputIDiv.appendChild(domInput)
            domInputDiv.appendChild(domInputIDiv)
        })
        domResultDiv.appendChild(domInputDiv)
        domResultDiv.appendChild(domResult)
        this.buttons.forEach((button) => {
            let domButton = document.createElement("button")
            domButton.innerText = button.text
            domButton.className = "button-slim"
            domButton.onclick = () => {
                let elements = [...this.toolDiv.getElementsByTagName("input")]
                button.onClick(elements.filter(e => e.tagName === "INPUT"), (result, error) => {
                    if (typeof result === "string" || typeof result == "number" || !result) {
                        let resultText = result
                        result = document.createElement("p")
                        result.innerText = resultText
                    }
                    if (domResult.hasChildNodes()) {
                        domResult.removeChild(domResult.firstChild)
                    }
                    if (error) {
                        result.setAttribute("error", "true")
                    }
                    result.className = "result break-all"
                    domResult.appendChild(result)
                })
            }
            domResultDiv.appendChild(domButton)
        })
        this.toolDiv.appendChild(domResultDiv)
        this.toolDiv.firstChild.onclick = () => {
            let open = domResultDiv.attributes.open
            open = !open
            domResultDiv.attributes.open = open
            domResultDiv.style.display = open ? "flex" : "none"
        }
    }
}