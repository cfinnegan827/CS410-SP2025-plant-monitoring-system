import "./aboutSection.css";

function AboutSection({ id }) {
    return (
        <div id={id} className="aboutSection">
            <div className="aboutSectionContainer">
                <h1 className="title">About</h1>
                <p className="text">
                    The Martian Project is more than just a plant gadget — it’s your plant’s personal life support system. 
                    Designed for both beginners and seasoned plant parents, our device sits neatly in your plant pot and monitors 
                    the four essential metrics your green friend needs to thrive:
                </p>
                <ul className="text">
                    <li>🌿 <strong>pH Level</strong></li>
                    <li>🌿 <strong>Soil Moisture</strong></li>
                    <li>🌿 <strong>Ambient Temperature</strong></li>
                    <li>🌿 <strong>Light Intensity</strong></li>
                </ul>
                <p className="text">
                    Using real-time sensor data, our technology helps you understand your plant’s environment and 
                    take the guesswork out of plant care. Whether you're growing herbs on your kitchen counter or planning 
                    for life on Mars, The Martian Project gives you the insights you need to grow with confidence.
                </p>
                <p className="text">Welcome to the future of plant care. 🌍 ➡️ 🌱 ➡️ 🚀</p>
            </div>
        </div>
    );
}

export default AboutSection;
