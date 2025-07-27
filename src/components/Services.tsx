const Services = () => {
  return (
    <section className="relative z-10 py-12 sm:py-20 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <h3 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Welfare Schemes & Services
          </h3>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300">
            From Aadhaar to housing schemes, we help with everything that
            matters to your family
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {[
            { name: "आधार कार्ड", icon: "🆔" },
            { name: "राशन कार्ड", icon: "🍚" },
            { name: "पेंशन योजना", icon: "👴" },
            { name: "आवास योजना", icon: "🏠" },
            { name: "स्वास्थ्य बीमा", icon: "🏥" },
            { name: "शिक्षा छात्रवृत्ति", icon: "🎓" },
            { name: "रोजगार गारंटी", icon: "💼" },
            { name: "किसान योजना", icon: "🌾" },
          ].map((service, index) => (
            <div
              key={index}
              className="group p-4 sm:p-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-gray-200/50 dark:border-gray-700/50"
            >
              <div className="text-2xl sm:text-3xl mb-2 sm:mb-4 text-center group-hover:scale-110 transition-transform">
                {service.icon}
              </div>
              <h4 className="text-sm sm:text-lg font-semibold text-gray-900 dark:text-white text-center">
                {service.name}
              </h4>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default Services;
