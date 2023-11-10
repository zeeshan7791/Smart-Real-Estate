// import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
// import { app } from "../firebase";
const OAuth = () => {
  const handleGoogleClick = async () => {
    try {
      // const provider = new GoogleAuthProvider();
      // const auth = getAuth(app);

      // const result = await signInWithPopup(auth, provider);
      console.log("value in auth res");
    } catch (error) {
      console.log("could not sign in with google", error);
    }
  };
  return (
    <>
      <button
        onClick={handleGoogleClick}
        type="button"
        className="bg-red-700 text-white uppercase rounded-lg p-3 hover:opacity-95"
      >
        Continue with google
      </button>
    </>
  );
};

export default OAuth;
