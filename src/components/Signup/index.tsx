'use client';
import { useFormState, useFormStatus } from "react-dom";
import Link from "next/link";
import { createUser } from "@/app/actions/auth";

function SignUpButton() {
  const {pending} = useFormStatus();

  return(
      <button 
      type='submit'            
      disabled={pending}
                  className="shadow-submit dark:shadow-submit-dark flex w-full items-center justify-center rounded-sm bg-primary px-9 py-4 text-base font-medium text-white duration-300 hover:bg-primary/90">
                    { pending ? 'Signing up...' : 'Sign up'}
                  </button>
  )
};
const initialState = {
    message: '',
  };
const SignUpComponent = () => {
    const [state, formAction] = useFormState(createUser, initialState);
   
    return (
        <section className="overflow-hidden">
        <div className="container">
          <div className="-mx-4 flex flex-wrap">
            <div className="w-full px-4">
              <div className="shadow-three mx-auto max-w-[520px] rounded bg-white px-6 dark:bg-dark sm:p-[60px]">
                <h3 className="mb-3 text-center text-2xl font-bold text-black dark:text-white sm:text-3xl">
                  Create your account
                </h3>
                
                <form action={formAction}>
                <div className="mb-3">
                    <label
                      htmlFor="email"
                      className="mb-3 block text-sm text-dark dark:text-white"
                    >
                      {" "}
                      Work Email{" "}
                    </label>
                    <input
                    id='email'
                      type="email"
                      name="email"
                      required
                      placeholder="Enter your Email"
                      className="border-stroke dark:text-body-color-dark dark:shadow-two w-full rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none transition-all duration-300 focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:focus:border-primary dark:focus:shadow-none"
                    />
                  </div>
                  <div className="mb-3">
                    <label
                      htmlFor="username"
                      className="mb-3 block text-sm text-dark dark:text-white"
                    >
                      {" "}
                      Username{" "}
                    </label>
                    <input
                    id='username'
                      type="text"
                      required
                      name="username"
                      placeholder="Enter your username"
                      className="border-stroke dark:text-body-color-dark dark:shadow-two w-full rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none transition-all duration-300 focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:focus:border-primary dark:focus:shadow-none"
                    />
                  </div>
                  
                  <div className="mb-3">
                    <label
                      htmlFor="password"
                      className="mb-3 block text-sm text-dark dark:text-white"
                    >
                      {" "}
                      Your Password{" "}
                    </label>
                    <input
                    id='password'
                      type="password"
                      required
                      name="password"
                      placeholder="Enter your Password"
                      className="border-stroke dark:text-body-color-dark dark:shadow-two w-full rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none transition-all duration-300 focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:focus:border-primary dark:focus:shadow-none"
                    />
                  </div>
                  <div className="mb-3">
                    <select name="role" id="role" className="border-stroke dark:text-body-color-dark dark:shadow-two w-full rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none transition-all duration-300 focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:focus:border-primary dark:focus:shadow-none">
                      <option value="admin">Admin</option>
                      <option value="sales-agent">Sales Agent</option>
                    </select>
                   
                  </div>

                        <div className="mb-3">
                            <label
                            htmlFor="agent_id"
                            className="mb-3 block text-sm text-dark dark:text-white">
                            {" "}
                            Your agent_id{" "}
                            </label>
                            <input
                            type="number"
                            name="agent_id"
                            placeholder="agent_id leave balank if NA"
                            className="border-stroke dark:text-body-color-dark dark:shadow-two w-full rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none transition-all duration-300 focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:focus:border-primary dark:focus:shadow-none"
                            />
                        </div>
                    
                  
                  {/* <div className="mb-3 flex">
                    <label
                      htmlFor="checkboxLabel"
                      className="flex cursor-pointer select-none text-sm font-medium text-body-color"
                    >
                      <div className="relative">
                        <input
                          type="checkbox"
                          id="checkboxLabel"
                          className="sr-only"
                        />
                        <div className="box mr-4 mt-1 flex h-5 w-5 items-center justify-center rounded border border-body-color border-opacity-20 dark:border-white dark:border-opacity-10">
                          <span className="opacity-0">
                            <svg
                              width="11"
                              height="8"
                              viewBox="0 0 11 8"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M10.0915 0.951972L10.0867 0.946075L10.0813 0.940568C9.90076 0.753564 9.61034 0.753146 9.42927 0.939309L4.16201 6.22962L1.58507 3.63469C1.40401 3.44841 1.11351 3.44879 0.932892 3.63584C0.755703 3.81933 0.755703 4.10875 0.932892 4.29224L0.932878 4.29225L0.934851 4.29424L3.58046 6.95832C3.73676 7.11955 3.94983 7.2 4.1473 7.2C4.36196 7.2 4.55963 7.11773 4.71406 6.9584L10.0468 1.60234C10.2436 1.4199 10.2421 1.1339 10.0915 0.951972ZM4.2327 6.30081L4.2317 6.2998C4.23206 6.30015 4.23237 6.30049 4.23269 6.30082L4.2327 6.30081Z"
                                fill="#3056D3"
                                stroke="#3056D3"
                                strokeWidth="0.4"
                              />
                            </svg>
                          </span>
                        </div>
                      </div>
                     
                    </label>
                  </div> */}
                  <div className="mb-6">
                    <SignUpButton/>
                  </div>
                </form>
                <p className='text-sm text-center  bg-black px-[0.5px] text-white' aria-live="polite">{state?.message}</p>
                <p className="text-center text-base font-medium text-body-color">
                  Already signed up?{" "}
                  <Link href="/signin" className="text-primary hover:underline">
                    Sign in
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
   
      </section>
    )
};

export default SignUpComponent;