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

//update item quantity and total dollar amount with minus button

$(".minus").click(function () {
    //variables used to update quantity
    var currentQuant = $(this).next().html()
    var parsedQuant = parseInt(currentQuant)
    var newQuant = parsedQuant - 1

    //variables used to update total dollar amount
    var matchExpression = /\d+\.*\d+/g
    var itemPrice = $(this).parent().prev().html().match(matchExpression)
    var currentTotalNumber = $("#total-dollar-amount").html().match(matchExpression)
    var newTotalNumber = (Number(currentTotalNumber) - Number(itemPrice)).toFixed(2)
    var newTotalHtml = "$" + newTotalNumber
    
    //update quantity and total dollar amount
    if (currentQuant > 0) {
        $(this).next().html(newQuant)
        $("#total-dollar-amount").html(newTotalHtml)
    } else {

    };
});

//update item quantity and total dollar amount with plus button

$(".plus").click(function () {
    //update item quantity
    var currentQuant = $(this).prev().html()
    var parsedQuant = parseInt(currentQuant)
    var newQuant = parsedQuant + 1
    $(this).prev().html(newQuant)

    //update total dollar amount
    var matchExpression = /\d+\.*\d+/g
    var itemPrice = $(this).parent().prev().html().match(matchExpression)
    var currentTotalNumber = $("#total-dollar-amount").html().match(matchExpression)
    var newTotalNumber = (Number(currentTotalNumber) + Number(itemPrice)).toFixed(2)
    var newTotalHtml = "$" + newTotalNumber
    $("#total-dollar-amount").html(newTotalHtml)
});
