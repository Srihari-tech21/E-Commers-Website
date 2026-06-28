import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { formatPrice } from '../lib/utils';
import api from '../lib/axios';

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await api.get('/orders');
      setOrders(response.data);
    } catch (error) {
      console.error('Failed to fetch orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await api.put(`/orders/${orderId}/status`, { status: newStatus });
      await fetchOrders();
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to update order status');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending': return 'default';
      case 'Processing': return 'secondary';
      case 'Shipped': return 'default';
      case 'Delivered': return 'default';
      case 'Cancelled': return 'destructive';
      default: return 'default';
    }
  };

  if (loading) {
    return <div className="container mx-auto px-4 py-8">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Manage Orders</h1>
      
      {orders.length === 0 ? (
        <Card className="max-w-2xl mx-auto text-center py-12">
          <CardContent>
            <h2 className="text-xl font-bold mb-2">No orders yet</h2>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <Card key={order._id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">Order #{order._id.slice(-8)}</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      Customer: {order.user?.name || 'Unknown'} ({order.user?.email})
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(order.createdAt).toLocaleString()}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <select
                      value={order.status}
                      onChange={(e) => handleStatusChange(order._id, e.target.value)}
                      className="h-8 px-3 rounded-md border border-input bg-background text-sm"
                    >
                      <option value="Pending">Pending</option>
                      <option value="Processing">Processing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                    <Badge variant={getStatusColor(order.status)}>{order.status}</Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {order.orderItems.map((item, index) => (
                    <div key={index} className="flex justify-between items-center text-sm">
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-muted-foreground">Qty: {item.quantity}</p>
                      </div>
                      <p className="font-medium">{formatPrice(item.price * item.quantity)}</p>
                    </div>
                  ))}
                  
                  <div className="border-t pt-3 space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Items</span>
                      <span>{formatPrice(order.itemsPrice)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Tax</span>
                      <span>{formatPrice(order.taxPrice)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Shipping</span>
                      <span>{formatPrice(order.shippingPrice)}</span>
                    </div>
                    <div className="flex justify-between font-bold">
                      <span>Total</span>
                      <span>{formatPrice(order.totalPrice)}</span>
                    </div>
                  </div>

                  <div className="border-t pt-3 text-sm">
                    <p className="font-medium mb-1">Shipping Address:</p>
                    <p className="text-muted-foreground">
                      {order.shippingAddress.address}, {order.shippingAddress.city},{' '}
                      {order.shippingAddress.state} {order.shippingAddress.zipCode},{' '}
                      {order.shippingAddress.country}
                    </p>
                  </div>

                  <div className="border-t pt-3 text-sm">
                    <p className="font-medium mb-1">Payment Method:</p>
                    <p className="text-muted-foreground">{order.paymentMethod}</p>
                    <div className="flex gap-4 mt-2">
                      <span className={order.isPaid ? 'text-green-600' : 'text-red-600'}>
                        {order.isPaid ? '✓ Paid' : '✗ Not Paid'}
                      </span>
                      <span className={order.isDelivered ? 'text-green-600' : 'text-muted-foreground'}>
                        {order.isDelivered ? '✓ Delivered' : 'Not Delivered'}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminOrders;
