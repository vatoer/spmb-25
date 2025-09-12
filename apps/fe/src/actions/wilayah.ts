"use server";
import type { wilayah } from "@workspace/database";
import { getKabupaten, getKecamatan, getKelurahan, getProvinsi } from "@workspace/database/data/wilayah";

export async function fetchProvinsi(): Promise<wilayah[]> {
    console.log("fetchProvinsi called");
    return getProvinsi();
}
export async function fetchKabupaten(provinsiId: string): Promise<wilayah[]> {
    console.log("fetchKabupaten called");
    return getKabupaten(provinsiId);
}
export async function fetchKecamatan(kabupatenId: string): Promise<wilayah[]> {
    console.log("fetchKecamatan called");
    return getKecamatan(kabupatenId);
}
export async function fetchKelurahan(kecamatanId: string): Promise<wilayah[]> {
    console.log("fetchKelurahan called");
    return getKelurahan(kecamatanId);
}