# Star Health

![screenshot](public/images/ScreenGrabHomepage.png)

https://starhealth.io/

Star Health is a health data and analytics platform that strives to make public doctor and drug data more accessible to individuals and organizations.

Tools / frameworks:

- [Node.js](https://nodejs.org/en/)
- [React](https://reactjs.org/)
- [Firebase](https://firebase.google.com/docs/reference/node)
- [Prisma](https://www.prisma.io/)
- [PostgreSQL](https://www.postgresql.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)

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