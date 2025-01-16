// ==UserScript==
// @name         Cinncon Tapswap Task Bot
// @namespace    https://github.com/glad-tidings/
// @version      3.3
// @description  Cinncon Tapswap Task Claim Bot
// @author       Glad Tidings
// @match        https://app.tapswap.club/*
// @icon         https://raw.githubusercontent.com/glad-tidings/TapswapTasks/refs/heads/main/icon.jpeg
// @grant        None
// @homepage     https://github.com/semthan250/CinnconTapswapTaskBot
// @require      https://code.jquery.com/jquery-3.7.1.min.js
// ==/UserScript==

(function () {
    function onready(fn) {
        if (document.readyState != "loading") fn();
        else document.addEventListener("DOMContentLoaded", fn);
    }
    onready(function () {
        const styles = {
            success: 'background: #28a745; color: #ffffff; font-weight: bold; padding: 4px 8px; border-radius: 4px;',
            starting: 'background: #8640ff; color: #ffffff; font-weight: bold; padding: 4px 8px; border-radius: 4px;',
            error: 'background: #dc3545; color: #ffffff; font-weight: bold; padding: 4px 8px; border-radius: 4px;',
            info: 'background: #007bff; color: #ffffff; font-weight: bold; padding: 4px 8px; border-radius: 4px;'
        };
        const logPrefix = '%c[TapSwapBot] ';
        const originalLog = console.log;
        console.log = function () {
            if (typeof arguments[0] === 'string' && arguments[0].includes('[TapSwapBot]')) {
                originalLog.apply(console, arguments);
            }
        };
        console.error = console.warn = console.info = console.debug = () => { };
        let listnumber = 0;
        let listcount = 0;
        var $ = window.jQuery;
        var fullurl = window.location.hash;
        var username = fullurl.split("%2522%252C%2522language_code")[0];
        username = username.split("username%2522%253A%2522")[1];
        var tapname = fullurl.split("%2522%252C%2522last_name")[0];
        tapname = tapname.split("first_name%2522%253A%2522")[1];
        var tapfamily = fullurl.split("%2522%252C%2522username")[0];
        tapfamily = tapfamily.split("last_name%2522%253A%2522")[1];
        var buttonn = document.createElement("Button");
        buttonn.style.cssText = "BACKGROUND-COLOR: red;top: 0px; right: 0px; position: absolute; z-index: 99999; padding: 3px 2px;";
        buttonn.id = "hamedap";
        buttonn.innerHTML = tapname + " ( " + username + " )";
        document.body.appendChild(buttonn);
        var backbutton = document.createElement("Button");
        backbutton.style.cssText = "display:none;BACKGROUND-COLOR: blue;bottom: 0px; right: 0px; position: absolute; z-index: 99999; padding: 3px 2px;";
        backbutton.id = "hamedss";
        backbutton.innerHTML = "Back";
        document.body.appendChild(backbutton);
        backbutton.addEventListener("click", async () => {
            try {
                Array.from(document.querySelectorAll("button")).find((el) => el.textContent.includes("Account")).click();
            } catch (err) {
                console.error(err.name, err.message);
            }
        });

    async function getAnswer(question = "") {
    let answers = [];
    let success = false;

    question = question.replace("+", "").replace("`", "");
    console.log("Question : ---" + question + "---");

    try {
        const response = await fetch(
            "https://github.com/semthan250/CinnconTapswapTaskBot/blob/main/CinnconList.json",
            { cache: "no-store" }
        );
        const rawData = await response.text();
        const bigObj = JSON.parse(rawData);

        // Görev adını bul ve cevapları al
        answers = bigObj[question] || []; // Görev yoksa boş bir dizi döner
    } catch (err) {
        console.error("Error fetching or parsing JSON: ", err.message);
    }

    // Cevapları sırayla deneme
    for (let answer of answers) {
        const input = document.evaluate(
            "/html/body/div/div[1]/div[2]/div[3]/div[2]/div/div[3]/div/div/input",
            document,
            null,
            XPathResult.FIRST_ORDERED_NODE_TYPE,
            null
        ).singleNodeValue;

        if (input) {
            input.value = answer; // JSON'dan alınan cevap
            const inputEvent = new Event("input", { bubbles: true });
            input.dispatchEvent(inputEvent);

            const submitButton = Array.from(document.querySelectorAll("button")).find(
                (el) => el.textContent.includes("Submit")
            );
            if (submitButton) {
                submitButton.click();
                await new Promise((resolve) => setTimeout(resolve, 2000)); // Cevabı kontrol için bekleme

                const errorText = Array.from(document.querySelectorAll("p")).find(
                    (el) => el.textContent.includes("Invalid")
                );

                if (!errorText) {
                    console.log(`Doğru cevap bulundu: ${answer}`);
                    success = true;
                    break; // Doğru cevabı bulunca döngüyü sonlandır
                }
            }
        }
    }

    if (!success) {
        console.log("Tüm cevaplar denendi, ancak geçerli cevap bulunamadı.");
        backbutton.click(); // Görevi atla
    }
}

        setInterval(function () {
            const close1 = document.querySelectorAll('img[alt="close"]')[0];
            const close2 = Array.from(document.querySelectorAll("button")).find((elem) => elem.textContent.includes("Get it!"));
            const tasks = Array.from(document.querySelectorAll("button")).find((elem) => elem.textContent.includes("Task"));
            const reloadPage = Array.from(document.querySelectorAll("button")).find((elem) => elem.textContent.includes("Reload"));
            if (close1) { close1.click(); }
            if (close2) { close2.click(); }
            if (tasks) { tasks.click(); }
            if (reloadPage) { location.reload(); }
        }, 2000);

        setInterval(function () {
            const gomission = Array.from(document.querySelectorAll("button")).find((elem) => elem.textContent.includes("Go"));
            const submitt = Array.from(document.querySelectorAll("button")).find((elem) => elem.textContent.includes("Submit"));
            const watchclick = Array.from(document.querySelectorAll("button")).find((elem) => elem.textContent.includes("Watch"));
            const finishmission = Array.from(document.querySelectorAll("button")).find((elem) => elem.textContent.includes("Finish mission"));
            const check = Array.from(document.querySelectorAll("button")).find((elem) => elem.textContent.includes("Check"));
            const claimm = Array.from(document.querySelectorAll("button")).find((elem) => elem.textContent.includes("Claim"));
            const startmission = Array.from(document.querySelectorAll("button")).find((elem) => elem.textContent.includes("Start mission"));
            const perror = Array.from(document.querySelectorAll("p")).find((elem) => elem.textContent.includes("Looks like you"));
            const tasklistcinema = Array.from(document.querySelectorAll("button")).find((elem) => elem.textContent.includes("Cinema"));
            const tasklistspecial = Array.from(document.querySelectorAll("button")).find((elem) => elem.textContent.includes("Special"));
            const tasklistleagues = Array.from(document.querySelectorAll("button")).find((elem) => elem.textContent.includes("Leagues"));
            const tasklistref = Array.from(document.querySelectorAll("button")).find((elem) => elem.textContent.includes("Ref"));
            const watchlink = document.querySelectorAll('a[class^="_link_"]').length;
            if (perror && submitt) {
                submitt.click();
                backbutton.click();
            }
            if (perror && check) {
                check.click();
                backbutton.click();
            }
            if (gomission) {
                gomission.click();
            }
            if (watchlink == 1) {
                document.querySelectorAll('a[class^="_link_"]')[0].removeAttribute("target");
                document.querySelectorAll('a[class^="_link_"]')[0].removeAttribute("href");
            }
            if (tasklistcinema && tasklistspecial && tasklistleagues && tasklistref && !startmission && !watchclick && !finishmission) {
                const listcount = document.querySelectorAll('button[class^="_listItem_"]').length;

                if (listcount == listnumber || listnumber > listcount) {
                    listnumber = 0;
                    if (listcount != 0) {
                        const acc = listnumber + 1;
                        console.log(`${logPrefix}Action : ` + acc + `/` + listcount, styles.info);
                    }
                } else {
                    if (listcount != 0) {
                        const acc = listnumber + 1;
                        console.log(`${logPrefix}Action : ` + acc + `/` + listcount, styles.info);
                    }
                }
                const list1 = document.querySelectorAll('button[class^="_listItem_"]')[listnumber];
                if (list1) {
                    list1.click();
                    listnumber++;
                }
            }
            if (startmission) {
                startmission.click();
            }
            if (watchclick && finishmission && !check && !submitt) {
                watchclick.click();
            }
            if (watchclick && finishmission && !check && submitt && !perror) {
                const firstitem = document.querySelectorAll("h3")[0].innerText;
                getanswer(firstitem);
            }
            if (check) {
                check.click();
            }
            if (finishmission) {
                finishmission.click();
            }
            if (claimm) {
                claimm.click();
                setTimeout(function () {
                    backbutton.click();
                }, 2000);
            }
        }, 1000);
    });
})();