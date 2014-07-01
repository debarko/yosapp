//This function has to be called when 
//the ajax request for login succeeds
function loadChatscreen() {
  setSearchContainerHeight();

  $("#concactsearch").find('input').click(function () {
    $('#concactsearch').find('input').css("background-color", "black");
  });
}

$(window).resize(function () {
  setSearchContainerHeight();
})

function setSearchContainerHeight() {
  var searchContainerHeight = $(window).height() * (80 / 100) - 128;
  $('#contactscontainer').css("height", searchContainerHeight + "px");
}

function setTextboxGap() {

  var arr = $(".recmsg").css("height");
  arr.each(function (index) {
    alert(This.value);
  });
}

function loadMessageDiv(divElem) {
  var temp_Data = $("#msgcontainer").html()
  $("#msgcontainer").html(temp_Data + divElem);
}

function formatAMPM(date) {
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0' + minutes : minutes;
  var strTime = hours + ':' + minutes + ' ' + ampm;
  return strTime;
}

function sendOtherMsg(message) {
  askNotifPerm();
  if (message === "") {
    return false;
  }
  var d = new Date(); // for now
  h = d.getHours(); // => 9
  m = d.getMinutes(); // =>  30
  formDivElem(1, message, formatAMPM(new Date()));
}

function sendMyMsg(message, dontReplicate) {
  if (message === "") {
    return false;
  }
  if (YW.CURR_PARTNER === "0server") {
    dontReplicate = 1;
  }
  if (typeof dontReplicate === "undefined") {
    status = sendActualMessage(message);
    if (!status) {
      return false;
    }
    storeMessage(YW.CURR_PARTNER, 0, message);
  }
  var d = new Date(); // for now
  h = d.getHours(); // => 9
  m = d.getMinutes(); // =>  30
  formDivElem(0, message, formatAMPM(new Date()));
  $("#typemsg").val("");

  if (YW.CURR_PARTNER === "0server") {
    sendOtherMsg(YW.ELIZA.transform(message));
  }
  //now scroll down msg container to bottom
  autoScrollDown();
}

function formDivElem(parent, message, timestamp) {
  //Parent = 0 when I wrote the message
  //Parent = 1 when he wrote the message
  loadMessageDiv(YW.CHATBUBBLE());

  //get hold of the newly added div by checking a list of 
  //all divs in the message bar setup
  var new_div = $("#msgcontainer > div");
  new_div = new_div[new_div.length - 1];

  var new_id = generateRandomDivId();
  //set id here to the newly added div
  $(new_div).attr("id", new_id);

  //add the class based on the paarents
  if (parent === 0) {
    //It's my bubble
    tagMyBubble(new_id);
  } else {
    //It's opponents bubble
    tagOtherBubble(new_id);
  }

  //convert the msg to smileys
  //message.replace(/\u/g,"u+");
  //message = minEmoji(message);

  //set the message in the newly added div
  if (isImageMsg(message)) {
    setImg(new_id, message);
  } else if (isVideoMsg(message)) {
    setVid(new_id, message);
  } else {
    setMessage(new_id, message);
  }

  //set the time stamp
  setTimeStamp(new_id, timestamp);

  setOptionsWidth(new_id, parent);
}

function isVideoMsg(message) {
  if (message.indexOf("[ video:") === 0) {
    return true;
  } else {
    return false;
  }
}

function isImageMsg(message) {
  if (message.indexOf("[ image:") === 0) {
    return true;
  } else {
    return false;
  }
}

function generateRandomDivId() {
  //create a id only numeric based on time of the client
  //time
  var dateStr = new Date().toISOString();
  dateStr = dateStr.replace(/-/g, '');
  dateStr = dateStr.replace(/:/g, '');
  return CryptoJS.MD5(dateStr).toString();
}

function tagMyBubble(id) {
  //add the classes for my bubble accordingly
  $("#" + id + " > #mother_div > #sent_recv").addClass("sentmsg");
}

function tagOtherBubble(id) {
  //add classes for his chat bubble
  $("#" + id + " > #mother_div > #sent_recv").addClass("recmsg");
}

function setTimeStamp(id, timestamp) {
  //Add the timestamp to the appropriate place
  $("#" + id + " > #mother_div > #sent_recv > #timestamp").html(timestamp);
}

function setImg(id, message) {
  var dataInHere = message.slice(message.indexOf("preview:") + 8);
  dataInHere = dataInHere.slice(0, dataInHere.length - 1);
  var url = message.slice(message.indexOf("[ image: ") + 9, message.indexOf(", preview:"));
  message = "<img class=\"imgThumb\" src=\"data:image/jpg;base64," + dataInHere + "\" onclick='loadMediaURL(\"" + encodeURIComponent(url) + "\", \"image\")' />"
  $("#" + id + " > #mother_div > #sent_recv > .textbox").html(message + $("#" + id + " > #mother_div > #sent_recv > .textbox").html());
}

function setVid(id, message) {
  var dataInHere = message.slice(message.indexOf("preview:") + 8);
  dataInHere = dataInHere.slice(0, dataInHere.length - 1);
  var url = message.slice(message.indexOf("[ video: ") + 9, message.indexOf(", preview:"));
  message = "<img class=\"imgThumb\" src=\"data:image/jpg;base64," + dataInHere + "\" onclick='loadMediaURL(\"" + encodeURIComponent(url) + "\", \"video\")' />"
  $("#" + id + " > #mother_div > #sent_recv > .textbox").html(message + $("#" + id + " > #mother_div > #sent_recv > .textbox").html());
}

function setMessage(id, message) {
  //add the message to the div
  $("#" + id + " > #mother_div > #sent_recv > .textbox").html(message + $("#" + id + " > #mother_div > #sent_recv > .textbox").html());
}

function setOptionsWidth(id, parent) {
  var parent_width = $("#" + id + " > #mother_div > #sent_recv").css("width");
  $("#" + id + " > #mother_div > .shareOptionsBar").css("width", parent_width);
  $("#" + id + " > #mother_div > .shareOptionsBar > .midbar").css("width", (parseInt(parent_width) - 20) + "px");
  if (parent) {
    $("#" + id + " > #mother_div").css("float", "left");
    $("#" + id + " > #mother_div > .shareOptionsBar").addClass("shareOptionsBar_left");
  } else {
    $("#" + id + " > #mother_div").css("float", "right");
    $("#" + id + " > #mother_div").addClass("mother_div_right");
  }
}


function shareOption() {
  $('.shareOptionsBar').animate({
    top: "-1px"
  }, 800, "swing");
}

function showOverlay(callback) {
  var overlay = $('#overlay');
  overlay.css({
    opacity: '0',
    visibility: 'visible'
  });
  overlay.animate({
    opacity: '1'
  }, 200, 'swing', function () {
    if (callback) {
      callback();
    }
  });
}

function showModal(defaultSelectedMenu, thisElem) {
  var modal = $('#modal');
  modal.css('display', 'block');
  if (YW.logged_in() == 'true') {
    $('#modalMenuBar').html(YW.L_IN());
    $('#modalRightPanel').html(YW.R_IN());
  } else {
    $('#modalMenuBar').html(YW.L_OUT());
    $('#modalRightPanel').html(YW.R_OUT());
  }
  showOverlay(function () {
    //now bring up the modal
    modal.css({
      width: '0px',
      height: '0px',
      top: '50%',
      left: '50%',
      margin: '0px',
      border: '0px',
      visibility: 'visible'
    });
    modal.animate({
      width: '600px',
      height: '400px',
      top: '50%',
      left: '50%',
      margin: '-200px 0px 0px -300px'
    }, 300, "swing", function () {
      $('#modalCloseButton').css('visibility', 'visible');
      $('#modalContent').css('visibility', 'visible');
      selectModalItem(defaultSelectedMenu, thisElem)
      $('#contactFirstName').focus(); // auto focus of first name
    });
  })
}

function selectModalItem(item, thisElem) {
  //this function selects modal content. Ex : settings, add contacts etc
  // disable all previously activated display forms 
  $('.modalRightMasterDiv').css('display', 'none');
  $('.modalMenuItem').removeClass('selectedModalMenuItem');
  // now selectively on whichever is requested
  if (item == 'addCon') {
    $('#addContactForm').css('display', 'block');
    $('#modaladdContact').addClass('selectedModalMenuItem');
    return;
  } else if (item == 'editProf') {
    $('#editProfForm').css('display', 'block');
    $('#modalEditProfile').addClass('selectedModalMenuItem');
    // show current name in preview profile initially
    $('#profPreviewName').html($('#profilename').html());
    randomPicGen($('#profPreviewPic'), $('#profilename').html());
    return;
  } else if (item == 'feedback') {
    $('#feedbackform').css('display', 'block');
    $('#modalFeedback').addClass('selectedModalMenuItem');
    return;
  } else if (item == 'settings') {
    $('#settingsForm').css('display', 'block');
    $('#modalSettings').addClass('selectedModalMenuItem');
    return;
  } else if (item == 'editCon') {
    $('#editContactForm').css('display', 'block');
    $('#modaleditContact').addClass('selectedModalMenuItem');
    var contact = $(thisElem).parent();
    var name = contact.find('#name').html();
    var number = contact.find('span').eq(3).attr('id');
    var cc = contact.find('#cc').html();
    fillEditContact(name, cc, number);
    $('#contactFirstNameEdit').focus();
    hideTip($('#contactFirstNameEdit'));
    //Disabling phone, cc and country
    $('#phNumberEdit, #countryCodeEdit, #countryNameEdit').prop('disabled', true);
    return;
  } else if (item == 'alpha') {
    $('#modalMenuAlpha').addClass('selectedModalMenuItem');
    $('#releaseHeader').html('Alpha Release');
    $('#releaseVersionText').html(
      'Current Version:<br />Highly possible that it will be buggy.<br />' +
      'We are working to fix a lot. But it is too soon to say it is complete. No group support.<br />' +
      '<br />' +
      '1. Basic Messaging with Phone Numbers<br />' +
      '2. Image Receival<br />' +
      '3. Video Receival<br />' +
      '4. Adding of new Friends<br />' +
      '5. Deleting Friends<br />' +
      '6. Editing Friends<br />' +
      '7. Connecting with Whatsapp Servers');
  } else if (item == 'beta') {
    $('#modalMenuBeta').addClass('selectedModalMenuItem');
    $('#releaseHeader').html('Beta Release');
    $('#releaseVersionText').html('This version will have mobile UI.');
  } else if (item == 'RC1') {
    $('#modalMenuRC1').addClass('selectedModalMenuItem');
    $('#releaseHeader').html('Stable Release');
    $('#releaseVersionText').html('We are planning on a week per so saying anything about this is too far fetched.');
  } else if (item == 'dev') {
    $('#modalMenuDevlopers').addClass('selectedModalMenuItem');
    $('#releaseHeader').html('Open Source');
    $('#releaseVersionText').html('This is an Open Source Project and is based on Tarek Galal\'s Yowsup Project.<br />' +
      'If you want the code for the project, then contact us at support@yosapp.com');
  } else if (item == 'vision') {
    $('#modalMenuVesion').addClass('selectedModalMenuItem');
    $('#releaseHeader').html('Our vision');
    $('#releaseVersionText').html('We believe: Human knowledge belongs to the world.<br/><br />Messages which are typed in the user data are not stored on Yosapp servers and they are directly forwarded to Whatsapp servers. We are just storing the username, password for your Yosapp account and the list of friends with whom you are connected at this moment. This app is an UNOFFICIAL client born out of necessity and require. It also allows landline users to connect to Whatsapp network through the portal.');
  }


}


function closeModal() {
  sendPage('/home');
  var modalDialogue = $('#modal');
  $('#modalContent').css('visibility', 'hidden')
    //anumate and close the modal
  modalDialogue.animate({
    width: '0px',
    height: '0px',
    top: '50%',
    left: '50%',
    margin: '0px',
    border: '0px'
  }, 300, 'swing', function () {
    $('#modalCloseButton').css('visibility', 'hidden');
    $('#modal').css('display', 'none');
    closeOverlay();
  });
}

function closeOverlay() {
  var overlay = $('#overlay');
  overlay.animate({
    opacity: "0"
  }, 200, "swing", function () {
    overlay.css('visibility', 'hidden');
  })
}

function renderData() {
  $.each(YW.DATA, function (id, elem) {
    addContactElem(elem.name, elem.phone, elem.cc);
  });
}

function addContactElem(name, phone, cc, image) {
  $('#contactslist').append(YW.CONTACT())[$('#contactslist').length - 1];
  var currentContact;
  var date_data = new Date();
  date_data = date_data.getTime();
  var letter = name.substr(0, 1);
  letter = letter.toUpperCase();
  // get randowm background for contact image
  randomPicGen($("#contactslist li:last #contactImage"), name)
    //$("#contactslist li:last #contactImage");
  $('#contactslist li:last #name').html(name);
  $('#contactslist li:last #cc').html(cc);
  $('#contactslist li:last #number').attr("id", phone);
  if (phone == "server") {
    $('#contactslist li:last #editContactButton').remove();
  }
  return currentContact;
}

function selectMenuItem(selectedMenuItem) {
  // clear previously selected menu item background color
  $('.modalMenuItem').css('background-color', '');
  //change the selected menu item background
  $(selectedMenuItem).css('background-color', '#2AB200');
}

function setLastChat() {
  $("#contactslist").children().each(function (index, item) {
    var temp = $(item).find("span").eq(2).html() + '' + $(item).find("span").eq(3).attr("id");
    if (temp === "0server") {
      setCurrentPartner(item);
    }
  });
}

function processMessage(responseJSON) {
  responseJSON.forEach(function (item) {
    if (!YW.DATA[item[0]]) {
      var ccPhone = dissectPhoneNumber(item[0]);
      addContactElem(item[0], ccPhone[1], ccPhone[0]);
      YW.DATA[item[0]] = {
        "phone": ccPhone[1],
        "cc": ccPhone[0],
        "name": item[0],
        "messages": {},
        "messageTree": []
      };
      $aJX_status = $.ajax({
          type: "POST",
          url: "user.php?request=addfriend",
          data: {
            "contact": ccPhone[1],
            "cc": ccPhone[0],
            "name": item[0]
          },
          dataType: "text"
        })
        .success(function (response) {
          times = 0;
          if (response === "SUCCESS") {
            return true;
          } else {
            return false;
          }
        })
        .fail(function (response) {
          times = 0;
          return false;
        });
    }
    if (YW.DATA[item[0]].messages.unreadCount) {
      YW.DATA[item[0]].messages.unreadCount++;
    } else {
      YW.DATA[item[0]].messages.unreadCount = 1;
    }
    if (!YW.DATA[item[0]].messages.list) {
      YW.DATA[item[0]].messages.list = [];
    }
    YW.DATA[item[0]].messages.list.push([item[2], 1]);
    if (item[0] !== '0server' && !document.hasFocus()) {
      var messageHere = decodeURIComponent(item[2]);
      if (isImageMsg(messageHere)) {
        messageHere = "Sent you an Image."
      } else if (isVideoMsg(messageHere)) {
        messageHere = "Sent you a Video."
      }
      notify(YW.DATA[item[0]].name + ' (' + item[0] + ')', messageHere);
    }
  });
  renderCurrent();
  processUnread();
  calcUnread();
}

function calcUnread() {
  //Calculates the current unreda messages and sets the window title.
  YW.UNREAD = 0;
  for (var item in YW.DATA) {
    if (YW.DATA[item].messages.unreadCount) {
      YW.UNREAD += YW.DATA[item].messages.unreadCount;
    }
  }
  if (YW.UNREAD === 0) {
    document.title = "Yosapp";
  } else {
    document.title = "(" + YW.UNREAD + ") Yosapp";
  }
  return YW.UNREAD;
}

function processUnread() {
  $("#contactslist").children().each(function (index, item) {
    var temp = $(item).find("span").eq(2).html() + '' + $(item).find("span").eq(3).attr("id");
    if (YW.DATA[temp].messages.unreadCount && YW.DATA[temp].messages.unreadCount !== 0) {
      showUnreadMsg(item, YW.DATA[temp].messages.unreadCount);
    }
  });
}

//This function sets the required settings so that the 
//following user becomes the current user
function setCurrentPartner(elem) {
  if (elem.children.item(2).innerHTML + elem.children.item(3).id === YW.CURR_PARTNER) {
    return;
  }
  YW.CURR_PARTNER = elem.children.item(2).innerHTML + elem.children.item(3).id;
  $("#msgcontainer").html("<br /><br />");
  //clear previously selected partner and do not clear undrad contact background
  $('.contact').each(function (i, obj) {
    if ($(obj).css('background-color') == 'rgba(42, 178, 0, 0.521569)') {
      $(obj).css('background-color', '');
    }
    // clear all the edit option link
    $(obj).find('#editContactButton').css('display', '');
  });
  //highlight current partner
  $(elem).css('background-color', 'rgba(42, 178, 0, 0.52)');
  $(elem).find('#unreadMsgCnt').css('display', 'none');
  $(elem).find('#editContactButton').css('display', 'inline-block');
  renderMessages();
  renderCurrent();
  calcUnread();
}

function replaceAll(find, replace, str) {
  return str.replace(new RegExp(find, 'g'), replace);
}

function renderCurrent() {
  //render the current selected users messages which are unread
  if (!YW.DATA[YW.CURR_PARTNER]) {
    return false;
  }
  if (!YW.DATA[YW.CURR_PARTNER].messages.list) {
    return false;
  }
  YW.DATA[YW.CURR_PARTNER].messages.list.forEach(function (message) {
    message[0] = decodeURIComponent(message[0]);
    message[0] = replaceAll("\n", "<br />", message[0]);
    if (message[1]) {
      sendOtherMsg(message[0]);
      storeMessage(YW.CURR_PARTNER, 1, message[0]);
      autoScrollDown();
    } else {
      //currently this scenario can't happen
      sendMyMsg(message[0]);
    }
  });
  YW.DATA[YW.CURR_PARTNER].messages.list = [];
  YW.DATA[YW.CURR_PARTNER].messages.unreadCount = 0;
}

function autoScrollDown() {
  // todo call this function when msg arrives as well
  $('#msgcontainer').animate({
    scrollTop: $('#msgcontainer').get(0).scrollHeight
  }, 50);
}

function notify(title, bodyMsg) {
  //send desktop notificationns
  var myNotification = new Notify(title, {
    body: bodyMsg,
    icon: "./icons/logo_min.png"
  });
  YW.NOTIFSOUND.play();
  myNotification.show();
}

function reqNotifPerms() {
  //request for permissions in desktop notifications
  var myNotification = new Notify('Test');
  if (myNotification.needsPermission()) {
    myNotification.requestPermission();
  }
}

function askNotifPerm() {
  if (getValue("askNotifPerm") === 1) {
    sendPage('/showNotifPerm');
    showPrompt("Would you like to allow Desktop Notification for incoming messages??",
      function () {
        sendPage('/showNotifPerm/accept');
        reqNotifPerms();
        setValue("askNotifPerm", 0);
        closePrompt();
      },
      function () {
        sendPage('/showNotifPerm/reject');
        setValue("askNotifPerm", 0);
        closePrompt();
      });
    sendPage('/home');
    return true;
  }
  return false;
}

function storeMessage(whos, parent, message) {
  var tmp_msg_obj = {};
  tmp_msg_obj.message = message;
  tmp_msg_obj.parent = parent;
  YW.DATA[whos].messageTree.push(tmp_msg_obj);
}

function renderMessages() {
  //show current session messages.
  if (!YW.DATA[YW.CURR_PARTNER].messageTree) {
    return false;
  }
  var tree = YW.DATA[YW.CURR_PARTNER].messageTree;
  tree.forEach(function (item) {
    if (item.parent === 0) {
      sendMyMsg(item.message, 1);
    } else {
      sendOtherMsg(item.message);
    }
  });
}

function checkForWPass() {
  $aJX_status = $.ajax({
      type: "GET",
      url: "user.php?request=wpass_check"
    })
    .success(function (response) {
      response = response.trim();
      if (response === "false") {
        sendPage('/showVerif');
        clearInterval(YW.LISTENER);
        $("#bodybg").html($("#bodybg").html() + YW.VERIF());
        showOverlay();
        showVerWindow();
        return true;
      } else {
        return false;
      }
    })
    .fail(function (response) {
      return false;
    });
}

function requestCode() {
  sendPage('/requestCode');
  DlBoxLoading("Please Wait. Sending your code.", 1);
  YW.IMEI = imei_gen();
  $aJX_status = $.ajax({
      type: "GET",
      url: "transactor.php?method=codereq&via=" + YW.VIA + "&id_user=" + YW.IMEI
    })
    .success(function (response) {
      if (response === "noauth") {
        DlBoxFinalMsg("You are not logged in. Please refresh and retry.", 1);
        return false;
      } else if (response === "badparam") {
        DlBoxFinalMsg("We regret. Internal server error happened. Please refresh and try again. If it doesn't solve please contact us via Feedback.", 1);
        return false;
      } else {
        var patt1 = /status: ([a-z]*)/i;
        var result = response.match(patt1);
        if (result && result[1] !== "fail") {
          enterVerCode();
        } else {
          var patt2 = /status: ([a-z]*)\nretry_after: ([0-9]*)/i;
          var result2 = response.match(patt2);
          if (result2 && result2[2]) {
            DlBoxFinalMsg("Trying too soon. Please try after " + Math.floor(result2[2] / 60) + " minutes.", 1);
          }
        }
      }
    })
    .fail(function (response) {
      return false;
    });
}

function sendCode() {
  sendPage('/sendCode');
  code = $("#verCodeField").val();
  if (code === "" || code === undefined) {
    return false;
  }
  DlBoxLoading("Please Wait. Confirming your code.", 2);
  $aJX_status = $.ajax({
      type: "GET",
      url: "transactor.php?method=sendcode&code=" + code + "&id_user=" + YW.IMEI
    })
    .success(function (response) {
      if (response === "noauth") {
        DlBoxFinalMsg("You are not logged in. Please refresh and retry.", 2);
        return false;
      } else if (response === "badparam") {
        DlBoxFinalMsg("We regret. Some Internal server error happened. Please refresh and try again. If it doesn't solve please contact us via Feedback.", 2);
        return false;
      } else {
        if (response === "success") {
          successDialougeBox();
        } else {
          DlBoxFinalMsg("Wrong Code. Please try again.", 2);
          return false;
        }
      }
    })
    .fail(function (response) {
      return false;
    });
}

function clearVerif() {
  sendPage('/closeVerif');
  sendPage('/home');
  $("#varifyWindow").css("display", "none");
  closeOverlay();
  YW.LISTENER = setInterval(function () {
    checkMessage();
  }, 10000);
}

function sendFeedback() {
  sendPage('/sendFeedback');
  $aJX_status = $.ajax({
    type: "GET",
    url: "feedback.php?ua=" + encodeURIComponent(YW.UA()) + "&msg=" + encodeURIComponent($("#feedbackTextArea").val())
  });
  closeModal();
  showNotif("Thanks for your feedback. We will get back to you shortly.");
  setTimeout(function () {
    hideNotif();
  }, 3000);
}

function randomPicGen(imageElem, name) {
  var red = getRandomInt(136, 202);
  var green = getRandomInt(136, 202);
  var blue = getRandomInt(136, 202);
  var textXOffset = getRandomInt(-2, 8);
  var textYOffset = getRandomInt(-5, 0);

  imageElem.css('background-color', 'rgba(' + red + ',' + green + ',' + blue + ',1)');
  imageElem.find('p').html(name.substr(0, 1).toUpperCase());
  imageElem.find('p').css({
    top: textYOffset + 'px',
    left: textXOffset + 'px'
  });
}

function showUnreadMsg(contact, number) {

  if (number > 99) {
    number = '*'
  }
  $(contact).find('#unreadMsgCnt').css('display', 'block').html(number);
  $(contact).css('background-color', 'rgba(255, 82, 0, 0.0901961)');
}

function renderSearchedContact() {
  var searchIpbar = $('#contactSearchbar');
  var searchString = searchIpbar.val();

  if (searchString == '') {
    $('.contact').css('display', 'block');
    return;
  }
  //first hide all the contacts and then selectively show those matched searched string
  $('.contact').css('display', 'none');

  // pass search string into searching function
  var result = findContactByName(searchString);
  // result contains all the matched contact objects
  for (var i = 0; i < result.length; i++) {
    var phone = result[i].phone;
    var cc = result[i].cc;
    $('[id=' + phone + ']').each(function (i, obj) {
      if ($(obj).prev().html() == cc) {
        $(obj).parent().css('display', 'block');
      }
    });
  }
}

function loadMediaURL(url, type) {
  url = decodeURIComponent(url);
  console.log(url);
  if (type === "image") {
    var img = new Image();
    img.src = url;
    img.onload = function () {
      $('#mediaDisplay #displayContent').html(img);
      var width = $('#displayContent img').width();
      var height = $('#displayContent img').height();
      $('#mediaDisplay').css({
        height: height + 'px',
        width: width + 'px'
      });
    }
  } else if (type === "video") {
    $('#mediaDisplay').css({
      height: 460 + 'px',
      width: 618 + 'px',
      "max-width": 700 + 'px'
    });
    $('#mediaDisplay #displayContent').html('<video src="' + url + '" width="640" height="480"></video>');
    $('video').mediaelementplayer({
      // if the <video width> is not specified, this is the default
      defaultVideoWidth: 640,
      // if the <video height> is not specified, this is the default
      defaultVideoHeight: 480,
      // if set, overrides <video width>
      videoWidth: -1,
      // if set, overrides <video height>
      videoHeight: -1,
      // width of audio player
      audioWidth: 400,
      // height of audio player
      audioHeight: 30,
      // initial volume when the player starts
      startVolume: 1.0,
      // useful for <audio> player loops
      loop: false,
      // enables Flash and Silverlight to resize to content size
      enableAutosize: true,
      // the order of controls you want on the control bar (and other plugins below)
      features: ['playpause', 'progress', 'current', 'duration', 'volume', 'fullscreen'],
      // Hide controls when playing and mouse is not over the video
      alwaysShowControls: false,
      // force iPad's native controls
      iPadUseNativeControls: false,
      // force iPhone's native controls
      iPhoneUseNativeControls: false,
      // force Android's native controls
      AndroidUseNativeControls: false,
      // forces the hour marker (##:00:00)
      alwaysShowHours: false,
      // show framecount in timecode (##:00:00:00)
      showTimecodeFrameCount: false,
      // used when showTimecodeFrameCount is set to true
      framesPerSecond: 25,
      // turns keyboard support on and off for this instance
      enableKeyboard: true,
      // when this player starts, it will pause other players
      pauseOtherPlayers: true,
      // array of keyboard commands
      keyActions: []
    });
  }
  showMediaDisplay();
}

function showMediaDisplay() {
  showOverlay();
  $('#mediaDisplay').css({
    display: "block"
  });
}

function closeMediaDisplay() {
  closeOverlay();
  $('#mediaDisplay').css({
    display: "none",
    width: "200px",
    height: "40px",
    "max-width": '500px'
  });
  $('#mediaDisplay #displayContent').html("<div class=\"mediaLoading\">Loading</div>");
}

//Renders a Random Profile Pic for the logged in user
function renderProfPrev(ipElem) {
  var newName = $(ipElem).val();
  $('#profPreviewName').html(newName);
  if (newName == '') {
    $('#profPreviewName').html($('#profilename').html());
    randomPicGen($('#profPreviewPic'), $('#profilename').html());
    return;
  }
  if (newName.length == 1) {
    randomPicGen($('#profPreviewPic'), newName);
  }
}

// verification part starts here

//bring up verification window (first step will be on bt default)
function showVerWindow() {
  $('#varifyWindow').css('display', 'inline-block');
  $('#varifyWindow').animate({
    opacity: '1'
  }, 100, function () { //the window appears
    $(this).find('#varifyWindowContainerHeader').animate({
      opacity: '1'
    }, 100, function () { //header text appears
      $('#progBarBg').animate({
        opacity: '1'
      }, 100, function () { //the progress bar appears
        $('#fstStop').find('.innerDisk').animate({
          opacity: '1'
        }, 200); //first inner disk appears
        $('#stpDlgBox1').css({
          opacity: '0',
          display: 'inline-block'
        });
        $('#stpDlgBox1').animate({
          opacity: '1'
        }, 300, function () { // first dialouge box appears but without content
          $('#stpDlgBox1Container').animate({
            opacity: '1'
          }, 300, verMethodSelect('sms')); //content appears and MSG method selected by default
        });
      });
    });
  });
}

//  select verification method function
function verMethodSelect(method) {
  if (method == 'sms') {
    // clear whatever set for voice first
    $('#verVoiceWrapper').css('opacity', '');
    $('#selectVOICE').css('background-image', '');
    //set css for sms
    $('#verSMSWrapper').css('opacity', '1');
    $('#selectSMS').css('background-image', 'url("./icons/check_20x20.png")')
    $('#verSelectedIcon').css('background-image', 'url("./icons/msg2_min.png")');
    $('#verStp1LeftBottom').find('p').html('Code will be sent via SMS');
    YW.VIA = method;
  } else if (method == 'voice') {
    // clear whatever set for voice first
    $('#verSMSWrapper').css('opacity', '');
    $('#selectSMS').css('background-image', '')
      //set css for sms
    $('#verVoiceWrapper').css('opacity', '1');
    $('#selectVOICE').css('background-image', 'url("./icons/check_20x20.png")');
    $('#verSelectedIcon').css('background-image', 'url("./icons/voiceCall_min.png")');
    $('#verStp1LeftBottom').find('p').html('Code will be sent via Voice Call');
    YW.VIA = method;
  }
}

//show codeEnterWindow
function enterVerCode() {
  // fade out the content of first dialouge 
  $('#stpDlgBox1Container').animate({
    opacity: '0'
  }, 300, function () {
    $('#stpDlgBox1').animate({
      left: '71px'
    }, 400, function () { // move the window to next position
      // put inner disk in the progress bar
      $('#sndStop').find('.innerDisk').css('opacity', '1');
      // make right shifted first window disappear
      $('#stpDlgBox1').css('display', 'none');
      //make 2nd dialouge appear but not the content
      $('#stpDlgBox2').css('display', 'inline-block');
      //now fade in the content of the 2nd dialouge box
      $('#stpDlgBox2Container').animate({
        opacity: '1'
      }, 300, function () {
        //focus on Enter Code input box
        $('#verCodeField').focus(); // todo not working
      });
    });
    // put check mark for previous step
    $('#fstStop').find('.innerDisk').css('background-color', 'transparent');
    $('#fstStop').find('.innerDisk').css('background-image', 'url("./icons/check.png")');
  });
}

// shows the last step of varification
function successDialougeBox() {
  // fade out the content of second dialouge 
  $('#stpDlgBox2Container').animate({
    opacity: '0'
  }, 300, function () {
    $('#stpDlgBox2').animate({
      left: '71px'
    }, 400, function () { // move the window to next position
      // put inner disk in the progress bar
      $('#trdStop').find('.innerDisk').css('opacity', '1');
      // make right shifted first window disappear
      $('#stpDlgBox2').css('display', 'none');
      //make 2nd dialouge appear but not the content
      $('#stpDlgBox3').css('display', 'inline-block');
      //now fade in the content of the 2nd dialouge box
      $('#stpDlgBox3Container').animate({
        opacity: '1'
      }, 300);

      //animate glow the icon recursive
      glowSuccessIcon(5);

      function glowSuccessIcon(times) {
          if (!times) {
            return;
          }
          $('#verStp3Icon').animate({
            opacity: '.2'
          }, 500, function () {
            $('#verStp3Icon').animate({
              opacity: '.6'
            }, 500, function () {
              times--;
              glowSuccessIcon(times);
            });
          });
        }
        //---glowing ends

    });
    // put check mark for previous step
    $('#sndStop').find('.innerDisk').css('background-color', 'transparent');
    $('#sndStop').find('.innerDisk').css('background-image', 'url("./icons/check.png")');
  });
}