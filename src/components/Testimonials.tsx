import TestimonialCard from "./TestimonialCard";

const Testimonials = () => {
  return (
    <section className="relative z-10 py-12 sm:py-20 px-4 sm:px-6 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <h3 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Real Stories, Real Impact
          </h3>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300">
            Hear from citizens who found their voice through our digital
            companion
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          <TestimonialCard
            name="राज कुमार"
            location="Jharkhand"
            quote="पहले मुझे समझ नहीं आता था कि कौन सी योजना मेरे लिए है। अब मैं बस बोलती हूं और सब कुछ समझ जाती हूं।"
            language="Hindi"
          />
          <TestimonialCard
            name="Smith"
            location="NRI"
            quote="I had never been to a government office. Now all the work gets done sitting at home."
            language="Punjabi"
          />
          <TestimonialCard
            name="Lakshmi Devi"
            location="Tamil Nadu"
            quote="I can't read or write properly. But this system understands my speech."
            language="Tamil"
          />
        </div>
      </div>
    </section>
  );
};
export default Testimonials;
