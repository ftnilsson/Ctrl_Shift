"use client";
import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { useTheme } from '@/features/theme/ThemeContext';
import Link from 'next/link';
import Image from 'next/image';

export default function SupportSuperheroPage() {
  const { theme } = useTheme();

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
                  Become a Support <span className="text-blue-600">Superhero</span>
                </h1>
                <p className={`text-lg mb-8 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                  Great support isn&apos;t just about solving problems — it&apos;s about creating experiences that turn customers into advocates and community members into contributors.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/dashboard" className="px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors inline-block text-center">
                    Back to Dashboard
                  </Link>
                  <a href="#principles" className={`px-6 py-3 rounded-md font-medium inline-block text-center ${theme === 'dark' ? 'bg-gray-700 text-white hover:bg-gray-600' : 'bg-white text-gray-800 hover:bg-gray-100'} transition-colors`}>
                    Learn More
                  </a>
                </div>
              </div>
              <div className="md:w-1/2">
                <div className={`rounded-lg shadow-xl overflow-hidden ${theme === 'dark' ? 'bg-gray-700' : 'bg-white'} p-6`}>
                  <Image
                    width={500}
                    height={400}
                    src="/support-heroes.png" 
                    alt="Support Superheroes" 
                    className="w-full h-auto rounded-lg"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Core Principles */}
        <section id="principles" className={`py-16 px-4 md:px-8 lg:px-16 ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'}`}>
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <h2 className={`text-3xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                Core Principles of Support Excellence
              </h2>
              <p className={`max-w-2xl mx-auto ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                These guidelines will help you provide exceptional support that builds trust and strengthens relationships.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className={`rounded-lg p-6 transition-all ${theme === 'dark' ? 'bg-gray-800 hover:bg-gray-750' : 'bg-gray-50 hover:bg-gray-100'}`}>
                <div className={`p-3 rounded-full inline-block mb-4 ${theme === 'dark' ? 'bg-blue-900' : 'bg-blue-100'}`}>
                  <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${theme === 'dark' ? 'text-blue-300' : 'text-blue-600'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
                <h3 className={`text-xl font-semibold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Active Listening</h3>
                <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                  Focus on truly understanding the issue before proposing solutions. Read between the lines and ask clarifying questions to uncover the real problem.
                </p>
              </div>
              
              <div className={`rounded-lg p-6 transition-all ${theme === 'dark' ? 'bg-gray-800 hover:bg-gray-750' : 'bg-gray-50 hover:bg-gray-100'}`}>
                <div className={`p-3 rounded-full inline-block mb-4 ${theme === 'dark' ? 'bg-purple-900' : 'bg-purple-100'}`}>
                  <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${theme === 'dark' ? 'text-purple-300' : 'text-purple-600'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className={`text-xl font-semibold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Responsiveness</h3>
                <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                  Acknowledge requests quickly, even if you don&apos;t have an immediate solution. Set realistic expectations about response times and keep people updated on progress.
                </p>
              </div>
              
              <div className={`rounded-lg p-6 transition-all ${theme === 'dark' ? 'bg-gray-800 hover:bg-gray-750' : 'bg-gray-50 hover:bg-gray-100'}`}>
                <div className={`p-3 rounded-full inline-block mb-4 ${theme === 'dark' ? 'bg-yellow-900' : 'bg-yellow-100'}`}>
                  <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${theme === 'dark' ? 'text-yellow-300' : 'text-yellow-600'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className={`text-xl font-semibold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Empowerment</h3>
                <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                  Don&apos;t just solve problems — teach and empower others. Provide the resources, knowledge, and confidence users need to solve similar issues in the future.
                </p>
              </div>
              
              <div className={`rounded-lg p-6 transition-all ${theme === 'dark' ? 'bg-gray-800 hover:bg-gray-750' : 'bg-gray-50 hover:bg-gray-100'}`}>
                <div className={`p-3 rounded-full inline-block mb-4 ${theme === 'dark' ? 'bg-green-900' : 'bg-green-100'}`}>
                  <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${theme === 'dark' ? 'text-green-300' : 'text-green-600'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className={`text-xl font-semibold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Empathy</h3>
                <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                  Connect on a human level. Recognize the emotions behind the requests and show genuine understanding of the impact issues have on users&apos; work and goals.
                </p>
              </div>
              
              <div className={`rounded-lg p-6 transition-all ${theme === 'dark' ? 'bg-gray-800 hover:bg-gray-750' : 'bg-gray-50 hover:bg-gray-100'}`}>
                <div className={`p-3 rounded-full inline-block mb-4 ${theme === 'dark' ? 'bg-indigo-900' : 'bg-indigo-100'}`}>
                  <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${theme === 'dark' ? 'text-indigo-300' : 'text-indigo-600'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <h3 className={`text-xl font-semibold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Knowledge Sharing</h3>
                <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                  Document common issues, solutions, and workflows. Create a knowledge base that grows over time and becomes an invaluable resource for your team and community.
                </p>
              </div>
              
              <div className={`rounded-lg p-6 transition-all ${theme === 'dark' ? 'bg-gray-800 hover:bg-gray-750' : 'bg-gray-50 hover:bg-gray-100'}`}>
                <div className={`p-3 rounded-full inline-block mb-4 ${theme === 'dark' ? 'bg-red-900' : 'bg-red-100'}`}>
                  <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${theme === 'dark' ? 'text-red-300' : 'text-red-600'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                </div>
                <h3 className={`text-xl font-semibold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Continuous Improvement</h3>
                <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                  Use every support interaction as an opportunity to improve your product. Collect feedback, identify patterns, and champion the changes that will prevent future issues.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Best Practices */}
        <section className={`py-16 px-4 md:px-8 lg:px-16 ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'}`}>
          <div className="container mx-auto max-w-6xl">
            <div className="flex flex-col md:flex-row items-start md:justify-between">
              <div className="md:w-1/2 mb-8 md:mb-0 md:pr-12">
                <h2 className={`text-3xl font-bold mb-6 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  Being Great On-Call
                </h2>
                <div className="space-y-6">
                  <div>
                    <h3 className={`text-xl font-semibold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Before Your Shift</h3>
                    <ul className={`list-disc pl-5 space-y-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                      <li>Review recent incidents and responses to understand current patterns</li>
                      <li>Ensure notification systems are properly configured</li>
                      <li>Check that you have necessary access to all required systems</li>
                      <li>Make sure your tooling and reference materials are up-to-date</li>
                      <li>Set up a conducive environment for focused work during emergencies</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className={`text-xl font-semibold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>During Your Shift</h3>
                    <ul className={`list-disc pl-5 space-y-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                      <li>Acknowledge alerts promptly, even if you are still investigating</li>
                      <li>Follow established incident response protocols</li>
                      <li>Document your actions and findings in real-time</li>
                      <li>Don&apos;t hesitate to escalate when needed - early escalation is better than late</li>
                      <li>Keep stakeholders updated with clear, concise communications</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="md:w-1/2">
                <div className={`rounded-lg p-6 ${theme === 'dark' ? 'bg-gray-700' : 'bg-white'}`}>
                  <h3 className={`text-xl font-semibold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>After Your Shift</h3>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className={`p-2 rounded-full mr-3 ${theme === 'dark' ? 'bg-gray-800' : 'bg-blue-100'}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${theme === 'dark' ? 'text-blue-300' : 'text-blue-600'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Document Everything</h4>
                        <p className={`mt-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                          Create comprehensive handover notes and update documentation based on what you learned during your shift.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className={`p-2 rounded-full mr-3 ${theme === 'dark' ? 'bg-gray-800' : 'bg-blue-100'}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${theme === 'dark' ? 'text-blue-300' : 'text-blue-600'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                      </div>
                      <div>
                        <h4 className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Follow Up</h4>
                        <p className={`mt-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                          Address any open issues and follow up on incidents that occurred during your shift to ensure they are being properly resolved.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className={`p-2 rounded-full mr-3 ${theme === 'dark' ? 'bg-gray-800' : 'bg-blue-100'}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${theme === 'dark' ? 'text-blue-300' : 'text-blue-600'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Suggest Improvements</h4>
                        <p className={`mt-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                          Identify automation opportunities and process improvements based on your experience during the shift.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className={`p-2 rounded-full mr-3 ${theme === 'dark' ? 'bg-gray-800' : 'bg-blue-100'}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${theme === 'dark' ? 'text-blue-300' : 'text-blue-600'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                      </div>
                      <div>
                        <h4 className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Rest and Recharge</h4>
                        <p className={`mt-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                          Take time to decompress, especially after stressful incidents. Well-rested support heroes make better decisions.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Quote Section */}
        <section className={`py-16 px-4 md:px-8 lg:px-16 text-center ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'}`}>
          <div className="container mx-auto max-w-4xl">
            <svg className="mx-auto h-12 w-12 text-blue-500 mb-6" fill="currentColor" viewBox="0 0 32 32">
              <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
            </svg>
            
            <blockquote>
              <p className={`text-2xl font-medium italic mb-5 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>
                &quot;Support is not a cost center — it&apos;s a trust center. Every interaction is an opportunity to strengthen relationships and build advocates for your product.&quot;
              </p>
            </blockquote>
            
            <div className="flex items-center justify-center">
              <div className="h-px w-10 bg-blue-500 mr-4"></div>
              <p className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>The Ctrl+Shift Team</p>
              <div className="h-px w-10 bg-blue-500 ml-4"></div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className={`py-16 px-4 md:px-8 lg:px-16 ${theme === 'dark' ? 'bg-blue-900' : 'bg-blue-50'}`}>
          <div className="container mx-auto max-w-6xl text-center">
            <h2 className={`text-3xl font-bold mb-6 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              Ready to Transform Your Support Experience?
            </h2>
            <p className={`max-w-2xl mx-auto mb-8 ${theme === 'dark' ? 'text-blue-100' : 'text-gray-600'}`}>
              Use Ctrl+Shift to organize your support rotations, build a sustainable on-call culture, and deliver world-class support experiences.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/dashboard" className="px-8 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors inline-block">
                Return to Dashboard
              </Link>
              <Link href="/teams" className={`px-8 py-3 rounded-md font-medium inline-block ${theme === 'dark' ? 'bg-blue-800 text-white hover:bg-blue-700' : 'bg-white text-blue-600 hover:bg-gray-100'} transition-colors`}>
                Manage Your Team
              </Link>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
