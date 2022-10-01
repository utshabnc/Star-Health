import { google } from 'googleapis';

const project = 'starhealth-io';
const instance = 'starhealth';

const changeDatabaseState = async (active: boolean) => {
  const auth = new google.auth.GoogleAuth({
    scopes: [
      'https://www.googleapis.com/auth/cloud-platform',
      'https://www.googleapis.com/auth/sqlservice.admin',
    ],
  });

  const sqladmin = google.sqladmin({ version: 'v1beta4', auth });

  sqladmin.instances.patch({
    project,
    instance,
    requestBody: {
      settings: {
        activationPolicy: active ? 'ALWAYS' : 'NEVER',
      },
    },
  });
};

const cloudSqlDb = {
  start: () => changeDatabaseState(true),
  stop: () => changeDatabaseState(false),
};

export default cloudSqlDb;
