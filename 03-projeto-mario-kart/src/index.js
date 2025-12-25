console.log("Vamos começar o jogo agora");

//criando o objeto 1º player
const player1 = {
    nome: "Ayrton",
    vel: 3,
    manobra: 5,
    poder: 4
};

const player2 = {
    nome: "Amanda",
    vel: 2,
    manobra: 4,
    poder: 5
};
// sorteia o dado
async function sortearDado() {
    return Math.floor(Math.random() * 6) + 1;
}

//soteia a pista
async function sortearPista() {
    let pista = Math.floor(Math.random() * 3) + 1;
    let result = ""
    switch (pista) {
        case 1:
            result = "RETA"
            break;
        case 2:
            result = "CURVA"
            break;
        default:
            result = "LUTA"
            break;
    }
    return result
}
let resultadoFinalP1 = 0
let resultadoFinalP2 = 0
async function declararVencedorRodada(totalPoder1, totalPoder2, pista) {


    if (totalPoder1 > totalPoder2) {
        resultadoFinalP1++
        if (resultadoFinalP2 > 0 && pista == "LUTA") { resultadoFinalP2-- }
        console.log(`Quem ganhou essa foi ${player1.nome}`)
    } else if (totalPoder2 > totalPoder1) {
        resultadoFinalP2++
        if (resultadoFinalP1 > 0 && pista == "LUTA") { resultadoFinalP1-- }
        console.log(`Quem ganhou essa foi ${player2.nome}`)
    } else { console.log("Essa deu empate") }


}


async function logJogo(jogador, dado, total, habilidade, val_hab) {
    console.log(`Player: ${jogador}`)
    console.log(`Jogou o dado caiu no ${dado}`)
    console.log(`Sua  ${habilidade} é de ${val_hab}`)
    console.log(`Total da habilidade é  ${total}`)
    console.log("________________________________")

}

async function controleCorrida(p1, p2) {


    for (let rodada = 1; rodada <= 5; rodada++) {

        let pista = await sortearPista()
        console.log(`----- Rodada ${rodada} na pista ${pista} -----`);

        let joga_dado_p1 = await sortearDado()
        let joga_dado_p2 = await sortearDado()

        let totalVelocidade1 = 0;
        let totalVelocidade2 = 0;

        let totalManobra1 = 0;
        let totalManobra2 = 0;

        let totalPoder1 = 0;
        let totalPoder2 = 0;

        if (pista == "RETA") {
            totalVelocidade1 = player1.vel + joga_dado_p1
            totalVelocidade2 = player2.vel + joga_dado_p2
            await logJogo(player1.nome, joga_dado_p1, totalVelocidade1, "velocidade", player1.vel)
            await logJogo(player2.nome, joga_dado_p2, totalVelocidade2, "velocidade", player2.vel)

            await declararVencedorRodada(totalVelocidade1, totalVelocidade2, pista);

        }
        if (pista == "CURVA") {
            totalManobra1 = player1.manobra + joga_dado_p1
            totalManobra2 = player2.manobra + joga_dado_p2
            await logJogo(player1.nome, joga_dado_p1, totalManobra1, "manobra", player1.manobra)
            await logJogo(player2.nome, joga_dado_p2, totalManobra2, "manobra", player2.manobra)

            await declararVencedorRodada(totalManobra1, totalManobra2, pista);
        }
        if (pista == "LUTA") {
            totalPoder1 = player1.poder + joga_dado_p1
            totalPoder2 = player2.poder + joga_dado_p2
            await logJogo(player1.nome, joga_dado_p1, totalPoder1, "luta", player1.poder)
            await logJogo(player2.nome, joga_dado_p2, totalPoder2, "luta", player2.poder)
            await declararVencedorRodada(totalPoder1, totalPoder2, pista);

        }
        console.log(`PLACAR ---- ${player1.nome} ${resultadoFinalP1} X ${resultadoFinalP2} ${player2.nome}------------`)
        console.log("#######################################");
    }

    if (resultadoFinalP1 > resultadoFinalP2) {
        console.log(`O vencedor geral das 5 rodadas foi ${player1.nome}`)
    } else if (resultadoFinalP2 > resultadoFinalP1) {
        console.log(`O vencedor geral das 5 rodadas foi ${player2.nome}`)
    }
    else { console.log("O jogo terminou empatado") }
}

(async function main() {


    console.log("#######################################");
    console.log(`A partida será de ${player1.nome} contra ${player2.nome}`);
    console.log("#######################################");

    //console.log(`A pista será de ${await sortearPista()}`)
    await controleCorrida(player1, player2)
}
)()
