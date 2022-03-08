// All code is for functionality on 'Place Order' page

// Once the +/- button is clicked, the menu category toggles (is hidden or shown).
// If the button is currently a '+' it changes to '-', and vice versa.
$(".toggle-tile").click(function () {
    if (
        $(this).parent().next().css("display") == "none" ||
        $(this).parent().next().css("display") == ""
    ) {
        $(this).html("&#8211;")
    } else {
        $(this).html("+")
    };
});

$(".toggle-tile").click(function () {
    $(this).parent().next().slideToggle("fast")
});

// When a user provides input through keyboard or copy/paste in the item quantity fields, 
// the input is verified to be a number within the range 0 - 15.
$(".quantity-input").change(function () {

    var quantity = parseInt($(this).val()),
        minimum = parseInt($(this).attr("min")),
        maximum = parseInt($(this).attr("max"));

    // If entry is blank, set value to 0
    if (isNaN(quantity)) {
        $(this).val(0)

    // If entry is smaller than min, set value to 0
    } else if (quantity < minimum) {
        $(this).val(minimum)

    // If entry is greater than max, set value to 15
    } else if (quantity > maximum) {
        $(this).val(maximum)

    // If entry is within range, set value to entry (essentially rounding down if applicable)
    } else {
        $(this).val(parseInt(quantity, 10))
    }
});


// Box where order total is displayed
var orderTotalDisplayed = document.getElementById("total-dollar-amount");

// Every time an entry in any item quantity field is made, the 'Order Total' at bottom of 
// page is updated according to the item prices.
$(".quantity-input").change(function () {

        // Access all quantity fields to use values
    var quantElemList = document.querySelectorAll(".quantity-input"),
        // Access div for checkout button in order to display/hide
        checkoutButtonBox = document.getElementById("checkout-button-box"),
        orderTotal = 0;

    // Calculate and update order total
    for (quantElem of quantElemList) {

        var quant = quantElem.value,
            matchExpression = /\d+\.*\d+/g,
            itemPrice = $(quantElem).prev().html().match(matchExpression),
            totalItemDollars = quant * itemPrice;

        orderTotal += totalItemDollars;
        orderTotalDisplayed.value =
            "$" + orderTotal.toFixed(2);
    }
    // The checkout button will only be displayed if the order total is not 0 to prevent
    // a user from checking out with no items selected.
    if (orderTotal != 0) {
        checkoutButtonBox.style.display = "flex"
    } else {
        checkoutButtonBox.style.display = "none"
    };
});

// Variables for functionality of pop-up windows
var checkoutButton = document.getElementById("checkout-button"),
    checkoutPopUp = document.getElementById("checkout-pop-up"),
    popUptotal = document.getElementById("checkout-total"),
    cancel = document.getElementById("cancel"),
    greyOut = document.getElementById("grey-out"),
    bodyObject = document.body,
    submitButton = document.getElementById("submit"),
    firstNameInputBox = document.getElementById("first-name"),
    lastNameInputBox = document.getElementById("last-name"),
    phoneInputBox = document.getElementById("phone"),
    thankYouPopUp = document.getElementById("thank-you-pop-up"),
    exit = document.getElementById("exit"),
    phoneExp = /^\(?([0-9]{3})\)?[-. ]([0-9]{3})[-. ]([0-9]{4})$/;

// Display checkout pop-up window and disable rest of page
checkoutButton.onclick = function () {
    var finalTotal = document.getElementById("total-dollar-amount").value;
    checkoutPopUp.style.display = "flex";
    popUptotal.innerHTML = finalTotal;
    greyOut.style.display = "block";
    // Class attribute is added to the body to activate a CSS selector in the 'order.css' 
    // file. The selector disables all click events for most elements on page (the checkout
    // pop up is not affected due to separate id selector enabling click events on this one
    // element).
    bodyObject.classList.add("only-pop-up")
};

// Verifies inputs upon submission. If inputs are invalid, the formatting is changed to 
// indicate so, and the checkout process is not completed.
submitButton.onclick = function () {

    if (firstNameInputBox.value == "") {
        firstNameInputBox.style.border = "red solid 2px"
        firstNameInputBox.setAttribute("placeholder", "Required")
    };

    if (lastNameInputBox.value == "") {
        lastNameInputBox.style.border = "red solid 2px"
        lastNameInputBox.setAttribute("placeholder", "Required")
    };

    if (phoneExp.test(phoneInputBox.value) == false) {
        phoneInputBox.style.border = "red solid 2px"
    };

    if (firstNameInputBox.value != "" &&
        lastNameInputBox.value != "" &&
        phoneExp.test(phoneInputBox.value) == true) {
        checkoutPopUp.style.display = "none";
        thankYouPopUp.style.display = "flex";
    }
};

// These are to revert input box formatting

function revertFieldFormat(formField) {
    formField.style.border = "rgb(104 104 104) solid 1px"
    formField.setAttribute("placeholder", "")
}

function revertPhoneNumberStyle() {
    phoneInputBox.style.border = "rgb(104 104 104) solid 1px"
}

// Input box formatting is reverted if valid input is received (would only be applicable
// if invalid input was previously received).
firstNameInputBox.addEventListener("change", function () {
    if (this.value != "") {
        revertFieldFormat(this);
    }
});

lastNameInputBox.addEventListener("change", function () {
    if (this.value != "") {
        revertFieldFormat(this);
    }
});

phoneInputBox.addEventListener("change", function () {
    if (phoneExp.test(phoneInputBox.value) === true) {
        revertPhoneNumberStyle();
    }
});

// If user clicks the 'Cancel' button, the checkout pop up will be closed/hidden. When this
// occurs, the input field formatting is reverted which is only applicable if user had
// previously entered invalid input. 
cancel.onclick = function () {
    checkoutPopUp.style.display = "none";
    greyOut.style.display = "none";
    bodyObject.classList.remove("only-pop-up");
    revertFieldFormat(firstNameInputBox);
    revertFieldFormat(lastNameInputBox);
    revertPhoneNumberStyle();
};

// Exits thank you pop up that is displayed after checkout is complete. 
// TODO: Reset order total after this occurs
exit.onclick = function () {
    thankYouPopUp.style.display = "none"
    greyOut.style.display = "none";
    bodyObject.classList.remove("only-pop-up");
    orderTotalDisplayed.value = "$0.00"
}