$(window).on('load',function(){
    console.log("load function called");
	$('#page-build').remove();
	//setTimeout(function(){$("#preloader").addClass('hide-preloader');},450);// will fade out the white DIV that covers the website.
});
$(document).ready(function () {
	  console.log("ready function called");
	 var comicid = document.URL.substr(document.URL.indexOf('#')+1);
	 var updateViews = 1;
	 if(window.localStorage.getItem("story")==1){
	  updateViews = 0;
	  window.localStorage.removeItem("story");
	  $("#story-info").removeClass("active-tab-pill-button bg-highlight");
		 $("#story-episodes").addClass("active-tab-pill-button bg-highlight");
		 $("#tab-pill-1").removeClass("active-tab");
		 $("#tab-pill-2").addClass("active-tab");
	 }
	 
	 var genres = [];
	 $.ajax({
      url: "http://blmani.com/wp-json/aniparti/get_field",
      type: "post",
      //data: {id:16842},
      dataType: 'json',
      success: function (response) {
		 // Blmani.Comic.getInstance().set(response);
		  $.each(response.genre,function(key,value){
			  genres[value.ID] =value.name;
			 
		  })
	    }
	 });
	 
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
		  $.each(response.custom.genre,function(key,value){
			 // console.log("genre"+value+genres[value]);
			  $(".info-tags").append('<li><span>'+genres[value]+'</span></li>');
		  });
		  $.each(response.episodes, function (key, value) {
			 counter++;
			 if(counter==1){
				 $(".episode-play-section").html('<a href="play-episode.html#'+value.ID+'"><img src="images/icons/play-icon.png" alt="Play Story" class="icon-play-story"><p>Play First Episode</p>');
		         $(".first_episode_banner").css("background-image","url("+value.thumburl+")")
			 }
             if(counter>1){
			 var c = new Date(value.post_date);
			 $(".latest-comics-all").append('<div class="comic-book-item"><a href="play-episode.html#'+value.ID+'"><div class="episode-thumb-wrapper"><img data-src="'+value.thumburl+'" src="images/empty.png" class="preload-image responsive-image" alt="img"><span class="thumb-episode-views">'+value.views+'</span><span class="thumb-price price-free">Free</span></div><h3 class="comic-book-item-title">'+value.post_title+'</h3><div class="comic-book-item-auther">'+dateFormate(c)+'</div></a></div>');
		     }
		 });
		 $(".latest-comics-all").append('<div class="clear"></div>');
		 $(".story-info-right").html('<div class="story-title"><h2>'+response.post_title+'</h2><p>'+counter+' Episodes Completed</p></div><div class="author-details"><img data-src="'+response.author_pic+'" src="images/empty.png" class="preload-image responsive-image" alt="img"><div class="author-details-text-wrapper"><div class="author-title">'+response.author_name+'</div><div class="author-start-date">'+response.user_last_login_timestamp+'</div> </div></div><div class="story-views-sec">Views<br><span class="story-views-sec-tag">'+response.custom.views+'</span></div>');
		 $(".comic-desc").html(response.custom.prodes);
		 $(".story-cover").html('<img data-src="'+response.thumburl+'" src="images/empty.png" class="preload-image responsive-image" alt="img">');
		 $("#preloader").addClass('hide-preloader');
		 $(".preload-image").lazyload({threshold : 500});
		  
		  
	  }
	 });

 if(updateViews>0){
 $.ajax({
      url: "http://blmani.com/wp-json/aniparti/vupdate",
      type: "post",
      data: {id:comicid},
      dataType: 'json',
      success: function (response) {
		  console.log(response);
	  }
 });
}

	 
});

