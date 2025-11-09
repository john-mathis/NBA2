"use client";
import { PasswordForm } from "./PasswordForm";
import { ProfileForm } from "./ProfileForm";
import { DeleteAccountForm } from "./DeleteAccountForm";

type userDataProps = {
  username: String;
  email: String;
};

const Account = () => {
  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col items-center px-6 py-12">
      <div className="w-full max-w-3xl border-b border-neutral-800 pb-6 mb-8">
        <h1 className="text-3xl font-bold tracking-tight">
          Account <span className="text-red-500">Settings</span>
        </h1>
        <p className="text-neutral-400 text-sm mt-2">
          Manage your personal information and preferences.
        </p>
        <ProfileForm />
        <PasswordForm />
        <DeleteAccountForm />
      </div>
    </div>
  );
};

export default Account;
