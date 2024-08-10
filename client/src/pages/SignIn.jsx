import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signInStart, signInSuccess, signInFailure } from "../redux/user/userSlice.js";
import OAuth from "../components/OAuth.jsx";

const SignIn = () => {
  const { loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleGoogleSignIn = async () => {
    try {
      dispatch(signInStart());
      const res = await fetch("/api/auth/google", { method: "GET" });
      const data = await res.json();

      if (!data.success) {
        dispatch(signInFailure(data.message));
        return;
      }

      dispatch(signInSuccess(data));
      navigate("/");
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-center min-h-screen p-3">
      {}
      <div className="p-3 max-w-lg mx-auto md:w-1/2">
        <h1 className="text-3xl text-center font-semibold my-7">Sign In</h1>
        <div className="flex flex-col gap-4">
          <OAuth onGoogleSignIn={handleGoogleSignIn} loading={loading} />
        </div>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </div>

      {}
      <div className="hidden md:block md:w-1/2">
        <img
          src='../src/assist/home.jpg'
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default SignIn;
