// ---------------------- Tela de Login ----------------------

document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('login-form')) {
        document.getElementById('login-form').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            // Lista de usuários e senhas
            const users = [
                { username: 'Kaue', password: '1234' },
                { username: 'Brenda, password: '12345' },
                { username: 'Laryssa', password: '123456' },
                { username: 'Amanda', password: '1234567' },
                // Adicione mais usuários conforme necessário
            ];

            // Verifica se o usuário e a senha estão corretos
            const user = users.find(user => user.username === username && user.password === password);

            if (user) {
                localStorage.setItem('username', username);
                window.location.href = 'main.html';  // Redireciona para a tela principal
            } else {
                alert('Usuário ou senha incorretos.');
            }
        });
    }

    // ------------------- Tela Principal (Pós-Login) -------------------

    if (document.getElementById('username')) {
        const username = localStorage.getItem('username');
        document.getElementById('username').textContent = username;
    }

    // Função para sair
    if (document.querySelector('.logout-btn')) {
        document.querySelector('.logout-btn').addEventListener('click', function() {
            logout();
        });
    }

    function logout() {
        localStorage.removeItem('username');
        window.location.href = 'login.html';
    }

    // Função para ir para a lista de professores
    if (document.querySelector('.school-button')) {
        document.querySelector('.school-button button').addEventListener('click', function() {
            goToProfessors();
        });
    }

    function goToProfessors() {
        window.location.href = 'professors.html';
    }

    // ------------------- Tela de Professores -------------------

    if (document.getElementById('professor-list')) {
        const professors = JSON.parse(localStorage.getItem('professors')) || [];
        const professorList = document.getElementById('professor-list');
        
        // Limpa a lista existente
        professorList.innerHTML = '';

        professors.forEach((professor, index) => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `
                ${professor.name} - Créditos: <span id="credits-${index}">${professor.credits}</span>
                <button class="credit-button" onclick="modifyCredits(${index}, 1)">+1</button>
                <button class="credit-button" onclick="modifyCredits(${index}, -1)">-1</button>
            `;
            professorList.appendChild(listItem);
        });

        // Adiciona a funcionalidade de adicionar novo professor
        document.getElementById('add-professor-btn').addEventListener('click', addProfessor);
    }
});

// Função para modificar os créditos (deve estar no escopo global para funcionar com os botões criados dinamicamente)
function modifyCredits(index, value) {
    const professors = JSON.parse(localStorage.getItem('professors')) || [];

    // Modifica os créditos e impede que fiquem negativos
    professors[index].credits += value;

    // Impede que os créditos fiquem abaixo de 0
    if (professors[index].credits < 0) {
        professors[index].credits = 0;
    }

    localStorage.setItem('professors', JSON.stringify(professors)); // Atualiza o localStorage
    document.getElementById(`credits-${index}`).textContent = professors[index].credits;
}

// Função para adicionar novos professores
function addProfessor() {
    const name = prompt("Digite o nome do novo professor:");
    const credits = parseInt(prompt("Digite os créditos iniciais:"), 10);

    if (name && !isNaN(credits) && credits >= 0) {
        const professors = JSON.parse(localStorage.getItem('professors')) || [];
        professors.push({ name: name, credits: credits });
        localStorage.setItem('professors', JSON.stringify(professors));

        // Atualiza a lista de professores
        goToProfessors(); // Volta para a tela de professores para ver a nova lista
    } else {
        alert("Por favor, preencha todos os campos corretamente.");
    }
}

// Função para voltar à tela principal
function goBack() {
    window.location.href = 'main.html';
}