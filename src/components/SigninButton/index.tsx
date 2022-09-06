import styles from "./styles.module.scss";
import { FaGithub } from "react-icons/fa";
import { FiX } from "react-icons/fi";
import { useSession, signIn, signOut } from "next-auth/react"

export function SignInButton() {
  const { status, data: session } = useSession();

  const getSetupButton = (isSession?: string) => {
    if (!isSession || isSession === "loading") {
      return;
    }

    const buttonComponent = { 
    authenticated: {
      color: "#04d361",
      label: [session?.user?.name],
      action: () => signOut(),
    },
    unauthenticated: {
      color: "#eba417",
      label: "Sign in with Github",
      action: () => signIn(),
    },
  }

  return ( 
  <button
    type="button"
    className={styles.signInButton}
    onClick={buttonComponent[isSession].action}
  >
    <FaGithub
      color={buttonComponent[isSession].color}
    />
    {
      buttonComponent[isSession].label
    }
    {
      isSession === "authenticated" &&
        <FiX
          color="#737380"
            className={styles.closeIcon}
        />
    }
  </button>
  )
};

  return getSetupButton(status);
}
