import { Target, Heart, Award, Users } from "lucide-react";
import { motion } from "motion/react";

export function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-br from-gray-50 to-orange-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              О{" "}
              <span className="text-[#FF6B35]">
                Ketem education
              </span>
            </h1>
            <p className="text-xl text-gray-600">
              Мы помогаем талантливым студентам получить
              образование мирового уровня с 2022 года
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            {[
              {
                icon: Target,
                title: "Наша миссия",
                text: "Делать качественное образование доступным для каждого талантливого студента, независимо от его финансовых возможностей.",
              },
              {
                icon: Heart,
                title: "Наши ценности",
                text: "Профессионализм, честность, индивидуальный подход и забота о каждом студенте на всех этапах пути.",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="bg-white p-8 rounded-xl shadow-sm"
              >
                <item.icon className="h-12 w-12 text-[#FF6B35] mb-4" />
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  {item.title}
                </h2>
                <p className="text-gray-600 text-lg">
                  {item.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-[#FF6B35] to-[#E55A2B] rounded-2xl p-12 text-white">
            <div className="text-center mb-12">
              <Award className="h-16 w-16 mx-auto mb-4" />
              <h2 className="text-4xl font-bold mb-4">
                Наши достижения
              </h2>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { value: "99%", label: "Успешных поступлений" },
                {
                  value: "1500+",
                  label: "Довольных студентов",
                },
                { value: "50+", label: "Стран-партнеров" },
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-5xl font-bold mb-2">
                    {stat.value}
                  </div>
                  <div className="text-white/90">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}