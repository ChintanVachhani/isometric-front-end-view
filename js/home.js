$(document).ready(function () {
    //Pass data from new post title input in Home page to Modal
    $("#post-create-btn").click(function () {
        $("#new-post-modal-title").val($("#new-post-title").val());
    });
    //Control Profile Modal invoking and buttons
    $('#profile-modal').on('hide.bs.modal', function () {
        disableInputs();
    });
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

    $("#post-modal-bid-btn").click(function () {
       $("#post-modal").modal('hide');
    });

    function enableInputs() {
        $("#profile-modal-fullname").prop('readonly', false);
        $("#profile-modal-email").prop('readonly', false);
        $("#profile-modal-username").prop('readonly', false);
        $("#profile-modal-password").prop('readonly', false);
    }

    function disableInputs() {
        $("#profile-modal-fullname").prop('readonly', true);
        $("#profile-modal-email").prop('readonly', true);
        $("#profile-modal-username").prop('readonly', true);
        $("#profile-modal-password").prop('readonly', true);
    }

    //Clear Filter
    $("#post-search-filter-modal-clear-btn").click(function () {
        $("#post-search-filter-form").trigger('reset');
    });
});






