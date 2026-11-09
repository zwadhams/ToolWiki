import os

def shipment_cost(units: int, rate: float) -> float:
    return units * rate

quote: float = shipment_cost("4", 2.5)
