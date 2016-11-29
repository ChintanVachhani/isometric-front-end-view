/**
 * Created by Chintan on 20-11-2016.
 */
//Animate Swap between login and register divs
$(document).ready(function () {
    $("#register-link").click(function () {
        $(this).closest("#login-box").animate({opacity: 'hide', height: 'hide'}, 'fast');
        $("#register-box").animate({opacity: 'show', height: 'show'}, 'slow');
    });
    $("#login-link").click(function () {
        $(this).closest("#register-box").animate({opacity: 'hide', height: 'hide'}, 'fast');
        $("#login-box").animate({opacity: 'show', height: 'show'}, 'slow');
    });

    //Hide Alert
    $("#login-alert").hide();
});
