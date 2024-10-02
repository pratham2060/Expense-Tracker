import { SignUp } from '@clerk/nextjs'
import Link from 'next/link'
import { Button } from "@/components/ui/button";

export default function SignUpPage() {
  return (
    <div className="h-[125vh] min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <h2 className="text-3xl font-bold text-gray-800 text-center mb-6 mt-10">
        Create an Account
      </h2>
      <p className="text-gray-600 text-center mb-8">
        Join us to start managing your expenses efficiently
      </p>
      <SignUp />
      <div className="mt-6 text-center">
        <p className="text-lg text-gray-600">
          Already have an account?{' '}
          <Link href="/sign-in" className="text-blue-500 hover:underline">
            Sign in
          </Link>
        </p>
      </div>
      <footer className="mt-8 text-center text-sm text-gray-500 mb-15">
        <Link href="/privacy-policy" className="hover:text-gray-700 mr-4">
          Privacy Policy
        </Link>
        <Link href="/terms-of-service" className="hover:text-gray-700">
          Terms of Service
        </Link>
      </footer>
    </div>
  );
}