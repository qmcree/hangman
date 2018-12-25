(function () {
    var Hangman = {
        WORDS: ['Bruce Springsteen', 'Liza Minnelli', 'Michael Jackson', 'Madonna', 'Eric Clapton'],

        word: '',
        lettersGuessed: [],
        guessCount: 0,

        /**
         * @returns {string}
         */
        getRandomWord: function () {
            var randomIndex = Math.floor(Math.random() * this.WORDS.length);

            return this.WORDS[randomIndex];
        },

        /**
         * @returns {string}
         */
        makeProgress: function () {
            var wordArray = this.word.split('');
            var progress = '';

            // Replace the unguessed letters with underscores.
            wordArray.forEach(function (letter) {
                // Guessed letters are normalized to uppercase.
                var hasGuessedLetter = this.lettersGuessed.indexOf(letter.toUpperCase()) > -1;
                var isSpace = letter === ' ';

                progress += hasGuessedLetter || isSpace
                    ? letter
                    : '_';
            }.bind(this));

            return progress;
        },

        ui: {
            /**
             * @param {string} progress
             */
            setProgress: function (progress) {
                document.getElementById('guess-progress').innerText = progress;
            },

            /**
             * @param {Array} letters
             */
            setLettersGuessed: function (letters) {
                document.getElementById('guessed-letters').innerText = letters.join('');
            },

            /**
             * @param {number} count
             */
            setGuessCount: function (count) {
                document.getElementById('guess-count').innerText = count.toString();
            },
        },

        /**
         * @param {string} letter
         * @private
         */
        _guessLetter: function (letter) {
            // Normalize to uppercase.
            letter = letter.toUpperCase();

            // Ignore if this letter has already been guessed.
            if (this.lettersGuessed.indexOf(letter) > -1) {
                return;
            }

            this.guessCount += 1;
            this.ui.setGuessCount(this.guessCount);

            this.lettersGuessed.push(letter);
            this.ui.setLettersGuessed(this.lettersGuessed);

            var progress = this.makeProgress();
            this.ui.setProgress(progress);
        },

        /**
         * @param {KeyboardEvent} event
         */
        handleKeyUp: function (event) {
            var isLetter = event.key.match(/[A-Za-z]/g) !== null;

            // We only care about letter keys pressed.
            if (!isLetter || event.key.length > 1) {
                return;
            }

            this._guessLetter(event.key);
        },

        init: function () {
            this.word = this.getRandomWord();
            var progress = this.makeProgress();

            this.ui.setProgress(progress);
            this.ui.setLettersGuessed(this.lettersGuessed);
            this.ui.setGuessCount(this.guessCount);

            document.addEventListener('keyup', this.handleKeyUp.bind(this));
        }
    };

    document.addEventListener('DOMContentLoaded', function () {
        Hangman.init();
    });
}());