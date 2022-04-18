import * as React from 'react';
import { toast, ToastBar, Toaster } from 'react-hot-toast';
// import { HiX } from 'react-icons/hi';

export default function DismissableToast() {
  return (
    <div>
      <Toaster
        reverseOrder={false}
        position='top-right'
        toastOptions={{
            duration: 5000,
          style: {
            borderRadius: '3px',
            padding: '15px 4px',
            borderLeft:'6px solid green',
            background: '#fff',
            color: '#000',
          },
        }}
      >
        {(t) => (
          <ToastBar toast={t}>
            {({ icon, message }) => (
              <>
                {icon}
                {message}
                {t.type !== 'loading' && (
                  <button
                    className='rounded-full p-1 ring-primary-400 transition hover:bg-[#444] focus:outline-none focus-visible:ring'
                    onClick={() => toast.dismiss(t.id)}
                  >
                    {/* <HiX /> */}
                  </button>
                )}
              </>
            )}
          </ToastBar>
        )}
      </Toaster>
    </div>
  );
}