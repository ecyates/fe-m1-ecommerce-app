# Advanced React E-Commerce Web App
**Author**: Elizabeth Yates

---

## Project Overview

The **Advanced React E-Commerce Web App** is an application that simulates an online shopping experience. This project is designed to deepen understanding of advanced React concepts, state management with Redux Toolkit, and data fetching using React Query. The app integrates the FakeStoreAPI (https://fakestoreapi.com/) for asynchronous data fetching and showcases functionalities such as product listing, category navigation, product details, authentication with Auth0, shopping cart management, and simulated checkout.

---

## Features

### Product Catalog

1. **Product Listing and Display**

- Retrieves all products from FakeStoreAPI using React Query.
- Displays product details, including title, price, category, and image.
- Each product includes "Add to Cart" and "View Description" buttons.

2. **Category Navigation**

- Dynamically populates a category dropdown using the FakeStoreAPI categories endpoint.
- Filter displays products by selected category.

3. **Product Details**

- Allows users to click on a product to view detailed information.
- Displays product-specific details, including a larger image, full description, category, and price.
- Includes a button to add the product to the cart from the details page and a button to keep shopping.

### Shopping Cart

1. **State Management**

- Uses Redux Toolkit to manage shopping cart state (add items, remove items, and checkout).
- Defines reducers and actions for seamless cart interactions.

2. **Shopping Cart Component**

- Displays all products added to the cart with details (title, image, quantity, and price).
- Provides buttons to increase and decrease the quantity. When the quantity reaches 0, the item is removed. 

3. **Session Storage Persistence**

- Saves cart data in `sessionStorage` for continuity across sessions.
- When the user is logged out, the cart is automatically removed from `sessionStorage`.

4. **Dynamic Price Calculation**

- Shows total number of products and total price in the cart.
- Dynamically updates totals as cart contents change.

5. **Checkout Functionality**

- Simulates a checkout process by clearing Redux state and `sessionStorage`.
- Provides user feedback upon successful checkout.

### Authentication

1. **Auth0 Integration**

- Enables secure user authentication using Auth0.
- Provides personalized user experiences based on login status.
- Displays a welcome message with the user's name and the user's profile image in the navbar upon successful login.

---

## Technologies Used

### Front-End

- **React.js**: Component-based library for building the user interface.
- **React Query**: For efficient and simple data fetching.
- **Redux Toolkit**: For state management, specifically shopping cart functionality.
- **React Router**: For navigation between pages.
- **Bootstrap**: For styling and responsive design.

### Authentication

- **Auth0**: For secure user login and personalized user experience.

### API

- **FakeStoreAPI**: A mock API providing product and category data.

### Storage

- **Session Storage**: For persisting cart data across browser sessions.

---

## Installation and Setup

1. Clone the repository:

        git clone https://github.com/ecyates/fe-m1-ecommerce-app.git

2. Navigate to the project directory:

        cd m1-ecommerce-app

3. Install dependencies:

        npm install

4. Set up Auth0 configuration:

        // Auth0Provider.tsx
        const domain = <your-domain-name>;
        const clientId = <your-client-id>;

4. Start the development server:

        npm run dev

5. Open the application in your browser at `http://localhost:5173/`.

---

## Usage

1. **Log In**: Authenticate using Auth0 to personalize your shopping experience.
2. **View Products:** Browse the product catalog from the homepage.
3. **Filter by Category:** Select a category from the dropdown to filter products.
4. **Add to Cart:** Add desired products to the cart from the product catalog.
5. **View Cart:** Manage cart contents, view total items, and calculate the total price.
6. **Checkout:** Simulate checkout to clear cart contents and reset the session.
7. **View Product Details:** Click on a product to see detailed information and add it to the cart.


---

## Learning Objectives

1. Practice advanced state management using Redux Toolkit.
2. Implement dynamic data fetching with React Query.
3. Design a responsive and engaging user interface using React and Bootstrap.
4. Ensure persistence using sessionStorage.
5. Apply React Router for seamless navigation between application pages.
6. Secure user authentication and personalized experiences using Auth0.

---

## Future Enhancements

1. Enhance the checkout process with payment simulation.
2. Improve product filtering with search and sort functionality.
3. Add ratings and reviews for products.
4. Implement dark mode for improved user experience.

---

## Acknowledgments

- FakeStoreAPI (https://fakestoreapi.com/) for providing mock data.
- Unsplash (https://unsplash.com/photos/red-blue-and-yellow-abstract-painting--MCrF6hnojU) for the background image.
- Coding Temple for guiding the project development process.