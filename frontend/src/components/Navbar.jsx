import { Film } from "lucide-react";

export default function Navbar() {
    return (
        <nav className="navbar">
            <div className="navbar-inner">
                <div className="navbar-logo">
                    <div className="navbar-logo-icon">
                        <Film />
                    </div>
                    <span className="navbar-title">
                        MOVIE<span className="navbar-title-accent">SENTIMENT</span>
                    </span>
                </div>

                <div className="navbar-links">
                    <span>How it works</span>
                    <span>About</span>
                </div>
            </div>
        </nav>
    );
}
