import { Routes } from '@angular/router';
import { adminGuard } from './core/gaurds/admin.guard';
import { authGuard } from './core/gaurds/auth.guard';

export const routes: Routes = [
  {
    path: 'user-setting',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/user/auth-pages/user-setting/user-setting').then((m) => m.UserSetting),
  },

  {
    path: 'destinations',
    loadComponent: () =>
      import('./pages/destinations-list/destinations-list').then((m) => m.DestinationsList),
  },
  {
    path: 'admin',
    canActivate: [adminGuard],
    loadComponent: () => import('./pages/admin/admin-page').then((m) => m.AdminPage),
    children: [
      {
        path: 'destinations',
        canActivate: [adminGuard],
        loadComponent: () =>
          import('./pages/admin/destinations/destinations-page').then((m) => m.Destinations),
      },
      {
        path: 'tours',
        canActivate: [adminGuard],
        loadComponent: () => import('./pages/admin/tours/tours-page').then((m) => m.Tours),
      },
      {
        path: 'admin/packages',
        canActivate: [adminGuard],
        loadComponent: () => import('./pages/admin/packages/packages-page').then((m) => m.Packages),
      },

      {path:'',redirectTo:'destinations',pathMatch:'full'}
    ],
  },

  {
    path: 'account/activate',
    loadComponent: () =>
      import('./pages/user/auth-pages/activate-page/activate-page').then((m) => m.ActivatePage),
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/user/auth-pages/login-page/login-page').then((m) => m.LoginPage),
  },
  {
    path: 'signup',
    loadComponent: () =>
      import('./pages/user/auth-pages/signup-page/signup-page').then((m) => m.SignupPage),
  },
  {
    path: 'signup-success',
    loadComponent: () =>
      import('./pages/user/auth-pages/signup-success/signup-success').then((m) => m.SignupSuccess),
  },
  {
    path: 'forgot-password',
    loadComponent: () =>
      import('./pages/user/auth-pages/forgot-password/forgot-password').then(
        (m) => m.ForgotPassword,
      ),
  },
  {
    path: 'reset-password',
    loadComponent: () =>
      import('./pages/user/auth-pages/reset-password/reset-password').then((m) => m.ResetPassword),
  },
  { path: 'home', loadComponent: () => import('./pages/home/home').then((m) => m.Home) },
  {
    path: 'user-profile',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/user/user-account/user-account').then((m) => m.UserAccount),
  },
  {
    path: 'user-booking',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/user/user-booking/user-booking').then((m) => m.UserBooking),
  },

  {
    path: 'index-two',
    loadComponent: () => import('./pages/index/index-two/index-two').then((m) => m.IndexTwo),
  },
  {
    path: 'index-three',
    loadComponent: () => import('./pages/index/index-three/index-three').then((m) => m.IndexThree),
  },
  {
    path: 'index-four',
    loadComponent: () => import('./pages/index/index-four/index-four').then((m) => m.IndexFour),
  },
  {
    path: 'index-five',
    loadComponent: () => import('./pages/index/index-five/index-five').then((m) => m.IndexFive),
  },
  {
    path: 'grid',
    loadComponent: () =>
      import('./pages/innerpages/listing/tour-grid/grid-page/grid-page').then((m) => m.GridPage),
  },
  {
    path: 'grid-right-sidebar',
    loadComponent: () =>
      import('./pages/innerpages/listing/tour-grid/grid-right-sidebar/grid-right-sidebar').then(
        (m) => m.GridRightSidebar,
      ),
  },
  {
    path: 'grid-left-sidebar',
    loadComponent: () =>
      import('./pages/innerpages/listing/tour-grid/grid-left-sidebar/grid-left-sidebar').then(
        (m) => m.GridLeftSidebar,
      ),
  },
  {
    path: 'list',
    loadComponent: () =>
      import('./pages/innerpages/listing/tour-list/list-page/list-page').then((m) => m.ListPage),
  },
  {
    path: 'list-left-sidebar',
    loadComponent: () =>
      import('./pages/innerpages/listing/tour-list/list-left-sidebar/list-left-sidebar').then(
        (m) => m.ListLeftSidebar,
      ),
  },
  {
    path: 'list-right-sidebar',
    loadComponent: () =>
      import('./pages/innerpages/listing/tour-list/list-right-sidebar/list-right-sidebar').then(
        (m) => m.ListRightSidebar,
      ),
  },
  {
    path: 'tour-detail-one',
    loadComponent: () =>
      import('./pages/innerpages/listing/tour-detail/tour-detail-one/tour-detail-one').then(
        (m) => m.TourDetailOne,
      ),
  },
  {
    path: 'tour-detail-two',
    loadComponent: () =>
      import('./pages/innerpages/listing/tour-detail/tour-detail-two/tour-detail-two').then(
        (m) => m.TourDetailTwo,
      ),
  },
  {
    path: 'aboutus',
    loadComponent: () => import('./pages/innerpages/about-us/about-us').then((m) => m.AboutUs),
  },
  {
    path: 'user-billing',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/innerpages/my-account/user-billing/user-billing').then((m) => m.UserBilling),
  },
  {
    path: 'user-payment',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/innerpages/my-account/user-payment/user-payment').then((m) => m.UserPayment),
  },
  {
    path: 'user-invoice',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/innerpages/my-account/user-invoice/user-invoice').then((m) => m.UserInvoice),
  },
  {
    path: 'user-social',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/innerpages/my-account/user-social/user-social').then((m) => m.UserSocial),
  },
  {
    path: 'user-notification',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/innerpages/my-account/user-notification/user-notification').then(
        (m) => m.UserNotification,
      ),
  },
  {
    path: 'helpcenter',
    loadComponent: () =>
      import('./pages/innerpages/helpcenter/helpcenter-page/helpcenter-page').then(
        (m) => m.HelpcenterPage,
      ),
  },
  {
    path: 'helpcenter-faqs',
    loadComponent: () =>
      import('./pages/innerpages/helpcenter/helpcenter-faqs/helpcenter-faqs').then(
        (m) => m.HelpcenterFaqs,
      ),
  },
  {
    path: 'helpcenter-guides',
    loadComponent: () =>
      import('./pages/innerpages/helpcenter/helpcenter-guides/helpcenter-guides').then(
        (m) => m.HelpcenterGuides,
      ),
  },
  {
    path: 'helpcenter-support',
    loadComponent: () =>
      import('./pages/innerpages/helpcenter/helpcenter-support/helpcenter-support').then(
        (m) => m.HelpcenterSupport,
      ),
  },

  {
    path: 'terms',
    loadComponent: () => import('./pages/innerpages/utility/terms/terms').then((m) => m.Terms),
  },
  {
    path: 'privacy',
    loadComponent: () =>
      import('./pages/innerpages/utility/privacy/privacy').then((m) => m.Privacy),
  },
  {
    path: 'contact',
    loadComponent: () =>
      import('./pages/innerpages/contact-page/contact-page').then((m) => m.ContactPage),
  },
  {
    path: 'comingsoon',
    loadComponent: () =>
      import('./pages/innerpages/special-pages/comingsoon-page/comingsoon-page').then(
        (m) => m.ComingsoonPage,
      ),
  },
  {
    path: 'maintenance',
    loadComponent: () =>
      import('./pages/innerpages/special-pages/maintenance-page/maintenance-page').then(
        (m) => m.MaintenancePage,
      ),
  },
  {
    path: 'blogs',
    loadComponent: () =>
      import('./pages/innerpages/blog/blog-page/blog-page').then((m) => m.BlogPage),
  },
  {
    path: 'blog-standard',
    loadComponent: () =>
      import('./pages/innerpages/blog/blog-standard/blog-standard').then((m) => m.BlogStandard),
  },
  {
    path: 'blog-detail',
    loadComponent: () =>
      import('./pages/innerpages/blog/blog-detail/blog-detail').then((m) => m.BlogDetail),
  },

  { path: '**', redirectTo: 'home', pathMatch: 'full' },
];
