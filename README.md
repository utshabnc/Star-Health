# Star Health

https://starhealth.io/

Star Health is a public data analytics platform focused on healthcare. It strives to make available doctor and drug data more accessible to the general public.

![screenshot](public/images/ScreenGrabHomepage.png)

---

## Infrastructure

The platform consists of the following:

- React app hosted on GitHub and deployed on Vercel
- PostgreSQL database
- Serverless functions on Cloud Functions
- Firebase Auth

---

## App

This app is built with:
- [Node.js](https://nodejs.org/en/)
- [React](https://reactjs.org/)
- [Prisma](https://www.prisma.io/)
- [PostgreSQL](https://www.postgresql.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind](https://tailwindcss.com/)
- [Vite](https://vitejs.dev/)
- [Firebase](https://firebase.google.com/docs/reference/node)


---

## Quick Start

Prerequisites:
- [Node.js](https://nodejs.org/en/)
- [Git](https://git-scm.com/)
- Development Environment / IDE ([VSCode](https://code.visualstudio.com/) rec.)

### 1. Clone the project
```
git clone https://github.com/utshabnc/Star-Health.git
```

### 2. Install packages
```
npm install
```

### 3. Start the app
```
npx vite dev
```

### 4. Once started, the app is accessible on the given port
```
  VITE v3.0.9  ready in 217 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

---

## Development

The app is structured roughly as follows:
```
root
|_ functions/
|  |_ prisma/
|  |  |_ schema.prisma
|  |_ src/
|  |  |_ doctor.ts, manufacturer.ts...
|  |_ package.json
|
|_ src/
|  |_ components/
|  |_ pages/
|  |  |_ DoctorDetials/, DoctorReviews/...
|  |_ utils/
|  |_ ...
|
|_ index.html
|_ package.json
|_ ...config/env files (TypeScript, Vite, etc.)
```

To make changes to the code, create a new branch for the patch and open a PR to merge it into `main` when ready.

---

## Migration from GCP

The goal of this effort is to move out of GCP in favor of more modular, light-weight solutions like GitHub and Vercel.

The codebase, database, authorization, app and function deployements were initially built for, and hosted on GCP + Firebase:

![legacy infrastructure](public/images/InfraDiagramLegacy.png)

(Nov 8, '22) The code and app deployments have been moved to GitHub and Vercel:

![current infrastructure](public/images/InfraDiagramCurrent.png)

Some suggestions for further solutions:
- PlanetScale or Railway to house the data
- Serverless functions on Vercel
- NextJS for NextAuth (and other benefits)