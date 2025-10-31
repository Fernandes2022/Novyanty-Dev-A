const fs = require('fs');
const Replicate = require('replicate');

const testimonials = [
  { id: 'amara-okafor', author: 'Amara Okafor', role: 'Designer', location: 'Lagos', gender: 'female', age: 28 },
  { id: 'lars-bergstrom', author: 'Lars Bergström', role: 'Founder', location: 'Stockholm', gender: 'male', age: 35 },
  { id: 'yuki-tanaka', author: 'Yuki Tanaka', role: 'Creative', location: 'Tokyo', gender: 'female', age: 26 },
  { id: 'maya-johnson', author: 'Maya Johnson', role: 'Marketing Lead', location: 'NYC', gender: 'female', age: 32 },
  { id: 'raj-patel', author: 'Raj Patel', role: 'Developer', location: 'Mumbai', gender: 'male', age: 29 },
  { id: 'sofia-lopez', author: 'Sofia Lopez', role: 'Artist', location: 'Mexico City', gender: 'female', age: 31 },
];

const replicate = new Replicate({
  auth: 'r8_VLzH1s1teujOvj6dZqTH6klaYiY8kZL3URKL0'  // Your token here
});

async function generateImage(testimonial) {
  const prompt = `Photorealistic professional headshot portrait of a ${testimonial.age}-year-old ${testimonial.gender} ${testimonial.role.toLowerCase()} from ${testimonial.location}, confident smile, direct eye contact, sharp focus on face, neutral gray background, high-resolution studio photography lighting, natural skin tones, ultra-detailed, no artifacts, cinematic quality, 1:1 aspect ratio`;
  console.log(`Generating realistic headshot for ${testimonial.author}...`);
  const output = await replicate.run(
    "stability-ai/stable-diffusion-xl-base-1.0",
    {
      input: {
        prompt: prompt,
        num_inference_steps: 50,
        guidance_scale: 7.5,
        width: 1024,
        height: 1024,
        output_format: "png",
        refine: "no_refine"
      }
    }
  );
  return output[0];  // Single high-res image URL
}

async function main() {
  const updatedTestimonials = [];
  for (const t of testimonials) {
    try {
      const thumbnail = await generateImage(t);
      updatedTestimonials.push({ ...t, rating: 5, quote: t.quote || "Amazing tool—highly recommend!", thumbnail });  // Add defaults if needed
      await new Promise(resolve => setTimeout(resolve, 5000));  // Rate limit: 12/min for free tier
    } catch (error) {
      console.error(`Error generating for ${t.author}:`, error);
      // Fallback to placeholder if API fails
      updatedTestimonials.push({ ...t, thumbnail: "/placeholder-headshot.png", rating: 5 });
    }
  }
  fs.writeFileSync('public/video-testimonials.json', JSON.stringify(updatedTestimonials, null, 2));
  console.log('✅ Generated 6 realistic single headshots! Check public/video-testimonials.json');
}

main().catch(console.error);
