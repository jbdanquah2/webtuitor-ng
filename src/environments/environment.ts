// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,

  api: {
    login: "http://localhost:3000/auth/login",
    createUser: "http://localhost:3000/users",
    updateUser: "http://localhost:3000/users",

    createHowto: "http://localhost:3000/howtos",
  }
};
