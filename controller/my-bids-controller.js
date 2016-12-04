//REST call for user authentication
$.ajax({
    type: "POST",
    url: serverAddress + "/" + sessionStorage.userId,
    success: function (data, textStatus, jqXHR) {
        isAuthenticated = data;
    },
    error: function (jqXHR, textStatus, errorThrown) {
        window.location.href = "/isometric-front-end-view/login.html";
    },
    async: false
});
if (!isAuthenticated) {
    window.location.href = "/isometric-front-end-view/login.html";
} else {
    $(document).ready(function () {
        var row = "";
        //Load posts in the table
        function appendToTable(obj) {
            row += "<tr> <td>" + obj.bidId + "</td> <td>" + obj.postId + "</td> <td>" + obj.postTitle + "</td> <td>" + obj.bidAmount + "</td> <td><a href='#' class='btn btn-secondary btn-sm post-details' data-placement='right' data-toggle='modal' data-target='#post-modal'><i class='fa fa-info' aria-hidden='true' data-toggle='tooltip' title='Post Details'></i></a> </td> </tr>"
        }

        //REST call for getting all bids for this user
        $.ajax({
            type: "GET",
            url: serverAddress + "/" + sessionStorage.userId + "/bids",
            success: function (data, textStatus, jqXHR) {
                $.each(data, function (i, obj) {
                    appendToTable(obj);
                });
                $("#display-bids-tbody").append(row);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert("Cannot Load bids.");
            }
        });


        $(document).on('click', '.post-details', function () {
            var postId = $(this).closest('tr').find('td:nth-child(2)').text();

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
