import { signIn } from "next-auth/react";

export default function Login() {
  return (
    <div className="h-screen w-full items-center justify-center bg-black text-yellow-400">
      <div
        className="btn btn-primary"
        onClick={() => {
          void signIn();
        }}
      >
        login
      </div>
    </div>
  );
}
