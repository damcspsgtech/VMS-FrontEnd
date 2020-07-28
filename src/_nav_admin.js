
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
    ]
  }
}