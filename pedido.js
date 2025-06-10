// Array com os produtos e preços
const cardapio = {
  ">>> CAFÉS": "",
  "Cappuccino - R$ 7,50": 7.5,
  "Latte Macchiatto - R$ 12,50": 12.5,
  "Expresso - R$ 6,00": 6,
  "Mocha - R$ 14,00": 14,
  "Frappé - R$ 16,00": 16,
  "Separator1": "", // Use distinct keys for separators
  ">>> DOCES & SALGADOS": "",
  "Pão de Queijo (5 un.) - R$ 5,00": 5,
  "Croissant - R$ 8,00": 8,
  "Cookies (5 un.) - R$ 4,50": 4.5,
  "Sanduíche - R$9,00": 9,
  "Torta de chocolate (fatia) - R$ 10,00": 10,
  "Torta de baunilha (fatia) - R$ 10,00": 10,
  "Torta de morango (fatia) - R$ 10,00": 10,
  "Separator2": "", // Use distinct keys for separators
};

// Array que irá guardar o pedido do cliente
let itensAdicionados = [];
let totalAtual = 0; // Variável global para armazenar o total atual

// Função para adicionar um produto ao pedido
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

  // Para escolher a quantidade
  const inputQtd = document.createElement("input");
  inputQtd.type = "number";
  inputQtd.min = "1";
  inputQtd.value = "1";

  // Para remover algum item do pedido
  const btnRemover = document.createElement("button");
  btnRemover.textContent = "Remover";
  btnRemover.type = "button";
  btnRemover.onclick = () => div.remove();

  div.appendChild(select);
  div.appendChild(inputQtd);
  div.appendChild(btnRemover);
  container.appendChild(div);
}

// Mostra o pedido completo do cliente
function mostrarResumo() {
  const itens = document.querySelectorAll("#itens-container .item");
  itensAdicionados = [];

  let total = 0;
  const lista = document.getElementById("lista-pedido");
  lista.innerHTML = "";

  let validItemsCount = 0;

  itens.forEach(div => {
    const itemText = div.querySelector("select").value; // Get the full text, e.g., "Cappuccino - R$ 7,50"
    const qtd = parseInt(div.querySelector("input").value);

    const itemPrice = cardapio[itemText]; // Look up price using the full text

    // Validate that the item selected is a valid product with a price (number)
    if (typeof itemPrice === 'number' && !isNaN(itemPrice) && itemPrice > 0) {
      const preco = itemPrice * qtd;
      itensAdicionados.push({ item: itemText, qtd, preco });
      total += preco;

      const li = document.createElement("li");
      li.textContent = `${itemText} x ${qtd} unidade(s)`;
      lista.appendChild(li);
      validItemsCount++;
    }
  });

  if (validItemsCount === 0) {
    alert("Por favor, adicione itens válidos ao seu pedido antes de continuar.");
    return;
  }

  totalAtual = total; // Atualiza o total global
  document.getElementById("valor-total").textContent = `Total: R$ ${totalAtual.toFixed(2)}`;
  document.getElementById("resumo-pedido").style.display = "block";
  document.getElementById("pedido-form").style.display = "none";
  document.querySelector("h1").style.display = "none";
  document.querySelector("p").style.display = "none";
}

// Função para editar o pedido. O cliente pode voltar a tela de pedido e assim, usar a função para remover os produtos do pedido.
function editarPedido() {
  document.getElementById("resumo-pedido").style.display = "none";
  document.getElementById("entrega-pagamento").style.display = "none"; // Hide delivery/payment section
  document.getElementById("pedido-form").style.display = "block";
  document.querySelector("h1").style.display = "block";
  document.querySelector("p").style.display = "block"; // Torna o parágrafo visível novamente
}

function mostrarEntrega() {
  document.getElementById("resumo-pedido").style.display = "none";
  document.getElementById("entrega-pagamento").style.display = "block";
  document.getElementById("total-final").textContent = `TOTAL: R$ ${totalAtual.toFixed(2)}`;
}

function finalizar() {
  const formaEntrega = document.getElementById("entrega").value;
  const formaPagamento = document.getElementById("pagamento").value;
  let isValid = true;

  // Validate delivery address if delivery is selected
  if (formaEntrega === "delivery") {
    const endereco = document.getElementById("endereco").value.trim();
    if (endereco === "") {
      alert("Por favor, informe seu endereço completo para delivery.");
      isValid = false;
    }
  }

  // Validate credit card details if card payment is selected
  if (formaPagamento === "cartao" && isValid) {
    const cartaoNome = document.getElementById("cartao-nome").value.trim();
    const cartaoNumero = document.getElementById("cartao-numero").value.trim();
    const cartaoCvv = document.getElementById("cartao-cvv").value.trim();
    const cartaoVencimento = document.getElementById("cartao-vencimento").value.trim();
    const tipoCartao = document.querySelector("#campo-cartao select").value;


    if (tipoCartao === "selecione") {
        alert("Por favor, selecione o tipo de pagamento em cartão.");
        isValid = false;
    } else if (cartaoNome === "" || cartaoNumero === "" || cartaoCvv === "" || cartaoVencimento === "") {
      alert("Por favor, preencha todos os dados do cartão.");
      isValid = false;
    } else if (cartaoNumero.length < 16) { // Basic check for card number length
        alert("O número do cartão deve ter 16 dígitos.");
        isValid = false;
    } else if (cartaoCvv.length < 3 || cartaoCvv.length > 4) { // Basic check for CVV length
        alert("O CVV deve ter 3 ou 4 dígitos.");
        isValid = false;
    } else if (!/^(0[1-9]|1[0-2])\/?([0-9]{2})$/.test(cartaoVencimento)) { // MM/YY format
        alert("Formato de data de validade inválido. Use MM/AA.");
        isValid = false;
    }
  }

  if (isValid) {
    console.log("Entrega:", formaEntrega);
    console.log("Pagamento:", formaPagamento);

    document.getElementById("entrega-pagamento").style.display = "none";
    document.getElementById("finalizado").style.display = "block";
  }
}

document.getElementById("entrega").addEventListener("change", function () {
  const campoEndereco = document.getElementById("campo-endereco");
  if (this.value === "delivery") {
    campoEndereco.style.display = "block";
    // Add delivery fee to total if not already included
    if (totalAtual > 0 && !itensAdicionados.some(item => item.item === "Taxa de Entrega")) {
      totalAtual += 5.00; // Add R$ 5,00 delivery fee
      document.getElementById("total-final").textContent = `TOTAL: R$ ${totalAtual.toFixed(2)}`;
      itensAdicionados.push({ item: "Taxa de Entrega", qtd: 1, preco: 5.00 });
    }
  } else {
    campoEndereco.style.display = "none";
    // Remove delivery fee from total if delivery is deselected and fee was added
    const deliveryFeeIndex = itensAdicionados.findIndex(item => item.item === "Taxa de Entrega");
    if (deliveryFeeIndex !== -1) {
      totalAtual -= 5.00; // Remove R$ 5,00 delivery fee
      document.getElementById("total-final").textContent = `TOTAL: R$ ${totalAtual.toFixed(2)}`;
      itensAdicionados.splice(deliveryFeeIndex, 1);
    }
  }
});

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