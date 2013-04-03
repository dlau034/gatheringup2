/**
 * 
 */

jQuery(document).ready(function() {

	$.ajax({
        type: "GET",
        url: "/user/facebookurl",
        cache: true,
        success: function(data){
			var outdata = jQuery.parseJSON(data);
			$(".facebookurl").attr("href",outdata.loginUrl);
           }
  });
//		$.get("/user/registerinit");
//		$('.dropdown-toggle ul.dropdown-menu form.form-horizontal, div.SignInField').click(function(e) {
		$('.dropdown-menu form#signin_content.clearfix span#logindropdownspan').click(function(e) {
			e.stopPropagation();
		});
		$(".dropdown-toggle").click(function(e){
			var x = setTimeout('$("#signin_content input:text:visible:first").focus()', 200);
//			var x = setTimeout('$("#loginsideform input:text:visible:first").focus()', 200);
		});
		$( "#header_search" ).autocomplete({
	          source: function( request, response ) {
	              $.ajax({
	                  url: "/bit/localize/search",
	                  type: "GET",
	                  dataType: "json",
	                  data: {  search: request.term },
	                  success: function( data ) {
	                      var city_arr =[];
//	                  	var outdata = jQuery.parseJSON(data);
	                  	/*
	                      $.each(outdata, function( key, value){
//	                         alert(value.key);
	                      	city_arr.push(value);
	                  	});*/
	                  	response( $.map( data, function( item ) {
//	                        alert(item.city);
	                  		console.log(item);
	                  		                    return {
	                              label: item.search,
	                              value: item.search
	                          };
	                      }));
	                  }
	              });
	          },
	          minLength: 2});
});

function loginpopup(url)
{
    $('#Signin_Modal').on('shown', function (e) {
    	$('input:text:visible:first', this).focus();
        });	
    $("#redirect").val(url);
	$("#myModal").modal({show: false});
	 $("#Signin_Modal").modal('show');	
}

function registerpopup(url)
{
    $('#register_modal').on('shown', function (e) {
    	$('input:text:visible:first', this).focus();
        });
	$("#Signin_Modal").modal('hide');
	 //$("#myModal").modal('show');
}

/*
 * Switching dialogs from login to registration
 */
function logintoforget()
{
    $('#forgotModal').on('shown', function (e) {
    	$('input:text:visible:first', this).focus();
        });
	$("#Signin_Modal").modal('hide');
	$("#forgotModal").modal('show');

}

function forgotpassword()
{
	email = $("#forgotemail").val();
	console.log("reset password: "+email);
	if(validemail(email)){
		forgotemail = {email: email};
		$.post('/user/resetpassword', forgotemail, function(data) {
			if(data=='true')
			{
				console.log("forgotpasswod");
				$("#forgotemail").val("");
//				$("#forgotModal").modal('hide');
//				loginpopup();
			}
			console.log(data);
		  });
		console.log("valid email");
		successmsg = '<font color="#ff3333">Your password has been reset.  Please check your email for your new password.  ';
		successmsg = successmsg+'Click <a href="" onclick="loginpopup();">here</a> to login.</font>';

		$("#forgotModal").modal('hide');
		$("#announcementModal div.modal-body").html(successmsg);
		$("#announcementModal").modal('show');
	}else{
		$("#announcementModal div.modal-body h4").html('<font color="#ff3333">Invalid email</font>');
		console.log("invalid email");
	}
}
function login()
{

	logindata = $("#loginform").serialize();
	if($("#loginemail").val() == ''  || $("#loginpasswd").val()=='' )
	{
		$("#LoginErrors").html('<font color="#ff3333">Invalid email or password.</font>');
		return;
	}

	$.post('/user/loginbit', logindata, function(data) {
		if(data=='true')
		{
			$("#Signin_Modal").modal('hide');
			window.location=$("#redirect").val();
			$("#redirect").val("");
		}else{
		$("#LoginErrors").html('<font color="#ff3333">'+data+'</font>');
		}
	  });
}

function loginsidedrop()
{
	if($("#droploginemail").val() == ''  || $("#droploginpassword").val()=='' )
	{
		$("#SideDropLoginErrors").html('<font color="#ff3333">Invalid email or password.</font>');
		return;
	}
	email = $("#droploginemail").val();
	password =  $("#droploginpassword").val();
	logindata= {email: email, password: password};
	$.post('/user/loginbit', logindata, function(data) {
		if(data=='true')
		{
			window.location="/datebook";
			$("#redirect").val("");
		}else{
		$("#SideDropLoginErrors").html('<font color="#ff3333">'+data+'</font>');
		}
	  });
}

function register()
{

	var firstname = "";
	var lastname = "";
	var email="";
	var password="";
	var passwordconf  ="";
	var robotdistorter="";
	var registerflag=true;
	var errorlog="";
	
	if(validname($("#firstname").val()))
	{
		firstname = $("#firstname").val();
		$("#errfirstname").html('');
	}else{
		registerflag = false;
		$("#errfirstname").html('<font color="red">*</font>');
	}
	if(validname($("#lastname").val()))
	{
		lastname= $("#lastname").val();
		$("#errlastname").html('');
	}else{
		$("#errlastname").html('<font color="red">*</font>');
		registerflag = false;
	}
	if(validemail($("#regemail").val()))
	{
		$("#erremail").html('');
		email= $("#regemail").val();
	}else{
		$("#erremail").html('<font color="red">*</font>');
		registerflag = false;
	}
	if(validpassword($("#regpassword").val()))
	{
		$("#errpassword").html('');
		password= $("#regpassword").val();
	}else
	{
		registerflag = false;
		$("#errpassword").html('<font color="red">*</font>');
	}
	if(validpassword($("#regpasswordconf").val()))
	{
		passwordconf = $("#regpasswordconf").val();
		$("#errpasswordconf").html('');
	}else
	{
		$("#errpasswordconf").html('<font color="red">*</font>');
		registerflag = false;
	}
	if($("#robotdistorter").val())
	{
		robotdistorter = $("#robotdistorter").val();
		$("#errrobotdistorter").html('');
	}else
	{
		$("#errrobotdistorter").html('<font color="red">*</font>');
		registerflag = false;
	}
	if(password===undefined || passwordconf===undefined || password != passwordconf)
	{
		registerflag = false;
		errorlog=errorlog+"You passwords do not match<br>";
	}
	if($("#termsandconditions").attr('checked'))
	{
	}

	if(registerflag){
		registerdata = $("#registerform").serialize();
		
		$.post('/user/registerbit', registerdata, function(data) {
			if(data=='true')
			{
				$("#myModal").modal('hide');
				window.location="/datebook?newlyregistered=true";
			}else{
				$("#RegistrationErrors").html('<font color="#ff3333">'+data+'</font>');
			}
		  });
	}else
	{
		$("#RegistrationErrors").html(errorlog);
	}
}

function validname(name)
{
	var regexp = /^[a-zA-Z0-9\-\.\,\_\s]+$/;
	if(name==null || name.length==0)
	{		return false;	}
	if (name.search(regexp) == -1)
	    { return false; }
	else
	    { return true; }
}
function validemail(name)
{
	console.log(name+"\n");
	var regexp = /^[a-zA-Z0-9\.\_]+@[a-zA-Z0-9\.\_]+\.[a-zA-Z]{2,4}$/;
	if(name==null || name.length==0)
	{		return false;	}
	if (name.search(regexp) == -1){
		console.log("false");
		return false; 
		}
	else
	    { return true; }
}
function validpassword(name)
{
	var regexpnum = /[0-9]/;
//	var regexpstr = /[A-Z]/;
	
	if(name==null || name.length==0)
	{		return false;	}
	if (name.search(regexpnum) != -1 && name.length>8)
	    { return true; }
	else
	    { return false; }
}
