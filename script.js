const passwordDisplayBox = document.querySelector('.password-display-box');
const generateButton = document.querySelector('.generate-button');
const checkedSettings = document.querySelectorAll('.settings');
const copyResetPassword = document.querySelector('.copy-reset-password');
const copyButton = document.querySelector('.copy-button');
const resetButton = document.querySelector('.reset-button');
const copyMessageAlert = document.querySelector('#message-alert');


const numbersCharSet = '0123456789'
const lowercaseCharSet = 'abcdefghijklmnopqrstuvwxyz';
const uppercaseCharSet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const symbolsCharSet = '!@#$%^&*.,'

let arrSettings = [];

//Get what settings is checked
checkedSettings.forEach((activeSetting) => {
    activeSetting.addEventListener('change', function() {
        if (this.checked) {
            arrSettings.push(this.name);
        }else{
            arrSettings.pop(this.name);
        }
    });
})

//Show password length from range bar
function updateTextInput(val) {
    document.getElementById('output-length').value = val; 
}

//Generate the password
generateButton.addEventListener('click',function(){
    let passwordLength = document.getElementById('output-length').value;
    
    //Check for selected settings
    if (arrSettings.length === 0) {
        passwordDisplayBox.value = "Please set password's properties";
        return;
    }
    
    //Check for password length
    if (passwordLength.length === 0 ){
        passwordDisplayBox.value = "Please set password's length"
        return;
    }
    
    const createdPassword = createPassword(arrSettings,passwordLength);
    passwordDisplayBox.value = createdPassword;
    
    //Show hidden buttons
    
    copyResetPassword.style.display = "block";
    console.log(copyMessageAlert)
})

//Create the generated password
const createPassword = function(arr,len){
    let result = charSet = '';
    
    //Check settings
    if (arr.includes('numbers')){
        charSet += numbersCharSet;
    }
    if (arr.includes('lowercase')){
        charSet += lowercaseCharSet;
    }
    if (arr.includes('uppercase')){
        charSet += uppercaseCharSet;
    }
    if (arr.includes('symbols')){
        charSet += symbolsCharSet;
    }

    for (i=0; i<len; i++){
        result += charSet.charAt(Math.floor(Math.random() * 
        charSet.length));
    }

    return result;
}

resetButton.addEventListener('click',function(){
    passwordDisplayBox.value = ""
});

copyButton.addEventListener('click',function(){
    passwordDisplayBox.select();
    document.execCommand("Copy")
});

