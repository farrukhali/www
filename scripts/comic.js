



$(window).on('load',function(){
    
	$('#page-build').remove();
	//setTimeout(function(){$("#preloader").addClass('hide-preloader');},450);// will fade out the white DIV that covers the website.
});


var getRecordsForHome = function(){
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
			  console.log(value);
			  $(".home-latest-comics-slider").append('<div><div class="cover-content cover-content-center slide-content"><h1 class="color-white bottom-5">Tales of Demons & Gods</h1> <p class="color-white bottom-0">Lorem ipsum dolor sit amet., Urum consectetur adipisicing dolor sit amet dolor sit amet., </p><div class="slide-author"><img src="images/pictures/clip.png" alt=""><span>Admin</span> </div></div><div class="cover-overlay overlay shadow-overlay"></div><img width="700" class="owl-lazy" src="images/empty.png" data-src="images/slide1.jpg"></div>');
		  });
		  $("#preloader").addClass('hide-preloader');
		  console.log("happy");
		  /*$.each(response, function (key, value) {
          if(value.thumburl==undefined){
			 value.thumburl="images/placeholder.jpg";
		  }
		  $(".latest-comics-all").append('<div class="comic-book-item"><a href="story.html#'+value.ID+'"><img data-src="'+value.thumburl+'" src="images/empty.png" class="preload-image responsive-image" alt="img"><h3 class="comic-book-item-title">'+value.post_title+'</h3><div class="comic-book-item-auther">Admin</div></a>');
		  
		 });
		 $(".latest-comics-all").append('<div class="clear"></div>');
		 $("#preloader").addClass('hide-preloader');*/
		 //Owl Carousel Sliders
		
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
		},1);
		 $(".preload-image").lazyload({threshold : 500});
		 //$("#preloader").addClass('hide-preloader');
	  },
	  error: function(){
		     checkConnection();
	  }
	 
	 });
}
/*
$(document).ready(function () {

	
	
	
	 $.ajax({
      url: "http://blmani.com/wp-json/aniparti/getAll",
      type: "post",
      //data: {id:16842},
      dataType: 'json',
      success: function (response) {
		 // Blmani.Comic.getInstance().set(response);
		  console.log(response);
		  $("#preloader").addClass('hide-preloader');
		  $.each(response, function (key, value) {
          if(value.thumburl==undefined){
			 value.thumburl="images/placeholder.jpg";
		  }
		  $(".latest-comics-all").append('<div class="comic-book-item"><a href="story.html#'+value.ID+'"><img data-src="'+value.thumburl+'" src="images/empty.png" class="preload-image responsive-image" alt="img"><h3 class="comic-book-item-title">'+value.post_title+'</h3><div class="comic-book-item-auther">Admin</div></a>');
		  
		 });
		 $(".latest-comics-all").append('<div class="clear"></div>');
		 $("#preloader").addClass('hide-preloader');
		 $(".preload-image").lazyload({threshold : 500});
		  
	  }
	 });
	 
	
});*/



