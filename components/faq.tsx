'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const faqs = [
  {
    question: "What is Screen Split?",
    answer: "Screen Split is a professional tool designed for streamers, educators, and presenters that allows you to display both your screen capture and webcam feed simultaneously in a single, adjustable window."
  },
  {
    question: "What are the system requirements?",
    answer: "Screen Split is designed to run efficiently on Windows 10 and above. It requires minimal system resources and works with most standard webcams and capture devices."
  },
  {
    question: "Can I customize the layout?",
    answer: "Yes! Screen Split offers a fully resizable interface where you can drag and adjust both the screen capture and webcam areas to create your perfect layout. You can also save your preferred layouts for quick access."
  },
  {
    question: "Does it support multiple monitors?",
    answer: "Yes, Screen Split supports multi-monitor setups. You can capture from any connected display while maintaining high-quality output."
  },
  {
    question: "Is it free to use?",
    answer: "Screen Split is currently in beta and is free to use. We're constantly adding new features and improvements based on user feedback."
  }
]

export function FAQ() {
  return (
    <Accordion type="single" collapsible className="w-full">
      {faqs.map((faq, index) => (
        <AccordionItem key={index} value={`item-${index}`}>
          <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
          <AccordionContent>{faq.answer}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
} 