import cookies from 'js-cookie';

//onboard cookie
export const getOnBoardFromCookie = () => {
  const cookie = cookies.get('onboardingVendor');
  if (!cookie) {
    return null;
  }
  return cookie;
};

export const setOnBoardCookie = token => {
  cookies.set('onboardingVendor', token);
};

export const removeOnBoardCookie = () => cookies.remove('onboardingVendor');

//admin cookies
export const getAdminOnBoardFromCookie = () => {
  const cookie = cookies.get('onboardingAdmin');
  if (!cookie) {
    return null;
  }
  return cookie;
};

export const setAdminOnBoardCookie = token => {
  cookies.set('onboardingAdmin', token);
};

export const removeAdminOnBoardCookie = () => cookies.remove('onboardingAdmin');