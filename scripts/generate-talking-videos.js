const Replicate = require('replicate');

const replicate = new Replicate({
  auth: 'r8_VLzH1s1teujOvj6dZqTH6klaYiY8kZL3URKL0',
});

const testimonials = [
  { author: "Amara Okafor", location: "Lagos", role: "Designer", text: "Built my portfolio in under a minute. This is witchcraft!", rating: 5, description: "Young Nigerian woman, professional designer" },
  { author: "Lars Bergström", location: "Stockholm", role: "Founder", text: "Finally, a tool that gets me. No code, no stress.", rating: 4.5, description: "Swedish man, startup founder" },
  { author: "Priya Malhotra", location: "Mumbai", role: "Freelancer", text: "My clients think I hired a whole dev team.", rating: 5, description: "Indian woman, creative professional" },
  { author: "Carlos Mendoza", location: "São Paulo", role: "Startup Owner", text: "Insanely fast. I had time left for coffee.", rating: 4.5, description: "Brazilian man, entrepreneur" },
  { author: "Yuki Tanaka", location: "Tokyo", role: "Creative", text: "This saved my weekend. Literally magical.", rating: 5, description: "Japanese woman, creative professional" },
  { author: "Maya Johnson", location: "NYC", role: "Marketing Lead", text: "I showed my boss. Now everyone wants one.", rating: 4.5, description: "American woman, marketing professional" },
];

async function generateTalkingVideos() {
  console.log('🎬 Generating production-ready talking head videos...\n');
  const results = [];

  for (let i = 0; i < testimonials.length; i++) {
    const testimonial = testimonials[i];
    console.log(`[${i + 1}/6] Generating realistic talking head for ${testimonial.author}...`);
    
    try {
      // First generate a realistic headshot
      console.log('  Step 1: Generating realistic headshot...');
      const headshot = await replicate.run(
        "stability-ai/sdxl:39ed52f2a78e934b3ba6e2a89f5b1c712de7dfea535525255b1aa35c5565e08b",
        {
          input: {
            prompt: `Professional headshot portrait of ${testimonial.description}, smiling, looking at camera, clean background, studio lighting, high quality, photorealistic`,
            negative_prompt: "cartoon, anime, painting, illustration, low quality, blurry",
            width: 512,
            height: 512,
          }
        }
      );

      const headshotUrl = Array.isArray(headshot) ? headshot[0] : headshot;
      console.log(`  ✓ Headshot generated: ${headshotUrl}`);

      // Then animate it with SadTalker
      console.log('  Step 2: Animating with speech...');
      const video = await replicate.run(
        "cjwbw/sadtalker:3aa3dac9353cc4d6bd62a35e0f5827055b2679e4e5f169325a5c4f78c1097a75",
        {
          input: {
            source_image: headshotUrl,
            driven_audio: null, // We'll use pose instead for now
            still: true,
            preprocess: "full",
          }
        }
      );

      const videoUrl = Array.isArray(video) ? video[0] : video;
      
      results.push({
        id: testimonial.author.toLowerCase().replace(/\s+/g, '-'),
        author: testimonial.author,
        role: testimonial.role,
        location: testimonial.location,
        rating: testimonial.rating,
        videoUrl: videoUrl,
        thumbnail: headshotUrl,
      });

      console.log(`  ✅ Complete! Video: ${videoUrl}\n`);
    } catch (error) {
      console.error(`  ❌ Error for ${testimonial.author}:`, error.message);
    }
  }

  console.log('\n🎉 ALL TALKING HEAD VIDEOS GENERATED!\n');
  console.log(JSON.stringify(results, null, 2));
  
  return results;
}

generateTalkingVideos().catch(console.error);
