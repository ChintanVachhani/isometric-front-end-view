//REST call for user authentication
$.ajax({
    type: "POST",
    url: serverAddress + "/" + sessionStorage.userId,
    success: function (data, textStatus, jqXHR) {
        isAuthenticated = data;
    },
    error: function (jqXHR, textStatus, errorThrown) {
        window.location.href = "/isometric-front-end-view/login.html";
    },
    async: false
});
if (!isAuthenticated) {
    window.location.href = "/isometric-front-end-view/login.html";
} else {
    var row = "";

    function appendToTable(obj) {
        row += "<tr> <td>" + obj.orderId + "</td> <td>" + obj.postId + "</td> <td>" + obj.bidId + "</td> <td>" + obj.quantity + "</td> <td class='quantity-control'><a href='#' class='inc-quantity btn btn-success btn-sm' title='Increment Quantity' data-placement='right'><i class='fa fa-plus' aria-hidden='true'></i> </a><a href='#' class='dec-quantity btn btn-danger btn-sm card-link' title='Decrement Quantity' data-placement='right'><i class='fa fa-minus' aria-hidden='true'></i></a></td><td>" + obj.amount + "</td> <td><a href='#' class='save-order btn btn-success btn-sm' title='Save Order' data-placement='right'><i class='fa fa-floppy-o' aria-hidden='true'></i></a><a href='#' class='remove-order btn btn-danger btn-sm' title='Remove Order' data-placement='right'><i class='fa fa-trash' aria-hidden='true'></i></a> </td></tr>";
    }

    //REST call for getting all orders in cart for this user
    $.ajax({
        type: "GET",
        url: serverAddress + "/cart/" + sessionStorage.userId,
        success: function (data, textStatus, jqXHR) {
            $.each(data, function (i, obj) {
                appendToTable(obj);
            });
            $("#display-orders-tbody").append(row);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert("Cannot Load orders.");
        }
    });


    $(document).ready(function () {
        $(document).on('click', '.save-order', function () {
            var orderId = $(this).closest('tr').find('td:first').text();
            var quantity = $(this).closest('tr').find('td:nth-child(4)').text();
            var amount = $(this).closest('tr').find('td:nth-child(6)').text();
            //REST call for saving an order
            $.ajax({
                type: "POST",
                url: serverAddress + "/order/save/" + orderId,
                data: "quantity=" + quantity + "&amount=" + amount,
                success: function (data, textStatus, jqXHR) {
                    window.location.reload();
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    window.location.href = "/isometric-front-end-view/error-404.html";
                }
            });
        });

        $(document).on('click', '.remove-order', function () {
            var orderId = $(this).closest('tr').find('td:first').text();

            //REST call for removing an order
            $.ajax({
                type: "POST",
                url: serverAddress + "/order/remove/" + orderId,
                success: function (data, textStatus, jqXHR) {
                    window.location.reload();
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    window.location.href = "/isometric-front-end-view/error-404.html";
                }
            });
        });

        $(document).on('click', '#checkout-btn', function () {

            //REST call for checkout
            $.ajax({
                type: "POST",
                url: serverAddress + "/checkout/" + sessionStorage.userId,
                success: function (data, textStatus, jqXHR) {
                    window.location.reload();
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    window.location.href = "/isometric-front-end-view/error-404.html";
                }
            });
        });
    });
}
