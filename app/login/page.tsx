// app/login/page.tsx
import LoginForm from "../components/LoginForm";

export default function LoginPage() {
  return (
    <div style={{ maxWidth: '400px', margin: '0 auto', padding: '2rem' }}>
      <h2>Login</h2>
      <LoginForm />
    </div>
  );
}
