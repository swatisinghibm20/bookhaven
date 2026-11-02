// Demo-only session flag. There is no real authentication in this front-end
// prototype: this stores a boolean (never credentials) in sessionStorage so the
// "logged in" state survives the full page reload the logo triggers, and is
// cleared automatically when the tab is closed.
const KEY = "bookhaven.loggedIn";

export const isLoggedIn = () => sessionStorage.getItem(KEY) === "true";
export const login = () => sessionStorage.setItem(KEY, "true");
export const logout = () => sessionStorage.removeItem(KEY);

// Where the BookHaven logo should take the user.
export const homePath = () => (isLoggedIn() ? "/catalogue" : "/");
