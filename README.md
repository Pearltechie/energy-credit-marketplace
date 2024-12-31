# Blockchain-based Energy Credit Marketplace

This repository contains a Clarity smart contract that facilitates a decentralized marketplace for energy credits. The contract allows renewable energy producers to issue credits, transfer them to consumers, and redeem them to offset carbon emissions.

# Features
- Issue Credits: Energy producers can generate credits representing units of renewable energy.
- Transfer Credits: Credits can be transferred to consumers or businesses.
- Redeem Credits: Consumers can redeem credits to offset their carbon footprint.
- Transparency: All transactions are stored on-chain for transparency and auditability.

# Functions
1. `issue-credit (amount uint)`:
   - Issued by producers; assigns a unique ID to the credit.
2. `transfer-credit (credit-id uint, new-consumer principal)`:
   - Transfers a credit to a consumer.
3. `redeem-credit (credit-id uint)`:
   - Allows a consumer to redeem their credit.
4. `get-credit-details (credit-id uint)`:
   - Retrieves details of a specific credit.
5. `get-all-credits`:
   - Lists all credits in the system.

# Usage
1. Deploy the `energy-credits.clar` contract to the Stacks blockchain.
2. Producers issue credits using the `issue-credit` function.
3. Credits are transferred to consumers using `transfer-credit`.
4. Consumers redeem credits using `redeem-credit` to offset their carbon footprint.

# Testing
The contract has been tested for:
- Valid issuance, transfer, and redemption of credits
- Edge cases like invalid credit IDs or unauthorized actions

# Future Enhancements
- Support for credit expiry
- Integration with external renewable energy verification systems
- Enhanced reporting and analytics features
