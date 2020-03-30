//alert('hi');
function processForm(){

    var uname = document.getElementById('uname').value;
    var phone = document.getElementById('phone').value;

    var errors = '';
    var message = '';
    if(uname == ''){
        errors += 'Enter name <br>';
    }
    else{
        message += 'Welcome '+uname;
    }
    /**
     * Regex for phones: 999-999-9999
     */
    var regexPhone = /^\d{3}\-\d{3}\-\d{4}$/;

    if(regexPhone.test(phone)){
        message += '<br>We will call you at '+phone;
    }
    else{
        errors += 'Enter Phone in correct format xxx-xxx-xxxx<br>';
    }

    if(!errors){
        document.getElementById('result').innerHTML = message;
    }
    else{
        
        document.getElementById('result').innerHTML = errors;
    }

    return false; // stops the form from submitting
}