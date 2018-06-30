var Blmani = Blmani || {};
Blmani.Comic = (function () {
    var instance;
    function init() {
        var sessionIdKey = "blmani-comic";
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
            }
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


Blmani.Fields = (function () {
    var instance;
    function init() {
        var sessionIdKey = "blmani-fields";
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
            }
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


        
var checkConnection = function(){
	    var networkState = navigator.connection && navigator.connection.type;

        setTimeout(function(){
            networkState = navigator.connection && navigator.connection.type;
            console.log('Connection type: ' + networkState);
        }, 500);
		return true;
}


var isValidUrl = function(str){
	var regex = /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;
    if(!regex .test(str)) {
    alert("Please enter valid URL.");
    return false;
	} else {
		return true;
	}

}



var setFields = function(){
	var fields = Blmani.Fields.getInstance().get();
	if(!fields){
		$.ajax({
			  url: "http://blmani.com/wp-json/aniparti/get_field",
			  type: "post",
			  //data: {id:16842},
			  dataType: 'json',
			  success: function (response) {
				  Blmani.Fields.getInstance().set(response);
				  populateFieldDD();
				}
			 });
		} else {
			 populateFieldDD();
			 
	   }
}

var populateFieldDD = function(){
	var fields = Blmani.Fields.getInstance().get();
	$.each(fields,function(key,value){
				 if(key=="genre"){
					  $.each(value,function(id,genre){
					  $("select#select_genre").append('<option value="'+genre.ID+'" >'+genre.name+'</option>');
					 });
		         }
				 if(key=="a_type"){
					  $.each(value,function(id,atype){
					  $("select#select_atype").append('<option value="'+atype.ID+'" >'+atype.name+'</option>');
					 });
				  }
				  if(key=="d_type"){
					  $.each(value,function(id,dtype){
					  $("select#select_dtype").append('<option value="'+dtype.ID+'" >'+dtype.name+'</option>');
					 });
				  }
				  if(key=="content"){
					  $.each(value,function(id,content){
					  $("select#select_content").append('<option value="'+content.ID+'" >'+content.name+'</option>');
					 });
				  }
				  if(key=="title"){
					  $.each(value,function(id,title){
					  $("select#select_title").append('<option value="'+title.ID+'" >'+title.name+'</option>');
					 });
				  }
				  if(key=="character"){
					  $.each(value,function(id,character){
					  $("select#select_character").append('<option value="'+character.ID+'" >'+character.name+'</option>');
					 });
				  }
			 });	 
}

var  uploadThumb = function(fileid) {
	var imageURI = $('#'+fileid).attr("src");
	console.log("imageURI"+imageURI);
    var options = new FileUploadOptions();
    options.fileKey = "image";
    options.fileName = imageURI.substr(imageURI.lastIndexOf('/')+1);
    options.mimeType = "image/png";
    options.chunkedMode = false;

    var ft = new FileTransfer();
    ft.upload(imageURI, encodeURI("http://blmani.com/wp-json/aniparti/upload_image"), recSuccessFunc, recFailFunc,options)
	}




var recSuccessFunc = function(success) {
	
    console.log("Code = " + success.responseCode);
    console.log("Response = " + success.response);
    /*alert("Response =" + success.response);*/
    console.log("Sent = " + success.bytesSent);
	//return success;
	url =success.response;
	recommendedPost(url);
}

var recFailFunc =function(error) {
    //alert("An error has occurred: Code = " + error.code);
    console.log("upload error source " + error.source);
    console.log("upload error target " + error.target);
	//return error;
	url = "";
	recommendedPost(url);
}

var recommendedPost =function(url){
	var param = {}
	var tos = {};
	var ekeys = [];
	var pusers =[];
	var vdivision = $(".active-tab-pill-button").attr("id");
	tos['division'] = vdivision;
	
	if(vdivision==1){
		   var vtag = $('.fc-search-input').val();
		   console.log(vtag);
		   var vgenre = $("select#select_genre").val();
		   var vatype = $("select#select_atype").val();
		   var vdtype = $("select#select_dtype").val();
		   if(vgenre !=null){ tos['genre'] = vgenre;}
           if(vatype !=null){tos['a_type'] = vatype;}
		   if(vdtype !=null){tos['d_type'] = vdtype;}
		   if(vtag.trim() !=""){tos['search_tags'] = vtag;}
	} else {
		   var vtag = $(".sc-search-input").val();
		   var vcontent = $("select#select_content").val();
		   var vtitle = $("select#select_title").val();
		   var vcharacter = $("select#select_character").val();	
           if(vcontent !=null){tos['content'] = vcontent;}
		   if(vtitle !=null){tos['title'] = vtitle }
		   if(vcharacter !=null){tos['character'] = vcharacter;	}
		  if(vtag.trim() !=""){tos['search_tags'] = vtag;}
           		   
   }
    
	
	$("ul.additional-info-tags").children().each(function(i){
		ekeys[i] = $(this).text();
	});
	var pbound = $(".active-bounds").attr("id");
	if(pbound==4){
	   pboundkey = $(".privacy-passcode").val();
	   param['privacy'] = pbound;
	   param['privacykey'] = pboundkey;
	} else if(pbound==2){
	   $("ul.added-friends").children().each(function(i){
		pusers[i] = $(this).attr("id");
	   });
	   param['privacy'] = pbound;
	   param['pickusers'] = pusers;
	} else {
	  param['privacy'] = pbound;
	}
	
    
	param['thurl'] = url;
	param['title'] = $("#titleField").val();
	param['desc'] = $("textarea#descField").val();
	param['rurl'] = $("#urlflinkField").val();
	param['si'] = tos;
	param['extrakeys'] = ekeys;
	
   
	
	$(".loading-gif").addClass("hideit");
	//return false;
	var session = Blmani.Session.getInstance().get();
	param['uid'] = session.uid;
	console.log(JSON.stringify(param));
	
	$.ajax({
      url: "http://blmani.com/wp-json/aniparti/post_comic",
      type: "post",
      data: JSON.stringify(param),
	  contentType: 'application/json',
	  contentType: 'application/json',
		  beforeSend: function (xhr) {
			xhr.setRequestHeader('Authorization', 'Bearer '+session.token+'');
		},

      dataType: 'json',
		 success: function (response) {
			 console.log(response);
			 $(".loading-gif").addClass("hideit");
			 $("#view-post-btn").attr("href","story.html#"+response);
			 setTimeout(function(){$("a#show-success-popup").click();},500);
			},
		 error:function(response){
		     console.log(JSON.stringify(response));
             $(".loading-gif").addClass("hideit");
			 recommendedFormSubmitted = "false";
			 alert("Error Occurred!");
		 }
			
	 });
	
	
	
	
	
}




var delHash = function(e){
	//console.log($(e).text());
	$(e).remove();
}
var addMe = function(id,lobj){
	$(".added-friends").append('<li id="'+id+'" onclick="removeMe('+id+')"><span>'+$(lobj).text()+'</span></li>');
	$(".search-friends-span-close").click();
	
}
var removeMe = function(id){
	$("li#"+id).remove();
}
var delSelection = function(sel){
	       if(sel ==1){selv = "genre";}
		   if(sel ==2){selv = "atype";}
		   if(sel ==3){selv = "dtype";}
		   if(sel ==4){selv = "content";}
		   if(sel ==5){selv = "title";}
		   if(sel ==6){ selv = "character"; }
		  
		 $("li#s"+selv).remove();
		 $("select#select_"+selv).val("");
}


$(document).ready(function(){
	  var session = Blmani.Session.getInstance().get();
      $("select#select_genre").on('change', function(){
		  $("#sgenre").remove();
		  $(".fc-info-tags").append('<li id="sgenre"><span onClick="delSelection(1)">'+$(this).children(':selected').text()+'</span></li>');
	  });
	  $("select#select_atype").on('change', function(){
		  $("#satype").remove();
		  $(".fc-info-tags").append('<li id="satype"><span onClick="delSelection(2)">'+$(this).children(':selected').text()+'</span></li>');
	  });
	  $("select#select_dtype").on('change', function(){
		  $("#sdtype").remove();
		  $(".fc-info-tags").append('<li id="sdtype"><span onClick="delSelection(3)">'+$(this).children(':selected').text()+'</span></li>');
	  });
	  
	  $("select#select_content").on('change', function(){
		  $("#scontent").remove();
		  $(".sc-info-tags").append('<li id="scontent"><span onClick="delSelection(4)">'+$(this).children(':selected').text()+'</span></li>');
	  });
	  $("select#select_title").on('change', function(){
		  $("#stitle").remove();
		  $(".sc-info-tags").append('<li id="stitle"><span onClick="delSelection(5)">'+$(this).children(':selected').text()+'</span></li>');
	  });
	  $("select#select_character").on('change', function(){
		  $("#scharacter").remove();
		  $(".sc-info-tags").append('<li id="scharacter"><span onClick="delSelection(6)">'+$(this).children(':selected').text()+'</span></li>');
	  });
	 
	  $(".close-menu").on("click",function(){
		   $(".search-friends-input").val("");
		   $(".search-friends-results").addClass("hideit");
		   $(".search-friends-ul").html("");
		   $(".search-friends-span-close").addClass("hideit");
		   
	  })
       $(".search-friends-span-close").on("click",function(){
		   $(this).addClass("hideit");
		   $(".search-friends-input").val("");
		   $(".search-friends-results").addClass("hideit");
		   $(".search-friends-ul").html("");
		   $(".search-friends-input").removeClass('active-input-friends');
	  })
	  $("a.pb1").on("click",function(){
		  $("a.active-bounds").each(function(){
				 $(this).removeClass("active");
				 $(this).removeClass("active-bounds");
		  });
		  $("a.pb1").addClass("active");
		  $("a.pb1").addClass("active-bounds");
	  });
	  $("a.pb3").on("click",function(){
		  $("a.active-bounds").each(function(){
				 $(this).removeClass("active");
				 $(this).removeClass("active-bounds");
		  });
		  $("a.pb3").addClass("active");
		  $("a.pb3").addClass("active-bounds");
	  });
      $(".add-friends-done").on('click',function(){
		  console.log($('ul.added-friends li').length);
		  if($('ul.added-friends li').length>0){
			 $("a.active-bounds").each(function(){
				 $(this).removeClass("active");
				 $(this).removeClass("active-bounds");
			 });
			 $("a.pb2").addClass("active");
			 $("a.pb2").addClass("active-bounds");
			 $(".close-menu").click();
		  } else {
			$('#toast-1').addClass('show-toast');
			setTimeout(function(){$('#toast-1').removeClass('show-toast');},3000);
		  }
		  
	  })
       $(".privacy-passcode-done").on("click",function(){
		   console.log($(".privacy-passcode").val().trim().length);
		   if($(".privacy-passcode").val().trim().length<4){
			 $('#toast-2').addClass('show-toast');
			setTimeout(function(){$('#toast-2').removeClass('show-toast');},3000);  
		   } else{
			 $("a.active-bounds").each(function(){
				 $(this).removeClass("active");
				 $(this).removeClass("active-bounds");
			 });
			 $("a.pb4").addClass("active");
			 $("a.pb4").addClass("active-bounds");
			 $(".close-menu").click();  
		   }
	   });	  
	   $(".privacy-passcode-eye").on("click",function(){
		   if($(".privacy-passcode").attr("type")=="text"){
			  $(".privacy-passcode").attr("type","password");
		   } else{
			  $(".privacy-passcode").attr("type","text"); 
		   }
	   });
	  $(".search-friends-input").on("keydown",function(){
			   
				if($(this).val().length>1){
					 var searchp ={};
					 searchp['str'] = $(this).val();
					 searchp['uid'] = session.uid;
					 console.log(searchp);
					 $(".search-friends-span").removeClass("hideit");
					 $(".search-friends-span-close").addClass("hideit");
					 $(".search-friends-input").addClass('active-input-friends');
                      $.ajax({
						  url: "http://blmani.com/wp-json/aniparti/getusers",
						  type: "post",
						  data: searchp,
						  dataType: 'json'
						  }).then(function (response) {
							     $(".search-friends-span").addClass("hideit");
								 $(".search-friends-results").removeClass("hideit");
								 $(".search-friends-span-close").removeClass("hideit");
								 $(".search-friends-ul").html("");
								 var count = 0;
								 $.each(response,function(key,value){
									 if(count<5){
									  $(".search-friends-ul").append('<li onClick="addMe('+value.ID+',this)">'+value.display_name+'</li>');
									 }
									 count++;
									
								 })
								
								 console.log(response);
								 
								
						})				 
				}
	  });

      $(".post-story-icon").on("click",function(){
		  var session = Blmani.Session.getInstance().get();
		  if(!session){
			  window.location = "login.html";
		  } else {
			  // show pop-p for now redirect to recommended;
			  window.location = "recommended.html";
		  }
		  
	  });  
	  
	  $(".add-hash-tags").on("click",function(){
		 console.log("clcikced");
		 var tag = $('.additional-hash-keywords').val();
		 $('.additional-hash-keywords').val('');
		 if($.trim(tag)!==""){
			 $(".additional-info-tags").append('<li onClick="delHash(this)"><span>'+tag+'</span></li>');
		 }
	  })
	  $("#copy-to-clipboard-btn").on("click", function(){
		   console.log("f called");
	       copyToClipboard("#copy-to-clipboard");
		  
	  });
	  


});


var copyToClipboard = function (element) {
 var $temp = $("<input>");
 $("body").append($temp);
 $temp.val($(element).val());
 //console.log($temp.value);
 var s = document.execCommand("copy");
 //console.log(s);
 $temp.remove();
}
