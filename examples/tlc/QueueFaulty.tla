--------------------------- MODULE QueueFaulty ---------------------------
EXTENDS Naturals

CONSTANT Capacity
VARIABLE queued

Init == queued = 0

Enqueue == /\ queued <= Capacity
           /\ queued' = queued + 1

Dequeue == /\ queued > 0
           /\ queued' = queued - 1

Next == Enqueue \/ Dequeue

TypeOK == queued \in Nat
WithinCapacity == queued <= Capacity
=============================================================================
