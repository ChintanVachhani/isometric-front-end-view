$(document).ready(function () {
    $('#add-to-cart-alert').hide();
    $('#bid-modal').on('hidden.bs.modal', function (e) {
        $("#display-bids-modal-tbody").empty();
    });
});
