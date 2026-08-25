import { Routes } from '@angular/router';
import { authGuard } from './core/gaurds/auth.guard';
import { adminGuard } from './core/gaurds/admin.guard';

export const routes: Routes = [
  {
    path: 'user-setting',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/user/auth-pages/user-setting/user-setting').then((m) => m.UserSetting),
  },

  {
    path: 'destinations',
    loadComponent: () =>
      import('./features/home/destinations-list/destinations-list').then(
        (m) => m.HomeDestinationsList,
      ),
  },
  {
    path: 'destinations/:destinationId/cities/:cityId',
    loadComponent: () =>
      import('./features/home/city-page/city-page').then((m) => m.CityPage),
  },
  {
    path: 'destinations/:id',
    loadComponent: () =>
      import('./features/home/destination-detail/destination-detail').then(
        (m) => m.HomeDestinationDetail,
      ),
  },
  {
    path: 'tours',
    loadComponent: () =>
      import('./features/home/tours-list/tours-list').then((m) => m.HomeToursList),
  },
  {
    path: 'nile-cruises',
    data: { nileCruisesOnly: true },
    loadComponent: () =>
      import('./features/home/tours-list/tours-list').then((m) => m.HomeToursList),
  },
  {
    path: 'tours/:id',
    loadComponent: () =>
      import('./features/home/tour-page/tour-page').then((m) => m.HomeTourPage),
  },
  {
    path: 'packages',
    loadComponent: () =>
      import('./features/home/packages-list/packages-list').then(
        (m) => m.HomePackagesList,
      ),
  },
  {
    path: 'packages/:id',
    loadComponent: () =>
      import('./features/home/package-page/package-page').then((m) => m.HomePackagePage),
  },
  {
    path: 'configurations',
    canActivate: [adminGuard],
    loadComponent: () => import('./features/configurations/configurations-page').then((m) => m.ConfigurationsPage),
    children: [
      {
        path: 'destinations',
        canActivate: [adminGuard],
        loadComponent: () =>
          import('./features/configurations/destinations/destinations-page').then((m) => m.Destinations),
      },
      {
        path: 'tours',
        canActivate: [adminGuard],
        loadComponent: () => import('./features/configurations/tours/tours-page').then((m) => m.Tours),
      },
      {
        path: 'packages',
        canActivate: [adminGuard],
        loadComponent: () => import('./features/configurations/packages/packages-page').then((m) => m.Packages),
      },
      {
        path: 'hotels',
        canActivate: [adminGuard],
        loadComponent: () => import('./features/configurations/hotels/hotels-page').then((m) => m.Hotels),
      },
      {
        path: 'airlines',
        canActivate: [adminGuard],
        loadComponent: () => import('./features/configurations/airlines/airlines-page').then((m) => m.Airlines),
      },
      {
        path: 'flights',
        canActivate: [adminGuard],
        loadComponent: () => import('./features/configurations/flights/flights-page').then((m) => m.Flights),
      },
      {
        path: 'cities',
        canActivate: [adminGuard],
        loadComponent: () => import('./features/configurations/cities/cities-page').then((m) => m.Cities),
      },
      {
        path: 'customers',
        canActivate: [adminGuard],
        loadComponent: () => import('./features/configurations/customers/customers-page').then((m) => m.Customers),
      },
      {
        path: 'tasks',
        canActivate: [adminGuard],
        loadComponent: () => import('./features/configurations/tasks/tasks-page').then((m) => m.Tasks),
      },
      {
        path: 'quotations',
        canActivate: [adminGuard],
        loadComponent: () => import('./features/configurations/quotations/quotations-page').then((m) => m.Quotations),
      },
      {
        path: 'blogs',
        canActivate: [adminGuard],
        loadComponent: () => import('./features/configurations/blogs/blogs-page').then((m) => m.Blogs),
      },
      {
        path: 'invoices',
        canActivate: [adminGuard],
        loadComponent: () => import('./features/configurations/invoices/invoices-page').then((m) => m.Invoices),
      },
      {
        path: 'vouchers',
        canActivate: [adminGuard],
        loadComponent: () => import('./features/configurations/vouchers/vouchers-page').then((m) => m.Vouchers),
      },
      {
        path: 'bookings',
        canActivate: [adminGuard],
        loadComponent: () =>
          import('./features/configurations/bookings/bookings-page').then((m) => m.Bookings),
      },
      {
        path: 'contact-messages',
        canActivate: [adminGuard],
        loadComponent: () =>
          import('./features/configurations/contact-messages/contact-messages-page').then(
            (m) => m.ContactMessages,
          ),
      },
      {
        path: 'agent-booking-manager',
        redirectTo: 'bookings',
      },

      {path:'',redirectTo:'destinations',pathMatch:'full'}
    ],
  },

  {
    path: 'account/activate',
    loadComponent: () =>
      import('./features/user/auth-pages/activate-page/activate-page').then((m) => m.ActivatePage),
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./features/user/auth-pages/login-page/login-page').then((m) => m.LoginPage),
  },
  {
    path: 'signup',
    loadComponent: () =>
      import('./features/user/auth-pages/signup-page/signup-page').then((m) => m.SignupPage),
  },
  {
    path: 'signup-success',
    loadComponent: () =>
      import('./features/user/auth-pages/signup-success/signup-success').then((m) => m.SignupSuccess),
  },
  {
    path: 'forgot-password',
    loadComponent: () =>
      import('./features/user/auth-pages/forgot-password/forgot-password').then(
        (m) => m.ForgotPassword,
      ),
  },
  {
    path: 'reset-password',
    loadComponent: () =>
      import('./features/user/auth-pages/reset-password/reset-password').then((m) => m.ResetPassword),
  },
  { path: 'home', loadComponent: () => import('./features/home/home').then((m) => m.Home) },
  {
    path: 'user-profile',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/user/user-account/user-account').then((m) => m.UserAccount),
  },
  {
    path: 'user-booking',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/user/user-booking/user-booking').then((m) => m.UserBooking),
  },


 
  
  {
    path: 'aboutus',
    loadComponent: () => import('./features/innerpages/about-us/about-us').then((m) => m.AboutUs),
  },

  {
    path: 'user-payment',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/innerpages/my-account/user-payment/user-payment').then((m) => m.UserPayment),
  },
  {
    path: 'user-invoice',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/innerpages/my-account/user-invoice/user-invoice').then((m) => m.UserInvoice),
  },
  {
    path: 'user-social',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/innerpages/my-account/user-social/user-social').then((m) => m.UserSocial),
  },
  {
    path: 'user-notification',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/innerpages/my-account/user-notification/user-notification').then(
        (m) => m.UserNotification,
      ),
  },
  {
    path: 'helpcenter',
    loadComponent: () =>
      import('./features/innerpages/helpcenter/helpcenter-page/helpcenter-page').then(
        (m) => m.HelpcenterPage,
      ),
  },
  {
    path: 'helpcenter-faqs',
    loadComponent: () =>
      import('./features/innerpages/helpcenter/helpcenter-faqs/helpcenter-faqs').then(
        (m) => m.HelpcenterFaqs,
      ),
  },
  {
    path: 'helpcenter-guides',
    loadComponent: () =>
      import('./features/innerpages/helpcenter/helpcenter-guides/helpcenter-guides').then(
        (m) => m.HelpcenterGuides,
      ),
  },
  {
    path: 'helpcenter-support',
    loadComponent: () =>
      import('./features/innerpages/helpcenter/helpcenter-support/helpcenter-support').then(
        (m) => m.HelpcenterSupport,
      ),
  },

  {
    path: 'terms',
    loadComponent: () => import('./features/innerpages/utility/terms/terms').then((m) => m.Terms),
  },
  {
    path: 'privacy',
    loadComponent: () =>
      import('./features/innerpages/utility/privacy/privacy').then((m) => m.Privacy),
  },
  {
    path: 'contact',
    loadComponent: () =>
      import('./features/innerpages/contact-page/contact-page').then((m) => m.ContactPage),
  },
 
  {
    path: 'blogs/:id',
    loadComponent: () => import('./features/innerpages/blog/blog-detail/blog-detail').then((m) => m.BlogDetail),
  },
  {
    path: 'blogs',
    loadComponent: () => import('./features/innerpages/blog/blog-page/blog-page').then((m) => m.BlogPage),
  },
  {
    path: 'blog-standard',
    loadComponent: () =>
      import('./features/innerpages/blog/blog-standard/blog-standard').then((m) => m.BlogStandard),
  },
  {
    path: 'blog-detail',
    redirectTo: 'blogs',
  },

  { path: '**', redirectTo: 'home', pathMatch: 'full' },
];
