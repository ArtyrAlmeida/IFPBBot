declare global {
    namespace NodeJS {
      interface ProcessEnv {
        POSITUS_TOKEN: string;
        POSITUS_ENDPOINT: string;
        DF_PROJECT_ID: string;
        DF_CLIENT_EMAIL: string;
        DF_PRIVATE_KEY: string;
      }
    }
  }
  
  // If this file has no import/export statements (i.e. is a script)
  // convert it into a module by adding an empty export statement.
  export {}