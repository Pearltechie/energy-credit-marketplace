const { assertEquals, assertRejects } = require('@stacks/clarinet');
const { chain } = require('@stacks/clarinet');

describe('Energy Credit Marketplace', () => {
    
    it('should issue energy credits to a user', async () => {
        const block = await chain.mineBlock([
            chain.callContract('energy-credit-marketplace.issue-credits', [100]),
        ]);
        assertEquals(block.receipts[0].result, '(ok "Energy credits issued successfully!")');
    });

    it('should transfer energy credits successfully', async () => {
        // First, deposit credits to sender
        await chain.mineBlock([
            chain.callContract('energy-credit-marketplace.issue-credits', [100]),
        ]);

        const block = await chain.mineBlock([
            chain.callContract('energy-credit-marketplace.transfer-credits', ['SP2Q5YXZ8JKC0F7N6Z9S0D5XRTW57S1C9E', 50]),
        ]);
        assertEquals(block.receipts[0].result, '(ok "Energy credits transferred successfully!")');
    });

    it('should redeem energy credits successfully', async () => {
        // First, issue some credits
        await chain.mineBlock([
            chain.callContract('energy-credit-marketplace.issue-credits', [200]),
        ]);

        const block = await chain.mineBlock([
            chain.callContract('energy-credit-marketplace.redeem-credits', [50]),
        ]);
        assertEquals(block.receipts[0].result, '(ok "Energy credits redeemed successfully!")');
    });

    it('should reject redeeming more credits than available', async () => {
        // First, issue some credits
        await chain.mineBlock([
            chain.callContract('energy-credit-marketplace.issue-credits', [100]),
        ]);

        const block = await chain.mineBlock([
            chain.callContract('energy-credit-marketplace.redeem-credits', [150]),
        ]);
        assertEquals(block.receipts[0].result, '(err "Insufficient credits")');
    });
});
