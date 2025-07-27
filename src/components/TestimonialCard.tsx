import { Star, MapPin } from "lucide-react";

interface TestimonialProps {
  name: string;
  location: string;
  quote: string;
  language: string;
}

const TestimonialCard = ({
  name,
  location,
  quote,
  language,
}: TestimonialProps) => {
  return (
    <div className="bg-white/80 dark:bg-gray-800/80 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200/50 dark:border-gray-700/50">
      <div className="flex items-center mb-4">
        <div className="flex space-x-1 mb-2">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
          ))}
        </div>
      </div>
      <p className="text-gray-700 dark:text-gray-300 mb-4 italic leading-relaxed">
        &quot;{quote}&quot;
      </p>
      <div className="flex items-center justify-between">
        <div>
          <h5 className="font-semibold text-gray-900 dark:text-white">
            {name}
          </h5>
          <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
            <MapPin className="h-3 w-3 mr-1" />
            {location}
          </p>
        </div>
        <span className="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 px-2 py-1 rounded-full">
          {language}
        </span>
      </div>
    </div>
  );
};
export default TestimonialCard;
