# Inout-Backend

## Setup

- Copy the .env.example file
```bash
cp .env.example .env

# Make sure to have a good look at `.env` file
# and setup environment varibles
```

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