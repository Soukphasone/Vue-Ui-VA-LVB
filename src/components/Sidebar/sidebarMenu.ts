export const menuIcon = [
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
  },
  {
    icon: `<svg
    xmlns="http://www.w3.org/2000/svg"
    class="w-6 h-6 fill-current"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    stroke-width="2"
  >
    <!-- User head -->
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      d="M16 7a4 4 0 11-8 0 4 4 0 018 0z"
    />
    <!-- User shoulders -->
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      d="M12 14c-4.418 0-8 2.239-8 5v1h8m0-6c4.418 0 8 2.239 8 5v1h-8"
    />
    <!-- Plus sign -->
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      d="M19 8v4m2-2h-4"
    />
  </svg>`,
    label: 'Registration',
  },
  {
    icon: `<svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    class="w-6 h-6"
  >
    <!-- Document/List shape -->
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"
    />
  </svg>`,
    label: 'Add Customer Service',
  },
  {
    icon: `<svg
    xmlns="http://www.w3.org/2000/svg"
    class="w-6 h-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    stroke-width="2"
  >
    <!-- Person icon -->
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      d="M5.121 17.804A4.992 4.992 0 0112 15a4.992 4.992 0 016.879 2.804M15 11a3 3 0 11-6 0 3 3 0 016 0z"
    />
    <!-- List icon -->
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      d="M4 6h16M4 10h16M4 14h16"
    />
  </svg>`,
    label: 'Customer List',
  },
  {
    icon: `<svg 
    xmlns="http://www.w3.org/2000/svg" 
    class="w-6 h-6"
    fill="none" 
    viewBox="0 0 24 24" 
    stroke="currentColor"
  >
    <!-- Shield body -->
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
      d="M12 1l9 4v6c0 5-3.582 9.4-9 11-5.418-1.6-9-6-9-11V5l9-4z" 
    />
    <!-- Check mark for authorization -->
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
      d="M9 12l2 2l4-4" 
    />
  </svg>`,
    label: 'Authorization',
  }
]
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
    class="w-6 h-6 fill-current"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    stroke-width="2"
  >
    <!-- User head -->
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      d="M16 7a4 4 0 11-8 0 4 4 0 018 0z"
    />
    <!-- User shoulders -->
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      d="M12 14c-4.418 0-8 2.239-8 5v1h8m0-6c4.418 0 8 2.239 8 5v1h-8"
    />
    <!-- Plus sign -->
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      d="M19 8v4m2-2h-4"
    />
  </svg>`,
        label: 'Vitrual Account',
        route: '#',
        children: [
          { label: 'Registration', route: '/register' },
          { label: 'Map VA', route: '/map-va' },
          { label: 'Customer List', route: '/customer-list' }
        ]
      },
      //     {
      //       icon: `<svg
      //   xmlns="http://www.w3.org/2000/svg"
      //   class="w-6 h-6"
      //   fill="none"
      //   viewBox="0 0 24 24"
      //   stroke="currentColor"
      //   stroke-width="1.5"
      // >
      //   <!-- User icon -->
      //   <circle cx="5" cy="7" r="2" />
      //   <!-- First line -->
      //   <line x1="10" y1="6" x2="20" y2="6" stroke-linecap="round" />
      //   <!-- Second user -->
      //   <circle cx="5" cy="12" r="2" />
      //   <line x1="10" y1="11" x2="20" y2="11" stroke-linecap="round" />
      //   <!-- Third user -->
      //   <circle cx="5" cy="17" r="2" />
      //   <line x1="10" y1="16" x2="20" y2="16" stroke-linecap="round" />
      // </svg>`,
      //       label: 'Map VA',
      //       route: '/map-va'
      //       // children: [{ label: 'Home', route: '/' }]
      //     },
      //     {
      //       icon: `<svg
      //   xmlns="http://www.w3.org/2000/svg"
      //   class="w-6 h-6"
      //   fill="none"
      //   viewBox="0 0 24 24"
      //   stroke="currentColor"
      //   stroke-width="1.5"
      // >
      //   <!-- User icon -->
      //   <circle cx="5" cy="7" r="2" />
      //   <!-- First line -->
      //   <line x1="10" y1="6" x2="20" y2="6" stroke-linecap="round" />
      //   <!-- Second user -->
      //   <circle cx="5" cy="12" r="2" />
      //   <line x1="10" y1="11" x2="20" y2="11" stroke-linecap="round" />
      //   <!-- Third user -->
      //   <circle cx="5" cy="17" r="2" />
      //   <line x1="10" y1="16" x2="20" y2="16" stroke-linecap="round" />
      // </svg>`,
      //       label: 'Customer List',
      //       route: '/customer-list'
      //       // children: [{ label: 'Home', route: '/' }]
      //     },
      {
        icon: `<svg
    xmlns="http://www.w3.org/2000/svg"
    class="w-6 h-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    stroke-width="1.5"
  >
    <!-- User icon -->
    <circle cx="5" cy="7" r="2" />
    <!-- First line -->
    <line x1="10" y1="6" x2="20" y2="6" stroke-linecap="round" />
    <!-- Second user -->
    <circle cx="5" cy="12" r="2" />
    <line x1="10" y1="11" x2="20" y2="11" stroke-linecap="round" />
    <!-- Third user -->
    <circle cx="5" cy="17" r="2" />
    <line x1="10" y1="16" x2="20" y2="16" stroke-linecap="round" />
  </svg>`,
        label: 'Authorization',
        route: '/authorization'
        // children: [{ label: 'Home', route: '/' }]
      }
    ]
  }
]
