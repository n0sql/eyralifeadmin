'use client';
import { useFormState, useFormStatus } from "react-dom";
import { loginUser } from "@/app/actions/auth";
import Link from "next/link";
function SignInButton() {
  const {pending} = useFormStatus();

  return(
      <button 
      type='submit'            
      disabled={pending}
                  className="shadow-submit dark:shadow-submit-dark flex w-full items-center justify-center rounded-sm bg-primary px-9 py-4 text-base font-medium text-white duration-300 hover:bg-primary/90">
                    { pending ? 'Signing in...' : 'Sign in'}
                  </button>
  )
};
const initialState = {
    message: '',
  };
const SignInComponent = () => {
    const [state, formAction] = useFormState(loginUser, initialState);

  return (
      <section className="relative ">
        <div className="container">
          <div className="-mx-4 flex flex-wrap">
            <div className="w-full px-4">
              <div className="shadow-three mx-auto max-w-[520px] rounded bg-white px-6 py-10 dark:bg-dark sm:p-[60px]">
                <h3 className="mb-3 text-center text-2xl font-bold text-black dark:text-white sm:text-3xl">
                  Sign in to your account
                </h3>
                <form action={formAction}>
                  <div className="mb-8">
                    <label
                      htmlFor="email"
                      className="mb-3 block text-sm text-dark dark:text-white"
                    >
                      Your Email
                    </label>
                    <input
                    id='email'
                      required
                      type="email"
                      name="email"
                      placeholder="Enter your Email"
                      className="border-stroke dark:text-body-color-dark dark:shadow-two w-full rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none transition-all duration-300 focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:focus:border-primary dark:focus:shadow-none"
                    />
                  </div>
                  <div className="mb-8">
                    <label
                      htmlFor="password"
                      className="mb-3 block text-sm text-dark dark:text-white"
                    >
                      Your Password
                    </label>
                    <input
                    id='password'
                      required
                      type="password"
                      name="password"
                      placeholder="Enter your Password"
                      className="border-stroke dark:text-body-color-dark dark:shadow-two w-full rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none transition-all duration-300 focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:focus:border-primary dark:focus:shadow-none"
                    />
                  </div>
             
                  <div className="mb-6">
                    <SignInButton/>
                  </div>
                </form>
                <p  className='text-sm text-center font-medium  bg-black px-1 text-red-300' aria-live="polite">{state?.message}</p>
                <p className="text-center text-base font-medium text-body-color">
                    Don't have an account?{" "}
                  <Link href="/signup" className="text-primary hover:underline">
                    Sign up
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
   
  );
};

export default SignInComponent;