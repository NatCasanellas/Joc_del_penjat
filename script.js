document.addEventListener('DOMContentLoaded', () => {
    const formParaula = document.getElementById('formParaula');
    const inputParaula = document.getElementById('inputParaula');
    const togglePassword = document.getElementById('togglePassword');
    const btnComencarPartida = document.getElementById('comencarPartida');
    const paraulaSecretaElem = document.getElementById('paraulaSecreta');
    const missatgesElem = document.getElementById('misstges');
    const keyboardButtons = document.querySelectorAll('.keyboard button');

    const puntsActualsElem = document.getElementById('puntsActuals');
    const totalPartidesElem = document.getElementById('totalPartides');
    const partidesGuanyadesElem = document.getElementById('partidesGuanyades');
    const millorPartidaElem = document.getElementById('millorPartida');

    let paraulaSecreta = '';
    let lletresEncertades = [];
    let puntsActuals = 0;
    let totalPartides = 0;
    let partidesGuanyades = 0;
    let millorPartida = { data: '', punts: 0 };
    let intentsFallits = 0;
    const maxIntents = 10;

    // Funció per mostrar/amagar la contrasenya
    togglePassword.addEventListener('click', () => {
        if (inputParaula.type === 'password') {
            inputParaula.type = 'text';
        } else {
            inputParaula.type = 'password';
        }
    });

    // Funció per validar i començar la partida
    btnComencarPartida.addEventListener('click', () => {
        const paraula = inputParaula.value.trim().toUpperCase();

        // Validacions
        if (!paraula) {
            alert('Has d’afegir una paraula per poder començar a jugar.');
            return;
        }

        if (/\d/.test(paraula)) {
            alert('La paraula no pot contenir números.');
            return;
        }

        if (paraula.length <= 3) {
            alert('La paraula ha de contenir més de 3 caràcters.');
            return;
        }

        // Deshabilitar l'input i el botó
        inputParaula.disabled = true;
        btnComencarPartida.disabled = true;

        // Inicialitzar la partida
        paraulaSecreta = paraula;
        lletresEncertades = Array(paraula.length).fill('_');
        paraulaSecretaElem.textContent = lletresEncertades.join(' ');
        missatgesElem.textContent = '';
        puntsActuals = 0;
        intentsFallits = 0;

        // Habilitar botons de les lletres
        keyboardButtons.forEach((button) => {
            button.disabled = false;
            button.style.color = 'black';
            button.style.border = '1px solid black';
        });

        puntsActualsElem.textContent = puntsActuals;
    });

    // Funció per gestionar la selecció de lletres
    window.jugarLletra = function (lletra) {
        const letterButton = document.getElementById(`boto_${lletra}`);
        letterButton.disabled = true;
        letterButton.style.color = 'red';
        letterButton.style.border = '1px solid red';

        const encerts = [];
        for (let i = 0; i < paraulaSecreta.length; i++) {
            if (paraulaSecreta[i] === lletra) {
                encerts.push(i);
                lletresEncertades[i] = lletra;
            }
        }

        if (encerts.length > 0) {
            paraulaSecretaElem.textContent = lletresEncertades.join(' ');

            // Sumar punts: 1 punt per lletra encertada, més punts addicionals si és un encert consecutiu
            puntsActuals += encerts.length * (encerts.length + 1) / 2;
            puntsActualsElem.textContent = puntsActuals;
        } else {
            intentsFallits++;
            puntsActuals = Math.max(0, puntsActuals - 1);
            puntsActualsElem.textContent = puntsActuals;
            updateDibuixPenjat();
        }

        checkEndGame();
    };

    // Funció per comprovar si el joc ha acabat
    function checkEndGame() {
        if (!lletresEncertades.includes('_')) {
            missatgesElem.textContent = 'Has guanyat!';
            document.body.style.backgroundColor = '#2ecc71';
            partidesGuanyades++;
            totalPartides++;
            partidesGuanyadesElem.textContent = partidesGuanyades;
            totalPartidesElem.textContent = totalPartides;

            // Actualitzar millor partida
            if (puntsActuals > millorPartida.punts) {
                millorPartida = {
                    data: new Date().toLocaleString(),
                    punts: puntsActuals
                };
                millorPartidaElem.textContent = `${millorPartida.data} - ${millorPartida.punts} punts`;
            }

            resetGame();
        } else if (intentsFallits >= maxIntents) {
            missatgesElem.textContent = `Has perdut! La paraula era: ${paraulaSecreta}`;
            document.body.style.backgroundColor = '#e74c3c';
            totalPartides++;
            totalPartidesElem.textContent = totalPartides;
            resetGame();
        }
    }

    // Funció per reiniciar el joc
    function resetGame() {
        inputParaula.disabled = false;
        btnComencarPartida.disabled = false;
        inputParaula.value = '';
        setTimeout(() => {
            document.body.style.backgroundColor = '#f0f4f8';
        }, 2000);
    }

    // Funció per actualitzar el dibuix del penjat segons el nombre d'intents fallits
    function updateDibuixPenjat() {
       
        const penjatImg = document.getElementById('penjat');
        if (penjatImg) {
            penjatImg.src = `imatges/penjat${intentsFallits}.jpg`;
        }
    }
});
