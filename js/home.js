$(document).ready(function () {
    //Pass data from new post title input in Home page to Modal
    $("#post-create-btn").click(function () {
        $("#new-post-modal-title").val($("#new-post-title").val());
    });
    //Control Proifle Modal invoking and buttons
    $("#my-profile-link").click(function () {
        $("#profile-modal-save-btn").hide();
        $("#profile-modal-edit-btn").show();
    });
    $("#profile-view-btn").click(function () {
        $("#profile-modal-save-btn").hide();
        $("#profile-modal-edit-btn").show();
    });
    $("#profile-edit-btn").click(function () {
        $("#profile-modal-edit-btn").hide();
        $("#profile-modal-save-btn").show();
        enableInputs();
    });
    $("#profile-modal-edit-btn").click(function () {
        $(this).hide();
        $("#profile-modal-save-btn").show();
        enableInputs();
    });
    function enableInputs() {
        $("#profile-modal-fullname").prop('readonly', false);
        $("#profile-modal-email").prop('readonly', false);
        $("#profile-modal-username").prop('readonly', false);
        $("#profile-modal-password").prop('readonly', false);
    }
});






