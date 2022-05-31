import { Dialog } from "@headlessui/react";
import React from "react";
import styles from "./CustomDialog.module.css";

export default function CustomDialog({ show = false, setIsOpen, children }) {
  return (
    <Dialog open={show} onClose={() => setIsOpen(false)}>
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4 ">
        <Dialog.Panel
          className={`mx-auto max-w-sm rounded-xl bg-white px-10 py-10 ${styles.dialogWidth}`}
        >
          {children}
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
