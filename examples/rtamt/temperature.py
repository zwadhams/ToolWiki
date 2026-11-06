"""Evaluate the same temperature requirement on violating and corrected traces."""

import json

import rtamt


def evaluate(trace):
    specification = rtamt.StlDenseTimeSpecification()
    specification.declare_var("temperature", "float")
    specification.spec = "always[0:2](temperature <= 80)"
    specification.parse()
    return specification.evaluate(["temperature", trace])


if __name__ == "__main__":
    violating = evaluate([[0, 70], [1, 75], [2, 85], [3, 85]])
    corrected = evaluate([[0, 70], [1, 75], [2, 79], [3, 79]])
    assert violating[0] == [0, -5.0], violating
    assert corrected[0] == [0, 1.0], corrected
    print(json.dumps({"violating_at_zero": violating[0], "corrected_at_zero": corrected[0]}, indent=2))
