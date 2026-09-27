"use client";

import { useActionState } from "react";
import { loginAction, type LoginState } from "@/app/admin/actions";
import { adminText } from "@/content/admin";
import { AlertIcon } from "../icons";
import { buttonClasses } from "../ui/button";

const text = adminText.login;
const inputClass =
  "border-field text-ink mt-2 block h-12 w-full rounded-md border bg-white px-4 text-base focus-visible:outline-offset-1";

export function LoginForm({ notice }: { notice?: string }) {
  const [state, action, pending] = useActionState<LoginState, FormData>(loginAction, {});
  const error = state.error ? text[state.error] : null;

  return (
    <form action={action} className="mt-8 space-y-5">
      {notice && !error ? (
        <p role="status" className="bg-surface text-ink rounded-md p-4">
          {notice}
        </p>
      ) : null}
      {error ? (
        <p role="alert" className="border-danger/40 bg-danger-bg text-danger flex items-start gap-3 rounded-md border p-4 font-medium">
          <AlertIcon className="mt-0.5 size-5 shrink-0" />
          {error}
        </p>
      ) : null}
      <div>
        <label htmlFor="admin-email" className="text-ink block font-semibold">
          {text.email}
        </label>
        <input
          id="admin-email"
          name="email"
          type="email"
          autoComplete="username"
          required
          defaultValue={state.email}
          className={inputClass}
        />
      </div>
      <div>
        <label htmlFor="admin-password" className="text-ink block font-semibold">
          {text.password}
        </label>
        <input
          id="admin-password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          className={inputClass}
        />
      </div>
      <button type="submit" disabled={pending} className={buttonClasses("primary", "md", "w-full")}>
        {pending ? text.submitting : text.submit}
      </button>
    </form>
  );
}
