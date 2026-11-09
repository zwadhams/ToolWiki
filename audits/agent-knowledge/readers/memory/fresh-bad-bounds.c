#include <stdlib.h>
int main(void) {
    int *values = malloc(2 * sizeof(*values));
    if (!values) return 1;
    values[2] = 7;
    free(values);
    return 0;
}
