/*
 Common AJAX function to consume a REST service
 jQuery.ajax({
 type: "GET|POST|DELETE|PUT",
 url: url,
 data: data,
 dataType:"text|html|json|jsonp|script|xml"
 success: success_callback, //function(data, textStatus, jqXHR)
 error: error_callback //function(jqXHR, textStatus, errorThrown)
 });*/

$(document).ready(function () {
    if (typeof(Storage) !== "undefined") {
        if (!localStorage.flag)
            localStorage.flag = 1;
    }
    $("#login-form").submit(function (e) {
        e.preventDefault();
        var timeStamp = new Date();
        var time = timeStamp.getHours() + ":" + timeStamp.getMinutes() + ":" + timeStamp.getSeconds();
        var date = timeStamp.getDate() + "/" + (timeStamp.getMonth() + 1) + "/" + timeStamp.getFullYear();
        var location = "Richardson, TX, USA";
        //Hardcoded here because there is no free https library for geolocation that works and we are unable to make http requests through https
        /*$.getJSON('http://ipinfo.io', function(data){
         var location = data.city() + ", " + data.region() + ", " + data.countryName();
         });*/
        $("#login-time").val(time);
        $("#login-date").val(date);
        $("#login-location").val(location);
        //REST call for login
        $.ajax({
            type: "POST",
            url: serverAddress + "/login",
            data: $(this).serialize(),
            success: function (data, textStatus, jqXHR) {
                redirectToHome(data);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                window.location.href = "/isometric-front-end-view/error-404.html";
            }
        });
    });

    function redirectToHome(data) {
        if (data.message == "Login successful.") {
            if (typeof(Storage) !== "undefined") {
                sessionStorage.userId = data.userId;
                window.location.href = "/isometric-front-end-view/home.html";
            } else {
                $("#login-alert").removeClass('alert-success').addClass('alert-danger').text("No Storage support in your browser. Use a latest browser.");
            }

        } else {
            $("#login-alert").removeClass('alert-success').addClass('alert-danger').text(data.message);
            $("#login-alert").show().delay(1000).fadeOut();
        }
    }

    $("#register-form").submit(function (e) {
        e.preventDefault();
        //REST call for register
        $.ajax({
            type: "POST",
            url: serverAddress + "/register",
            data: $(this).serialize(),
            success: function (data, textStatus, jqXHR) {
                $("#login-alert").removeClass('alert-danger').addClass('alert-success');
                $("#login-alert").text(data.message);
                $("#login-alert").show().delay(1000).fadeOut();
                window.location.href = "/isometric-front-end-view/login.html";
            },
            error: function (jqXHR, textStatus, errorThrown) {
                window.location.href = "/isometric-front-end-view/error-404.html";
            }
        });
    });
});
