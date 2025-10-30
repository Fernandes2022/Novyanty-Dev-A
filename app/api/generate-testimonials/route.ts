import { NextResponse } from 'next/server';
import Replicate from 'replicate';

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

const testimonials = [
  { author: "Amara Okafor", location: "Lagos", role: "Designer", text: "Built my portfolio in under a minute. This is witchcraft!", rating: 5 },
  { author: "Lars Bergström", location: "Stockholm", role: "Founder", text: "Finally, a tool that gets me. No code, no stress.", rating: 4.5 },
  { author: "Priya Malhotra", location: "Mumbai", role: "Freelancer", text: "My clients think I hired a whole dev team.", rating: 5 },
  { author: "Carlos Mendoza", location: "São Paulo", role: "Startup Owner", text: "Insanely fast. I had time left for coffee.", rating: 4.5 },
  { author: "Yuki Tanaka", location: "Tokyo", role: "Creative", text: "This saved my weekend. Literally magical.", rating: 5 },
  { author: "Maya Johnson", location: "NYC", role: "Marketing Lead", text: "I showed my boss. Now everyone wants one.", rating: 4.5 },
];

export async function POST() {
  try {
    const results = [];

    for (const testimonial of testimonials) {
      console.log(`Generating video for ${testimonial.author}...`);
      
      // Using a text-to-video model (you can change this to another model)
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

      results.push({
        id: testimonial.author.toLowerCase().replace(/\s+/g, '-'),
        author: testimonial.author,
        role: testimonial.role,
        location: testimonial.location,
        rating: testimonial.rating,
        videoUrl: Array.isArray(output) ? output[0] : output,
        thumbnail: Array.isArray(output) ? output[0] : output, // Use first frame as thumbnail
      });

      console.log(`✓ Generated video for ${testimonial.author}`);
    }

    return NextResponse.json({ success: true, testimonials: results });
  } catch (error) {
    console.error('Error generating videos:', error);
    return NextResponse.json({ error: 'Failed to generate videos' }, { status: 500 });
  }
}
