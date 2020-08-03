const rules = {
    student: {
      static: [ "/studentInfoForm-page:visit",
      "/studentProjectForm-page:visit",
    "/studentHome-page:visit"]
    },
    tutor: {
      static: [
        "/home-page:visit",
        "/dashboard-page:visit",
        "/guides-page:visit",
        "/students-page:visit",
        "/allotment-page:visit",
        "/page404-page:visit"
      ],
    },
    admin: {
      static: [
        "/settings-page:visit",
        "/home-page:visit",
        "/dashboard-page:visit",
        "/faculty-page:visit",
        "/students-page:visit",
      ]
    }
  };
  
  export default rules;