import { prismaDbSpmb } from "../client-spmb";
import type { wilayah } from "../index";

// Get all provinsi (id length 2)
export async function getProvinsi(): Promise<wilayah[]> {
    const all = await prismaDbSpmb.wilayah.findMany({ where: { tingkat: 1 } });
    return all;
}

// Get all kabupaten/kota by provinsi id (id starts with provinsiId, length 5)
export async function getKabupaten(provinsiId: string): Promise<wilayah[]> {
    const all = await prismaDbSpmb.wilayah.findMany({ where: { id: { startsWith: provinsiId }, tingkat: 2 } });
    return all;
}

// Get all kecamatan by kabupaten id (id starts with kabupatenId, length 8)
export async function getKecamatan(kabupatenId: string): Promise<wilayah[]> {
    const all = await prismaDbSpmb.wilayah.findMany({ where: { id: { startsWith: kabupatenId }, tingkat: 3 } });
    return all;
}

// Get all kelurahan by kecamatan id (id starts with kecamatanId, length 13)
export async function getKelurahan(kecamatanId: string): Promise<wilayah[]> {
    const all = await prismaDbSpmb.wilayah.findMany({ where: { id: { startsWith: kecamatanId }, tingkat: 4 } });
    return all;
}