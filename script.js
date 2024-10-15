//funcio paraula amagada
function togglePassword() {
    const passwordField = document.getElementById('password');
    const icon = document.querySelector('.icon i');
    if (passwordField.type === 'password') {
        passwordField.type = 'text';
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
    } else {
        passwordField.type = 'password';
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
    }
}
//funcio començar partida amb alert
function startGame() {
    const passwordField = document.getElementById('password');
    alert("La partida ha començat amb la paraula: " + passwordField.value)
}
