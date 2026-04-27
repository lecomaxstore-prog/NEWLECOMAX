import type { Metadata } from "next";
import Link from "next/link";
import Logo from "@/components/Logo";

export const metadata: Metadata = {
  title: "Connexion — L'ecomax",
  description: "Connectez-vous à votre compte L'ecomax.",
};

export default function LoginPage() {
  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center px-4 py-16 bg-white">
      <div className="w-full max-w-[400px]">

        {/* Logo */}
        <div className="flex justify-center mb-8">
          <Link href="/">
            <Logo />
          </Link>
        </div>

        {/* Heading */}
        <h1 className="font-black text-[28px] tracking-tight uppercase text-center mb-1">
          Connexion
        </h1>
        <p className="text-sm text-neutral-500 text-center mb-8">
          Accédez à votre espace L&apos;ecomax
        </p>

        {/* Form card */}
        <form className="flex flex-col gap-4">

          {/* Email */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="email" className="text-[11px] font-bold uppercase tracking-widest text-neutral-500">
              Adresse email
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              required
              placeholder="vous@exemple.com"
              className="w-full border border-neutral-200 px-4 py-3 text-sm placeholder-neutral-400 outline-none focus:border-black transition-colors"
            />
          </div>

          {/* Password */}
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="text-[11px] font-bold uppercase tracking-widest text-neutral-500">
                Mot de passe
              </label>
              <Link
                href="#"
                className="text-[11px] text-neutral-500 hover:text-black underline underline-offset-2 transition-colors"
              >
                Mot de passe oublié ?
              </Link>
            </div>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              required
              placeholder="••••••••"
              className="w-full border border-neutral-200 px-4 py-3 text-sm placeholder-neutral-400 outline-none focus:border-black transition-colors"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="mt-2 w-full bg-black text-white font-bold uppercase text-sm tracking-widest py-4 hover:bg-neutral-800 active:bg-neutral-900 transition-colors"
          >
            Se connecter
          </button>

        </form>

        {/* Divider */}
        <div className="flex items-center gap-3 my-6">
          <span className="flex-1 h-px bg-neutral-200" />
          <span className="text-[11px] text-neutral-400 uppercase tracking-widest">ou</span>
          <span className="flex-1 h-px bg-neutral-200" />
        </div>

        {/* Register CTA */}
        <p className="text-sm text-neutral-500 text-center">
          Pas encore de compte ?{" "}
          <Link
            href="#"
            className="font-bold text-black hover:underline underline-offset-2 transition-colors"
          >
            Créer un compte
          </Link>
        </p>

        {/* Terms note */}
        <p className="text-[11px] text-neutral-400 text-center mt-6 leading-relaxed">
          En vous connectant, vous acceptez nos{" "}
          <Link href="#" className="underline underline-offset-2 hover:text-black transition-colors">
            Conditions d&apos;utilisation
          </Link>{" "}
          et notre{" "}
          <Link href="#" className="underline underline-offset-2 hover:text-black transition-colors">
            Politique de confidentialité
          </Link>
          .
        </p>

      </div>
    </div>
  );
}
