const Replicate = require('replicate');
const fs = require('fs');
const path = require('path');

const replicate = new Replicate({
  auth: 'r8_VLzH1s1teujOvj6dZqTH6klaYiY8kZL3URKL0',
});

const testimonials = require('../public/video-testimonials.json');

const prompts = {
  "amara-okafor": "professional headshot of a confident Nigerian woman designer, warm smile, creative studio, natural lighting, photorealistic",
  "lars-bergstrom": "professional headshot of a Swedish man founder, friendly expression, modern office, natural lighting, photorealistic",
  "priya-malhotra": "professional headshot of an Indian woman freelancer, confident smile, home office, natural lighting, photorealistic",
  "carlos-mendoza": "professional headshot of a Brazilian man startup owner, energetic vibe, tech workspace, natural lighting, photorealistic",
  "yuki-tanaka": "professional headshot of a Japanese creative professional, artistic style, modern studio, natural lighting, photorealistic",
  "maya-johnson": "professional headshot of an American woman marketing lead, professional attire, corporate office, natural lighting, photorealistic"
};

async function regenerateImages() {
  console.log('🎨 Regenerating testimonial images with predictions API...\n');
  
  for (const testimonial of testimonials) {
    const prompt = prompts[testimonial.id];
    if (!prompt) continue;

    console.log(`\n📸 Generating image for ${testimonial.author}...`);
    
    try {
      // Create prediction and wait for it
      const prediction = await replicate.predictions.create({
        version: "39ed52f2a78e934b3ba6e2a89f5b1c712de7dfea535525255b1aa35c5565e08b",
        input: {
          prompt: prompt,
          negative_prompt: "cartoon, anime, illustration, drawing, low quality, blurry",
          width: 512,
          height: 512,
          num_outputs: 1,
          guidance_scale: 7.5,
        }
      });

      console.log(`⏳ Waiting for generation (ID: ${prediction.id})...`);
      
      // Poll until complete
      let result = prediction;
      while (result.status === "starting" || result.status === "processing") {
        await new Promise(resolve => setTimeout(resolve, 2000));
        result = await replicate.predictions.get(prediction.id);
        console.log(`   Status: ${result.status}...`);
      }

      if (result.status === "succeeded" && result.output) {
        const imageUrl = Array.isArray(result.output) ? result.output[0] : result.output;
        if (typeof imageUrl === 'string' && imageUrl.startsWith('http')) {
          testimonial.thumbnail = imageUrl;
          console.log(`✅ ${testimonial.author}: ${imageUrl.substring(0, 60)}...`);
        } else {
          console.log(`⚠️  Invalid output:`, result.output);
        }
      } else {
        console.log(`❌ Failed: ${result.status}`, result.error);
      }

      if (testimonials.indexOf(testimonial) < testimonials.length - 1) {
        console.log('⏳ Cooling down 2 seconds...');
        await new Promise(resolve => setTimeout(resolve, 2000));
      }
      
    } catch (error) {
      console.error(`❌ Error for ${testimonial.author}:`, error.message);
    }
  }

  fs.writeFileSync(
    path.join(__dirname, '../public/video-testimonials.json'),
    JSON.stringify(testimonials, null, 2)
  );
  
  console.log('\n\n🎉 Done! Testimonials updated.');
}

regenerateImages().catch(console.error);
