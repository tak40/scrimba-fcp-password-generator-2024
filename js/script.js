// DOM ELEMENTS
const toggleThemeBtn = document.getElementById("toggle-theme")
const generatePasswordBtn = document.getElementById("generate-password-btn")
const passwordLengthSlider = document.getElementById("password-length-slider")
const passwordLengthValue = document.getElementById("password-length-value")
const numbersEl = document.getElementById("numbers")
const symbolsEl = document.getElementById("symbols")
const copyButtons = document.querySelectorAll(".app__copy-btn")
const checkboxes = document.querySelectorAll(".app__character-option-input")

// CHARACTER SETS

let alphabets = [..."abcdefghijklmnopqrstuvwxyz"]
alphabets = [...alphabets, ...alphabets.map((letter) => letter.toLocaleUpperCase())]
let numbers = [..."0123456789"]
let symbols = [..."~`!@#$%^&*()-_=+[{]}\\|;:'\",<.>/?"]

// INITIALIZATION

// Initial password length
let passwordLength = 15

let password = []

// Initial character set, starts with alphabets only
let availableCharacters = [...alphabets]

let isToggleThemeBtnClicked = false

// Adjust the font size of the password display based on the initial password length
adjustFontSize(passwordLength)

// EVENT LISTENER

// Toggle theme when button is clicked
toggleThemeBtn.addEventListener("click", handleThemeToggle)

// Password Generation
generatePasswordBtn.addEventListener("click", updatePassword)
passwordLengthSlider.addEventListener("input", handlePasswordLengthChange)

// Character Set Updates
numbersEl.addEventListener("change", function () {
    updateAvailableCharacters(numbersEl, numbers)
})
symbolsEl.addEventListener("change", function () {
    updateAvailableCharacters(symbolsEl, symbols)
})

// Copy password to clipboard when copy icon is clicked
copyButtons.forEach(function (button) {
    button.addEventListener("click", handleCopyClick)
})

// Add keydown listeners to copy buttons and checkboxes
addKeydownListeners()

// CORE FUNCTIONS

// Update the password fields with newly generated passwords
function updatePassword() {
    const allOutputFields = document.querySelectorAll("output")
    allOutputFields.forEach(function (field) {
        field.textContent = generatePassword(passwordLength)
    })
    adjustFontSize(passwordLength)
}

// Generate a password of a given length
function generatePassword(length) {
    // Clear the password array
    password = []

    // Check number and symbol checkboxes to determine the initial characters
    const conditions = {
        bothChecked: numbersEl.checked && symbolsEl.checked,
        onlyNumbersChecked: numbersEl.checked && !symbolsEl.checked,
        onlySymbolsChecked: !numbersEl.checked && symbolsEl.checked,
        noneChecked: !numbersEl.checked && !symbolsEl.checked,
    }

    // Get initial characters based on the conditions
    const initialChars = getinitialChars(conditions)
    console.log(initialChars)

    // Calculate the remaining length of the password
    const remainingLength = length - initialChars.length
    console.log(remainingLength)

    // Generate the remaining characters of the password
    for (let i = 0; i < remainingLength; i++) {
        password.push(availableCharacters[generateRandomIndex()])
    }

    // Combine the initial characters and the remaining password characters
    password = [...initialChars, ...password]
    console.log(password)

    // Shuffle the password array
    password = shuffleArray(password)
    console.log(password)

    // Convert the password array to a string
    return password.join("")

    // let password = []
    // if(numbersEl.checked && symbolsEl.checked){
    //     initialNumberAndSymbol = []
    //     initialNumberAndSymbol.push(generateRandomNumber(), generateRandomSymbol())
    //     console.log(initialNumberAndSymbol)

    //     for (let i = 0; i < length - 2; i++){
    //         password.push(availableCharacters[generateRandomIndex()])
    //     }
    //     password = [...initialNumberAndSymbol, ...password]
    //     console.log(password)
    //     password = shuffleArray(password)
    //     console.log(password)
    //     return password.join('')
    // } else if (numbersEl.checked && !symbolsEl.checked){
    //     console.log("numbers checked but symbols not checked")
    // } else if (!numbersEl.checked && symbolsEl.checked){
    //     console.log("symbols checked but numbers not checked")
    // } else {
    //     console.log("none checked")
    // }
}

// Get initial characters based on the conditions
function getinitialChars(conditions) {
    if (conditions.bothChecked) return [generateRandomNumber(), generateRandomSymbol()]
    if (conditions.onlyNumbersChecked) return [generateRandomNumber()]
    if (conditions.onlySymbolsChecked) return [generateRandomSymbol()]
    return []
}

// Update password length based on slider value
function handlePasswordLengthChange(event) {
    passwordLength = event.target.value
    passwordLengthValue.textContent = passwordLength
    adjustFontSize(passwordLength)
}

// Update availableCharacters array based on checkbox state
function updateAvailableCharacters(checkbox, charArray) {
    if (checkbox.checked) {
        availableCharacters.push(...charArray) // Add characters to available set
    } else {
        // Remove characters from available set
        availableCharacters = availableCharacters.filter(function (char) {
            return !charArray.includes(char)
        })
    }
}

// Toggle theme when button is clicked
function handleThemeToggle() {
    document.body.classList.toggle("dark-theme")
    isToggleThemeBtnClicked = !isToggleThemeBtnClicked
    // Update button state
    toggleThemeBtn.setAttribute("aria-pressed", isToggleThemeBtnClicked)

    // Update theme status for screen readers
    const themeText = `Current theme: ${isToggleThemeBtnClicked ? "Dark" : "Light"}`
    toggleThemeBtn.querySelector(".visually-hidden").textContent = themeText
    console.log(isToggleThemeBtnClicked ? "Dark mode enabled" : "Dark mode disabled")
}

// Handle copy button click
async function handleCopyClick(event) {
    const button = event.currentTarget
    const passwordElement = button.closest(".app__output-field").querySelector(".app__password")
    const passwordText = passwordElement.textContent
    const success = await copyToClipboard(passwordText)
    updateCopyButtonUI(button, success)
    updateScreenReaderFeedback(success)
}

// Add keydown listeners to copy buttons and checkboxes
function addKeydownListeners() {
    copyButtons.forEach(function (button) {
        button.addEventListener("keydown", handleCopyButtonKeydown)
    })
    checkboxes.forEach(function (checkbox) {
        checkbox.addEventListener("keydown", handleCheckboxKeydown)
    })
}

// Handle keydown event for copy buttons
function handleCopyButtonKeydown(event) {
    if (event.key === "Enter" || event.key === " ") {
        event.preventDefault()
        this.click()
    }
}

// Handle keydown event for checkboxes
function handleCheckboxKeydown(event) {
    if (event.key === "Enter" || event.key === " ") {
        event.preventDefault()
        this.checked = !this.checked
    }
}

// HELPER FUNCTIONS

// Generate a random index based on availableCharacters length
function generateRandomIndex() {
    return Math.floor(Math.random() * availableCharacters.length)
}

// Generate a random number from the numbers array
function generateRandomNumber() {
    const randomIndex = Math.floor(Math.random() * numbers.length)
    randomNumber = numbers[randomIndex]
    return randomNumber
}

// Generate a random symbol from the symbols array
function generateRandomSymbol() {
    const randomIndex = Math.floor(Math.random() * symbols.length)
    randomSymbol = symbols[randomIndex]
    return randomSymbol
}

// Shuffle the password array
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        // Generate a random index between 0 and i
        const j = Math.floor(Math.random() * (i + 1))
        // Swap elements array[i] and array[j]
        ;[array[i], array[j]] = [array[j], array[i]]
    }
    return array
}

// Adjust font size based on password length
function adjustFontSize(passwordLength) {
    const passwords = document.querySelectorAll(".app__password")
    passwords.forEach((password) => {
        if (passwordLength > 17) {
            password.classList.add("long")
        } else {
            password.classList.remove("long")
        }
    })
}

// Copy password to clipboard
async function copyToClipboard(text) {
    try {
        await navigator.clipboard.writeText(text)
        return true
    } catch (err) {
        console.error("Failed to copy text: ", err)
        return false
    }
}

// Update the copy button UI based on copy success
function updateCopyButtonUI(button, success) {
    const icon = button.querySelector(".app__copy-btn-icon")
    if (success) {
        icon.classList.remove("fa-copy")
        icon.textContent = "✓"
        icon.classList.add("copied")
        setTimeout(function () {
            resetCopyButtonUI(icon)
        }, 3000)
    }
}

// Reset the copy button UI after a successful copy
function resetCopyButtonUI(icon) {
    icon.textContent = ""
    icon.classList.remove("copied")
    icon.classList.add("fa-copy")
}

// Update screen reader feedback
function updateScreenReaderFeedback(success) {
    const copyFeedback = document.getElementById("copy-announcement")
    copyFeedback.textContent = success ? "Password copied to clipboard" : "Failed to copy password"
}
