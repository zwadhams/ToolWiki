import unittest

from sample import magnitude, sign


class ContractTests(unittest.TestCase):
    def test_negative(self):
        self.assertEqual(sign(-1), "negative")

    def test_nonnegative(self):
        self.assertEqual(sign(0), "nonnegative")
        self.assertEqual(sign(2), "nonnegative")

    def test_magnitude(self):
        self.assertEqual(magnitude(-2), 2)
        self.assertEqual(magnitude(0), 0)
        self.assertEqual(magnitude(2), 2)
