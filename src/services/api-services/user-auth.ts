import { supabase } from "../supabase";

export async function SignInWithGithub() {
  try {
    await supabase.auth.signInWithOAuth({
      provider: "github",
    });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Error signing in with GitHub";
    throw new Error("Error signing in with GitHub: " + errorMessage);
  }
}

export async function SignOutUser() {
  try {
    await supabase.auth.signOut();
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Error signing in with GitHub";
    throw new Error("Error signing in with GitHub: " + errorMessage);
  }
}
