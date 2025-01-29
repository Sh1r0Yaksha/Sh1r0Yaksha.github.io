class TopBar extends HTMLElement {
    constructor() {
        super();
        // Attach shadow DOM
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        // HTML content for the top bar
        const htmlContent = `
        <style>
            .top-bar {
                position: fixed;
                top: 0;
                left: 0;
                background-color: #282828;
                display: flex;
                justify-content: space-between;
                transition: padding 0.3s ease;
                align-items: center;
                width: 100%;
                height: 50px;
                z-index: 999;
            }

            .top-bar-element {
                padding: 5px;
                margin: 5px;
            }

            .name {
                padding-left: 10px;
                font-size: 110%;
                font-family: 'Merriweather', serif;
                font-weight: bold;
            }

            .links {
                margin-right: 10px;
            }

            .button {
                display: inline-block;
                padding: 10px 20px;
                font-size: 16px;
                font-family: 'Merriweather', serif;
                font-weight: bold;
                text-align: center;
                text-decoration: none;
                color: white;
                background-color: #5c8dcb;
                border: none;
                border-radius: 20px;
                transition: background-color 0.3s, box-shadow 0.3s, transform 0.3s;
            }

            .button:hover {
                background-color: #4180c4;
                box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
                transform: scale(1.1);
            }

            .button:active {
                background-color: #004085;
                box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2);
                transform: translateY(2px);
            }

            .hamburger {
                display: none;
            }

            .hamburger-links {
                display: none;
                flex-direction: column;
                position: absolute;
                top: 50px;
                left: 0;
                background-color: #282828;
                width: 100%;
                padding: 10px;
            }

            .top-bar.expanded {
                padding: 40px;
            }

            .hamburger-links.show {
                display: flex;
            }

            @media only screen and (max-width: 768px) {
                .hamburger {
                    display: flex;
                    margin-right: 10px;
                    font-size: 30px;
                }

                .top-bar-element.links {
                    display: none;
                }

                .hamburger-links {
                    display: none;
                    flex-direction: column;
                    width: 100%;
                    padding: 20px 0;
                }

                .hamburger-links.show {
                    display: flex;
                }

                .top-bar-element {
                    font-size: 20px;
                    margin-bottom: 10px;
                }

                .hamburger {
                    margin-top: 10px;
                }
            }
        </style>
        <div class="top-bar">
            <div class="top-bar-element name">
                <a href="/index.html" style="color: inherit; text-decoration: none;">
                    Akshat Singh
                </a>
            </div>
            <div class="hamburger">☰</div> <!-- Hamburger icon -->
            <div class="hamburger-links">
                <a href="/index.html" class="top-bar-element button">Home</a>
                <a href="/index.html#Projects" class="top-bar-element button">Projects</a>
                <a href="#Contact" class="top-bar-element button">Contact</a>
                <a href="/Games/Games.html" class="top-bar-element button">Games</a>
            </div>
            <div class="top-bar-element links">
                <a href="/index.html" class="top-bar-element button">Home</a>
                <a href="/index.html#Projects" class="top-bar-element button">Projects</a>
                <a href="#Contact" class="top-bar-element button">Contact</a>
                <a href="/Games/Games.html" class="top-bar-element button">Games</a>
            </div>
        </div>
        `;

        // Add HTML content and styles to the shadow DOM
        this.shadowRoot.innerHTML = htmlContent;

        const hamburger = this.shadowRoot.querySelector('.hamburger');
        const hamburgerLinks = this.shadowRoot.querySelector('.hamburger-links');
        const links = this.shadowRoot.querySelectorAll('.hamburger-links .top-bar-element'); // Select all links inside the hamburger menu

        hamburger.addEventListener('click', () => {
            hamburgerLinks.classList.toggle('show'); // Toggle the 'show' class to display the links
        });

        // Close the menu when any link inside the hamburger menu is clicked
        links.forEach(link => {
            link.addEventListener('click', () => {
                hamburgerLinks.classList.remove('show'); // Hide the hamburger menu
            });
        });
    }
}

// Define the custom element
customElements.define('top-bar', TopBar);
