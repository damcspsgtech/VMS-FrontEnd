export default {
  items: [
    {
      name: 'Dashboard',
      url: '/dashboard',
      icon: 'icon-speedometer',
      badge: {
        variant: 'info',
        text: 'NEW',
      },
    },
    {
      title: true,
      name: 'Internship',
      wrapper: {            // optional wrapper object
        element: '',        // required valid HTML5 element tag
        attributes: {}        // optional valid JS object with JS API naming ex: { className: "my-class", style: { fontFamily: "Verdana" }, id: "my-id"}
      },
      class: ''             // optional class names space delimited list for title item ex: "text-center"
    },
    {
      name: 'Students',
      url: '/students ',
      icon: 'icon-graduation',
      children: [
        {
          name: 'Student List',
          url: '/students',
          icon: 'icon-list',
        },
        {
          name: 'Guide Allotment',
          url: '/students/allotment',
          icon: 'icon-user-following',
        },
      ],
    },
    {
      name: 'Faculty',
      url: '/faculty',
      icon: 'icon-people',
    },
    {
      name: 'Mail',
      icon: 'cui-envelope-closed',
      children: [
        {
          name: 'Student Report',
          url: '/mail/student/report',
          icon: 'icon-envelope-open'
        },
        {
          name: 'Faculty Details',
          url: '/mail/faculty_details',
          icon: 'icon-envelope-open'
        },
      ]
    },
    {
      title: true,
      name: 'Administration',
      wrapper: {            // optional wrapper object
        element: '',        // required valid HTML5 element tag
        attributes: {}        // optional valid JS object with JS API naming ex: { className: "my-class", style: { fontFamily: "Verdana" }, id: "my-id"}
      },
      class: ''             // optional class names space delimited list for title item ex: "text-center"
    },

    {
      name: 'Settings',
      url: '/settings',
      icon: 'icon-settings',
    },
  ],
};
