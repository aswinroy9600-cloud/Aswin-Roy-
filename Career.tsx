import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          My career <span>&</span>
          <br /> experience
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Game Developer & World Builder</h4>
                <h5>Independent / Student</h5>
              </div>
              <h3>Present</h3>
            </div>
            <p>
              Developing immersive game mechanics and expansive world-building for original storytelling. Tools: Blender, Game Design Principles, Narrative Design.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Marine Field Draftsman</h4>
                <h5>Navalt Solar Marine</h5>
              </div>
              <h3>Nov 2024 - Jul 2025</h3>
            </div>
            <p>
              Executed precise technical drawings and CNC layouts for marine vessel production. Tools: AutoCAD, AutoCAD Inventor, Fusion 360, Revit.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
