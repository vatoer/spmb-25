import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@workspace/ui/components/accordion";

const faqs = [
    {
        question: "Siapa saja yang bisa mendaftar?",
        answer: "Calon siswa yang memenuhi persyaratan sekolah tujuan."
    },
    {
        question: "Bagaimana cara mengetahui hasil seleksi?",
        answer: "Hasil seleksi akan diumumkan di website SPMB."
    },
    {
        question: "Apakah data saya aman?",
        answer: "Data Anda dijamin privasi dan keamanannya oleh sistem."
    }
];

export default function FAQSection() {
    return (
        <section className="py-12 bg-white">
            <h2 className="text-2xl font-bold text-center mb-8 text-blue-900">Pertanyaan Umum</h2>
            <div className="max-w-2xl mx-auto">
                <Accordion type="single" collapsible>
                    {faqs.map((faq, i) => (
                        <AccordionItem key={i} value={faq.question}>
                            <AccordionTrigger className="text-blue-800 font-semibold text-left">{faq.question}</AccordionTrigger>
                            <AccordionContent className="text-gray-600">{faq.answer}</AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>
        </section>
    );
}
