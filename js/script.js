// DOM ELEMENTS
const toggleThemeBtn = document.getElementById("toggle-theme")
const generatePasswordBtn = document.getElementById("generate-password-btn")
const password1 = document.getElementById("password1")
const password2 = document.getElementById("password2")
const passwordLengthSlider = document.getElementById("password-length-slider")
const passwordLengthValue = document.getElementById("password-length-value")
const numbersEl = document.getElementById("numbers")
const symbolsEl = document.getElementById("symbols")
const copyButtons = document.querySelectorAll(".app__copy-btn")
const checkboxes = document.querySelectorAll(".app__character-option-input")

// CHARACTER SETS

// prettier-ignore
const alphabets = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"]
// prettier-ignore
const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]
// prettier-ignore
const symbols = ["~","`","!","@","#","$","%","^","&","*","(",")","_","-","+","=","{","[","}","]",",","|",":",";","<",">",".","?", "/"]

// INITIALIZATION

// Initial password length
let passwordLength = 15

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
    password1.textContent = generatePassword(passwordLength)
    password2.textContent = generatePassword(passwordLength)
    adjustFontSize(passwordLength)
}

// Generate a password of a given length
function generatePassword(length) {
    let password = ""
    for (let i = 0; i < length; i++) {
        password += availableCharacters[generateRandomIndex()]
    }
    return password
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
    const themeText = isToggleThemeBtnClicked ? "Dark" : "Light"
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
    if (event.key === " " || event.key === "Enter") {
        event.preventDefault()
        this.checked = !this.checked
        this.dispatchEvent(new Event("change", { bubbles: true }))
    }
}

// HELPER FUNCTIONS

// Generate a random index based on availableCharacters length
function generateRandomIndex() {
    return Math.floor(Math.random() * availableCharacters.length)
}

// Adjust font size based on password length
function adjustFontSize(passwordLength) {
    const passwords = document.querySelectorAll(".app__password")
    passwords.forEach((password) => {
        if (passwordLength > 20) {
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
