export const menuGroups = [
  {
    name: 'MENU',
    menuItems: [
      {
        icon: `<svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="24"
                      height="24"
                      fill="none"
                      class="fill-current"
                    >
                      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
                    </svg>`,
        label: 'Home',
        route: '/'
        // children: [{ label: 'Home', route: '/' }]
      },
      {
        icon: `<svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      width="24"
                      height="20"
                    >
                      <path
                        d="M6 2H18a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z"
                      ></path>
                      <path d="M6 2v20"></path>
                      <path d="M18 2v20"></path>
                      <path d="M6 6h12"></path>
                      <path d="M6 10h12"></path>
                      <path d="M6 14h12"></path>
                    </svg>`,
        label: 'Statement',
        route: '/statement'
        // children: [{ label: 'Change Password', route: 'change-password' }]
      }
    ]
  }
]
