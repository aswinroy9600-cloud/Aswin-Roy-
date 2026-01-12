import { PropsWithChildren } from "react";
import "./styles/Landing.css";

const Landing = ({ children }: PropsWithChildren) => {
  return (
    <>
      <div className="landing-section" id="landingDiv">
        <div className="landing-container">
          <div className="landing-intro">
            <h2>Hello! I'm</h2>
            <h1>
              ASWIN
              <br />
              <span>ROY</span>
            </h1>
            <h3 style={{ marginTop: "1rem", fontSize: "1.2rem", fontWeight: "400" }}>PARADISE UNIVERSE</h3>
          </div>
          <div className="landing-info">
            <h3>Crafting digital solutions</h3>
            <h2 className="landing-info-h2">
              <div className="landing-h2-1">with precision</div>
              <div className="landing-h2-2">and passion</div>
            </h2>
            <h2>
              <div className="landing-h2-info">Game Developer</div>
              <div className="landing-h2-info-1">World Builder</div>
            </h2>
          </div>
        </div>
        {children}
      </div>
    </>
  );
};

export default Landing;
