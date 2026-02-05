import { MapPin, Phone, Mail, Instagram, } from 'lucide-react';
import logo from '../assets/logo.jpeg';
import { useLanguage } from '../context/useLanguage';

const Footer = () => {
  const { t } = useLanguage();
  return (
    <footer id="contact" className="bg-[#002147] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <img src={logo} alt="INL Logo" className="h-10 w-auto" />
            </div>
            <p className="text-gray-300 leading-relaxed mb-6">
              Solusi logistik terpercaya untuk kebutuhan pengiriman Anda di seluruh Indonesia.
            </p>
          </div>

          <div>
            <h4 className="text-xl font-bold mb-6 text-sky-400">Jakarta Office</h4>
            <div className="space-y-4">
              <div className="flex items-start">
                <MapPin className="h-5 w-5 text-sky-400 mt-1 mr-3 flex-shrink-0" />
                <p className="text-gray-300">
                  Jl Slamet Riyadi<br />
                  Karya Titan Building Lt.1<br />
                  Jakarta Timur
                </p>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-xl font-bold mb-6 text-sky-400">Makassar Office</h4>
            <div className="space-y-4">
              <div className="flex items-start">
                <MapPin className="h-5 w-5 text-sky-400 mt-1 mr-3 flex-shrink-0" />
                <p className="text-gray-300">
                  Jl. Lae-Lae No. 8A<br />
                  Makassar<br />
                  Sulawesi Selatan
                </p>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-xl font-bold mb-6 text-sky-400">{t('contact_us')}</h4>
            <div className="space-y-4">
              <a
                href="tel:082156785580"
                className="flex items-center hover:text-sky-400 transition-colors duration-200"
              >
                <Phone className="h-5 w-5 text-sky-400 mr-3 flex-shrink-0" />
                <span>082156785580</span>
              </a>
              <a
                href="mailto:fajarnusantaralogistik@gmail.com"
                className="flex items-start hover:text-sky-400 transition-colors duration-200"
              >
                <Mail className="h-5 w-5 text-sky-400 mt-1 mr-3 flex-shrink-0" />
                <span className="break-all">fajarnusantaralogistik@gmail.com</span>
              </a>
              <a
                href="https://instagram.com/fn_logistik"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center hover:text-sky-400 transition-colors duration-200"
              >
                <Instagram className="h-5 w-5 text-sky-400 mr-3 flex-shrink-0" />
                <span>@fn_logistik</span>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm text-center md:text-left">
              &copy; 2025 CV Fajar Nusantara Logistik. All rights reserved.
            </p>
            <p className="text-gray-500 text-xs text-center md:text-right">
              Terdaftar di Kemenkumham: AHU-0025699-AH.01.14 Tahun 2025
            </p>
          </div>
        </div>
      </div>

      <div className="bg-sky-600 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <p className="text-white font-semibold">{t('ready_24')}</p>
            <a
              href="https://wa.me/6282156785580"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-2 bg-white text-sky-600 font-semibold rounded-lg hover:bg-gray-100 transition-all duration-200"
            >
              {t('contact_us')}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
