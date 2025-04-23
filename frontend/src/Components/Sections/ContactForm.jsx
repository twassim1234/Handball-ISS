import { useState } from 'react';
import { ChevronDownIcon } from '@heroicons/react/16/solid';
import { Field, Label, Switch } from '@headlessui/react';
import { toast } from 'react-hot-toast'; // <-- make sure to install react-hot-toast or use your own toast system

export default function ContactForm() {
  const [agreed, setAgreed] = useState(false);
  const [result, setResult] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("Sending...");

    const formData = new FormData(event.target);
    const firstName = formData.get("first-name");
    const lastName = formData.get("last-name");
    const email = formData.get("email");
    const phoneNumber = formData.get("phone-number");
    const message = formData.get("message");

    if (!firstName || !lastName || !email || !phoneNumber || !message) {
      toast.error("Please fill in all the required fields.");
      setResult("");
      return;
    }

    if (!agreed) {
      toast.error("You must agree to the privacy policy.");
      setResult("");
      return;
    }

    formData.append("access_key", "5526c79a-4b2c-4147-8ab7-c05b87847160");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData
    });

    const data = await response.json();

    if (data.success) {
      toast.success("Message sent successfully");
      event.target.reset();
      setAgreed(false);
    } else {
      toast.error(data.message || "Something went wrong.");
    }
    setResult("");
  };

  return (
    <div className="bg-white px-6 py-24 sm:py-32 lg:px-8 relative">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]"
      >
        <div
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
          className="relative left-1/2 -z-10 aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] opacity-30 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]"
        />
      </div>
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">Contact Us</h2>
        <p className="mt-2 text-lg text-gray-600">Feel free to reach out to us anytime.</p>
      </div>

      <form onSubmit={onSubmit} className="mx-auto mt-16 max-w-xl sm:mt-20">
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
          <InputField id="first-name" name="first-name" label="First name" autoComplete="given-name" />
          <InputField id="last-name" name="last-name" label="Last name" autoComplete="family-name" />
          <InputField id="company" name="company" label="Company" autoComplete="organization" full />
          <InputField id="email" name="email" label="Email" type="email" autoComplete="email" full />

          <div className="sm:col-span-2">
            <label htmlFor="phone-number" className="block text-sm font-semibold text-gray-900">
              Phone number
            </label>
            <div className="mt-2.5">
              <div className="flex rounded-md bg-white outline  outline-gray-300 has-[input:focus]:outline-indigo-600">
                <div className="relative">
                  <select
                    id="country"
                    name="country"
                    className="appearance-none rounded-l-md py-2 pr-8 pl-3.5 text-base text-gray-500 sm:text-sm"
                  >
                    <option>TN</option>
                    <option>DZ</option>
                    <option>LB</option>
                  </select>
                  <ChevronDownIcon className="absolute right-2 top-2.5 h-5 w-5 text-gray-500 pointer-events-none" />
                </div>
                <input
                  id="phone-number"
                  name="phone-number"
                  type="text"
                  placeholder="58187123"
                  className="block w-full py-2 px-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm"
                />
              </div>
            </div>
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="message" className="block text-sm font-semibold text-gray-900">
              Message
            </label>
            <div className="mt-2.5">
              <textarea
                id="message"
                name="message"
                rows={4}
                className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline outline-gray-300 placeholder:text-gray-400 focus:outline-indigo-600"
                defaultValue=""
              />
            </div>
          </div>

          <Field className="flex items-center gap-x-4 sm:col-span-2">
            <Switch
              checked={agreed}
              onChange={setAgreed}
              className={`${
                agreed ? 'bg-indigo-600' : 'bg-gray-200'
              } relative inline-flex h-6 w-11 items-center rounded-full transition`}
            >
              <span
                className={`${
                  agreed ? 'translate-x-6' : 'translate-x-1'
                } inline-block h-4 w-4 transform bg-white rounded-full transition`}
              />
            </Switch>
            <Label className="text-sm text-gray-600">
              By selecting this, you agree to our{' '}
              <a href="#" className="font-semibold text-indigo-600">
                privacy&nbsp;policy
              </a>
              .
            </Label>
          </Field>
        </div>

        <div className="mt-10">
          <button
            type="submit"
            className="block w-full rounded-md bg-red-500 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-red-600  focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Let's talk
          </button>
        </div>

        {result && (
          <p className="mt-4 text-center text-sm text-gray-500">
            {result}
          </p>
        )}
      </form>
    </div>
  );
}

function InputField({ id, name, label, type = "text", autoComplete, full = false }) {
  return (
    <div className={full ? "sm:col-span-2" : ""}>
      <label htmlFor={id} className="block text-sm font-semibold text-gray-900">
        {label}
      </label>
      <div className="mt-2.5">
        <input
          id={id}
          name={name}
          type={type}
          autoComplete={autoComplete}
          className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline outline-gray-300 placeholder:text-gray-400 focus:outline-indigo-600"
        />
      </div>
    </div>
  );
}
