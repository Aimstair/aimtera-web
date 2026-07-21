import { Link } from "react-router-dom";
import { 
  Download, 
  ShieldCheck, 
  History, 
  Search, 
  Crop, 
  Folders, 
  ChevronDown, 
  Check, 
  Smartphone,
  Video
} from "lucide-react";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import ScrollReveal from "@/components/ScrollReveal";
import PageTransition from "@/components/PageTransition";

const FaqItem = ({ question, answer }: { question: string, answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="border-b border-zinc-800/50">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full justify-between items-center py-4 text-left focus:outline-none"
      >
        <span className="font-medium text-zinc-200">{question}</span>
        <ChevronDown className={`w-5 h-5 text-zinc-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      <div 
        className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 pb-4 opacity-100' : 'max-h-0 opacity-0'}`}
      >
        <p className="text-zinc-400 text-sm leading-relaxed">{answer}</p>
      </div>
    </div>
  );
};

const ClipIt = () => {
  return (
    <PageTransition>
      <div className="min-h-screen bg-[#0A0A0C] text-zinc-300 font-sans selection:bg-[#FF6B4A]/30">
        <Navbar />
        
        {/* Hero Section */}
        <div className="relative pt-32 pb-20 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,#FF6B4A15_0%,#0A0A0C_70%)] pointer-events-none" />
          <div className="container mx-auto px-6 relative z-10 text-center max-w-4xl">
            <ScrollReveal>
              <div className="inline-flex items-center justify-center gap-2 mb-6 bg-zinc-900/50 border border-zinc-800 rounded-full px-4 py-1.5 backdrop-blur-sm">
                <div className="w-2 h-2 rounded-full bg-[#FF6B4A] animate-pulse" />
                <span className="text-sm font-medium text-zinc-300">Introducing Clip It</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6 leading-tight">
                Capture anything, <br className="hidden md:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B4A] to-[#ff8c73]">without leaving your app.</span>
              </h1>
              <p className="text-lg md:text-xl text-zinc-400 mb-10 max-w-2xl mx-auto leading-relaxed">
                A floating bubble that lets you screenshot, record, and Flashback-save the last 60 seconds — keeping everything private and local on your device.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a 
                  href="#download" 
                  className="flex items-center gap-2 bg-[#FF6B4A] hover:bg-[#ff8c73] text-white px-8 py-4 rounded-xl font-semibold transition-all hover:scale-105 shadow-[0_0_20px_-5px_#FF6B4A] w-full sm:w-auto justify-center"
                >
                  <Download className="w-5 h-5" />
                  Get it on Google Play
                </a>
                <a 
                  href="#how-it-works"
                  className="px-8 py-4 rounded-xl font-medium text-zinc-300 hover:text-white bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 transition-all w-full sm:w-auto text-center"
                >
                  See how it works
                </a>
              </div>
            </ScrollReveal>

            {/* Hero Visual Placeholder */}
            <ScrollReveal delay={200}>
              <div className="mt-16 relative mx-auto max-w-3xl">
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0C] via-transparent to-transparent z-10 top-1/2" />
                <div className="aspect-video bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden relative flex items-center justify-center group">
                  {/* Decorative UI elements mimicking the app */}
                  <div className="absolute top-4 left-4 right-4 flex justify-between items-center opacity-30">
                    <div className="w-20 h-4 bg-zinc-700 rounded" />
                    <div className="flex gap-2">
                      <div className="w-4 h-4 bg-zinc-700 rounded-full" />
                      <div className="w-4 h-4 bg-zinc-700 rounded-full" />
                    </div>
                  </div>
                  
                  {/* The Floating Bubble Mockup */}
                  <div className="w-16 h-16 bg-zinc-800 rounded-full shadow-lg border border-zinc-700 flex items-center justify-center relative group-hover:scale-110 transition-transform duration-500 z-20">
                    <div className="w-6 h-6 border-2 border-[#FF6B4A] rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-[#FF6B4A] rounded-full" />
                    </div>
                    {/* Ring animation */}
                    <div className="absolute inset-0 border border-[#FF6B4A] rounded-full animate-ping opacity-20" />
                  </div>
                  
                  <div className="absolute bottom-6 text-center z-20">
                    <span className="text-zinc-500 text-sm tracking-widest uppercase font-semibold">Hero App Demo</span>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>

        {/* How It Works */}
        <div id="how-it-works" className="py-24 bg-zinc-900/30 border-y border-zinc-800/50">
          <div className="container mx-auto px-6">
            <ScrollReveal>
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">How it works</h2>
                <p className="text-zinc-400">Capture the perfect moment in seconds.</p>
              </div>
            </ScrollReveal>

            <div className="grid md:grid-cols-4 gap-8 max-w-5xl mx-auto">
              {[
                { step: "01", title: "Always Ready", desc: "The floating bubble sits quietly over any app, waiting." },
                { step: "02", title: "Quick Actions", desc: "Tap for a screenshot, hold to record, double-tap to save the last 60 seconds." },
                { step: "03", title: "Private Vault", desc: "Everything lands in your secure Vault, organized and searchable." },
                { step: "04", title: "Edit & Share", desc: "Trim, crop, and export — share or save, watermark-free." }
              ].map((item, i) => (
                <ScrollReveal key={i} delay={i * 100}>
                  <div className="relative p-6 rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 transition-colors h-full">
                    <div className="text-[#FF6B4A] text-xl font-bold font-mono mb-4">{item.step}</div>
                    <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                    <p className="text-sm text-zinc-400">{item.desc}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="py-24">
          <div className="container mx-auto px-6 max-w-6xl">
            <ScrollReveal>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center">Everything you need</h2>
            </ScrollReveal>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { icon: <History />, title: "Flashback Buffer", desc: "Never miss a moment. Save the last 15–60 seconds instantly." },
                { icon: <ShieldCheck />, title: "Fully Local", desc: "Nothing uploaded, nothing tracked. Your clips stay on your device." },
                { icon: <Search />, title: "Smart Search", desc: "Find any screenshot by what's written in it using on-device OCR." },
                { icon: <Crop />, title: "Built-in Editor", desc: "Trim, crop, and export without leaving the app." },
                { icon: <Smartphone />, title: "Custom Region", desc: "Record just the part of the screen you need." },
                { icon: <Folders />, title: "Collections", desc: "Organize your clips into albums that make sense to you." }
              ].map((feature, i) => (
                <ScrollReveal key={i} delay={i * 100}>
                  <div className="p-6 rounded-2xl bg-gradient-to-b from-zinc-900 to-zinc-950 border border-zinc-800 hover:border-zinc-700 transition-all hover:-translate-y-1">
                    <div className="w-12 h-12 rounded-lg bg-[#FF6B4A]/10 text-[#FF6B4A] flex items-center justify-center mb-4">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                    <p className="text-zinc-400 text-sm leading-relaxed">{feature.desc}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>

        {/* Privacy / Trust Section */}
        <div className="py-24 bg-zinc-900/30 border-y border-zinc-800/50">
          <div className="container mx-auto px-6 max-w-4xl text-center">
            <ScrollReveal>
              <ShieldCheck className="w-16 h-16 text-[#FF6B4A] mx-auto mb-6" />
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Your data is yours. Period.</h2>
              <p className="text-lg text-zinc-400 mb-8 max-w-2xl mx-auto leading-relaxed">
                Clip It was built with a fundamental belief: screen capture tools shouldn't spy on you. 
                There are no accounts, no cloud uploads, and no tracking SDKs. Everything happens locally on your device's hardware.
              </p>
              <Link to="/clipit/privacy" className="text-[#FF6B4A] hover:text-[#ff8c73] font-medium inline-flex items-center gap-1 transition-colors">
                Read our plain-English Privacy Policy <span aria-hidden="true">&rarr;</span>
              </Link>
            </ScrollReveal>
          </div>
        </div>

        {/* Pricing */}
        <div className="py-24">
          <div className="container mx-auto px-6 max-w-4xl">
            <ScrollReveal>
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Simple Pricing</h2>
                <p className="text-zinc-400">Start for free, upgrade when you need to.</p>
              </div>
            </ScrollReveal>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Free Tier */}
              <ScrollReveal delay={100}>
                <div className="p-8 rounded-3xl bg-zinc-900 border border-zinc-800">
                  <h3 className="text-2xl font-bold text-white mb-2">Free</h3>
                  <p className="text-zinc-400 mb-6">Perfect for basic capturing</p>
                  <div className="text-4xl font-bold text-white mb-8">$0</div>
                  <ul className="space-y-4 mb-8">
                    {["Unlimited screenshots", "Basic screen recording", "Local Vault storage", "Standard editing tools"].map((feature, i) => (
                      <li key={i} className="flex items-center gap-3 text-zinc-300">
                        <Check className="w-5 h-5 text-[#FF6B4A]" />
                        {feature}
                      </li>
                    ))}
                    <li className="flex items-center gap-3 text-zinc-500 italic">
                      <Check className="w-5 h-5 opacity-0" />
                      Contains small watermark
                    </li>
                  </ul>
                </div>
              </ScrollReveal>

              {/* Premium Tier */}
              <ScrollReveal delay={200}>
                <div className="p-8 rounded-3xl bg-gradient-to-b from-[#FF6B4A]/10 to-zinc-900 border border-[#FF6B4A]/30 relative overflow-hidden">
                  <div className="absolute top-0 right-0 bg-[#FF6B4A] text-white text-xs font-bold px-3 py-1 rounded-bl-lg">RECOMMENDED</div>
                  <h3 className="text-2xl font-bold text-white mb-2">Premium</h3>
                  <p className="text-zinc-400 mb-6">For power users & creators</p>
                  <div className="text-4xl font-bold text-white mb-8">Unlock In-App</div>
                  <ul className="space-y-4 mb-8">
                    {["Everything in Free", "No watermarks", "Flashback Buffer feature", "Smart OCR Search", "Custom Collections"].map((feature, i) => (
                      <li key={i} className="flex items-center gap-3 text-white">
                        <Check className="w-5 h-5 text-[#FF6B4A]" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <a href="#download" className="block w-full text-center bg-[#FF6B4A] hover:bg-[#ff8c73] text-white py-3 rounded-xl font-medium transition-colors">
                    Download to view plans
                  </a>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="py-24 bg-zinc-900/30 border-t border-zinc-800/50">
          <div className="container mx-auto px-6 max-w-3xl">
            <ScrollReveal>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-10 text-center">Frequently Asked Questions</h2>
            </ScrollReveal>
            <ScrollReveal delay={100}>
              <div className="border-t border-zinc-800/50">
                <FaqItem 
                  question="Does this work in the background while I game?" 
                  answer="Yes! The floating bubble and Flashback Buffer remain active over any full-screen game or app, allowing you to capture epic moments without interrupting your gameplay."
                />
                <FaqItem 
                  question="Is my data ever uploaded anywhere?" 
                  answer="No. Clip It is a 100% local app. We do not have servers, and we do not collect your screenshots or recordings. Everything stays on your device."
                />
                <FaqItem 
                  question="What permissions does the app need, and why?" 
                  answer="It requires 'Display over other apps' to show the floating bubble, and 'Screen Recording' to actually capture the screen when you tap the bubble. We also request Storage permissions to save your clips."
                />
                <FaqItem 
                  question="iOS or Android?" 
                  answer="Currently, Clip It is available exclusively for Android via the Google Play Store, as it relies on specific Android system capabilities for the floating bubble mechanic."
                />
              </div>
            </ScrollReveal>
          </div>
        </div>

        {/* CTA & Footer */}
        <div id="download" className="py-24 border-t border-zinc-800">
          <div className="container mx-auto px-6 text-center max-w-2xl">
            <ScrollReveal>
              <div className="w-16 h-16 bg-zinc-900 border border-zinc-800 rounded-2xl mx-auto mb-6 flex items-center justify-center">
                <div className="w-6 h-6 border-2 border-[#FF6B4A] rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-[#FF6B4A] rounded-full" />
                </div>
              </div>
              <h2 className="text-3xl font-bold text-white mb-6">Ready to start capturing?</h2>
              <a 
                href="#" 
                className="inline-flex items-center gap-2 bg-[#FF6B4A] hover:bg-[#ff8c73] text-white px-8 py-4 rounded-xl font-semibold transition-all hover:scale-105 mx-auto"
                onClick={(e) => e.preventDefault()}
              >
                <Download className="w-5 h-5" />
                Get it on Google Play
              </a>
              <p className="text-sm text-zinc-500 mt-6">Requires Android 10.0 or higher.</p>
            </ScrollReveal>
          </div>
        </div>

        <footer className="border-t border-white/10 py-12 bg-[#0A0A0C]">
          <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
               <div className="w-6 h-6 border-2 border-[#FF6B4A] rounded-full flex items-center justify-center">
                  <div className="w-1.5 h-1.5 bg-[#FF6B4A] rounded-full" />
                </div>
              <span className="font-bold text-white tracking-wide">Clip It</span>
            </div>
            
            <div className="flex flex-wrap justify-center gap-6 text-sm text-zinc-500">
              <Link to="/clipit/privacy" className="hover:text-zinc-300 transition-colors">Privacy Policy</Link>
              <Link to="/clipit/terms" className="hover:text-zinc-300 transition-colors">Terms of Service</Link>
              <a href="mailto:support@aimteralabs.com" className="hover:text-zinc-300 transition-colors">Contact Support</a>
            </div>
            
            <p className="text-sm text-zinc-600">&copy; {new Date().getFullYear()} Aimtera Labs.</p>
          </div>
        </footer>
      </div>
    </PageTransition>
  );
};

export default ClipIt;
