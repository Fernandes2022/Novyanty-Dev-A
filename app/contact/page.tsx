import ContactHero from './components/ContactHero';
import ContactForm from './components/ContactForm';
import ContactInfoGrid from './components/ContactInfoGrid';
import ContactMap from './components/ContactMap';

export const metadata = {
  title: 'Contact Us | Creative Workspace',
  description: 'Get in touch with our team. We actually reply 😎',
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-bg-primary">
      <ContactHero />
      <ContactForm />
      <ContactInfoGrid />
      <ContactMap />
    </main>
  );
}
