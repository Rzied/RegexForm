//Contient tous les champs à vérifier  identifiés par la class "checkValidity"
inputs = document.getElementsByClassName("checkValidity");

//Récupération du submit, du mot de passe et de la confirmation
var submit = document.getElementById("submit");
var mdp = document.getElementById("mdp");
var confirmation = document.getElementById("confirmation");


//Ajoute la vérification de validité au changement de chaque champ
for (let i = 0; i < inputs.length; i++) {
    inputs[i].addEventListener("input", function (event) {
        updateValidity(event.target);
    });
}
// affichage de l'aide à la saisie du mot de passe 
// c'est la 2eme fois que l'on pose un listener sur input de mot de passe, les 2 fonctions vont s'executer l'une derrière l'autre 
mdp.addEventListener("input", function (event) {
    let aideMdp = document.getElementsByClassName("aideMdp")[0];
    aideMdp.style.display = "flex";
    let lesImages = aideMdp.getElementsByTagName("i");
    let lesCheck = ["([a-zA-Z0-9!@#\$%\^&\*+]{8,})", "(?=.*[A-Z])", "(?=.*[a-z])", "(?=.*[0-9])", "(?=.*[!@#\$%\^&\*+])"];
    for (let i = 0; i < lesCheck.length; i++) {
        if (RegExp(lesCheck[i]).test(mdp.value)) {
            //la condition est vérifiée, on met la coche verte correspondente
            lesImages[i].classList = "far fa-check-circle vert";
        } else {
            lesImages[i].classList = "far fa-times-circle rouge";
        }
    }
})
//suppression de l'aide mot de passe quand on quitte le champ
mdp.addEventListener("blur", function (event) {
    document.getElementsByClassName("aideMdp")[0].style.display = "none";
})
//gestion particulière de la confirmation de mot de passe
confirmation.addEventListener("input", function (event) {
    if (confirmation.value == mdp.value) {
        impactValidity(confirmation, true);
    } else {
        impactValidity(confirmation, false);
    }
})
//empecher le copier dans la zone mdp et confirm
mdp.addEventListener("contextmenu", annule);
confirmation.addEventListener("contextmenu", annule);
//empecher le coller dans la confirmation
confirmation.addEventListener("paste", annule);

//gestion de l'oeil dans le mot de passe
var oeil = document.getElementsByClassName("oeil")[0];
// on affiche un petit oeil qui permet de voir de mot de passe 
oeil.addEventListener("mousedown", function () {
    affichePassWord(true);
});
oeil.addEventListener("mouseup", function () {
    affichePassWord(false);
});

/**
 * Gestion des infobulles
 * On récupère l'information dans le title de l'input et on l'affiche au dessus de l'interface
 */
infobulles = document.getElementsByClassName("infobulle");
for (let i = 0; i < infobulles.length; i++) {
    infobulles[i].addEventListener("mouseover", function (e) {
        var parent = e.target.parentNode.parentNode;
        var texte = (parent.getElementsByTagName("input")[0]).title;
        var texteInfoBulle = parent.getElementsByClassName("texteInfoBulle")[0];
        texteInfoBulle.textContent = texte;
        texteInfoBulle.style.display = "flex";
    });
    infobulles[i].addEventListener("mouseout", function (e) {
        (e.target.parentNode.getElementsByClassName("texteInfoBulle")[0]).style.display = "none";
    });
}


/**
 * Vérifie la validité de la saisie dans un input et change le style en conséquence
 * @param {élément de type input} input 
 */
function updateValidity(input) {
    isValid = validateInput(input);
    impactValidity(input, isValid);
    checkAllValidity();
}


/**
 * Vérifie la validité de la saisie dans un input
 * Renvoi vrai si la saisie est valide, faux si elle n'est pas valide, 0 si le champ n'est pas rempli
 * @param {élément de type input} input 
 */
function validateInput(input) {
    isValid = input.checkValidity();
    if (!isValid && input.value == "" && input.required) {
        isValid = 0;
    }
    return isValid;
}

/**
 * Affiche le message d'erreur, change les couleurs et affiche les coches
 * @param {élément de type input} input 
 * @param {*} isValid 
 */
function impactValidity(input, isValid) {

    var message = input.parentNode.getElementsByClassName("message")[0];
    message.classList.add("visible");
    image = input.parentNode.getElementsByTagName("i")[1];

    switch (isValid) {
        case true:
            message.innerHTML = "Champ valide.";
            input.style.borderBottomColor = "rgb(50,200,50)";
            image.classList = "far fa-check-circle fa-2x vert";
            image.style.display = "block";
            break;
        case 0:
            message.innerHTML = "Champ requis!";
            image.style.display = "none";
            break;
        case false:
            message.innerHTML = "Format invalide!";
            input.style.borderBottomColor = "rgb(200,50,50)";
            image.classList = "far fa-times-circle fa-2x rouge";
            image.style.display = "block";
            break;
        default:
            break;
    }
}

/**
 * Activation du bouton de formulaire
 * Vérification de tous les champs
 */
function checkAllValidity() {
    var pasErreur = true;
    i = 0;
    // on vérifie les inputs un à un
    while (pasErreur && i < inputs.length) {
        pasErreur = validateInput(inputs[i])
        i++;
    }
    if (pasErreur) {
        submit.disabled = false;
        submit.style.color = "white";
        submit.style.borderBottom = "4px solid white";
    } else {
        submit.disabled = true;
        submit.style.color = "#666666";
        submit.style.borderBottom = "4px solid #666666";
    }
}
/**
 * Change le type de l'input mot de passe
 * @param {boolean} flag 
 */
function affichePassWord(flag) {
    if (flag) mdp.type = "text";
    else mdp.type = "password";
}
/**
 * Annule l'action associé à la touche ou au clic
 * @param {*} event 
 */
function annule(event) {
    event.preventDefault(); //annule la fonction standard associée à la frappe ou au clic
    return false;
}