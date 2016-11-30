var serverAddress = "http://localhost:8080/isometric";
if (!sessionStorage.userId) {
    window.location.href = "/isometric-front-end-view/login.html";
} else {
    //REST call for user access
    $.ajax({
        type: "GET",
        url: serverAddress + "/user/access/" + sessionStorage.userId,
        success: function (data, textStatus, jqXHR) {
            loadHome(data);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            window.location.href = "/isometric-front-end-view/login.html";
        },
        async: false
    });
    function loadHome(data) {
        $(document).ready(function () {
            //Load user profile details
            $("#profile-name").text(data.fullName);
            $("#profile-modal-fullname").val(data.fullName);
            $("#profile-modal-email").val(data.email);
            $("#profile-modal-username").val(data.userName);
            $("#profile-modal-login-info-time").val(data.previousLoginTime);
            $("#profile-modal-login-info-date").val(data.previousLoginDate);
            $("#profile-modal-login-info-location").val(data.previousLoginLocation);
        });
    }

    $(document).ready(function () {
        $("#profile-modal-save-btn").click(function (e) {
            e.preventDefault();
            $.ajax({
                type: "POST",
                url: serverAddress + "/user/access/" + sessionStorage.userId + "/update",
                data: $("#profile-modal-form").serialize(),
                success: function (data, textStatus, jqXHR) {
                    loadHome(data);
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    window.location.href = "/isometric-front-end-view/error-404.html";
                }
            });
            $('#profile-modal').modal('hide');
        });
        $("#new-post-modal-btn").click(function (e) {
            e.preventDefault();
            var timeStamp = new Date();
            $("#new-post-modal-time").val(timeStamp.toString());
            $.ajax({
                type: "POST",
                url: serverAddress + "/" + sessionStorage.userId + "/post",
                data: $("#new-post-form").serialize(),
                success: function (data, textStatus, jqXHR) {
                    location.reload();
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    window.location.href = "/isometric-front-end-view/error-404.html";
                }
            });
            $('#new-post-create-modal').modal('hide');
        });
    });
}



