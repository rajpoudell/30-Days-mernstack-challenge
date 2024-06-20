import React from 'react'
import { Link } from 'react-router-dom'

export const Home = () => {
  return (
    <div className="min-h-screen bg-gray-100">


    {/* Hero Section */}
    <section className="bg-purple-100 text-gray-950">
      <div className="max-w-7xl mx-auto py-20 px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold">
          Welcome to Our Website
        </h1>
        <p className="mt-4 text-lg sm:text-xl md:text-2xl">
          We provide the best solutions for your business.
        </p>
        <Link href="/login" className="mt-8 inline-block bg-white text-blue-600 py-3 px-5 rounded-lg shadow-md hover:bg-red-700">
      
          Get Started
        </Link>
      </div>
    </section>

    {/* Section 1 */}
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">About Us</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Who We Are
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            We are a team of dedicated professionals committed to providing top-notch services and solutions for our clients.
          </p>
        </div>

        <div className="mt-10">
          <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
            <div className="relative">
              <dt>
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                  {/* Icon */}
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3"></path>
                  </svg>
                </div>
                <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Our Mission</p>
              </dt>
              <dd className="mt-2 ml-16 text-base text-gray-500">
                Our mission is to deliver innovative and sustainable solutions that exceed client expectations.
              </dd>
            </div>
            <div className="relative">
              <dt>
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                  {/* Icon */}
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4H8v-2h4V8l3 3-3 3v2z"></path>
                  </svg>
                </div>
                <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Our Vision</p>
              </dt>
              <dd className="mt-2 ml-16 text-base text-gray-500">
                To be a globally recognized leader in our field, known for our commitment to quality and client satisfaction.
              </dd>
            </div>
            <div className="relative">
              <dt>
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                  {/* Icon */}
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 8h10M7 12h4m1 8h2m-3-4h6m-6 4v-4m0 0v4m0-4H7m6-6h6m-6 4h6m-6-8h6"></path>
                  </svg>
                </div>
                <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Our Values</p>
              </dt>
              <dd className="mt-2 ml-16 text-base text-gray-500">
                We are driven by our core values of integrity, innovation, and excellence.
              </dd>
            </div>
            <div className="relative">
              <dt>
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                  {/* Icon */}
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 11c2.209 0 4-1.791 4-4s-1.791-4-4-4-4 1.791-4 4 1.791 4 4 4zM5.456 13.5L4 17l6 6 1.486-3.5M17 14v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6"></path>
                  </svg>
                </div>
                <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Our Team</p>
              </dt>
              <dd className="mt-2 ml-16 text-base text-gray-500">
                Our team consists of highly skilled professionals with diverse backgrounds and expertise.
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </section>

    {/* Section 2 */}
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">Our Services</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            What We Offer
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            Explore the wide range of services we provide to help your business grow and succeed.
          </p>
        </div>

        <div className="mt-10">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div className="pt-6">
              <div className="flow-root bg-gray-50 rounded-lg px-4 pb-8">
                <div className="-mt-6">
                  <div className="flex items-center justify-center">
                    <span className="p-3 rounded-md bg-indigo-500 text-white">
                      {/* Icon */}
                      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7h6m3 0h6M5 11h14m-1 4H6m6 4H4"></path>
                      </svg>
                    </span>
                  </div>
                  <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">Consulting</h3>
                  <p className="mt-5 text-base text-gray-500">
                    Our experts provide strategic consulting to help you make informed business decisions.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-6">
              <div className="flow-root bg-gray-50 rounded-lg px-4 pb-8">
                <div className="-mt-6">
                  <div className="flex items-center justify-center">
                    <span className="p-3 rounded-md bg-indigo-500 text-white">
                      {/* Icon */}
                      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h4m1 0h3M8 6h5m3 0h3M4 18v-6M4 6v6"></path>
                      </svg>
                    </span>
                  </div>
                  <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">Development</h3>
                  <p className="mt-5 text-base text-gray-500">
                    We offer custom software development services tailored to your business needs.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-6">
              <div className="flow-root bg-gray-50 rounded-lg px-4 pb-8">
                <div className="-mt-6">
                  <div className="flex items-center justify-center">
                    <span className="p-3 rounded-md bg-indigo-500 text-white">
                      {/* Icon */}
                      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-2 4h2m2 2h4m-4-8h6m-6-2H5m3 6h4m-2 4H5m-1-8H2"></path>
                      </svg>
                    </span>
                  </div>
                  <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">Marketing</h3>
                  <p className="mt-5 text-base text-gray-500">
                    Our marketing strategies are designed to help you reach your target audience effectively.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-6">
              <div className="flow-root bg-gray-50 rounded-lg px-4 pb-8">
                <div className="-mt-6">
                  <div className="flex items-center justify-center">
                    <span className="p-3 rounded-md bg-indigo-500 text-white">
                      {/* Icon */}
                      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 6h4M3 12h18M3 6h5M14 6h5m1 6h3m-3 0v-6"></path>
                      </svg>
                    </span>
                  </div>
                  <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">Support</h3>
                  <p className="mt-5 text-base text-gray-500">
                    Our support team is available 24/7 to assist you with any issues or questions.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-6">
              <div className="flow-root bg-gray-50 rounded-lg px-4 pb-8">
                <div className="-mt-6">
                  <div className="flex items-center justify-center">
                    <span className="p-3 rounded-md bg-indigo-500 text-white">
                      {/* Icon */}
                      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 7h6M3 7h6m6 5h3m0 0h3m-3 0v6m-6-6h3m0 0H9m3-3h4m0-2h-4m-4 5h3m0 0h-3m0 4H5"></path>
                      </svg>
                    </span>
                  </div>
                  <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">Analytics</h3>
                  <p className="mt-5 text-base text-gray-500">
                    We provide in-depth analytics to help you understand your business performance.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-6">
              <div className="flow-root bg-gray-50 rounded-lg px-4 pb-8">
                <div className="-mt-6">
                  <div className="flex items-center justify-center">
                    <span className="p-3 rounded-md bg-indigo-500 text-white">
                      {/* Icon */}
                      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 6h5m2 0h4m-4 6h5m2 0h1m-1-6h1M3 6h2m1 0H3m0 6h1m1 0H3m0-6h2m0 6H3"></path>
                      </svg>
                    </span>
                  </div>
                  <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">Training</h3>
                  <p className="mt-5 text-base text-gray-500">
                    We offer training programs to help your team stay up-to-date with the latest skills.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  </div>
  )
}
