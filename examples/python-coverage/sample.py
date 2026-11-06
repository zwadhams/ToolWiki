def sign(value):
    result = "nonnegative"
    if value < 0:
        result = "negative"
    return result


def magnitude(value):
    return abs(value)
