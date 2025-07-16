import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle, Lock, Mail, Trash2 } from "lucide-react";

const faqs = [
  {
    icon: <Lock className="text-indigo-500 w-5 h-5 mr-2 shrink-0" />,
    question: "Is Feedbacker.io really anonymous?",
    answer:
      "Yes, all messages you receive through your link are completely anonymous unless the sender chooses to identify themselves.",
  },
  {
    icon: <Mail className="text-indigo-500 w-5 h-5 mr-2 shrink-0" />,
    question: "Can I disable receiving messages?",
    answer:
      "Absolutely. You can toggle message reception anytime from your dashboard settings.",
  },
  {
    icon: <HelpCircle className="text-indigo-500 w-5 h-5 mr-2 shrink-0" />,
    question: "Is there a limit to how many messages I can receive?",
    answer:
      "No, there’s no cap. You can receive unlimited feedback as long as you keep your account active.",
  },
  {
    icon: <Trash2 className="text-indigo-500 w-5 h-5 mr-2 shrink-0" />,
    question: "Can I report inappropriate messages?",
    answer:
      "We're working on moderation features. For now, you can delete any message you find inappropriate from your dashboard.",
  },
];

export default function FAQSection() {
  return (
    <section className="relative py-24 px-6 bg-gradient-to-br from-white to-indigo-50">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-4 text-gray-800">
          Frequently Asked Questions
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-12 text-lg">
          Find quick answers to the most common questions about using
          Feedbacker.io.
        </p>
      </div>

      <div className="max-w-4xl mx-auto bg-white/80 backdrop-blur-md shadow-xl rounded-2xl p-8 border border-gray-200">
        <Accordion type="multiple" className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="border rounded-lg shadow-sm transition hover:shadow-md"
            >
              <AccordionTrigger className="text-left text-lg font-medium text-gray-800 px-4 py-4 flex items-center gap-2 hover:bg-indigo-50 rounded-md transition-colors duration-200">
                {faq.icon}
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="px-4 py-4 text-gray-600 text-sm">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
