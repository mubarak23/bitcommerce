const Rest = {
  STATUS: 'status',
  MESSAGE : 'message',
  ERRORS : 'errors',
  DATA : 'data',

  TOKEN : 'token',
  JWT_TIMEOUT : 604800,             // 7 days
  JWT_REFRESH_TIMEOUT : 2592000,    // 30 days
}

export const Paths = {
  FIREBASE: '/firebase',  
  ACCESS: '/access',
  ONBOARDING: '/onboarding',
  PROFILE: '/profile',
  MISCELLANEOUS: '/miscellaneous',
  SIGNUP: '/signup',
  ADMINS: '/admins',
}


export default Rest
