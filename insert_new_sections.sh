#!/bin/bash

echo "🚀 Starting section insertion..."

# 1. Create backup
cp app/page.tsx app/page.tsx.backup-$(date +%Y%m%d-%H%M%S)
echo "✅ Backup created"

# 2. Find the exact line after VideoTestimonials
LINE=$(grep -n "VideoTestimonials testimonials={testimonials} />" app/page.tsx | tail -1 | cut -d: -f1)

if [ -z "$LINE" ]; then
    echo "❌ ERROR: Could not find VideoTestimonials line"
    exit 1
fi

echo "📍 Found VideoTestimonials at line $LINE"

# 3. Create the new sections in a temporary file
cat > /tmp/new_sections_insert.txt << 'EOF'

      <GradientDivider />

      {/* Stats/Numbers Section */}
      <section className="py-16 md:py-24 px-4 md:px-6 lg:px-8 relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-section-title mb-4">Trusted by Creators Worldwide</h2>
            <p className="text-body max-w-2xl mx-auto">
              Join thousands of satisfied creators who have transformed their ideas into reality
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {[
              { number: "10,000+", label: "Websites Created" },
              { number: "3 Min", label: "Average Build Time" },
              { number: "98%", label: "Customer Satisfaction" },
              { number: "50+", label: "Industries Served" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-bold gradient-text mb-2">
                  {stat.number}
                </div>
                <div className="text-sm md:text-base text-white/60">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <GradientDivider />

      {/* Use Cases Section */}
      <section className="py-16 md:py-24 px-4 md:px-6 lg:px-8 relative">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-section-title mb-4">Who It's For</h2>
            <p className="text-body max-w-2xl mx-auto">
              Perfect for anyone who wants to bring their vision to life without the complexity
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: "💼",
                title: "Freelancers & Solopreneurs",
                description: "Build your portfolio and client websites in minutes, not weeks"
              },
              {
                icon: "🏪",
                title: "Small Business Owners",
                description: "Get your business online quickly without breaking the bank"
              },
              {
                icon: "🎨",
                title: "Content Creators",
                description: "Showcase your work with a stunning website that matches your brand"
              },
              {
                icon: "🚀",
                title: "Startups & Founders",
                description: "Launch your MVP and validate ideas without hiring a dev team"
              },
              {
                icon: "🎯",
                title: "Agencies",
                description: "Deliver client projects faster and increase your profit margins"
              }
            ].map((useCase, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-card p-8 rounded-2xl hover:scale-105 transition-transform"
              >
                <div className="text-5xl mb-4">{useCase.icon}</div>
                <h3 className="text-xl font-bold mb-3">{useCase.title}</h3>
                <p className="text-white/60 text-sm">{useCase.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <GradientDivider />

      {/* Comparison Table */}
      <section className="py-16 md:py-24 px-4 md:px-6 lg:px-8 relative">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-section-title mb-4">Why Choose Creative Workspace?</h2>
            <p className="text-body max-w-2xl mx-auto">
              See how we compare to traditional development approaches
            </p>
          </motion.div>

          <div className="glass-card rounded-3xl overflow-hidden">
            <div className="grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/10">
              <div className="p-8 text-center bg-white/5">
                <h3 className="text-xl font-bold mb-6">Metric</h3>
              </div>
              <div className="p-8 text-center">
                <h3 className="text-xl font-bold mb-6 text-red-400">Traditional Development</h3>
              </div>
              <div className="p-8 text-center bg-gradient-to-br from-purple-500/20 to-pink-500/20">
                <h3 className="text-xl font-bold mb-6 gradient-text">Creative Workspace</h3>
              </div>
            </div>

            {[
              { metric: "Time to Launch", traditional: "4-8 weeks", workspace: "3 minutes" },
              { metric: "Cost", traditional: "$5,000 - $50,000", workspace: "$9.99/month" },
              { metric: "Technical Skills", traditional: "HTML, CSS, JS required", workspace: "Just speak your vision" },
              { metric: "Revisions", traditional: "Slow & costly", workspace: "Instant & unlimited" },
              { metric: "Maintenance", traditional: "Ongoing dev costs", workspace: "Handled automatically" }
            ].map((row, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/10 border-t border-white/10"
              >
                <div className="p-6 font-semibold">{row.metric}</div>
                <div className="p-6 text-white/60">{row.traditional}</div>
                <div className="p-6 text-green-400 font-semibold">{row.workspace}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <GradientDivider />

      {/* Pricing Section */}
      <section className="py-16 md:py-24 px-4 md:px-6 lg:px-8 relative">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-section-title mb-4">🚀 Go Live & Unlock Premium</h2>
            <p className="text-body max-w-2xl mx-auto">
              Choose your plan and start creating without limits
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Basic Plan */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0 }}
              className="glass-card p-8 rounded-3xl hover:scale-105 transition-transform"
            >
              <h3 className="text-2xl font-bold mb-2">Basic</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold">$9.99</span>
                <span className="text-white/60">/month</span>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start">
                  <span className="text-green-400 mr-2">✓</span>
                  <span className="text-sm">Custom domain deployment</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-2">✓</span>
                  <span className="text-sm">Advanced export options</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-2">✓</span>
                  <span className="text-sm">5 projects per month</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-2">✓</span>
                  <span className="text-sm">Email support</span>
                </li>
              </ul>
              <button className="w-full glass-button py-3 rounded-xl font-semibold hover:scale-105 transition-transform">
                Get Started
              </button>
            </motion.div>

            {/* Pro Plan - Popular */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="glass-card p-8 rounded-3xl hover:scale-105 transition-transform relative border-2 border-purple-500"
            >
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-purple-500 to-pink-500 px-4 py-1 rounded-full text-sm font-bold">
                POPULAR
              </div>
              <h3 className="text-2xl font-bold mb-2">Pro</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold gradient-text">$24.99</span>
                <span className="text-white/60">/month</span>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start">
                  <span className="text-green-400 mr-2">✓</span>
                  <span className="text-sm">Everything in Basic</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-2">✓</span>
                  <span className="text-sm">Unlimited projects</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-2">✓</span>
                  <span className="text-sm">Priority rendering</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-2">✓</span>
                  <span className="text-sm">Team collaboration (5 members)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-2">✓</span>
                  <span className="text-sm">Priority support</span>
                </li>
              </ul>
              <button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 py-3 rounded-xl font-semibold hover:scale-105 transition-transform">
                Get Started
              </button>
            </motion.div>

            {/* Premium Plan */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="glass-card p-8 rounded-3xl hover:scale-105 transition-transform"
            >
              <h3 className="text-2xl font-bold mb-2">Premium</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold">$49.99</span>
                <span className="text-white/60">/month</span>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start">
                  <span className="text-green-400 mr-2">✓</span>
                  <span className="text-sm">Everything in Pro</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-2">✓</span>
                  <span className="text-sm">Unlimited team members</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-2">✓</span>
                  <span className="text-sm">White-label options</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-2">✓</span>
                  <span className="text-sm">API access</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-2">✓</span>
                  <span className="text-sm">Dedicated account manager</span>
                </li>
              </ul>
              <button className="w-full glass-button py-3 rounded-xl font-semibold hover:scale-105 transition-transform">
                Contact Sales
              </button>
            </motion.div>
          </div>
        </div>
      </section>
EOF

# 4. Split file at the insertion point and insert new content
head -n $LINE app/page.tsx > /tmp/part1.txt
tail -n +$((LINE + 1)) app/page.tsx > /tmp/part2.txt

# 5. Combine all parts
cat /tmp/part1.txt /tmp/new_sections_insert.txt /tmp/part2.txt > app/page.tsx

echo "✅ New sections inserted after line $LINE"

# 6. Verify the insertion
echo ""
echo "🔍 Verifying insertion..."
grep -c "Stats/Numbers Section" app/page.tsx && echo "✅ Stats section found"
grep -c "Use Cases Section" app/page.tsx && echo "✅ Use Cases section found"
grep -c "Comparison Table" app/page.tsx && echo "✅ Comparison section found"
grep -c "Pricing Section" app/page.tsx && echo "✅ Pricing section found"

# 7. Test build
echo ""
echo "🏗️  Testing build..."
npm run build

if [ $? -eq 0 ]; then
    echo ""
    echo "🎉 SUCCESS! All sections added and build passing!"
    echo ""
    echo "📋 Summary:"
    echo "  ✅ Stats/Numbers Section"
    echo "  ✅ Use Cases Section"
    echo "  ✅ Comparison Table"
    echo "  ✅ Pricing Section"
    echo ""
    echo "🚀 Run 'npm run dev' to see your new sections!"
else
    echo ""
    echo "❌ Build failed! Restoring backup..."
    cp app/page.tsx.backup-$(date +%Y%m%d-%H%M%S) app/page.tsx
    echo "✅ Backup restored"
    exit 1
fi

# Cleanup temp files
rm -f /tmp/part1.txt /tmp/part2.txt /tmp/new_sections_insert.txt

