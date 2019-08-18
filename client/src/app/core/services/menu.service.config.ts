export const getLeftMenuData: any[] = [
  {
    title: 'Dashboard',
    key: 'dashboard',
    icon: 'icmn icmn-meter',
    url: '/dashboard',

  },
  {
    title: 'Analytics',
    key: 'analytics',
    icon: 'icmn icmn-stats-bars',
    url: '/analytics',
  },
  {
    title: 'History',
    key: 'history',
    icon: 'icmn icmn-history',
    url: '/history',
  },
  {
    title: 'Add Order',
    key: 'addOrder',
    icon: 'icmn icmn-plus-circle',
    url: '/order/new',
  },
  {
    title: 'Positions',
    key: 'positions',
    icon: 'icmn icmn-store2',
    url: '/positions',
  },
  {
    divider: true,
  },
  {
    title: 'Settings',
    key: 'settings',
    icon: 'icmn icmn-cog utils__spin-delayed--pseudo-selector',
  }
]
export const getTopMenuData: any[] = [
  {
    title: 'Settings',
    key: 'settings',
    icon: 'icmn icmn-cog utils__spin-delayed--pseudo-selector',
  },
  {
    title: 'Pages',
    key: 'pages',
    icon: 'icmn icmn-stack',
    children: [
      {
        title: 'Dashboard',
        key: 'dashboard',
        url: '/dashboard',
      },
      {
        title: 'Analytics',
        key: 'analytics',
        url: '/analytics',
      },
      {
        title: 'History',
        key: 'history',
        url: '/history',
      },
      {
        title: 'Add Order',
        key: 'addOrder',
        url: '/order/new',
      },
      {
        title: 'Positions ',
        key: 'positions',
        url: '/positions',
      },
    ],
  },
]
