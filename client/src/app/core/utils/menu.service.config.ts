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
    title: 'Profile',
    url: '/profile',
    hidden: true
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
        title: 'New Category',
        url: '/ecommerce/categories/new',
        hidden: true
      },
      {
        title: 'Edit Category',
        url: '/ecommerce/categories/[0-9a-z]+',
        hidden: true
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
      },
      {
        title: 'Order Details',
        url: '/ecommerce/orders/[0-9a-z]+',
        hidden: true
      },
      {
        title: 'New Product',
        url: '/ecommerce/products/new',
        hidden: true
      },
      {
        title: 'Edit Product',
        url: '/ecommerce/products/[0-9a-z]+',
        hidden: true
      },
      {
        title: 'Shopping Cart',
        url: '/ecommerce/cart',
        hidden: true
      },
      {
        title: 'Product Details',
        url: '/ecommerce/product-details/[0-9a-z]+',
        hidden: true
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
        title: 'eCommerce',
        key: 'ecommerce',
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
    ],
  },
]
