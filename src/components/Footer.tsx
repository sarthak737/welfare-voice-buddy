import { HeartHandshake } from "lucide-react";
const Footer = () => {
  return (
    <footer className="relative z-10 p-6 sm:p-8 text-center border-t border-gray-200/50 dark:border-gray-700/50 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-center mb-4">
          <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg flex items-center justify-center mr-3">
            <HeartHandshake className="h-5 w-5 text-white" />
          </div>
          <span className="text-lg font-bold bg-gradient-to-r from-green-600 to-blue-600 dark:from-green-400 dark:to-blue-400 bg-clip-text text-transparent">
            Welfare Voice Buddy
          </span>
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
          © {new Date().getFullYear()} Welfare Voice Buddy. Empowering every
          citizen through technology.
        </p>
        <p className="text-xs text-gray-400 dark:text-gray-500">
          सरकारी सेवाएं, आसान भाषा में • Government Services, Made Simple
        </p>
      </div>
    </footer>
  );
};
export default Footer;
