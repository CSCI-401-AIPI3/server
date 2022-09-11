# 401 Backend Server

## Setup

You'll need two terminal instances, one for backend, one for docker servers.

Backend instance:

```bash
npm install
npm start
```

Docker container instance:

```bash
docker-compose up
```

Create an .env file with the necessary variables.

## Database Population Through Running

Simply running `npm start` with `NODE_ENV=dev` set will set up the database according to `initDatabase()` function in the `sr/cdb/helpers.ts` file.

If you make changes to the database structure or data (ie. changing columns, tables, etc.) you will need to rebuild the database:
```bash
# stop the docker-compose environment if not done
sudo rm -rf data/
docker-compose up
```

## Database Population Without Running

**NOTE: MIGRATION FILES ARE NOT ACTIVELY UPDATED! USE THE ABOVE METHOD INSTEAD**
Run the following commands to fill tables with data for testing/demonstration purposes.

```bash
# note: you may need to run `npx tsc` if you updated a .ts file
npx sequelize db:migrate
npx sequelize db:seed:all
```

You can run the below command to wipe out the populated data (or see Teardown section below).

```bash
npx sequelize db:migrate:undo:all
```

## Teardown

You can run the `clean.sh` script with sudo permissions, which will wipe the composed container and the SQL data.

Feel free to pick out and adjust the commands to suit your needs.
