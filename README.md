# Temporary Resource Sharing App
A comprehensive Temporary Resource Sharing App built with Node.js, Express, MySQL, and AWS. This application allows you to share the resource (e.g. picture, document, etc.) with an expire validity after which it will not be accessible apart from admin.

## Table of Contents

- [Temporary Resource Sharing App](#temporary-resource-sharing-app)
- Features
- [Technologies Used](#technologies-used)
- Prerequisites
- Installation
- [Feature Description](#feature-description)
    - [User Authentication](#1-user-authentication)
    - [Resource Management](#2-resource-management)
    - [Cron Job Scheduler](#3-cron-job-scheduler)
    - [Database Design](#4-database-design)
    - [Error Handling and Response Management](#5-error-handling-and-response-management)
    - [Scalability and Extensibility](#6-scalability-and-extensibility)

## Features

- **User Authentication:** Secure JWT-based authentication with email validation and session management.
- **Resource Management:** Manage resource as per user, and its status as active or expired.
- **Cron Job Scheduler:** Runs a script that updates status of all the resources as active/expired. 
- **AWS Cloud Storage:** Stored resources in cloud AWS S3.
- **Database Design:** Modular schema using MySQL collections for `Users`, and `Resources`
- **Error Handling:** Comprehensive error responses with structured messages and appropriate HTTP status codes.
- **Scalability and Extensibility:** Modular codebase for easy feature extension and maintenance.

## Technologies Used

- **Backend:** Node.js, Express.js
- **Database:** MySQL, Sequelize
- **Authentication:** JWT (JSON Web Tokens)
- **Scheduler:** npm node-cron
- **Cloud Services:** AWS S3
- **Encryption:** Bcrypt, Hashing, Salting & Pepper Technique
- **Logging:** Logger
- **CI/CD:** GitHub Actions

## Prerequisites

Before you begin, ensure you have met the following requirements:

- **Node.js:** v14.x or later
- **npm:** Node Package Manager
- **MySQL:** Local installation or access to a cloud-based MySQL instance
- **AWS:** Cloud Storage
- **Git:** Version control system

## Installation

1. **Clone the Repository and Navigate to the Project Directory**

         ```bash
         git clone https://github.com/Harshit10bisht/kgk-temporary-store-app.git
         cd kgk-temporary-store-app
         ```
2. **Install Dependencies**
         ```bash
         npm install
         ```
3. **Set Up Environment Variables**
     Create an .env file in the root directory and add the following:
     
        ```bash
          PORT=3000
          JWT_SECRET='i_am_here'

          DB_NAME='storeapp'
          DB_USER='avnadmin'
          DB_HOST='mysql-aiven-harshit-harshitbisht1210dev.b.aivencloud.com'
          DB_PASSWORD='AVNS_C6iYvpZ6al2SC3j1Wud'

          AWS_ACCESS_KEY='AKIAS74TLWBMCVYG67EI'
          AWS_SECRET_ACCESS_KEY='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'
          AWS_REGION='us-east-1'
          AWS_S3_BUCKET='temporary-store-app'
        ```
4. **Start MySQL server**
     Ensure MySQL is running. As we will be using transactions in future, we need a MySQL replica set. You have two options:
     
     a. Run a local MySQL instance in MySQL Workbench
     b. Use a MySQL cloud connection string (recommended for simplicity) (e.g. aiven)

     Start your MySQL server based on your chosen option.

6. **Run the Application**
         ```bash
         npm start
         ```
         The server should now be running at http://localhost:3000 or else if occupied then http://localhost:4000.
    
## Feature Description

This project implements a temporary resource sharing system, covering essential functionality for user authentication, and resource management. Below are the key features developed as part of the project:

### 1. **User Authentication**
     - Implemented a user authentication mechanism using **JWT (JSON Web Tokens)**.
     - Users can log in using their email addresses, which generates a session token for further requests.
     - Email validation is enforced using the validator library to ensure the email format is correct before processing the login request.
     - The system supports both normal users and admin users, with certain functionalities restricted based on roles.

### 2. **Resource Management**
     - Manage resource sharing, including its expiration time.
     - The `/resources` endpoint allows authenticated users to create, read, update, and delete resource records.

### 3. **Cron Job**
     - Every 5 second, it checks whether resource is expired. If yes, it updates the record in DB.

### 4. **Cloud Storage**
     - Files as resource are stored in AWS S3 bucket.

Postman Collections :

Just import the postman collection URL :
"https://api.postman.com/collections/9977759-ccc4aac6-465b-493f-b9aa-a6dc5453ab21?access_key=PMAT-01JDQARKV1W608JWFD00A34ZSP"

(For external users, if needed please contact to harshitbisht1210@gmail.com for collections).

![image](https://github.com/user-attachments/assets/6fb5bf0a-f9fe-4af4-b5f3-e47ac11f0761)

E.g. Uploading resource
![image](https://github.com/user-attachments/assets/2473ec8b-c823-4f15-b4bb-369b058a8a99)

MySQL :
![image](https://github.com/user-attachments/assets/048d59a2-98dd-496c-b13e-d73ee8e3c5c1)

AWS S3 Storage :
![image](https://github.com/user-attachments/assets/56b7ec98-4cc2-47c6-8e7c-0fe6a0d2fb30)






Simple Workflow Test :
a. Login as Admin :
- Use the following credentials to log in as an admin:

{
    "name": "Harshit Bisht",
    "email": "hb10admin@gmail.com",
    "password": "Harshitadmin@123"
}
     
b. Generate Token :
- After logging in, you will receive a token. Use this token as a Bearer token for authentication in subsequent requests.

c. Test Operations :
- With the generated token, you can perform various operations in the application.
- You can test resource sharing by creating dummy resources and users.

### 5. **Database Design**
     - Used **MySQL** to manage user, and resource data.
     - Defined separate collections for `Users`, and `Resources` to keep the schema modular and scalable.
     - Applied unique constraints on email addresses to prevent duplicate user registrations and ensured each user is uniquely identified.

### 6. **Error Handling and Response Management**
     - Implemented comprehensive error handling throughout the application.
     - Each endpoint returns structured error responses with appropriate HTTP status codes and descriptive messages.
     - Added middleware to handle invalid routes, ensuring that undefined endpoints return a `404 Not Found` response.

### 7. **Scalability and Extensibility**
     - The project follows a **modular architecture**, making it easy to extend and add new features.
     - Each component (controllers, services, repositories, and middleware) is separated to ensure high maintainability.
     - The code is written with scalability in mind, allowing easy integration of additional features, such as billing systems or reporting modules.
