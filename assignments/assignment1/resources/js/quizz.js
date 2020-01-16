/* question.js
    Class representing a question

    Revision History:
        Gustavo Bonifacio Rodrigues, 2020.01.16: Created
*/
class Question {
    /**
     * This is the string representing the question
     */
    _question;
    /**
     * The answer, it is a boolean.
     */
    _answer;

    constructor(question, answer) {
        this._question = question;
        this._answer = answer;
        _checkRep();
    }

    _checkRep() {
        if (this._question === null || this._question) {
            // must break
            throw "Can't have an empty question!"
        }
        if (this.answer === null || this.answer === undefined) {
            // must break
            throw "Question need to have an answer!"
        }
    }

    /**
     * @returns {string}
     */
    get question() {
        return this._question;
    }
    /**
     * @returns {boolean}
     */
    get answer() {
        return this._answer;
    }
}