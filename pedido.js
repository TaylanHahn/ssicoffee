const cardapio = {
  ">>> CAFÉS": "",
  "Cappuccino - R$ 7,50": 7.5,
  "Latte Macchiatto - R$ 12,50": 12.5,
  "Expresso - R$ 6,00": 6,
  "Mocha - R$ 14,00": 14,
  "Frappé - R$ 16,00": 16,
  "": "",
  ">>> DOCES & SALGADOS": "",
  "Pão de Queijo (5 un.) - R$ 5,00": 5,
  "Croissant - R$ 8,00": 8,
  "Cookies (5 un.) - R$ 4,50": 4.5,
  "Sanduíche - R$9,00": 9,
  "Torta de chocolate (fatia) - R$ 10,00": 10,
  "Torta de baunilha (fatia) - R$ 10,00": 10,
  "Torta de morango (fatia) - R$ 10,00": 10,
};

let itensAdicionados = [];

function adicionarItem() {
  const container = document.getElementById("itens-container");
  const div = document.createElement("div");
  div.classList.add("item");

  const select = document.createElement("select");
  for (const item in cardapio) {
    const option = document.createElement("option");
    option.value = item;
    option.textContent = item;
    select.appendChild(option);
  }

  const inputQtd = document.createElement("input");
  inputQtd.type = "number";
  inputQtd.min = "1";
  inputQtd.value = "1";

  const btnRemover = document.createElement("button");
  btnRemover.textContent = "Remover";
  btnRemover.type = "button";
  btnRemover.onclick = () => div.remove();

  div.appendChild(select);
  div.appendChild(inputQtd);
  div.appendChild(btnRemover);
  container.appendChild(div);
}

function mostrarResumo() {
  const itens = document.querySelectorAll("#itens-container .item");
  itensAdicionados = [];

  let total = 0;
  const lista = document.getElementById("lista-pedido");
  lista.innerHTML = "";

  itens.forEach(div => {
    const item = div.querySelector("select").value;
    const qtd = parseInt(div.querySelector("input").value);
    const preco = cardapio[item] * qtd;

    itensAdicionados.push({ item, qtd, preco });
    total += preco;

    const li = document.createElement("li");
    li.textContent = `${item} x ${qtd} = R$ ${preco.toFixed(2)}`;
    lista.appendChild(li);
  });

  document.getElementById("valor-total").textContent = `Total: R$ ${total.toFixed(2)}`;
  document.getElementById("resumo-pedido").style.display = "block";
  document.getElementById("pedido-form").style.display = "none";
  document.querySelector("h1").style.display = "none";
  document.querySelector("p").style.display = "none";
}

function editarPedido() {
  document.getElementById("resumo-pedido").style.display = "none";
  document.getElementById("pedido-form").style.display = "block";
  document.querySelector("h1").style.display = "block";
}

function mostrarEntrega() {
  document.getElementById("resumo-pedido").style.display = "none";
  document.getElementById("entrega-pagamento").style.display = "block";
}

function finalizar() {
  const formaEntrega = document.getElementById("entrega").value;
  const formaPagamento = document.getElementById("pagamento").value;

  console.log("Entrega:", formaEntrega);
  console.log("Pagamento:", formaPagamento);

  document.getElementById("entrega-pagamento").style.display = "none";
  document.getElementById("finalizado").style.display = "block";
}

document.getElementById("entrega").addEventListener("change", function () {
  const campoEndereco = document.getElementById("campo-endereco");
  if (this.value === "delivery") {
    campoEndereco.style.display = "block";
  } else {
    campoEndereco.style.display = "none";
  }
})

document.getElementById("pagamento").addEventListener("change", function () {
  const cartaoDados = document.getElementById("cartao-dados");
  const campoPagamento = document.getElementById("campo-cartao");
  if (this.value === "cartao") {
    campoPagamento.style.display = "block";
    cartaoDados.style.display = "block";
  } else {
    campoPagamento.style.display = "none";
    cartaoDados.style.display = "none";
  }
});

document.addEventListener("DOMContentLoaded", function() {
  const inputVencimento = document.getElementById("cartao-vencimento");

  inputVencimento.addEventListener("input", function(e){
    let valor = e.target.value;
    valor = valor.replace(/\D/g, ""); // remove o que não for número

    // insere a barra
    if (valor.length > 2) {
      valor = valor.substring(0, 2) + "/" + valor.substring(2, 4); 
      // Pega os 2 primeiros, adiciona a barra, e pega os próximos 2 (para o ano)
    }

    if (valor.length > 5) {
      valor = valor.substring(0, 5); // Limita o comprimento final para 5 (MM/AA)
    }

    e.target.value = valor;
  });
});





