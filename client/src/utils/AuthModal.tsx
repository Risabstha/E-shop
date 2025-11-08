import { Link } from "react-router-dom";
import type { ReactElement } from "react";

interface AuthModalProps {
  modal_title: string;
  isRegister: boolean;
  modal_width: string;
  children: ReactElement;
}

const AuthModal: React.FC<AuthModalProps> = ({
  modal_title,
  isRegister,
  modal_width,
  children,
}) => {
  return (
    <div
      className={` ${modal_width} flex flex-col max-h-[45rem] font-sans rounded-md shadow-md bg-white`}
    >
      <h2 className="text-[#1E3A8A] text-center text-xl w-full font-semibold py-6 px-10">
        {modal_title}
      </h2>

      {children}

      <div className="pb-6 pt-3 px-10 flex flex-col gap-2 ">
        {isRegister ? (
          <p className="text-[#333333] text-center">
            Already have an account?{" "}
            <Link to="/login" className="text-orange-600 hover:text-orange-400">
              Login
            </Link>
          </p>
        ) : (
          <p className="text-[#333333] text-center">
            Doesn't have an account?{" "}
            <Link
              to="/register"
              className="text-orange-600 hover:text-orange-400"
            >
              Register
            </Link>
          </p>
        )}

        <p className="text-[#333333] text-center">or, Continue with Google</p>
      </div>
    </div>
  );
};

export default AuthModal;
