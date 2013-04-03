
function contactus()
{

	var errorflag=false;
	var errorarr = [];
	var errorlog="Please check fields: ";
	
	if(!$("#name").val())
	{
		errorarr.push("name");
	}
	if(!validemail($("#email").val()))
	{
		errorarr.push("email");
	}
	if(!$("#captcha").val())
	{
		errorarr.push("captcha code");
	}
	if(!$("#message").val())
	{
		errorarr.push("message");
	}else{
		var message = $("#message").val();
		if(message.length<20){
			errorarr.push("message length is less than 20 characters");
		}
	}

	if(errorarr.length>0){
		errorflag=true;
	}

	if(!errorflag){  // If no errors, then continue
//		console.log("hey");
		contactusdata = $('#contactusform').serialize();
		
		$.ajax({
	        type: "POST",
	        url:'/about/contactus', 
	        dataType: 'json',
	        data: contactusdata, 
	        success: function(data) {
	        	console.log(data);
	        	if(data.status=='true')
	        	{
	        		alert(data.message);
		        	window.location='/about/contactusform';
		        	return;
	        	}
        		alert(data.message);
 	        }	
		});
	}else
	{
		$("#Errors").html('Please check fields: <font color="#ff0000">'+errorarr.join(", ")+'</font>.<br><br>');
	}
}

function submitevent()
{

	var errorflag=false;
	var errorarr = [];
	var errorlog="Please check fields: ";
	
	if(!$("#name").val())
	{
		errorarr.push("name");
	}
	if(!validemail($("#email").val()))
	{
		errorarr.push("email");
	}
	if(!$("#summary").val())
	{
		errorarr.push("title");
	}
	if(!$("#location").val())
	{
		errorarr.push("location");
	}
	if(!$("#city").val())
	{
		errorarr.push("city");
	}
	if(!$("#datepicker3").val())
	{
		errorarr.push("startdate");
	}
	if(!$("#description").val())
	{
		errorarr.push("description");
	}

	if(errorarr.length>0){
		errorflag=true;
	}

	if(!errorflag){  // If no errors, then continue
//		console.log("hey");
		submiteventdata = $('#submitevent2').serialize();
		
		$.ajax({
	        type: "POST",
	        url:'/about/submitevent', 
	        dataType: 'json',
	        data: submiteventdata, 
	        success: function(data) {
	        	console.log(data);
	        	if(data.status=='true')
	        	{
	        		alert(data.message);
	        		$("#name").val("");
	        		$("#email").val("");
	        		$("#phone").val("");
	        		$("#companyurl").val("");
	        		$("#summary").val("");
	        		$("#location").val("");
	        		$("#city").val("");
	        		$("#datepicker3").val("");
	        		$("#timepicker3").val("");
	        		$("#timepicker2").val("");
	        		$("#description").val("");
	        		
	        	}else
	        	{
		        	window.location='/about/submiteventform';
	        	}
	        }	
		});
	}else
	{
		$("#Errors").html('Please check fields: <font color="#ff0000">'+errorarr.join(", ")+'</font>.<br><br>');
	}
}