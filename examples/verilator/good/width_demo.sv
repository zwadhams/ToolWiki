module width_demo (
    input logic [7:0] word,
    output logic [3:0] nibble
);
    assign nibble = word[3:0];
endmodule
