// /src/components/layout/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  const footerSections = [
    {
      title: 'Marketplace',
      links: [
        { label: 'Browse Books', href: '/books' },
        { label: 'Browse Skills', href: '/skills' },
        { label: 'Sell Books', href: '/sell-book' },
        { label: 'Offer Skills', href: '/offer-skill' },
      ],
    },
    {
      title: 'Support',
      links: [
        { label: 'Help Center', href: '/help' },
        { label: 'Safety Tips', href: '/safety' },
        { label: 'Community Guidelines', href: '/guidelines' },
        { label: 'Contact Us', href: '/contact' },
      ],
    },
    {
      title: 'Legal',
      links: [
        { label: 'Privacy Policy', href: '/privacy' },
        { label: 'Terms of Service', href: '/terms' },
        { label: 'Cookie Policy', href: '/cookies' },
      ],
    },
  ];

  return (
    <footer className="bg-surface dark:bg-surface border-t border-gray-100 dark:border-gray-800 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and description */}
          <div className="md:col-span-1">
            <div className="flex items-center mb-4">
              <span className="text-2xl font-bold text-primary">📚 Campus Market</span>
            </div>
            <p className="text-muted text-sm leading-relaxed">
              Connect with fellow students to buy, sell, and exchange books and skills. Build your
              campus community.
            </p>
            <div className="flex space-x-4 mt-6">
              {/* Social links */}
              <a
                href="#"
                className="text-muted hover:text-primary transition-colors"
                aria-label="Follow us on Twitter"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a
                href="#"
                className="text-muted hover:text-primary transition-colors"
                aria-label="Follow us on Instagram"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 2C7.79086 2 6 3.79086 6 6V14C6 16.2091 7.79086 18 10 18C12.2091 18 14 16.2091 14 14V6C14 3.79086 12.2091 2 10 2ZM10 4C11.1046 4 12 4.89543 12 6V14C12 15.1046 11.1046 16 10 16C8.89543 16 8 15.1046 8 14V6C8 4.89543 8.89543 4 10 4Z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
              <a
                href="#"
                className="text-muted hover:text-primary transition-colors"
                aria-label="Join our Discord"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M8.98 7.91v1.09c0 .26-.04.47-.11.64-.08.17-.19.3-.33.4-.14.1-.3.15-.48.15-.18 0-.34-.05-.48-.15a1.02 1.02 0 01-.33-.4c-.07-.17-.11-.38-.11-.64V7.91c0-.26.04-.47.11-.64.08-.17.19-.3.33-.4.14-.1.3-.15.48-.15.18 0 .34.05.48.15.14.1.25.23.33.4.07.17.11.38.11.64zm2.52 0v1.09c0 .26-.04.47-.11.64-.08.17-.19.3-.33.4-.14.1-.3.15-.48.15-.18 0-.34-.05-.48-.15a1.02 1.02 0 01-.33-.4c-.07-.17-.11-.38-.11-.64V7.91c0-.26.04-.47.11-.64.08-.17.19-.3.33-.4.14-.1.3-.15.48-.15.18 0 .34.05.48.15.14.1.25.23.33.4.07.17.11.38.11.64z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Footer sections */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="text-sm font-semibold text-neutral-900 uppercase tracking-wider mb-4">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      className="text-muted hover:text-primary transition-colors text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom section */}
        <div className="border-t border-gray-100 dark:border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted text-sm">
            © {new Date().getFullYear()} Campus Market. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/privacy" className="text-muted hover:text-primary transition-colors text-sm">
              Privacy
            </Link>
            <Link to="/terms" className="text-muted hover:text-primary transition-colors text-sm">
              Terms
            </Link>
            <Link to="/cookies" className="text-muted hover:text-primary transition-colors text-sm">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
