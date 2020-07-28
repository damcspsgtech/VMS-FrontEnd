
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
                name: 'Profile',
                icon: 'cui-envelope-closed',
                url: '/studentInfoForm',
            },
            {
                name: 'Project Details',
                url: '/studentProjectForm',
                icon: 'cui-envelope-closed',
            },
            // {
            //     name: 'Report Form',
            //     url: '/mail/faculty_details',
            //     icon: 'cui-envelope-closed',
            // },


        ]
    }
}