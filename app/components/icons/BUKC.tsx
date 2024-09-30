"use server"

import fs from 'fs';

export default async function IconBUKC() {
    // Read file
    const file = fs.readFileSync('@/public/BUKC/bukc-white.svg', 'utf8');

    // Return SVG
    return (
        <div dangerouslySetInnerHTML={{ __html: file }} />
    );
}