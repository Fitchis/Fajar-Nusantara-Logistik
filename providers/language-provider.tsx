'use client';

import React, { createContext, useEffect, useState } from 'react';

type Lang = 'id' | 'en';

const defaultLang: Lang = 'id';

const translations: Record<Lang, Record<string, string>> = {
  id: {
    business_lines: 'Lini Bisnis Kami',
    business_subtitle: 'Kami menangani berbagai jenis pengiriman dengan profesionalisme tinggi',
    image_not_available: 'Gambar belum tersedia',
    add_image_prompt: 'Silakan tambahkan gambar untuk kategori ini',
    operational_24: 'Operasional 24/7',
    armada_lengkap: 'Armada Lengkap',
    gudang_modern: 'Gudang Modern',
    cat_pengiriman_kendaraan_title: 'Pengiriman Kendaraan',
    cat_pengiriman_kendaraan_desc: 'Pengiriman mobil, motor, dan kendaraan lainnya ke seluruh Indonesia',
    cat_barang_title: 'Barang / Cargo',
    cat_barang_desc: 'Pengiriman barang dan kargo dengan sistem terstruktur dan aman',
    cat_alatberat_title: 'Alat Berat',
    cat_alatberat_desc: 'Transportasi alat berat untuk proyek konstruksi dan pertambangan',
    cat_material_title: 'Material Project',
    cat_material_desc: 'Pengiriman material proyek dalam jumlah besar dan kompleks',
    cat_kapal_title: 'Kapal / Tongkang',
    cat_kapal_desc: 'Pengiriman via kapal tongkang — lihat galeri kapal',
    contact_us: 'Hubungi Kami',
    testimonials: 'Testimoni Klien',
    join_clients: 'Bergabunglah dengan Klien Kami',
    partner_heading: 'Partner Kesuksesan Kami',
    be_part: 'Jadilah Bagian dari Kesuksesan',
    chat_whatsapp: 'Chat via WhatsApp',
    trusted_by: 'Dipercaya oleh',
    companies: 'Perusahaan',
    ready_24: 'Siap melayani kebutuhan logistik Anda 24/7',
    services_title: 'Layanan Kami',
    services_subtitle: 'Solusi logistik komprehensif melalui jalur darat, laut, dan udara',
    tab_darat: 'Darat',
    tab_laut: 'Laut',
    tab_udara: 'Udara',
    need_info: 'Butuh informasi lebih lanjut tentang layanan kami?',
    contact_now: 'Hubungi Kami Sekarang',
    home: 'Beranda',
    about: 'Tentang',
    services: 'Layanan',
    why_choose_heading: 'Why Choose Us?',
    why_choose_paragraph: 'Kami berkomitmen memberikan layanan terbaik dengan keunggulan yang membedakan kami.',
    feature1_title: 'Pengiriman Cepat & Tepat Waktu',
    feature1_text: 'Kami mengutamakan efisiensi waktu dengan sistem operasional terstruktur sehingga barang dan kendaraan Anda sampai sesuai jadwal yang ditentukan.',
    feature2_title: 'Keamanan Terjamin',
    feature2_text: 'Setiap pengiriman ditangani dengan standar keamanan tinggi untuk memastikan barang tetap dalam kondisi aman selama proses distribusi.',
    feature3_title: 'Terpercaya & Profesional',
    feature3_text: 'Kami menjunjung tinggi kepercayaan pelanggan melalui pelayanan yang transparan, profesional, dan bertanggung jawab.',
    reach_title: 'Jangkauan Pengiriman Seluruh Nusantara',
    reach_text: 'Menghubungkan bisnis Anda ke berbagai daerah di Indonesia, dari kota besar hingga wilayah terpencil.',
    integrated_title: 'Solusi Logistik Terpadu',
    integrated_text: 'Layanan pengiriman barang dan kendaraan dengan sistem yang fleksibel sesuai kebutuhan bisnis maupun personal.',
    consult_button: 'Konsultasi Gratis',
    gallery: 'Galeri',
    clients: 'Klien',
    contact: 'Kontak',
    phone: 'Phone:',
    email: 'Email:',
    hero_heading: 'COMPANY\nPROFILE',
    hero_subtitle: 'Dari Satu Titik ke Seluruh Nusantara, Kami Siap Mengantar',
    who_are_we: 'Siapa Kami?',
    overview_paragraph: 'Fajar Nusantara Logistik adalah perusahaan jasa logistik dan ekspedisi di Indonesia yang memiliki visi untuk menyediakan solusi pengiriman barang dan kendaraan yang cepat, aman, dan terpercaya. Kami berkomitmen menjadi mitra andalan Anda dalam menghubungkan bisnis dan kebutuhan Anda ke seluruh penjuru Nusantara.',
    experience_title: 'Pengalaman',
    experience_text: 'Tim profesional berpengalaman di industri logistik.',
    armada_title: 'Armada',
    armada_text: 'Armada kapal dan kendaraan darat yang terawat dan terpercaya.',
    solusi_title: 'Solusi',
    solusi_text: 'Layanan end-to-end untuk kebutuhan logistik dan distribusi.',
    vision_title: 'Visi',
    vision_text: 'Menjadi perusahaan logistik terkemuka di Indonesia dengan pelayanan dan harga terbaik, memberikan solusi distribusi yang efektif dan efisien untuk mendukung pertumbuhan bisnis klien.',
    mission_title: 'Misi',
    mission_point_1: 'Memberikan distribusi yang efektif dan efisien',
    mission_point_2: 'Menyediakan tim profesional yang handal',
    mission_point_3: 'Memaksimalkan kepuasan pelanggan',
    mission_point_4: 'Membangun kerja sama yang baik dengan semua pihak',
    structure_title: 'Struktur',
    director_name: 'Firman Setiawan',
    director_title: 'Director',
    our_uniform_title: 'Our Uniform',
    uniform_paragraph: 'Tim kami memakai seragam resmi yang dirancang untuk profesionalisme dan keselamatan di lapangan. Arahkan kursor ke titik pada gambar untuk melihat detail tiap seragam.',
    hotspot_outdoor_title: 'Outdoor Dresscode',
    hotspot_outdoor_text: 'Full safety: helmet, vest, and protective shoes.',
    hotspot_navy_title: 'Official Navy Uniform',
    hotspot_navy_text: 'Dark navy shirt used for on-site workers.',
    hotspot_white_title: 'Official White Uniform',
    hotspot_white_text: 'Office uniform for administrative staff.',
    hover_or_click: 'Arahkan kursor ke titik pada gambar untuk melihat detail tiap seragam.',
    all_clients: 'Semua Klien',
    forwarder: 'Forwarder',
    corporate: 'Corporate',
    otomotif: 'Otomotif & Kendaraan',
    properti: 'Properti & Pengembangan Lahan',
  },
  en: {
    business_lines: 'Our Business Lines',
    business_subtitle: 'We handle various types of shipments with high professionalism',
    image_not_available: 'Image not available',
    add_image_prompt: 'Please add images for this category',
    operational_24: 'Operational 24/7',
    armada_lengkap: 'Complete Fleet',
    gudang_modern: 'Modern Warehouse',
    cat_pengiriman_kendaraan_title: 'Vehicle Shipping',
    cat_pengiriman_kendaraan_desc: 'Shipping cars, motorcycles, and other vehicles across Indonesia',
    cat_barang_title: 'Goods / Cargo',
    cat_barang_desc: 'Shipment of goods and cargo with structured and secure processes',
    cat_alatberat_title: 'Heavy Equipment',
    cat_alatberat_desc: 'Transporting heavy equipment for construction and mining projects',
    cat_material_title: 'Project Materials',
    cat_material_desc: 'Shipping large and complex project materials',
    cat_kapal_title: 'Ship / Barge',
    cat_kapal_desc: 'Shipping via barges — see the ship gallery',
    contact_us: 'Contact Us',
    testimonials: 'Client Testimonials',
    join_clients: 'Join Our Clients',
    partner_heading: 'Our Success Partners',
    be_part: 'Be Part of the Success',
    chat_whatsapp: 'Chat via WhatsApp',
    trusted_by: 'Trusted by',
    companies: 'Companies',
    ready_24: 'Ready to serve your logistics needs 24/7',
    services_title: 'Our Services',
    services_subtitle: 'Comprehensive logistics solutions via land, sea, and air',
    tab_darat: 'Land',
    tab_laut: 'Sea',
    tab_udara: 'Air',
    need_info: 'Need more information about our services?',
    contact_now: 'Contact Us Now',
    home: 'Home',
    about: 'About',
    services: 'Services',
    why_choose_heading: 'Why Choose Us?',
    why_choose_paragraph: 'We are committed to delivering the best service with advantages that set us apart.',
    feature1_title: 'Fast & On-Time Delivery',
    feature1_text: 'We prioritize time efficiency with structured operations so your goods and vehicles arrive as scheduled.',
    feature2_title: 'Guaranteed Security',
    feature2_text: 'Each shipment is handled with high security standards to ensure items remain safe during distribution.',
    feature3_title: 'Trusted & Professional',
    feature3_text: 'We uphold customer trust through transparent, professional, and accountable service.',
    reach_title: 'Nationwide Coverage',
    reach_text: 'Connecting your business across Indonesia, from major cities to remote areas.',
    integrated_title: 'Integrated Logistics Solutions',
    integrated_text: 'Goods and vehicle shipping with flexible systems tailored to business or personal needs.',
    consult_button: 'Free Consultation',
    gallery: 'Gallery',
    clients: 'Clients',
    contact: 'Contact',
    phone: 'Phone:',
    email: 'Email:',
    hero_heading: 'COMPANY\nPROFILE',
    hero_subtitle: 'From One Point to The Entire Archipelago, We Deliver',
    who_are_we: 'Who Are We?',
    overview_paragraph: 'Fajar Nusantara Logistik is a logistics and expedition service company in Indonesia with a vision to provide fast, safe, and trusted shipping solutions for goods and vehicles. We are committed to being your reliable partner in connecting your business needs across the archipelago.',
    experience_title: 'Experience',
    experience_text: 'A professional team with extensive logistics industry experience.',
    armada_title: 'Fleet',
    armada_text: 'Well-maintained sea and land vehicle fleet.',
    solusi_title: 'Solutions',
    solusi_text: 'End-to-end services for logistics and distribution needs.',
    vision_title: 'Vision',
    vision_text: 'To become a leading logistics company in Indonesia providing the best service and pricing, offering effective and efficient distribution solutions to support client business growth.',
    mission_title: 'Mission',
    mission_point_1: 'Provide effective and efficient distribution',
    mission_point_2: 'Provide a reliable professional team',
    mission_point_3: 'Maximize customer satisfaction',
    mission_point_4: 'Build strong cooperation with all stakeholders',
    structure_title: 'Structure',
    director_name: 'Firman Setiawan',
    director_title: 'Director',
    our_uniform_title: 'Our Uniform',
    uniform_paragraph: 'Our team wears official uniforms designed for professionalism and on-site safety. Hover over the markers to view uniform details.',
    hotspot_outdoor_title: 'Outdoor Dresscode',
    hotspot_outdoor_text: 'Full safety: helmet, vest, and protective shoes.',
    hotspot_navy_title: 'Official Navy Uniform',
    hotspot_navy_text: 'Dark navy shirt used for on-site workers.',
    hotspot_white_title: 'Official White Uniform',
    hotspot_white_text: 'Office uniform for administrative staff.',
    hover_or_click: 'Hover or click the markers to view details.',
    all_clients: 'All Clients',
    forwarder: 'Forwarder',
    corporate: 'Corporate',
    otomotif: 'Automotive & Vehicles',
    properti: 'Property & Development',
  },
};

type LanguageContextShape = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (k: string) => string;
};

const LanguageContext = React.createContext<LanguageContextShape>({
  lang: defaultLang,
  setLang: () => {},
  t: (k: string) => k,
});

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLangState] = useState<Lang>(defaultLang);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const stored = localStorage.getItem('app_lang') as Lang | null;
      if (stored) setLangState(stored);
    } catch {
      // ignore storage errors
    }
  }, []);

  useEffect(() => {
    if (!mounted) return;
    try {
      localStorage.setItem('app_lang', lang);
    } catch {
      // ignore storage errors
    }
  }, [lang, mounted]);

  const setLang = (l: Lang) => setLangState(l);
  const t = (k: string) => translations[lang]?.[k] ?? k;

  return <LanguageContext.Provider value={{ lang, setLang, t }}>{children}</LanguageContext.Provider>;
};

export const useLanguage = () => {
  const context = React.useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export default LanguageContext;
