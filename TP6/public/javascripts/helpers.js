function addField(type, name, element) {
    var newInput = document.createElement('input')
    newInput.setAttribute('type', type)
    newInput.setAttribute('name', name)
    newInput.setAttribute('class', "w3-input")
    newInput.setAttribute('class', "w3-round")
    var fieldset = document.getElementById(element)
    fieldset.append(newInput)
}