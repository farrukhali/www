var Blmani = Blmani || {};
Blmani.Session = (function () {
    var instance;
    function init() {
        var sessionIdKey = "blmani-session";
        return {
            // Public methods and variables.
            set: function (sessionData) {
                window.localStorage.setItem(sessionIdKey, JSON.stringify(sessionData));
            },
            get: function () {
                var result = null;
                try {
                    result = JSON.parse(window.localStorage.getItem(sessionIdKey));
                } catch(e){}
                return result;
            },
            destroy: function(){
				window.localStorage.removeItem(sessionIdKey);
				
				
			},			
			
        };
    };
    return {
        getInstance: function () {
            if (!instance) {
                instance = init();
            }
            return instance;
        }
    };
}());




var pictureSource;   // picture source
var destinationType; // sets the format of returned value

// Wait for device API libraries to load
//
document.addEventListener("deviceready",onDeviceReady,false);

// device APIs are available
//
function onDeviceReady() {
    pictureSource = navigator.camera.PictureSourceType;
    destinationType = navigator.camera.DestinationType;
}


function onPhotoURISuccess(imageURI) {
    $("#user_profile_pic-thumb").attr("src",imageURI);
	$(".loading-gif").removeClass("hideit");
	var options = new FileUploadOptions();
    options.fileKey = "image";
    options.fileName = imageURI.substr(imageURI.lastIndexOf('/')+1);
    options.mimeType = "image/png";
    options.chunkedMode = false;

    var ft = new FileTransfer();
    ft.upload(imageURI, encodeURI("http://blmani.com/wp-json/aniparti/upload_asset"), userImageSuc, userImageFail,options)
	}

}


var userImageSuc = function(success) {
	console.log(JSON.stringify(success));
    var url = success.response.replace('"','');
	var url = url.replace('"','');
	purl =url;//"";//"blmani.com"+url;
	var session = Blmani.Session.getInstance().get();
	params = {};
	params['uid'] = session.uid;
	params['url'] = purl;
	console.log(params);
	
	$.ajax({
					  url: "http://blmani.com/wp-json/aniparti/userimage",
					  type: "post",
				      data: params,
					  dataType: 'json',
					  success: function (response) {
						   console.log(response);
						   $(".loading-gif").addClass("hideit");
						      session.user_pic = response; 
							  Blmani.Session.getInstance().set(session);
							  $('#toast-x').html("Profile Pic Successfully Updated!"); 
							  $('#toast-x').addClass('show-toast');
							  setTimeout(function(){$('#toast-x').removeClass('show-toast');},2000);
						   
			               
						},
					    error: function (jqXHR, textStatus, errorThrown) {
                               console.log(textStatus, errorThrown);
							   loginFormSubmitted = "false";
							   $(".loading-gif").addClass("hideit");
						       return false;
                        }
	 });
	
	
	
}

var userImageFail =function(error) {
    //alert("An error has occurred: Code = " + error.code);
    console.log("upload error source " + error.source);
    console.log("upload error target " + error.target);
	$('#toast-x').html("Error Occurred!"); 
	$(".loading-gif").addClass("hideit");
    $("#toast-x").addClass("show-toast");
    setTimeout(function(){$("#toast-x").removeClass("show-toast");},2000);
}

var onFail =function(){
	console.log("failed");
	
}


var getPhoto = function() {
	console.log("get photo called");
    navigator.camera.getPicture(onPhotoURISuccess, onFail, { quality: 50,
    sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY });
}




$(document).ready(function(){

$("#user_profile_pic").on("click",function(){
   	getPhoto();
});

$("#edit_nick_name_done").on("click",function(){
var session = Blmani.Session.getInstance().get();
params ={};
params['uid'] = session.uid;
var dname = $("input#edit_nick_name").val();
if(dname ==""){
   $('#toast-x').html("Please Enter nickname!"); 
   $("#toast-x").addClass("show-toast");
   setTimeout(function(){$("#toast-x").removeClass("show-toast");},2000);
   return false;
} 
params['dname'] = dname;

          $(".loading-gif").removeClass("hideit");
          console.log(params);
				$.ajax({
					  url: "http://blmani.com/wp-json/aniparti/changedname",
					  type: "post",
				      data: params,
					  dataType: 'json',
					  success: function (response) {
						   console.log(response);
						   $(".loading-gif").addClass("hideit");
						   if(response=="success"){
							  session.user_nicename = dname; 
							  Blmani.Session.getInstance().set(session);
							  $('#toast-x').html("Nick Name Successfully Updated!"); 
							  $('#toast-x').addClass('show-toast');
							  setTimeout(function(){$('#toast-x').removeClass('show-toast'); window.location ="profile.html";},2000);
						   } else {
							  $('#toast-2').html(""+response); 
							  $('#toast-2').addClass('show-toast');
							  setTimeout(function(){$('#toast-2').removeClass('show-toast');},2000);  
						   }
						   
						   
						  
			               
						},
					    error: function (jqXHR, textStatus, errorThrown) {
                               console.log(textStatus, errorThrown);
							   loginFormSubmitted = "false";
							   $(".loading-gif").addClass("hideit");
						       return false;
                        }
	 });

});

});





var logout = function(){
	Blmani.Session.getInstance().destroy();
	//fbLogout();
	if($("div#menu-1").length){
	$('.user-logined').addClass("hideit");
	$('.user-not-logined').removeClass("hideit");
    console.log("session expired");
    }
	window.location="comic.html";
}
var fbLogin = function () {
                if (!window.cordova) {
                    var appId = prompt("Enter FB Application ID", "");
                    facebookConnectPlugin.browserInit(appId);
                }
                
                facebookConnectPlugin.login(["public_profile", "email"],
                    function (res){
                        console.log(JSON.stringify(res));
                        console.log(res.authResponse)
                        if (res.status == "connected") {
							fbRegisterLoginUser(res);
                        /*facebookConnectPlugin.api("/" + res.authResponse.userID, ["public_profile", "email"],
                                             fbRegisterLoginUser,
                                             function (response) {
                                              alert("Error Occurred");
                                              console.log(JSON.stringify(response));
                                              });*/
                        } else {
                         alert("Error Occurred");
                        }
                    },
                    function (response) {
                    console.log("login failed");
                    alert("Error Occurred!");
                    console.log(JSON.stringify(response));

                     });
  }
var fbLoginSuccess = function (){
console.log("login success");
 facebookConnectPlugin.api("me/?fields=id,name,picture,email",
                     function(res){console.log("me called"+JSON.stringify(res));},
                     function (response) {
                      alert("Error Occurred");
                      console.log(JSON.stringify(response));
                      });
}

var fbRegisterLoginUser = function(userData){
   console.log("fbRegisterLoginUser called");
    console.log(JSON.stringify(userData));
    $(".loading-gif").removeClass(".hideit");
    var loginFormSubmitted = "true";
    var params = {};
    params["fbid"] = userData.id;
    if(userData.email){
    params["username"] = userData.email;
    params["email"] = userData.email;
    } else {
    params["username"] = userData.id;
    params["email"] = userData.id;
    }
	if(userData.name){
	params["user_display_name"] = userData.name;
	} else{
	params["user_display_name"] = userData.id;	
	}
    params["password"] = userData.id;
    
    console.log(JSON.stringify(params));
    $.ajax({
    			url: "http://blmani.com/wp-json/aniparti/fb_register",
    			type: "post",
    			data: params,
    			dataType: 'json',
    			success: function (response) {
    			console.log("manzar");

    			console.log(JSON.stringify(response));
    			if(response.status == "Error"){
                 loginFormSubmitted = "false";
                 $(".loading-gif").addClass("hideit");
                   alert(response.msg);
    			  } else {
    			  Blmani.Session.getInstance().set(JSON.stringify(response));
    			  $(".loading-gif").addClass("hideit");
                  $('.toast').addClass('show-toast');
                  setTimeout(function(){window.location = "comic.html";},1500);
                  }
    		   }

    });



console.log(JSON.stringify(response));
}

           var fbLogout = function () {
                facebookConnectPlugin.logout(
                    function (response) { console.log(JSON.stringify(response)) },
                    function (response) { console.log(JSON.stringify(response)) });
           }

           var getStatus = function () {
                           facebookConnectPlugin.getLoginStatus(
                               function (response) { alert(JSON.stringify(response)) },
                               function (response) { alert(JSON.stringify(response)) });
            }


		$('.profile-links--signout').on('click', logout);
        var session = Blmani.Session.getInstance().get();
		console.log(session);
		if($("div#menu-1").length){
		if(!session){
			$('.user-logined').addClass("hideit");
			console.log("session expired");
		} else {
			$('.user-not-logined').addClass("hideit");
			$('.profile-title').html(session.user_nicename);
			if(session.user_pic.indexOf("avatar") == -1){
			$('.profile-image').attr("src",'"'+session.user_pic+'"');
			$("#user_profile_pic").attr("src",'"'+session.user_pic+'"');
			}
			$("li#li_nick_name").html('Nick name <strong >('+session.user_nicename+')</strong><a href="#" data-menu="edit-nickname-modal" class="color-red">Edit</a>');
			
		}

	}

            
          /*  var showDialog = function () {
                facebookConnectPlugin.showDialog( { method: "feed" }, 
                    function (response) { alert(JSON.stringify(response)) },
                    function (response) { alert(JSON.stringify(response)) });
            }
            
            var apiTest = function () { 
                facebookConnectPlugin.api( "me/?fields=id,email", ["public_profile"],
                    function (response) { alert(JSON.stringify(response)) },
                    function (response) { alert(JSON.stringify(response)) }); 
            }
            var logPurchase = function () {
                facebookConnectPlugin.logPurchase(1.99, "USD",
                    function (response) { alert(JSON.stringify(response)) },
                    function (response) { alert(JSON.stringify(response)) });
            }
            var logEvent = function () {
                // For more information on AppEvent param structure see
                // https://developers.facebook.com/docs/ios/app-events
                // https://developers.facebook.com/docs/android/app-events
                facebookConnectPlugin.logEvent("Purchased",
                    {
                        NumItems: 1,
                        Currency: "USD",
                        ContentType: "shoes",
                        ContentID: "HDFU-8452"
                    }, null,
                    function (response) { alert(JSON.stringify(response)) },
                    function (response) { alert(JSON.stringify(response)) });
            }
            var getAccessToken = function () { 
                facebookConnectPlugin.getAccessToken( 
                    function (response) { alert(JSON.stringify(response)) },
                    function (response) { alert(JSON.stringify(response)) });
            }
            
            var getStatus = function () { 
                facebookConnectPlugin.getLoginStatus( 
                    function (response) { alert(JSON.stringify(response)) },
                    function (response) { alert(JSON.stringify(response)) });
            }*/
           