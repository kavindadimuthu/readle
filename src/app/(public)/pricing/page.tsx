"use client";

import Link from 'next/link';
import { motion } from "framer-motion";
import { CheckIcon } from '@heroicons/react/24/solid';

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#f8f4ff] to-[#eef9ff]">
      {/* Header Section */}
      <section className="py-20 px-6 md:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-block mb-4 bg-indigo-100 p-3 rounded-full">
              <span className="text-4xl">💰</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-500">
              Simple, Transparent Pricing
            </h1>
            <p className="text-lg mb-8 text-gray-700 leading-relaxed max-w-3xl mx-auto">
              Choose the plan that works best for you and your family. All plans include access to our core features.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Pricing Cards Section */}
      <section className="py-10 px-6 md:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Free Plan */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-all"
            >
              <h3 className="text-xl font-bold text-gray-800 mb-4">Free</h3>
              <div className="mb-4">
                <span className="text-4xl font-bold">LKR 0</span>
                <span className="text-gray-500 ml-2">forever</span>
              </div>
              <p className="text-gray-600 mb-6">Perfect for trying out Readle</p>
              <hr className="my-6" />
              <ul className="mb-8 space-y-4">
                <li className="flex items-start">
                  <CheckIcon className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-600">Basic reading assessments</span>
                </li>
                <li className="flex items-start">
                  <CheckIcon className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-600">5 interactive activities</span>
                </li>
                <li className="flex items-start">
                  <CheckIcon className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-600">Limited progress tracking</span>
                </li>
                <li className="flex items-start">
                  <CheckIcon className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-600">Email support</span>
                </li>
              </ul>
              <Link href="/sign-up/free" className="block text-center py-3 px-6 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium rounded-xl transition-colors duration-300">
                Get Started
              </Link>
            </motion.div>
            
            {/* Pro Monthly Plan - Recommended */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-2xl shadow-xl p-8 border-2 border-indigo-500 transform md:-translate-y-4 hover:shadow-2xl transition-all relative"
            >
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-sm font-bold py-1 px-4 rounded-full">
                RECOMMENDED
              </div>
              <h3 className="text-xl font-bold text-indigo-700 mb-4">Pro Monthly</h3>
              <div className="mb-4">
                <span className="text-4xl font-bold">LKR 3490</span>
                <span className="text-gray-500 ml-2">/month</span>
              </div>
              <p className="text-gray-600 mb-6">Unlock the full Readle experience</p>
              <hr className="my-6" />
              <ul className="mb-8 space-y-4">
                <li className="flex items-start">
                  <CheckIcon className="h-5 w-5 text-indigo-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">All Free features</span>
                </li>
                <li className="flex items-start">
                  <CheckIcon className="h-5 w-5 text-indigo-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Full access to 100+ activities</span>
                </li>
                <li className="flex items-start">
                  <CheckIcon className="h-5 w-5 text-indigo-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Comprehensive progress reports</span>
                </li>
                <li className="flex items-start">
                  <CheckIcon className="h-5 w-5 text-indigo-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Multiple profiles (up to 2 children)</span>
                </li>
                <li className="flex items-start">
                  <CheckIcon className="h-5 w-5 text-indigo-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Priority email and chat support</span>
                </li>
                <li className="flex items-start">
                  <CheckIcon className="h-5 w-5 text-indigo-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Parent resources and guides</span>
                </li>
              </ul>
              <Link href="/sign-up/pro-monthly" className="block text-center py-3 px-6 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-medium rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
                Get Started
              </Link>
            </motion.div>
            
            {/* Pro Yearly Plan */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-all"
            >
              <h3 className="text-xl font-bold text-gray-800 mb-4">Pro Yearly</h3>
              <div className="mb-4">
                <span className="text-4xl font-bold">LKR 29,900</span>
                <span className="text-gray-500 ml-2">/year</span>
              </div>
              <div className="mb-6 flex items-center">
                <p className="text-gray-600">~LKR  2500/month, billed annually</p>
                <span className="ml-2 bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded">SAVE 20%</span>
              </div>
              <hr className="my-6" />
              <ul className="mb-8 space-y-4">
                <li className="flex items-start">
                  <CheckIcon className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-600">All Pro Monthly features</span>
                </li>
                <li className="flex items-start">
                  <CheckIcon className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-600">Multiple profiles (up to 4 children)</span>
                </li>
                <li className="flex items-start">
                  <CheckIcon className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-600">Advanced parent analytics</span>
                </li>
                <li className="flex items-start">
                  <CheckIcon className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-600">Phone support</span>
                </li>
              </ul>
              <Link href="/sign-up/pro-yearly" className="block text-center py-3 px-6 bg-gray-800 hover:bg-gray-900 text-white font-medium rounded-xl transition-colors duration-300">
                Get Started
              </Link>
            </motion.div>
            
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-6 md:px-12 lg:px-24">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">Frequently Asked Questions</h2>
            <p className="text-gray-600 mt-2">Have more questions? Contact our support team</p>
          </div>
          
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="font-bold text-lg mb-2">Can I switch between plans?</h3>
              <p className="text-gray-600">Yes, you can upgrade or downgrade your plan at any time. Changes will take effect at the start of your next billing cycle.</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="font-bold text-lg mb-2">Is there a refund policy?</h3>
              <p className="text-gray-600">We offer a 14-day money-back guarantee for all paid plans. If you&rsquo;re not satisfied, contact our support team within 14 days of your purchase.</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="font-bold text-lg mb-2">What payment methods do you accept?</h3>
              <p className="text-gray-600">We accept all major credit cards, PayPal, and Apple Pay. All transactions are secure and encrypted.</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="font-bold text-lg mb-2">Can multiple children use the same account?</h3>
              <p className="text-gray-600">Yes, our Pro plans support multiple child profiles, allowing personalized learning experiences for each child while keeping everything under one parent account.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 md:px-12 lg:px-24 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-t-[3rem]">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Child&rsquo;s Reading Experience?</h2>
          <p className="text-xl mb-10 text-indigo-100 max-w-2xl mx-auto">
            Join thousands of families who&rsquo;ve discovered the joy of reading with Readle.
          </p>
          <Link href="/sign-up" className="px-10 py-4 bg-white text-indigo-700 font-medium rounded-xl hover:bg-indigo-50 transition-all duration-300 text-center shadow-lg inline-block">
            Get Started Today
          </Link>
        </div>
      </section>
    </main>
  );
}