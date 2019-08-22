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
    icon: 'icmn icmn-chart',
    url: '/analytics',
  },
  {
    title: 'History',
    key: 'history',
    icon: 'icmn icmn-history',
    url: '/history',
  },
  {
    title: 'eCommerce',
    key: 'ecommerce',
    icon: 'icmn icmn-store2',
    children: [
      {
        title: 'Categories',
        key: 'categories',
        url: '/ecommerce/categories',
      },
      {
        title: 'Products',
        key: 'products',
        url: '/ecommerce/products',
      },
      {
        title: 'Orders',
        key: 'orders',
        url: '/ecommerce/orders',
      }
    ],
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
