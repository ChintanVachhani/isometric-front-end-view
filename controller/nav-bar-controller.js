$(document).ready(function () {
    $("#logout-link").click(function () {
        if (typeof(Storage) !== "undefined") {
            localStorage.flag = 0;
        }
        //REST call for user logout
        $.ajax({
            type: "POST",
            url: serverAddress + "/logout/" + sessionStorage.userId,
            success: function (data, textStatus, jqXHR) {
                sessionStorage.clear();
                window.location.href = "/isometric-front-end-view/login.html";
            },
            error: function (jqXHR, textStatus, errorThrown) {
                window.location.href = "/isometric-front-end-view/error-404.html";
            }
        });
    });
});
