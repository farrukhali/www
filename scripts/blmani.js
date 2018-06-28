$(window).on('load',function(){
    
	$('#page-build').remove();
	//setTimeout(function(){$("#preloader").addClass('hide-preloader');},450);// will fade out the white DIV that covers the website.
});

$(document).ready(function () {

	if($("div#menu-1").length){
		var session = Blmani.Session.getInstance().get();
		if(!session){
			$('.user-logined').addClass("hideit");
			console.log("session expired");
		} else {
			$('.user-not-logined').addClass("hideit");
		}
	}
	//var comic = Blmani.Comic.getInstance().get();
	//console.log(comic);
	
	
	//if(!comic && comic.lenght<=0){
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
		  //$('#itemstoload').append('        <div class="store-slide-2"> <a href="#" id="cimg" class="store-slide-image"> <img class="preload-image" src="' +(value.thumburl ? value.thumburl : "images/placeholders/1.jpg") + '" data-src="images/placeholders/1.jpg" alt="img"> </a> <div class="store-slide-title ctext"> <strong>'+(value.post_title ? value.post_title : "Untitled") + '</strong> <em class="color-gray-dark">Sport Band, Water and Dust Resistant, Large Storage Capacity</em><p id="cauth">Admin</p> </div> <div class="store-slide-button cicon">  <a href="#"><i class="fa fa-comment color-black"> 99</i></a> <a href="#"><i class="fa fa-heart color-highlight"> 48</i></a> ');

		  
		  
		 });
		 $(".latest-comics-all").append('<div class="clear"></div>');
		 $("#preloader").addClass('hide-preloader');
		 $(".preload-image").lazyload({threshold : 500});
		  
	  }
	 });
	 
	/* $.ajax({
      url: "http://blmani.com/wp-json/aniparti/get_field",
      type: "post",
      //data: {id:16842},
      dataType: 'json',
      success: function (response) {
		 // Blmani.Comic.getInstance().set(response);
		  console.log(response);
	    }
	 });*/
	/*} else {
	$.each(comic, function (key, value) {
		if(value.thumburl=="undefined"){
			 value.thumburl="images/3.jpg";
		  }
		  $(".latest-comics-all").append('<div class="comic-book-item"><a href="story.html#'+value.post_id+'"><img data-src="'+value.thumburl+'" src="images/empty.png" class="preload-image responsive-image" alt="img"><h3 class="comic-book-item-title">'+value.post_title+'</h3><div class="comic-book-item-auther">Admin</div></a>');
		  
	});	
	$(".latest-comics-all").append('<div class="clear"></div>');
		 $("#preloader").addClass('hide-preloader');
		 $(".preload-image").lazyload({threshold : 500});
	}*/
	//setTimeout(function(){$("#preloader").addClass('hide-preloader');},450);// will fade out the white DIV that covers the website.
});

