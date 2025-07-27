import FeatureCard from "./FeatureCard";
import {
  FileText,
  Volume2,
  Languages,
  Accessibility,
  Brain,
  HeartHandshake,
} from "lucide-react";
const Features = () => {
  return (
    <section className="relative z-10 py-12 sm:py-20 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <h3 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            How We Help People
          </h3>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Every feature is designed with empathy, understanding the real
            challenges faced by citizens in rural and urban areas
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          <FeatureCard
            icon={<Volume2 className="h-8 w-8" />}
            title="Voice-First Design"
            description="No typing, no reading complex menus. Just speak naturally like you're talking to a helpful friend who understands your needs."
            color="blue"
          />
          <FeatureCard
            icon={<Languages className="h-8 w-8" />}
            title="True Multilingual Support"
            description="Speak in Hindi and English. We understand dialects and regional variations too."
            color="indigo"
          />
          <FeatureCard
            icon={<Brain className="h-8 w-8" />}
            title="Smart Eligibility Matching"
            description="Tell us about your situation, and we'll instantly identify all welfare schemes you qualify for - no more missing out on benefits."
            color="purple"
          />
          <FeatureCard
            icon={<Accessibility className="h-8 w-8" />}
            title="Accessibility Champion"
            description="Built for elderly citizens, people with disabilities, and those who've never used smartphones. Simple, patient, and understanding."
            color="green"
          />
          <FeatureCard
            icon={<FileText className="h-8 w-8" />}
            title="Document Helper"
            description="Confused about paperwork? We explain every document needed, help you check what you have, and remind you what's missing."
            color="orange"
          />
          <FeatureCard
            icon={<HeartHandshake className="h-8 w-8" />}
            title="Cultural Sensitivity"
            description="We understand Indian family structures, cultural contexts, and speak with the respect and patience you deserve."
            color="pink"
          />
        </div>
      </div>
    </section>
  );
};
export default Features;
