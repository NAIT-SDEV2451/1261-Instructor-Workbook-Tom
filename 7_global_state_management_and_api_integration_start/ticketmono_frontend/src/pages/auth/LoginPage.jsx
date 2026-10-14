import LoginForm from "../../components/LoginForm";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const { login, isLoggingIn, loginError } = useAuth();
  const navigate = useNavigate();

  function handleLogin(formData) {
    login(formData, {
      onSuccess: () => {
        navigate("/");
      },
    });
  }

  return (
    <div>
      <h1 className="text-2xl font-bold">Login Page</h1>
      {loginError && (
        <div className="alert alert-error">
          <span>{loginError.message}</span>
        </div>
      )}
      <LoginForm onSubmit={handleLogin} isLoading={isLoggingIn} />
    </div>
  );
}

export default LoginPage;
