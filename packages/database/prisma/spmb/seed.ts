import { faker } from "@faker-js/faker";
import { prismaDbSpmb } from "@workspace/database/client-spmb";


async function main() {
    for (let i = 1; i <= 25; i++) {
        await prismaDbSpmb.sekolah.create({
            data: {
                npsn: faker.string.numeric(8),
                nama_sekolah: `SMA ${faker.company.name()} ${i}`,
                bentuk_pendidikan: "SMA",
                status_sekolah: faker.helpers.arrayElement(["Negeri", "Swasta"]),
                alamat_jalan: faker.location.streetAddress(),
                desa_kelurahan: faker.location.city(),
                kecamatan: faker.location.city(),
                kabupaten_kota: faker.location.city(),
                provinsi: faker.location.state(),
                kode_pos: faker.string.numeric(5),
                latitude: faker.location.latitude(),
                longitude: faker.location.longitude(),
                created_at: new Date(),
                updated_at: new Date(),
            },
        });
    }
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prismaDbSpmb.$disconnect();
    });
