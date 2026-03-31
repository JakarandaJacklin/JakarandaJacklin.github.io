const qbut = document.querySelector("#js-new-quote");
const abut = document.querySelector("#js-tweet");

qbut.addEventListener("click", getQuote);
abut.addEventListener("click", showAnswer)


const end = "https://trivia.cyberwisp.com/getrandomchristmasquestion";
let result = null


async function getQuote(event) {
    // console.log("Pop!")
    try {
        let res = await fetch(end)
        if (!res.ok) {
            throw new Error(`Response status: ${res.status}`);
        }

    const json = await res.json();
    document.querySelector("#js-answer-text").textContent = ""
    displayQuote(json);
    result = json

   
    } catch (error) {
        console.log(error);
        alert(error);
    }

}

function showAnswer(event){
    //console.log("POP")
    if (result != null) {
        document.querySelector("#js-answer-text").textContent = result["answer"]
    }
}

function displayQuote(jso){
    document.querySelector("#js-quote-text").textContent = jso["question"]
}


getQuote();