import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment, useRef } from "react";

export default function Base({ children, isLoading = false }) {
  const buttonRef = useRef(null);

  return (
    <>
      <Transition.Root show={isLoading} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          initialFocus={buttonRef}
          onClose={() => false}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed z-10 inset-0 overflow-y-auto">
            <div className="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative rounded-lg text-left overflow-hidden transform transition-all sm:my-8 sm:max-w-lg sm:w-full">
                  <div className="bg-transparent px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                      <iframe
                        src="https://embed.lottiefiles.com/animation/28893"
                        title="Loading animation"
                        width={800}
                        height={800}
                      ></iframe>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
      {children}
    </>
  );
}
