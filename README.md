# To-Do Application

## Features

- Create a new task.
- View all tasks.
- Mark a task as completed.
- Delete a task.

---

## Technologies Used

### Backend
- **Spring Boot**
- **MongoDB**
- **Java**

### Frontend
- **HTML**
- **CSS**
- **JavaScript**
- **Fetch API**

---

## Installation and Setup

### Prerequisites
- Java 17 or higher
- Maven
- MongoDB (running on `localhost:27017`)
- Node.js and npm (for serving the frontend, optional)
- Git

### Steps to Set Up Backend
1. Clone the repository:
   ```bash
   git clone https://github.com/ankithdadda/Quinbay_todo.git
   cd Quinbay_todo

2. Navigate to the backend directory:
   ```bash
   cd demo

3. Install dependencies:
   ```bash
   mvn clean install

4. Run the application:
   ```bash
   mvn spring-boot:run

5. The backend will be available at http://localhost:8080

### Steps to Set Up Frontend

1. Open the index.html file located in the frontend directory.

2. Serve it using a simple HTTP server:
   ```bash
   npm install -g http-server
   http-server .

3. Open the browser and go to http://127.0.0.1:3000.
