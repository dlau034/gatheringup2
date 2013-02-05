/**
 * 
 */
jQuery(document).ready(function() {
		$.get("/user/facebookurl", function(data){
			var outdata = jQuery.parseJSON(data);
//			$("#facebookurl").html(outdata.loginUrl);
			$(".facebookurl").attr("href",outdata.loginUrl);
//			alert(outdata.loginUrl);
		});
		$.get("/user/registerinit");
});

function loginpopup(url)
{
	$("#redirect").val(url);
	$("#myModal").modal({show: false});
	 $("#Signin_Modal").modal('show');	
/*	$("#registerdiv").dialog('close');
	$("#forgotdiv").dialog('close');
//	alert("1 - working"+urllink);
	//var data;
	$("#redirect").val(url);
	$("#logindiv").dialog({
		autoOpen: false,
		modal: true,
		title: 'Login',
		width: 500,
		close: function (){
			$("#loginemail").val('');
			$("#loginpasswd").val('');
			$("#LoginErrors").html('');
//			$(this).dialog('close').dialog('destroy');
		}
	}).dialog("open");*/
}

function registerpopup(url)
{
	$("#Signin_Modal").modal('hide');
	 $("#myModal").modal('show');

	/*
	$("#logindiv").dialog('close');
	$("#forgotdiv").dialog('close');
//	alert("1 - working"+urllink);
	//var data;
	$("#captcha").html('<img src="/captcha">');
//	$("#registerform").reset();

	$("#registerdiv").dialog({
		autoOpen: false,
		modal: true,
		title: 'Register',
		width: 500,
		close: function (){
			$("#RegistrationErrors").html('');
			firstname = $("#firstname").val('');
			$("#errfirstname").html('');
			lastname= $("#lastname").val('');
			$("#errlastname").html('');
			email= $("#email").val('');
			$("#erremail").html('');
			$("#errpassword").html('');
			password= $("#password").val('');
			passwordconf = $("#passwordconf").val('');
			$("#errpasswordconf").html('');
			robotdistorter = $("#robotdistorter").val('');
			$("#errrobotdistorter").html('');

//						location.reload(true);
			//			$(this).dialog('close').dialog('destroy');
		}
	}).dialog("open");*/
}

/*
 * Switching dialogs from login to registration
 */
function logintoforget()
{
	$("#Signin_Modal").modal('hide');
	$("#forgotModal").modal('show');
/*	$("#forgotdiv").dialog({
		autoOpen: false,
		modal: true,
		title: 'Forgot Password',
		width: 500,
		close: function (){
//			$(this).dialog('close').dialog('destroy');
		}
	}).dialog("open");
	*/
}

/* Posting forms to the server
 * 
 */
/* $("#loginform").submit(function (e){
	 alert("working");
	 		e.preventDefault();
//	 		login();
 });*/

function login()
{

	logindata = $("#loginform").serialize();
	if($("#loginemail").val() == ''  || $("#loginpasswd").val()=='' )
	{
		$("#LoginErrors").html('<font color="#ff3333">Invalid email or password.</font>');
		return;
	}
//	alert(logindata);
	$.post('/user/loginbit', logindata, function(data) {
		if(data=='true')
		{
			$("#Signin_Modal").modal('hide');
//			$("#logindiv").dialog("close");
//			window.location="/calendar";
			window.location=$("#redirect").val();
			$("#redirect").val("");
		}else{
		$("#LoginErrors").html('<font color="#ff3333">'+data+'</font>');
		}
		//alert(logindata.toSource());
	    //alert("Data Loaded: " + data);
	  });
}

function loginsidedrop()
{

//	logindata = $("#loginform").serialize();
	if($("#droploginemail").val() == ''  || $("#droploginpassword").val()=='' )
	{
		$("#SideDropLoginErrors").html('<font color="#ff3333">Invalid email or password.</font>');
		return;
	}
	email = $("#droploginemail").val();
	password =  $("#droploginpassword").val();
	logindata= {email: email, password: password};
//	alert(logindata);
	$.post('/user/loginbit', logindata, function(data) {
		if(data=='true')
		{
//			$("#Signin_Modal").modal('hide');
//			$("#logindiv").dialog("close");
//			console.log("logged in");
			window.location="/datebook";
//			window.location=$("#redirect").val();
			$("#redirect").val("");
		}else{
		$("#SideDropLoginErrors").html('<font color="#ff3333">'+data+'</font>');
		}
		//alert(logindata.toSource());
	    //alert("Data Loaded: " + data);
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

//	alert("Register");
//	var test = {test: category_ids};
	
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
//	if(validemail($("div#registerform, div.control-group div.controls input#email").val()))
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
		console.log("TRUE: firstname: "+firstname+", lastname: "+lastname+", email: "+" "+email+", password: "+password+", passwordconf: "+passwordconf+", robotdistorter: "+robotdistorter);
		registerdata = $("#registerform").serialize();
console.log(registerdata);
		
		$.post('/user/registerbit', registerdata, function(data) {
			if(data=='true')
			{
				$("#myModal").modal('hide');
				window.location="/datebook";
			}else{
				$("#RegistrationErrors").html('<font color="#ff3333">'+data+'</font>');
			}
			//alert(logindata.toSource());
		    //alert("Data Loaded: " + data);
		  });
	}else
	{
//		alert("False: firstname: "+firstname+", lastname: "+lastname+", email: "+" "+email+", password: "+password+", passwordconf: "+password2+", robotdistorter: "+robotdistorter);
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
	if (name.search(regexp) == -1)
	    { return false; }
	else
	    { return true; }
}
function validpassword(name)
{
	var regexpnum = /[0-9]/;
	var regexpstr = /[A-Z]/;
	
	if(name==null || name.length==0)
	{		return false;	}
	if (name.search(regexpnum) != -1 && name.search(regexpstr) != -1 && name.length>8)
	    { return true; }
	else
	    { return false; }
}
