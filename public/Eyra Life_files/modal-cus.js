// Get the modal
var modal = document.getElementById("mdlTermsAndConditions");

// Get the button that opens the modal
var btn = document.getElementById("btnShowTermsAndConditions");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
$(document).ready(function(){
    // $("#btnShowTermsAndConditions").click(function(){
    //     $("#mdlTermsAndConditions").modal("show");
    // });
    $("#btnAgree").click(function(){
        $("#agreed").prop("checked",true);
        modal.style.display = "none";
    });
    $("#btnDisagree").click(function(){
        $("#agreed").prop("checked",false);
        modal.style.display = "none";
    });
});

// Get the modal
var modalBilling = document.getElementById("mdlTermsAndConditionsBilling");

// Get the button that opens the modal
var btnBilling = document.getElementById("btnShowTermsAndConditionsBilling");

// Get the <span> element that closes the modal
var spanBilling = document.getElementsByClassName("closeBilling")[0];

// When the user clicks the button, open the modal 
btnBilling.onclick = function() {
  modalBilling.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
spanBilling.onclick = function() {
  modalBilling.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modalBilling) {
    modalBilling.style.display = "none";
  }
}
$(document).ready(function(){
    // $("#btnShowTermsAndConditions").click(function(){
    //     $("#mdlTermsAndConditions").modal("show");
    // });
    $("#btnAgreeBilling").click(function(){
        $("#agreedBilling").prop("checked",true);
        modalBilling.style.display = "none";
        $("#billingTermsError").hide();
    });
    $("#agreedBilling").click(function(){
      if($("#agreedBilling").is(":checked"))
        $("#billingTermsError").hide();
    });
    $("#btnDisagreeBilling").click(function(){
        $("#agreedBilling").prop("checked",false);
        modalBilling.style.display = "none";
    });
});