# Order Management Module

This project is an Order Management Module designed to handle customer orders, product details, and order status updates. It includes features for order processing, tracking, and reporting, and is built with Node.js for the backend and React for the frontend.  


## Features:
**Order Management:** View, create, update, and manage orders.  
**Product Listing:** List products with details such as name, price, and availability.  
**Order Status:** Track the status of orders.    
**Search and Filter:** Search and filter orders based on criteria such as order ID and status.  
**Admin Panel:** Admin functionality to manage products and orders.  

## Technologies Used  

**Frontend:** React,Bootstrap  
**Backend:** Node.js, Express  
**Database:** MongoDB  
**Authentication:** JWT for secure user authentication  
**State Management**: React Context API  
**Package Manager:** npm or yarn  

## Prerequisites  
Before running the application, ensure that you have the following installed on your local machine:  

**Node.js:** Download and Install Node.js  
**npm:** npm is installed automatically with Node.js. You can verify its installation by running npm -v in the terminal.

## Installation 

Clone the Repository  

```bash
git clone https://github.com/shubhamghadge20/Order-Management-Module.git
```  

Navigate to the Project Directory  

```bash
cd order-management-module
```  
# Run the Backend  

Navigate to the backend folder, install dependencies, and start the server:  

```bash
cd server
```
```bash
npm install
```  
```bash
npm start
```
# Run the Frontend  

Navigate to the frontend folder, install dependencies, and start the React app:  

```bash
cd client
```
```bash
npm install
```
```bash
npm start
```
## Login Example (Frontend)

Email: sham@gmail.com  

Password: sham123  

## File Structure  

```bash

/order-management-module

/client
  /src
    /components
      Dashboard.js         # Displays the dashboard and orders
      Login.js             # Login page
      Register.js          # Register page
      Orderitem.js         # Search component for orders
    /context
      OrderContext.js      # Context provider for order state management
      AuthContext.js       # Context for authentication
    /hooks
      useAuth.js           # Custom hook for authentication
    /pages
      Home.js              # Home page
    /utils
      api.js               # API connection helper
    App.js                 # Main application component
    index.js               # Entry point for React app
  package.json

/server
  server.js               # Backend API for managing orders
  /models
    inventoryModel.js      # Model for product inventory
    orderModel.js          # Order model definition
    UserModel.js           # User model definition
  /routes
    authRoutes.js          # API routes for authentication
    orderRoutes.js         # API routes for order management
  /config
    db.js                  # Database connection configuration
  /middleware
    authMiddleware.js      # Middleware for authentication
  /controllers
    authController.js      # Controller for authentication
    orderController.js     # Controller for order management
 ``` 
