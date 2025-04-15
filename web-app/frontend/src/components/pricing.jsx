import "./pricing.css";

function Pricing() {
    return (
        <div className="pricing-container">
            <h2 className="pricing-title">Choose Your Plan</h2>
            <div className="pricing-cards">
                <div className="pricing-card">
                    <h3 className="plan-title">Explorer</h3>
                    <p className="plan-price">$4.99/mo</p>
                    <ul className="plan-features">
                        <li>Basic sensor data (pH & moisture)</li>
                        <li>1 device connection</li>
                        <li>Weekly reports</li>
                    </ul>
                    <button className="plan-button">Get Started</button>
                </div>
                <div className="pricing-card featured">
                    <h3 className="plan-title">Pioneer</h3>
                    <p className="plan-price">$9.99/mo</p>
                    <ul className="plan-features">
                        <li>All Explorer features</li>
                        <li>Real-time monitoring</li>
                        <li>Up to 3 devices</li>
                        <li>Daily insights</li>
                    </ul>
                    <button className="plan-button">Most Popular</button>
                </div>
                <div className="pricing-card">
                    <h3 className="plan-title">Colonist</h3>
                    <p className="plan-price">$19.99/mo</p>
                    <ul className="plan-features">
                        <li>All Pioneer features</li>
                        <li>Advanced analytics</li>
                        <li>Unlimited devices</li>
                        <li>Priority support</li>
                    </ul>
                    <button className="plan-button">Go Premium</button>
                </div>
            </div>
        </div>
    );
}

export default Pricing;
