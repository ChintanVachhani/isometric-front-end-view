$(document).ready(function () {
    $('#bid-modal').on('hidden.bs.modal', function (e) {
        $("#display-bids-modal-tbody").empty();
    });
});
