export default function ({ store, redirect }) {
    const isOnboardingDone = store.getters.loggedInUser?.isOnboardingDone;
    if (isOnboardingDone) return redirect("/dashboard");
  }
