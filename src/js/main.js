const formElement = document.querySelector('#loginForm');

function validateEmail(value) {
  let error = document.querySelector('.form__error');
  let validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
 
  if (value.match(validRegex)) {
    error.style.display = 'none';
    formElement.classList.remove('form--error');
    return true;
  } else {
    error.style.display = 'block';
    formElement.classList.add('form--error');
    formElement.email.focus();
    return false;
  }
}

formElement.addEventListener('submit', (e) =>{
  e.preventDefault();
  let form = e.target;
  let formData = new FormData(form);
  let valueEmail = formData.get('email');

  validateEmail(valueEmail);
});