import { BookDemoForm } from "@/components/book-demo-form"
import { Header } from "@/components/header"

export const metadata = {
  title: "Book Demo - Tranzmit AI",
  description: "Experience a personalized demo and see how quickly you can launch human-like AI phone surveys.",
}

export default function BookDemoPage() {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_center,_#E6F3FF_0%,_#F0F8FF_50%,_white_100%)]">
      <Header />
      <main className="pt-20">
        <BookDemoForm />
      </main>
    </div>
  )
}
