window.addEventListener('load', function () {
    document.head.appendChild(loadSnapPopupStyles());
});

function loadSnapPopupStyles() {
    var styleELement = document.createElement('style');
    styleELement.textContent = `
    .snap-top-margin-1 {
        margin-top: 10px;
    }
    
    .snap-top-margin-2 {
        margin-top: 20px;
    }
    
    .snap-top-margin-3 {
        margin-top: 30px;
    }
    .snap-popup-stop-scroll {
        height: 100vh;
        overflow: hidden;
    }
    .snap-popup-background {
        height: 100vh;
        width: 100vw;
        background-color: rgba(0, 0, 0, 0.2);
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 1000000000;
        margin: 0;
        overflow-y: scroll;
        display: grid;
        justify-items: center;
        align-items: center;
        font-family: Monospace;
    }
    .snap-popup-base {
        overflow:hidden;
        z-index: 1000000001;
        padding: 50px;
        background-color: #fff;
        border-radius: 25px;
        position: relative;
        top: 0px;
        opacity: 1;
        box-shadow: 0 0 5px rgba(0, 0, 0, 0.047);
        animation: aniSnapPopupBase 0.2s ease-in-out;
        margin: 20px;
    }
    @keyframes aniSnapPopupBase {
      0% {
        top:40px;
        opacity:0;
    }
    100% {
        top:0px;
        opacity:1;
      }
    }
    .base-content-container {
        padding: 25px;
    }
    .snap-popup-close {
        position: absolute;
        top: 0;
        right: 0;
        height: 80px;
        width: 80px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 2em;
        font-weight: 900;
        cursor: pointer;
        user-select: none;
        color: #000;
        transition: 0.3s;
        border-bottom-left-radius: 25px;
      }
      .snap-popup-close:hover {
        background-color: #dbdbdb;
      }
      .snap-icon {
        height: 75px;
        width: 75px;
        margin: auto;
        transition: 0.3s;
      }
      .snap-header {
        font-weight: 900;
        font-size: 1.4rem;
        text-align: center;
        color: #000;
      }
      .snap-details {
        font-size: 1rem;
        text-align: center;
        line-height: 2rem;
        color: #000;
      }
      .snap-button {
        outline: none;
        box-sizing: border-box;
        width: 100%;
        height: 45px;
        cursor: pointer;
        font-size: 0.9rem;
        font-weight: 900;
        border-radius: 3px;
        color: #000;
        background-color: #f0f0f0;
        border: 1px solid #f0f0f0;
      }
      .snap-button:hover {
        color: #000;
        background-color: #fff;
      }
      .snap-button:focus {
        outline: solid 4px #b1b1b1;
      }
      .snap-button-black {
        color: #fff;
        background-color: #181818;
        border: 1px solid #181818;
      }
      .snap-footer {
        font-size: 0.9em;
        text-align: center;
        line-height: 30px;
        color: #808080;
      }
      .snap-footer a {
        color: #808080;
      }
      .snap-footer a:hover {
        color: #3a3a3a;
      }
      .snap-manual-html {
        font-size: 1em;
        width: 100%;
      }`;
    return styleELement;
}

const snap = {
    spark: function (options) {
        const {
            header = "",
            details = "",
            type = "",
            autoclose = 0,
            closeButton = true,
            defaultButton = false,
            defaultButtonText = "Ok",
            cancelButton = false,
            cancelButtonText = "Cancel",
            footer = "",
            htmlCode = "",
            width = 450,
        } = options;

        let iconSVGCode = "";

        const snapPopupBG = document.createElement("div");
        snapPopupBG.className = "snap-popup-background";

        const snapPopupBase = document.createElement("div");
        snapPopupBase.className = "snap-popup-base";
        snapPopupBase.style.width = width + "px";

        const snapPopupBaseContent = document.createElement("div");
        snapPopupBaseContent.className = "base-content-container";

        document.body.classList.add("snap-popup-stop-scroll");

        let snapPopupBaseContentHTML = ``;

        if (closeButton) {
            snapPopupBaseContentHTML = `${snapPopupBaseContentHTML}<div class="snap-popup-close" onclick="snap.close()"><div>&times;</div></div>`;
        }

        if (header != "") {
            snapPopupBaseContentHTML = `${snapPopupBaseContentHTML}<div class="snap-header snap-top-margin-3">${header}</div>`;
        }

        if (details != "") {
            snapPopupBaseContentHTML = `${snapPopupBaseContentHTML}<div class="snap-details snap-top-margin-1">${details}</div>`;
        }

        if (htmlCode != "") {
            snapPopupBaseContentHTML = `${snapPopupBaseContentHTML}<div class="snap-manual-html snap-top-margin-3">${htmlCode}</div>`;
        }

        if (defaultButton) {
            snapPopupBaseContentHTML = `${snapPopupBaseContentHTML}<button class="snap-button snap-button-black snap-top-margin-3" snap-btn-val='true'>${defaultButtonText}</button>`;
        }

        if (cancelButton) {
            snapPopupBaseContentHTML = `${snapPopupBaseContentHTML}<button class="snap-button snap-button-white snap-top-margin-1" snap-btn-val='false'>${cancelButtonText}</button>`;
        }

        if (footer != "") {
            snapPopupBaseContentHTML = `${snapPopupBaseContentHTML}<div class="snap-footer snap-top-margin-2">${footer}</div>`;
        }

        snapPopupBaseContent.innerHTML = snapPopupBaseContentHTML;

        snapPopupBG.addEventListener("click", (e) => {
            if (e.target === snapPopupBG) {
                this.close();
            }
        });

        if (autoclose > 0) {
            const animationSpeed = autoclose / 100;

            setTimeout(() => {
                this.close(snapPopupBG)
            }, autoclose);
        }

        snapPopupBase.appendChild(snapPopupBaseContent);
        snapPopupBG.appendChild(snapPopupBase);
        document.body.appendChild(snapPopupBG);

        let allBtns = snapPopupBaseContent.getElementsByTagName('button');

        return new Promise((resolve) => {
            for (let index = 0; index < allBtns.length; index++) {
                let button = allBtns[index];
                button.addEventListener('click', (event) => {
                    event.preventDefault();
                    if (button.hasAttribute("snap-btn-val")) {
                        var snapBtnVal = button.getAttribute("snap-btn-val");
                        resolve(snapBtnVal);
                    } else {
                        resolve(button.id);
                    }
                    snap.close();
                });
            }
        });
    },
    close: function (popup = null) {
        document.body.classList.remove('snap-popup-stop-scroll');
        if (popup == null) {
            let allSnaps = document.getElementsByClassName("snap-popup-background");
            allSnaps[allSnaps.length - 1].remove();
        } else {
            popup.remove();
        }
    },
};