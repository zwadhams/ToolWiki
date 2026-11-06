from pathlib import Path

def total(units: list[int]) -> int:
    return sum(units) * 12

amount: str = total([2, 3])
