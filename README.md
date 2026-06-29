# SportsHub - Professional E-Commerce Application

A full-stack e-commerce application built with MongoDB, Node.js, and React with modern UI components.

# Visit the website Here : https://e-commers-website-joyd-git-main-srihari21.vercel.app/ 

## Features

### User Features
- **Product Catalog**: Browse products with search, filter by category, and sort by price
- **Shopping Cart**: Add items to cart, update quantities, and remove items
- **User Authentication**: Register and login with JWT-based authentication
- **Checkout Process**: Complete checkout with shipping address
- **Order Tracking**: View order history and track order status
- **Product Reviews**: Add reviews to products

### Admin Features
- **Product Management**: Create, read, update, and delete products
- **Order Management**: View all orders and update order status
- **User Management**: View and manage users (admin only)

## Tech Stack

### Backend
- **Node.js** (v22) - Runtime environment
- **Express** - Web framework
- **MongoDB** - Database (supports local MongoDB or MongoDB Atlas)
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **bcryptjs** - Password hashing

### Frontend
- **React** (v18) - UI library
- **Vite** - Build tool
- **React Router** - Client-side routing
- **TailwindCSS** - Styling
- **Axios** - HTTP client
- **Lucide React** - Icons

## Project Structure

```
ecommers/
├── backend/
│   ├── models/
│   │   ├── User.js
│   │   ├── Product.js
│   │   ├── Order.js
│   │   └── Cart.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── products.js
│   │   ├── cart.js
│   │   ├── orders.js
│   │   └── users.js
│   ├── middleware/
│   │   └── auth.js
│   ├── server.js
│   ├── package.json
│   └── .env.example
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.jsx
│   │   │   └── ui/
│   │   ├── context/
│   │   │   ├── AuthContext.jsx
│   │   │   └── CartContext.jsx
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Cart.jsx
│   │   │   ├── Checkout.jsx
│   │   │   ├── Orders.jsx
│   │   │   ├── AdminProducts.jsx
│   │   │   └── AdminOrders.jsx
│   │   ├── lib/
│   │   │   ├── utils.js
│   │   │   └── axios.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── index.html
└── README.md
```

## Installation & Setup

### Prerequisites
- Node.js (v22)
- MongoDB (local or MongoDB Atlas)
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the backend directory:
```bash
cp .env.example .env
```

4. Update the `.env` file with your configuration:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/ecommerce
# Or use MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/ecommerce
JWT_SECRET=your_jwt_secret_key_here_change_this_in_production
NODE_ENV=development
```

5. Start the backend server:
```bash
npm run dev
```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the frontend development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:3000`

## Usage

### Creating an Admin Account

To create an admin account, you can either:
1. Register through the UI and manually update the role in MongoDB
2. Use the API directly with a role parameter

### Default User Flow

1. **Register**: Create a new user account at `/register`
2. **Login**: Login with your credentials at `/login`
3. **Browse Products**: View products on the home page
4. **Add to Cart**: Click "Add to Cart" on any product
5. **Checkout**: Go to cart and proceed to checkout
6. **View Orders**: Track your orders in the "My Orders" section

### Admin Flow

1. Login with an admin account
2. Navigate to "Manage Products" to add/edit/delete products
3. Navigate to "Manage Orders" to view and update order status

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Products
- `GET /api/products` - Get all products (with search/filter/sort)
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (admin only)
- `PUT /api/products/:id` - Update product (admin only)
- `DELETE /api/products/:id` - Delete product (admin only)
- `POST /api/products/:id/reviews` - Add review (private)

### Cart
- `GET /api/cart` - Get user's cart (private)
- `POST /api/cart` - Add item to cart (private)
- `PUT /api/cart/:itemId` - Update cart item (private)
- `DELETE /api/cart/:itemId` - Remove item from cart (private)
- `DELETE /api/cart` - Clear cart (private)

### Orders
- `POST /api/orders` - Create new order (private)
- `GET /api/orders` - Get all orders (admin) or user's orders (private)
- `GET /api/orders/:id` - Get order by ID (private)
- `PUT /api/orders/:id/status` - Update order status (admin only)
- `PUT /api/orders/:id/pay` - Mark order as paid (private)

### Users
- `GET /api/users` - Get all users (admin only)
- `GET /api/users/:id` - Get user by ID (admin only)
- `PUT /api/users/:id` - Update user (private/admin)
- `DELETE /api/users/:id` - Delete user (admin only)

## Database Schema

### User
- name, email, password (hashed), role (user/admin), address, phone

### Product
- name, description, price, category, stock, images, brand, rating, reviews

### Order
- user, orderItems, shippingAddress, paymentMethod, itemsPrice, taxPrice, shippingPrice, totalPrice, status, isPaid, isDelivered

### Cart
- user, items (product, name, quantity, price, image)

## Features in Detail

### Product Search & Filter
- Search by product name
- Filter by category (Electronics, Clothing, Books, Home & Garden, Sports, Toys, Other)
- Sort by price (low to high, high to low) or newest first

### Shopping Cart
- Real-time cart updates
- Quantity adjustment
- Stock validation
- Automatic price calculation

### Order Processing
- Automatic stock deduction on order creation
- Tax calculation (10%)
- Free shipping for orders over $100
- Order status tracking (Pending, Processing, Shipped, Delivered, Cancelled)

### Security
- JWT-based authentication
- Password hashing with bcrypt
- Role-based access control (admin/user)
- Protected routes

## Development

### Adding New Features

1. **Backend**: Add new routes in the `routes/` directory
2. **Frontend**: Add new pages in the `pages/` directory
3. **Components**: Add reusable UI components in `components/ui/`

### Environment Variables

Make sure to set the following environment variables in the backend `.env` file:
- `PORT` - Server port (default: 5000)
- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - Secret key for JWT token generation
- `NODE_ENV` - Environment (development/production)

## Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running locally
- If using MongoDB Atlas, check your connection string
- Verify your IP is whitelisted in MongoDB Atlas

### CORS Issues
- The frontend proxy is configured in `vite.config.js`
- Backend CORS is enabled for all origins in development

### Port Conflicts
- Change the PORT in backend `.env` if 5000 is in use
- Change the port in `vite.config.js` if 3000 is in use

## License

This project is for educational purposes.

## Future Enhancements

- Payment gateway integration (Stripe, PayPal)
- Product image upload functionality
- Email notifications for orders
- Product wishlist
- Advanced analytics dashboard
- Product recommendations
- Multi-language support
- Dark mode toggle
