var myInterval;var interval_delay=15000;var activitycountrunning=0;jQuery(document).ready(function(){jQuery(".eventtitle").click(function(){jQuery(this).next(".eventbody").slideToggle('slow')});getactivitycount();myInterval=setInterval(getactivitycount,interval_delay);$(window).focus(function(){clearInterval(myInterval);getactivitycount();myInterval=setInterval(getactivitycount,interval_delay)}).blur(function(){clearInterval(myInterval)});$.ajaxSetup({cache:false})});function getactivitycount(){if(!activitycountrunning){activitycountrunning=1;$.getJSON('/bit/eventnummsgs',function(data){checksessionexpired(data);if(data==null){return}var loadedactivity=$(".message_area").attr('name');$.each(data.activity,function(){if(this.count>0){var thisid=this.id;var thiscount=this.count;if(loadedactivity==this.id){if(this.count>0){$.get("/bit/eventmessages/unread?activity="+thisid+"&count="+thiscount,function(data){checksessionexpired(data);data2=jQuery.parseJSON(data);var template=$("#newpostmessages").html();var temp=_.template(template,{messages:data2});$(temp).prependTo(".message_area").hide().fadeIn()})}}else{$("#id"+this.id).html('<br><font color="#ff0000">( '+thiscount+' messages )</font>')}}});$("#id"+loadedactivity).html("")}).complete(function(){activitycountrunning=0})}}function loadeventdetail(idactivity){var outdata;$.getJSON('/activity/detailsbit?activity='+idactivity,function(data){if(data==null||data.status==false){return}var template=$("#eventdetails").html();var temp=_.template(template,{event:data.activity[0],iduser:data.iduser,members:data.members,invited:data.invited,messages:data.messages});$("#calendar").slideUp();$("#event_main").html(temp).hide().fadeIn();_.each(data.members,function(one){$('#'+one.iduser).tooltip()});_.each(data.invited,function(one){$('#'+one.idinvite+'invite').tooltip()})})}function loadinvitedetail(idinvite){var outdata;$.getJSON('/activity/viewinvite?idinvite='+idinvite,function(data){if(data==null||data.status==false){return}var template=$("#invitedetails").html();var temp=_.template(template,{event:data.activity[0],iduser:data.iduser,members:data.members,invited:data.invited,messages:data.messages});$("#calendar").slideUp();$("#event_main").html(temp).hide().fadeIn();_.each(data.members,function(one){$('#'+one.iduser).tooltip()});_.each(data.invited,function(one){$('#'+one.idinvite+'invite').tooltip()})})}function loadbusinessbookmark(){$.getJSON('/bookmarks/mybusinesses',function(data){if(data==null||data.status==false){return}var template=$("#bookmarks").html();var temp=_.template(template,{bookmarks:data});$("#bookmarkbusiness.tab-pane div.customscroll div.yourBookmarks").hide().html(temp).fadeIn();populatepopover(data)})}function loadplacebookmark(){$.getJSON('/bookmarks/myplaces',function(data){if(data==null||data.status==false){return}var template=$("#bookmarks").html();var temp=_.template(template,{bookmarks:data});$("#bookmarkplace.tab-pane div.customscroll div.yourBookmarks").hide().html(temp).fadeIn();populatepopover(data)})}function loadeventsbookmark(){$.getJSON('/bookmarks/myevents',function(data){if(data==null||data.status==false){return}var template=$("#bookmarks").html();var temp=_.template(template,{bookmarks:data});$("#bookmarkevents.tab-pane div.customscroll div.yourBookmarks").hide().html(temp).fadeIn();populatepopover(data)})}function populatepopover(data){_.each(data,function(one){var title=one.destname;var content='';if(one.location){content=one.location+" <br /> "}if(one.startdate){content=content+one.startdate+' '+one.starttime+'-'+one.endtime+" <br />  "}if(one.phone){content=content+one.phone+" <br />  "}content=content+one.county+", "+one.state+"  <br /> ";if(one.description){content=content+one.description+" "}$("#"+one.id+"pop").popover({title:title,content:content,delay:700,html:true,trigger:'hover',placement:'right'})})}function postactivitymessage(idactivity){var postdata=$("#formpostmessage").serialize();if(postdata.length>8){$.ajax({type:"POST",url:"/activity/postmessage?activity="+idactivity,data:postdata,success:function(data){if(data=="true"){getactivitycount();$("#new_message").val("")}},error:function(errMsg,ajaxOptions,thrownError){}})}}function deletebookmarks(bookmarktype,id){if(bookmarktype=='business'){url="/dining/unbookmark?idbiz="+id}else if(bookmarktype=='places'){url="/places/unbookmark?idplace="+id}else if(bookmarktype=='events'){url="/events/unbookmark?idevent="+id}else{return}$.ajax({type:"GET",url:url,success:function(data){if(data=='true'){$("#"+id+"pop").popover("hide");$("#"+id+"pop").remove()}},error:function(errMsg){}})}function opencreateevent(data,showevent){var template=$("#createeventtemplate").html();var temp=_.template(template,{activity:data});$("#modalholder").html(temp);if(showevent){$('#CreateEvent').modal('show')}$("#done_button").click(function(){$("#emailModal").hide()});$("#done_button2").click(function(){$("#emailModal").hide()});$("#add_button").click(function(){$("#emailModal").toggle()});$("#datepicker3").datepicker({dateFormat:"yy-mm-dd",minDate:0});$('#timepicker3').timepicker({ampm:true});$('#timepicker2').timepicker({ampm:true});$(".chzn-select").chosen({search_contains:true})}function createevent(){if($("#summary").val()==''||$("#datepicker3").val()==''){$("#CreateEventErrors").html('<font color="#ff3333">Please make sure you have correctly filled in the Event Title and Event Date.</font>');return}var summary_id,location_id,startdate_id,starttime_id,endtime_id,city_id,state_id,description_id,friendadd_id;if($("#summary").val()){summary_id=$("#summary").val()}if($("#location").val()){location_id=$("#location").val()}if($("#datepicker3").val()){startdate_id=$("#datepicker3").val()}if($("#timepicker3").val()){starttime_id=$("#timepicker3").val()}if($("#timepicker2").val()){endtime_id=$("#timepicker2").val()}if($("#city").val()){city_id=$("#city").val()}if($("#state").val()){state_id=$("#state").val()}if($("#description").val()){description_id=$("#description").val()}if($("#friendadd").val()){friendadd_id=$("#friendadd").val()}if($(".idactivity").val()){idactivity=$(".idactivity").val()}else{idactivity=0}createdata={summary:summary_id,location:location_id,startdate:startdate_id,starttime:starttime_id,endtime:endtime_id,city:city_id,state:state_id,description:description_id,friendadd:friendadd_id,idactivity:idactivity};$.post('/activity/createactivitybit',createdata,function(data){data2=jQuery.parseJSON(data);if(data2.status==true){$('#CreateEvent').modal('hide');window.location="/datebook?activity="+data2.id}else if(data2.status=='facebook'){$('#CreateEvent').modal('hide');window.location=data2.url}else{$("#CreateEventErrors").html('false: <font color="#ff3333">'+data+'</font>')}})}function addemail(){var emailfirstname=emailaddress='';emailfullname=$("#emailfullname").val();emailaddress=$("#emailaddress").val();var flag_emailfullname=validname(emailfullname);var flag_emailaddress=validemail(emailaddress);if(flag_emailfullname&&flag_emailaddress){newemail={name:emailfullname,email:emailaddress};$.post('/profile/addfriendemail',newemail,function(data){if(data=="true"){$("#emailfullname").val('');$("#emailaddress").val('');var friend='<div class=" alert Friends"><button type="button" class="close" data-dismiss="alert">&times;</button><p>'+emailfullname+'<br>'+emailaddress+'</p></div>';var friendoption='<option value="'+emailfullname+"|"+emailaddress+'"> '+emailfullname+'</option>';$(friend).prependTo(".friends_module").hide().slideDown(1000);$("#friendadd").append(friendoption);$('#friendadd').trigger("liszt:updated");$("#emailerrormsg").html("")}})}else{$("#emailerrormsg").html("Please ensure fields are entered correctly.")}}function removeemail(email){removeemaildata={email:email};$.post('/profile/removefriendemail',removeemaildata,function(data){$('#friendadd > option[value="'+email+'"]').remove();$('#friendadd').trigger("liszt:updated")})}function validname(name){var regexp=/^[a-zA-Z0-9\-\.\,\_\s]+$/;if(name==null||name.length==0){return false}if(name.search(regexp)==-1){return false}else{return true}}function validemail(name){var regexp=/^[a-zA-Z0-9\.\_]+@[a-zA-Z0-9\.\_]+\.[a-zA-Z]{2,4}$/;if(name==null||name.length==0){return false}if(name.search(regexp)==-1){return false}else{return true}}function checksessionexpired(sessdata){if(sessdata!=null&&sessdata.session==='SESSION_EXPIRED'){window.location='/'}}
