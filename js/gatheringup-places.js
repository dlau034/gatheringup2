/**
 * 
 */

window.searchcriteria ={};
window.searchagain;

jQuery(document).ready(function() {
//  jQuery(".eventbody").hide();
  //toggle the componenet with class msg_body
  jQuery(".eventtitle").click(function()
  {
		var up = "/images/1leftarrow.png";
		var expand="Expand";
		var retract="Reduce";

		var icon = $('#expand', this);

		var idevent = jQuery(this).attr('name');

		
	    jQuery(this).next(".eventbody").slideToggle('slow');

	    if(icon.attr('src')==up){
			$.get("/atomic/logevent?events="+idevent);
			icon.attr('src', down)
	    }else{
	    	icon.attr('src', up);
	    }
	    icon.attr('title')==expand ? icon.attr('title', retract) : icon.attr('title', expand);
	    
	  });
	  jQuery(".hoverli").hover(
			  
				function () {
					var obj = $('.file_menu', this);
					obj.stop(true, true).slideDown(200);
		  		},
		  		function () {
					var obj = $('.file_menu', this);
		  			obj.stop(true, true).slideUp(200);
		  		}
			);
//	  $(function() {
/*	        $( "#citynamesearch" ).autocomplete({
	            source: "/bit/citysearch",
	            minLength: 2
	        });
	        $( "#countynamesearch" ).autocomplete({
	            source: "/bit/countysearch",
	            minLength: 2
	        });
	  
		$.get("/user/facebookurl", function(data){
			var outdata = jQuery.parseJSON(data);
//			$("#facebookurl").html(outdata.loginUrl);
			$(".facebookurl").attr("href",outdata.loginUrl);
//			alert(outdata.loginUrl);
		});
		$.get("/user/registerinit");
	        */

		$( "#county" ).autocomplete({
          source: function( request, response ) {
              $.ajax({
                  url: "/bit/citycountyzip/countynamesearch",
                  type: "GET",
                  dataType: "json",
                  data: {  search: request.term },
                  success: function( data ) {
                      var city_arr =[];
//                  	var outdata = jQuery.parseJSON(data);
                  	/*
                      $.each(outdata, function( key, value){
//                         alert(value.key);
                      	city_arr.push(value);
                  	});*/
                  	response( $.map( data, function( item ) {
//                        alert(item.city);
                  		                    return {
                              label: item.county+", "+item.state,
                              value: item.county+", "+item.state
                          };
                      }));
                  }
              });
          },
          minLength: 2});
	        $( "#city" ).autocomplete({
	            source: function( request, response ) {
	                $.ajax({
	                    url: "/bit/citycountyzip/citynamesearch",
	                    type: "GET",
	                    dataType: "json",
	                    data: {  search: request.term },
	                    success: function( data ) {
	                        var city_arr =[];
//	                    	var outdata = jQuery.parseJSON(data);
	                    	/*
	                        $.each(outdata, function( key, value){
//	                           alert(value.key);
	                        	city_arr.push(value);
	                    	});*/
	                    	response( $.map( data, function( item ) {
//	                          alert(item.city);
	                    		                    return {
	                                label: item.city+", "+item.state,
	                                value: item.city+", "+item.state
	                            };
	                        }));
	                    }
	                });
	            },
	            minLength: 2});

//	    });

});

var maparray=[];

function initialize() {
	var templatlng = new google.maps.LatLng(40.741, -73.98);
  var mapOptions = {
    center: templatlng,
    zoom: 10,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  window.mapgathering = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
//alert(map);
  for(var i=0; i<maparray.length; i++)
  {
    	var myLatlng = new google.maps.LatLng(maparray[i].latitude,maparray[i].longitude);
  	var marker = new google.maps.Marker({
  	    position: myLatlng,
//  	    map: mapgathering,
  	    title: maparray[i].destination
  	});
  	marker.setMap(window.mapgathering );
  	
  }
}

// initalize will only run when page has completely loaded. So we push
// the locations into an array and let initialize add markers.
function setgmapmarker(lat, long, destname)
{
//	  alert(lat+long);
//	var myLatlng = new google.maps.LatLng(lat,long);
/*   	var marker = new google.maps.Marker({
	    position: myLatlng,
//	    map: mapgathering,
	    title: destname
	});
alert(window.mapgathering );
	marker.setMap(window.mapgathering );*/
	maparray.push({latitude: lat, longitude: long, destination: destname});
}

function searchagain()
{
}

function nycsearch(newsearch)
{
	if(newsearch)
	{
		var neighborhood_ids = [];
		var search = "";
		var criteria;
		if($("#search").val())
		{
			search = $("#search").val();
		}
		
		if($("#neighborhoodraw").val())
		{
			neighborhood_ids = $("#neighborhoodraw").val();
		}	
		criteria ={neighborhood: neighborhood_ids, search: search, page: 0};
		if(search.length==0 && neighborhood_ids.length==0)
		{
		//		alert("no search or neighborhood.");
//			$(".quote").html("<b>Please enter a neighborhood or search criteria.</b>");
		//    	$("#founddetails").html("");
			$("#map_canvas").html("");
			$("#resultview").html("");

			return;
		}
		$("#placesearchresults").html('');
		$('#resultview > input[value="More"]').remove();
		window.searchcriteria = criteria;
		window.searchagain=nycsearch;
	}else{
		criteria = searchcriteria;
		criteria.page++;
		window.searchcriteria = criteria;
	}
//	console.log(newsearch);
//	console.log(criteria);
	
//	$("#ajaxSpinnerImage").show();
	$.ajax({
        type: "POST",
        url: "/find/places",
        data: criteria,
        dataType: 'json',
        success: function(data){
			//var outdata = jQuery.parseJSON(data);
			//outdata=data;
            if(data==false|| data=='false' || data==null)
            {
//            	$("#resultview").html("");
//            	$("#founddetails").html("");
//            	$("#map_canvas").html("");
				if(newsearch){
					$("#placesearchresults").html("<b>No results found</b>");
				}else{
					$('#resultview > input[value="More"]').remove();
				}
            }else{
				var template  = $("#places").html();
				var temp = _.template(template, {outdata : data});
				if(newsearch){
					
					$("#placesearchresults").html(temp);
					
					if(!(data.length<10)){

						//If there's already a button then remove it first.
						$('#resultview > input[value="More"]').remove();

						morebutton = '<input type="button" value="More" class="btn btn-blue btn-large span5" onclick="window.searchagain(0)" />';
						$(morebutton).appendTo("#resultview");
//						$('#resultview > input[value="More"]').remove();
					}
//					console.log("returned success, new search.");
//					console.log(data);

//				gmarks="http://maps.googleapis.com/maps/api/staticmap?";
				
					var mapOptions = {
		                center: new google.maps.LatLng(40.741, -73.98),
		                zoom: 10,
		                mapTypeId: google.maps.MapTypeId.ROADMAP
		             };
					window.mapgathering = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
				}else{
					if(data.length>0){
//						console.log(data);
						$(temp).appendTo("#placesearchresults");
						if(data.length<10){
							$('#resultview > input[value="More"]').remove();
						}
					}else{
//						console.log("removing data");
//						console.log(data);
						$('#resultview > input[value="More"]').remove();
					}
				}

				jQuery.each(data, function(index, value){
/*	            if(flag){
		            gmarks=gmarks+"center=40.7410000,-73.9800000&zoom=10&size=440x640&maptype=roadmap";
		            flag=false;
	            }
				gmarks=gmarks+ "&markers="+value.latitude+","+value.longitude; */
	            	var myLatlng = new google.maps.LatLng(value.latitude,value.longitude);
	            	var marker = new google.maps.Marker({
	            	    position: myLatlng ,
//	            	    map: mapgathering,
	            	    title: value.destname
	            	});
	            	marker.setMap(window.mapgathering );

	            //	console.log("1: "+value.idplace);
	            	setbookmark(value.idplace);

				});
//				gmarks= gmarks+"&sensor=false";
//				$("#founddetails").html('<div class="solidbox"  style="background-color: #666666; "><img src="'+gmarks+'"></div>');

//				$(".quote").html("");
            }
//            $("#ajaxSpinnerImage").hide();
        },
        error: function(errMsg, ajaxOptions, thrownError) {
//        	$("#resultview").html('Error: '+errMsg.status+thrownError);
//        	$("#founddetails").html("");
        	$("#map_canvas").html("");
//			$(".quote").html("");
//			$("#ajaxSpinnerImage").hide();
        }
  });
}
function nationalsearch(newsearch)
{
	if(newsearch)
	{
		var city_id = "";
		var search = "";
		var county_id = "";
		var state_id;
		var zipcode_id;
		var criteria;
		
		if($("#search2").val())
		{
			search = $("#search2").val();
		}
		
		if($("#city").val())
		{
			city_id = $("#city").val();
		}	
		if($("#county").val())
		{
			county_id = $("#county").val();
		}	
		if($("#state").val())
		{
			state_id = $("#state").val();
		}	
		if($("#zipcode").val())
		{
			zipcode_id = $("#zipcode").val();
		}	
		criteria ={city: city_id, county: county_id, search: search, state: state_id, zipcode: zipcode_id, page: 0};
		if(search.length==0 && city_id.length==0 && county_id.length==0 && state_id==null && zipcode_id==null)
		{
	//		alert("no search or neighborhood.");
//			$(".quote").html("<b>Please enter a search criteria.</b>");
	    	$("#map_canvas").html("");
	//    	$("#founddetails").html("");
	    	$("#resultview").html("");
	    	
			return;
		}
		$("#placesearchresults").html('');
		$('#resultview > input[value="More"]').remove();
		window.searchcriteria = criteria;
		window.searchagain=nationalsearch;
	}else{
		criteria = searchcriteria;
		criteria.page++;
		window.searchcriteria = criteria;
	}
//	console.log(criteria);
//	$("#ajaxSpinnerImage2").show();
	$.ajax({
        type: "POST",
        url: "/find/places/national",
        data: criteria,
        dataType: 'json',
        success: function(data){
//			var outdata = jQuery.parseJSON(data);
            if(data==false|| data=='false' || data==null)
            {
//$("#resultview").html("");
//$("#map_canvas").html("");
//$("#founddetails").html("");
				if(newsearch){
	    			$("#placesearchresults").html("<b>No results found</b>");
					}else{
					$('#resultview > input[value="More"]').remove();
					}
            }else{

				var template  = $("#places").html();
				var temp = _.template(template, {outdata : data});
				if(newsearch){
					$('#resultview > input[value="More"]').remove();

					$("#placesearchresults").html(temp);
					morebutton = '<input type="button" value="More" class="btn btn-blue btn-large span5" onclick="window.searchagain(0)" />';
					$(morebutton).appendTo("#resultview");
					
//		             gmarks="http://maps.googleapis.com/maps/api/staticmap?";
		        var mapOptions = {
		                center: new google.maps.LatLng(38,-97),
		                zoom: 3,
		                mapTypeId: google.maps.MapTypeId.ROADMAP
		             };
	             window.mapgathering = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
//		            gmarks=gmarks+"center=38,-97&zoom=4&size=640x640&maptype=roadmap";
					if(data.length<10){
						$('#resultview > input[value="More"]').remove();
					}

				}else{
					if(data.length>0){
//						console.log(data);
						$(temp).appendTo("#placesearchresults");
						if(data.length<10){
							$('#resultview > input[value="More"]').remove();
						}
					}else{
//						console.log("removing data");
//						console.log(data);
						$('#resultview > input[value="More"]').remove();
					}
				}

				jQuery.each(data, function(index, value){
//				gmarks=gmarks+ "&markers="+value.latitude+","+value.longitude; 
	            	var myLatlng = new google.maps.LatLng(value.latitude,value.longitude);
	            	var marker = new google.maps.Marker({
	            	    position: myLatlng ,
//	            	    map: mapgathering,
	            	    title: value.destname
	            	});
	            	marker.setMap(window.mapgathering );
	            	setbookmark(value.idplace);

				});
//				gmarks= gmarks+"&sensor=false";
//				$("#founddetails").html('<div class="solidbox"  style="background-color: #666666; "><img src="'+gmarks+'"></div>');

				$(".quote").html("");
            }
//            $("#ajaxSpinnerImage2").hide();
        },
        error: function(errMsg, ajaxOptions, thrownError) {
        	$("#resultview").html('Error: '+errMsg.status+thrownError);
        	$("#map_canvas").html("");
//        	$("#founddetails").html("");
			$(".quote").html("");
//			$("#ajaxSpinnerImage2").hide();
        }
  });
}
function placedetails(idplace){
//	alert(idplace);
	$.ajax({
        type: "POST",
        url: "/find/places/one?idplace="+idplace,
//        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function(data){
//            alert(data);
//			var outdata = jQuery.parseJSON(data);
        	var myLatlng;

//			gmarks="http://maps.googleapis.com/maps/api/staticmap?";
			jQuery.each(data, function(index, value){
//            	gmarks=gmarks+"center="+value.latitude+","+value.longitude+"&zoom=16&size=440x640&maptype=roadmap";
//				gmarks=gmarks+ "&markers="+value.latitude+","+value.longitude;
	          	myLatlng = new google.maps.LatLng(value.latitude,value.longitude);
			});
//			gmarks= gmarks+"&sensor=false";
//			alert(gmarks);
//			$("#founddetails").html('<div class="solidbox"  style="background-color: #666666; "><img src="'+gmarks+'"></div>');
        	window.mapgathering.setCenter(myLatlng);
        	window.mapgathering.setZoom(16);
			$(".quote").html("");

           },
        failure: function(errMsg) {
			$(".quote").html("");
            alert(errMsg);
        }
  });
}

function placecenter(latitude, longitude){
	var myLatlng = new google.maps.LatLng(latitude,longitude);
	window.mapgathering.setCenter(myLatlng);
	window.mapgathering.setZoom(16);
}

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
function toggleplace(id)
{
//	console.log(bookmarks);
	if(bookmarks[id]==undefined || !bookmarks[id])
	{
		bookmarkplace(id);
		bookmarks[id]=1;
	}else
	{
		unbookmarkplace(id);
		bookmarks[id]=undefined;
	}
}

function bookmarkplace(id)
{
		$.ajax({
	        type: "GET",
	        url: "/places/bookmark?idplace="+id,
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

function unbookmarkplace(id)
{
	$.ajax({
     type: "GET",
     url: "/places/unbookmark?idplace="+id,
//     contentType: "application/json; charset=utf-8",
//     dataType: "json",
     success: function(data){
//         alert("#"+idrest+" "+data);
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

function placebookmarklogin(id)
{
	$(".pbookmark").val(id);
	loginpopup('/places');
}


function uploadimage(idplace)
{
    $("#"+idplace+"output").html('<div style="padding:10px"><img src="/images/350.gif" alt="Please Wait"/> <span>Uploading...</span></div>');

//	    	senddata = {userfile: $('#UploadForm')[0]};
	senddata = new FormData($('#'+idplace+'Form')[0]);
	
    $.ajax({
		url: '/imageupload/places?idplace='+idplace,
		type: 'POST',
		data: senddata,
		cache: false,
		processData: false,
		contentType: false,
        success:  function (responseText){
        	if(responseText=="false"){
                $('#'+idplace+'imagename').val("");  // reset form
                $("#"+idplace+"output").html('<div style="padding:10px">Error: file not uploaded.</div>');
        	}else{
//	                alert("responseText");
            $('#'+idplace+'imagename').val("");  // reset form
//	                $("#output").html(responseText);
            $("#"+idplace+"output").html('<img src="'+responseText+'" alt="Please Wait"/>');
        }
        }
    });
}