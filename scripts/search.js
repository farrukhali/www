$(window).on('load',function(){
          $('#page-build').remove();
	//    setTimeout(function(){$("#preloader").addClass('hide-preloader');},100);// will fade out the white DIV that covers the website.
  });
    	

$(document).ready(function () {
	setFields();
	$(".reset-search").on("click",function(){
	 console.log("reset function called");
	 resetSearchFields();
	});
	/*$('.content.search-results-section .search-results-list> ul> li').click(function(){
    			$(this).toggleClass('show-overlay-btns')
    })*/
	$("a#2").on("click",function(){
		$(".first-creation").addClass("hideit");
		$(".second-reproduction").removeClass("hideit");
		//delSelection(1);
		//delSelection(2);
		//delSelection(3);
	});
	$("a#1").on("click",function(){
		$(".second-reproduction").addClass("hideit");
		$(".first-creation").removeClass("hideit");
		//delSelection(4);
		//delSelection(5);
		//delSelection(6);
	});
	
	/*if($("div#menu-1").length){
		var session = Blmani.Session.getInstance().get();
		if(!session){
			$('.user-logined').addClass("hideit");
			console.log("session expired");
		} else {
			$('.user-not-logined').addClass("hideit");
		}
	}*/
	/* $.ajax({
      url: "http://blmani.com/wp-json/aniparti/get_field",
      type: "post",
      //data: {id:16842},
      dataType: 'json',
      success: function (response) {
		  $.each(response, function (key, value) {
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
		 // Blmani.Comic.getInstance().set(response);
		  console.log(response);
	    }
	 });*/
	 
	  
	  $("#preloader").addClass('hide-preloader');
	  
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
		  $(".sr-info-tags").append('<li id="scontent"><span onClick="delSelection(4)">'+$(this).children(':selected').text()+'</span></li>');
	  });
	  $("select#select_title").on('change', function(){
		  $("#stitle").remove();
		  $(".sr-info-tags").append('<li id="stitle"><span onClick="delSelection(5)">'+$(this).children(':selected').text()+'</span></li>');
	  });
	  $("select#select_character").on('change', function(){
		  $("#scharacter").remove();
		  $(".sr-info-tags").append('<li id="scharacter"><span onClick="delSelection(6)">'+$(this).children(':selected').text()+'</span></li>');
	  });
	  
	  $(".search-comics").on('click', function(){
        var vdivision = $(".active-tab-pill-button").attr("id");		
		if(vdivision==1){
		 $(".searching-results-fc").html('');
		 $(".fcnrf").addClass('hideit'); 
		 $(".fc-heading").addClass('hideit');
		} else {
		 $(".searching-results-sr").html('');
		 $(".srnrf").addClass('hideit'); 
		 $(".sr-heading").addClass('hideit');
		}
		 
		 $(this).addClass('searching-anc');
		 $(this).html('Searching...<img src="images/loadersvg.svg">');
		 
		 
		 var session = Blmani.Session.getInstance().get();
	     var langid  = Blmani.Language.getInstance().get();
		 var fields = Blmani.Fields.getInstance().get();
	
				
		 if(vdivision==1){
		   var vtag = $(".first-creation-vtag").val();
		   var vgenre = $("select#select_genre").val();
		   var vatype = $("select#select_atype").val();
		   var vdtype = $("select#select_dtype").val();
		 } else {
		   var vcontent = $("select#select_content").val();
		   var vtitle = $("select#select_title").val();
		   var vcharacter = $("select#select_character").val();	 
		   var vtag = $(".second-reproduction-vtag").val();
		 }
		 
		 var vdivision = $(".active-tab-pill-button").attr("id");
		 var tos = {};
		 tos['division'] = vdivision;
		 if(vgenre !=null){
		 tos['genre'] = vgenre;	 
		 }
		 if(vatype !=null){
		 tos['a_type'] = vatype;	 
		 }
		 if(vdtype !=null){
		 tos['d_type'] = vdtype;	 
		 }
		 if(vcontent !=null){
		 tos['content'] = vcontent;	 
		 }
		 if(vtitle !=null){
		 tos['title'] = vtitle;	 
		 }
		 if(vcharacter !=null){
		 tos['character'] = vcharacter;	 
		 }
		 if(vtag.trim() !=""){
		 tos['search_tags'] = vtag;	 
		 }
		 
		 if(!langid){
		  tos['lang'] =1;
		 } else {
		   tos['lang'] =langid;	
		 }
			if(!session){
			 tos['uid'] ="nli";
			} else {
			tos['uid'] =session.uid;	
			}
		   var postid = window.localStorage.getItem("latest-posted",0);
		   if(postid >0){
			  tos['pid'] =postid; 
			  window.localStorage.removeItem("latest-posted");
		   }
		   
		 console.log(tos);
		
		 
		 $.ajax({
      url: "http://blmani.com/wp-json/aniparti/get_com",
      type: "post",
      data: tos,
      dataType: 'json',
		 success: function (response) {
			 console.log(response);
			 if(response=="nrf"){
				if(vdivision==1){
				$(".fcnrf").removeClass('hideit');
				} else {
				$(".srnrf").removeClass('hideit');	
				}
			 } else {
				if(vdivision==1){
				$(".fc-heading").removeClass('hideit');
				$(".fcnrf").addClass('hideit'); 
				} else{
				$(".sr-heading").removeClass('hideit');
				$(".srnrf").addClass('hideit');	
				}
				$.each(response, function (key, value) {
				var thumb = value.thumburl;
				 if(!thumb){thumb="images/placeholder.jpg";}
				 if(!value.custom){
					 privacy = 1;
				 } else if(!value.custom.privacy){
					 privacy =1;
				 } else {
					 privacy = value.custom.privacy
				 }
				 console.log("privacy"+privacy); 
				 if(!value.custom){
					 desc = "";
				 } else if(!value.custom.prodes){
					 desc ="";
				 } else {
					 desc = value.custom.prodes;
				 }
				 
				 if(!value.custom){
					 likes = 0;
				 } else if(!value.custom.views){
					 likes =0;
				 } else {
					 likes = value.custom._aliked;
				 }
				 
				 
				 if(!value.custom){
					 ptype = 1;
				 } else if(!value.custom.post_type){
					 ptype =1;
				 } else {
					 ptype = value.custom.post_type;
				 }
				 
				    var  types = [];
		            if(value.custom.character){
					   types['character'] = value.custom.character[0];
					}
					if(value.custom.content){
					   types['content'] = value.custom.content[0];
					}
					if(value.custom.title){
					   types['title'] = value.custom.title[0];
					}
				 
				 	if(value.custom.genre){
					   types['genre'] = value.custom.genre[0];
					}
					if(value.custom.a_type){
					   types['a_type'] = value.custom.a_type[0];
					}
					if(value.custom.d_type){
					   types['d_type'] = value.custom.d_type[0];
					}
		  var taghtml ="";
		  var lockhtml ="";
		  if(privacy==4){
			  lockhtml ='<i class="la la-lock locked-icon"></i>';
		  }
         	  
		  //if(types.length>0){
		  var taghtml ='<ul class="search-result-tags">';
		  $.each(fields,function(key,value){
				 if(types[key]){
					 console.log("key"+key);
					 var item = value.find(item => item.ID === types[key]);
					 console.log(item);
					 if(item){
					  taghtml +='<li>'+item.name+'</li>';
					 }
				 }
				 
			 }); 
			 taghtml +='</ul>';
			 
			 var pcontent = "http://google.com";
			 if(value.post_content){
				 pcontent = value.post_content;
			 }
			 
			 
		 // }   
		        if(vdivision==1){
				$(".searching-results-fc").append('<li class="searched-item" data-url="'+pcontent+'" data-type="'+ptype+'" data-id="'+value.ID+'" data-privacy="'+privacy+'"><a href="javascript:;" style="display:table" ><div class="srl-image-wrapper"><img src="'+thumb+'" alt="">'+lockhtml+'</div><div class="srl-right-wrapper"><div class="srl-right-author-details"><img src="'+value.author_pic+'" alt="" class="srl-author-thumb"><span>'+value.author_name+'</span></div><h4 class="srl-item-title">'+value.post_title+'</h4><p>'+desc+'</p>'+taghtml+'<div class="srl-states-fixed"><div class="srl-stats-comments"><span class="zmdi zmdi-comment-more"></span><span class="count">0</span></div><div class="srl-stats-likes"><span class="la la-heart"></span><span class="count">'+likes+'</span></div></div></div></a><div class="item-image-overlay"><i class="la la-check-circle"></i></div></li>');	
				} else {
				$(".searching-results-sr").append('<li class="searched-item" data-url="'+pcontent+'" data-type="'+ptype+'" data-id="'+value.ID+'" data-privacy="'+privacy+'"><a href="javascript:;" style="display:table" ><div class="srl-image-wrapper"><img src="'+thumb+'" alt="">'+lockhtml+'</div><div class="srl-right-wrapper"><div class="srl-right-author-details"><img src="'+value.author_pic+'" alt="" class="srl-author-thumb"><span>'+value.author_name+'</span></div><h4 class="srl-item-title">'+value.post_title+'</h4><p>'+desc+'</p>'+taghtml+'<div class="srl-states-fixed"><div class="srl-stats-comments"><span class="zmdi zmdi-comment-more"></span><span class="count">0</span></div><div class="srl-stats-likes"><span class="la la-heart"></span><span class="count">'+likes+'</span></div></div></div></a><div class="item-image-overlay"><i class="la la-check-circle"></i></div></li>');	
					
				}
				});
				
		 
		  $(".searched-item").on('click',function() {
				 if($(this).hasClass("item-selected")){
				 $(this).removeClass("item-selected");
				  $("#spost_view").attr("data-url",0);
				  $("#spost_view").attr("data-id",0);
				  $("#spost_view").attr("data-privacy",0);
				  $("#spost_view").attr("data-type",0);
				  
				  $("#post_favourite").attr("data-id",0);
				  $("#post_favourite").attr("data-privacy",0);
				  $("#post_favourite").attr("data-type",0);
				 $('.footer-fixed.action-footer').removeClass('come-in').addClass("move-out");
				 $('.footer-fixed.regular-footer').removeClass('move-out');
				} else{
				 $(".searched-item").each(function(){
					 $(this).removeClass("item-selected");
				 });
				 $(this).addClass("item-selected");
				  $("#spost_view").attr("data-url",$(this).attr("data-url"));
				  $("#spost_view").attr("data-id",$(this).attr("data-id"));
				  $("#spost_view").attr("data-type",$(this).attr("data-type"));
				  $("#spost_view").attr("data-privacy",$(this).attr("data-privacy"));
				  console.log($(this).attr("data-privacy"));
				  //$("#spost_view").attr("data-privacy",$(this).attr("data-privacy"));
				  
				  
				  $("#post_favourite").attr("data-type",$(this).attr("data-type"));
				  $("#post_favourite").attr("data-id",$(this).attr("data-id"));
				  $("#post_favourite").attr("data-privacy",$(this).attr("data-privacy"));
				  $('.footer-fixed.regular-footer').addClass('move-out');
                  $('.footer-fixed.action-footer').addClass('come-in');
			   }
				
			});
				
		   $("#preloader").addClass('hide-preloader');
		   /*$(".can-view-it").on("click",function(){
		   var privacy = $(this).attr("data-privacy");
		   var dataid = $(this).attr("data-id");
		   canViewIt(privacy,dataid);
	       });*/
		 $(".preload-image").lazyload({threshold : 500});
		 
			 
				
			 }
			 $('.search-comics').removeClass('searching-anc');
	         $('.search-comics').html('Search');
			
		},
	  error: function(){
				 checkConnection();
				 $("#preloader").addClass('hide-preloader');
	  }
		 });
	  });
	 
	 
	  
	
});

var resetSearchFields = function(){
	delSelection(1);
	delSelection(2);
	delSelection(3);
	delSelection(4);
	delSelection(5);
	delSelection(6);
	$(".first-creation-vtag").val("");
    $(".second-reproduction-vtag").val("");
	$(".searching-results-fc").html('');
	$(".fcnrf").addClass('hideit'); 
	$(".fc-heading").addClass('hideit');
	$(".searching-results-sr").html('');
	$(".srnrf").addClass('hideit'); 
	$(".sr-heading").addClass('hideit');
	
		 
}

function delSelection(sel){
	       if(sel ==1){
		     selv = "genre";
		   }
		   if(sel ==2){
		     selv = "atype";
		   }
		   if(sel ==3){
		     selv = "dtype";
		   }
		   if(sel ==4){
		     selv = "content";
		   }
		   if(sel ==5){
		     selv = "title";
		   }
		   if(sel ==6){
		     selv = "character";
		   }
		  
		   
	     $("li#s"+selv).remove();
		 $("select#select_"+selv).val("");
		 
	
}

