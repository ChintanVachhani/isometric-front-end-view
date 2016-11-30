var serverAddress = "http://localhost:8080/isometric";
if (!sessionStorage.userId) {
    window.location.href = "/isometric-front-end-view/login.html";
} else {
    //REST call for user access
    $.ajax({
        type: "GET",
        url: serverAddress + "/access/" + sessionStorage.userId,
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

    function loadPosts() {
        var row = "";
        //Load posts in the table
        function appendToTable(obj) {
            row += "<tr> <td>" + obj.postId + "</td> <td>" + obj.postTitle + "</td> <td>" + obj.itemMaterial + "</td> <td>" + obj.itemSize + "</td> <td>" + obj.itemBuiltType + "</td> <td>" + obj.itemColorType + "</td> <td>" + obj.postTime + "</td> <td><a href='#' class='post-details' data-placement='right' class='card-link' data-toggle='modal'data-target='#post-modal'><i class='fa fa-info' title='Post Details' aria-hidden='true'data-toggle='tooltip'></i></a></td> </tr>";
        }

        //REST call for getting all posts
        $.ajax({
            type: "GET",
            url: serverAddress + "/posts",
            success: function (data, textStatus, jqXHR) {
                $.each(data, function (i, obj) {
                    appendToTable(obj);
                });
                $("#display-posts-tbody").append(row);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert("Cannot Load posts.");
            }
        });
    }

    $(document).ready(function () {
        loadPosts();
        $("#profile-modal-save-btn").click(function (e) {
            e.preventDefault();
            //REST call for user info update
            $.ajax({
                type: "POST",
                url: serverAddress + "/access/" + sessionStorage.userId + "/update",
                data: $("#profile-modal-form").serialize(),
                success: function (data, textStatus, jqXHR) {
                    loadHome(data);
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    window.location.href = "/isometric-front-end-view/error-404.html";
                }
            });
            $('#profile-modal').modal('hide');
            $("#profile-modal-password").val("");
        });
        $("#new-post-modal-btn").click(function (e) {
            e.preventDefault();
            var timeStamp = new Date();
            $("#new-post-modal-time").val(timeStamp.toString());
            //REST call for create new post
            $.ajax({
                type: "POST",
                url: serverAddress + "/" + sessionStorage.userId + "/post",
                data: $("#new-post-form").serialize(),
                success: function (data, textStatus, jqXHR) {
                    window.location.reload();
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    window.location.href = "/isometric-front-end-view/error-404.html";
                }
            });
            $('#new-post-create-modal').modal('hide');
        });
        $(document).on('click', '.post-details', function () {
            var postId = $(this).closest('tr').find('td:first').text();

            function loadPostModal(data) {
                $("#post-modal-postId").val(data.postId);
                $("#post-modal-post-title").val(data.postTitle);
                $("#post-modal-description").val(data.postDescription);
                $("#post-modal-material").val(data.itemMaterial);
                $("#post-modal-size").val(data.itemSize);
                $("#post-modal-built-type").val(data.itemBuiltType);
                $("#post-modal-color-type").val(data.itemColorType);
                $("#post-modal-label").text("# " + data.postId);
            }

            //REST call for getting particular post
            $.ajax({
                type: "GET",
                url: serverAddress + "/post/" + postId,
                success: function (data, textStatus, jqXHR) {
                    loadPostModal(data);
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    alert("Cannot Load post.");
                }
            });
        });

        $("#bid-modal-confirm-btn").click(function (e) {
            e.preventDefault();
            //REST call for create new bid
            $.ajax({
                type: "POST",
                url: serverAddress + "/" + sessionStorage.userId + "/bid",
                data: $("#new-bid-form").serialize(),
                success: function (data, textStatus, jqXHR) {
                    window.location.reload();
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    window.location.href = "/isometric-front-end-view/error-404.html";
                }
            });
            $('#bid-modal').modal('hide');
        });
    });
}



