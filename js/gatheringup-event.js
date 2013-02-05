/**
 * 
 */

jQuery(document).ready(function() {
//  jQuery(".eventbody").hide();
  //toggle the componenet with class msg_body
  jQuery(".eventtitle").click(function()
  {
		var up = "/images/left_arrow.png";
		var down = "/images/down_arrow.png";
		var expand="Expand";
		var retract="Reduce";

		var icon = $('#eventexpand', this);

		var idevent = jQuery(this).attr('name');

		
	    jQuery(this).next(".eventbody").slideToggle('slow');

	    if(icon.attr('src')==up){
//			$.get("/atomic/logevent?events="+idevent);
			icon.attr('src', down);
	    }else{
	    	icon.attr('src', up);
	    }
	    icon.attr('title')==expand ? icon.attr('title', retract) : icon.attr('title', expand);
	    
	  });
/*	  jQuery(".hoverli").hover(
			  
				function () {
					var obj = $('.file_menu', this);
					obj.stop(true, true).slideDown(200);
		  		},
		  		function () {
					var obj = $('.file_menu', this);
		  			obj.stop(true, true).slideUp(200);
		  		}
			);*/
/*		$.get("/user/facebookurl", function(data){
			var outdata = jQuery.parseJSON(data);
//			$("#facebookurl").html(outdata.loginUrl);
			$("#facebookurlreg").attr("href",outdata.loginUrl);
//			alert(outdata.loginUrl);
		});
		*/
		$(function() {
			$( "#datepicker" ).datepicker({
				dateFormat: 'yy-mm-dd', minDate: 0 ,
			    onSelect: function(dateText, inst) { 
			        window.location = '/events/ondate?date=' + dateText;
			    }
			});
		});
});


//Set's bookmarks for search result templates.
function setbookmark(id)
{
//	console.log(id);
		if(bookmarks[id]!=undefined && bookmarks[id])
		{
			$("#"+id).html('<img src="/images/gtk-bookmark-on.png" width="30" align="bottom">');
		}
}

//Toggles the bookmark flag 
function toggleevent(id)
{
//	console.log(bookmarks);
	if(bookmarks[id]==undefined || !bookmarks[id])
	{
		bookmarkevent(id);
		bookmarks[id]=1;
	}else
	{
		unbookmarkevent(id);
		bookmarks[id]=undefined;
	}
}
function bookmarkevent(id)
{
		$.ajax({
	        type: "GET",
	        url: "/events/bookmark?idevent="+id,
//	        contentType: "application/json; charset=utf-8",
//	        dataType: "json",
	        success: function(data){
//	            alert("#"+idrest);
	            if(data=='true')
	            {
	                $("#"+id).html('<img src="/images/gtk-bookmark-on.png" width="30" align="bottom">');
	            }
	           },
	        error: function(errMsg) {
	        }
	  });
	return "#";
}
function unbookmarkevent(id)
{
	$.ajax({
   type: "GET",
   url: "/events/unbookmark?idevent="+id,
//   contentType: "application/json; charset=utf-8",
//   dataType: "json",
   success: function(data){
//       alert("#"+idrest+" "+data);
       if(data=='true')
       {
           $("#"+id).html('<img src="/images/gtk-bookmark.png" width="30" align="bottom">');
       }
      },
   error: function(errMsg) {
   }
});
	return "#";
}
function eventbookmarklogin(id)
{
	$(".ebookmark").val(id);
	loginpopup('/events');
}
