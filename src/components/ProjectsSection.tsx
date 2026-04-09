import property1 from "@/assets/property-1.jpg";
import property2 from "@/assets/property-2.jpg";
import property3 from "@/assets/property-3.jpg";

const projects = [
  {
    image: property1,
    title: "Villa Serena",
    location: "Comporta, Portugal",
    type: "Residencial de Luxo",
  },
  {
    image: property2,
    title: "The Hillside",
    location: "Cascais, Portugal",
    type: "Empreendimento Exclusivo",
  },
  {
    image: property3,
    title: "The Residence",
    location: "Lisboa, Portugal",
    type: "Apartamentos Premium",
  },
];

const ProjectsSection = () => {
  return (
    <section id="projects" className="py-24 md:py-32 bg-dark-deep">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-gold text-xs tracking-widest-xl uppercase mb-4">
            Portefólio
          </p>
          <h2 className="text-3xl md:text-5xl font-bold text-primary-foreground">
            Projetos em Destaque
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="group relative overflow-hidden cursor-pointer"
            >
              <div className="aspect-[3/4] overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-dark-deep via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <p className="text-gold text-xs tracking-widest uppercase mb-2">
                  {project.type}
                </p>
                <h3 className="text-xl font-bold text-primary-foreground mb-1">
                  {project.title}
                </h3>
                <p className="text-primary-foreground/60 text-sm">
                  {project.location}
                </p>
              </div>
              {/* Hover border */}
              <div className="absolute inset-0 border border-gold/0 group-hover:border-gold/40 transition-all duration-500" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
