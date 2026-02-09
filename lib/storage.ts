// Testimonial interface
export interface Testimonial {
  id: string;
  name: string;
  company: string;
  rating: number;
  text: string;
  image?: string;
  createdAt: string;
}

// Gallery interface
export interface GalleryImage {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  category: string;
  createdAt: string;
}

// Contact submission interface
export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  createdAt: string;
  read: boolean;
}

// Team/Client interface
export interface TeamClient {
  id: string;
  name: string;
  position: string;
  type: 'team' | 'client';
  imageUrl?: string;
  description?: string;
  createdAt: string;
}

// Testimonials storage
export function getTestimonials(): Testimonial[] {
  if (typeof window === 'undefined') return [];
  const stored = localStorage.getItem('fnl_testimonials');
  return stored ? JSON.parse(stored) : [];
}

export function saveTestimonials(testimonials: Testimonial[]): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem('fnl_testimonials', JSON.stringify(testimonials));
}

export function addTestimonial(testimonial: Omit<Testimonial, 'id' | 'createdAt'>): Testimonial {
  const testimonials = getTestimonials();
  const newTestimonial: Testimonial = {
    ...testimonial,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
  };
  testimonials.push(newTestimonial);
  saveTestimonials(testimonials);
  return newTestimonial;
}

export function updateTestimonial(id: string, updates: Partial<Testimonial>): Testimonial | null {
  const testimonials = getTestimonials();
  const index = testimonials.findIndex((t) => t.id === id);
  if (index === -1) return null;
  testimonials[index] = { ...testimonials[index], ...updates };
  saveTestimonials(testimonials);
  return testimonials[index];
}

export function deleteTestimonial(id: string): boolean {
  const testimonials = getTestimonials();
  const filtered = testimonials.filter((t) => t.id !== id);
  if (filtered.length === testimonials.length) return false;
  saveTestimonials(filtered);
  return true;
}

// Gallery storage
export function getGalleryImages(): GalleryImage[] {
  if (typeof window === 'undefined') return [];
  const stored = localStorage.getItem('fnl_gallery');
  return stored ? JSON.parse(stored) : [];
}

export function saveGalleryImages(images: GalleryImage[]): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem('fnl_gallery', JSON.stringify(images));
}

export function addGalleryImage(image: Omit<GalleryImage, 'id' | 'createdAt'>): GalleryImage {
  const images = getGalleryImages();
  const newImage: GalleryImage = {
    ...image,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
  };
  images.push(newImage);
  saveGalleryImages(images);
  return newImage;
}

export function updateGalleryImage(id: string, updates: Partial<GalleryImage>): GalleryImage | null {
  const images = getGalleryImages();
  const index = images.findIndex((img) => img.id === id);
  if (index === -1) return null;
  images[index] = { ...images[index], ...updates };
  saveGalleryImages(images);
  return images[index];
}

export function deleteGalleryImage(id: string): boolean {
  const images = getGalleryImages();
  const filtered = images.filter((img) => img.id !== id);
  if (filtered.length === images.length) return false;
  saveGalleryImages(filtered);
  return true;
}

// Contact submissions storage
export function getContactSubmissions(): ContactSubmission[] {
  if (typeof window === 'undefined') return [];
  const stored = localStorage.getItem('fnl_contacts');
  return stored ? JSON.parse(stored) : [];
}

export function saveContactSubmissions(submissions: ContactSubmission[]): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem('fnl_contacts', JSON.stringify(submissions));
}

export function addContactSubmission(submission: Omit<ContactSubmission, 'id' | 'createdAt' | 'read'>): ContactSubmission {
  const submissions = getContactSubmissions();
  const newSubmission: ContactSubmission = {
    ...submission,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
    read: false,
  };
  submissions.push(newSubmission);
  saveContactSubmissions(submissions);
  return newSubmission;
}

export function markContactAsRead(id: string): ContactSubmission | null {
  const submissions = getContactSubmissions();
  const index = submissions.findIndex((s) => s.id === id);
  if (index === -1) return null;
  submissions[index].read = true;
  saveContactSubmissions(submissions);
  return submissions[index];
}

export function deleteContactSubmission(id: string): boolean {
  const submissions = getContactSubmissions();
  const filtered = submissions.filter((s) => s.id !== id);
  if (filtered.length === submissions.length) return false;
  saveContactSubmissions(filtered);
  return true;
}

// Team/Clients storage
export function getTeamClients(): TeamClient[] {
  if (typeof window === 'undefined') return [];
  const stored = localStorage.getItem('fnl_team_clients');
  return stored ? JSON.parse(stored) : [];
}

export function saveTeamClients(items: TeamClient[]): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem('fnl_team_clients', JSON.stringify(items));
}

export function addTeamClient(item: Omit<TeamClient, 'id' | 'createdAt'>): TeamClient {
  const items = getTeamClients();
  const newItem: TeamClient = {
    ...item,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
  };
  items.push(newItem);
  saveTeamClients(items);
  return newItem;
}

export function updateTeamClient(id: string, updates: Partial<TeamClient>): TeamClient | null {
  const items = getTeamClients();
  const index = items.findIndex((item) => item.id === id);
  if (index === -1) return null;
  items[index] = { ...items[index], ...updates };
  saveTeamClients(items);
  return items[index];
}

export function deleteTeamClient(id: string): boolean {
  const items = getTeamClients();
  const filtered = items.filter((item) => item.id !== id);
  if (filtered.length === items.length) return false;
  saveTeamClients(filtered);
  return true;
}
