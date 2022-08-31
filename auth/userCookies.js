import cookies from 'js-cookie';

export const getUserFromCookie = () => {
  const cookie = cookies.get('auth');
  if (!cookie) {
    var obj ={token:null}
    return obj;
  }
  return cookie;
};

export const setUserCookie = user => {
  cookies.set('auth', user, {
    expires: 1 / 24
  });
};

export const removeUserCookie = () => cookies.remove('auth');

export const getOnBoardFromCookie = () => {
  const cookie = cookies.get('onboarding');
  if (!cookie) {
    return null;
  }
  return cookie;
};

export const setOnBoardCookie = token => {
  cookies.set('onboarding', token);
};

export const removeOnBoardCookie = () => cookies.remove('onboarding');

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