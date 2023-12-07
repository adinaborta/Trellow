# Trellow

## Integration
I chose to use technologies familiar to me for both the backend and database.

Upon app launch, users are prompted to log in. This authentication process serves one purpose: facilitating board sharing among users. Post-login, users can create an account and access a gallery showcasing their boards. The "Create board" button in the side menu, opens a corresponding form. In the gallery, users can acces one specific board.

I've decided to get the information related to a specific board on its main page: properties, lists, and cards. These elements are mapped onto the board page through distinct components like List and Card.

From the main board page, users can:

1. Manage boards by editing, sharing, or deleting them via the settings.
2. Modify or remove lists directly through the settings of each list.
3. Open each card for a view of the contents, allowing for edits or deletions.


## Technologies
1. Frontend: Next js
2. Backend: Express
3. Database: Postgres

## Usage:

### Frontend
1. cd Frontend
2. npm install
3. npm run dev


### Backend
1. cd Backend
2. npm install
3. npm start

### Database
Using pgadmin
1. Create a new database called: trellow
  This is what the credentials should look like (how they are mapped in the backend):
  host: "localhost",
  user: "postgres",
  database: "trellow",
  password: "password",
  port: "5432",
2. Open Query Editor
3. Copy and paste the 
