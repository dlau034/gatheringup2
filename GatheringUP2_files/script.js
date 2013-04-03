
$(document).ready(function(){
	$(".nearby_item").hover(function(){
		$(this).find(".CTA_button").toggle();
	});

	$(".mini_item").hover(function(){
		$(this).find(".CTA_button_mini").toggle();
	});
	$(".item_tab").click(function() {
		$(this).parent().siblings(".item_content").slideToggle();
	});
	$(".item_tab").click(function(){
		$(this).siblings(".item_content").slideToggle();
	});

	$(".btn-destory").click(function(){
		$(this).closest(".content_btn").fadeOut("slow",function(){
			$(this).remove();
		});
	});

});

// $(document).ready(function(){
// 	$("#Outing_frame").resizable();
// });

$(function() {
/*       var datePicker = $('#datepicker').datepicker({
 		 	inline: true,  
        	showOtherMonths: true,  
        	dayNamesMin: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
       });

    $(".demo").scroll(function() {
      datePicker.datepicker('hide');
      $('#datepicker').blur();  
    });
    
    $(window).resize(function() {
      datePicker.datepicker('hide');
            $('#datepicker').blur();  
    });
  */  
});

$(function(){ 
        $(".tier3").popover({container:'body'});  
      });  
         
