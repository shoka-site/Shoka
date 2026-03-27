import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { randomUUID } from 'crypto';
import { assertAdmin } from '@/lib/auth';

// Allowed MIME types — validated by magic bytes below, not just file.type
const ALLOWED_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp', 'application/pdf']);
const MAX_SIZE_BYTES = 5 * 1024 * 1024; // 5 MB

// Magic byte signatures for each allowed type
const MAGIC_BYTES: Array<{ type: string; bytes: number[]; offset?: number }> = [
  { type: 'image/jpeg', bytes: [0xff, 0xd8, 0xff] },
  { type: 'image/png',  bytes: [0x89, 0x50, 0x4e, 0x47] },
  { type: 'image/webp', bytes: [0x52, 0x49, 0x46, 0x46], offset: 0 },
  { type: 'application/pdf', bytes: [0x25, 0x50, 0x44, 0x46] },
];

function detectMimeType(buffer: Buffer): string | null {
  for (const sig of MAGIC_BYTES) {
    const offset = sig.offset ?? 0;
    const matches = sig.bytes.every((b, i) => buffer[offset + i] === b);
    if (matches) return sig.type;
  }
  return null;
}

// Sanitize filename — keep only alphanumerics, dots, and hyphens
function sanitizeFilename(name: string): string {
  return name
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9.\-]/g, '')
    .replace(/\.{2,}/g, '.'); // prevent path traversal via double dots
}

export async function POST(req: NextRequest) {
  const deny = await assertAdmin();
  if (deny) return deny;

  try {
    const data = await req.formData();
    const file = data.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ success: false, error: { code: 'NO_FILE', message: 'No file provided' } }, { status: 400 });
    }

    if (file.size > MAX_SIZE_BYTES) {
      return NextResponse.json({ success: false, error: { code: 'FILE_TOO_LARGE', message: 'File exceeds 5 MB limit' } }, { status: 400 });
    }

    if (!ALLOWED_TYPES.has(file.type)) {
      return NextResponse.json({ success: false, error: { code: 'INVALID_TYPE', message: 'File type not allowed' } }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Validate by magic bytes — never trust the MIME type from the client
    const detectedType = detectMimeType(buffer);
    if (!detectedType || !ALLOWED_TYPES.has(detectedType)) {
      return NextResponse.json({ success: false, error: { code: 'INVALID_FILE', message: 'File content does not match an allowed type' } }, { status: 400 });
    }

    const ext = sanitizeFilename(file.name).split('.').pop() ?? 'bin';
    const safeFilename = `${randomUUID()}.${ext}`;

    const uploadDir = join(process.cwd(), 'public', 'uploads');
    await mkdir(uploadDir, { recursive: true });
    await writeFile(join(uploadDir, safeFilename), buffer);

    return NextResponse.json({ success: true, data: { url: `/uploads/${safeFilename}` } });
  } catch {
    return NextResponse.json({ success: false, error: { code: 'UPLOAD_FAILED', message: 'Upload failed' } }, { status: 500 });
  }
}
