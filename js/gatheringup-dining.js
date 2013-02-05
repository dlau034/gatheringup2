/**
 * 
 */
//var mapgathering;
//initialize();

window.searchcriteria ={};
window.searchagain;

var maparray=[];

function initialize() {
	var mapOptions = {
          center: new google.maps.LatLng(40.741, -73.98),
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
//        	    map: mapgathering,
        	    title: maparray[i].destination
        	});
        	marker.setMap(window.mapgathering );
        	
        }
      }
      
      // initalize will only run when page has completely loaded. So we push
      // the locations into an array and let initialize add markers.
      function setgmapmarker(lat, long, destname)
      {
//    	  alert(lat+long);
//      	var myLatlng = new google.maps.LatLng(lat,long);
 /*   	var marker = new google.maps.Marker({
    	    position: myLatlng,
//    	    map: mapgathering,
    	    title: destname
    	});
alert(window.mapgathering );
    	marker.setMap(window.mapgathering );*/
    	maparray.push({latitude: lat, longitude: long, destination: destname});
}

      
function formSubmit(newsearch)
{
	if(newsearch)
	{
		var category_ids = [];
		var neighborhood_ids = [];
		var search = "";
		var zipcode = "";
		var geolocate=0;
		var criteria;
	
	
	//	alert(category_ids.toSource());
	//	alert(neighborhood_ids.toSource());
	//	alert(criteria.toSource());
		var test = {test: category_ids};
		if($("#search").val())
		{
			search = $("#search").val();
		}
		if($("#categoryraw").val())
		{
			category_ids = $("#categoryraw").val();
		}
		if($("#neighborhoodraw").val())
		{
			neighborhood_ids = $("#neighborhoodraw").val();
		}	
		criteria ={category: category_ids,neighborhood: neighborhood_ids, search: search, page: 0};
		$("#businesssearchresults").html('');
		$('#resultview > input[value="More"]').remove();
		window.searchcriteria = criteria;
		window.searchagain=formSubmit;
	}else{
		criteria = searchcriteria;
		criteria.page++;
		window.searchcriteria = criteria;
	}
//	console.log(criteria);

//	$("#ajaxSpinnerImage").show();
	$.ajax({
        type: "POST",
        url: "/find/restaurants",
        data: criteria,
//        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function(data){
//            alert(data);
            if(data==false|| data=='false' || data==null)
            {
//            	$("#resultview").html("");
//            	$("#founddetails").html("");
//            	$("#map_canvas").html("");
//    			$(".quote").html("<b>Sorry, we did not find anything with that criteria.</b>");
				if(newsearch){
					$("#businesssearchresults").html("<b>No results found</b>");
				}else{
					$('#resultview > input[value="More"]').remove();
				}
            }else{
//			var outdata = jQuery.parseJSON(data);
//        	$("#resultview").html(outdata);

            	var template  = $("#restaurants").html();
            	var temp = _.template(template, {outdata : data});
				if(newsearch){
					$('#resultview > input[value="More"]').remove();

					$("#businesssearchresults").html(temp);
					morebutton = '<input type="button" value="More" class="btn btn-blue btn-large span5" onclick="window.searchagain(0)" />';
					$(morebutton).appendTo("#resultview");
//            	$(".quote").html("Found:");
			
					var mapOptions = {
            			center: new google.maps.LatLng(40.741, -73.98),
            			zoom: 10,
            			mapTypeId: google.maps.MapTypeId.ROADMAP
					};
					window.mapgathering = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
					if(data.length<10){
						$('#resultview > input[value="More"]').remove();
					}
				}else{
					if(data.length>0){
//						console.log(data);
						$(temp).appendTo("#businesssearchresults");
						if(data.length<10){
							$('#resultview > input[value="More"]').remove();
						}
					}else{
//						console.log("removing data");
//						console.log(data);
						$('#resultview > input[value="More"]').remove();
					}
				}

             //			gmarks="http://maps.googleapis.com/maps/api/staticmap?";
			jQuery.each(data, function(index, value){
	            //alert(value.latitude);
/*            if(flag){

		            gmarks=gmarks+"center=40.7410000,-73.9800000&zoom=10&size=440x640&maptype=roadmap";
		            flag=false;
	            }*/
            	var myLatlng = new google.maps.LatLng(value.latitude,value.longitude);
            	var marker = new google.maps.Marker({
            	    position: myLatlng ,
//            	    map: mapgathering,
            	    title: value.destname
            	});
            	marker.setMap(window.mapgathering );
//				gmarks=gmarks+ "&markers="+value.latitude+","+value.longitude;
				setbookmark(value.idbusiness);
	            
			});
//			gmarks= gmarks+"&sensor=false";
//			alert(gmarks);
//			$("#founddetails").html("<img src=\""+gmarks+"\">");

//			$("#gmap").attr("src",gmarks);

			//        	$("#resultview").html(data);
            }
 //           $("#ajaxSpinnerImage").hide();
           },
        error: function(errMsg, ajaxOptions, thrownError) {
  //      	$("#resultview").html('Error: '+errMsg.status+thrownError);
//        	$("#founddetails").html("");
        	$("#map_canvas").html("");
//            alert(errMsg);
//			$(".quote").html("");
 //           $("#ajaxSpinnerImage").hide();
        }
  });
}
function restaurantdetails(idrest){
	$.ajax({
        type: "POST",
        url: "/find/restaurants/one?idrest="+idrest,
//        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function(data){
//            alert(data);
//			var outdata = jQuery.parseJSON(data);
        	var myLatlng;
//        	gmarks="http://maps.googleapis.com/maps/api/staticmap?";
			jQuery.each(data, function(index, value){
//            	gmarks=gmarks+"center="+value.latitude+","+value.longitude+"&zoom=16&size=440x640&maptype=roadmap";
//				gmarks=gmarks+ "&markers="+value.latitude+","+value.longitude;
	          	myLatlng = new google.maps.LatLng(value.latitude,value.longitude);
	            
			});
//			gmarks= gmarks+"&sensor=false";

        	window.mapgathering.setCenter(myLatlng);
        	window.mapgathering.setZoom(16);
//			alert(gmarks);
//			$("#founddetails").html("<img src=\""+gmarks+"\">");


           },
        error: function(errMsg) {
            alert(errMsg);
        }
  });
	
}

function restaurantcenter(latitude, longitude){
	var myLatlng = new google.maps.LatLng(latitude,longitude);
	window.mapgathering.setCenter(myLatlng);
	window.mapgathering.setZoom(16);
}

function randomrestaurant(){
	var neighborhood_ids;
	
	if($("#neighborhoodraw2").val())
	{
		neighborhood_ids = $("#neighborhoodraw2").val();

//		alert(neighborhood_ids);
	}	
	criteria ={neighborhood: neighborhood_ids};
	
//	$("#ajaxSpinnerImage2").show();
	$.ajax({
        type: "POST",
        url: "/find/restaurants/randomone",
//        contentType: "application/json; charset=utf-8",
        data: criteria,
        dataType: "json",
        success: function(data){
        	var myLatlng;
//            alert(data);
//			var outdata = jQuery.parseJSON(data);
//			gmarks="http://maps.googleapis.com/maps/api/staticmap?";
			jQuery.each(data, function(index, value){
//            	gmarks=gmarks+"center="+value.latitude+","+value.longitude+"&zoom=16&size=440x640&maptype=roadmap";
//				gmarks=gmarks+ "&markers="+value.latitude+","+value.longitude;
	        	setbookmark(value.idbusiness);
//	        	console.log("2: "+value.latitude+", "+value.longitude);
	          	myLatlng = new google.maps.LatLng(value.latitude,value.longitude);
//	        	console.log("3: "+value.latitude+", "+value.longitude);
			});
//		gmarks= gmarks+"&sensor=false";
//			alert(gmarks);
	        var mapOptions = {
	                center: myLatlng,
	                zoom: 16,
	                mapTypeId: google.maps.MapTypeId.ROADMAP
	              };
            window.mapgathering = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
        	var marker = new google.maps.Marker({
        	    position: myLatlng //,
//        	    map: mapgathering,
//        	    title: value.destname
        	});
        	marker.setMap(window.mapgathering );

            
			var template  = $("#restaurants").html();
//			$("#founddetails").html("<img src=\""+gmarks+"\">");

//			$("#gmap").attr("src",gmarks);

			var temp = _.template(template, {outdata : data});
			$("#businesssearchresults").html(temp);
			$('#resultview > input[value="More"]').remove();
			
//			$(".quote").html("Food Roulette: We found this spot for you.");
//        	$("#ajaxSpinnerImage2").hide();
           },
        error: function(errMsg) {
            alert(errMsg);
 //       	$("#ajaxSpinnerImage2").hide();
        }
  });
	
}

// Set's bookmarks for search result templates.
function setbookmark(idrest)
{
		if(bookmarks[idrest]!=undefined && bookmarks[idrest])
		{
			$("#"+idrest).html('<img src="/images/gtk-bookmark-on.png" width="30" align="bottom">');
		}
}

// Toggles the bookmark flag 
function togglebusiness(idrest)
{


//console.log(bookmarks);
//alert(bookmarks);

//	console.log(bookmarks);
	if(bookmarks[idrest]==undefined || !bookmarks[idrest])
	{
		bookmarkrestaurant(idrest);
		bookmarks[idrest]=1;
	}else
	{
		unbookmarkrestaurant(idrest);
		bookmarks[idrest]=undefined;
	}
}
function bookmarkrestaurant(idrest)
{
		$.ajax({
	        type: "GET",
	        url: "/dining/bookmark?idbiz="+idrest,
//	        contentType: "application/json; charset=utf-8",
//	        dataType: "json",
	        success: function(data){
//	            alert("#"+idrest);
	            if(data=='true')
	            {
	                $("#"+idrest).html('<img src="/images/gtk-bookmark-on.png" width="30" align="bottom">');
	            }
	           },
	        error: function(errMsg) {
	        }
	  });
	return "#";
}
function unbookmarkrestaurant(idrest)
{
	$.ajax({
        type: "GET",
        url: "/dining/unbookmark?idbiz="+idrest,
//        contentType: "application/json; charset=utf-8",
//        dataType: "json",
        success: function(data){
//            alert("#"+idrest+" "+data);
            if(data=='true')
            {
                $("#"+idrest).html('<img src="/images/gtk-bookmark.png" width="30" align="bottom">');
            }
           },
        error: function(errMsg) {
        }
  });
	return "#";
}
function diningbookmarklogin(idrest)
{
	$(".bbookmark").val(idrest);
	loginpopup('/dining');
}

function uploadimage(idrest)
{
    $("#"+idrest+"output").html('<div style="padding:10px"><img src="/images/350.gif" alt="Please Wait"/> <span>Uploading...</span></div>');

//	    	senddata = {userfile: $('#UploadForm')[0]};
	senddata = new FormData($('#'+idrest+'Form')[0]);
	
    $.ajax({
		url: '/imageupload/business?idbiz='+idrest,
		type: 'POST',
		data: senddata,
		cache: false,
		processData: false,
		contentType: false,
        success:  function (responseText){
        	if(responseText=="false"){
                $('#'+idrest+'imagename').val("");  // reset form
                $("#"+idrest+"output").html('<div style="padding:10px">Error: file not uploaded.</div>');
        	}else{
//	                alert("responseText");
            $('#'+idrest+'imagename').val("");  // reset form
//	                $("#output").html(responseText);
            $("#"+idrest+"output").html('<img  src="'+responseText+'" alt="Please Wait"/>');
        }
        }
    });
}
/*
function diningcreateeventlogin(idrest)
{
	$(".bbookmark").val(idrest);
	loginpopup('/calendar?business='+idrest);
}
*/
