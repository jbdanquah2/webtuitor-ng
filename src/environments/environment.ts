// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,

  api: {
    apiUrl: "http://localhost:3000",
    login: "http://localhost:3000/auth/login",
    createUser: "http://localhost:3000/users",
    updateUser: "http://localhost:3000/users",

    createHowto: "http://localhost:3000/howtos",
    getHowtos: "http://localhost:3000/howtos",
    getHowto: "http://localhost:3000/howtos",
    editHowto: "http://localhost:3000/howtos",
    deleteHowto: "http://localhost:3000/howtos",

    createCourse: "http://localhost:3000/courses",
    getCourses: "http://localhost:3000/courses",
    getCourse: "http://localhost:3000/courses",
    editCourse: "http://localhost:3000/courses",
    deleteCourse: "http://localhost:3000/courses",

    createLesson: "http://localhost:3000/lessons",
    getLessons: "http://localhost:3000/lessons",
    getLesson: "http://localhost:3000/lessons",
    editLesson: "http://localhost:3000/lessons",
    deleteLesson: "http://localhost:3000/lessons"
  }
};
