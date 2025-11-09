'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, Zap, Users, Globe, Award } from 'lucide-react';
import ScrollToTop from '../components/ScrollToTop';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950">
      {/* Navigation */}
      <nav className="fixed top-0 w-full glass-dark border-b border-white/10 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <Link 
            href="/"
            className="inline-flex items-center gap-2 text-white hover:text-purple-400 transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Back to Home</span>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              Building the Future of
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                Web Creation
              </span>
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed">
              We believe everyone should be able to bring their ideas to life on the web. 
              That's why we built Creative Workspace—a tool that turns your vision into reality 
              without the complexity of traditional web development.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: Users, number: "10,000+", label: "Active Creators" },
              { icon: Globe, number: "50+", label: "Countries" },
              { icon: Zap, number: "50s", label: "Avg Build Time" },
              { icon: Award, number: "98%", label: "Satisfaction" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="glass-dark p-6 rounded-2xl text-center"
              >
                <stat.icon className="h-8 w-8 text-purple-400 mx-auto mb-4" />
                <div className="text-4xl font-bold text-white mb-2">{stat.number}</div>
                <div className="text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="glass-dark p-8 md:p-12 rounded-3xl">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Our Mission
              </h2>
              <p className="text-lg text-gray-300 leading-relaxed mb-6">
                The web is powerful, but building for it has always been complicated. 
                We're changing that. Creative Workspace combines AI technology with intuitive 
                design to make website creation accessible to everyone—from first-time creators 
                to experienced developers looking to move faster.
              </p>
              <p className="text-lg text-gray-300 leading-relaxed">
                Every feature we build asks one question: "Does this make creating easier?" 
                If the answer isn't a clear yes, we don't ship it. The result is a platform 
                that feels natural, works fast, and gets out of your way so you can focus 
                on what matters—your ideas.
              </p>
            </div>

            <div className="glass-dark p-8 md:p-12 rounded-3xl">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Why We Built This
              </h2>
              <p className="text-lg text-gray-300 leading-relaxed mb-6">
                We've seen talented people with great ideas held back by technical barriers. 
                Designers who couldn't code. Business owners who couldn't afford agencies. 
                Students with projects stuck in their heads.
              </p>
              <p className="text-lg text-gray-300 leading-relaxed">
                Creative Workspace exists to remove those barriers. Whether you're launching 
                a portfolio, starting a business, or just experimenting with an idea, you 
                should be able to build and deploy in minutes, not months.
              </p>
            </div>

            <div className="glass-dark p-8 md:p-12 rounded-3xl">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                What Makes Us Different
              </h2>
              <div className="space-y-4">
                {[
                  {
                    title: "Speed Without Sacrifice",
                    desc: "Generate complete websites in 50 seconds without compromising quality or customization."
                  },
                  {
                    title: "Actually Simple",
                    desc: "No tutorials needed. If you can describe what you want, you can build it."
                  },
                  {
                    title: "Built for Real Use",
                    desc: "Not a toy or prototype. Real websites, real hosting, real performance."
                  },
                  {
                    title: "You Own Everything",
                    desc: "Your designs, your content, your data. Full export and customization rights."
                  }
                ].map((item, index) => (
                  <div key={index} className="border-l-2 border-purple-400 pl-6">
                    <h3 className="text-xl font-semibold text-white mb-2">{item.title}</h3>
                    <p className="text-gray-300">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="glass-dark p-12 rounded-3xl"
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to Start Creating?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Join thousands of creators who've already made the switch.
            </p>
            <Link
              href="/workspace"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold hover:scale-105 transition-transform"
            >
              <Zap className="h-5 w-5" />
              Get Started Free
            </Link>
          </motion.div>
        </div>
      </section>
      <ScrollToTop />
    </div>
  );
}
