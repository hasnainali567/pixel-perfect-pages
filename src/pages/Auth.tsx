import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Nav = () => (
  <nav className="flex items-center justify-between px-6 lg:px-12 pt-6">
    <div className="flex items-center gap-3">
      <div className="h-10 w-10 rounded-xl bg-primary text-primary-foreground grid place-items-center font-bold text-lg shadow-soft">
        H
      </div>
      <span className="font-semibold text-foreground text-[15px]">HelpHub AI</span>
    </div>

    <div className="hidden md:flex items-center gap-8">
      {[
        { label: "Home", to: "/" },
        { label: "Explore", to: "/explore" },
        { label: "Leaderboard", to: "/leaderboard" },
      ].map((item) => (
        <Link
          key={item.label}
          to={item.to}
          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          {item.label}
        </Link>
      ))}
    </div>
  </nav>
);

const Field = ({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) => (
  <div className="space-y-2">
    <label className="text-sm font-medium text-foreground">{label}</label>
    {children}
  </div>
);

const inputCls =
  "w-full h-12 rounded-xl bg-background/60 border border-border px-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition";

const Auth = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState("Ayesha Khan");
  const [role, setRole] = useState("Both");
  const [email, setEmail] = useState("community@helphub.ai");
  const [password, setPassword] = useState("password");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem(
      "helphub_demo_session",
      JSON.stringify({ user, role, email })
    );
    navigate("/profile");
  };

  return (
    <main className="min-h-screen bg-canvas-grad">
      <Nav />

      <section className="grid lg:grid-cols-2 gap-8 px-6 lg:px-12 mt-10 lg:mt-16 max-w-7xl mx-auto pb-20">
        {/* Left dark card */}
        <div className="bg-dark-card text-primary-foreground rounded-3xl shadow-card p-10 lg:p-14">
          <p className="text-xs font-semibold tracking-[0.2em] text-primary-foreground/70 mb-6">
            COMMUNITY ACCESS
          </p>
          <h1 className="text-4xl lg:text-[56px] leading-[1.05] font-extrabold tracking-tight">
            Enter the support
            <br />
            network.
          </h1>
          <p className="mt-6 text-primary-foreground/70 text-[15px] leading-relaxed max-w-md">
            Choose a demo identity, set your role, and jump into a multi-page
            product flow designed for asking, offering, and tracking help with
            a premium interface.
          </p>

          <ul className="mt-8 space-y-3 text-[15px] text-primary-foreground/80">
            {[
              "Role-based entry for Need Help, Can Help, or Both",
              "Direct path into dashboard, requests, AI Center, and community feed",
              "Persistent demo session powered by LocalStorage",
            ].map((t) => (
              <li key={t} className="flex gap-3">
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary-foreground/60 shrink-0" />
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Right light card */}
        <div className="bg-card rounded-3xl shadow-card p-10 lg:p-12">
          <p className="text-xs font-semibold tracking-[0.2em] text-primary mb-5">
            LOGIN / SIGNUP
          </p>
          <h2 className="text-4xl lg:text-[44px] leading-[1.1] font-extrabold text-foreground tracking-tight">
            Authenticate your
            <br />
            community profile
          </h2>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <Field label="Select demo user">
              <select
                value={user}
                onChange={(e) => setUser(e.target.value)}
                className={inputCls}
              >
                <option>Ayesha Khan</option>
                <option>Hamza Ali</option>
                <option>Sara Iqbal</option>
                <option>Bilal Ahmed</option>
              </select>
            </Field>

            <Field label="Role selection">
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className={inputCls}
              >
                <option>Both</option>
                <option>Need Help</option>
                <option>Can Help</option>
              </select>
            </Field>

            <div className="grid grid-cols-2 gap-4">
              <Field label="Email">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={inputCls}
                />
              </Field>
              <Field label="Password">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={inputCls}
                />
              </Field>
            </div>

            <button
              type="submit"
              className="w-full h-13 py-4 rounded-2xl bg-primary text-primary-foreground font-semibold text-[15px] hover:opacity-90 transition shadow-soft"
            >
              Continue to dashboard
            </button>
          </form>
        </div>
      </section>
    </main>
  );
};

export default Auth;
