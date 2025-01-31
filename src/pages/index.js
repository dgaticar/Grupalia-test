import { useState } from "react";
import { createClient } from "@supabase/supabase-js";
import styles from './login.module.css';  // Asegúrate de tener estos estilos

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLogin, setIsLogin] = useState(true); // Estado para alternar entre login y registro
  const [success, setSuccess] = useState(""); // Mensaje de éxito para registro

  const handleAuth = async (e) => {
    e.preventDefault();
    if (isLogin) {
      // Redirige al usuario a la página de anuncios sin verificar el inicio de sesión
      window.location.href = "/anuncios"; // Cambia esto a la ruta de tu página de anuncios
    } else {
      // Manejo de registro
      const { user, error } = await supabase.auth.signUp({
        email,
        password,
      });
      if (error) {
        setError(error.message);
        setSuccess("");
      } else {
        setSuccess(`Usuario ${user.email} registrado con éxito. Verifica tu correo para activar tu cuenta.`);
        setError("");
        // Puedes redirigir o mostrar un mensaje de éxito
      }
    }
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginBox}>
        <h2>{isLogin ? "Login" : "Sign Up"}</h2>
        <form onSubmit={handleAuth}>
          {error && <p className={styles.errorMessage}>{error}</p>}
          {success && <p className={styles.successMessage}>{success}</p>}
          <div className={styles.inputContainer}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
            />
          </div>
          <div className={styles.inputContainer}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
            />
          </div>
          <button type="submit" className={styles.loginBtn}>
            {isLogin ? "Log in" : "Sign Up"}
          </button>
          <p className={styles.signupLink} onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? "Don't have an account? Sign up" : "Already have an account? Log in"}
          </p>
        </form>
      </div>
    </div>
  );
}
