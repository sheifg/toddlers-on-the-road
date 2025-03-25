import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  browserPopupRedirectResolver,
} from "firebase/auth";
import { toast } from "react-toastify";
import { API_URL } from "../constants";
import { getStorageItem } from "../utils/storage";
import { FirebaseUser } from "../types/user";
const firebaseConfig = {
  apiKey: import.meta.env.VITE_apiKey,
  authDomain: import.meta.env.VITE_authDomain,
  projectId: import.meta.env.VITE_projectId,
  storageBucket: import.meta.env.VITE_storageBucket,
  messagingSenderId: import.meta.env.VITE_messagingSenderId,
  appId: import.meta.env.VITE_appId,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
// Add proper configuration to handle popup issues
provider.setCustomParameters({
  prompt: "select_account",
  display: "popup",
});

const signUpProvider = async (
  navigate: (path: string) => void,
  toastMessage: string
): Promise<FirebaseUser> => {
  try {
    const result = await signInWithPopup(
      auth,
      provider,
      browserPopupRedirectResolver
    );
    const { displayName, email, uid } = result.user;

    const firebaseToken = getStorageItem("firebaseToken");

    const response = await fetch(`${API_URL}/api/users/firebase`, {
      // Note the /firebase endpoint
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${firebaseToken}`,
      },
      body: JSON.stringify({
        username: displayName, 
        email,
        provider: "firebase",
        password: uid,
      }),
      credentials: "include",
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to create user");
    }

    const data = await response.json();

    const user = {
      token: data.token,
      ...data.user,
    };
    sessionStorage.setItem("user", JSON.stringify(user));
    toast.success(`${toastMessage}`);
    navigate("/");
    return user;
  } catch (error) {
    console.error("Firebase Auth Error:", error);
    if (error instanceof Error) {
      if (error.message === "auth/popup-closed-by-user") {
        toast.info("Sign-in cancelled");
        return;
      }

      toast.error(error.message);
    }
    sessionStorage.removeItem("token");
    await auth.signOut();
  }
};

export { auth, provider, signUpProvider };
