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
      name: 'Guides',
      url: '/guides',
      icon: 'icon-people',
      children: [
        {
          name: 'Guide List',
          url: '/guide/list',
          icon: 'icon-list',
        }
      ]
    },
    {
      name: 'Faculty',
      url: '/users',
      icon: 'icon-user',
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
      url: '/admin/settings',
      icon: 'icon-settings',
    },
  ],
};
