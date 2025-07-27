import { Languages, MapPin, Heart, FileText } from "lucide-react";

const Problem = () => {
  return (
    <section className="relative z-10 py-12 sm:py-20 px-4 sm:px-6 bg-gradient-to-r from-gray-50 to-green-50 dark:from-gray-800 dark:to-green-900/20">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <h3 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Breaking Down Barriers
          </h3>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Millions struggle with government services due to language,
            distance, and complexity. We&apos;re changing that, one conversation
            at a time.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 sm:gap-8 mb-12">
          <div className="text-center p-6 bg-white/80 dark:bg-gray-800/80 rounded-2xl shadow-lg">
            <MapPin className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
              Distance Problem
            </h4>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Remote areas, far from government offices, multiple trips required
            </p>
          </div>
          <div className="text-center p-6 bg-white/80 dark:bg-gray-800/80 rounded-2xl shadow-lg">
            <Languages className="h-12 w-12 text-orange-500 mx-auto mb-4" />
            <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
              Language Barriers
            </h4>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Complex English forms, no local language support, confusing
              processes
            </p>
          </div>
          <div className="text-center p-6 bg-white/80 dark:bg-gray-800/80 rounded-2xl shadow-lg">
            <FileText className="h-12 w-12 text-blue-500 mx-auto mb-4" />
            <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
              Complex Procedures
            </h4>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Overwhelming paperwork, unclear requirements, changing rules
            </p>
          </div>
        </div>

        <div className="text-center">
          <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-full font-semibold">
            <Heart className="h-5 w-5 mr-2" />
            Our Solution: A Caring Digital Companion
          </div>
        </div>
      </div>
    </section>
  );
};
export default Problem;
