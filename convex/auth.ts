import GitHub from "@auth/core/providers/github";
import { convexAuth } from "@convex-dev/auth/server";
import { Password } from "@convex-dev/auth/providers/Password";

export const { auth, signIn, signOut, store } = convexAuth({
  // TODO: Add google auth provider
  providers: [Password, GitHub],
});
