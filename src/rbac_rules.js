const rules = {
    guest: {
      static: ["/dashboard-page:visit", "/home-page:visit"]
    },
    tutor: {
      static: [
        "/home-page:visit",
        "/dashboard-page:visit",
        "/faculty-page:visit",
        "/students-page:visit"
      ],
      dynamic: {
        "/allotment:edit": ({userId, batchTutorId}) => {
          if (!userId || !batchTutorId) return false;
          return userId === batchTutorId;
        }
      }
    },
    admin: {
      static: [
        "/settings-page:visit",
        "/home-page:visit",
        "/dashboard-page:visit",
        "/faculty-page:visit",
        "/students-page:visit"
      ]
    }
  };
  
  export default rules;