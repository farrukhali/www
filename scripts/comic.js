



$(window).on('load',function(){
    
	$('#page-build').remove();
	//setTimeout(function(){$("#preloader").addClass('hide-preloader');},450);// will fade out the white DIV that covers the website.
});

var getCompleteComics =function(){
 var session = Blmani.Session.getInstance().get();
	params = {};
	if(!session){
	 params['uid'] ="nli";
	} else {
	params['uid'] =session.uid;	
	}
	console.log(params);
	$.ajax({
      url: "http://blmani.com/wp-json/aniparti/getAll",
      type: "post",
      data: params,
      dataType: 'json',
      success: function (response) {
		 console.log(response);
		 $.each(response,function(key,value){
		 var thumb = value.thumburl;
		 if(!thumb){thumb="images/placeholder.jpg";}
		 $('.latest-comics-page').append('<div class="comic-book-item"><a href="#" class="can-view-it"><img data-src="'+thumb+'" src="images/empty.png" class="preload-image responsive-image" alt="img"><h3 class="comic-book-item-title">'+value.post_title+'</h3><div class="comic-book-item-auther">'+value.author_name+'</div></a></div>')
		 });
		 $("#preloader").addClass('hide-preloader');
		 $(".preload-image").lazyload({threshold : 500});
		 },
	  error: function(){
				 checkConnection();
				 $("#preloader").addClass('hide-preloader');
	  }
});
	
}

var getPopularComics = function(){
	var session = Blmani.Session.getInstance().get();
	params = {};
	if(!session){
	 params['uid'] ="nli";
	} else {
	params['uid'] =session.uid;	
	}
	console.log(params);
	$.ajax({
      url: "http://blmani.com/wp-json/aniparti/getAll",
      type: "post",
      data: params,
      dataType: 'json',
      success: function (response) {
		 console.log(response);
		 $.each(response,function(key,value){
		 var thumb = value.thumburl;
		 if(!thumb){thumb="images/placeholder.jpg";}
		 $('.latest-comics-page').append('<div class="comic-book-item"><a href="#" class="can-view-it"><img data-src="'+thumb+'" src="images/empty.png" class="preload-image responsive-image" alt="img"><h3 class="comic-book-item-title">'+value.post_title+'</h3><div class="comic-book-item-auther">'+value.author_name+'</div></a></div>')
		 });
		 $("#preloader").addClass('hide-preloader');
		 $(".preload-image").lazyload({threshold : 500});
		 },
	  error: function(){
				 checkConnection();
				 $("#preloader").addClass('hide-preloader');
	  }
});

}


var getAdultComics = function(){
	var session = Blmani.Session.getInstance().get();
	params = {};
	if(!session){
	 params['uid'] ="nli";
	} else {
	params['uid'] =session.uid;	
	}
	console.log(params);
	$.ajax({
      url: "http://blmani.com/wp-json/aniparti/getAll",
      type: "post",
      data: params,
      dataType: 'json',
      success: function (response) {
		 console.log(response);
		 $.each(response,function(key,value){
		 var thumb = value.thumburl;
		 if(!thumb){thumb="images/placeholder.jpg";}
		 $('.latest-comics-page').append('<div class="comic-book-item"><a href="#" class="can-view-it"><img data-src="'+thumb+'" src="images/empty.png" class="preload-image responsive-image" alt="img"><h3 class="comic-book-item-title">'+value.post_title+'</h3><div class="comic-book-item-auther">'+value.author_name+'</div></a></div>')
		 });
		 $("#preloader").addClass('hide-preloader');
		 $(".preload-image").lazyload({threshold : 500});
		 },
	  error: function(){
				 checkConnection();
				 $("#preloader").addClass('hide-preloader');
	  }
});

}

var getRankedComics =function(){
	var session = Blmani.Session.getInstance().get();
	params = {};
	if(!session){
	 params['uid'] ="nli";
	} else {
	params['uid'] =session.uid;	
	}
	console.log(params);
	$.ajax({
      url: "http://blmani.com/wp-json/aniparti/getAll",
      type: "post",
      data: params,
      dataType: 'json',
      success: function (response) {
		 console.log(response);
		 $.each(response,function(key,value){
		 var thumb = value.thumburl;
		 if(!thumb){thumb="images/placeholder.jpg";}
		 $('.latest-comics-page').append('<div class="comic-book-item"><a href="#" class="can-view-it"><img data-src="'+thumb+'" src="images/empty.png" class="preload-image responsive-image" alt="img"><h3 class="comic-book-item-title">'+value.post_title+'</h3><div class="comic-book-item-auther">'+value.author_name+'</div></a></div>')
		 });
		 $("#preloader").addClass('hide-preloader');
		 $(".preload-image").lazyload({threshold : 500});
		 },
	  error: function(){
				 checkConnection();
				 $("#preloader").addClass('hide-preloader');
	  }
});
}
var getSerialComics=function(){
	var session = Blmani.Session.getInstance().get();
	params = {};
	if(!session){
	 params['uid'] ="nli";
	} else {
	params['uid'] =session.uid;	
	}
	console.log(params);
	$.ajax({
      url: "http://blmani.com/wp-json/aniparti/getAll",
      type: "post",
      data: params,
      dataType: 'json',
      success: function (response) {
		 console.log(response);
		 $.each(response,function(key,value){
		 var thumb = value.thumburl;
		 if(!thumb){thumb="images/placeholder.jpg";}
		 $('.latest-comics-page').append('<div class="comic-book-item"><a href="#" class="can-view-it"><img data-src="'+thumb+'" src="images/empty.png" class="preload-image responsive-image" alt="img"><h3 class="comic-book-item-title">'+value.post_title+'</h3><div class="comic-book-item-auther">'+value.author_name+'</div></a></div>')
		 });
		 $("#preloader").addClass('hide-preloader');
		 $(".preload-image").lazyload({threshold : 500});
		 },
	  error: function(){
				 checkConnection();
				 $("#preloader").addClass('hide-preloader');
	  }
});
}

var getFeaturedComics = function(){
	var session = Blmani.Session.getInstance().get();
	params = {};
	if(!session){
	 params['uid'] ="nli";
	} else {
	params['uid'] =session.uid;	
	}
	console.log(params);
	$.ajax({
      url: "http://blmani.com/wp-json/aniparti/getAll",
      type: "post",
      data: params,
      dataType: 'json',
      success: function (response) {
		 console.log(response);
		 $.each(response,function(key,value){
		 var thumb = value.thumburl;
		 if(!thumb){thumb="images/placeholder.jpg";}
		 $('.latest-comics-page').append('<div class="comic-book-item"><a href="#" class="can-view-it"><img data-src="'+thumb+'" src="images/empty.png" class="preload-image responsive-image" alt="img"><h3 class="comic-book-item-title">'+value.post_title+'</h3><div class="comic-book-item-auther">'+value.author_name+'</div></a></div>')
		 });
		 $("#preloader").addClass('hide-preloader');
		 $(".preload-image").lazyload({threshold : 500});
		 },
	  error: function(){
				 checkConnection();
				 $("#preloader").addClass('hide-preloader');
	  }
});
}


var getLatestComics = function(){
	var session = Blmani.Session.getInstance().get();
	params = {};
	if(!session){
	 params['uid'] ="nli";
	} else {
	params['uid'] =session.uid;	
	}
	console.log(params);
	$.ajax({
      url: "http://blmani.com/wp-json/aniparti/getAll",
      type: "post",
      data: params,
      dataType: 'json',
      success: function (response) {
		 console.log(response);
		 $.each(response,function(key,value){
		 var thumb = value.thumburl;
		 if(!thumb){thumb="images/placeholder.jpg";}
		 $('.latest-comics-page').append('<div class="comic-book-item"><a href="#" class="can-view-it"><img data-src="'+thumb+'" src="images/empty.png" class="preload-image responsive-image" alt="img"><h3 class="comic-book-item-title">'+value.post_title+'</h3><div class="comic-book-item-auther">'+value.author_name+'</div></a></div>')
		 });
		 $("#preloader").addClass('hide-preloader');
		 $(".preload-image").lazyload({threshold : 500});
		 },
	  error: function(){
				 checkConnection();
				 $("#preloader").addClass('hide-preloader');
	  }
});

}

var getComicsForHome = function(){
	var session = Blmani.Session.getInstance().get();
	params = {};
	if(!session){
	 params['uid'] ="nli";
	} else {
	params['uid'] =session.uid;	
	}
	console.log(params);
	$.ajax({
      url: "http://blmani.com/wp-json/aniparti/forhome",
      type: "post",
      data: params,
      dataType: 'json',
      success: function (response) {
		 console.log(response);
		  $.each(response.latest,function(key,value){
			  var desc = value.custom.prodes;
			  if(!desc){desc = "";}
			  var thumb = value.thumburl;
			  if(!thumb){thumb="images/placeholder.jpg";}
			  var athumb = value.author_pic;
			  if(!athumb){athumb ="images/pictures/clip.png";}
			  $(".home-latest-comics-slider").append('<div><a href="story.html#'+value.ID+'"><div class="cover-content cover-content-center slide-content"><h1 class="color-white bottom-5">'+value.post_title+'</h1> <p class="color-white bottom-0">'+desc+'</p><div class="slide-author"><img src="'+athumb+'" alt=""><span>'+value.author_name+'</span> </div></div><div class="cover-overlay overlay shadow-overlay"></div><img width="700" class="owl-lazy" src="images/empty.png" data-src="'+thumb+'"></a></div>');
		  });
		  $.each(response.featured,function(key,value){
			  var thumb = value.thumburl;
			  if(!thumb){thumb="images/placeholder.jpg";}
			  $(".home-latest-comics-featured").append('<div style="width: 140px "><a href="story.html#'+value.ID+'"><img width="200 " class="owl-lazy " src="images/empty.png " data-src="'+thumb+'"><h3 class="font-15">'+value.post_title+'</h3><span>'+value.author_name+'</span><a></div>');
		  });
		  
		  $.each(response.popular,function(key,value){
			  
			  var thumb = value.thumburl;
			  if(!thumb){thumb="images/placeholder.jpg";}
			  $(".home-latest-comics-popular").append('<div class="comic-book-item"><a href="story.html#'+value.ID+'"><img data-src="'+thumb+'" src="images/empty.png" class="preload-image responsive-image" alt="img"><h3 class="comic-book-item-title">'+value.post_title+'</h3><div class="comic-book-item-auther">'+value.author_name+'</div></a></div>');
		  });
		  var ckey = 0;
		  $.each(response.genre,function(key,value){
			  console.log(key,value);
			   ckey++;
			   $(".home-genres-filter-controls").append('<div><a href="javascript:;" style="padding:0 10px" data-filter="'+ckey+'">'+key+'</a></div>');
			   $.each(value,function(skey,svalue){
				   console.log(skey,svalue);
				   var sthumb = svalue.thumburl;
			       if(!sthumb){sthumb="images/placeholder.jpg";}
				   $('.home-genres-filter-gallery').append('<div class="comic-book-item show-gallery filtr-item" data-category="'+ckey+'"><a href="story.html#'+svalue.ID+' "><img data-src="'+sthumb+'" src="images/empty.png" class="preload-image responsive-image " alt="img "><h3 class="comic-book-item-title ">'+svalue.post_title+'</h3><div class="comic-book-item-auther ">'+svalue.author_name+'</div></a></div>');
               });
		  });
		  
		  
		  $("#preloader").addClass('hide-preloader');
		  
			setTimeout(function(){
				$('.single-slider').owlCarousel({center: true, items:1, loop:true, margin:10, stagePadding:20, lazyLoad:true});
				$('.center-slider').owlCarousel({center: false, items:2, autoWidth:true, loop:false, margin:10, stagePadding:20, lazyLoad:true});
				$('.genre-tags-slider').owlCarousel({items:10, autoWidth:true, loop:false, margin:10});
				$('.menu-fixed-slider').owlCarousel({loop:false, margin:0, nav:false, items:5});	
				$('.single-slider-no-timeout').owlCarousel({loop:true, margin:0, nav:false, dots:false, items:1, autoHeight:true});
				$('.single-store-slider').owlCarousel({loop:false, margin:10, nav:false, autoHeight:true, lazyLoad:true, items:1, autoplay: true, autoplayTimeout:3500});	
				$('.double-slider').owlCarousel({loop:true, margin:20, nav:false, autoHeight:true, lazyLoad:true, items:2, autoplay: true, autoplayTimeout:3500});	
				$('.thumb-slider').owlCarousel({loop:true, margin:10, nav:false, autoHeight:true, lazyLoad:true, items:3, autoplay: true, autoplayTimeout:3500});	
				$('.cover-slider').owlCarousel({loop:true, nav:false, lazyLoad:true, items:1, autoplay: true, autoplayTimeout:3500});		
				$('.cover-walkthrough-slider').owlCarousel({loop:false, nav:false, lazyLoad:true, items:1, autoplay: false, autoplayTimeout:3500});		
				$('.cover-slider-full').owlCarousel({loop:false, nav:false, dots:false, mouseDrag:false, touchDrag:false, pullDrag:false, lazyLoad:true, items:1, autoplay: true, autoplayTimeout:3500});		
				$('.timeline-slider').owlCarousel({loop:true, lazyLoad:true, nav:false, items:1, autoplay: true, autoplayTimeout:3500});
				$('.next-slide, .next-slide-arrow, .next-slide-text, .next-slide-custom').on('click',function(){$(this).parent().find('.owl-carousel').trigger('next.owl.carousel');});		
				$('.prev-slide, .prev-slide-arrow, .prev-slide-text, .prev-slide-custom').on('click',function(){$(this).parent().find('.owl-carousel').trigger('prev.owl.carousel');});		
			    if($('.gallery-filter').length > 0){$('.gallery-filter').filterizr();}		
					$('.gallery-filter-controls a').on('click',function(){
						$('.gallery-filter-controls a').removeClass('gallery-filter-active color-highlight');	
						$(this).addClass('gallery-filter-active color-highlight');	
			    });
				baguetteBox.run('.gallery', {});		
		        baguetteBox.run('.profile-gallery', {});	
			},1);
			 $(".preload-image").lazyload({threshold : 500});
			 
		  },
		  error: function(){
				 checkConnection();
				 $("#preloader").addClass('hide-preloader');
		  }
	 
	 });
}




