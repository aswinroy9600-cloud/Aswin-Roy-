import { useEffect, useRef } from "react";

const TechStack = () => {
  const techStackRef = useRef<HTMLDivElement>(null);

  const technologies = [
    { name: "React", color: "#61DAFB" },
    { name: "Node.js", color: "#68A063" },
    { name: "TypeScript", color: "#3178C6" },
    { name: "JavaScript", color: "#F7DF1E" },
    { name: "MongoDB", color: "#47A248" },
    { name: "MySQL", color: "#4479A1" },
    { name: "Express", color: "#000000" },
    { name: "Three.js", color: "#FFFFFF" },
    { name: "GSAP", color: "#88CE02" },
    { name: "Blender", color: "#F5792A" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (!techStackRef.current) return;
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      const workSection = document.getElementById("work");
      if (workSection) {
        const threshold = workSection.getBoundingClientRect().top;
        if (scrollY > threshold && scrollY < threshold + 2000) {
          techStackRef.current.classList.add("tech-active");
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="techstack" ref={techStackRef}>
      <h2>My Techstack</h2>
      <div className="tech-grid">
        {technologies.map((tech, index) => (
          <div
            key={index}
            className="tech-item"
            style={{
              animationDelay: `${index * 0.1}s`,
            }}
          >
            <div
              className="tech-circle"
              style={{
                background: `linear-gradient(135deg, ${tech.color}80, ${tech.color}40)`,
                boxShadow: `0 0 20px ${tech.color}40`,
              }}
            >
              <span>{tech.name.charAt(0)}</span>
            </div>
            <p>{tech.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TechStack;
