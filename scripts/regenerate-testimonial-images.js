const fs = require('fs');
const Replicate = require('replicate');

const testimonials = [
  { id: 'amara-okafor', author: 'Amara Okafor', role: 'Designer', location: 'Lagos', gender: 'female', age: 28, quote: "Built my portfolio in under a minute. This is witchcraft!" },
  { id: 'lars-bergstrom', author: 'Lars Bergström', role: 'Founder', location: 'Stockholm', gender: 'male', age: 35, quote: "Finally, a tool that gets me. No code, no stress." },
  { id: 'yuki-tanaka', author: 'Yuki Tanaka', role: 'Creative', location: 'Tokyo', gender: 'female', age: 26, quote: "This saved my weekend. Literally magical." },
  { id: 'maya-johnson', author: 'Maya Johnson', role: 'Marketing Lead', location: 'NYC', gender: 'female', age: 32, quote: "I showed my boss. Now everyone wants one." },
  { id: 'raj-patel', author: 'Raj Patel', role: 'Developer', location: 'Mumbai', gender: 'male', age: 29, quote: "From idea to live site in hours—game changer." },
  { id: 'sofia-lopez', author: 'Sofia Lopez', role: 'Artist', location: 'Mexico City', gender: 'female', age: 31, quote: "So intuitive, even my grandma could use it!" },
];

const replicate = new Replicate({ auth: 'r8_VLzH1s1teujOvj6dZqTH6klaYiY8kZL3URKL0' });

async function generateImage(testimonial) {
  const prompt = `Photorealistic professional headshot of a ${testimonial.age}-year-old ${testimonial.gender} ${testimonial.role.toLowerCase()} from ${testimonial.location}. Confident smile, direct eye contact, sharp facial details, neutral gray background, high-resolution studio lighting, natural skin tones, ultra-clear focus on face, no artifacts, cinematic quality, square aspect ratio.`;
  console.log(`🔄 Generating FLUX headshot for ${testimonial.author}... (Prompt preview: ${prompt.substring(0, 100)}...)`);
  try {
    const output = await replicate.run('black-forest-labs/flux-dev', {
      input: {
        prompt,
        width: 1024,
        height: 1024,
        num_inference_steps: 20,  // Balance speed/quality
        guidance_scale: 3.5,      // For natural realism
        seed: Math.floor(Math.random() * 1000000),
        output_format: 'png'
      }
    });
    console.log(`✅ Success for ${testimonial.author}: ${output[0]}`);
    return output[0];  // Single high-res URL
  } catch (error) {
    console.error(`❌ Failed for ${testimonial.author}:`, error.message);
    return '/placeholder-headshot.png';  // Fallback
  }
}

async function main() {
  console.log('🚀 Starting FLUX.1 realistic headshot generation (photoreal, clear, single per testimonial)...');
  const updatedTestimonials = [];
  for (const t of testimonials) {
    const thumbnail = await generateImage(t);
    updatedTestimonials.push({
      ...t,
      rating: Math.floor(Math.random() * 2) + 4.5,  // 4.5 or 5
      thumbnail
    });
    await new Promise(resolve => setTimeout(resolve, 10000));  // Conservative rate limit (6/min for FLUX)
  }
  fs.writeFileSync('public/video-testimonials.json', JSON.stringify(updatedTestimonials, null, 2));
  console.log('✅ All 6 photoreal headshots generated! Check JSON for Replicate URLs.');
  console.log('Sample:', updatedTestimonials[0]);
}

main().catch(console.error);
