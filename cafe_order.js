//handle toggle of menu categories on Place Order page

$(".showOrHideButton").click(function () {
    if (
        $(this).parent().next().css("display") == "none" ||
        $(this).parent().next().css("display") == ""
    ) {
        $(this).html("(Hide items)")
    } else {
        $(this).html("(Show items)")
    };
});

$(".showOrHideButton").click(function () {
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
        checkoutButton = document.getElementById("checkout-button"),
        totalDollarAmount = 0;

    for (quantElem of quantElemArray) {

        var elemValue = quantElem.value,
            matchExpression = /\d+\.*\d+/g,
            itemPrice = $(quantElem).prev().html().match(matchExpression),
            totalItemDollars = elemValue * itemPrice;

        totalDollarAmount += totalItemDollars;
        document.getElementById("total-dollar-amount").innerHTML =
            "$" + totalDollarAmount.toFixed(2);
    }
    if (totalDollarAmount != 0) {
        checkoutButton.style.display = "block"
    } else {
        checkoutButton.style.display = "none"
    };
});

//pop-up window functionality
var checkoutButton = document.getElementById("checkout-button"),
    checkoutPopUp = document.getElementById("checkout-pop-up"),
    cancel = document.getElementById("cancel"),
    greyOut = document.getElementById("grey-out"),
    bodyObject = document.body;

checkoutButton.onclick = function () {
    checkoutPopUp.style.display = "block";
    greyOut.style.display = "block";
    bodyObject.classList.add("only-pop-up")
};

cancel.onclick = function () {
    checkoutPopUp.style.display = "none";
    greyOut.style.display = "none";
    bodyObject.classList.remove("only-pop-up")
};