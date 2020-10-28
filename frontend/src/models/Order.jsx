class Order {
    constructor(customer, shippingAddress, orderItems, orderTotal, paymentDetails, isPaid = false, placedOn = new Date().toISOString(), isDelivered = false, user) {
        this.customer = customer;
        this.shippingAddress = shippingAddress;
        this.orderItems = orderItems;
        this.orderTotal = orderTotal;
        this.paymentDetails = paymentDetails;
        this.isPaid = isPaid;
        this.placedOn = placedOn;
        this.isDelivered = isDelivered;
        this.user = user;

    }
}

export default Order