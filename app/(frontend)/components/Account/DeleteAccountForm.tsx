"use client";
import { useState, useRef } from "react";

export function DeleteAccountForm() {
  const [showPopUp, setShowPopUp] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (e: React.MouseEvent<HTMLDivElement>) => {
    if (popupRef.current && !popupRef.current.contains(e.target as Node)) {
      setShowPopUp(false);
    }
  };

  return (
    <>
      <div className="w-full max-w-3xl mt-10 bg-neutral-900 border border-neutral-800 rounded-2xl p-8">
        <h2 className="text-xl font-semibold mb-3 text-red-500">Danger Zone</h2>
        <p className="text-sm text-neutral-400 mb-4">
          Deleting your account is permanent and cannot be undone.
        </p>
        <button
          className="px-4 py-2 rounded-lg border border-red-700 text-red-500 hover:bg-red-600 hover:text-white transition text-sm font-medium"
          onClick={() => setShowPopUp(true)}
        >
          Delete Account
        </button>
      </div>

      {showPopUp && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black/70 z-50"
          onClick={handleClickOutside}
        >
          <div
            ref={popupRef}
            className="bg-neutral-900 border border-neutral-700 rounded-2xl p-6 w-full max-w-sm text-white shadow-xl"
          >
            <h2 className="text-xl font-semibold mb-2">Are you sure?</h2>
            <p className="text-neutral-400 mb-5">
              Deleting your account is permanent and cannot be undone.
            </p>

            <div className="mb-5">
              <label className="block text-sm text-neutral-400 mb-1">
                Enter password to confirm
              </label>
              <input
                type="password"
                placeholder="Password"
                className="w-full bg-neutral-800 border border-neutral-700 rounded-md px-3 py-2 text-sm text-white outline-none focus:border-red-500"
              />
            </div>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowPopUp(false)}
                className="px-4 py-2 rounded-md text-sm text-neutral-400 hover:text-white transition"
              >
                Cancel
              </button>
              <button className="px-4 py-2 rounded-md text-sm bg-red-600 hover:bg-red-700 transition">
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
