const Replicate = require('replicate');

const replicate = new Replicate({
  auth: 'r8_VLzH1s1teujOvj6dZqTH6klaYiY8kZL3URKL0',
});

const testimonials = [
  { author: "Amara Okafor", location: "Lagos", role: "Designer", text: "Built my portfolio in under a minute. This is witchcraft!", rating: 5 },
  { author: "Lars Bergström", location: "Stockholm", role: "Founder", text: "Finally, a tool that gets me. No code, no stress.", rating: 4.5 },
  { author: "Priya Malhotra", location: "Mumbai", role: "Freelancer", text: "My clients think I hired a whole dev team.", rating: 5 },
  { author: "Carlos Mendoza", location: "São Paulo", role: "Startup Owner", text: "Insanely fast. I had time left for coffee.", rating: 4.5 },
  { author: "Yuki Tanaka", location: "Tokyo", role: "Creative", text: "This saved my weekend. Literally magical.", rating: 5 },
  { author: "Maya Johnson", location: "NYC", role: "Marketing Lead", text: "I showed my boss. Now everyone wants one.", rating: 4.5 },
];

async function generateVideos() {
  console.log('🎬 Starting video generation for 6 testimonials...\n');
  const results = [];

  for (let i = 0; i < testimonials.length; i++) {
    const testimonial = testimonials[i];
    console.log(`[${i + 1}/6] Generating video for ${testimonial.author} (${testimonial.location})...`);
    
    try {
      const output = await replicate.run(
        "anotherjesse/zeroscope-v2-xl:9f747673945c62801b13b84701c783929c0ee784e4748ec062204894dda1a351",
        {
          input: {
            prompt: `Professional headshot video of ${testimonial.author}, ${testimonial.role} from ${testimonial.location}, smiling and speaking positively about a web design tool. Clean background, good lighting, professional attire.`,
            num_frames: 48,
            num_inference_steps: 25,
          }
        }
      );

      const videoUrl = Array.isArray(output) ? output[0] : output;
      
      results.push({
        id: testimonial.author.toLowerCase().replace(/\s+/g, '-'),
        author: testimonial.author,
        role: testimonial.role,
        location: testimonial.location,
        rating: testimonial.rating,
        videoUrl: videoUrl,
        thumbnail: videoUrl,
      });

      console.log(`✅ Generated: ${videoUrl}\n`);
    } catch (error) {
      console.error(`❌ Error generating video for ${testimonial.author}:`, error.message);
    }
  }

  console.log('\n🎉 ALL VIDEOS GENERATED!\n');
  console.log('Copy this JSON and save it:\n');
  console.log(JSON.stringify(results, null, 2));
  
  return results;
}

generateVideos().catch(console.error);
