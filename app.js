const issueCreditsBtn = document.getElementById('issue-credits-btn');
const transferCreditsBtn = document.getElementById('transfer-credits-btn');
const redeemCreditsBtn = document.getElementById('redeem-credits-btn');
const responseDiv = document.getElementById('response');

const client = new StacksClient({
    network: StacksNetwork.Mainnet,
    app: 'energy-credit-marketplace',
});

issueCreditsBtn.addEventListener('click', async () => {
    const amount = prompt("Enter amount of credits to issue:");
    const principal = prompt("Enter recipient's principal address:");
    await callClarityFunction('issue-credits', [principal, amount]);
});

transferCreditsBtn.addEventListener('click', async () => {
    const amount = prompt("Enter amount of credits to transfer:");
    const toPrincipal = prompt("Enter recipient's principal address:");
    await callClarityFunction('transfer-credits', [toPrincipal, amount]);
});

redeemCreditsBtn.addEventListener('click', async () => {
    const amount = prompt("Enter amount of credits to redeem:");
    await callClarityFunction('redeem-credits', [amount]);
});

async function callClarityFunction(functionName, args) {
    try {
        const response = await client.callContract(functionName, args);
        responseDiv.innerHTML = `Response: ${response}`;
    } catch (error) {
        responseDiv.innerHTML = `Error: ${error.message}`;
    }
}
