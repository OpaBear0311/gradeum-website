import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import crypto from 'crypto';

// Rate limit: max 5 submissions per IP hash per hour
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000; // 1 hour

function hashIP(ip: string): string {
  return crypto.createHash('sha256').update(ip).digest('hex');
}

function isValidEmail(email: string): boolean {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, source } = body;

    // Validate email
    if (!email || typeof email !== 'string' || !isValidEmail(email.trim())) {
      return NextResponse.json(
        { status: 'error', message: 'Invalid email.' },
        { status: 400 }
      );
    }

    // Validate source
    const validSources = ['portal', 'banner'];
    const cleanSource = validSources.includes(source) ? source : 'portal';

    // Hash IP for rate limiting
    const forwarded = request.headers.get('x-forwarded-for');
    const ip = forwarded?.split(',')[0]?.trim() || 'unknown';
    const ipHash = hashIP(ip);

    // Check rate limit
    const oneHourAgo = new Date(Date.now() - RATE_LIMIT_WINDOW_MS).toISOString();
    const { count, error: countError } = await supabase
      .from('waitlist')
      .select('*', { count: 'exact', head: true })
      .eq('ip_hash', ipHash)
      .gte('created_at', oneHourAgo);

    if (countError) {
      console.error('Rate limit check failed:', countError);
      // Proceed anyway — don't block legitimate signups on a rate limit query failure
    } else if (count !== null && count >= RATE_LIMIT_MAX) {
      return NextResponse.json(
        { status: 'error', message: 'Too many requests. Try again later.' },
        { status: 429 }
      );
    }

    // Insert email (lowercase)
    const { error: insertError } = await supabase
      .from('waitlist')
      .insert({
        email: email.trim().toLowerCase(),
        source: cleanSource,
        ip_hash: ipHash,
      });

    // Handle duplicate (unique constraint violation)
    if (insertError) {
      if (insertError.code === '23505') {
        // Duplicate — return success (don't reveal whether email exists)
        return NextResponse.json({
          status: 'ok',
          message: 'You are on the list.',
        });
      }
      console.error('Insert error:', insertError);
      return NextResponse.json(
        { status: 'error', message: 'Something went wrong. Try again.' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      status: 'ok',
      message: 'You are on the list.',
    });
  } catch (err) {
    console.error('Waitlist error:', err);
    return NextResponse.json(
      { status: 'error', message: 'Something went wrong. Try again.' },
      { status: 500 }
    );
  }
}
