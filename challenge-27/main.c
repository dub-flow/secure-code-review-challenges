#include <stdio.h>
#include <stdlib.h>
#include <limits.h>
#include <string.h>

#define FIXED_PRICE 1  // Price per item (in euros)

void calculate_total(int quantity, int price_per_item) {
    int total = quantity * price_per_item;

    printf("Total price: %d euros\n", total);
}

int main() {
    int quantity;

    printf("Enter quantity of items: ");
    scanf("%d", &quantity);
    printf("Your entered quantity: %d\n", quantity);
    printf("Fixed price per item is: %d euro\n", FIXED_PRICE);
    calculate_total(quantity, FIXED_PRICE);

    return 0;
}
