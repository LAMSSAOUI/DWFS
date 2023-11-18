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
                        htmlContent += `<input type="radio" name="qcu-response" value="${response}">${response}<br>`;
                    }
                    htmlContent += `</div>`;
                    return htmlContent;

                case type.qcu:
                    var htmlContent = `<div>`;
                    htmlContent += `<p>${this.enonce}</p>`;
                    for (const response of this.reponse) {
                        htmlContent += `<input type="radio" name="qcu-response" value="${response}">${response}<br>`;
                    }
                    htmlContent += `</div>`;
                    return htmlContent;

                case type.qcm:
                    var htmlContent = `<div>`;
                    htmlContent += `<p>${this.enonce}</p>`;
                    for (const response of this.reponse) {
                        htmlContent += `<input type="checkbox" name="qcm-response" value="${response}">${response}<br>`;
                    }
                    htmlContent += `</div>`;
                    return htmlContent;

                case type.qroc:
                    var htmlContent = `<div>`;
                    htmlContent += `<p>${this.enonce}</p>`;
                    htmlContent += `<textarea placeholder="Donner la reponse"></textarea>`;
                    htmlContent += `</div>`;
                    return htmlContent;

                case type.qopr:
                    var htmlContent = `<div>`;
                    htmlContent += `<p>${this.enonce}</p>`;
                    htmlContent += `<textarea placeholder="Donner la reponse"></textarea>`;
                    htmlContent += `</div>`;
                    return htmlContent;
            }
        }
    }

    const questions = [
        new Question(1, type.vf, 'L\'informatique désigne l\'étude et l\'utilisation des systèmes de traitement de l\'information.', ['vrai' , 'faux'], 12),
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
});
