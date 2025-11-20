Here is the **README.md in pure Markdown language**, clean and GitHub-ready.

---

```markdown
# Relational Node App (PostgreSQL + MySQL + Express)

This project is a Node.js web application built with Express.  
It demonstrates relational database connectivity with PostgreSQL and MySQL using Sequelize.  
The app serves a static frontend and exposes separate API routes for PostgreSQL and MySQL.

The application is containerized using Docker and deployed on AWS ECS Fargate behind an Application Load Balancer (ALB).

---

## Features

- Express web server
- PostgreSQL routes
- MySQL (Sequelize) routes
- Health check endpoint for load balancers
- Serves static frontend
- Dockerized and deployable on ECS Fargate
- ALB ready (port 3000)

---

## Project Structure

```

.
├── index.js
├── Dockerfile
├── public/
├── databases/
│   ├── postgres.js
│   ├── sequalize.js
├── package.json
├── .env.local

```

---

## Environment Variables

Create a `.env.local` file:

```

PORT=3000

POSTGRES_HOST=
POSTGRES_USER=
POSTGRES_PASSWORD=
POSTGRES_DB=

MYSQL_HOST=
MYSQL_USER=
MYSQL_PASSWORD=
MYSQL_DB=

```

---

## Run Locally

Install dependencies:

```

npm install

```

Start server:

```

npm start

```

App runs at:

```

[http://localhost:3000](http://localhost:3000)

```

---

## Docker Build and Run

Build the Docker image:

```

docker build -t relational-node .

```

Run the container:

```

docker run -p 3000:3000 relational-node

```

---

## Health Check

Endpoint for ALB health verification:

```

GET /health

```

Returns:

```

200 OK

```

---

## AWS ECS Fargate Deployment

Architecture overview:

1. Application Load Balancer (ALB)
2. Target Group (port 3000)
3. ECS Service (Fargate tasks)
4. Task Definition (containerPort: 3000)
5. Security Groups  
   - ALB SG: allows port 80 from internet  
   - ECS SG: allows port 3000 from ALB SG only  

---

## Auto Scaling

Example ECS service auto-scaling:

- Minimum tasks: 1  
- Maximum tasks: 3  
- Target CPU utilization: 50%  

---

## License

This project is for educational and training purposes.
```
