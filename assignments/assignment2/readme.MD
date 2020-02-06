# Assignment 2

Goal: Manipulate and validation of forms

## Form
Must contain:
1. Name
2. Email
3. Phone
    1. Format is xxx-xxx-xxxx, where x are digits
4. Address
5. City
6. Postal Code
    1. Format must match the Canadian Postal Code structure
7. Province must be on a combo box for selection
8. Products 1 to 3
    1. Accepts only digits
    2. Must have a placeholder asking to *"Enter a Number"*.
9. Delivery Time
    1. Must be on a combo box for selection

## Validated Form
A valid form will return to the invoice page presenting the invoice to the client.

Must show:
1. Name
2. Email
3. Phone
4. Delivery Address
    1. Street Address + City
    2. Province + Postal Code
5. Product 1 multiplied by the total ammount typed
    1. X Product 1 @ $10.00 : X*10
6. Product 2 multiplied by the total ammount typed
    1. Y Product 2 @ $20.00 : Y*20
7. Product 3 multiplied by the total ammount typed
    1. Z Product 3 @ $30.00 : Z*30
8. Shipping charges
9. Subtotal
10. Taxes @ 13%: Subtotal*0.13
11. Total: Subtotal + Taxes