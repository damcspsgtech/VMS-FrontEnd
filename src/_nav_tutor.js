
module.exports = (count) => {
  return {
    items: [
      {
        title: true,
        name: 'Dashboard',
        wrapper: {            // optional wrapper object
          element: '',        // required valid HTML5 element tag
          attributes: {}        // optional valid JS object with JS API naming ex: { className: "my-class", style: { fontFamily: "Verdana" }, id: "my-id"}
        },
        class: ''             // optional class names space delimited list for title item ex: "text-center"
      },
      {
        name: 'Dashboard',
        url: '/dashboard',
        icon: 'icon-speedometer',
        badge: {
          variant: 'info',
          text: 'UPDATES',
        },
      },
      {
        name: 'Students',
        url: '/students',
        icon: 'icon-graduation',
        badge: {
          variant: 'info',
          text: count,
        },
      },
      {
        name: 'Faculty',
        url: '/faculty',
        icon: 'icon-people',
      },
      {
        name: 'Guide Allotment',
        url: '/allotment',
        icon: 'icon-user-following',
      },
      {
        title: true,
        name: 'Push Mail',
        wrapper: {            // optional wrapper object
          element: '',        // required valid HTML5 element tag
          attributes: {}        // optional valid JS object with JS API naming ex: { className: "my-class", style: { fontFamily: "Verdana" }, id: "my-id"}
        },
        class: ''             // optional class names space delimited list for title item ex: "text-center"
      },
      {
        name: 'Student Form',
        icon: 'cui-envelope-closed',
        url: '/mail/student/details',
      },
      {
        name: 'Report Form',
        url: '/mail/faculty_details',
        icon: 'cui-envelope-closed',
      },
      {
        name: 'Faculty Form',
        url: '/mail/faculty_details',
        icon: 'cui-envelope-closed',
      },

    
    ]
  }
}