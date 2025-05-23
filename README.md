# Electro Stock - Electronic Component Warehouse Management System

## Overview

Electro Stock is a web application designed to manage and order electronic components from a warehouse. It provides functionalities for browsing components, managing inventory, creating orders, and warehouse administration.  The application includes user authentication and cart management. 

## Features

* **Component Catalog:** Browse various categories of electronic components, including transistors, resistors, microchips, and controllers.
* **Inventory Management:**
    * View component details such as quantity and stock status. 
    * Add, edit, and delete components (admin functionality). 
* **Shopping Cart:** Add components to a cart for ordering. 
* **Order Management:**
    * Create and view orders.
    * Track order details, including order ID, user ID, order date, and return date. 
* **User Authentication:** User registration, login, and logout functionality. 
* **Warehouse Management:** Administer warehouses, including creating, editing, and deleting them. 
* **API Documentation:** Swagger OpenAPI documentation for available API endpoints.

## Screenshots

* **Home Page:** Displays component categories and a call to action. 
* **Component Listing:** Shows components with details (name, type, quantity, stock status) and actions (Edit, Delete, Add to Cart). 
* **Cart View:** (Present in navigation but not explicitly shown as a full page screenshot) 
* **Order Details:** Displays information about a specific order. 
* **Warehouse List:** Lists warehouses and provides options to manage them. 
* **Login Page:** User login interface. 
* **Registration Page:** User account creation interface.
* **Swagger API Documentation:** OpenAPI documentation for the backend API.

## API Endpoints

The application provides a comprehensive API for managing users, components, orders, and warehouses.  Key endpoints include:

* `/api/authentication/register`:  Register a new user.
* `/api/authentication/login`: Log in a user.
* `/api/authentication/logout`: Log out a user.
* `/api/component/create`: Create a new component.
* `/api/component/edit`: Edit an existing component.
* `/api/component`: Get all components.
* `/api/component/{componentId}`: Get a specific component by ID.
* `/api/component/{id}`: Delete a component.
* `/api/order/create`: Create a new order.
* `/api/order`: Get all orders.
* `/api/order/{orderId}`: Get a specific order by ID.
* `/api/order/{id}`: Delete an order.
* `/api/ware-store/create`: Create a new warehouse.
* `/api/ware-store/edit`: Edit an existing warehouse.
* `/api/ware-store`: Get all warehouses.
* `/api/ware-store/{wareStoreId}`: Get a specific warehouse by ID.
* `/api/ware-store/{id}`: Delete a warehouse.

## Technologies Used

* Frontend: React (`https://electrostock-react.onrender.com`)
* The Swagger documentation suggests a RESTful API backend.
* The server URL in Swagger (`https://electrostock-java-spring.onrender.com`) indicates Java and Spring Boot on the backend.
* Database: (PostgreSQL(local), MS SQL Server (hosted))

## Getting Started

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/ohorodnichuk17/electrostock.git
    ```
2.  **Backend Setup:**
    * Ensure you have Java and Spring Boot installed.
    * Set up the database and configure the connection in the `application.properties` file.
    * Build and run the Spring Boot application.
3.  **Frontend Setup:**
    * (If a separate frontend repository exists)  Ensure you have Node.js and npm or yarn installed.
    * Install dependencies using `npm install` or `yarn install`.
    * Configure the frontend to connect to the backend API.
    * Start the frontend development server.
4.  **Access the Application:** Open your browser and navigate to the frontend URL.

##  Important Notes

* The application uses a user authentication system, so you'll need to register an account to access most features. 
* Administrative functions (e.g., creating/editing warehouses and components) are likely restricted to users with specific roles or permissions.
* The Swagger UI provides interactive documentation for the backend API, which is helpful for development and testing.
* Some components have a "Reserved until" date, indicating a reservation or hold on the item. 

##  License
This project is licensed under the MIT License.
