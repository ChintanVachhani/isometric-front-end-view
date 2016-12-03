var serverAddress = "http://localhost:8080/isometric";
if (!sessionStorage.userId) {
    window.location.href = "/isometric-front-end-view/login.html";
} else {
    $(document).ready(function () {
        //Load posts in the table
        var row = "";
        var time;
        //Calculate the relative post time
        function calculateRelativePostTime(timeDiff) {
            var postDate = new Date(timeDiff);
            var currentDate = new Date();
            var date = (currentDate - postDate);
            var seconds = parseInt(date / 1000);
            var temp;
            var interval = Math.floor(seconds / 31536000);
            if (interval >= 1) {
                temp = interval + " year(s)";
            } else {
                interval = Math.floor(seconds / 2592000);
                if (interval >= 1) {
                    temp = interval + " month(s)";
                } else {
                    interval = Math.floor(seconds / 86400);
                    if (interval >= 1) {
                        temp = interval + " day(s)";
                    } else {
                        interval = Math.floor(seconds / 3600);
                        if (interval >= 1) {
                            temp = interval + " hour(s)";
                        } else {
                            interval = Math.floor(seconds / 60);
                            if (interval >= 1) {
                                temp = interval + " minute(s)";
                            }
                            else temp = Math.floor(seconds) + " second(s)";
                        }
                    }
                }
            }
            time = temp + " ago";
        }

        function appendToTable(obj) {
            calculateRelativePostTime(obj.postTime);
            row += "<tr> <td>" + obj.postId + "</td> <td>" + obj.postTitle + "</td> <td>" + obj.itemMaterial + "</td> <td>" + obj.itemSize + "</td> <td>" + obj.itemBuiltType + "</td> <td>" + obj.itemColorType + "</td> <td>" + time + "</td> <td><a href='#' class='view-bids btn btn-warning btn-sm' data-placement='right' title='View Bids' data-toggle='modal' data-target='#bid-modal'><i class='fa fa-gavel' aria-hidden='true' data-toggle='tooltip'></i></a> &nbsp;&nbsp;&nbsp;<a href='#' class='post-details btn btn-secondary btn-sm' data-placement='right' data-toggle='modal' data-target='#post-modal'><i class='fa fa-info' aria-hidden='true' data-toggle='tooltip' title='Post Details'></i></a></td> </tr>";
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

        $(document).on('click', '.view-bids', function () {
            var postId = $(this).closest('tr').find('td:first').text();

            function loadBidsModal(data) {
                var row = "";
                //Load bids in the table
                function appendToModalTable(obj) {
                    row += "<tr> <td>" + obj.bidId + "</td> <td>" + obj.postId + "</td> <td>" + obj.postTitle + "</td> <td>" + obj.bidAmount + "</td> <td><a href='#' class='add-to-cart btn btn-success btn-sm' data-toggle='tooltip' data-placement='right' title='Add to Cart'><i class='fa fa-cart-plus' aria-hidden='true'></i></a></td> </tr>";
                }

                $.each(data, function (i, obj) {
                    appendToModalTable(obj);
                });
                $("#bid-modal-label").text("# " + postId);
                $("#display-bids-modal-tbody").append(row);
            }

            //REST call for getting bids on particular post
            $.ajax({
                type: "GET",
                url: serverAddress + "/bids/" + postId,
                success: function (data, textStatus, jqXHR) {
                    loadBidsModal(data);
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    alert("Cannot Load bids.");
                }
            });
        });

        $(document).on('click', '.add-to-cart', function () {
            var bidId = $(this).closest('tr').find('td:first').text();

            //REST call for posting an order
            $.ajax({
                type: "POST",
                url: serverAddress + "/" + sessionStorage.userId + "/order/" + bidId,
                success: function (data, textStatus, jqXHR) {
                    $('#add-to-cart-alert').text("Added to Cart.").show().delay(1000).fadeOut();
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    window.location.href = "/isometric-front-end-view/error-404.html";
                }
            });
        });
    });
}
