	$(document).ready(function(){
		//$('.topPriceBar .price').html('<i class="fa fa-shopping-cart"></i> <b>$<?php echo number_format(array_sum($totalPrice), 2);?></b>');
		var sig = $('#sig').signature();
		var signature = $('#sig').signature({syncField: '#sigpad', syncFormat: 'PNG'});
		$('#disable').click(function() {
			var disable = $(this).text() === 'Disable';
			$(this).text(disable ? 'Enable' : 'Disable');
			sig.signature(disable ? 'disable' : 'enable');
		});
		$('#clear').click(function() {
			sig.signature('clear');
		});
		$('#json').click(function() {
			alert(sig.signature('toJSON'));
		});
		$('#svg').click(function() {
			alert(sig.signature('toSVG'));
		});
		const max_chars = 4;
		$('#cvc_code').keydown( function(e){
		    if ($(this).val().length >= max_chars) { 
		        $(this).val($(this).val().substr(0, max_chars));
		    }
		});
		    
		$('#cvc_code').keyup( function(e){
		    if ($(this).val().length >= max_chars) { 
		        $(this).val($(this).val().substr(0, max_chars));
		    }
		});
		$(document).on('click', '.popUpDetails', function () {
			$('.modal-backdrop.popUpDiv').show();
			var title = $(this).attr("data-title");
			var price = $(this).attr("data-id");
			var sku = $(this).attr("data-alt");
			var content = $(this).attr("data-content");
			$('.modal-backdrop.popUpDiv .proTitle').html(atob(title));
			$('.modal-backdrop.popUpDiv .proSku b').html(sku);
			$('.modal-backdrop.popUpDiv .proPrice b').html("$"+price);
			$('.modal-backdrop.popUpDiv .proCotnents').html(atob(content));
		});
		$(document).on('click', '.popUpDiv .modal-close', function () {
			//alert("Close");
			$('.modal-backdrop.popUpDiv').hide();
			$('.modal-backdrop.popUpDiv .proTitle').html("");
			$('.modal-backdrop.popUpDiv .proSku b').html("");
			$('.modal-backdrop.popUpDiv .proPrice b').html("");
			$('.modal-backdrop.popUpDiv .proCotnents').html("");
		});
		$(document).on('change', '.ecomProCheckBox', function () {
			var getId = $(this).attr('data-id');
			//alert($(this).is(":checked"));
			if($(this).is(":checked") === true) {
				$(".prodItemSection"+getId).css("border","green solid 3px");
			} else {
				$(".prodItemSection"+getId).css("border","#fff solid 3px");
			}
		});
      	$('.slickSlider').slick({
          infinite: true,
		  slidesToShow: 3,
		  centerMode: false,
		  slidesToScroll: 1,
		  arrows: true,
		  autoplay: true,
		  autoplaySpeed: 2000,
		  responsive: [
		    {
		      breakpoint: 1200,
		      settings: {
		        slidesToShow: 3,
		        slidesToScroll: 1,
		      },
		    },
		    {
		      breakpoint: 1008,
		      settings: {
		        slidesToShow: 2,
		        slidesToScroll: 2,
		      },
		    },
		    {
		      breakpoint: 800,
		      settings: {
		        slidesToShow: 1,
		        slidesToScroll: 1,
		      },
		    },
		  ]
      	});
    });
	(function () {
	  window.requestAnimFrame = function (callback) {
		return window.requestAnimationFrame ||
		window.webkitRequestAnimationFrame ||
		window.mozRequestAnimationFrame ||
		window.oRequestAnimationFrame ||
		window.msRequestAnimaitonFrame ||
		function (callback) {
		  window.setTimeout(callback, 1000 / 60);
		};
	  }();

	  var canvas = document.getElementById("sig-canvas");
	  var ctx = canvas.getContext("2d");
	  ctx.strokeStyle = "#222222";
	  ctx.lineWidth = 4;

	  var drawing = false;
	  var mousePos = {
		x: 0,
		y: 0 };

	  var lastPos = mousePos;

	  canvas.addEventListener("mousedown", function (e) {
		drawing = true;
		document.getElementById("signComplete").value = 1;
		lastPos = getMousePos(canvas, e);
	  }, false);

	  canvas.addEventListener("mouseup", function (e) {
		drawing = false;
		//document.getElementById("signComplete").value = 1;
	  }, false);

	  canvas.addEventListener("mousemove", function (e) {
		mousePos = getMousePos(canvas, e);
		//document.getElementById("signComplete").value = 1;
	  }, false);

	  // Add touch event support for mobile
	  canvas.addEventListener("touchstart", function (e) {
	  	document.getElementById("signComplete").value = 1;
	  }, false);

	  canvas.addEventListener("touchmove", function (e) {
		var touch = e.touches[0];
		var me = new MouseEvent("mousemove", {
		  clientX: touch.clientX,
		  clientY: touch.clientY });

		document.getElementById("signComplete").value = 1;

		canvas.dispatchEvent(me);
	  }, false);

	  canvas.addEventListener("touchstart", function (e) {
		mousePos = getTouchPos(canvas, e);
		var touch = e.touches[0];
		var me = new MouseEvent("mousedown", {
		  clientX: touch.clientX,
		  clientY: touch.clientY });

		document.getElementById("signComplete").value = 1;

		canvas.dispatchEvent(me);
	  }, false);

	  canvas.addEventListener("touchend", function (e) {
		var me = new MouseEvent("mouseup", {});

		document.getElementById("signComplete").value = 1;
		canvas.dispatchEvent(me);
	  }, false);

	  function getMousePos(canvasDom, mouseEvent) {
		var rect = canvasDom.getBoundingClientRect();
		return {
		  x: mouseEvent.clientX - rect.left,
		  y: mouseEvent.clientY - rect.top };

	  }

	  function getTouchPos(canvasDom, touchEvent) {
		var rect = canvasDom.getBoundingClientRect();
		return {
		  x: touchEvent.touches[0].clientX - rect.left,
		  y: touchEvent.touches[0].clientY - rect.top };

	  }

	  function renderCanvas() {
		if (drawing) {
		  ctx.moveTo(lastPos.x, lastPos.y);
		  ctx.lineTo(mousePos.x, mousePos.y);
		  ctx.stroke();
		  lastPos = mousePos;
		}
	  }

	  // Prevent scrolling when touching the canvas
	  document.body.addEventListener("touchstart", function (e) {
		if (e.target == canvas) {
			document.getElementById("signComplete").value = 1;
		  e.preventDefault();
		}
	  }, false);
	  document.body.addEventListener("touchend", function (e) {
		if (e.target == canvas) {
			document.getElementById("signComplete").value = 1;
		  e.preventDefault();
		}
	  }, false);
	  document.body.addEventListener("touchmove", function (e) {
		if (e.target == canvas) {
			document.getElementById("signComplete").value = 1;
		  e.preventDefault();
		}
	  }, false);

	  (function drawLoop() {
		requestAnimFrame(drawLoop);
		renderCanvas();
	  })();

	  function clearCanvas() {
		canvas.width = canvas.width;
		document.getElementById("signComplete").value = 0;
	  }

	  // Set up the UI
	  var sigText = document.getElementById("sig-dataUrl");
	  var sigImage = document.getElementById("sig-image");
	  var clearBtn = document.getElementById("sig-clearBtn");
	  var submitBtn = document.getElementById("sig-submitBtn");
	  clearBtn.addEventListener("click", function (e) {
		clearCanvas();
		sigText.innerHTML = "Data URL for your signature will go here!";
		sigImage.setAttribute("src", "");
	  }, false);
	  submitBtn.addEventListener("click", function (e) {
		var dataUrl = canvas.toDataURL();
		//alert("sigText " + sigText);
		// alert("sigImage " + sigImage);
		// alert($("#signComplete").val());
		$("#billingTermsError").hide();
		if($("#signComplete").val() == 0) {
			swal({
                 title: "Error",
                 text: "Please create your signature.",
                 type: "error",
                 timer: 3000
             });
		} else if(!$("#agreed").prop("checked")){
			swal({
                 title: "Error",
                 text: "Please read and agree to our Terms and Conditions.",
                 type: "error",
                 timer: 3000
             });
		}else if(!$("#agreedBilling").prop("checked") && $("#payment_type").val() == "stripe"){
	      swal({
	                 title: "Error",
	                 text: "Please read and agree to our Terms of Service, Billing and Cancelation Policy.",
	                 type: "error",
	                 timer: 3000
	             });
	       $("#billingTermsError").show();
	    }else {
			/*sigText.innerHTML = dataUrl;
			sigImage.setAttribute("src", dataUrl);*/
			
			$.ajax({
				type : 'POST',
				url : "/api/v5/signature.php",
				dataType: "json",
				data : {signature_image: dataUrl, imageCreate: 1},
				beforeSend: function() {
					$("#spinner").addClass("show");
				},
				success: function(result){
					$("#spinner").removeClass("show");
					//console.log(result);
					//alert(result.status);
					if(result.status == 1) {
						//$('.customForms').append('<input type="hidden" name="signature_image" value="'+result.image_name+'" /> ').submit();

						$('.customForms').append('<input type="hidden" name="signature_image" value="'+result.image_name+'" /> ');
						$.ajax ({
					      type: "POST",
					      url: '/api/v5/appExtraAjax.php',
					      dataType: "json",
					      data: $(".customForms").serialize(),
					      beforeSend: function() {
					        $("#spinner").addClass("show");
					      },
					      success: function(msg) {
					        $("#spinner").removeClass("show");
					        if($("#payment_type_id").val()==2){
					        	$(".formStepSection").hide();
								$(".indexPaymentSection").show();
								$(".coupon_code_section").show();
					        }

					        $('#shippingAddress').val(msg.shippingAddress);
					        $('#itemPrice').val(msg.itemPrice);
					        $('#payment_FirstName').val(msg.requestData.fname);
					        $('#payment_LastName').val(msg.requestData.lname);
					        $('#payment_address1').val(msg.requestData.address1);
					        $('#shippingAddressNet').val(msg.requestData.address1);
					        $('#payment_address2').val(msg.requestData.address2);
					        $('#payment_city').val(msg.requestData.city);
					        $('#payment_state').val(msg.requestData.state);
					        $('#payment_ZipCode').val(msg.requestData.zipcode);
					        $('#payment_phone').val(msg.requestData.phone);
					        $('#payment_email,#emailNet').val(msg.requestData.email);
					        
					        if($("#payment_type_id").val()==1){
						        //SAVE COUPON DATA START
						        $.ajax({
								    type: 'POST',
								    url: '/api/v5/systemApi.php',
								    beforeSend: function(request) {
								        $("#spinner").addClass("show");
								    },
								    data: {
								        coupon_code: $("#coupon_code").val().trim(),
								        totalAmount: $("#itemPrice").val().trim(),
								        itm_id: $("#payment_itm_id").val().trim(),
								        sub_domain: $("#subDomain").val().trim(),
								        save_coupon_code_data: "save",
								    },
								    dataType: 'json',
								    "bProcessing": true,
								    "bServerSide": true,
								    success: function(json) {
								        $("#spinner").removeClass("show");
								        if (json.status == 200) {
								            //GO TO STRIPE PAYMENT START
										        $.ajax({
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

												        if (msg.status == 1 && msg.trasactionUrl != "") {
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
											//GO TO STRIPE PAYMENT END
								        } else {
								            swal({
								                    title: "Error",
								                    text: json.message,
								                    type: "warning",
								                    timer: 5000
								                },
								                function() {
								                    //window.location = '';
								                });
								        }
								    },
								    error: function() {
								        $("#spinner").removeClass("show");
								        swal({
								                title: "Error",
								                text: "Something went wrong!",
								                type: "warning",
								                timer: 5000
								            },
								            function() {
								                //window.location = '';
								            });
								    }
								});
						        //SAVE COUPON DATA END
					      	}
					      }
					    });

					} else {
						alert("Something wrong in form.");
					}
				},
			});
		}
		
	  }, false);

	})();
	(function(){
		$(document).ready(function(){
			$("input[name='ecomPro[]'").click();
		});
	})();
	//# sourceURL=pen.js
