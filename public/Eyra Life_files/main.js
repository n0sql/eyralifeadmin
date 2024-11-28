(function($) {
     "use strict";
 
     // Spinner
     var spinner = function() {
         setTimeout(function() {
             if ($('#spinner').length > 0) {
                 $('#spinner').removeClass('show');
             }
         }, 1);
     };
     spinner();
 
 
     // Initiate the wowjs
     new WOW().init();
 
 
     // Sticky Navbar
     $(window).scroll(function() {
         if ($(this).scrollTop() > 300) {
             $('.sticky-top').addClass('shadow-sm').css('top', '0px');
         } else {
             $('.sticky-top').removeClass('shadow-sm').css('top', '-150px');
         }
     });
 
 
     // Back to top button
     $(window).scroll(function() {
         if ($(this).scrollTop() > 300) {
             $('.back-to-top').fadeIn('slow');
         } else {
             $('.back-to-top').fadeOut('slow');
         }
     });
     $('.back-to-top').click(function() {
         $('html, body').animate({
             scrollTop: 0
         }, 1500, 'easeInOutExpo');
         return false;
     });
     $('#phone_number').usPhoneFormat({
         format: '(xxx) xxx-xxxx'
     });
    
    const bannedWords = ["yes","no","ya","na","yeah","nah","ye","idk", "i don't know", "i do not know", "i dont know", "not sure", "remember", "forgot"];
    $("#medication_txt").change(function(){
        const medication_txt = $("#medication_txt").val().trim().toLowerCase();
        var is_banned = false;//bannedWords.findIndex(bl => medication_txt.indexOf(bl) > -1) > -1

        for (var i=0; i < bannedWords.length; i++){
            var pattern = new RegExp("(<=\\s|\\b)"+ bannedWords[i] +"(?=[]\\b|\\s|$)");
            if(pattern.test(medication_txt))
                is_banned = true;
        }

        if(is_banned){
            $("#medication_txt").focus();
            swal({
                title: "Error",
                text: "Please answer with specific medication names.",
                type: "error",
                timer: 3000
            });
        }
    });
     /**** JQuery *******/
     jQuery('body').on('click', '.next-tab', function() {
        const phoneNumber = document.getElementById("phone_number").value;
        const phoneNumberRegex = /^(\+[1-9]{1}[0-9]{3,14})?([0-9]{9,14})$/;
        var isPhoneNoValid = false;
        if(phoneNumber)
            isPhoneNoValid = libphonenumber.parsePhoneNumber(phoneNumber, 'US').isValid()
        var getIds = $(this).attr('data-id');

        const medication_txt = $("#medication_txt").val().trim().toLowerCase();
        var is_banned = false;//bannedWords.findIndex(bl => medication_txt.indexOf(bl) > -1) > -1

        for (var i=0; i < bannedWords.length; i++){
            var pattern = new RegExp("(<=\\s|\\b)"+ bannedWords[i] +"(?=[]\\b|\\s|$)");
            if(pattern.test(medication_txt))
                is_banned = true;
        }

        if(is_banned){
            $("#medication_txt").focus();
            swal({
                title: "Error",
                text: "Please answer with specific medication names.",
                type: "error",
                timer: 3000
            });
        }
        
         if ($("#step1").hasClass("active") == true && getIds == 1) {
             //$('.process-bar span').css('width', '20%');
             $('.process-bar span').animate({
                 width: "30%"
             }, 'slow');
         }
         if ($("#step2").hasClass("active") == true && getIds == 2) {
             //$('.process-bar span').css('width', '35%');
             $('.process-bar span').animate({
                 width: "40%"
             }, 'slow');
             //alert(getIds);
         }
         if ($("#step3").hasClass("active") == true && getIds == 3) {
             //$('.process-bar span').css('width', '50%');
             $('.process-bar span').animate({
                 width: "40%"
             }, 'slow');
         }
         if ($("#step4").hasClass("active") == true && getIds == 4) {
             //$('.process-bar span').css('width', '60%');
             $('.process-bar span').animate({
                 width: "60%"
             }, 'slow');
         }
         if ($("#step5").hasClass("active") == true && getIds == 5) {
             //$('.process-bar span').css('width', '70%');
             $('.process-bar span').animate({
                 width: "70%"
             }, 'slow');
         }
         if ($("#step6").hasClass("active") == true && getIds == 6) {
             //$('.process-bar span').css('width', '80%');
             $('.process-bar span').animate({
                 width: "80%"
             }, 'slow');
         }
         if ($("#step7").hasClass("active") == true && getIds == 7) {
             //$('.process-bar span').css('width', '80%');
             $('.process-bar span').animate({
                 width: "90%"
             }, 'slow');
         }
 
         if (getIds == 2 && $("#weight").val() != "" && $("#height").val() != "" && $("#birthdate").val() != "") {
             setTimeout(function() {
                 $("#agreed").focus();
                 //alert(getIds);
             }, 950);
         }

         if (getIds == 1 && $("#fname").val() == "") {
             $("#fname").focus();
             swal({
                 title: "Error",
                 text: "Please enter your first name.",
                 type: "error",
                 timer: 3000
             });
         } else if (getIds == 1 && $("#lname").val() == "") {
             $("#lname").focus();
             swal({
                 title: "Error",
                 text: "Please enter your last name.",
                 type: "error",
                 timer: 3000
             });
         // } else if (getIds == 1 && $("#drivers_license").val() == "") {
         //     $("#drivers_license").focus();
         //     swal({
         //         title: "Error",
         //         text: "Please enter your driver's license.",
         //         type: "error",
         //         timer: 3000
         //     });
         } else if (getIds == 1 && $("#email").val() == "") {
             $("#email").focus();
             swal({
                 title: "Error",
                 text: "Please enter your email address.",
                 type: "error",
                 timer: 3000
             });
         } else if (getIds == 1 && !validateEmail($("#email").val())) {
            $("#email").focus();
            swal({
                title: "Error",
                text: "Please enter a valid email address.",
                type: "error",
                timer: 3000
            });
        } else if (getIds == 1 && $("#email").val() != "" && !isNotDotCon()) {
             $("#email").focus();
             swal({
                 title: "Error",
                 text: "Invalid email, .con was found.",
                 type: "error",
                 timer: 3000
             });
         } else if (getIds == 1 && $("#password").length > 0 && $("#password").val() == "") {
             $("#password").focus();
             swal({
                 title: "Error",
                 text: "Please enter your password.",
                 type: "error",
                 timer: 3000
             });
         } else if (getIds == 1 && $("#phone_number").val() == "") {
             $("#phone_number").focus();
             swal({
                 title: "Error",
                 text: "Please enter your phone number.",
                 type: "error",
                 timer: 3000
             });
         }else if (getIds == 1 && $("#phone_number").val() != "" && !isPhoneNoValid) {
             $("#phone_number").focus();
             swal({
                 title: "Error",
                 text: "Please enter a valid US phone number.",
                 type: "error",
                 timer: 3000
             });
         } else if (getIds == 1 && $("#address1").val() == "") {
             $("#address1").focus();
             swal({
                 title: "Error",
                 text: "Please enter your address.",
                 type: "error",
                 timer: 3000
             });
         } else if (getIds == 1 && $("#city").val() == "") {
             $("#city").focus();
             swal({
                 title: "Error",
                 text: "Please enter your city.",
                 type: "error",
                 timer: 3000
             });
         } else if (getIds == 1 && $("#state").val() == "") {
             $("#state").focus();
             swal({
                 title: "Error",
                 text: "Please enter your state.",
                 type: "error",
                 timer: 3000
             });
         } else if (getIds == 1 && $("#zipcode").val() == "") {
             $("#zipcode").focus();
             swal({
                 title: "Error",
                 text: "Please enter your zipcode.",
                 type: "error",
                 timer: 3000
             });
         } else if (getIds == 2 && $("#birthdate").val() == "") {
             $("#birthdate").focus();
             swal({
                 title: "Error",
                 text: "Please enter your birth date.",
                 type: "error",
                 timer: 3000
             });
         } else if (getIds == 2 && $("#height").val() == "") {
             $("#height").focus();
             swal({
                 title: "Error",
                 text: "Please enter your height.",
                 type: "error",
                 timer: 3000
             });
         } else if (getIds == 2 && $("#weight").val() == "") {
             $("#weight").focus();
             swal({
                 title: "Error",
                 text: "Please enter your weight.",
                 type: "error",
                 timer: 3000
             });
        }else if (getIds == 2 && $('input[name="gender"]:checked').length == 0) {
             $("input[name='gender']").focus();
             swal({
                 title: "Error",
                 text: "Please select Gender (at birth).",
                 type: "error",
                 timer: 3000
             });
         }else if (getIds == 3 && $('input[name="medication"]:checked').length == 0) {
             $("input[name='medication']").focus();
             swal({
                 title: "Error",
                 text: 'Please select answer for "Are you currently taking any medication?".',
                 type: "error",
                 timer: 3000
             });
         }else if (getIds == 3 && $('input[name="medication"]:checked').val() == "Yes" && $("#medication_txt").val() == "") {
             $("#medication_txt").focus();
             swal({
                 title: "Error",
                 text: "Please list all medications that you are currently taking.",
                 type: "error",
                 timer: 3000
             });
         }else if (getIds == 3 && $('input[name="medical_conditions_past_present"]:checked').length == 0) {
             $("input[name='medical_conditions_past_present']").focus();
             swal({
                 title: "Error",
                 text: 'Please select answer for "Do you have any medical conditions, past or present?".',
                 type: "error",
                 timer: 3000
             });
         } else if (getIds == 3 && $('input[name="medical_conditions_past_present"]:checked').val() == "Yes" && $("#past_medical_conditions").val() == "") {
             $("#past_medical_conditions").focus();
             swal({
                 title: "Error",
                 text: "Please list all your medical conditions, past and present.",
                 type: "error",
                 timer: 3000
             });
         }else if (getIds == 3 && $('input[name="taking_semaglutide_currently"]:checked').length == 0) {
             $("input[name='taking_semaglutide_currently']").focus();
             swal({
                 title: "Error",
                 text: 'Please select answer for "Are you taking semaglutide currently?".',
                 type: "error",
                 timer: 3000
             });
         }else if (getIds == 3 && $('input[name="switching_sublingual_tablets"]:checked').length == 0) {
             $("input[name='switching_sublingual_tablets']").focus();
             swal({
                 title: "Error",
                 // text: 'Please select answer for "Are you interested in switching to sublingual tablets?".', 
                 text: 'Please select answer for "What is your current dose?".', //TOO LAZY TO CHANGE FIELD NAME
                 type: "error",
                 timer: 3000
             });
         }
         else if (getIds == 3 && $('input[name="diet_medication"]:checked').length == 0) {
            $('input[name="diet_medication"]').focus();
            swal({
                title: "Error",
                text: 'Please answer "Are you currently taking any diet medication?".',
                type: "error",
                timer: 3000
            });

        }
        else if (getIds == 3 && $('input[name="diet_medication"]:checked').val() == "Yes" && $("#diet_medication_yes_response").val() == "") {
            $("#diet_medication_yes_response").focus();
            swal({
                title: "Error",
                text: "Please add a short response.",
                type: "error",
                timer: 3000
            });
        }
         else if (getIds == 3 && $('input[name="medication_allergies"]:checked').length == 0) {
             $("input[name='medication_allergies']").focus();
             swal({
                 title: "Error",
                 text: 'Please select answer for "Do you have any medication allergies?".',
                 type: "error",
                 timer: 3000
             });
         } else if (getIds == 3 && $('input[name="medication_allergies"]:checked').val() == "Yes" && $("#list_medication_allergies").val() == "") {
             $("#list_medication_allergies").focus();
             swal({
                 title: "Error",
                 text: "Please list all your medication allergies.",
                 type: "error",
                 timer: 3000
             });
         } else if (getIds == 3 && $('input[name="consume_alcohol"]:checked').length == 0) {
             $("input[name='consume_alcohol']").focus();
             swal({
                 title: "Error",
                 text: 'Please select answer for "How often do you consume alcohol?".',
                 type: "error",
                 timer: 3000
             });
         }
         
           else if (getIds == 3 && $('input[name="medication"]:checked').val() == "Yes" && $("#medication_txt").val() != "" && is_banned) {
            $("#medication_txt").focus();
            swal({
                title: "Error",
                text: "Please answer with specific medication names.",
                type: "error",
                timer: 3000
            });
             
         }else if (getIds == 3 && $("#reason").val() == "") {
             $("#reason").focus();
             swal({
                 title: "Error",
                 text: "Please type your primary reasons here.",
                 type: "error",
                 timer: 3000
             });
         } else if (getIds == 4 && $('input[name="test[]"]:checked').length == 0) {
             $('input[name="test[]"]').focus();
             swal({
                 title: "Error",
                 text: 'Please answer "Do you have or have you ever had any of the following conditions? (Check all that apply)".',
                 type: "error",
                 timer: 3000
             });
 
         } else if (getIds == 4 && $('#step4 .chk-condition:checked').length > 0 && $("#medications_taken_to_treat").val() == "") {
             $("#medications_taken_to_treat").focus();
             swal({
                 title: "Error",
                 text: "Please list any medications taken.",
                 type: "error",
                 timer: 3000
             });
 
         } 
          else if (getIds == 4 && $('input[name="medullary_thyroid_cancer"]:checked').length == 0) {
             $('input[name="medullary_thyroid_cancer"]').focus();
             swal({
                 title: "Error",
                 text: 'Please answer "Do you have a history of any of the following? Medullary Thyroid Cancer".',
                 type: "error",
                 timer: 3000
             });
 
         }
          else if (getIds == 4 && $('input[name="multiple_endocrine_neoplasia"]:checked').length == 0) {
             $('input[name="multiple_endocrine_neoplasia"]').focus();
             swal({
                 title: "Error",
                 text: 'Please answer "Do you have a history of any of the following? Multiple Endocrine Neoplasia".',
                 type: "error",
                 timer: 3000
             });
 
         }
          else if (getIds == 4 && $('input[name="pancreatic_cancer"]:checked').length == 0) {
             $('input[name="pancreatic_cancer"]').focus();
             swal({
                 title: "Error",
                 text: 'Please answer "Do you have a history of any of the following? Pancreatic Cancer".',
                 type: "error",
                 timer: 3000
             });
 
         }
          else if (getIds == 4 && $('input[name="type_1_diabetes"]:checked').length == 0) {
             $('input[name="type_1_diabetes"]').focus();
             swal({
                 title: "Error",
                 text: 'Please answer "Do you have a history of any of the following? Type I Diabetes".',
                 type: "error",
                 timer: 3000
             });
 
         }
          else if (getIds == 4 && $('input[name="other_health_prob"]:checked').length == 0) {
             $('input[name="other_health_prob"]').focus();
             swal({
                 title: "Error",
                 text: 'Please answer "Do you have any other health problems or medical conditions not listed above?".',
                 type: "error",
                 timer: 3000
             });
         }
         else if (getIds == 4 && $('input[name="other_health_prob"]:checked').val() == "Yes" && $("#other_health_prob_yes_explain").val() == "") {
             $("#other_health_prob_yes_explain").focus();
             swal({
                 title: "Error",
                 text: "Please enter explanation.",
                 type: "error",
                 timer: 3000
             });
         }
        //  else if (getIds == 4 && $('input[name="had_procedures_last_90days"]:checked').length == 0) {
        //      $('input[name="had_procedures_last_90days"]').focus();
        //      swal({
        //          title: "Error",
        //          text: 'Please answer "Have you had any aesthetic procedures in the last 90 days?".',
        //          type: "error",
        //          timer: 3000
        //      });
 
        //  }
          else if (getIds == 4 && $('input[name="pregnant"]:checked').length == 0) {
             $('input[name="pregnant"]').focus();
             swal({
                 title: "Error",
                 text: 'Please answer "Are you pregnant or trying to get pregnant?".',
                 type: "error",
                 timer: 3000
             });
 
         }
          else if (getIds == 4 && $('.disease-history-yes:checked').length > 0) {
            window.location.href = "/api/v5/medication-denied.php?secreteKey="+$("input[name=secreteKey]").val()+"&subDomain="+$("input[name=subDomain]").val();
         }
        // else if (getIds == 5 && $('input[name="extenuating_circumstances"]:checked').length == 0) {
        //      $('input[name="extenuating_circumstances"]').focus();
        //      swal({
        //          title: "Error",
        //          text: 'Please answer "Are there extenuating circumstances that contributed to your weight problem (i.e. childbirth, thyroid removal, depression, etc)?".',
        //          type: "error",
        //          timer: 3000
        //      });
 
        // }
        //   else if (getIds == 5 && $('input[name="weight_reduction_program"]:checked').length == 0) {
        //      $('input[name="weight_reduction_program"]').focus();
        //      swal({
        //          title: "Error",
        //          text: 'Please answer "Have you made a good faith effort at weight reduction on a bonafide program before consulting this program?".',
        //          type: "error",
        //          timer: 3000
        //      });
 
        //  }
        //   else if (getIds == 5 && $('input[name="weight_loss_program_last12months"]:checked').length == 0) {
        //      $('input[name="weight_loss_program_last12months"]').focus();
        //      swal({
        //          title: "Error",
        //          text: 'Please answer "Are you currently or have you been on a weight loss program in the last 12 months?".',
        //          type: "error",
        //          timer: 3000
        //      });
 
        //  }
        //   else if (getIds == 5 && $('input[name="weight_control"]:checked').length == 0) {
        //      $('input[name="weight_control"]').focus();
        //      swal({
        //          title: "Error",
        //          text: 'Please answer "Have you tried other methods of weight control?".',
        //          type: "error",
        //          timer: 3000
        //      });
 
        //  }
        //   else if (getIds == 5 && $('input[name="exercise_weight_loss_efforts"]:checked').length == 0) {
        //      $('input[name="exercise_weight_loss_efforts"]').focus();
        //      swal({
        //          title: "Error",
        //          text: 'Please answer "Have you previously incorporated regular exercise as a part of your weight loss efforts?".',
        //          type: "error",
        //          timer: 3000
        //      });
 
        //  }
        //   else if (getIds == 5 && $('input[name="diet_medication"]:checked').length == 0) {
        //      $('input[name="diet_medication"]').focus();
        //      swal({
        //          title: "Error",
        //          text: 'Please answer "Are you currently taking any diet medication?".',
        //          type: "error",
        //          timer: 3000
        //      });
 
        //  }
        //   else if (getIds == 5 && $('input[name="hospitalized_for_depression"]:checked').length == 0) {
        //      $('input[name="hospitalized_for_depression"]').focus();
        //      swal({
        //          title: "Error",
        //          text: 'Please answer "Have you ever been treated or hospitalized for depression?".',
        //          type: "error",
        //          timer: 3000
        //      });
 
        //  }
        //   else if (getIds == 5 && $('input[name="treated_for_alcoholism_or_drug_abuse"]:checked').length == 0) {
        //      $('input[name="treated_for_alcoholism_or_drug_abuse"]').focus();
        //      swal({
        //          title: "Error",
        //          text: 'Please answer "Have you ever been hospitalized or treated for alcoholism or drug abuse?".',
        //          type: "error",
        //          timer: 3000
        //      });
        //  }
         else {
             var next = jQuery('.nav-tabs > .active').next('li');
             if (next.length) {
                 next.find('a').trigger('click');
             } else {
                 jQuery('#myTabs a:first').tab('show');
             }
             $('html, body').animate({ scrollTop: 0 }, 100);
         }
     });
 
     jQuery('body').on('click', '.previous-tab', function() {
         var getIds = $(this).attr('data-id');
         if (getIds == 2) {
             //$('.process-bar span').css('width', '10%');
             $('.process-bar span').animate({
                 width: "20%"
             }, 'slow');
         }
         if (getIds == 3) {
             //$('.process-bar span').css('width', '20%');
             $('.process-bar span').animate({
                 width: "30%"
             }, 'slow');
         }
         if (getIds == 4) {
             //$('.process-bar span').css('width', '35%');
             $('.process-bar span').animate({
                 width: "40%"
             }, 'slow');
         }
         if (getIds == 5) {
             //$('.process-bar span').css('width', '50%');
             $('.process-bar span').animate({
                 width: "50%"
             }, 'slow');
         }
         if (getIds == 6) {
             //$('.process-bar span').css('width', '60%');
             $('.process-bar span').animate({
                 width: "70%"
             }, 'slow');
         }
         if (getIds == 7) {
             //$('.process-bar span').css('width', '70%');
             $('.process-bar span').animate({
                 width: "80%"
             }, 'slow');
         }
         if (getIds == 8) {
             //$('.process-bar span').css('width', '80%');
             $('.process-bar span').animate({
                 width: "90%"
             }, 'slow');
         }
 
         var prev = jQuery('.nav-tabs > .active').prev('li')
         if (prev.length) {
             prev.find('a').trigger('click');
         } else {
             jQuery('#myTabs a:last').tab('show');
         }
         $('html, body').animate({ scrollTop: 0 }, 100);
     });
 
     $(document).on('change', '.ecomProCheckBox', function(e) {
         var array = $.map($('input[name="ecomPro[]"]:checked'), function(c) {
             return c.value;
         })
         if(array.length){
            $.ajax({
             type: 'POST',
             url: "/api/v5/appExtraAjax.php",
             dataType: "json",
             data: {
                 action: "getSelectedPro",
                 selectedProId: array
             },
             beforeSend: function() {
                 //addLoading();
             },
             success: function(result) {
                 $(".orderItems").html(result.prodDetails);
                 $(".totalItm").html(result.totalItm);
                 $(".topPriceBar .price span").html('$' + result.totalPrice);
                 if (result.totalItm > 0) {
                     $('.priceBottomSection').show();
                 } else {
                     $('.priceBottomSection').hide();
                 }
                 $(".totalPrices .price").html("<b>$" + result.totalPrice + "</b>");
                 $(".orderItems").html(result.prodDetails);
                 $(".orderItems").html(result.prodDetails);
                 $(".orderItems").html(result.prodDetails);
                 $(".orderItems").html(result.prodDetails);
                 //clearLoading();
                 //console.log(result);
                 //alert(result.status);

                 $("#itemPrice").val(result.totalPrice);
             },
         });   
         }
         
     });
     $("input[name='taking_semaglutide_currently']").change(function(){
        const thisVal = $("input[name='taking_semaglutide_currently']:checked").val();
        if(thisVal == "Yes"){
            $(".switching_sublingual_tablets").show();
        }else{
            $(".switching_sublingual_tablets").hide();
            $("#switching_sublingual_tablets_yes").prop("checked",false);
            $("#switching_sublingual_tablets_no").prop("checked",true);
        }

     });
     $("input[name='medical_conditions_past_present']").change(function(){
        const thisVal = $("input[name='medical_conditions_past_present']:checked").val();
        if(thisVal == "Yes"){
            $("#div_medical_conditions_past_present").show();
            $("#past_medical_conditions").prop("required",true);
        }else{
            $("#div_medical_conditions_past_present").hide();
            $("input[name='medical_conditions_past_present']").prop("checked",false);
            $("#medical_conditions_past_present_no").prop("checked",true);
            $("#past_medical_conditions").prop("required",false).val("");
        }
     });
     $("input[name='medication_allergies']").change(function(){
        const thisVal = $("input[name='medication_allergies']:checked").val();
        if(thisVal == "Yes"){
            $("#div_list_medication_allergies").show();
            $("#list_medication_allergies").prop("required",true);
        }else if(thisVal == "No"){
            $("#div_list_medication_allergies").hide();
            $("input[name='medication_allergies']").prop("checked",false);
            $("#medication_allergies1").prop("checked",true);
            $("#list_medication_allergies").prop("required",false).val("");
        }else{
            $("#div_list_medication_allergies").hide();
            $("#list_medication_allergies").prop("required",false).val("");
        }

     });
     $("input[name='diet_medication']").change(function(){
        const thisVal = $("input[name='diet_medication']:checked").val();
        if(thisVal == "Yes"){
            $("#div_diet_medication").show();
            $("#diet_medication_yes_response").prop("required",true);
        }else{
            $("#div_diet_medication").hide();
            $("#diet_medication_yes_response").prop("required",false).val("");
        }
     });
     $("#phone_number").blur(function(){
            if($(this).val().trim()){
                $(this).val(formatPhoneNumber($(this).val().trim()));
            }
     });
  

    $("#feetHeight").change(function(){
        const feet = $(this).val().trim();
        if(feet!=""){
            if(parseInt(feet) < 1 ){
                $(this).val("1");
            }
            setHeight();
        }else{
            clearHeight();
        }
    });
    $("#inchesHeight").change(function(){
        const inches = $(this).val() || "0";
        if(parseInt(inches) < 0){
            $(this).val(0);
        } else if(parseInt(inches) > 12){
            $(this).val(12);
        }
        setHeight();    
    });
    function setHeight(){
        const feet = $("#feetHeight").val().trim();
        const inches = $("#inchesHeight").val().trim() || "0";
        const height = feet + "' "+ inches + '"';
        $("#height").val(height);
    }
    function clearHeight(){
        $("#height").val("");
    }
    function formatPhoneNumber(phoneNumberString) {
        var cleaned = ('' + phoneNumberString).replace(/\D/g, '');
        var match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
        if (match) {
            return '(' + match[1] + ') ' + match[2] + '-' + match[3];
        }
        return null;
    }
    function validateEmail(input) {
        var validRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (input.match(validRegex)) {
            return true;

        } else {
            return false;
        }
    }
    function isNotDotCon() {
        var isValid = true;
        var email = $("#email").val();

        // Check if the email ends with ".con" regardless of case
        var regex = /\.con$/i;
        if (regex.test(email)) {
            isValid = false;
        }

        return isValid;
    }

    
 })(jQuery);