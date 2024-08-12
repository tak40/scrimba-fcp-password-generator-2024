// DOM ELEMENTS
const generatePasswordBtn = document.getElementById("generate-password-btn")
const password1 = document.getElementById("password1")
const password2 = document.getElementById("password2")
const passwordLengthSlider = document.getElementById("password-length-slider")
const passwordLengthValue = document.getElementById("password-length-value")
const numbersEl = document.getElementById("numbers")
const symbolsEl = document.getElementById("symbols")
const copyIcons = document.querySelectorAll(".app__copy-icon")

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

// EVENT LISTENER

// Generate and display passwords when button is clicked
generatePasswordBtn.addEventListener("click", updatePassword)

// Update password length based on slider value
passwordLengthSlider.addEventListener("input", function () {
    passwordLength = passwordLengthSlider.value
    passwordLengthValue.textContent = passwordLength
})

// Toggle numbers in the available character set
numbersEl.addEventListener("change", function () {
    updateAvailableCharacters(numbersEl, numbers)
})

// Toggle symbols in the available character set
symbolsEl.addEventListener("change", function () {
    updateAvailableCharacters(symbolsEl, symbols)
})

// Copy password to clipboard when copy icon is clicked
copyIcons.forEach(function (icon) {
    icon.addEventListener("click", async function () {
        const passwordElement = icon.previousElementSibling
        const passwordText = passwordElement.textContent

        try {
            await navigator.clipboard.writeText(passwordText)
            // Provide visual feedback
            icon.classList.remove("fa-copy")
            icon.textContent = "✓"
            icon.classList.add("copied")

            // Reset icon after a short delay
            setTimeout(function () {
                icon.textContent = ""
                icon.classList.remove("copied")
                icon.classList.add("fa-copy")
            }, 3000)
        } catch (err) {
            console.error("Failed to copy text: ", err)
        }
    })
})

// CORE FUNCTIONS

// Update the password fields with newly generated passwords
function updatePassword() {
    password1.textContent = generatePassword(passwordLength)
    password2.textContent = generatePassword(passwordLength)
}

// Generate a password of a given length
function generatePassword(length) {
    let password = ""
    for (let i = 0; i < length; i++) {
        password += availableCharacters[generateRandomIndex()]
    }
    return password
}

// HELPER FUNCTIONS

// Generate a random index based on availableCharacters length
function generateRandomIndex() {
    return Math.floor(Math.random() * availableCharacters.length)
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
