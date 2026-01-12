import "./styles/Work.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

const Work = () => {
  useGSAP(() => {
    let translateX: number = 0;

    function setTranslateX() {
      const box = document.getElementsByClassName("work-box");
      if (box.length === 0) return;

      const rectLeft = document
        .querySelector(".work-container")!
        .getBoundingClientRect().left;
      const rect = box[0].getBoundingClientRect();
      const parentWidth = box[0].parentElement!.getBoundingClientRect().width;
      let padding: number =
        parseInt(window.getComputedStyle(box[0]).padding) / 2;
      translateX = rect.width * box.length - (rectLeft + parentWidth) + padding;
    }

    setTranslateX();

    if (translateX > 0) {
      let timeline = gsap.timeline({
        scrollTrigger: {
          trigger: ".work-section",
          start: "top top",
          end: `+=${translateX}`,
          scrub: true,
          pin: true,
          id: "work",
        },
      });

      timeline.to(".work-flex", {
        x: -translateX,
        ease: "none",
      });

      return () => {
        timeline.kill();
        ScrollTrigger.getById("work")?.kill();
      };
    }
  }, []);

  const projects = [
    {
      title: "Paradise Universe",
      role: "Game World Builder",
      description: "An expansive game universe featuring immersive storytelling and intricate world-building mechanics.",
      tech: ["Blender", "Unity", "C#"]
    },
    {
      title: "Marine Vessel Design",
      role: "Technical Draftsman",
      description: "Precision CAD work for marine vessel production, including CNC layouts and technical blueprints.",
      tech: ["AutoCAD", "Inventor", "Fusion 360"]
    },
    {
      title: "Interactive 3D Portfolio",
      role: "Full-Stack Developer",
      description: "Modern portfolio website with real-time 3D character animations and smooth scroll effects.",
      tech: ["React", "Three.js", "GSAP"]
    }
  ];

  return (
    <div className="work-section" id="work">
      <div className="work-container section-container">
        <h2>
          My <span>Work</span>
        </h2>
        <div className="work-flex">
          {projects.map((project, index) => (
            <div className="work-box" key={index}>
              <div className="work-info">
                <div className="work-title">
                  <div>
                    <h3>{project.title}</h3>
                    <h4>{project.role}</h4>
                  </div>
                </div>
                <p>{project.description}</p>
                <p style={{ marginTop: "15px", opacity: 0.7 }}>
                  <strong>Tech Stack:</strong> {project.tech.join(", ")}
                </p>
              </div>
              <div className="work-image">
                <div className="work-image-in" style={{
                  width: "100%",
                  height: "250px",
                  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  borderRadius: "10px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "48px",
                  fontWeight: "bold",
                  color: "rgba(255,255,255,0.3)"
                }}>
                  {project.title[0]}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Work;
