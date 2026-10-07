import LoginForm from "../../components/LoginForm";

function LoginPage() {
  function handleLogin(formData) {
    // TODO: replace this with a real login call
    console.log("Login Submitted:", formData);
  }

  return (
    <div>
      <h1 className="text-2xl font-bold">Login Page</h1>
      <LoginForm onSubmit={handleLogin} />
    </div>
  );
}

export default LoginPage;
