var serverAddress = "http://localhost:8080/isometric";
if (!sessionStorage.userId) {
    window.location.href = "/isometric-front-end-view/login.html";
} else {
    var row = "";

    function appendToTable(obj) {
        row += "<tr> <td>" + obj.orderId + "</td> <td>" + obj.postId + "</td> <td>" + obj.bidId + "</td> <td>" + obj.quantity + "</td> <td>" + obj.amount + "</td> </tr>";
    }

    //REST call for getting all posts for this user
    $.ajax({
        type: "GET",
        url: serverAddress + "/orders/" + sessionStorage.userId,
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
    });
}
