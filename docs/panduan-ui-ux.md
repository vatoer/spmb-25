# Panduan UI/UX Platform Manajemen Sekolah

Dokumen ini berisi panduan desain UI/UX untuk aplikasi SPMB, mengacu pada standar profesional, konsistensi, dan kemudahan penggunaan. Semua warna dan komponen mengikuti theme Tailwind dan Shadcn UI yang telah dikonfigurasi di `packages/ui/src/styles/globals.css`.

## Prinsip Desain
- **Konsistensi**: Gunakan layout, warna, dan komponen yang seragam di seluruh aplikasi.
- **Aksesibilitas**: Pastikan kontras warna cukup, ukuran font terbaca, dan navigasi mudah.
- **Responsif**: Desain harus optimal di desktop dan mobile.
- **Sederhana & Jelas**: Hindari elemen visual berlebihan, utamakan kemudahan interaksi.
- **Feedback**: Berikan umpan balik visual pada aksi (hover, error, sukses).


## Palet Warna Utama & Variabel Theme
Warna-warna berikut diambil langsung dari konfigurasi Tailwind/Shadcn UI pada `globals.css` dan digunakan di seluruh aplikasi melalui variable CSS. Semua komponen wajib menggunakan variable ini agar konsisten dan mudah maintenance.

| Nama         | CSS Variable                   | Fungsi                |
|--------------|-------------------------------|-----------------------|
| Background   | `--background` / `--color-background` | Latar utama           |
| Foreground   | `--foreground` / `--color-foreground` | Teks utama            |
| Card         | `--card` / `--color-card`             | Card, section         |
| Card FG      | `--card-foreground` / `--color-card-foreground` | Teks di card         |
| Popover      | `--popover` / `--color-popover`       | Popover/menu          |
| Popover FG   | `--popover-foreground` / `--color-popover-foreground` | Teks popover        |
| Primary      | `--primary` / `--color-primary`       | Aksi utama, tombol    |
| Primary FG   | `--primary-foreground` / `--color-primary-foreground` | Teks tombol utama   |
| Secondary    | `--secondary` / `--color-secondary`   | Area sekunder         |
| Secondary FG | `--secondary-foreground` / `--color-secondary-foreground` | Teks sekunder      |
| Accent       | `--accent` / `--color-accent`         | Highlight, badge      |
| Accent FG    | `--accent-foreground` / `--color-accent-foreground` | Teks accent         |
| Muted        | `--muted` / `--color-muted`           | Background lembut     |
| Muted FG     | `--muted-foreground` / `--color-muted-foreground` | Teks muted          |
| Border       | `--border` / `--color-border`         | Garis/border          |
| Input        | `--input` / `--color-input`           | Field input           |
| Ring         | `--ring` / `--color-ring`             | Fokus input           |
| Destructive  | `--destructive` / `--color-destructive` | Error, aksi berbahaya |
| Destructive FG| `--destructive-foreground` / `--color-destructive-foreground` | Teks error         |
| Sidebar      | `--sidebar` / `--color-sidebar`       | Sidebar               |
| Sidebar FG   | `--sidebar-foreground` / `--color-sidebar-foreground` | Teks sidebar        |
| Sidebar Primary | `--sidebar-primary` / `--color-sidebar-primary` | Sidebar utama        |
| Sidebar Primary FG | `--sidebar-primary-foreground` / `--color-sidebar-primary-foreground` | Teks sidebar utama   |
| Sidebar Accent | `--sidebar-accent` / `--color-sidebar-accent` | Sidebar highlight    |
| Sidebar Accent FG | `--sidebar-accent-foreground` / `--color-sidebar-accent-foreground` | Teks sidebar accent  |
| Sidebar Border | `--sidebar-border` / `--color-sidebar-border` | Border sidebar       |
| Sidebar Ring | `--sidebar-ring` / `--color-sidebar-ring` | Fokus sidebar         |

> **Catatan:** Semua warna menggunakan format oklch untuk akurasi dan aksesibilitas. Gunakan variable di atas pada style komponen, jangan hardcode hex.

### Contoh Penggunaan di Komponen
```css
button {
	background: var(--color-primary);
	color: var(--color-primary-foreground);
}
input {
	background: var(--color-input);
	border-color: var(--color-border);
	color: var(--color-foreground);
}
```

### Theme Shadcn UI
Semua komponen shadcn ui otomatis menggunakan variable di atas. Untuk custom theme, cukup ubah value di `globals.css`.

### Best Practice
- Jangan gunakan warna hardcode, selalu pakai variable theme.
- Pastikan kontras warna cukup untuk aksesibilitas.
- Gunakan variant button sesuai fungsi: default (primary), outline (secondary), ghost (accent/muted), destructive (error).
- Untuk dark mode, semua variable sudah disediakan di `globals.css`.

## Komponen Utama
- **Header & Footer**: Selalu gunakan komponen yang konsisten, warna latar putih/biru muda, border biru, dan teks biru tua.
- **Button**: Gunakan variant utama (biru), outline untuk aksi sekunder, destructive (merah) hanya untuk aksi berbahaya.
- **Form Input**: Field input rounded, background biru muda, border biru, fokus dengan ring biru.
- **Card/Section**: Gunakan shadow halus, border biru, padding cukup.
- **Avatar/Profile**: Gunakan lingkaran, border biru, background putih/biru muda.
- **Popover/Menu**: Background putih, border biru, shadow halus.

## Best Practice
- **Teks**: Gunakan font sans-serif, warna teks utama biru tua/abu gelap, ukuran minimal 14px.
- **Spacing**: Padding antar elemen minimal 16px, antar field form 20px.
- **Icon**: Gunakan icon yang jelas dan serasi dengan warna utama.
- **Error/Sukses**: Error berwarna merah, sukses hijau, info biru.
- **Dark Mode**: Pastikan semua warna memiliki versi dark yang kontras dan nyaman.

## Contoh Implementasi
```tsx
<Button variant="default">Aksi Utama</Button>
<Button variant="outline">Aksi Sekunder</Button>
<Button variant="destructive">Hapus</Button>
<input className="bg-blue-50 border-blue-200 focus:ring-blue-300 rounded-lg" />
```

## Referensi
- [Tailwind CSS Color Palette](https://tailwindcss.com/docs/customizing-colors)
- [Shadcn UI Docs](https://ui.shadcn.com/docs/themes)
- [Aksesibilitas Web](https://www.w3.org/WAI/standards-guidelines/wcag/)

---

Panduan ini wajib diikuti untuk seluruh pengembangan UI/UX aplikasi SPMB agar tercapai tampilan profesional, konsisten, dan mudah digunakan.
