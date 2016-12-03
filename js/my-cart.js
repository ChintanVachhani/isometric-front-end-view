$(document).ready(function () {
    //Increment Quantity
    $(document).on('click', '.inc-quantity', function () {
        var quantity = $(this).closest('tr').find('td:nth-child(4)').text();
        var amount = $(this).closest('tr').find('td:nth-child(6)').text();
        quantity = parseInt(quantity);
        amount = parseInt(amount);
        var initAmount = amount / quantity;
        quantity++;
        amount += initAmount;
        $(this).closest('tr').find('td:nth-child(4)').text(quantity);
        $(this).closest('tr').find('td:nth-child(6)').text(amount);
    });
    //Decrement Quantity
    $(document).on('click', '.dec-quantity', function () {
        var quantity = $(this).closest('tr').find('td:nth-child(4)').text();
        var amount = $(this).closest('tr').find('td:nth-child(6)').text();
        quantity = parseInt(quantity);
        amount = parseInt(amount);
        var initAmount = amount / quantity;
        if (quantity > 1) {
            quantity--;
            amount -= initAmount;
            $(this).closest('tr').find('td:nth-child(4)').text(quantity);
            $(this).closest('tr').find('td:nth-child(6)').text(amount);
        }
    });
});
