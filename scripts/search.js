$(window).on('load',function(){
          $('#page-build').remove();
	//    setTimeout(function(){$("#preloader").addClass('hide-preloader');},100);// will fade out the white DIV that covers the website.
  });
    	

$(document).ready(function () {
	/*$('.content.search-results-section .search-results-list> ul> li').click(function(){
    			$(this).toggleClass('show-overlay-btns')
    })*/
	$("a#2").on("click",function(){
		$(".first-creation").addClass("hideit");
		$(".second-reproduction").removeClass("hideit");
		delSelection(1);
		delSelection(2);
		delSelection(3);
	});
	$("a#1").on("click",function(){
		$(".second-reproduction").addClass("hideit");
		$(".first-creation").removeClass("hideit");
		delSelection(4);
		delSelection(5);
		delSelection(6);
	});
	
	if($("div#menu-1").length){
		var session = Blmani.Session.getInstance().get();
		if(!session){
			$('.user-logined').addClass("hideit");
			console.log("session expired");
		} else {
			$('.user-not-logined').addClass("hideit");
		}
	}
	 $.ajax({
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
	 });
	  $("#preloader").addClass('hide-preloader');
	  
	  $("select#select_genre").on('change', function(){
		  $("#sgenre").remove();
		  $(".info-tags").append('<li id="sgenre"><span onClick="delSelection(1)">'+$(this).children(':selected').text()+'</span></li>');
	  });
	  $("select#select_atype").on('change', function(){
		  $("#satype").remove();
		  $(".info-tags").append('<li id="satype"><span onClick="delSelection(2)">'+$(this).children(':selected').text()+'</span></li>');
	  });
	  $("select#select_dtype").on('change', function(){
		  $("#sdtype").remove();
		  $(".info-tags").append('<li id="sdtype"><span onClick="delSelection(3)">'+$(this).children(':selected').text()+'</span></li>');
	  });
	  
	  $("select#select_content").on('change', function(){
		  $("#scontent").remove();
		  $(".info-tags").append('<li id="scontent"><span onClick="delSelection(4)">'+$(this).children(':selected').text()+'</span></li>');
	  });
	  $("select#select_title").on('change', function(){
		  $("#stitle").remove();
		  $(".info-tags").append('<li id="stitle"><span onClick="delSelection(5)">'+$(this).children(':selected').text()+'</span></li>');
	  });
	  $("select#select_character").on('change', function(){
		  $("#scharacter").remove();
		  $(".info-tags").append('<li id="scharacter"><span onClick="delSelection(6)">'+$(this).children(':selected').text()+'</span></li>');
	  });
	  
	  $(".search-comics").on('click', function(){
		 $(".searching-results").html('');
		 $(".nrf").addClass('hideit'); 
		 $(".srl-section-heading").addClass('hideit');
		 $(this).addClass('searching-anc');
		 $(this).html('Searching...<img src="images/loadersvg.svg">');
		 var vdivision = $(".active-tab-pill-button").attr("id");
		 if(vdivision==1){
		   var vgenre = $("select#select_genre").val();
		   var vatype = $("select#select_atype").val();
		   var vdtype = $("select#select_dtype").val();
		 } else {
		   var vcontent = $("select#select_content").val();
		   var vtitle = $("select#select_title").val();
		   var vcharacter = $("select#select_character").val();	 
		 }
		 var vtag = $(".search-etc-tag-input").val();
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
		 tos['search_keywords'] = vtag;	 
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
				$(".nrf").removeClass('hideit');
			 } else {
				$(".srl-section-heading").removeClass('hideit');
				$(".nrf").addClass('hideit'); 
				$.each(response, function (key, value) {
				$(".searching-results").append('<li class="searched-li" id="'+value.ID+'"><a hewf="#" style="display:table"><div class="srl-image-wrapper"><img src="'+value.thumburl+'" alt=""></div><div class="srl-right-wrapper"><div class="srl-right-author-details"><img src="'+value.author_pic+'" alt="" class="srl-author-thumb"><span>'+value.author_name+'</span></div><h4 class="srl-item-title">'+value.post_title+'</h4><p>'+value.custom.prodes+'</p><div class="srl-states-fixed"><div class="srl-stats-comments"><span class="zmdi zmdi-comment-more"></span><span class="count">0</span></div><div class="srl-stats-likes"><span class="la la-heart"></span><span class="count">'+value.custom.views+'</span></div></div></div></a></li>');	
				});
			 }
			 $(".searched-li").click(function(){
			 	    if(!$(this).hasClass('show-overlay-btns')){
				 	    $(this).addClass('show-overlay-btns');
				 	    $(this).append('<div class="long-press-overlay"><ul><li class="lpo-red"><a href="#">Play Story</a></li><li><a href="story.html">Add to Favorites</a></li></ul></div>');
			 		}else{
			 			$(this).removeClass('show-overlay-btns');
			 		}
	            });

			 $('.search-comics').removeClass('searching-anc');
	         $('.search-comics').html('Search');
			
		 }
		 });
	  });
	 
	 
	  
	
});

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

