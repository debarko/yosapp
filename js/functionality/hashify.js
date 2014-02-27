function formhash(username, password, cc, form) {
    //Creates the hash for the function
    //and sends data to our server

    //Create the hash for the password 
    var p = hex_sha512(password);
    var data = {"username": username,
                "password": p,
                "cc": cc};
    // Finally submit the data using ajax
    $.ajax({
        type: "POST",
        url: "login.php",
        data: data,
        dataType: "json"
        })
        .success(function(response) {
            if(response.status===true) {
                YW.NAME = response.name;
                log_in_user();
            }
            else {
                dispErrMsg(response.reason);
                if(form){
                    form.reset();
                }
            }
        })
        .fail(function(response) {
            console.log("ERROR");
        });
}
 
function regformhash(form, uid, email, password, cc, name) {
     // Check each field has a value
    if (uid.value == ''        || 
          email.value == ''  || 
          password.value == ''       || 
          cc.value == '' ||
          name.value == '') {
 
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
 
    if (!checkEmail(email.value)) {
        //alert('Your email is not a valid address. Please try again');
        dispErrMsg('Your email is not a valid address. Please try again');
        form.email.focus();
        return false;
    }
 
    var p = hex_sha512(password.value);
    var data = {"username": uid.value,
                "email": email.value,
                "p": p,
                "name": name.value,
                "cc": cc.value}
    $.ajax({
        type: "POST",
        url: "register.php",
        data: data,
        dataType: "text"
        })
        .success(function(response) {
            if(response==="SUCCESS"){
                formhash(document.getElementById('regInputPhone').value,
                                  document.getElementById('regpass').value,
                                  extractCC( document.getElementById('regInputCountry').value )
                        );
                dispErrMsg("You have successfully registered. Logging you in...");
                document.getElementById('regform').reset();
                $("#regform").animate({'opacity':'0'},800);
                setTimeout(function() {$("#regform").css('visibility','hidden')}, 800);
            } else {
                dispErrMsg(response);
            }
        })
        .fail(function(response) {
            dispErrMsg("Something went wrong, please refresh the page and try again.");
            return false;
        });    
}