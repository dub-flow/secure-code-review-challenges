#include <stdio.h>
#include <stdlib.h>
#include <limits.h>
#include <string.h>

#define FIXED_PRICE 1  // Price per item (in euros)

void apply_tax(int *total, float tax_percentage) {
    if (tax_percentage < 0 || tax_percentage > 100) {
        printf("Error: Invalid tax percentage.\n");
        exit(1);
    }
    *total += (*total * tax_percentage) / 100; 
}

void calculate_total(int quantity, int price_per_item, float tax_percentage) {
    int total = quantity * price_per_item;

    if (tax_percentage > 0) {
        apply_tax(&total, tax_percentage);
    }

    printf("Total price before tax: %d euros\n", quantity * price_per_item);
    printf("Total price after tax: %d euros\n", total);
}

int main() {
    int quantity;
    float tax_percentage;

    printf("Enter quantity of items: ");
    scanf("%d", &quantity);
    printf("Your entered quantity: %d\n", quantity);

    printf("Enter tax percentage: ");
    scanf("%f", &tax_percentage);

    calculate_total(quantity, FIXED_PRICE, tax_percentage);

    return 0;
}
