export default function ({ store, redirect }) {
  // If the user is not authenticated
  console.log("here");
  const isOnboardingDone = store.getters.loggedInUser?.isOnboardingDone;
  if (!store.getters.isAuthenticated) {
    return redirect("/auth/auth");
  } else {
  console.log("in here");
    if (!isOnboardingDone) return redirect("/onboarding");
  }
}
