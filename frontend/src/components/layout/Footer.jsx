import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, MapPin, Linkedin } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { t } = useTranslation();

  return (
    <footer className="bg-[#161716] border-t border-[#343633]">
      <div className="max-w-[1400px] mx-auto px-5 md:px-10 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="inline-block mb-6">
              <span className="text-2xl font-bold text-[#c8f000] tracking-tight">Arxéon</span>
            </Link>
            <p className="text-[#9a9a96] text-sm leading-relaxed mb-6">
              {t('footer.description')}
            </p>
            <div className="flex gap-4">
              <a
                href="https://www.linkedin.com/company/thearxeon/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-[#343633] flex items-center justify-center text-[#9a9a96] hover:text-[#c8f000] hover:border-[#c8f000] transition-colors"
              >
                <Linkedin size={18} />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-white font-semibold mb-6">{t('footer.navigation')}</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-[#9a9a96] hover:text-[#c8f000] transition-colors text-sm">
                  {t('nav.home')}
                </Link>
              </li>
              <li>
                <Link to="/servizi" className="text-[#9a9a96] hover:text-[#c8f000] transition-colors text-sm">
                  {t('nav.services')}
                </Link>
              </li>
              <li>
                <Link to="/metodo" className="text-[#9a9a96] hover:text-[#c8f000] transition-colors text-sm">
                  {t('nav.method')}
                </Link>
              </li>
              <li>
                <Link to="/valutazione" className="text-[#9a9a96] hover:text-[#c8f000] transition-colors text-sm">
                  {t('nav.evaluation')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-semibold mb-6">{t('footer.services_section')}</h4>
            <ul className="space-y-3">
              <li className="text-[#9a9a96] text-sm">{t('footer.services.social')}</li>
              <li className="text-[#9a9a96] text-sm">{t('footer.services.ads')}</li>
              <li className="text-[#9a9a96] text-sm">{t('footer.services.email')}</li>
              <li className="text-[#9a9a96] text-sm">{t('footer.services.crm')}</li>
              <li className="text-[#9a9a96] text-sm">{t('footer.services.seo')}</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-6">{t('footer.contact')}</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Mail size={18} className="text-[#c8f000] mt-0.5 flex-shrink-0" />
                <a href="mailto:info@arxeon.ch" className="text-[#9a9a96] hover:text-[#c8f000] transition-colors text-sm">
                  info@arxeon.ch
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-[#c8f000] mt-0.5 flex-shrink-0" />
                <span className="text-[#9a9a96] text-sm">
                  {t('footer.location')}
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-[#343633] flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[#6f716d] text-sm">
            © {currentYear} Arxéon. {t('footer.rights')}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
