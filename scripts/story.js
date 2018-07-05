$(window).on('load',function(){
    console.log("load function called");
	$('#page-build').remove();
	//setTimeout(function(){$("#preloader").addClass('hide-preloader');},450);// will fade out the white DIV that covers the website.
});
$(document).ready(function () {
	 console.log("hash"+document.location.hash);
	 var comicid = document.URL.substr(document.URL.indexOf('#')+1);
	 if(window.localStorage.getItem("story")==1){
	     window.localStorage.removeItem("story");
	     $("#story-info").removeClass("active-tab-pill-button bg-highlight");
		 $("#story-episodes").addClass("active-tab-pill-button bg-highlight");
		 $("#tab-pill-1").removeClass("active-tab");
		 $("#tab-pill-2").addClass("active-tab");
	 }
	 
	 var fields =  Blmani.Fields.getInstance().get();
	 console.log(fields);
	 
	 if(!fields){
	 $.ajax({
      url: "http://blmani.com/wp-json/aniparti/get_field",
      type: "post",
      dataType: 'json',
      success: function (response) {
		  Blmani.Fields.getInstance().set(response);
		  fields = Blmani.Fields.getInstance().get();
		  /*$.each(response.genre,function(key,value){
			  genres[value.ID] =value.name;
			 
		  })*/
	    }
	 });
	  } 
	 
	
	 
	
	  
	    
	 $.ajax({
      url: "http://blmani.com/wp-json/aniparti/getdetails",
      type: "post",
      data: {id:comicid},
      dataType: 'json',
      success: function (response) {
		 // Blmani.Comic.getInstance().set(response);
		  console.log(response);
		  //console.log(response.episodes);
		  var counter =0;
		  
		  console.log("lenght"+Object.keys(response.episodes).length);
		  if(Object.keys(response.episodes).length == 0){ 
		  
		  if(!response.custom){
					 ptype = 1;
				 } else if(!response.custom.post_type){
					 ptype =1;
				 } else {
					 ptype = response.custom.post_type;
				 }
				 
				 var thumb = response.thumburl;
				 if(!thumb){thumb="images/placeholder.jpg";}
				 
				 
				 
				 if(ptype==2){
				  $(".episode-play-section").html('<a href="play-episode.html#'+response.post_content+'#'+response.ID+'"><img src="images/icons/play-icon.png" alt="Play Story" class="icon-play-story"><p>Play Story</p>');
		          $(".first_episode_banner").css("background-image","url("+thumb+")"); 
				 } else {
				  $(".episode-play-section").html('<a href="play-episode.html#'+response.ID+'"><img src="images/icons/play-icon.png" alt="Play Story" class="icon-play-story"><p>Play Story</p>');
		          $(".first_episode_banner").css("background-image","url("+thumb+")"); 
				 	 
				 }

				 
		  
		  } else {
			  
			     $.each(response.episodes, function (key, value) {
			     counter++;
				 var thumb = value.thumburl;
				 if(!thumb){thumb="images/placeholder.jpg";}
				 if(!value.views){
					 pviews =0;
				 } else {
					 pviews = value.views;
				 }
				 
				 
				
			 if(counter==1){
				 $(".episode-play-section").html('<a href="play-episode.html#'+value.ID+'"><img src="images/icons/play-icon.png" alt="Play Story" class="icon-play-story"><p>Play First Episode</p>');
		         $(".first_episode_banner").css("background-image","url("+thumb+")");
			 }
             //if(counter>1){
			 var c = new Date(value.post_date);
			 $(".latest-comics-all").append('<div class="comic-book-item"><a href="play-episode.html#'+value.ID+'"><div class="episode-thumb-wrapper"><img data-src="'+thumb+'" src="images/empty.png" class="preload-image responsive-image" alt="img"><span class="thumb-episode-views">'+pviews+'</span><span class="thumb-price price-free">Free</span></div><h3 class="comic-book-item-title">'+value.post_title+'</h3><div class="comic-book-item-auther">'+dateFormate(c)+'</div></a></div>');
		    // }
		 }); 			  
			  
		  }
		 
		         var thumb = response.thumburl;
				 if(!thumb){thumb="images/placeholder.jpg";}
				 if(!response.custom){
					 pviews = 0;
				 } else if(!response.custom.views){
					 pviews =0;
				 } else {
					 pviews = response.custom.views;
				 }
				 
				 if(!response.custom){
					 desc = "";
				 } else if(!response.custom.prodes){
					 desc ="";
				 } else {
					 desc = response.custom.prodes;
				 }
		 if(!fields){
			  // sorry i am not putting logic for this now
		 } else {
		  var  types = [];
		 
		  
		            if(response.custom.character){
					   types['character'] = response.custom.character[0];
					}
					if(response.custom.content){
					   types['content'] = response.custom.content[0];
					}
					if(response.custom.title){
					   types['title'] = response.custom.title[0];
					}
				 
				 	if(response.custom.genre){
					   types['genre'] = response.custom.genre[0];
					}
					if(response.custom.a_type){
					   types['a_type'] = response.custom.a_type[0];
					}
					if(response.custom.d_type){
					   types['d_type'] = response.custom.d_type[0];
					}
				 
		  
		  $.each(fields,function(key,value){
				 if(types[key]){
					 console.log("key"+key);
					 var item = value.find(item => item.ID === types[key]);
					 if(item){
					 $(".info-tags").append('<li><span>'+item.name+'</span></span>');
					 }
				 }
				 
			 }); 
		  
		  
		  
		  
		  
		  
		  }
		 
		 $(".latest-comics-all").append('<div class="clear"></div>');
		 $(".story-info-right").html('<div class="story-title"><h2>'+response.post_title+'</h2><p>'+counter+' Episodes Completed</p></div><div class="author-details"><img data-src="'+response.author_pic+'" src="images/empty.png" class="preload-image responsive-image" alt="img"><div class="author-details-text-wrapper"><div class="author-title">'+response.author_name+'</div><div class="author-start-date">'+response.user_last_login_timestamp+'</div> </div></div><div class="story-views-sec">Views<br><span class="story-views-sec-tag">'+pviews+'</span></div>');
		 $(".comic-desc").html(desc);
		 $(".story-cover").html('<img data-src="'+thumb+'" src="images/empty.png" class="preload-image responsive-image" alt="img">');
		 $("#preloader").addClass('hide-preloader');
		 $(".preload-image").lazyload({threshold : 500});
		  
		  
	  }
	 });

 $.ajax({
      url: "http://blmani.com/wp-json/aniparti/vupdate",
      type: "post",
      data: {id:comicid},
      dataType: 'json',
      success: function (response) {
		  console.log(response);
	  }
 });


	 
});

