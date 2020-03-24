export default class {
    _apiBase = "https://engine.lifeis.porn/api/millionaire.php?";
    _proxy = "https://cors-anywhere.herokuapp.com/";

    getResource = async(url) => {
        const res = await fetch(`${this._proxy}${this._apiBase}${url}`);
        if (!res.ok) {
            throw new Error(`Could not fetch ${url}` +
                `, received ${res.status}`)
        }
        return await res.json();
    };

    getQuestion = async(lvl) => {
        const question = await this.getResource(`q=${lvl}`);
        return {
            question: question.data.question,
            answers: [...question.data.answers]
        };
    };
}