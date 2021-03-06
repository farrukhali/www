var Blmani = Blmani || {};
Blmani.Tos = (function () {
    var instance;
    function init() {
        var sessionIdKey = "blmani-tos";
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




Blmani.Language = (function () {
    var instance;
    function init() {
        var sessionIdKey = "blmani-lang";
        return {
            // Public methods and variables.
            set: function (langid) {
                window.localStorage.setItem(sessionIdKey, langid);
            },
            get: function () {
                var result = null;
                try {
                    result = window.localStorage.getItem(sessionIdKey,1);
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
				console.log("new fields set");
                window.localStorage.setItem(sessionIdKey, JSON.stringify(sessionData));
            },
            get: function () {
                var result = null;
                try {
					console.log("getting fields form localStorage");
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


var unpublishPost =function(value){
	      $(".loading-gif-centered").removeClass("hideit");
	      var session = Blmani.Session.getInstance().get();
	      var params={};
		  params['uid'] = session.uid;
		  params['pid'] = value;
          $.ajax({
			  url: "http://blmani.com/wp-json/aniparti/unpublish",
			  type: "post",
			  data: params,
			  dataType: 'json',
			  success: function (response) {
				   console.log(response);
				   $(".loading-gif-centered").addClass("hideit");
				   $('#toast-2').addClass('show-toast');
				   $(".latest-comics-all").children().each(function() {
                   if($(this).hasClass("item-selected")){
					  $(this).remove();
				   }
				   });
				   $('.footer-fixed.regular-footer').removeClass('move-out');
                   $('.footer-fixed.action-footer').removeClass('come-in');
        
            
                   setTimeout(function(){$('#toast-2').removeClass('show-toast');},2000);	
				   
			}
	  });
}
	  
	  
	  


        
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

var canViewIt = function(privacyid,postid){
    if(privacyid==1 || privacyid==""){
	  window.location = "story.html#"+postid;
	} 
	if(privacyid==4){
		//locked
		if(!session){
		 alert("This Comic is Protected Login to view it.");
		} else {
		$(".password-protected-link").click();
		window.localStorage.setItem("pcpc",postid);
		}
	}
	if(privacyid==2){
		//my pick
		if(!session){
		 alert("This Comic is Protected Login to view it.");
		} else {
		$(".loading-gif-centered").removeClass("hideit");
		var params ={};
		params['postid'] = postid;
		params['uid'] = session.uid;
		
		$.ajax({
			  url: "http://blmani.com/wp-json/aniparti/checkuser",
			  type: "post",
			  data: params,
			  dataType: 'json',
			  success: function (response) {
				   console.log(response);
				   $(".loading-gif-centered").addClass("hideit");
				   if(response=="yes"){
					   window.location ="story.html#"+postid;
					   
				   } else {
					  alert("This comic is for specific users, you cant view it"); 
				   }
				   
			},
		     error :function(error){
				 console.log(error);
			 }
	  });
		
		
	    
		}		
	}
}



var setFields = function(){
	var fields = Blmani.Fields.getInstance().get();
	var langid  = Blmani.Language.getInstance().get();
	var params ={};
	if(!langid){
	 params['lang'] = 1;
	} else {
	 params['lang'] = langid;	
	}
	console.log(params)
	if(!fields){
		$.ajax({
			  url: "http://blmani.com/wp-json/aniparti/get_field",
			  type: "post",
			  data: params,
			  dataType: 'json',
			  success: function (response) {
				  console.log(response);
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
	var langid  = Blmani.Language.getInstance().get();
	if(!langid){
		langid = 1;
	}
	$("select#select_genre").html('<option value="" selected="" disabled="">Genre</option>');
	$("select#select_atype").html('<option value="" selected="" disabled="">A-Type</option>');
	$("select#select_dtype").html('<option value="" selected="" disabled="">D-Type</option>');
	$("select#select_content").html('<option value="" selected="" disabled="">Content</option>');
	$("select#select_title").html('<option value="" selected="" disabled="">Title</option>');
	$("select#select_character").html('<option value="" selected="" disabled="">Character</option>');
	$.each(fields,function(key,value){
				 if(key=="genre"){ 
					 
					 $.each(value,function(id,genre){
					 if(langid==2 && genre.lang=="ko"){
						$("select#select_genre").append('<option value="'+genre.ID+'" >'+genre.name+'</option>');
					 } else if(genre.lang=="en" && langid==1){
					   $("select#select_genre").append('<option value="'+genre.ID+'" >'+genre.name+'</option>'); 
					 }
						 
					 
					 });
		         }
				 if(key=="a_type"){
					  $.each(value,function(id,atype){
					 if(langid==2 && atype.lang=="ko"){
					  $("select#select_atype").append('<option value="'+atype.ID+'" >'+atype.name+'</option>');
					 } else if(atype.lang=="en" && langid==1){
					   $("select#select_atype").append('<option value="'+atype.ID+'" >'+atype.name+'</option>'); 
					  }
					 });
				  }
				  if(key=="d_type"){
					  $.each(value,function(id,dtype){
					  if(langid==2 && dtype.lang=="ko"){
					     $("select#select_dtype").append('<option value="'+dtype.ID+'" >'+dtype.name+'</option>');
					   } else if(dtype.lang=="en" && langid==1){
						  $("select#select_dtype").append('<option value="'+dtype.ID+'" >'+dtype.name+'</option>');  
					   }
					 });
				  }
				  if(key=="content"){
					  $.each(value,function(id,content){
					  if(langid==2 && content.lang=="ko"){
					  $("select#select_content").append('<option value="'+content.ID+'" >'+content.name+'</option>');
					  } else if(content.lang=="en" && langid==1){
					  $("select#select_content").append('<option value="'+content.ID+'" >'+content.name+'</option>');  	  
					  }
					 });
				  }
				  if(key=="title"){
					  $.each(value,function(id,title){
					   if(langid==2 && title.lang=="ko"){
					   $("select#select_title").append('<option value="'+title.ID+'" >'+title.name+'</option>');
					   } else if(title.lang=="en" && langid==1){
					   $("select#select_title").append('<option value="'+title.ID+'" >'+title.name+'</option>');	  
					  }
					 });
				  }
				  if(key=="character"){
					  console.log("language set"+langid);
					  $.each(value,function(id,character){
					  if(langid==2 && character.lang=="ko"){
					  $("select#select_character").append('<option value="'+character.ID+'" >'+character.name+'</option>');
					  } else if(character.lang=="en" && langid==1){
					  $("select#select_character").append('<option value="'+character.ID+'" >'+character.name+'</option>');	  
					  } 
					  
					  
					 });
				  }
			 });	 
}

/*var  uploadThumb = function(fileid) {
	var imageURI = $('#'+fileid).attr("src");
	console.log("imageURI"+imageURI);
    var options = new FileUploadOptions();
    options.fileKey = "image";
    options.fileName = imageURI.substr(imageURI.lastIndexOf('/')+1);
    options.mimeType = "image/png";
    options.chunkedMode = false;

    var ft = new FileTransfer();
    ft.upload(imageURI, encodeURI("http://blmani.com/wp-json/aniparti/upload_image"), recSuccessFunc, recFailFunc,options)
	}*/
	
	
var  uploadThumb = function(fileid) {
	var imageURI = $('#'+fileid).attr("src");
	console.log("imageURI"+imageURI);
    var options = new FileUploadOptions();
    options.fileKey = "file";
    options.fileName = imageURI.substr(imageURI.lastIndexOf('/')+1);
    options.mimeType = "image/png";
    options.chunkedMode = false;
	
	 console.log("abc15");
	var param = {}
	var tos = {};
	var ekeys = [];
	var pusers =[];
	var vdivision = $(".active-tab-pill-button").attr("id");
	tos['division'] = vdivision;
	
	if(vdivision==1){
		   var vgenre = $("select#select_genre").val();
		   var vatype = $("select#select_atype").val();
		   var vdtype = $("select#select_dtype").val();
		   if(vgenre !=null){ tos['genre'] = vgenre;}
           if(vatype !=null){tos['a_type'] = vatype;}
		   if(vdtype !=null){tos['d_type'] = vdtype;}
		  
	} else {
		  var vcontent = $("select#select_content").val();
		   var vtitle = $("select#select_title").val();
		   var vcharacter = $("select#select_character").val();	
           if(vcontent !=null){tos['content'] = vcontent;}
		   if(vtitle !=null){tos['title'] = vtitle }
		   if(vcharacter !=null){tos['character'] = vcharacter;	}
		  
   }
    
	
	$("ul.additional-info-tags").children().each(function(i){
		ekeys[i] = encodeURI($(this).text());
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
	
    
	//param['title'] = $("#titleField").val();
	//param['desc'] = $("textarea#descField").val();
	//param['rurl'] = $("#urlflinkField").val();
	param['si'] = tos;
	//param['extrakeys'] = ekeys;
	var session = Blmani.Session.getInstance().get();
    param['id'] = session.uid;
    console.log("paramsyaali"+param);
	params = {} ;
    params["params"] = btoa(JSON.stringify(param));
    params["title"] = $("#titleField").val();
    params["desc"] = $("textarea#descField").val();
    //params["extrakeys"] = ekeys;
    params['rurl'] = $("#urlflinkField").val();
    $("ul.additional-info-tags").children().each(function(i){
        	params["extrakeys"+i] = $(this).text();
    });

	console.log("ya ali madad"+JSON.stringify(params));
	//console.log(btoa(JSON.stringify(params)));
	options.params = params;
    console.log(JSON.stringify(options));
	Blmani.Tos.getInstance().set(tos);
    var ft = new FileTransfer();
    ft.upload(imageURI, encodeURI("http://blmani.com/wp-json/aniparti/post_comic_new"), recSuccessFunc, recFailFunc,options)
}


var recSuccessFunc = function(success) {
	        console.log(JSON.stringify(success));
	        $(".loading-gif-centered").addClass("hideit");
             $("a#show-success-popup").click();
  			 console.log(JSON.stringify(success.response));
  			 var res = JSON.parse(success.response);
  			 console.log("res12"+res);
             var shmsg = $("#titleField").val()+" "+$("textarea#descField").val();
             console.log("pid"+res.pid);
  			 console.log("shmsg1"+shmsg);
  			 console.log("shurl1"+res.url);
  			 console.log("thurl1"+res.thumburl);
  			 $("#close-post-btn").on("click",function(){
  			  var tos = Blmani.Tos.getInstance().get();
  			  console.log("tos"+tos);
  			  tos.pid = res.pid;
  			  console.log("tos"+tos);
  			  Blmani.Tos.getInstance().set(tos);
  			  window.location.replace("search.html");

             });

  			 $("#copy-to-clipboard").val(res.url);
  			 $("#view-post-btn").on("click",function(){
  			   showComic(2,res.pid,$("#urlflinkField").val());
  			 });
  			 $("#facebook_share_btn").on("click",function(){
  			   sharePostViaFacebook(2,shmsg,res.thumburl,res.url);

  			 });
  			 $("#twitter_share_btn").on("click",function(){
  			   sharePostViaTwitter(2,shmsg,res.thumburl,res.url);

  			 });

  			 $("#copy-to-clipboard-btn").on("click",function(){
  			   copyToClipBoard();

  			 });
}

var recFailFunc =function(error) {
    //alert("An error has occurred: Code = " + error.code);
    console.log("upload error source " + error.source);
    console.log("upload error target " + error.target);
    $(".loading-gif-centered").addClass("hideit");
	alert("error Occurred");
	//return error;
	//url = "";
	//recommendedPost(url);
}


var  uploadPublishThumb = function(fileid) {
	var imageURI = $('#'+fileid).attr("src");
	console.log("imageURI"+imageURI);
    var options = new FileUploadOptions();
    options.fileKey = "file";
    options.fileName = imageURI.substr(imageURI.lastIndexOf('/')+1);
    options.mimeType = "image/png";
    options.chunkedMode = false;
	
	
	console.log("abc14");
	var param = {}
	var tos = {};
	var ekeys = {};
	var pusers =[];
	var vdivision = $(".active-tab-pill-button").attr("id");
	tos['division'] = vdivision;
	
	if(vdivision==1){
		   //var vtag = $('.fc-search-input').val();
		   //console.log(vtag);
		   var vgenre = $("select#select_genre").val();
		   var vatype = $("select#select_atype").val();
		   var vdtype = $("select#select_dtype").val();
		   if(vgenre !=null){ tos['genre'] = vgenre;}
           if(vatype !=null){tos['a_type'] = vatype;}
		   if(vdtype !=null){tos['d_type'] = vdtype;}
		   //if(vtag.trim() !=""){tos['search_tags'] = vtag;}
	} else {
		   //var vtag = $(".sc-search-input").val();
		   var vcontent = $("select#select_content").val();
		   var vtitle = $("select#select_title").val();
		   var vcharacter = $("select#select_character").val();	
           if(vcontent !=null){tos['content'] = vcontent;}
		   if(vtitle !=null){tos['title'] = vtitle }
		   if(vcharacter !=null){tos['character'] = vcharacter;	}
		   //if(vtag.trim() !=""){tos['search_tags'] = vtag;}
           		   
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
	
    
	//param['title'] = $("#titleField").val();
	//param['desc'] = $("textarea#descField").val();
	param['si'] = tos;
	//param['extrakeys'] = ekeys;
    param['siid'] = $("input#saveitemid").val();
	var session = Blmani.Session.getInstance().get();
    param['id'] = session.uid;
	params = {} ;
    params["params"] = btoa(JSON.stringify(param));
    params["title"] = $("#titleField").val();
    params["desc"] = $("textarea#descField").val();
    //params["extrakeys"] = JSON.stringify(ekeys);
    $("ul.additional-info-tags").children().each(function(i){
    	params["extrakeys"+i] = $(this).text();
    });
	
	console.log("12141214"+JSON.stringify(params));
	console.log(JSON.stringify(ekeys))
	options.params = params;
    console.log(JSON.stringify(options));
	Blmani.Tos.getInstance().set(tos);

    var ft = new FileTransfer();
    ft.upload(imageURI, encodeURI("http://blmani.com/wp-json/aniparti/post_comic_new"), pubSuccessFunc, pubFailFunc,options)
	}





var pubSuccessFunc = function(success) {
	console.log(JSON.stringify(success));
    
	
	$(".loading-gif-centered").addClass("hideit");
             $("a#show-success-popup").click();
  			 console.log(JSON.stringify(success.response));
  			 var res = JSON.parse(success.response);
  			 console.log("res12"+res);
             var shmsg = $("#titleField").val()+" "+$("textarea#descField").val();
             console.log("pid"+res.pid);
  			 console.log("shmsg1"+shmsg);
  			 console.log("shurl1"+res.url);
  			 console.log("thurl1"+res.thumburl);
  			 $("#close-post-btn").on("click",function(){
  			  var tos = Blmani.Tos.getInstance().get();
  			  console.log("tos"+tos);
  			  tos.pid = res.pid;
  			  console.log("tos"+tos);
  			  Blmani.Tos.getInstance().set(tos);
  			  window.location.replace("search.html");

             });

  			 $("#copy-to-clipboard").val(res.url);
  			 $("#view-post-btn").on("click",function(){
  			   showComic(4,res.pid,'');
  			 });
  			 $("#facebook_share_btn").on("click",function(){
  			   sharePostViaFacebook(2,shmsg,res.thumburl,res.url);

  			 });
  			 $("#twitter_share_btn").on("click",function(){
  			   sharePostViaTwitter(2,shmsg,res.thumburl,res.url);

  			 });

  			 $("#copy-to-clipboard-btn").on("click",function(){
  			   copyToClipBoard();

  			 });
	
	
	
	//var url = success.response.replace('"','');
	//var url = url.replace('"','');
	//purl =url;//"";//"blmani.com"+url;
	//console.log(purl);
	//publishPost(purl);
}

var pubFailFunc =function(error) {
    //alert("An error has occurred: Code = " + error.code);
    console.log("upload error source " + error.source);
    console.log("upload error target " + error.target);
	$(".loading-gif-centered").addClass("hideit");
	alert("error Occurred");
	//return error;
	//url = "";
	//publishPost(url);
}



	
/*	
var recommendedPost =function(url){
    console.log("abc14");
	var param = {}
	var tos = {};
	var ekeys = [];
	var pusers =[];
	var vdivision = $(".active-tab-pill-button").attr("id");
	tos['division'] = vdivision;
	
	if(vdivision==1){
		   var vgenre = $("select#select_genre").val();
		   var vatype = $("select#select_atype").val();
		   var vdtype = $("select#select_dtype").val();
		   if(vgenre !=null){ tos['genre'] = vgenre;}
           if(vatype !=null){tos['a_type'] = vatype;}
		   if(vdtype !=null){tos['d_type'] = vdtype;}
		  
	} else {
		  var vcontent = $("select#select_content").val();
		   var vtitle = $("select#select_title").val();
		   var vcharacter = $("select#select_character").val();	
           if(vcontent !=null){tos['content'] = vcontent;}
		   if(vtitle !=null){tos['title'] = vtitle }
		   if(vcharacter !=null){tos['character'] = vcharacter;	}
		  
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
	Blmani.Tos.getInstance().set(tos);
   
	
	//$(".loading-gif").addClass("hideit");
	//return false;
	var session = Blmani.Session.getInstance().get();
	param['id'] = session.uid;
	console.log(JSON.stringify(param));
	
	$.ajax({
      url: "http://blmani.com/wp-json/aniparti/post_comic",
      type: "post",
      data: param,
	  //contentType: 'application/json',
	  // beforeSend: function (xhr) {
	  //		xhr.setRequestHeader('Authorization', 'Bearer '+session.token+'');
	  //	},

      dataType: 'json',
		 success: function (response) {
             $("a#show-success-popup").click();
			 console.log(JSON.stringify(response));
			 $(".loading-gif-centered").addClass("hideit");
			 $("#close-post-btn").on("click",function(){
			  tos["pid"] = response.pid;
			  console.log("tos"+tos);
			  Blmani.Tos.getInstance().set(tos);
			  window.location.replace("search.html");
			  
			 
             });
			   
			 $("#copy-to-clipboard").val(response.url);
			 $("#view-post-btn").on("click",function(){
			   showComic(2,response.pid,$("#urlflinkField").val());
			 });
			 $("#facebook_share_btn").on("click",function(){
			   sharePostViaFacebook(2,'','','','http://blmani.com');
			  
			 });
			 $("#facebook_share_btn").on("click",function(){
			   sharePostViaTwitter(2,'','','','http://blmani.com');
			  
			 });
			 
			 $("#copy-to-clipboard-btn").on("click",function(){
			   copyToClipBoard();
			  
			 });
			 
			},
		 error:function(response){
		     console.log(JSON.stringify(response));
             $(".loading-gif-centered").addClass("hideit");
			 recommendedFormSubmitted = "false";
			 alert("Error Occurred!");
		 }
			
	 });
	
	
	
	
	
}


var recSuccessFunc = function(success) {
	console.log(JSON.stringify(success));
    var url = success.response.replace('"','');
	var url = url.replace('"','');
	purl =url;//"";//"blmani.com"+url;
	console.log(purl);
	recommendedPost(purl);
}

var recFailFunc =function(error) {
    //alert("An error has occurred: Code = " + error.code);
    console.log("upload error source " + error.source);
    console.log("upload error target " + error.target);
	//return error;
	url = "";
	recommendedPost(url);
}*/
	

var publishPost = function(url){
    console.log("abc12");
	var param = {}
	var tos = {};
	var ekeys = [];
	var pusers =[];
	var vdivision = $(".active-tab-pill-button").attr("id");
	tos['division'] = vdivision;
	
	if(vdivision==1){
		   //var vtag = $('.fc-search-input').val();
		   //console.log(vtag);
		   var vgenre = $("select#select_genre").val();
		   var vatype = $("select#select_atype").val();
		   var vdtype = $("select#select_dtype").val();
		   if(vgenre !=null){ tos['genre'] = vgenre;}
           if(vatype !=null){tos['a_type'] = vatype;}
		   if(vdtype !=null){tos['d_type'] = vdtype;}
		   //if(vtag.trim() !=""){tos['search_tags'] = vtag;}
	} else {
		   //var vtag = $(".sc-search-input").val();
		   var vcontent = $("select#select_content").val();
		   var vtitle = $("select#select_title").val();
		   var vcharacter = $("select#select_character").val();	
           if(vcontent !=null){tos['content'] = vcontent;}
		   if(vtitle !=null){tos['title'] = vtitle }
		   if(vcharacter !=null){tos['character'] = vcharacter;	}
		   //if(vtag.trim() !=""){tos['search_tags'] = vtag;}
           		   
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
	param['si'] = tos;
	param['extrakeys'] = ekeys;
    param['siid'] = $("input#saveitemid").val();
	
    var sharemsg = $("#titleField").val()+" "+$("textarea#descField").val();
	
	//$(".loading-gif").addClass("hideit");
	//return false;
	var session = Blmani.Session.getInstance().get();
	param['id'] = session.uid;
	console.log(JSON.stringify(param));
	
	$.ajax({
      url: "http://blmani.com/wp-json/aniparti/post_comic",
      type: "post",
      data: param,
	  /*contentType: 'application/json',
	   beforeSend: function (xhr) {
			xhr.setRequestHeader('Authorization', 'Bearer '+session.token+'');
		},*/

      dataType: 'json',
		 success: function (response) {
             $("a#show-success-popup").click();
			 console.log(JSON.stringify(response));
			 console.log(JSON.stringify(response));
			 $(".loading-gif-centered").addClass("hideit");
			 $("#close-post-btn").on("click",function(){
			  tos["pid"] = response.pid;
			  console.log("tos"+tos);
			  Blmani.Tos.getInstance().set(tos);
			  window.location.replace("search.html");
			  
			 
             });
			   
			 $("#copy-to-clipboard").val(response.url);
			 $("#view-post-btn").on("click",function(){
			   showComic(4,response.pid,'');
			 });
			 $("#facebook_share_btn").on("click",function(){
			   sharePostViaFacebook(3,sharemsg,url,'',response.url);
			  
			 });
			 $("#facebook_share_btn").on("click",function(){
			   sharePostViaTwitter(3,sharemsg,url,'',response.url);
			  
			 });
			 
			 $("#copy-to-clipboard-btn").on("click",function(){
			   copyToClipBoard();
			  
			 });
			  
			 
			},
		 error:function(response){
		     console.log(JSON.stringify(response));
             $(".loading-gif").addClass("hideit");
			 publishFormSubmitted = "false";
			 alert("Error Occurred!");
		 }
			
	 });
}


var sharePostViaFacebook = function(ptype,msg,thumurl,ref){
	window.plugins.socialsharing.shareViaFacebook(msg,'', 'http://blmani.com');
}

var sharePostViaTwitter = function(ptype,msg,thumurl,ref){
	window.plugins.socialsharing.shareViaTwitter(msg, '', 'http://blmani.com');
}

var copyToClipBoard = function(){
	console.log("copy to clip board");
	var text_to_be_copied = $("#copy-to-clipboard").val();
	cordova.plugins.clipboard.copy(text_to_be_copied);

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



		



var validatePassCode = function(){
	      $(".loading-gif-centered").removeClass("hideit");
	      console.log("ff called");
		  var postObject = JSON.parse(window.localStorage.getItem("pcpc"));
		  console.log(postObject);
		   // myObjct["did"] = dtype;
		   //	myObjct["pid"] = postid;
		  //	myObjct["purl"] = durl;
		  var params = {};
		  var passcode = $(".privacy-passcode").val();
		  params['uid'] = session.uid;
		  params['postid'] = postObject.pid;//window.localStorage.getItem("pcpc");
		  params['passcode'] = passcode;
		  console.log(params);
		  $.ajax({
			  url: "http://blmani.com/wp-json/aniparti/checkpass",
			  type: "post",
			  data: params,
			  dataType: 'json',
			  success: function (response) {
				   console.log(response);
				   $(".loading-gif-centered").addClass("hideit");
				   if(response=="yes"){
					  //window.location ="story.html#"+pid;
					  showComic(postObject.did,postObject.pid,postObject.purl);
				   } else {
					  $("#toast-invalid").addClass("show-toast");
					  setTimeout(function(){$("#toast-invalid").removeClass("show-toast");},2000)
					
				   }
				   
				   
			},
			error: function(error){
				console.log(error);
			}
	  });
	  
	  
}

var favouriteComic = function(value){
	      var session = Blmani.Session.getInstance().get();
		  if(!session){
			  $('#toast-x').addClass('show-toast');
              setTimeout(function(){$('#toast-x').removeClass('show-toast');},2000);
			  return false;
		  }
	      var params={};
		  params['uid'] = session.uid;
		  params['pid'] = value;
		  console.log(params);
		  $(".loading-gif-centered").removeClass("hideit");
          $.ajax({
			  url: "http://blmani.com/wp-json/aniparti/like",
			  type: "post",
			  data: params,
			  dataType: 'json',
			  success: function (response) {
				   console.log(response+"............s");
				   $("#add_fav_small_icon").addClass("fav-star-clicked");
				   $("#add_fav_large_icon").addClass("fav-star-clicked");
				   $(".loading-gif-centered").addClass("hideit");
				   $('#toast-fav').addClass('show-toast');
                   setTimeout(function(){$('#toast-fav').removeClass('show-toast');},2000);
				   //$('.footer-fixed.regular-footer').removeClass('move-out');
                   //$('.footer-fixed.action-footer').removeClass('come-in');
                  
                   	
				   
			},
			error: function(error){
				console.log(error);
			}
	  });
}



var unFavouriteComic = function(value){
	      var session = Blmani.Session.getInstance().get();
		  if(!session){
			  $('#toast-x').addClass('show-toast');
              setTimeout(function(){$('#toast-x').removeClass('show-toast');},2000);
			  return false;
		  }
	      var params={};
		  params['uid'] = session.uid;
		  params['pid'] = value;
		  console.log(params);
		  $(".loading-gif-centered").removeClass("hideit");
          $.ajax({
			  url: "http://blmani.com/wp-json/aniparti/unlike",
			  type: "post",
			  data: params,
			  dataType: 'json',
			  success: function (response) {
				   console.log(response+"............s");
				   $("#add_fav_small_icon").removeClass("fav-star-clicked");
				   $("#add_fav_large_icon").removeClass("fav-star-clicked");
				   $(".loading-gif-centered").addClass("hideit");
				   $('#toast-unfav').addClass('show-toast');
                   setTimeout(function(){$('#toast-unfav').removeClass('show-toast');},2000);
				   //$('.footer-fixed.regular-footer').removeClass('move-out');
                   //$('.footer-fixed.action-footer').removeClass('come-in');
                  
                   	
				   
			},
			error: function(error){
				console.log(error);
			}
	  });
}


var likeComic = function(value){
	      var session = Blmani.Session.getInstance().get();
		  if(!session){
			  $('#toast-x').addClass('show-toast');
              setTimeout(function(){$('#toast-x').removeClass('show-toast');},2000);
			  return false;
		  }
	      var params={};
		  params['uid'] = session.uid;
		  params['pid'] = value;
		  $(".loading-gif-centered").removeClass("hideit");
          $.ajax({
			  url: "http://blmani.com/wp-json/aniparti/alike",
			  type: "post",
			  data: params,
			  dataType: 'json',
			  success: function (response) {
				   console.log(response+"............s");
				   $("#add_like_item_called").addClass("h-liked");
				   $(".loading-gif-centered").addClass("hideit");
				   $('#toast-like').addClass('show-toast');
                   setTimeout(function(){$('#toast-like').removeClass('show-toast');},2000);
				   //$('.footer-fixed.regular-footer').removeClass('move-out');
                   //$('.footer-fixed.action-footer').removeClass('come-in');
                  
                   	
				   
			}
	  });
}


var unLikeComic = function(value){
	      var session = Blmani.Session.getInstance().get();
		  if(!session){
			  $('#toast-x').addClass('show-toast');
              setTimeout(function(){$('#toast-x').removeClass('show-toast');},2000);
			  return false;
		  }
	      var params={};
		  params['uid'] = session.uid;
		  params['pid'] = value;
		  $(".loading-gif-centered").removeClass("hideit");
          $.ajax({
			  url: "http://blmani.com/wp-json/aniparti/aunlike",
			  type: "post",
			  data: params,
			  dataType: 'json',
			  success: function (response) {
				   console.log(response+"............s");
				   $("#add_like_item_called").removeClass("h-liked");
				   $(".loading-gif-centered").addClass("hideit");
				   $('#toast-unlike').addClass('show-toast');
                   setTimeout(function(){$('#toast-unlike').removeClass('show-toast');},2000);
				   //$('.footer-fixed.regular-footer').removeClass('move-out');
                   //$('.footer-fixed.action-footer').removeClass('come-in');
                  
                   	
				   
			}
	  });
}


var deleteWork = function(value){
	      $(".loading-gif-centered").removeClass("hideit");
	      var session = Blmani.Session.getInstance().get();
	      var params={};
		  params['uid'] = session.uid;
		  params['repo_id'] = value;
		  console.log(params);
		  //setTimeout(function(){$(".loading-gif-centered").addClass("hideit");},2000);
          $.ajax({
			  url: "http://blmani.com/wp-json/aniparti/delete_repo",
			  type: "post",
			  data: params,
			  dataType: 'json',
			  success: function (response) {
				   $(".loading-gif-centered").addClass("hideit");
				   $(".item-selected").remove();
				   $('#toast-del').addClass('show-toast');
                   setTimeout(function(){$('#toast-del').removeClass('show-toast');},2000);
				   $('.footer-fixed.regular-footer').removeClass('move-out');
                   $('.footer-fixed.action-footer').removeClass('come-in');
                  
                   	
				   
			},
			error: function(error){
				   $(".loading-gif-centered").addClass("hideit");
			}
	  });
}
var removeFavouriteComic = function(value){
	      
	      $(".loading-gif-centered").removeClass("hideit");
	      var session = Blmani.Session.getInstance().get();
	      var params={};
		  params['uid'] = session.uid;
		  params['pid'] = value;
		  console.log(params);
          $.ajax({
			  url: "http://blmani.com/wp-json/aniparti/unlike",
			  type: "post",
			  data: params,
			  dataType: 'json',
			  success: function (response) {
				   $(".loading-gif-centered").addClass("hideit");
				   $(".item-selected").remove();
				   $('#toast-fav').addClass('show-toast');
                   setTimeout(function(){$('#toast-fav').removeClass('show-toast');},2000);
				   $('.footer-fixed.regular-footer').removeClass('move-out');
                   $('.footer-fixed.action-footer').removeClass('come-in');
                  
                   	
				   
			},
			error: function(error){
				   $(".loading-gif-centered").addClass("hideit");
			}
	  }); 
}

var showComic = function(dtype,postid,durl){
	console.log(dtype);
	if(dtype==4){
		window.location.replace("play-episode.html#"+postid);
	} else if(dtype==3){
		  // normal post
	      window.location = "play-episode.html#"+postid;
	  } else if(dtype==2){
		  // recommended post
		  console.log("datatype:"+2);
	    if (!window.cordova) {
		   console.log("cordova:");
		   window.open(durl,"_blank");
           //window.location = "play-episode.html#"+durl+"#"+postid;         
        } else {
		   console.log("no cordova:");
	       navigator.app.loadUrl(durl, { openExternal:true });
		}
	  
	  } else {
	     window.location = "story.html#"+postid;
	  } 
}


$(document).ready(function(){
	
	  $(".posting-method-selection-done").on("click",function(){
		  
	  });
	  console.log("document.ready");
	  var session = Blmani.Session.getInstance().get();
	  $(".post-story-icon").on("click",function(){
		  if(!session){
			$('#toast-login').addClass('show-toast');
			setTimeout(function(){$('#toast-login').removeClass('show-toast');},3000);	
            window.location ="login.html";			
		  } else {
			 // window.location = "recommended.html";
			 $("a.post-story-option-link").click(); 
		  }
	  });
	  
	  $("#delete_work").on("click",function(){
		  
		  console.log("delete work called");
		  var value = $("input#my_work_id").val();
		  deleteWork(value);
	  
	  });
	  
	  $("#edit_work").on("click",function(){
		  console.log("editwork called");
		  var value = $("input#my_work_id").val();
		  if(value==0){
		   $('#toast-1').addClass('show-toast');
           setTimeout(function(){$('#toast-1').removeClass('toast-1');},3000);		   
		  } else {
			window.location ="dummy-page-posting.html#"+value;
		  }
	  });
	  
	  //my_post_id
	  
	  $("#publish_work").on("click",function(){
		  console.log("publish called");
		  var value = $("input#my_work_id").val();
		  if(value==0){
		   $('#toast-1').addClass('show-toast');
           setTimeout(function(){$('#toast-1').removeClass('toast-1');},3000);		   
		  } else {
			window.location ="publish.html#"+value;
		  }
	  });
	  
	  $("#fav_unfav").on("click",function(){
		  var pid = $(this).attr("data-id");
		  removeFavouriteComic(pid);
		  	   
		  
	  });
	  
	  
	  
	  $("#spost_view").on("click",function(){
		  
       var dtype =$(this).attr("data-type");
	   var privacyid =$(this).attr("data-privacy");
	   var postid = $(this).attr("data-id");
	   var durl = $(this).attr("data-url");
	
	
    if(privacyid==1 || privacyid==""){
	  showComic(dtype,postid,durl);
	 
	  
	} 
	
	if(privacyid==4){
		//locked
		if(!session){
		  $("#toast-x").html("This Comic is Protected Login to view it.");
		  $("#toast-x").addClass("show-toast");
		  setTimeout($("#toast-x").removeClass("show-toast"),2000);
		 //alert("This Comic is Protected Login to view it.");
		} else {
		    $(".password-protected-link").click();
			var myObjct = {};
			myObjct["did"] = dtype;
			myObjct["pid"] = postid;
			myObjct["purl"] = durl;
			window.localStorage.setItem('pcpc', JSON.stringify(myObjct));
		    
		}
	}
	if(privacyid==2){
		//my pick
		if(!session){
		  $("#toast-x").html("This Comic is Protected Login to view it.");
		  $("#toast-x").addClass("show-toast");
		  setTimeout($("#toast-x").removeClass("show-toast"),2000);
		} else {
		$(".loading-gif-centered").removeClass("hideit");
		var params ={};
		params['postid'] = postid;
		params['uid'] = session.uid;
		console.log(params);
		$.ajax({
			  url: "http://blmani.com/wp-json/aniparti/checkuser",
			  type: "post",
			  data: params,
			  dataType: 'json',
			  success: function (response) {
				   console.log(response);
				   $(".loading-gif-centered").addClass("hideit");
				   if(response=="yes"){
					   //window.location ="story.html#"+postid;
					   showComic(dtype,postid,durl);
					   
					   
				   } else {
					  //alert("you are not added in viewers list");
					   $("#toast-x").addClass("show-toast");
		              setTimeout(function(){$("#toast-x").removeClass("show-toast");},2000); 
				   }
				   
			},
		     error :function(error){
				 console.log("error"+error);
			 }
	  });
		
		
	    
		}		
	}

		  
	  });
	  
	  $("#post_view").on("click",function(){
		  var dtype = $(this).attr("data-type");
		  var pid = $(this).attr("data-id");
		  var purl = $(this).attr("data-url");
		  showComic(dtype,pid,purl);
		  /*console.log("publish called");
		  var value = $("input#my_post_id").val();
		  if(value==0){
		   $('#toast-1').addClass('show-toast');
           setTimeout(function(){$('#toast-1').removeClass('toast-1');},3000);		   
		  } else {
		   window.location ="story.html#"+value;
		  }*/
	  });
	  
	  
	  
	  $("#post_favourite").on("click",function(){
		  var value = $(this).attr("data-id");
		  if(!session){
		   $('#toast-x').html('Login to add comics to favourites list');
		   $('#toast-x').addClass('show-toast');
           setTimeout(function(){$('#toast-x').removeClass('show-toast');},2000);		   
		  } else {
			//window.location ="story.html#"+value;
			favouriteComic(value);
		  }
	  });
	  
	  $("#post_unpublish").on("click",function(){
		  console.log("publish called");
		  var value = $("input#my_post_id").val();
		  if(value==0){
		   $('#toast-1').addClass('show-toast');
           setTimeout(function(){$('#toast-1').removeClass('show-toast');},2000);		   
		  } else {
			//window.location ="story.html#"+value;
			unpublishPost(value);
		  }
	  });
	  
	  
	  
	  $(".posting-method-selection-done").on("click",function(){
		  var val = $('input[name=rad1]:checked').val();
		  console.log("posting method"+val);
		  if(val==1){
			  window.location = "dummy-page-posting.html";
		  } else if(val==2){
			  window.location = "recommended.html";
		  } else {
			  window.location= "mylib.html";
		  }
	  });
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
		   $('.search-friends-input').removeClass('active-input-friends');
		   
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
		  
	  });
	   $(".validate-passcode-done").on("click",function(){
		   validatePassCode();
	   });
	   
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
					 $(this).addClass('active-input-friends');
					 $(".search-friends-span").removeClass("hideit");
					 $(".search-friends-span-close").addClass("hideit");
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

      
	  
	  $(".add-hash-tags").on("click",function(){
		 console.log("clcikced");
		 var tag = $('.additional-hash-keywords').val();
		 $('.additional-hash-keywords').val('');
		 if($.trim(tag)!==""){
			 $(".additional-info-tags").append('<li onClick="delHash(this)"><span>'+tag+'</span></li>');
		 }
	  })

	  


});











  




