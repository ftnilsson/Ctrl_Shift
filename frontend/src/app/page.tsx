"use client";
import React, { useEffect, useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { useTheme } from '@/features/theme/ThemeContext';
import Link from 'next/link';
import { getLandingPageContent, LandingPageContent } from '@/services/landingPageService';
import Image from 'next/image';

export default function LandingPage() {
  const { theme } = useTheme();
  const [content, setContent] = useState<LandingPageContent | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const pageContent = await getLandingPageContent();
        setContent(pageContent);
      } catch (error) {
        console.error("Failed to load landing page content:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, []);

  if (loading) {
    return (
      <div className={`flex flex-col min-h-screen items-center justify-center ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        <p className="mt-4">Loading...</p>
      </div>
    );
  }

  if (!content) {
    return (
      <div className={`flex flex-col min-h-screen items-center justify-center ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
        <p>Failed to load content. Please try again later.</p>
      </div>
    );
  }

  return (
    <div className={`flex flex-col min-h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <Header />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className={`py-16 px-4 md:px-8 lg:px-16 ${theme === 'dark' ? 'bg-gray-800' : 'bg-blue-50'}`}>
          <div className="container mx-auto max-w-6xl">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 mb-8 md:mb-0 md:pr-8">
                <h1 className={`text-4xl md:text-5xl font-bold mb-6 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  {content.hero.title}<br />
                  <span className="text-blue-600">{content.hero.highlight}</span>
                </h1>
                <p className={`text-lg mb-8 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                  {content.hero.description}
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href={content.hero.primaryButtonLink} className="px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors inline-block text-center">
                    {content.hero.primaryButtonText}
                  </Link>
                  <Link href={content.hero.secondaryButtonLink} className={`px-6 py-3 rounded-md font-medium inline-block text-center ${theme === 'dark' ? 'bg-gray-700 text-white hover:bg-gray-600' : 'bg-white text-gray-800 hover:bg-gray-100'} transition-colors`}>
                    {content.hero.secondaryButtonText}
                  </Link>
                </div>
              </div>
              <div className="md:w-1/2">
                <div className={`rounded-lg shadow-xl overflow-hidden ${theme === 'dark' ? 'bg-gray-700' : 'bg-white'}`}>
                  <div className="p-2 bg-gray-800">
                    <div className="flex items-center">
                      <div className="flex space-x-1.5">
                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <Image
                      width={300}
                      height={300}
                      src="/window.svg" 
                      alt="Ctrl+Shift Dashboard Preview" 
                      className="w-full h-auto"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className={`py-16 px-4 md:px-8 lg:px-16 ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'}`}>
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <h2 className={`text-3xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                {content.features.title}
              </h2>
              <p className={`max-w-2xl mx-auto ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                {content.features.subtitle}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {content.features.features.map((feature, index) => (
                <div key={index} className={`rounded-lg p-6 transition-all ${theme === 'dark' ? 'bg-gray-800 hover:bg-gray-750' : 'bg-gray-50 hover:bg-gray-100'}`}>
                  <div className={`p-3 rounded-full inline-block mb-4 ${
                    index === 0 ? theme === 'dark' ? 'bg-blue-900' : 'bg-blue-100' :
                    index === 1 ? theme === 'dark' ? 'bg-purple-900' : 'bg-purple-100' :
                    index === 2 ? theme === 'dark' ? 'bg-yellow-900' : 'bg-yellow-100' :
                    theme === 'dark' ? 'bg-green-900' : 'bg-green-100'
                  }`}>
                    <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${
                      index === 0 ? theme === 'dark' ? 'text-blue-300' : 'text-blue-600' :
                      index === 1 ? theme === 'dark' ? 'text-purple-300' : 'text-purple-600' :
                      index === 2 ? theme === 'dark' ? 'text-yellow-300' : 'text-yellow-600' :
                      theme === 'dark' ? 'text-green-300' : 'text-green-600'
                    }`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={feature.icon} />
                    </svg>
                  </div>
                  <h3 className={`text-xl font-semibold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{feature.title}</h3>
                  <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Our Commitment Section */}
        <section className={`py-16 px-4 md:px-8 lg:px-16 ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}>
          <div className="container mx-auto max-w-6xl">
            <div className="flex flex-col md:flex-row items-center md:justify-between">
              <div className="md:w-1/2 mb-8 md:mb-0 md:pr-12">
                <h2 className={`text-3xl font-bold mb-6 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  Our Commitment to You
                </h2>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <svg className="h-6 w-6 text-blue-500 mr-3 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                      <strong>Free Forever</strong> - No sudden switches to paid plans, no premium features. What you see is what you get, always.
                    </p>
                  </div>
                  <div className="flex items-start">
                    <svg className="h-6 w-6 text-blue-500 mr-3 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                      <strong>No Vendor Lock-in</strong> - Fully open-source means you own your data and can self-host your instance anywhere.
                    </p>
                  </div>
                  <div className="flex items-start">
                    <svg className="h-6 w-6 text-blue-500 mr-3 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                      <strong>Community-Driven</strong> - We believe great software is built by engaged communities who care about support and customer experience.
                    </p>
                  </div>
                </div>
              </div>
              <div className="md:w-1/2 flex justify-center">
                <div className={`rounded-lg p-6 ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'} max-w-md`}>
                  <h3 className={`text-xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Join Our Community</h3>
                  <p className={`mb-6 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                    Fork the repository, submit pull requests, or report issues. Everyone is welcome to contribute!
                  </p>
                  <div className="flex flex-col space-y-3">
                    <a href="https://github.com/your-username/ctrl-shift" 
                       target="_blank" 
                       rel="noopener noreferrer"
                       className={`flex items-center px-6 py-3 rounded ${
                         theme === 'dark' ? 'bg-gray-800 hover:bg-gray-900' : 'bg-white hover:bg-gray-100'
                       } transition-colors`}
                    >
                      <svg className="h-5 w-5 mr-3" fill="currentColor" viewBox="0 0 24 24">
                        <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.868-.013-1.703-2.782.603-3.369-1.338-3.369-1.338-.454-1.152-1.11-1.459-1.11-1.459-.908-.619.069-.606.069-.606 1.003.07 1.531 1.029 1.531 1.029.892 1.529 2.341 1.088 2.91.832.09-.646.349-1.086.635-1.337-2.22-.251-4.555-1.109-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.104-.251-.446-1.262.097-2.631 0 0 .84-.268 2.75 1.022A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.29 2.747-1.022 2.747-1.022.544 1.369.202 2.38.1 2.631.64.699 1.028 1.592 1.028 2.683 0 3.841-2.337 4.687-4.565 4.934.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.741 0 .267.18.578.688.479C19.138 20.161 22 16.416 22 12c0-5.523-4.477-10-10-10z" />
                      </svg>
                      Star on GitHub
                    </a>
                    <a href="/dashboard" 
                       className={`flex items-center px-6 py-3 rounded bg-blue-600 hover:bg-blue-700 text-white transition-colors`}
                    >
                      <svg className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
                      </svg>
                      Go to Dashboard
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Get Started Section */}
        <section className={`py-16 px-4 md:px-8 lg:px-16 ${theme === 'dark' ? 'bg-gray-900' : 'bg-blue-50'}`}>
          <div className="container mx-auto max-w-6xl text-center">
            <h2 className={`text-3xl font-bold mb-6 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              {content.getStarted.title}
            </h2>
            <p className={`max-w-2xl mx-auto mb-8 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
              {content.getStarted.description}
            </p>
            <div className="flex justify-center gap-4">
              <Link href={content.getStarted.buttonLink} className="px-8 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors inline-block">
                {content.getStarted.buttonText}
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
