import { useState } from "react";
import { useForm } from "react-hook-form";

export function PasswordForm() {
  const {
    register,
    reset,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [editing, setEditing] = useState(false);
  const [saving, isSaving] = useState(false);

  const password = watch("password");

  const onSubmit = async (data: {}) => {
    console.log(data);
    setTimeout(() => {
      isSaving(false);
      setEditing(false);
    }, 1000);
  };

  return (
    <div className="w-full max-w-3xl mt-10 bg-neutral-900 border border-neutral-800 rounded-2xl p-8">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2 className="text-xl font-semibold mb-4">Change Password</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <input
            type="password"
            placeholder="Current Password"
            disabled={!editing}
            {...register("password", {
              //   required: "Password cannot be blank",
              minLength: {
                value: 4,
                message: "Password must be atleast 4 characters",
              },
            })}
            className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2 focus:outline-none focus:border-red-500"
          />
          <input
            type="password"
            placeholder="New Password"
            disabled={!editing}
            {...register("confirmPassword", {
              //   required: "Confirm password cannot be blank",
              validate: (value) =>
                value === password || "Passwords do not match",
            })}
            className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2 focus:outline-none focus:border-red-500"
          />
        </div>
        <div className="flex justify-end mt-6 gap-4">
          {editing ? (
            <>
              <button
                type="button"
                className="px-4 py-2 rounded-lg border border-neutral-700 hover:bg-neutral-800 text-sm font-medium"
                onClick={() => setEditing(!editing)}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-500 text-sm font-medium"
                onClick={() => isSaving(!saving)}
              >
                {saving ? "Saving..." : "Update Password"}
              </button>
            </>
          ) : (
            <button
              type="button"
              className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-500 text-sm font-medium"
              onClick={() => setEditing(!editing)}
            >
              Change password
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
