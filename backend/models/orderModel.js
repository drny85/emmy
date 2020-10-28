import mongoose from 'mongoose';

const orderSchema = mongoose.Schema({
  customer: { type: String },
  shippingAddress: { type: Object },
  paymentDetails: { type: Object },
  orderItems: { type: Array },
  placedOn: { type: String },
  isDelivered: { type: Boolean },
  isPaid: { type: Boolean },
  orderTotal: { type: Number },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
});

export default mongoose.model('Order', orderSchema);
