// Load the PayPal SDK asynchronously
paypal.Buttons({
    createOrder: function(data, actions) {
        var donationAmount = parseFloat(document.getElementById('amount').value);

        // Check if the entered amount is valid
        if (isNaN(donationAmount) || donationAmount <= 0) {
            alert('Please enter a valid donation amount.');
            throw new Error('Invalid donation amount');
        }

        // Proceed with creating the PayPal order
        return actions.order.create({
            purchase_units: [{
                amount: {
                    value: donationAmount
                }
            }]
        });
    },
    onApprove: function(data, actions) {
        // This function captures the funds from the transaction
        return actions.order.capture().then(function(details) {
            // Display a thank you message or redirect to a thank you page
            alert('Thank you for your donation!');
        });
    }
}).render('#paypal-button-container');
