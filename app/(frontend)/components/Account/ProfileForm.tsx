"use client";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useAppSelector } from "@/app/redux/hooks";
import internalAPI from "@/app/(backend)/api/utils/axios.internal";
import { formatDate } from "@/app/lib/formatDate";

type UserData = {
  username: string;
  email: string;
};

export function ProfileForm() {
  const { user, loading } = useAppSelector((s) => s.authUser);
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);

  const { register, handleSubmit, reset } = useForm<UserData>({
    defaultValues: { username: user?.username, email: user?.email },
  });

  const onSubmit = async (data: UserData) => {
    setSaving(true);
    try {
      await internalAPI.patch("/api/account/profile", data);
      setIsEditing(false);
      reset(data);
    } catch (e) {
      console.error("Profile update failed:", e);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p className="text-neutral-400">Loading user...</p>;
  if (!user) return <p className="text-neutral-400">No user data found.</p>;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-3xl w-full bg-neutral-900 border border-neutral-800 rounded-2xl p-8 shadow-lg"
    >
      <div className="grid md:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm text-neutral-400 mb-1">Email</label>
          <input
            type="email"
            {...register("email")}
            placeholder={user.email}
            disabled={!isEditing}
            className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2 focus:outline-none focus:border-red-500"
          />
        </div>

        <div>
          <label className="block text-sm text-neutral-400 mb-1">
            Username
          </label>
          <input
            type="text"
            {...register("username")}
            placeholder={user.username}
            disabled={!isEditing}
            className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2 focus:outline-none focus:border-red-500"
          />
        </div>

        <div>
          <label className="block text-sm text-neutral-400 mb-1">
            Member Since
          </label>
          <input
            type="text"
            disabled
            value={formatDate(user.createdAt)}
            className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2"
          />
        </div>
      </div>

      <div className="flex justify-end mt-8 gap-4">
        {!isEditing ? (
          <button
            type="button"
            onClick={() => setIsEditing(true)}
            className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-500 text-sm font-medium"
          >
            Edit Profile
          </button>
        ) : (
          <>
            <button
              type="button"
              onClick={() => {
                setIsEditing(false);
                reset();
              }}
              className="px-4 py-2 rounded-lg border border-neutral-700 hover:bg-neutral-800 text-sm font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-500 text-sm font-medium disabled:opacity-60"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </>
        )}
      </div>
    </form>
  );
}
