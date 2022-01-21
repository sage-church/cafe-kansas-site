//handle toggle of menu categories on Place Order page

$(".tile-show-or-hide").click(function () {
    if (
        $(this).parent().next().css("display") == "none" ||
        $(this).parent().next().css("display") == ""
    ) {
        $(this).html("&#8211;")
    } else {
        $(this).html("+")
    };
});

$(".tile-show-or-hide").click(function () {
    $(this).parent().next().slideToggle("fast")
});


//validate quantity inputs

$(".quantity-input").change(function () {

    var quantity = parseInt($(this).val()),
        minimum = parseInt($(this).attr("min")),
        maximum = parseInt($(this).attr("max"));

    if (isNaN(quantity)) {
        $(this).val(0)

    } else if (quantity < minimum) {
        $(this).val(minimum)

    } else if (quantity > maximum) {
        $(this).val(maximum)

    } else {
        $(this).val(parseInt(quantity, 10))
    }
});

//update total dollar amount

$(".quantity-input").change(function () {

    var quantElemArray = document.querySelectorAll(".quantity-input"),
        checkoutButtonBox = document.getElementById("checkout-button-box"),
        totalDollarAmount = 0;

    for (quantElem of quantElemArray) {

        var quantValue = quantElem.value,
            matchExpression = /\d+\.*\d+/g,
            itemPrice = $(quantElem).prev().html().match(matchExpression),
            totalItemDollars = quantValue * itemPrice;

        totalDollarAmount += totalItemDollars;
        document.getElementById("total-dollar-amount").value =
            "$" + totalDollarAmount.toFixed(2);
    }
    if (totalDollarAmount != 0) {
        checkoutButtonBox.style.display = "flex"
    } else {
        checkoutButtonBox.style.display = "none"
    };
});

//variables for functionality of pop-up windows
var checkoutButton = document.getElementById("checkout-button"),
    checkoutPopUp = document.getElementById("checkout-pop-up"),
    popUptotal = document.getElementById("pop-up-total"),
    cancel = document.getElementById("cancel"),
    greyOut = document.getElementById("grey-out"),
    bodyObject = document.body,
    submitButton = document.getElementById("submit"),
    firstNameInputBox = document.getElementById("first-name"),
    lastNameInputBox = document.getElementById("last-name"),
    phoneInputBox = document.getElementById("phone"),
    thankYouPopUp = document.getElementById("thank-you-pop-up"),
    exit = document.getElementById("exit")
    phoneExp = /^\(?([0-9]{3})\)?[-. ]([0-9]{3})[-. ]([0-9]{4})$/;

//display checkout pop-up window and disable rest of page
checkoutButton.onclick = function () {
    var finalTotal = document.getElementById("total-dollar-amount").value;

    checkoutPopUp.style.display = "flex";
    popUptotal.innerHTML = finalTotal;
    greyOut.style.display = "block";
    bodyObject.classList.add("only-pop-up")
};

//function to change input box styles indicating invalid input
function invalidInputFormat () {
    firstNameInputBox.style.border = "red solid 2px"
    firstNameInputBox.setAttribute("placeholder", "Required")
};

//functions to revert input box styles

function revertFirstNameStyle () {
    firstNameInputBox.style.border = "rgb(104 104 104) solid 1px"
    firstNameInputBox.setAttribute("placeholder", "")
}
function revertLastNameStyle () {
    lastNameInputBox.style.border = "rgb(104 104 104) solid 1px"
    lastNameInputBox.setAttribute("placeholder", "")
}
function revertPhoneNumberStyle () {
    phoneInputBox.style.border = "rgb(104 104 104) solid 1px"
}


//cancel checkout pop-up
//revert functions would only be applicable if styles have been changed due to...
//      user submitting invalid entries
cancel.onclick = function () {
    checkoutPopUp.style.display = "none";
    greyOut.style.display = "none";
    bodyObject.classList.remove("only-pop-up");
    revertFirstNameStyle();
    revertLastNameStyle();
    revertPhoneNumberStyle();
};

//verify inputs before submission
submitButton.onclick = function () {

    if (firstNameInputBox.value == "") {
        invalidInputFormat();
    };

    if (lastNameInputBox.value == "") {
        invalidInputFormat();
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

//revert input box styles on input change (if input is valid)
firstNameInputBox.addEventListener("change", function () {
    if (this.value != "") {
        revertFirstNameStyle();
    }
});

lastNameInputBox.addEventListener("change", function () {
    if (this.value != "") {
        revertLastNameStyle();
    }
});

phoneInputBox.addEventListener("change", function () {
    if (phoneExp.test(phoneInputBox.value) == true) {
        revertPhoneNumberStyle();
    }
});

//exit thank you pop-up
exit.onclick = function () {
    thankYouPopUp.style.display = "none"
    greyOut.style.display = "none";
    bodyObject.classList.remove("only-pop-up");
}