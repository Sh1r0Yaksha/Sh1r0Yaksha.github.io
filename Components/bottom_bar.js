
class BottomBar extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        // HTML content for the top bar
        const htmlContent = `
            <style>
                .footer {
                    position: fixed;
                    left: 0;
                    bottom: 0;
                    width: 100%;
                    background: #282828;
                    z-index: 99;
                }

                .item {
                    padding: 10px;
                    width: auto;
                }

                .contacts {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                }

                .text-contacts {
                    display: flex;
                    align-items: center;
                }

                .contact-item {
                    display: flex;
                    align-items: center;
                    /* border:2px solid red; */
                }

                .contact-text {
                    /* border:1px solid white; */
                    font-family: 'Merriweather', serif;
                    color: #b0c4e5;
                    text-decoration: none;
                    margin: 10px 10px 10px 10px;
                }

                .bold {
                    font-weight: bold;
                }

                .contact-icon {
                    width: 25px;
                    margin-top: 10px;
                    margin-right: 20px;
                    margin-left: 20px;
                    margin-bottom: 0px;
                }
            </style>
            <footer>
                <div id="Contact" class="item contacts">
                    <div class="contact-item contact-text">
                        Contact:
                    </div>
                    <div class="text-contacts">
                        <div class="contact-item">
                            <div class="contact-text">+91-7860264227</div>
                        </div>
                        <div class="contact-item">
                            <a class="contact-text" href="mailto:akshats20@iiserb.ac.in">akshats20@iiserb.ac.in</a>
                        </div>
                        <div class="contact-item">
                            <a class="contact-text" href="mailto:akshat12y@gmail.com">akshat12y@gmail.com</a>
                        </div>
                    </div>
                    <div class="contact-item">
                        <a href="https://www.linkedin.com/in/akshat-singh-2b0466218/" target="_blank">
                            <img src="/images/linkedin-app-icon.svg" alt="LinkedIn" class="contact-icon">
                        </a>
                        <a href="https://github.com/Sh1r0Yaksha" target="_blank">
                            <img src="/images/github-icon.svg" alt="Github" class="contact-icon">
                        </a>
                        <a href="https://orcid.org/0009-0002-7938-7529" target="_blank">
                            <img src="/images/ORCID_iD.svg" alt="ORCID" class="contact-icon">
                        </a>
                    </div>
                </div>
            </footer>
        `;

        this.id = 'Contact'
        // Add HTML content and styles to the shadow DOM
        this.innerHTML = htmlContent;
    }
}

// Define the custom element
customElements.define('bottom-bar', BottomBar);


