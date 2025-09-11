"use server";

import { sekolah } from "@workspace/database";
import { getAllSekolah } from "@workspace/database/data/sekolah";

// explicitly define return type

export async function fetchAllSekolah(): Promise<sekolah[]> {
    "use server";

    const sekolah = await getAllSekolah();
    return sekolah;
}