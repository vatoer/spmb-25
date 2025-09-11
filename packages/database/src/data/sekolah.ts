import { sekolah } from "@prisma-db-spmb/client";
import { prismaDbSpmb } from "@workspace/database/client-spmb";

// explicitly define return type
export const getAllSekolah = async (): Promise<sekolah[]> => {
    return prismaDbSpmb.sekolah.findMany();
}