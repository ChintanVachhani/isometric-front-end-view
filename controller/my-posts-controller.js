var serverAddress = "http://localhost:8080/isometric";
if (!sessionStorage.userId) {
    window.location.href = "/isometric-front-end-view/login.html";
} else {
    var row = "";
    //Load posts in the table
    function appendToTable(obj) {
        row += "<tr> <td>" + obj.postId + "</td> <td>" + obj.postTitle + "</td> <td>" + obj.itemMaterial + "</td> <td>" + obj.itemSize + "</td> <td>" + obj.itemBuiltType + "</td> <td>" + obj.itemColorType + "</td> <td>" + obj.postTime + "</td> <td><a href='#' class='view-bids' data-placement='right' title='View Bids' data-toggle='modal' data-target='#bid-modal'><i class='fa fa-gavel' aria-hidden='true' data-toggle='tooltip'></i></a> &nbsp;&nbsp;&nbsp;<a href='#' class='post-details' data-placement='right' data-toggle='modal' data-target='#post-modal'><i class='fa fa-info' aria-hidden='true' data-toggle='tooltip' title='Post Details'></i></a></td> </tr>";
    }

    //REST call for getting all posts for this user
    $.ajax({
        type: "GET",
        url: serverAddress + "/" + sessionStorage.userId + "/posts",
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

    $(document).ready(function () {
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
    });
}
