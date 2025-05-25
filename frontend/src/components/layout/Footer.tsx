import React from 'react';
import Link from 'next/link';
import { useTheme } from '@/features/theme/ThemeContext';

const Footer: React.FC = () => {
  const { theme } = useTheme();
  
  return (
    <footer className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'} py-8 transition-colors duration-300`}>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className={`text-xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>Ctrl+Shift</h3>
            <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>A modern solution for on-call shift management and scheduling.</p>
          </div>
          <div>
            <h3 className={`text-lg font-semibold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>Quick Links</h3>            <ul className={`space-y-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
              <li><Link href="/" className={`${theme === 'dark' ? 'hover:text-white' : 'hover:text-gray-900'}`}>Home</Link></li>
              <li><Link href="/shifts" className={`${theme === 'dark' ? 'hover:text-white' : 'hover:text-gray-900'}`}>Schedules</Link></li>
              <li><Link href="/teams" className={`${theme === 'dark' ? 'hover:text-white' : 'hover:text-gray-900'}`}>Teams</Link></li>
              <li><Link href="/reports" className={`${theme === 'dark' ? 'hover:text-white' : 'hover:text-gray-900'}`}>Reports</Link></li>
              <li><Link href="/support-superhero" className={`${theme === 'dark' ? 'hover:text-white' : 'hover:text-gray-900'}`}>Support Heroes</Link></li>
            </ul>
          </div>
          <div>
            <h3 className={`text-lg font-semibold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>Clone Repository</h3>
            <div className={`${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-200'} rounded-md p-4 font-mono text-sm`}>
              <div className="flex items-center mb-2">
                <svg className="h-6 w-6 mr-2" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
                <span className={`font-semibold ${theme === 'dark' ? 'text-green-400' : 'text-green-600'}`}>GitHub</span>
              </div>
              <code className={`${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'} block select-all overflow-x-auto whitespace-nowrap`}>
                git clone https://github.com/your-organization/ctrl-shift.git
              </code>
              <a 
                href="https://github.com/your-organization/ctrl-shift" 
                target="_blank" 
                rel="noopener noreferrer" 
                className={`inline-flex items-center mt-3 ${theme === 'dark' ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors`}
              >
                <span>View on GitHub</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          </div>
        </div>
        <div className={`border-t ${theme === 'dark' ? 'border-gray-700' : 'border-gray-300'} mt-8 pt-8 text-center ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
          <p>© 2025 Ctrl+Shift. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;