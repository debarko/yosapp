function formhash(username, password, form) {
    //Creates the hash for the function
    //and sends data to our server

    //Create the hash for the password 
    var p = hex_sha512(password);
    var data = {"username": username,
                "password": p};
    // Finally submit the data using ajax
    $.ajax({
        type: "POST",
        url: "login.php",
        data: data,
        dataType: "json"
        })
        .success(function(response) {
            console.log(typeof response);
            if(response===true) {
                log_in_user();
            }
            else {
                form.reset();
            }
        })
        .fail(function(response) {
            console.log("ERROR");
        });
}
 
function regformhash(form, uid, email, password, conf) {
     // Check each field has a value
    if (uid.value == ''        || 
          email.value == ''  || 
          password.value == ''       || 
          conf.value == '') {
 
        //alert('You must provide all the requested details. Please try again');
        dispErrMsg('You must provide all the requested details. Please try again');
        return false;
    }
 
    // Check the username
 
    re = /^\w+$/; 
    if(!re.test(form.username.value)) { 
        //alert("Usernames may contain only digits along with country code");
        dispErrMsg('Usernames may contain only digits along with country code');
        form.username.focus();
        return false; 
    }
 
    // Check that the password is sufficiently long (min 6 chars)
    // The check is duplicated below, but this is included to give more
    // specific guidance to the user
    if (password.value.length < 6) {
        //alert('Passwords must be at least 6 characters long.  Please try again');
        dispErrMsg('Passwords must be at least 6 characters long.  Please try again');
        form.password.focus();
        return false;
    }
 
    // At least one number, one lowercase and one uppercase letter 
    // At least six characters 
 
    var re = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/; 
    if (!re.test(password.value)) {
        //alert('Passwords must contain at least one number, one lowercase and one uppercase letter.  Please try again');
        dispErrMsg('Passwords must contain at least one number, one lowercase and one uppercase letter.  Please try again');
        return false;
    }
 
    // Check password and confirmation are the same
    if (password.value != conf.value) {
        //alert('Your password and confirmation do not match. Please try again');
        dispErrMsg('Your password and confirmation do not match. Please try again');
        form.password.focus();
        return false;
    }

    if (!checkEmail(email.value)) {
        //alert('Your email is not a valid address. Please try again');
        dispErrMsg('Your email is not a valid address. Please try again');
        form.email.focus();
        return false;
    }
 
    var p = hex_sha512(password.value);
    var data = {"username": uid.value,
                "email": email.value,
                "p": p}
    $.ajax({
        type: "POST",
        url: "register.php",
        data: data,
        dataType: "json"
        })
        .success(function(response) {
            console.log(response);
        })
        .fail(function(response) {
            console.log("ERROR");
        });    
}