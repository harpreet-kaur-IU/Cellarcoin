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


//user cookies
export const getUserOnBoardFromCookie = () => {
  const cookie = cookies.get('onboardingUser');
  if (!cookie) {
    return null;
  }
  return cookie;
};

export const setUserOnBoardCookie = token => {
  cookies.set('onboardingUser', token);
};

export const removeUserOnBoardCookie = () => cookies.remove('onboardingUser');

//subvendor cookies
export const getSubVendorOnBoardFromCookie = () => {
  const cookie = cookies.get('onboardingSubVendor');
  if (!cookie) {
    return null;
  }
  return cookie;
};

export const setSubVendorBoardCookie = token => {
  cookies.set('onboardingSubVendor', token);
};

export const removeSubVendorOnBoardCookie = () => cookies.remove('onboardingSubVendor');