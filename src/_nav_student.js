
module.exports = (count) => {
    return {
        items: [
            {
                title: true,
                name: 'Account',
                wrapper: {            // optional wrapper object
                  element: '',        // required valid HTML5 element tag
                  attributes: {}        // optional valid JS object with JS API naming ex: { className: "my-class", style: { fontFamily: "Verdana" }, id: "my-id"}
                },
                class: ''             // optional class names space delimited list for title item ex: "text-center"
              },
              {
                name: 'Dashboard',
                icon: 'icon-speedometer',
                url: '/studentHome',
            },
            {
                name: 'Profile',
                icon: 'icon-user',
                url: '/studentInfoForm',
            },
            {
                name: 'Project Details',
                icon: 'fa fa-laptop',
                url: '/studentProjectForm',
               
            },
            // {
            //     name: 'Report Form',
            //     url: '/mail/faculty_details',
            //     icon: 'cui-envelope-closed',
            // },


        ]
    }
}