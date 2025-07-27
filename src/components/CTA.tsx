import { Mic, ArrowRight } from "lucide-react";
const CTA = () => {
  return (
    <section className="relative z-10 py-12 sm:py-20 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto text-center">
        <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl sm:rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 to-blue-400/20 rounded-2xl sm:rounded-3xl"></div>
          <div className="relative z-10">
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 sm:mb-6">
              आपका अधिकार, आपकी आवाज़
              <br />
              <span className="text-lg sm:text-xl lg:text-2xl">
                Your Rights, Your Voice
              </span>
            </h3>
            <p className="text-base sm:text-lg lg:text-xl text-blue-100 mb-6 sm:mb-8 max-w-2xl mx-auto">
              Join thousands who&apos;ve already discovered how easy government
              services can be. No forms, no travel, no confusion - just
              conversations that get results.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => (window.location.href = "/voice-buddy")}
                className="cursor-pointer group w-full sm:w-auto px-8 sm:px-10 py-4 sm:py-5 bg-white text-green-600 rounded-xl sm:rounded-2xl font-bold text-base sm:text-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1"
              >
                <div className="flex items-center justify-center">
                  <Mic className="mr-3 h-5 sm:h-6 w-5 sm:w-6 group-hover:animate-pulse" />
                  <span>अभी शुरू करें / Start Now</span>
                  <ArrowRight className="ml-2 h-4 sm:h-5 w-4 sm:w-5 group-hover:translate-x-1 transition-transform" />
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default CTA;
