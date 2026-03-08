const username = document.getElementById('username');
const password = document.getElementById('password');
const signInBtn = document.getElementById('sign-in-btn');


signInBtn.addEventListener('click',() => {

    const usernameInput = username.value;
    const passwordInput = password.value;

    // console.log(usernameInput);
    // console.log(passwordInput);

    if(usernameInput === 'admin' && passwordInput === 'admin123'){
        alert('success');
        window.location.assign('./homepage.html')
    }
    else{
        alert('login failed')
    }
})
