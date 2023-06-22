import React, { useState, useEffect, ChangeEvent } from 'react';
import whatsappLogo from '../assets/whatsapp logo.png';

type Props = {
  setOpen: (b: boolean) => void;
};

export default function Profile({ setOpen }: Props) {
  const [redirectURL, setRedirectURL] = useState('');

  useEffect(() => {
    const storedRedirectURL = localStorage.getItem('redirectURL');
    if (storedRedirectURL) {
      setRedirectURL(storedRedirectURL);
    }
  }, []);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setRedirectURL(value);
    localStorage.setItem('redirectURL', value);
  };

  const [isTracking, setIsTracking] = useState(false);
  const [trackedKey, setTrackedKey] = useState(localStorage.getItem('triggerKey'));

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (isTracking) {
        setTrackedKey(event.key);
      }
    }

    // Add event listener when the component mounts
    document.addEventListener('keydown', handleKeyDown);

    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isTracking]);

  const handleToggleTracking = () => {
    setIsTracking(!isTracking);
    if (isTracking) {
      localStorage.setItem('bypass', 'true');
    } else {
      localStorage.setItem('bypass', 'false');
    }
    localStorage.setItem('triggerKey', trackedKey!);
  };

  return (
    <div className="bg-gray-100 col-span-7 md:col-span-4 xl:col-span-5 h-screen">
      <div className="flex space-x-2 px-2 py-7 shadow-md shadow-stone-400 items-center bg-green w-full h-10 sticky top-0">
        <div onClick={() => setOpen(true)} className="cursor-pointer mr-5 md:hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-white"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <div className="flex items-center">
          <img
            src={whatsappLogo}
            className="h-10 w-10 rounded-full pointer-events-none object-contain"
            alt="whatsapp"
          />
        </div>
        <p className="text-white font-semibold">WhatsApp Clone</p>
      </div>
      <div className="p-4">
        <p className="font-bold text-4xl">Settings</p>
        <div className="mt-10 px-4 shadow-md py-2 w-full bg-gray-50 flex border-2 border-green rounded-xl">
          <label htmlFor="redirectURL">Redirect Domain/URL/URI</label>
          <input
            className="border-2 border-green border-dashed outline-none w-full px-4 py-2 bg-transparent font-medium"
            type="text"
            id="redirectURL"
            name="redirectURL"
            value={redirectURL}
            onChange={handleInputChange}
          />
        </div>
        <button
          className={`mt-8 bg-${isTracking ? "blue-400" : "green"} hover:bg-opacity-50 text-white font-medium px-3 py-2 rounded-lg cursor-pointer active:scale-95 transition`}
          onClick={handleToggleTracking}
        >
          {isTracking ? 'Save Trigger' : 'Set Trigger Key'}
        </button>
        {!isTracking ? <p>Trigger key is currently set to "{trackedKey}".</p> : <p>Press a trigger key on your keyboard (cannot be the "Function" key), then click "Save Trigger". It is currently set to "<strong>{trackedKey}</strong>".</p>}
      </div>
    </div>
  );
}
