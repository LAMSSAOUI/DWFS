
document.addEventListener('DOMContentLoaded', function () {
    const type = {
        vf: "vf",
        qcu: 'qcu',
        qcm: "qcm",
        qroc: "qroc",
        qopr: "qopr",
    }

    class Question {
        constructor(numero, type, enonce, reponse, duree) {
            this.numero = numero;
            this.type = type;
            this.enonce = enonce;
            this.reponse = reponse;
            this.duree = duree;
            this.condidatReponse = null;
        }

        _set_reponseCondidat(reponse) {
            this.condidatReponse = reponse;
        }

        _generateHTML() {
            switch (this.type) {
                case type.vf:
                    var htmlContent = `<div>`;
                    htmlContent += `<p>${this.enonce}</p>`;
                    for (const response of this.reponse) {
                        htmlContent += `<input type="radio" name="qcu-response-${this.numero}" value="${response}">${response}<br>`;
                    }
                    htmlContent += `</div>`;
                    return htmlContent;

                case type.qcu:
                    var htmlContent = `<div>`;
                    htmlContent += `<p>${this.enonce}</p>`;
                    for (const response of this.reponse) {
                        htmlContent += `<input type="radio" name="qcuu-response-${this.numero}" value="${response}" >${response}<br>`;
                    }
                    htmlContent += `</div>`;
                    return htmlContent;

                case type.qcm:
                    var htmlContent = `<div>`;
                    htmlContent += `<p>${this.enonce}</p>`;
                    for (const response of this.reponse) {
                        htmlContent += `<input type="checkbox" name="qcm-response-${this.numero}[]" value="${response}">${response}<br>`;
                    }
                    htmlContent += `</div>`;
                    return htmlContent;

                case type.qroc:
                    var htmlContent = `<div>`;
                    htmlContent += `<p>${this.enonce}</p>`;
                    htmlContent += `<textarea name="qroc-response-${this.numero}" placeholder="Donner la reponse"></textarea>`;
                    htmlContent += `</div>`;
                    return htmlContent;

                case type.qopr:
                    var htmlContent = `<div>`;
                    htmlContent += `<p>${this.enonce}</p>`;
                    htmlContent += `<textarea name="qopr-response-${this.numero}" placeholder="Donner la reponse"></textarea>`;
                    htmlContent += `</div>`;
                    return htmlContent;
            }
        }
    }

            const questions = [
                new Question(1, type.vf, 'L\'informatique désigne l\'étude et l\'utilisation des systèmes de traitement de l\'information.', ['vrai' , 'faux'] , 12),
                new Question(2, type.qcu, 'Qu\'est-ce que le fullstack dans le développement web?', ['a) Une pile de vaisselle', 'b) Un ensemble complet d\'outils pour le développement', 'c) Une méthode de cuisson des aliments', 'd) Un type de langage de programmation'], 12),
                new Question(3, type.qcm, 'Parmi les options suivantes, quelles sont des caractéristiques du langage de programmation JavaScript?', ['a) Typé statiquement', 'b) Utilisé côté serveur', 'c) Interprété', 'd) Orienté objet'], 12),
                new Question(4, type.qroc, 'Expliquez comment ajouter un élément à une liste en utilisant le langage de programmation de votre choix.', 'Réponse ouverte', 12),
                new Question(5, type.qopr, 'Donnez des indications pour atteindre Casablanca à partir de votre emplacement actuel, en spécifiant le mode de transport que vous recommandez.', 'Réponse ouverte', 12)
            ];
            var container = document.getElementById('container');
            let htmlContent = '';

            questions.forEach(question => {
                htmlContent += question._generateHTML();
            });
            console.log(htmlContent);
            container.innerHTML = htmlContent;


            var questionIndex = 0;
            var stop;


            const StopButton = document.getElementById('StopBtn');
            StopButton.addEventListener('click', function () {
                stop=true;

            })
   
        function displayQuestion() {

                container.innerHTML = questions[questionIndex]._generateHTML();
                const tempsRestantDiv = document.getElementById('TempsRestant');
                let timeRemaining = questions[questionIndex].duree;

                const Envoyer = document.getElementById('SendBtn');
                Envoyer.addEventListener('click', function () {
                    console.log('envoyer clicked'); 
                    saveQuestion(questionIndex)
                    
                })

                function triggerReminder(message) {
                        const alertContainer = document.getElementById('timeTrigger')
                    
                        alertContainer.textContent = message;
                        alertContainer.style.display='block';
                    
                    
                        // Hide the alert after 2 seconds
                        setTimeout(() => {
                            alertContainer.style.display='none';
                        }, 2000);
                }

                function updateTempsRestant() {
                    const minutes = Math.floor(timeRemaining / 60);
                    const seconds = timeRemaining % 60;
                    tempsRestantDiv.textContent = ` ${seconds} `;
                    if (timeRemaining === 5) {
                        triggerReminder(" vous reste seulement 5 s ");
                    }
                }


                function startTimer() {
                    updateTempsRestant();
                    const timerInterval = setInterval(function () {
                        if(!stop){
                            timeRemaining--;
                            updateTempsRestant();
                            if (timeRemaining <= 0) {
                                clearInterval(timerInterval);
                                
                                questionIndex++;
                                // Check if there are more questions
                                if (questionIndex < questions.length) {
                                    displayQuestion();
                                } else {
                                    // All questions have been displayed
                                    stop=true;
                                    container.innerHTML = "<p>Quiz finished!</p>";
                                    
                                }
                            }
                        }
                                                    
                    }, 1000);
                }
                startTimer();  
        }
 

        const startButton = document.getElementById('startButton');
        console.log(startButton); 
        startButton.addEventListener('click', function () {
                        console.log('clicked start');
                        document.getElementById('wrapper').style.display = 'block';
                        document.getElementById('startButton').style.display = 'none';
                        displayQuestion()

        });
   
        function saveQuestion(index) {
            const currentQuestion = questions[index];
            let selectedResponses;
            switch (currentQuestion.type) {
                case type.vf:
                    selectedResponses = document.querySelector(`input[name="qcu-response-${currentQuestion.numero}"]:checked`);
                    currentQuestion._set_reponseCondidat(selectedResponses.value)
                    console.log('la response est :',questions)
                     break;
                case type.qcu:
                    selectedResponses = document.querySelector(`input[name="qcuu-response-${currentQuestion.numero}"]:checked`);
                    currentQuestion._set_reponseCondidat(selectedResponses.value)
                    console.log('la response est :',questions)
                    break;
                case type.qcm:
                    selectedResponses = document.querySelectorAll(`input[name="qcm-response-${currentQuestion.numero}[]"]:checked`);
                    const selectedValues = Array.from(selectedResponses).map(checkbox => checkbox.value);
                    currentQuestion._set_reponseCondidat(selectedValues);
                    console.log('la response est :',questions)
                    break;
                case type.qroc:
                    // selectedResponses = document.querySelector(`input[name="qcm-response-${currentQuestion.numero}"]:checked`);
                    selectedResponses = document.querySelector(`textarea[name="qroc-response-${currentQuestion.numero}"]`);
                    currentQuestion._set_reponseCondidat(selectedResponses.value)
                    console.log('la response est :',questions)
                    break;
                case type.qopr:
                    selectedResponses = document.querySelector(`textarea[name="qopr-response-${currentQuestion.numero}"]`);
                    currentQuestion._set_reponseCondidat(selectedResponses.value)
                    console.log('la response est :',questions)
                    break;
            }
        }
});

document.addEventListener('DOMContentLoaded', function() {
    const stopButton = document.getElementById('StopBtn');

    stopButton.addEventListener('click', function () {
        document.getElementById('wrapper').style.display = 'none';
        var container = document.getElementById('Content');
        container.innerHTML = "<p>Quiz finished!</p>";  
    });
});




