import React, { useState } from "react";

interface LoginPageProps {
  onLogin: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [acceptPrivacy, setAcceptPrivacy] = useState(false);
  const [captchaAnswer, setCaptchaAnswer] = useState("");
  const [captchaQuestion, setCaptchaQuestion] = useState("");
  const [captchaResult, setCaptchaResult] = useState(0);

  // Función para generar captcha matemático
  const generateCaptcha = () => {
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    const operation = Math.random() > 0.5 ? '+' : '-';
    
    let question = '';
    let result = 0;
    
    if (operation === '+') {
      question = `${num1} + ${num2}`;
      result = num1 + num2;
    } else {
      // Asegurar que el resultado sea positivo
      const larger = Math.max(num1, num2);
      const smaller = Math.min(num1, num2);
      question = `${larger} - ${smaller}`;
      result = larger - smaller;
    }
    
    setCaptchaQuestion(question);
    setCaptchaResult(result);
    setCaptchaAnswer(""); // Limpiar respuesta anterior
  };

  // Generar captcha al cargar el componente
  React.useEffect(() => {
    generateCaptcha();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!acceptPrivacy) {
      alert("Debes aceptar las políticas de privacidad para continuar.");
      return;
    }
    
    if (!captchaAnswer) {
      alert("Debes resolver el captcha para continuar.");
      return;
    }
    
    if (parseInt(captchaAnswer) !== captchaResult) {
      alert("La respuesta del captcha es incorrecta. Inténtalo de nuevo.");
      generateCaptcha(); // Generar nuevo captcha
      return;
    }
    
    if (email && password && acceptPrivacy) {
      onLogin();
    }
  };

  const handleForgotPassword = () => {
    if (!email) {
      alert("Please enter your email to continue.");
      document.getElementById("email-address")?.focus();
      return;
    }
    const subject = encodeURIComponent(
      "Password reset request - InmoLeads Portal"
    );
    const body = encodeURIComponent(
      `Hello ITAI team,

I'd like to reset my password for the InmoLeads Portal.
User email: ${email}

Thanks.`
    );
    window.location.href = `mailto:itai@expertizdigital.com?subject=${subject}&body=${body}`;
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* --- Background gradient --- */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-200 via-orange-400 to-orange-600" />

      {/* Brillos/blur suaves */}
      <div className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-3xl bg-white/25 blur-3xl rotate-12" />
      <div className="pointer-events-none absolute -bottom-24 -right-20 h-80 w-80 rounded-3xl bg-orange-300/40 blur-3xl -rotate-6" />
      <div className="pointer-events-none absolute top-1/3 -right-16 h-64 w-64 rounded-full bg-amber-200/30 blur-3xl" />

      {/* --- Card --- */}
      <div className="relative w-full max-w-md">
        <div className="mx-6 sm:mx-0 rounded-2xl bg-white shadow-2xl">
          <div className="px-8 sm:px-10 py-10">
            {/* Logo arriba */}
            <div className="flex justify-center">
              <img
                src="/src/assets/logo.png"
                alt="InmoLeads by ExpertizDigital"
                className="h-12 sm:h-14 md:h-16 w-auto object-contain"
                loading="eager"
                decoding="async"
              />
            </div>
            {/* Title */}
            <h1 className="text-center text-3xl font-bold text-gray-00 pt-6">
              Portal Cliente
            </h1>

            {/* Form */}
            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
              {/* Username / Email */}
              <div className="space-y-5">
                <div className="relative">
                  <label
                    htmlFor="email-address"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Nombre o correo electrónico
                  </label>
                  <div className="mt-2 flex items-center border-b border-gray-300 focus-within:border-blue-600">
                    {/* user icon */}
                    <span className="pl-2 pr-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-gray-400"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <path d="M20 21a8 8 0 0 0-16 0" />
                        <circle cx="12" cy="7" r="4" />
                      </svg>
                    </span>
                    <input
                      id="email-address"
                      name="email"
                      type="email"
                      autoComplete="email"
                      placeholder="Escribe tu nombre o correo electrónico"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-transparent py-3 pr-3 text-gray-900 placeholder-gray-400 focus:outline-none"
                      required
                    />
                  </div>
                </div>

                {/* Password row with eye + forgot link */}
                <div className="relative">
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Contraseña
                    </label>
                  </div>

                  <div className="mt-2 relative flex items-center border-b border-gray-300 focus-within:border-blue-600">
                    {/* lock icon */}
                    <span className="pl-2 pr-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-gray-400"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <rect x="3" y="11" width="18" height="11" rx="2" />
                        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                      </svg>
                    </span>

                    <input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="current-password"
                      placeholder="Escribe tu contraseña"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full bg-transparent py-3 pr-12 text-gray-900 placeholder-gray-400 focus:outline-none"
                      required
                    />

                    {/* eye toggle */}
                    <button
                      type="button"
                      onClick={() => setShowPassword((v) => !v)}
                      aria-pressed={showPassword}
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                      className="absolute right-0 inset-y-0 z-20 px-3 flex items-center"
                    >
                      {showPassword ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 text-gray-400 hover:text-gray-600 transition"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          aria-hidden="true"
                        >
                          <path d="M17.94 17.94A10.94 10.94 0 0 1 12 20C7 20 2.73 16.11 1 12c.62-1.47 1.53-2.82 2.66-4" />
                          <path d="M6.1 6.1A10.94 10.94 0 0 1 12 4c5 0 9.27 3.89 11 8a11.66 11.66 0 0 1-3.26 4.52" />
                          <path d="M9.88 9.88A3 3 0 0 0 12 15a3 3 0 0 0 2.12-.88" />
                          <path d="M1 1l22 22" />
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 text-gray-400 hover:text-gray-600 transition"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          aria-hidden="true"
                        >
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8Z" />
                          <circle cx="12" cy="12" r="3" />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={handleForgotPassword}
                    className="text-sm text-gray-500 hover:text-gray-700"
                  >
                    Olvidaste tu contraseña?
                  </button>
                  </div>
              </div>

              {/* Checkbox de políticas de privacidad */}
              <div className="mt-6">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="privacy-policy"
                      name="privacy-policy"
                      type="checkbox"
                      checked={acceptPrivacy}
                      onChange={(e) => setAcceptPrivacy(e.target.checked)}
                      className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                      required
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="privacy-policy" className="text-gray-700">
                      Acepto las{' '}
                      <a
                        href="#"
                        className="text-orange-600 hover:text-orange-500 underline"
                        onClick={(e) => {
                          e.preventDefault();
                          // Aquí podrías abrir un modal o redirigir a las políticas
                          alert('Políticas de privacidad - Enlace pendiente de implementar');
                        }}
                      >
                        políticas de privacidad
                      </a>
                    </label>
                  </div>
                </div>
              </div>

              {/* Captcha matemático */}
              <div className="mt-6">
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <div className="flex items-center justify-between mb-3">
                    <label htmlFor="captcha" className="text-sm font-medium text-gray-700">
                      Verificación de seguridad
                    </label>
                    <button
                      type="button"
                      onClick={generateCaptcha}
                      className="text-xs text-orange-600 hover:text-orange-500 underline"
                    >
                      🔄 Nuevo
                    </button>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="flex-1">
                      <div className="text-center py-2 px-4 bg-white border border-gray-300 rounded-md font-mono text-lg font-bold text-gray-800">
                        {captchaQuestion} = ?
                      </div>
                    </div>
                    <div className="flex-1">
                      <input
                        id="captcha"
                        name="captcha"
                        type="number"
                        value={captchaAnswer}
                        onChange={(e) => setCaptchaAnswer(e.target.value)}
                        placeholder="Respuesta"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* LOGIN button — estilo como la imagen (pastilla naranja + sombra oval) */}
              <div className="relative w-full mt-2">
                {/* sombra oval inferior */}
                <span className="pointer-events-none absolute left-1/2 -translate-x-1/2 -bottom-1 w-[92%] h-3 rounded-full bg-[#CFCFCF]" />
                <button
                  type="submit"
                  disabled={!acceptPrivacy || !captchaAnswer}
                  className={`
                    relative w-full select-none rounded-full
                    py-3 font-semibold text-white
                    transition-colors
                    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#E56600]
                    shadow-none
                    ${acceptPrivacy && captchaAnswer
                      ? 'bg-[#E56600] hover:bg-[#D85E00] active:bg-[#C95700] cursor-pointer' 
                      : 'bg-gray-400 cursor-not-allowed'
                    }
                  `}
                >
                  Iniciar Sesión
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
