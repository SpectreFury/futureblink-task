# FutureBlink Task

This is a application made as a task for FutureBlink

## Installation

- Git clone the repo
- npm install inside both client and server directory
- npm run dev inside both client and server directory

## Environment Variables

### Client

client/.env

VITE_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
VITE_SERVER_URL=

### Server

server/.env

PORT=
MONGODB_URI=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GOOGLE_REFRESH_TOKEN=

## Features

- Authentication - Bonus Points
- Add Ability to select a sequence
- Ability to add lead nodes, cold mail nodes, delay nodes
- Rich text email editor to create a template
- Nodemailer and agenda used on the backend to mail using Gmail OAuth
- Emails will be sent according to delays sent on the client
