"use server";
import type { wilayah } from "@workspace/database";
import { getKabupaten, getKecamatan, getKelurahan, getProvinsi } from "@workspace/database/data/wilayah";

export async function fetchProvinsi(): Promise<wilayah[]> {
    return getProvinsi();
}
export async function fetchKabupaten(provinsiId: string): Promise<wilayah[]> {
    return getKabupaten(provinsiId);
}
export async function fetchKecamatan(kabupatenId: string): Promise<wilayah[]> {
    return getKecamatan(kabupatenId);
}
export async function fetchKelurahan(kecamatanId: string): Promise<wilayah[]> {
    return getKelurahan(kecamatanId);
}