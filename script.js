// VARIABLES FOR THE FORM
const nextBtns = document.querySelectorAll(".btn-next");
const progress = document.getElementById("progress");
const formSteps = document.querySelectorAll(".form-step");
const progressSteps = document.querySelectorAll(".progress-step");
const err_msg = document.getElementById("err-msg");
const modal = document.getElementById('modal')
// INPUTS THAT NEED VALIDATION
const curr_date = document.getElementById('curr_date');
const curr_time = document.getElementById('curr_time');
const continent = document.getElementsByName('continent');
const synonym = document.getElementsByName('synonym');
const degrees = document.getElementById('degrees');
const math_result = document.getElementById('math_result');
const currency_type = document.getElementById('currency_type');
const trivia = document.getElementById('trivia');
const strong_pass = document.getElementById('strong_pass');
const pass_hint = document.getElementById('pass-hint');

let formStepsNum = 0;

function nextPage() { // NEXT PAGE OF FORM
    formStepsNum++;
    updateFormSteps();
    updateProgressBar();
}

function errPopup() { // CODE FOR POPUP
    err_msg.classList.add("open");
    setTimeout(function(){
        err_msg.classList.remove("open");
    }, 1260); 
}

// VALIDATION FOR EACH PAGE
function pageOne() {
    const today = new Date();

    const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    const hours = ('0'+today.getHours()).slice(-2);
    const minutes = ('0'+today.getMinutes()).slice(-2);
    const time = hours + ':' + minutes;
    if (curr_date.value == date && curr_time.value == time){
        nextPage();
    }else{
        errPopup();
    }
}

function pageTwo() {
    if (continent[2].checked && synonym[1].checked){
        nextPage();
    }else{
        errPopup();
    }
}

function pageThree() {
    if (degrees.value == "180" && math_result.value == "34"){
        nextPage();
    }else{
        errPopup();
    }
}

function pageFour() {
    const currency = currency_type.value.toLowerCase();
    if ((currency == "yen" || "japanese yen" || "¥" || "jp¥") && trivia.value.toLowerCase() == "minecraft"){
        nextPage();
    }else{
        errPopup();
    }
}

function lastPage() {
    const pass = strong_pass.value;
    if(pass.match(/.{6,20}/)){ // 6-20 characters
        if(pass.match(/ *[a-z]/ && pass.match(/ *[A-Z]/))){
            if(pass.match(/ *[0-9]/ && pass.match(/.*[^A-Za-z0-9]/))){
                modal.showModal();
            }else{
                pass_hint.innerHTML = "Password should contain numbers and special characters";
            }
        }else{
            pass_hint.innerHTML = "Password should contain both upper and lower case letters";
        }
    }else{
        pass_hint.innerHTML = "Password should be 6-20 characters";
    }
}

// CODE FOR UPDATING VISUALS OF THE FORM
function updateFormSteps(){

    formSteps.forEach(formStep  => {
        formStep.classList.contains("form-step-active") &&
        formStep.classList.remove("form-step-active");
    });

    formSteps[formStepsNum].classList.add("form-step-active")
}

function updateProgressBar(){
    progressSteps.forEach((progressStep, idx) => {
        if(idx < formStepsNum + 1) {
            progressStep.classList.add('progress-step-active')
        } else {
            progressStep.classList.remove('progress-step-active')
        }
    });

    const progressActive = document.querySelectorAll(".progress-step-active");

    progress.style.width = ((progressActive.length - 1) / (progressSteps.length - 1)) * 100 + "%";
}