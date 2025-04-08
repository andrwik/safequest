document.addEventListener("DOMContentLoaded", function() {
    const membros = document.querySelectorAll(".membro");

    function mostrarMembros() {
        membros.forEach((membro, index) => {
            setTimeout(() => {
                membro.classList.add("show");
            }, index * 300); // Intervalo de 300ms entre cada membro
        });
    }

    mostrarMembros();
});
