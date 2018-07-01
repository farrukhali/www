


var sessionCheck = function(){
var session = Blmani.Session.getInstance().get();
	if(!session){
		window.location ="login.html";
		return false;
	}
}

$(document).ready(function () {
	sessionCheck();
	if(!checkConnection()){
	  alert("Internet Connection not available!");
	  return false;
	}
	setFields();
});







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
    $("#preview-thumb").attr("src",imageURI);
	$('#preview-thumb').addClass("thumb-fullwidth");
	$("#thumbFieldError").fadeOut(300);
}

var onFail =function(){
	console.log("failed");
	
}


var getPhoto = function() {
	console.log("get photo called");
    navigator.camera.getPicture(onPhotoURISuccess, onFail, { quality: 50,
    sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY });
}

$(".upload-file-block").on("click", function(e){
    console.log("toucked  called");
	getPhoto();
} );




        // recommendedfrom
		
		var recommendedFormSubmitted = "false";
        jQuery(document).ready(function(e) {
		
            function t(t, n) {
				var imageURI = $('#preview-thumb').attr("src");
				if (!imageURI || imageURI == "images/image-icon.png") {
					//$("#thumbFieldError").fadeIn(300);
					//$("#upload-file-block").focus();
					$('#toast-3').addClass('show-toast');
			        setTimeout(function(){$('#toast-3').removeClass('show-toast');},3000);
					return false;
				}
				console.log("submit");
                recommendedFormSubmitted = "true";
				$(".loading-gif").removeClass("hideit");
				uploadThumb('preview-thumb');
				
            }

            function n(n, r) {
                e(".formValidationError").hide();
                e(".fieldHasError").removeClass("fieldHasError");
                e("#" + n + " .requiredField").each(function(i) {
                    if (e(this).val() == "" || e(this).val() == e(this).attr("data-dummy")) {
                        e(this).val(e(this).attr("data-dummy"));
                        e(this).focus();
                        e(this).addClass("fieldHasError");
                        e("#" + e(this).attr("id") + "Error").fadeIn(300);
						$('#toast-title').addClass('show-toast');
			            setTimeout(function(){$('#toast-title').removeClass('show-toast');},3000);
						
                        return false
                    }
                    if (e(this).hasClass("requiredEmailField")) {
                        var s = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
                        var o = "#" + e(this).attr("id");
                        if (!s.test(e(o).val())) {
                            e(o).focus();
                            e(o).addClass("fieldHasError");
                            e(o + "Error2").fadeIn(300);
                            return false
                        }
                    }
					if(e(this).hasClass("requireUrlField")){
						var s = /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;
						var o = "#" + e(this).attr("id");
						if (!s.test(e(o).val())) {
							e(o).focus();
                            e(o).addClass("fieldHasError");
                            e(o + "Error2").fadeIn(300);
                            return false
							
						}
					}
                    if (recommendedFormSubmitted == "false" && i == e("#" + n + " .requiredField").length - 1) {
                        t(n, r)
                    }
                })
            }
            e(".formValidationError").fadeOut(0);
            e('input[type="text"], input[type="password"]').focus(function() {
                if (e(this).val() == e(this).attr("data-dummy")) {
                    e(this).val("")
                }
            });
            e("input").blur(function() {
                if (e(this).val() == "") {
                    e(this).val(e(this).attr("data-dummy"))
                }
            });
            e("#recommendedSubmitButton").click(function() {
                n(e(this).attr("data-formId"));
                return false
            })
        })



