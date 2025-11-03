#!/bin/bash

echo "🔍 Checking VideoTestimonials component for speed settings..."
echo ""

echo "=== VideoTestimonials.tsx content ==="
cat components/home/VideoTestimonials.tsx | grep -E "duration|transition|animate|repeat" -B 2 -A 2

echo ""
echo "=== Full animation section ==="
grep -A 20 "motion.div" components/home/VideoTestimonials.tsx | grep -A 10 "animate"

echo ""
echo "=== Showing lines with duration numbers ==="
cat components/home/VideoTestimonials.tsx | grep -n "duration:"

