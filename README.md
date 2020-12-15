# Inout-Backend

## Setup

- Copy the .env.example file
```bash
cp .env.example .env

# Make sure to have a good look at `.env` file
# and setup environment varibles
```

### Development Server

- Create mongodb user (in mongo shell)
```bash
# Copy the command below (inside mongo shell)
db.createUser(
    {
      user: "inout",
      pwd: "password",
      roles: [
         { role: "readWrite", db: "inout" }
      ]
    }
);

# Exit mongo shell
exit;
```

- Install dependencies
```bash
npm install
```
- Start development server
```bash
npm run start:dev
```

### Production Server
- Make sure the `DB_HOST` in `.env` file is set to `db`
- Init app
```bash
docker-compose up --build -d
```