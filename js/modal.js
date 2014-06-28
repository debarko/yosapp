function addContact() {
  var arrow = $('#addContactAnimation').find('#arrow'),
    //show contact name under the user icon
    fName = $('#contactFirstName').val(),
    cCode = $('#countryCode').val(),
    phNumber = $('#phNumber').val(),
    cName = $('#countryName').val();

  if (fName === "") {
    showPopNotification("Empty Name");
    return false;
  }
  if (parseInt(phNumber) != phNumber) {
    showPopNotification("Wrong Phone Number");
    return false;
  }
  phNumber = parseInt(phNumber);
  if (!isInt(phNumber) || phNumber === 0 || phNumber === "") {
    showPopNotification("Wrong Phone Number");
    return false;
  }
  if (parseInt(cCode) != cCode) {
    showPopNotification("Wrong CC");
    return false;
  }
  cCode = parseInt(cCode);
  if (!isInt(cCode) || cCode === 0 || cCode === "") {
    showPopNotification("Wrong CC");
    return false;
  }
  if (cName === "") {
    cName = "Random";
  }
  itemNumber = parseInt(cCode + '' + phNumber);
  if (YW.DATA[itemNumber]) {
    showPopNotification("Duplicate Contact");
    return false;
  }
  $('#contactNameAnimatedMsgBox').html(fName).animate({
    opacity: '1'
  }, 700, "swing");

  // animate the lower portion of the dialouge
  times = 1;

  //todo on fail what to do?
  $aJX_status = $.ajax({
      type: "POST",
      url: "user.php?request=addfriend",
      data: {
        "contact": phNumber,
        "cc": cCode,
        "name": fName
      },
      dataType: "text"
    })
    .success(function (response) {
      times = 0;
      if (response === true) {
        return true;
      } else {
        return false;
      }
    })
    .fail(function (response) {
      times = 0;
      return false;
    });
  sendPage('/addContact');
  animateLoop();

  function animateLoop() {
    //break recurtion condition
    if (times == 0) {
      // animate "successfull" once
      animateGlow('#phonebookAnimatedMsgBox', '1', '0', 800);
      //final state
      $('#phonebook').css('opacity', '.3');
      $('#addingTextAnimatedMsgBox').css('opacity', '0');
      $('#contactNameAnimatedMsgBox').css('opacity', '0');
      addedSuccessfullyAnimation();
      return;
    }
    //reset arrow position
    arrow.css({
      left: '0px',
      opacity: '0'
    });
    //animate(glow) user icon
    animateGlow('#user', '.7', '.3', 300);
    //animate(glow) phonebook icon
    animateGlow('#phonebook', '.3', '.7', 300);
    //animate(glow) "Adding" text under the runing arrow
    animateGlow('#addingTextAnimatedMsgBox', '1', '.3', 300);
    // animate(run) arrow icon
    arrow.animate({
      left: '100px',
      opacity: '1'
    }, 300, 'linear', function () {
      arrow.animate({
        left: '200px',
        opacity: '0'
      }, 300, 'linear', function () {
        animateLoop();
      });
    });

    function animateGlow(element, opa1, opa2, ms) {
      $(element).animate({
        opacity: opa1
      }, ms, 'swing', function () {
        $(element).animate({
          opacity: opa2
        }, ms, 'swing');
      });
    }
  }

  //second part of the animation
  function addedSuccessfullyAnimation() {
    //get the current state into a variable
    var currentState = $('#addContactForm').html();
    var animationContent = '<div id="userInfoHeader">CONTACT DETAILS</div>' + '<div id="userInfoDiv">' + '<div class="userInfoDivMemberwrapper"><div class="userInfoDivMemberIcons" id="userInfoDivMemberIconsUser"></div><div class="userInfoDivMemberText" id="userInfoDivMemberTextUsername"></div></div>' + '<div class="userInfoDivMemberwrapper"><div class="userInfoDivMemberIcons" id="userInfoDivMemberIconsPhone"></div><div class="userInfoDivMemberText" id="userInfoDivMemberTextNumber"></div></div>' + '<div class="userInfoDivMemberwrapper"><div class="userInfoDivMemberIcons" id="userInfoDivMemberIconsCountry"></div><div class="userInfoDivMemberText" id="userInfoDivMemberTextCountry"></div></div>' + '</div>' + '<div id="phonebookContainter"></div>' + '<div id="successfullTag">Added To Phonebook Successfully</div>';
    $('#addContactForm').fadeOut(500, function () {
      $('#addContactForm').html(animationContent);
      $('#addContactForm').fadeIn(400, function () {
        //now put the name, phone number, cc and country name.
        $('#userInfoDivMemberTextUsername').html(fName);
        $('#userInfoDivMemberTextNumber').html('(' + cCode + ')' + ' ' + phNumber); // format (+91) 9474070457
        $('#userInfoDivMemberTextCountry').html(cName);
        addContactElem(fName, phNumber, cCode);
        itemNumber = parseInt(cCode + '' + phNumber);
        YW.DATA[itemNumber] = {
          "phone": phNumber,
          "cc": cCode,
          "name": fName,
          "messages": {},
          "messageTree": []
        };
        sendPage('/home');
        //glow the phoenbook icon 3 times
        glowLoop(3);

        function glowLoop(times) {
          if (!times) {
            // final state
            return;
          }
          $('#phonebookContainter').animate({
            opacity: '.3'
          }, 300, 'swing', function () {
            $('#phonebookContainter').animate({
              opacity: '.6'
            }, 300, 'swing', function () {
              times--;
              glowLoop(times);
            });
          });
        }
      });
    });
  }
}

function addSearchElem(name, cc, phone) {
  var searchElem = '<div class="suggestedElem" onclick="fillEditContact(\'' + name + '\',' + cc + ',' + phone + ')"><p>' + name + ' (+' + cc + '-' + phone + ')</p></div>';
  $('#firstNameList').append(searchElem).css('display', 'block');

}

function fillEditContact(name, cc, phone) {
  $('#contactFirstNameEdit').val(name);
  $('#phNumberEdit').val(phone);
  $('#countryCodeEdit').val(cc);
  $('#countryNameEdit').val(CCtoCountry(cc));
  $('#firstNameList').html("");
}

function emptyEditContact() {
  $('#contactFirstNameEdit').val("").focus();
  hideTip('#contactFirstNameEdit');
  $('#phNumberEdit').val("");
  $('#countryCodeEdit').val("");
  $('#countryNameEdit').val("");
}

function suggestNames(name) {
  $('#firstNameList').html("");
  if (name == "") {
    $('#firstNameList').css('display', 'none');
    return false;
  }
  if ($('#phNumberEdit').val() != "") {
    $('#firstNameList').css('display', 'none');
    return false;
  }
  var elements = findContactByName(name);
  elements.forEach(function (item) {
    addSearchElem(item.name, item.cc, item.phone);
  });
}

function checkResponse(response, type, success_cb) {
  response = (typeof response === 'string') ? response.trim() : response;
  if (response === "noauth") {
    closeModal();
    sendPage('/' + type + '/noauth');
    showPopNotification("You are not logged in.", function () {
      window.location = 'logout.php';
    });
    return false;
  }
  if (response === "badparam") {
    closeModal();
    sendPage('/' + type + '/badparam');
    showPopNotification("Something went wrong with the request. Please try again.");
    return false;
  }
  if (response === "sqlfail") {
    closeModal();
    sendPage('/' + type + '/sqlfail');
    showPopNotification("Database was unreachable. Please try again after sometime.");
    return false;
  }
  if (response === "success") {
    if (success_cb) {
      success_cb();
    }
    closeModal();
    sendPage('/' + type + '/success');
    showPopNotification("Successful.");
    return true;
  } else {
    closeModal();
    sendPage('/' + type + '/error');
    showPopNotification("Some unknown error happened. Please report a feedback with details.");
    return false;
  }
}

function handle_failure(type) {
  closeModal();
  sendPage('/' + type + '/networkError');
  showPopNotification("Network Error. Please refresh the page and try again.");
  return false;
}

function updateContact() {
  var fName = $('#contactFirstNameEdit').val(),
    cCode = $('#countryCodeEdit').val(),
    phNumber = $('#phNumberEdit').val(),
    cName = $('#countryName').val();

  if (fName === "") {
    showPopNotification("Empty Name.");
    return false;
  }
  sendPage('/updateContact');
  showNotif("Processing your update request.");
  //todo on fail what to do?
  $aJX_status = $.ajax({
      type: "POST",
      url: "user.php?request=updateFriend",
      data: {
        "contact": phNumber,
        "cc": cCode,
        "name": fName
      },
      dataType: "text"
    })
    .success(function (response) {
      return checkResponse(
        response,
        'updateContact',
        function () {
          var fName = $('#contactFirstNameEdit').val(),
            cCode = $('#countryCodeEdit').val(),
            phNumber = $('#phNumberEdit').val();

          updateContactname(fName, cCode, phNumber);
          YW.DATA[cCode + phNumber].name = fName;
          emptyEditContact();
        });
    })
    .fail(function () {
      return handle_failure('updateContact');
    });
}

function deleteContact() {
  var cCode = $('#countryCodeEdit').val();
  var phNumber = $('#phNumberEdit').val();
  sendPage('/deleteContact');
  showNotif("Processing delete request.");
  $aJX_status = $.ajax({
      type: "POST",
      url: "user.php?request=deleteFriend",
      data: {
        "contact": phNumber,
        "cc": cCode
      },
      dataType: "text"
    })
    .success(function (response) {
      return checkResponse(
        response,
        'deleteContact',
        function () {
          var cCode = $('#countryCodeEdit').val();
          var phNumber = $('#phNumberEdit').val();

          emptyEditContact();
          delete YW.DATA[cCode + phNumber];
          $('[id=' + phNumber + ']').each(function (i, obj) {
            if ($(obj).prev().html() == cCode) {
              $(obj).parent().remove();
              showPopNotification("Delete successfully.");
              return true;
            }
          });
        });
    })
    .fail(function (response) {
      return handle_failure('deleteContact');
    });
}

function editProfileClick() {
  var name = $('#editProfName').val();
  if (name === "") {
    showPopNotification("Name field is empty.");
    return false;
  }
  sendPage('/editProfile');
  showNotif("Processing your Name Update Request.");
  $aJX_status = $.ajax({
      type: "POST",
      url: "user.php?request=updateName",
      data: {
        "name": name
      },
      dataType: "text"
    })
    .success(function (response) {
      return checkResponse(
        response,
        'editProfile',
        function () {
          $('#profilename').html(name);
          randomPicGen($('#profilepic'), name);
          YW.NAME = name;
        });
    })
    .fail(function (response) {
      return handle_failure('editProfile');
    });
}

function changePassword() {
  var pass = $('#editProfPass').val();
  var rePass = $('#editProfPassRe').val();
  if (pass === "") {
    showPopNotification("Password field is empty.");
    return false;
  }
  if (pass !== rePass) {
    showPopNotification("Both the passwords do not match.");
    $('#editProfPassRe').val("");
    $('#editProfPass').val("");
    return false;
  }
  var re = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
  if (!re.test(pass)) {
    showPopNotification("Passwords must contain at least one number, one lowercase and one uppercase letter.  Please try again.");
    $('#editProfPassRe').val("");
    $('#editProfPass').val("");
    return false;
  }
  var p = hex_sha512(pass);
  sendPage('/changePassword');
  $aJX_status = $.ajax({
      type: "POST",
      url: "user.php?request=updatePass",
      data: {
        "p": p
      },
      dataType: "text"
    })
    .success(function (response) {
      return checkResponse(response, 'changePassword');
    })
    .fail(function (response) {
      return handle_failure(response);
    });
}