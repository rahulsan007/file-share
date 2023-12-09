# Project Title

File sharing web app project using React and Express with Prisma and PostgreSQL.You can share file with ease with link which may public,private or password protected.

## Authors

- [@rahulsan007](https://github.com/rahulsan007)

## Deployment

To deploy this project you need docker and docker compose install in your device or you can directly run but need to install prostgresql.

```bash
  docker-compose up --build
```

And wait for installation.

if you wanted to run without docker, then follow these steps:

```bash
  cd frontend
```

to go inside the frontend folder.

```bash
  npm install
```

to install the modules.

```bash
  npm run dev
```

to run the project.

```bash
  cd backend
```

to go inside the backend folder.

```bash
  npm install
```

to install the modules.

```bash
  npx prisma generate
```

to generate template code.

```bash
  npx prisma migrate dev --name create-initial-database
```

to create tables in database.

```bash
  npm start
```

to start the project.

### Environment Setup before running project

if you are running project using docker then skip this step. otherwise setup these `.env` file by creating in both frontend and backend folder.

```bash
#.env for backend
DATABASE_URL="postgresql://name:password@localhost:5432/file-share?schema=public"

PORT= 4000

JWT_SECRET="anything"

SALT= "10"
```

```bash
#.env for frontend
VITE_BACKEND_URL="http://localhost:4000"
```

## Screenshots

![App Screenshot](https://github.com/rahulsan007/file-share/blob/main/Screenshot%202023-12-09%20224943.png?raw=true)

![App Screenshot](https://raw.githubusercontent.com/rahulsan007/file-share/main/Screenshot%202023-12-09%20224918.png)

![App Screenshot](https://github.com/rahulsan007/file-share/blob/main/Screenshot%202023-12-09%20224930.png?raw=true)
