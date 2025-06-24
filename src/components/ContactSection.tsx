import { useState } from "react";
import { Mail, MapPin, Phone, Send, CheckCircle, Github } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Error",
        description: "Please fill in all fields.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Simulate form submission - replace with actual service
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setIsSubmitting(false);
      setFormData({ name: '', email: '', message: '' });
      
      toast({
        title: "Message sent!",
        description: "Thanks for reaching out! I'll get back to you soon.",
      });
      
      // Reset success state after 3 seconds
      setTimeout(() => setIsSubmitting(false), 3000);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <section id="contact" className="mb-16 sm:mb-20">
      <div className="mb-8 sm:mb-12">
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-3 sm:mb-4">Get In Touch</h2>
        <p className="text-slate-600 text-base sm:text-lg">
          Have a project in mind or just want to chat? I'd love to hear from you.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Contact Form */}
        <div className="bg-white rounded-xl p-6 sm:p-8 shadow-sm border border-slate-200">
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-sm sm:text-base"
                placeholder="Your name"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-sm sm:text-base"
                placeholder="your.email@example.com"
                required
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-2">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={5}
                className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none text-sm sm:text-base"
                placeholder="Tell me about your project or just say hello..."
                required
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-600 text-white px-6 py-3 sm:py-4 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-medium text-sm sm:text-base touch-manipulation flex items-center justify-center space-x-2"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Sending...</span>
                </>
              ) : (
                <span>Send Message</span>
              )}
            </button>
          </form>
        </div>

        {/* Contact Info */}
        <div className="space-y-6 sm:space-y-8">
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 sm:p-8">
            <h3 className="text-lg sm:text-xl font-semibold text-slate-900 mb-4">Let's Connect</h3>
            <p className="text-slate-600 mb-6 text-sm sm:text-base leading-relaxed">
              I'm always interested in hearing about new opportunities, creative projects, 
              or just having a friendly conversation about technology and development.
            </p>
            
            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
                </div>
                <span className="text-slate-700 text-sm sm:text-base">hello@johndoe.dev</span>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Github className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600" />
                </div>
                <span className="text-slate-700 text-sm sm:text-base">github.com/johndoe</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 sm:p-8 shadow-sm border border-slate-200">
            <h3 className="text-lg sm:text-xl font-semibold text-slate-900 mb-4">Response Time</h3>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              I typically respond to messages within 24-48 hours. For urgent inquiries, 
              feel free to reach out directly via email.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
