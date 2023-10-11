# O'Reilly 2.0
    O-O-O
          🤚
      😣/
     _/|| 
    _/¯  ¯\_

    O’Reilly
     👋
        \😩
         || \_
       _/¯¯\_

     Auto Parts
          🤚
      😳/
     _/|| 
    _/¯  ¯\_
An e-commerce platform inspired by O'Reilly, implemented using Spring Boot and Spring Data JPA for the backend. React, JS, and TailWind CSS for the front end.

# Overview
This project is using an N-tier architecture, which divides the application into three logical layers: the presentation layer, the business layer, and the data layer. The presentation layer handles the user interface and interactions, while the business layer implements the application's logic and processes, and the data layer stores and retrieves data. By separating these layers, we can create a flexible and modular system that's easier to develop, test, and maintain.

## Sign In
![Animation](https://github.com/Saechaoc/O-Reilly-2.0/assets/23547811/e4f18411-b527-4dbc-822e-1e177b4b5974)

## Add Item To Cart
![Add Item To Cart](https://github.com/Saechaoc/O-Reilly-2.0/assets/23547811/add5b5ff-a862-4882-ae4e-5f20852be552)

## Checkout
![Checkout](https://github.com/Saechaoc/O-Reilly-2.0/assets/23547811/a01b1fd8-e8c0-4af0-8e86-78dfbf3600ae)

# System Architecture
## System Diagram
* Application Layer: Manages API endpoints and HTTP request handling.
* Shopping API: Contains business logic and interacts with models and repositories for data access.
* Data Access Objects: Manages data access, potentially interacting with a database.
* Model Layer: Defines data structures and ORM entities.
* Authentication Layer: Manages auth configuration of rest endpoints using JWT token management.

## System Overview
![Capture](https://github.com/Saechaoc/O-Reilly-2.0/assets/23547811/b6b5267c-baa2-48f0-b2f7-0ff25d59c9d3)

## System Details
```mermaid
graph TB

    subgraph "Frontend Layer"
        ViewLayer[View Layer]
    end

    subgraph "Backend Layer"
        subgraph controllerLayer["Application Layer"]
            authController[AuthController]
            adminOrderController[AdminOrderController]
            otherControllers[OtherControllers]
        end
        
        subgraph serviceLayer["Service Layer"]
            cartService[cartServices]
            customerUserService[productServices]
            otherServices[OtherServices]
        end
        
        subgraph modelLayer["Model Layer"]
            cartModel[Cart]
            productModel[Product]
            otherModels[OtherModels]
        end
        
        subgraph repositoryLayer["DAO Layer"]
            cartRepository[CartRepository]
            productRepository[ProductRepository]
            OtherRepositories[OtherRespositories]
        end

        subgraph authLayer["Authentication Layer"]
            Auth[Authentication Layer]
        end

        subgraph databaseLayer["Database Layer"]
            database[Database]
        end
    end

    %% Interaction Flow
    ViewLayer -->|HTTP Requests & Responses| controllerLayer
    controllerLayer -->|Method Calls| serviceLayer
    serviceLayer -->|Data & Logic Processing| modelLayer
    serviceLayer -->|CRUD Operations| repositoryLayer
    repositoryLayer -->|Data Access| modelLayer
    repositoryLayer -->|CRUD Operations| databaseLayer
    controllerLayer -->|Utilize Auth| authLayer
    serviceLayer -->|Utilize Auth| authLayer
    style ViewLayer fill:#f9a826,stroke:#333,stroke-width:2px
    style controllerLayer fill:#4caf50,stroke:#333,stroke-width:2px
    style serviceLayer fill:#2196f3,stroke:#333,stroke-width:2px
    style modelLayer fill:#ff5722,stroke:#333,stroke-width:2px
    style repositoryLayer fill:#9c27b0,stroke:#333,stroke-width:2px
    style authLayer fill:#e91e63,stroke:#333,stroke-width:2px
    style databaseLayer fill:#607d8b,stroke:#333,stroke-width:2px

```

## System Interaction Summary
1. Frontend Layer
Responsibility: Manages user interface and experience.
Interaction: Communicates with the backend through HTTP requests and updates the UI based on the responses.
2. Backend Layer
    1. Controller Layer
        1. Responsibility: Handles HTTP requests and responses.
        2. Interaction: Receives requests from the frontend, interacts with the service layer for data processing, and sends back responses.
    2. Service Layer
        1. Responsibility: Manages business logic and data processing.
        2. Interaction: Communicates with the controller layer and accesses/modifies data through the repository layer, utilizing models for data structure.
    3. Model Layer
        1. Responsibility: Defines data structures.
        2. Interaction: Used by the service and repository layers to define and manage data.
    4. Repository Layer
        1. Responsibility: Manages data access and CRUD operations.
        2. Interaction: Interacts with the database and the service layer, using models to manage data.
3. Auth Layer
    1. Responsibility: Secures rest endpoints.
    2. Interaction: Provides authentication settings (like security and JWT management) to the controller and service layers.

### Interaction Flow:
The Frontend Layer sends HTTP requests to the Controller Layer and receives responses to update the UI. The Controller Layer communicates with the Service Layer to process requests and manage business logic.
The Service Layer interacts with the Repository Layer to access and manage data in the database, utilizing the Model Layer for data structures. The Repository Layer performs CRUD operations directly on the Database. Both the Controller and Service Layers utilize configurations from the Auth Layer.


# Entity Relationship for SQL Database
```mermaid
erDiagram
    address {
        bigint id
        bigint user_id
        varchar city
        varchar first_name
        varchar last_name
        varchar mobile
        varchar state
        varchar street_address
        varchar zip_code
    }

    cart {
        bigint id
        bigint user_id
        int total_items
        double total_price
    }

    cart_item {
        bigint id
        double price
        int quantity
        bigint cart_id
        bigint product_pid
        bigint user_id
    }

    categories {
        bigint id
        int level
        varchar name
        bigint parent_category_id
    }

    customer_order {
        bigint id
        bigint user_id
        bigint shipping_address_id
        double amount_paid
        int num_items
        double total_price
        datetime created_at
        datetime order_date
        datetime payment_date
        datetime delivery_date
        varchar order_id
        varchar order_status
        varchar payment_id
        varchar payment_method
        varchar status
        varchar transaction_id
    }

    order_item {
        bigint id
        double price
        int quantity
        bigint order_id
        bigint product_pid
        bigint user_id
    }

    payment_information {
        bigint user_id
        varchar card_number
        varchar cardholder_name
        varchar cvv
        date expiration_date
    }

    product {
        bigint pid
        double price
        int quantity
        int num_ratings
        bigint category_id
        varchar title
        varchar description
        varchar image_url
        varchar product_line
        varchar product_family
        varchar stock
        datetime created_at
    }

    rating {
        bigint id
        bigint user_id
        bigint product_id
        double rating
        datetime created_at
    }

    review {
        bigint id
        bigint user_id
        bigint product_id
        varchar review
        datetime created_at
    }

    user {
        bigint id
        varchar first_name
        varchar last_name
        varchar email
        varchar password
        varchar mobile
        varchar role
        datetime created_at
    }

    address ||--o{ user : "belongs_to"
    user ||--o{ cart : "has_one"
    user ||--o{ cart_item : "has_many"
    user ||--o{ payment_information : "has_many"
    user ||--o{ rating : "has_many"
    user ||--o{ review : "has_many"
    user ||--o{ customer_order : "has_many"
    cart ||--o{ cart_item : "has_many"
    cart_item ||--o{ product : "belongs_to"
    categories ||--o{ product : "has_many"
    categories }|..|{ categories : "has_many"
    product ||--o{ rating : "has_many"
    product ||--o{ review : "has_many"
    customer_order ||--o{ address : "has_one"
    customer_order ||--o{ order_item : "has_many"
    order_item ||--o{ product : "belongs_to"

```
