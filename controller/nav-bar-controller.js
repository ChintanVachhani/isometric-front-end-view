$(document).ready(function () {
    $("#logout-link").click(function () {
        sessionStorage.clear();
        window.location.href = "/isometric-front-end-view/login.html";
    });
});
