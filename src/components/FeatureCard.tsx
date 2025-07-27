interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: "blue" | "indigo" | "purple" | "green" | "orange" | "pink";
}

const FeatureCard = ({ icon, title, description, color }: FeatureCardProps) => {
  const colorClasses = {
    blue: "from-blue-500 to-blue-600 group-hover:from-blue-600 group-hover:to-blue-700",
    indigo:
      "from-indigo-500 to-indigo-600 group-hover:from-indigo-600 group-hover:to-indigo-700",
    purple:
      "from-purple-500 to-purple-600 group-hover:from-purple-600 group-hover:to-purple-700",
    green:
      "from-green-500 to-green-600 group-hover:from-green-600 group-hover:to-green-700",
    orange:
      "from-orange-500 to-orange-600 group-hover:from-orange-600 group-hover:to-orange-700",
    pink: "from-pink-500 to-pink-600 group-hover:from-pink-600 group-hover:to-pink-700",
  };

  return (
    <div className="group relative p-6 sm:p-8 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:-translate-y-2 border border-gray-200/50 dark:border-gray-700/50">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent to-transparent group-hover:from-blue-50/50 group-hover:to-indigo-50/50 dark:group-hover:from-blue-900/10 dark:group-hover:to-indigo-900/10 rounded-2xl sm:rounded-3xl transition-all duration-500"></div>
      <div className="relative z-10">
        <div
          className={`w-12 sm:w-16 h-12 sm:h-16 bg-gradient-to-r ${colorClasses[color]} rounded-xl sm:rounded-2xl mb-4 sm:mb-6 flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300`}
        >
          {icon}
        </div>
        <h4 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {title}
        </h4>
        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
};
export default FeatureCard;
