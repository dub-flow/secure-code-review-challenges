#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define FIXED_PRICE 1  // Price per item (in euros)

int main(void) {
    char input[64];

    printf("Enter quantity of items: ");
    if (!fgets(input, sizeof input, stdin)) {
        puts("Error reading input.");
        return 1;
    }

    if (strchr(input, '-') != NULL) {
        puts("Error: Quantity must be a positive number.");
        return 1;
    }
    
    unsigned int quantity = (unsigned int) strtoul(input, NULL, 10);
    if (quantity == 0) {
        puts("Error: Quantity must be greater than 0.");
        return 1;
    }

    unsigned int total_u = quantity * (unsigned int) FIXED_PRICE;
    int total_s = (int) total_u; 

    printf("Your entered quantity: %u\n", quantity);
    printf("Fixed price per item is: %d euro\n", FIXED_PRICE);
    printf("Total price: %d euros\n", total_s);

    return 0;
}
