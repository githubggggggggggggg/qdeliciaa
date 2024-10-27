document.addEventListener("DOMContentLoaded", function() {
    const ordersContainer = document.getElementById("ordersContainer");

    // Carregar pedidos do localStorage
    let orders = localStorage.getItem("orders");
    orders = orders ? JSON.parse(orders) : [];

    // Renderizar pedidos existentes
    if (orders.length === 0) {
        ordersContainer.innerHTML += "<p>Você ainda não fez nenhum pedido.</p>";
    } else {
        orders.forEach(order => {
            renderOrder(order);
        });
    }

    function renderOrder(order) {
        const orderElement = document.createElement("div");
        orderElement.classList.add("order");
        orderElement.innerHTML = `
            <h3>Pedido #${order.id}</h3>
            <p>Data: ${order.date}</p>
            <p>Total: R$ ${order.total}</p>
            <p>Status: <strong>${order.status}</strong></p> <!-- Exibe o status do pedido -->
            <div class="order-items">
                ${order.items.map(item => `
                    <div class="order-item">
                        <span class="order-item-name">${item.name}</span>
                        <span class="order-item-price">R$ ${item.price.toFixed(2)}</span>
                    </div>
                `).join('')}
            </div>
            <button class="reorder-button" data-order='${JSON.stringify(order.items)}'>Reordenar</button>
        `;
        ordersContainer.appendChild(orderElement);

        // Adiciona o evento para o botão "Reordenar"
        const reorderButton = orderElement.querySelector(".reorder-button");
        reorderButton.addEventListener("click", function() {
            const itemsToReorder = JSON.parse(this.getAttribute("data-order"));
            let cart = localStorage.getItem("cart");
            cart = cart ? JSON.parse(cart) : [];

            // Adiciona os itens do pedido ao carrinho
            itemsToReorder.forEach(item => {
                cart.push(item);
            });

            // Atualiza o localStorage
            localStorage.setItem("cart", JSON.stringify(cart));

            // Feedback para o usuário
            alert("Itens reordenados com sucesso!");
        });
    }

    // Função para adicionar um novo pedido
    function addOrder(newItems) {
        let newId = orders.length > 0 ? Math.max(...orders.map(order => order.id)) + 1 : 1;

        const newOrder = {
            id: newId,
            date: new Date().toLocaleDateString(),
            total: newItems.reduce((sum, item) => sum + item.price, 0).toFixed(2),
            items: newItems,
            status: "Pendente" // Status inicial do pedido
        };

        // Verifica se o pedido já existe
        if (!orders.some(order => order.id === newId)) {
            orders.push(newOrder);
            localStorage.setItem("orders", JSON.stringify(orders));

            // Renderizar o novo pedido
            renderOrder(newOrder);
        } else {
            console.error("Este pedido já existe.");
        }
    }

    // Exemplo de uso para adicionar um novo pedido (descomente para testar)
    // addOrder([{ name: "Turbinado", price: 18.00 }]);

    // Função para atualizar o status de um pedido
    function updateOrderStatus(orderId, newStatus) {
        const orderIndex = orders.findIndex(order => order.id === orderId);
        if (orderIndex > -1) {
            orders[orderIndex].status = newStatus;
            localStorage.setItem("orders", JSON.stringify(orders));
            // Aqui você pode chamar a função renderizar novamente se quiser atualizar a interface
        }
    }
});
