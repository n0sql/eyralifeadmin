$(document).ready(function(){
  
  $(document).on("click","#freeSubmitBtn",function(){
    //alert("Hi");
    $.ajax ({
      type: "POST",
      url: '/api/v5/freePaymentApi.php',
      dataType: "json",
      data: $("#paymentFrm").serialize(),
      beforeSend: function() {
        $("#spinner").addClass("show");
      },
      success: function(msg) {
        $("#spinner").removeClass("show");

        if(msg.status == 1) {
          window.location = '/api/v5/payment-status.php?pid='+msg.trasactionId;
        } else {
          swal({
             title: "Error",
             text: "Sorry payment issues.",
             type: "error",
             timer: 3000
         });
        }
      }
    });
  });
  $(document).on("click","#submitBtn",function(){
    //alert("Hi");
    $.ajax ({
      type: "POST",
      url: '/api/v5/sessionGenerate.php',
      dataType: "json",
      data: $("#paymentFrm").serialize(),
      beforeSend: function() {
        $("#spinner").addClass("show");
      },
      success: function(msg) {
        $("#spinner").removeClass("show");
        //alert(msg);

        if(msg.status == 1 && msg.trasactionUrl != "") {
          window.location = msg.trasactionUrl;
        } else {
          swal({
             title: "Error",
             text: msg.msg,
             type: "error",
             timer: 3000
         });
        }
      }
    });
  });
  $("#paymentFrmNet").submit(function(e) {
    e.preventDefault(); 
    var today, someday;
    var exMonth=$("#cc_exp_month").val();
    var exYear=$("#cc_exp_year").val();
    today = new Date();
    someday = new Date();
    someday.setFullYear(exYear, exMonth, 1);

    if (someday < today) {
       swal({
             title: "Error",
             text: "Card expiration date is invalid.",
             type: "warning",
             timer: 5000
       },
       function () {
            //window.location = '/api/v5/';
       });

       return false;
    }else if(!$("#agreedBilling").prop("checked")){
      swal({
                 title: "Error",
                 text: "Please read and agree to our Terms of Service, Billing and Cancelation Policy.",
                 type: "error",
                 timer: 3000
             });
       $("#billingTermsError").show();
    }else{
      $.ajax ({
           type: "POST",
           url: '/api/v5/authorize-net-payment.php',
           data: $("#paymentFrmNet").serialize(),
           dataType: "json",
           beforeSend: function() {
              $("#spinner").addClass("show");
           },
           success: function(msg) {
                $("#spinner").removeClass("show");
                //alert(msg.status);
                if(msg.status == 1) {
                  window.location = '/api/v5/payment-status.php?pid='+msg.trasactionId;
                } else {
                     swal({
                           title: "Error",
                           text: msg.message,
                           type: "warning",
                           timer: 5000
                     },
                     function () {
                          //window.location = '/api/v5/';
                     });
                }
           }
      });
    }
});
  $(document).on("click","#submitCouponBtn",function(){
    var coupon_code = $("#coupon_code").val();
    //alert(coupon_code);
    var totalAmount = $("#itemPrice").val();
    var itm_id = $("#payment_itm_id").val();
    var subDomain = $("#subDomain").val();
    if(coupon_code == "") {
      // swal({
      //      title: "Error",
      //      text: "Please enter coupon code.",
      //      type: "warning",
      //      timer: 5000
      // },
      // function () {
      //       //window.location = '/api/v5/';
      // });
      // $("#coupon_code").focus();
      $(".payAmounts span").html("$"+totalAmount);
      $("#couponId").val("");
      $("#discountPrice").val(0);
    } else {
      $.ajax({
        type: 'POST',
        url: '/api/v5/systemApi.php',
        beforeSend: function(request) {
          $("#spinner").addClass("show");
        },
        data: {
          coupon_code:coupon_code,
          totalAmount:totalAmount,
          itm_id:itm_id,
          sub_domain:subDomain,
        },
        dataType: 'json',
        "bProcessing": true,
        "bServerSide": true,
        success: function (json) {
          $("#spinner").removeClass("show");
          if(json.status==200) {
            swal({
                 title: "Success",
                 text: json.message,
                 type: "success",
                 timer: 5000
            },
            function () {
                  //window.location = '/api/v5/';
            });
            var discountAmt = json.data.pay_amount;
            // if(discountAmt <= 0) {
            //   var discountAmt = 0;
            //   $(".paymentSection").hide();
            //   $(".freePaymentSection").show();
            // }
            $(".payAmounts span").html("<s>$"+json.data.totalAmount+"</s> $"+discountAmt);
            $("#couponId").val(json.data.couponId);
            $("#discountPrice").val(discountAmt);
            //window.location = "";
          } else {
           swal({
               title: "Error",
               text: json.message,
               type: "warning",
               timer: 5000
           },
           function () {
              //window.location = '/api/v5/';
           });
          }
        },
        error:function(){
          $("#spinner").removeClass("show");
          swal({
               title: "Error",
               text: "Something went wrong!",
               type: "warning",
               timer: 5000
          },
          function () {
              //window.location = '/api/v5/';
          });
        }
      });
    }
  });
});