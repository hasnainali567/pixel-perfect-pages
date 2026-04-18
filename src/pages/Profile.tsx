import { useState, FormEvent } from "react";
import { Link, useLocation } from "react-router-dom";

const Nav = () => {
  const { pathname } = useLocation();
  const links = [
    { label: "Dashboard", to: "/" },
    { label: "Onboarding", to: "/onboarding" },
    { label: "Profile", to: "/profile" },
  ];
  return (
    <nav className="flex items-center justify-between px-6 lg:px-12 pt-6 pb-6 border-b border-border/60">
      <Link to="/" className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-xl bg-primary text-primary-foreground grid place-items-center font-bold text-lg shadow-soft">
          H
        </div>
        <span className="font-semibold text-foreground text-[15px]">HelpHub AI</span>
      </Link>
      <div className="flex items-center gap-2">
        {links.map((l) => {
          const active = pathname === l.to;
          return (
            <Link
              key={l.to}
              to={l.to}
              className={`px-5 py-2 text-sm rounded-full transition-colors ${
                active
                  ? "bg-accent text-accent-foreground font-medium"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {l.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

const Chip = ({ children }: { children: React.ReactNode }) => (
  <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-tag-green/40 text-primary text-sm font-medium">
    {children}
  </span>
);

const BadgeChip = ({ children }: { children: React.ReactNode }) => (
  <span className="inline-flex items-center px-4 py-1.5 rounded-full border border-primary/30 text-primary text-sm font-medium bg-card">
    {children}
  </span>
);

const Profile = () => {
  const [name, setName] = useState("Ayesha Khan");
  const [location, setLocation] = useState("Karachi");
  const [skills, setSkills] = useState("Figma, UI/UX, HTML/CSS, Career Guidance");
  const [interests, setInterests] = useState("Hackathons, UI/UX, Community Building");

  const skillList = skills.split(",").map((s) => s.trim()).filter(Boolean);

  const onSave = (e: FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="min-h-screen bg-canvas-grad">
      <Nav />

      <main className="max-w-[1280px] mx-auto px-6 lg:px-12 py-8 space-y-8">
        {/* Hero dark card */}
        <section className="bg-dark-card text-primary-foreground rounded-3xl shadow-card px-10 lg:px-14 py-12 lg:py-14">
          <p className="text-xs font-semibold tracking-[0.25em] text-primary-foreground/60 mb-5">
            PROFILE
          </p>
          <h1 className="text-5xl lg:text-[64px] leading-[1.02] font-extrabold tracking-tight">
            {name}
          </h1>
          <p className="mt-5 text-primary-foreground/70 text-base">
            Both • {location}
          </p>
        </section>

        {/* Two columns */}
        <section className="grid lg:grid-cols-2 gap-8">
          {/* Public profile */}
          <div className="bg-card rounded-3xl shadow-card p-10 lg:p-12">
            <p className="text-xs font-semibold tracking-[0.25em] text-primary mb-5">
              PUBLIC PROFILE
            </p>
            <h2 className="text-4xl lg:text-[44px] font-extrabold text-foreground tracking-tight">
              Skills and reputation
            </h2>

            <div className="mt-8 space-y-4">
              <div className="flex items-center justify-between py-3 border-b border-border/70">
                <span className="text-foreground/80">Trust score</span>
                <span className="text-foreground font-medium">100%</span>
              </div>
              <div className="flex items-center justify-between py-3 border-b border-border/70">
                <span className="text-foreground/80">Contributions</span>
                <span className="text-foreground font-medium">35</span>
              </div>
            </div>

            <div className="mt-6">
              <p className="text-foreground font-semibold mb-3">Skills</p>
              <div className="flex flex-wrap gap-2.5">
                {skillList.map((s) => (
                  <Chip key={s}>{s}</Chip>
                ))}
              </div>
            </div>

            <div className="mt-6">
              <p className="text-foreground font-semibold mb-3">Badges</p>
              <div className="flex flex-wrap gap-2.5">
                <BadgeChip>Design Ally</BadgeChip>
                <BadgeChip>Fast Responder</BadgeChip>
                <BadgeChip>Top Mentor</BadgeChip>
              </div>
            </div>
          </div>

          {/* Edit profile */}
          <form
            onSubmit={onSave}
            className="bg-card rounded-3xl shadow-card p-10 lg:p-12"
          >
            <p className="text-xs font-semibold tracking-[0.25em] text-primary mb-5">
              EDIT PROFILE
            </p>
            <h2 className="text-4xl lg:text-[44px] font-extrabold text-foreground tracking-tight">
              Update your identity
            </h2>

            <div className="mt-8 grid grid-cols-2 gap-5">
              <Field label="Name" value={name} onChange={setName} />
              <Field label="Location" value={location} onChange={setLocation} />
            </div>

            <div className="mt-5">
              <Field label="Skills" value={skills} onChange={setSkills} />
            </div>
            <div className="mt-5">
              <Field label="Interests" value={interests} onChange={setInterests} />
            </div>

            <button
              type="submit"
              className="mt-8 w-full py-4 rounded-full bg-primary text-primary-foreground font-semibold text-base hover:opacity-90 transition-opacity shadow-soft"
            >
              Save profile
            </button>
          </form>
        </section>
      </main>
    </div>
  );
};

const Field = ({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) => (
  <label className="block">
    <span className="block text-sm text-foreground/80 mb-2">{label}</span>
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full px-5 py-3.5 rounded-full bg-background/60 border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
    />
  </label>
);

export default Profile;
